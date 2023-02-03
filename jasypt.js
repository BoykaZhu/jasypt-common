'use strict';

const crypto = require('crypto');
const Encryptor = require('./encryptor');
const { isEmpty, isType } = require('./util');
const cacher = require('./cache');

class Jasypt {

  constructor(opts = {}) {
    this._encryptor = new Encryptor();
    this._encryptor.setAlgorithm('PBEWithMD5AndDES');
    this.salt = opts.salt || crypto.randomBytes(8);
    this.iterations = opts.iterations || 1000;
    this.secretKey = '';
  }

  getCacheKey(key) {
    return `${this.salt}_${this.iterations}_${this.secretKey}_${key}`;
  }

  /**
   * @deprecated Use `setSecretKey` instead.
   * @param {String} secretKey
   */
  setPassword(secretKey) {
    if (isEmpty(secretKey)) {
      return null
    } else {
      this.secretKey = secretKey;
    }
  }

  /**
   * @param {String} secretKey
   */
  setSecretKey(secretKey) {
    if (isEmpty(secretKey)) {
      return null
    } else {
      this.secretKey = secretKey;
    }
  }

  /**
   * @param {String} clearText
   * @param {String} cipherName
   */
  encrypt(clearText, cipherName) {
    let CipherNameV;
    if (isEmpty(clearText)) {
      return null;
    }
    if (isEmpty(cipherName)) {
      CipherNameV = 'des';
    } else {
      CipherNameV = cipherName;
    }
    return this._encryptor.encrypt(clearText, CipherNameV, this.secretKey, this.salt, this.iterations);
  }

  /**
   * @param {String} encryptedText
   * @param {String} cipherName
   */
  decrypt(encryptedText, cipherName) {
    let CipherNameV;
    if (isEmpty(encryptedText)) {
      return null;
    }
    if (isEmpty(cipherName)) {
      CipherNameV = 'des';
    } else {
      CipherNameV = cipherName;
    }

    const cacheKey = this.getCacheKey(encryptedText);
    if (cacher.has(cacheKey)) return cacher.get(cacheKey);
  
    const value = this._encryptor.decrypt(encryptedText, CipherNameV, this.secretKey, this.iterations);
    cacher.set(cacheKey, value);

    return value;
  }

  // /**
  //  * @param {Object} obj
  //  * @param {String} cipherName
  //  */
  // decryptConfig (obj, cipherName) {
  //   let CipherNameV;
  //   if (!isType('Object', obj)) {
  //     return;
  //   }
  //   if (isEmpty(cipherName)) {
  //     CipherNameV = 'des';
  //   } else {
  //     CipherNameV = cipherName;
  //   }

  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const value = obj[key];
  //       if (isType('Object', value)) {
  //         this.decryptConfig(value);
  //       } else if (isType('String', value)) {
  //         if (value.indexOf('ENC(') === 0 && value.lastIndexOf(')') === value.length - 1) {
  //           const encryptText = value.substring(4, value.length - 1);
  //           obj[key] = this.decrypt(encryptText, CipherNameV);
  //         }
  //       } else if (isType('Array', value)) {
  //         for (const item of value) {
  //           if (isType('Object', item)) {
  //             this.decryptConfig(item);
  //           }
  //         }
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  // }

}

module.exports = Jasypt;