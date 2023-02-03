#!/usr/bin/env node

/* eslint no-console: off */
const program = require('commander');
const Jasypt = require('../jasypt');
const pkg = require('../package.json');

const jasypt = new Jasypt();

const setSecretKey = (value) => {
  jasypt.setSecretKey(value);
};

const encrypt = (encryptParams) => {
  const encryptParamsList = encryptParams.split(',');
  if (encryptParamsList.length === 1) {
    console.log(jasypt.encrypt(encryptParamsList[0]));
  } else {
    console.log(jasypt.encrypt(encryptParamsList[1], encryptParamsList[0]));
  }
};


const decrypt = (decryptParams) => {
  const decryptParamsList = decryptParams.split(',');
  if (decryptParamsList.length === 1) {
    console.log(jasypt.decrypt(decryptParamsList[0]));
  } else {
    console.log(jasypt.decrypt(decryptParamsList[1], decryptParamsList[0]));
  }
};

program
  .version(pkg.version, '-v, --version')
  .option('-p, --secretKey <pwd>', 'The secret key', setSecretKey)
  .option('-e, --encryptParams [encryptParams...]', 'Encrypt clear text with cipher, format: -e cipher,clearText or -e clearText', encrypt)
  .option('-d, --decryptParams [decryptParams...]', 'Decrypt text with cipher, format: -d cipher,encryptedText or -d encryptedText', decrypt)
  .on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ jasypt-common -p 0x1995 -e des-cbc,admin');
    console.log('  $ jasypt-common -p 0x1995 -e admin');
    console.log('  $ jasypt-common -p 0x1995 -d des-cbc,BaKgfN63GdOh0kAHsacvmQ==');
    console.log('  $ jasypt-common -p 0x1995 -d BaKgfN63GdOh0kAHsacvmQ==');
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}
