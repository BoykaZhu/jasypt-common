import { test } from 'tap';
import RdoJasypt from '..';

const secretKey = 'G0CvDz7oJn60';
const clearText = 'admin';
const decryptText = 'c0KA89TBZ6TbLn7E6RIiFQ==';

let data = {
  code: 42,
  test: {
    db: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)',
    pwd: {
      a: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
    },
    asad: {
      pwd: {
        str: 'str',
        host: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)',
        pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
      }
    },
    items: [{
      user: 'user1',
      pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
    }, {
      user: 'user2',
      pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
    }, {
      user: 'user3',
      pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
    }],
  }
};

test('setPassword', t => {
  const rdoJasypt = new RdoJasypt();
  t.equal(rdoJasypt.setPassword(), null);
  t.end();
});

test('setPassword', t => {
  const rdoJasypt = new RdoJasypt();
  rdoJasypt.setPassword('testkey')
  t.equal(rdoJasypt.secretKey, 'testkey');
  t.end();
});


test('setSecretKey', t => {
  const rdoJasypt = new RdoJasypt();
  t.equal(rdoJasypt.setSecretKey(), null);
  t.end();
});

test('encrypt', t => {
  const rdoJasypt = new RdoJasypt();
  rdoJasypt.setSecretKey(secretKey);
  const encryptResult = rdoJasypt.encrypt('', 'des-cbc');
  t.equal(encryptResult, null);
  rdoJasypt.encrypt('a', 'des-cbc');
  t.end();
});

test('decrypt', t => {
  const rdoJasypt = new RdoJasypt();
  rdoJasypt.setSecretKey(secretKey);
  let decryptResult = '';
  decryptResult = rdoJasypt.decrypt(null);
  t.equal(decryptResult, null);
  decryptResult = rdoJasypt.decrypt(decryptText, 'des-cbc');
  t.equal(decryptResult, clearText);
  t.end();
});

test('encrypt & decrypt', t => {
  const rdoJasypt = new RdoJasypt();
  rdoJasypt.setSecretKey(secretKey);
  const encryptResult = rdoJasypt.encrypt(clearText, 'des-cbc');
  const decryptResult = rdoJasypt.decrypt(encryptResult, 'des-cbc');
  t.equal(decryptResult, clearText);
  t.end();
});

// test('decryptConfig', t => {
//   const rdoJasypt = new RdoJasypt();
//   rdoJasypt.setSecretKey(secretKey);
//   rdoJasypt.decryptConfig('', 'des-cbc');
//   rdoJasypt.decryptConfig(data, 'des-cbc');
//   t.equal(data.test.db, clearText);
//   t.equal(data.test.pwd.a, clearText);
//   t.equal(data.test.asad.pwd.str, 'str');
//   t.equal(data.test.asad.pwd.pwd, clearText);
//   t.equal(data.test.asad.pwd.host, clearText);
//   for (const item of data.test.items) {
//     t.equal(item.pwd, clearText);
//   }
//   t.end();
// });
