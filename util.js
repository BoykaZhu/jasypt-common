'use strict';

const toString = Object.prototype.toString;
const isType = (type, content) => toString.call(content) === `[object ${type}]`;

exports.isEmpty = function () {
  for (let obj of arguments) {
    if (obj === null || obj === undefined) {
      return true;
    } else if (isType('String', obj) && obj.trim() === '') {
      return true;
    }
  }
  return false;
};

exports.isType = isType;