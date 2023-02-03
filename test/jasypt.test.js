import { test } from 'tap';
import Jasypt from '..';

const secretKey = 'G0CvDz7oJn60';
const clearText = 'admin';
const decryptText = 'c0KA89TBZ6TbLn7E6RIiFQ==';

// let data = {
//   code: 42,
//   test: {
//     db: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)',
//     pwd: {
//       a: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
//     },
//     asad: {
//       pwd: {
//         str: 'str',
//         host: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)',
//         pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
//       }
//     },
//     items: [{
//       user: 'user1',
//       pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
//     }, {
//       user: 'user2',
//       pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
//     }, {
//       user: 'user3',
//       pwd: 'ENC(c0KA89TBZ6TbLn7E6RIiFQ==)'
//     }],
//   }
// };

test('setPassword', t => {
  const jasypt = new Jasypt();
  t.equal(jasypt.setPassword(), null);
  t.end();
});

test('setPassword', t => {
  const jasypt = new Jasypt();
  jasypt.setPassword('testkey')
  t.equal(jasypt.secretKey, 'testkey');
  t.end();
});


test('setSecretKey', t => {
  const jasypt = new Jasypt();
  t.equal(jasypt.setSecretKey(), null);
  t.end();
});

test('encrypt', t => {
  const jasypt = new Jasypt();
  jasypt.setSecretKey(secretKey);
  const encryptResult = jasypt.encrypt('', 'des-cbc');
  t.equal(encryptResult, null);
  jasypt.encrypt('a', 'des-cbc');
  t.end();
});

test('encrypt', t => {
  const jasypt = new Jasypt();
  jasypt.setSecretKey(secretKey);
  const encryptResultNull = jasypt.encrypt('');
  t.equal(encryptResultNull, null);
  const encryptResult = jasypt.encrypt('abc');
  const decryptResult = jasypt.decrypt(encryptResult);
  t.equal(decryptResult, 'abc');
  t.end();
});

test('decrypt', t => {
  const jasypt = new Jasypt();
  jasypt.setSecretKey(secretKey);
  let decryptResult = '';
  decryptResult = jasypt.decrypt(null);
  t.equal(decryptResult, null);
  decryptResult = jasypt.decrypt(decryptText, 'des-cbc');
  t.equal(decryptResult, clearText);
  t.end();
});

test('encrypt & decrypt', t => {
  const jasypt = new Jasypt();
  jasypt.setSecretKey(secretKey);
  const encryptResult = jasypt.encrypt(clearText, 'des-cbc');
  const decryptResult = jasypt.decrypt(encryptResult, 'des-cbc');
  t.equal(decryptResult, clearText);
  t.end();
});

// test('decryptConfig', t => {
//   const jasypt = new Jasypt();
//   jasypt.setSecretKey(secretKey);
//   jasypt.decryptConfig('', 'des-cbc');
//   jasypt.decryptConfig(data, 'des-cbc');
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
