'use strict';

import { Suite } from 'benchmark';
import { add, log } from 'beautify-benchmark';
const suite = new Suite();
import Jasypt from '..';

const jasypt = new Jasypt();
jasypt.setPassword('0x1995');

const data = {
  code: 42,
  test: {
    db: 'ENC(ok0kgkHP0Zj3WlYX4MA12w==)',
    pwd: {
      a: 'ENC(ok0kgkHP0Zj3WlYX4MA12w==)'
    },
  },
};

suite
.add('encrypt', function () {
  jasypt.encrypt('admin');
})
.add('decrypt', function () {
  jasypt.decrypt('ok0kgkHP0Zj3WlYX4MA12w==');
})
.add('decryptConfig', function () {
  jasypt.decryptConfig(data);
  data.test.db = 'ENC(ok0kgkHP0Zj3WlYX4MA12w==)';
  data.test.pwd.a = 'ENC(ok0kgkHP0Zj3WlYX4MA12w==)';
})
.on('cycle', function (event) {
  add(event.target);
})
.on('start', function (event) {
  console.log('\n  map Benchmark\n  node version: %s, date: %s\n  Starting...',
    process.version, Date());
})
.on('complete', function done() {
  log();
})
.run({ 'async': false });