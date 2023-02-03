
interface JasyptConstructor {
  salt?: Buffer;
  iterations?: number;
}

declare class RdoJasypt {

  constructor(options?: JasyptConstructor);

  encrypt(message: string, cipherName: string): string;

  decryptConfig(config: object, cipherName: string): void;

  decrypt(encryptedMessage: string, cipherName: string): string;

  setPassword(password: string): string;

  setSecretKey(password: string): string;
}

export = RdoJasypt;
