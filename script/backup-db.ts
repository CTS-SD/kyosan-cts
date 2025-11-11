#! /usr/bin/env zx

import "zx/globals";
import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes, scryptSync } from "node:crypto";
import { format } from "date-fns";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const secret = process.env.BACKUP_ENCRYPTION_KEY;
const BACKUP_DIR = ".backups";
const ENCRYPTED_DIR = ".backups-encrypted";

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  console.log("Starting database backup...");

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
  const key = Buffer.from(secret, "hex");
  const nonce = randomBytes(24);
  const aead = xchacha20poly1305(key, nonce);
  const data = await fs.readFile(sourcePath);
  const encrypted = aead.encrypt(data);
  await fs.writeFile(destPath, Buffer.concat([nonce, encrypted]));
}
