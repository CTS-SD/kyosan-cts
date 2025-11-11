#! /usr/bin/env zx

import "zx/globals";
import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { format } from "date-fns";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const secret = process.env.BACKUP_ENCRYPTION_KEY;
const BACKUP_DIR = ".backups";
const ENCRYPTED_DIR = ".backups-encrypted";
const DECRYPTED_DIR = ".backups-decrypted";

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const { decrypt } = parseArgs(process.argv.slice(2));
  console.log(decrypt ? "Starting backup decryption..." : "Starting database backup...");

  if (!secret) {
    throw new Error(`Missing BACKUP_ENCRYPTION_KEY environment variable required to secure backups.`);
  }

  const dirPromises = decrypt
    ? [$`mkdir -p ${ENCRYPTED_DIR}`, $`mkdir -p ${DECRYPTED_DIR}`]
    : [$`mkdir -p ${BACKUP_DIR}`, $`mkdir -p ${ENCRYPTED_DIR}`];
  await Promise.all(dirPromises);

  if (decrypt) {
    await decryptBackups(secret);
    return;
  }

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

async function decryptBackups(secret: string) {
  const entries = await fs.readdir(ENCRYPTED_DIR);
  const encryptedFiles = entries.filter((file) => file.endsWith(".enc"));

  if (!encryptedFiles.length) {
    console.log(`No encrypted backups found in ${ENCRYPTED_DIR}.`);
    return;
  }

  for (const file of encryptedFiles) {
    const encryptedPath = path.join(ENCRYPTED_DIR, file);
    const destPath = path.join(DECRYPTED_DIR, file.replace(/\.enc$/, ""));
    await decryptFile(encryptedPath, destPath, secret);
    console.log(`Decrypted ${encryptedPath} -> ${destPath}`);
  }
}

async function decryptFile(sourcePath: string, destPath: string, secret: string) {
  const payload = await fs.readFile(sourcePath);
  if (payload.length <= 24) {
    throw new Error(`Encrypted file ${sourcePath} does not contain the required nonce.`);
  }

  const nonce = payload.subarray(0, 24);
  const ciphertext = payload.subarray(24);
  const aead = xchacha20poly1305(Buffer.from(secret, "hex"), nonce);
  const decrypted = aead.decrypt(ciphertext);
  await fs.writeFile(destPath, decrypted);
}

function parseArgs(argv: string[]) {
  const decrypt = argv.includes("--decrypt") || argv.includes("-d");
  return { decrypt };
}
