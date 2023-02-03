#!/usr/bin/env node

/* eslint no-console: off */
const program = require('commander');
const RdoJasypt = require('../rdoJasypt');
const pkg = require('../package.json');

const rdoJasypt = new RdoJasypt();

const setSecretKey = (value) => {
  rdoJasypt.setSecretKey(value);
};

const encrypt = (encryptParams) => {
  const encryptParamsList = encryptParams.split(',');

  console.log(rdoJasypt.encrypt(encryptParamsList[1], encryptParamsList[0]));
};


const decrypt = (decryptParams) => {
  const decryptParamsList = decryptParams.split(',');

  console.log(rdoJasypt.decrypt(decryptParamsList[1], decryptParamsList[0]));
};

program
  .version(pkg.version, '-v, --version')
  .option('-p, --secretKey <pwd>', 'The secret key', setSecretKey)
  .option('-e, --encryptParams [encryptParams...]', 'Encrypt clear text with cipher, format: -e cipher,clearText', encrypt)
  .option('-d, --decryptParams [decryptParams...]', 'Decrypt text with cipher, format: -e cipher,encryptedText', decrypt)
  .on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ rdojasypt -p 0x1995 -e des-cbc,admin');
    console.log('  $ rdojasypt -p 0x1995 -d des-cbc,BaKgfN63GdOh0kAHsacvmQ==');
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}
