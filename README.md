# jasypt-common
Jasypt with customized cipher  

#### Usage
**`SDK`**
``` ts
import Jasypt from "jasypt-common";


const jasypt = new Jasypt();
// Setup secret key
jasypt.setSecretKey('G0CvDz7oJn60');
// Encrypt with cipher
const encryptText = jasypt.encrypt('admin', 'des-cbc');
// Decrypt with cipher
const decryptText = jasypt.decrypt(encryptText, 'des-cbc');

// Encrypt with default cepher des
const encryptText = jasypt.encrypt('admin');
// Decrypt with default cepher des
const decryptText = jasypt.decrypt(encryptText);


```

**`CLI`**
``` sh
$ jasypt-common -h

Usage: jasypt-common [options]

Options:
  -v, --version                           output the version number
  -p, --secretKey <pwd>                   The secret key
  -e, --encryptParams [encryptParams...]  Encrypt clear text with cipher, format: -e cipher,clearText or -e clearText
  -d, --decryptParams [decryptParams...]  Decrypt text with cipher, format: -d cipher,encryptedText or -d encryptedText
  -h, --help                              display help for command

Examples:

  $ jasypt-common -p 0x1995 -e des-cbc,admin
  $ jasypt-common -p 0x1995 -e admin
  $ jasypt-common -p 0x1995 -d des-cbc,BaKgfN63GdOh0kAHsacvmQ==
  $ jasypt-common -p 0x1995 -d BaKgfN63GdOh0kAHsacvmQ==  
```