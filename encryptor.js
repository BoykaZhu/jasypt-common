'use strict';

const { createHash, createCipheriv, createDecipheriv }  = require('crypto');
const { isEmpty } = require('./util');

class Encryptor {
  constructor() {
    this.algorithm = '';
  }

  /**
   * @param {String} algorithm
   */
  setAlgorithm(algorithm) {
    if (isEmpty(algorithm)) {
      return null
    } else {
      this.algorithm = algorithm;
    }
  }

  /**
   * @param {String} secretKey
   * @param {String} salt
   * @param {String} iterations
   */
  KDF (secretKey, salt, iterations) {
    const pwd = Buffer.from(secretKey, 'utf-8');
    let key = Buffer.concat([pwd, salt]);
    for (let i = 0; i < iterations; i++) {
      key = createHash('md5').update(key).digest();
    }
    return key;
  }

  /**
   * @param {String} secretKey
   * @param {String} salt
   * @param {String} iterations
   */
  getKeyIV(secretKey, salt, iterations) {
    const key = this.KDF(secretKey, salt, iterations);
    const keybuf = Buffer.from(key, 'binary').subarray(0, 8);
    const ivbuf = Buffer.from(key, 'binary').subarray(8, 16);
    return [ keybuf, ivbuf ];
  }

  /**
   * @param {String} clearText
   * @param {String} cipherName
   * @param {String} secretKey
   * @param {String} salt
   * @param {String} iterations
   */
  encrypt(clearText, cipherName, secretKey, salt, iterations) {
    const kiv = this.getKeyIV(secretKey, salt, iterations);
    const cipher = createCipheriv(cipherName, kiv[0], kiv[1]);

    const encrypted = [];
    encrypted.push(cipher.update(clearText, 'utf-8', 'hex'));
    encrypted.push(cipher.final('hex'));

    const out = Buffer.from(encrypted.join(''), 'hex');
    const result =  Buffer.alloc(out.length + salt.length);

    salt.copy(result, 0, 0, salt.length);
    out.copy(result, salt.length, 0, out.length);

    return result.toString('base64');
  }

  /**
   * @param {String} encryptedText
   * @param {String} cipherName
   * @param {String} secretKey
   * @param {String} iterations
   */
  decrypt(encryptedText, cipherName, secretKey, iterations) {
    const encryptedMessage = Buffer.from(encryptedText, 'base64');
    const decrypted = [];
    const saltStart = 0;
    const saltSizeBytes = 8;

    const saltSize = saltSizeBytes < encryptedMessage.length ? saltSizeBytes : encryptedMessage.length;
    const encMesKernelStart = saltSizeBytes < encryptedMessage.length ? saltSizeBytes : encryptedMessage.length;
    const encMesKernelSize = saltSizeBytes < encryptedMessage.length ? (encryptedMessage.length - saltSizeBytes) : 0;

    const salt = Buffer.alloc(saltSize);
    const encryptedMessageKernel = Buffer.alloc(encMesKernelSize);

    encryptedMessage.copy(salt, 0, saltStart, saltSize);
    encryptedMessage.copy(encryptedMessageKernel, 0, encMesKernelStart, encryptedMessage.length);

    const kiv = this.getKeyIV(secretKey, salt, iterations);
    const decipher = createDecipheriv(cipherName, kiv[0], kiv[1]);

    decrypted.push(decipher.update(encryptedMessageKernel));
    decrypted.push(decipher.final());

    return decrypted.join('');
  }
}

module.exports = Encryptor;