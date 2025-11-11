#! /usr/bin/env zx

import "zx/globals";
import fs from "node:fs/promises";
import path from "node:path";
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import { format } from "date-fns";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const BACKUP_DIR = ".backups";
const ENCRYPTED_DIR = ".backups-encrypted";
const FILE_HEADER = Buffer.from("CTSDB01");

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const secret = process.env.BACKUP_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error(`Missing BACKUP_ENCRYPTION_KEY environment variable required to encrypt backups.`);
  }

  await Promise.all([$`mkdir -p ${BACKUP_DIR}`, $`mkdir -p ${ENCRYPTED_DIR}`]);

  const timestamp = format(new Date(), "yyyy-MM-dd-HHmmss");
  const backupPath = path.join(BACKUP_DIR, `${timestamp}.sql`);

  await $`pnpm dlx supabase@latest db dump -f ${backupPath}`;

  const encryptedPath = path.join(ENCRYPTED_DIR, `${path.basename(backupPath)}.enc`);
  await encryptFile(backupPath, encryptedPath, secret);

  console.log(`Created backup at ${backupPath} and encrypted copy at ${encryptedPath}`);
}

async function encryptFile(sourcePath: string, destPath: string, secret: string) {
  const plaintext = await fs.readFile(sourcePath);
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = scryptSync(secret, salt, 32);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const payload = Buffer.concat([FILE_HEADER, salt, iv, authTag, ciphertext]);
  await fs.writeFile(destPath, payload);
}
