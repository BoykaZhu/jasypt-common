# jasypt-common
Jasypt with customized cipher  

#### Usage
**`SDK`**
``` ts
import Jasypt from "rdo-jasypt";

function example() {
  const jasypt = new Jasypt();
  // Setup secret key
  jasypt.setSecretKey('G0CvDz7oJn60');
  // Encrypt
  const encryptMsg = jasypt.encrypt('admin', 'des-cbc');
  // Decrypt
  const decryptMsg = jasypt.decrypt(encryptMsg, 'des-cbc');
}

```

**`CLI`**
``` sh
$ rdojasypt -h

Usage: rdojasypt [options]

Options:
  -v, --version                           output the version number
  -p, --secretKey <pwd>                   The secret key
  -e, --encryptParams [encryptParams...]  Encrypt clear text with cipher, format: -e cipher,clearText
  -d, --decryptParams [decryptParams...]  Decrypt text with cipher, format: -e cipher,encryptedText
  -h, --help                              display help for command

Examples:

  $ rdojasypt -p 0x1995 -e des-cbc,admin
  $ rdojasypt -p 0x1995 -d des-cbc,BaKgfN63GdOh0kAHsacvmQ==
```