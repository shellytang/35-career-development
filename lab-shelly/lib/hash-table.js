'use strict';

const DLL = require('./dlls');

const HashTable = module.exports = function(size=8192) {
  this.size = size;
  this.buckets = [...Array(this.size)];
};

HashTable.prototype.hashKey = function(key) {
  if(!key) throw new Error('key required for hash to function');
  let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size;

  return hash;
};

HashTable.prototype.set = function(key, value) {

  if(this.buckets[this.hashKey(key)] === undefined) {
    this.buckets[this.hashKey(key)] = new DLL().apppend(key, value);
  } else {
    this.buckets[this.hashKey(key)].append(key, value);
  }
  return this.buckets[this.hashKey(key)].tail;
  //  this.buckets[this.hashKey(key)] = value;
};

HashTable.prototype.get = function(key) {
  if(!key) throw new Error('must provide key');
  if(this.buckets[this.hashKey(key)] === undefined) throw new Error('invalid key');
  return this.buckets[this.hashKey(key)].find(key);
  // return this.buckets[this.hashKey(key)];
};

HashTable.prototype.remove = function(key) {
  if(!key) throw new Error('must provide key');
  if(this.buckets[this.hashKey(key)] === undefined) throw new Error('list is empty');
  this.buckets[this.hashKey(key)].remove(key);
  // let address = this.hashKey(key);
  // this.buckets[address] ? delete this.buckets[address] : new Error('invalid key');
};
