
interface JasyptConstructor {
  salt?: Buffer;
  iterations?: number;
}

declare class Jasypt {

  constructor(options?: JasyptConstructor);

  encrypt(message: string, cipherName: string): string;

  decryptConfig(config: object, cipherName: string): void;

  decrypt(encryptedMessage: string, cipherName: string): string;

  setPassword(secretKey: string): string;

  setSecretKey(secretKey: string): string;
}

export = Jasypt;
