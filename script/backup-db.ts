#! /usr/bin/env zx

import "zx/globals";
import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { format } from "date-fns";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const BACKUP_DIR = ".backups";
const ENCRYPTED_DIR = ".backups-encrypted";
const DECRYPTED_DIR = ".backups-decrypted";
const ENCRYPTED_EXTENSION = ".enc";
const KEY_BYTES = 32;
const NONCE_BYTES = 24;

type Mode = "backup" | "decrypt";

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const { mode } = parseArgs(process.argv.slice(2));
  const key = loadEncryptionKey();

  if (mode === "decrypt") {
    await ensureDirectories([ENCRYPTED_DIR, DECRYPTED_DIR]);
    await decryptBackups(key);
    return;
  }

  await ensureDirectories([BACKUP_DIR, ENCRYPTED_DIR]);
  const backupPath = await createDatabaseDump();
  const encryptedPath = toEncryptedPath(backupPath);
  await encryptFile(backupPath, encryptedPath, key);
  console.log(`Created backup at ${backupPath} and encrypted copy at ${encryptedPath}`);
}

async function encryptFile(sourcePath: string, destPath: string, key: Buffer) {
  const nonce = randomBytes(NONCE_BYTES);
  const aead = xchacha20poly1305(key, nonce);
  const data = await fs.readFile(sourcePath);
  const encrypted = aead.encrypt(data);
  await fs.writeFile(destPath, Buffer.concat([nonce, encrypted]));
}

async function decryptBackups(key: Buffer) {
  const entries = await fs.readdir(ENCRYPTED_DIR);
  const encryptedFiles = entries.filter((file) => file.endsWith(ENCRYPTED_EXTENSION));

  if (!encryptedFiles.length) {
    console.log(`No encrypted backups found in ${ENCRYPTED_DIR}.`);
    return;
  }

  for (const file of encryptedFiles) {
    const encryptedPath = path.join(ENCRYPTED_DIR, file);
    const destPath = path.join(DECRYPTED_DIR, file.replace(/\.enc$/, ""));
    await decryptFile(encryptedPath, destPath, key);
    console.log(`Decrypted ${encryptedPath} -> ${destPath}`);
  }
}

async function decryptFile(sourcePath: string, destPath: string, key: Buffer) {
  const payload = await fs.readFile(sourcePath);
  if (payload.length <= NONCE_BYTES) {
    throw new Error(`Encrypted file ${sourcePath} does not contain the required nonce.`);
  }

  const nonce = payload.subarray(0, NONCE_BYTES);
  const ciphertext = payload.subarray(NONCE_BYTES);
  const aead = xchacha20poly1305(key, nonce);
  const decrypted = aead.decrypt(ciphertext);
  await fs.writeFile(destPath, decrypted);
}

function parseArgs(argv: string[]): { mode: Mode } {
  if (argv.includes("--decrypt") || argv.includes("-d")) {
    return { mode: "decrypt" };
  }
  return { mode: "backup" };
}

function loadEncryptionKey(): Buffer {
  const raw = process.env.BACKUP_ENCRYPTION_KEY?.trim();
  if (!raw) {
    throw new Error(`Missing BACKUP_ENCRYPTION_KEY environment variable required to secure backups.`);
  }

  const keyFromHex = tryDecodeHex(raw);
  if (keyFromHex) return keyFromHex;

  const keyFromBase64 = tryDecodeBase64(raw);
  if (keyFromBase64) return keyFromBase64;

  const utf8 = Buffer.from(raw, "utf8");
  if (utf8.length === KEY_BYTES) {
    return utf8;
  }

  throw new Error(
    `BACKUP_ENCRYPTION_KEY must be a ${KEY_BYTES}-byte value provided as hex, base64, or raw UTF-8 string.`,
  );
}

function tryDecodeHex(raw: string): Buffer | null {
  if (!/^([0-9a-fA-F]{2})+$/.test(raw) || raw.length !== KEY_BYTES * 2) {
    return null;
  }
  return Buffer.from(raw, "hex");
}

function tryDecodeBase64(raw: string): Buffer | null {
  if (!/^[A-Za-z0-9+/]+=*$/.test(raw)) {
    return null;
  }
  const buf = Buffer.from(raw, "base64");
  return buf.length === KEY_BYTES ? buf : null;
}

async function ensureDirectories(paths: string[]) {
  await Promise.all(paths.map((dir) => fs.mkdir(dir, { recursive: true })));
}

async function createDatabaseDump() {
  const timestamp = format(new Date(), "yyyy-MM-dd-HHmmss");
  const backupPath = path.join(BACKUP_DIR, `${timestamp}.sql`);
  await $`pnpm dlx supabase@latest db dump -f ${backupPath}`;
  return backupPath;
}

function toEncryptedPath(backupPath: string) {
  return path.join(ENCRYPTED_DIR, `${path.basename(backupPath)}${ENCRYPTED_EXTENSION}`);
}
