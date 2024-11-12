import * as CryptoJS from 'crypto-js';

export function encryptString(plainText: string, secret: string): string {
  return CryptoJS.AES.encrypt(plainText, secret).toString();
}

export function decryptString(str: string, secret: string): string {
  const bytes = CryptoJS.AES.decrypt(str, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function isValidToken(
  token: string,
  secret: string,
  validator: (decrypted: string) => boolean,
) {
  const decrypted = decryptString(token, secret);
  return validator(decrypted);
}
