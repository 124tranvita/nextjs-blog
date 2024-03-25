// app/lib/crypto.js
//https://habtesoft.medium.com/encrypt-data-on-nodejs-e0a45c67c772
//https://stackoverflow.com/questions/50963160/invalid-key-length-in-crypto-createcipheriv

import * as crypto from "node:crypto";

const createCipherIvObj = () => {
  // encryption algorithm
  const algorithm = "aes-256-cbc";

  // encryption key
  const key = crypto
    .createHash("sha256")
    .update(String(process.env.CRYPTO_SECRET))
    .digest("base64")
    .substring(0, 32);

  // initialization vector
  const iv = crypto
    .createHash("sha256")
    .update(String(process.env.CRYPTO_SECRET))
    .digest("base64")
    .substring(0, 16);
  // Create a cipher object To encrypt data
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // Create a decipher object To decrypt data
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  return { cipher, decipher };
};

/**
 * Encrypt content
 * @param {*} content - Plaintext content
 * @returns - Encrypted content
 */
export const encrypt = (content) => {
  const { cipher } = createCipherIvObj();

  let encrypted = cipher.update(JSON.stringify(content), "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

/**
 * Decrypt content
 * @param {*} encrypted - Encrypted content
 * @returns - Decrypted plaintext content
 */
export const decrypt = (encrypted) => {
  const { decipher } = createCipherIvObj();

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
