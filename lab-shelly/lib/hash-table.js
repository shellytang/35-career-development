'use strict';

const DLL = require('./dll');

const HashTable = module.exports = function(size=8192) {
  this.size = size;
  this.buckets = [...Array(this.size)];
};

HashTable.prototype.hashKey = function(key) {
  if(!key) throw new Error('key required for hash to function');
  let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size;

  return hash;
};

HashTable.prototype.set = function(key) {
  let hash = this.hashKey(key);
  if(!this.buckets[hash]) this.buckets[hash] = new DLL();
  if(this.buckets[hash]) this.buckets[hash].append(key);

  return this.buckets[hash].tail;
};

HashTable.prototype.get = function(key) {
  if(!key) throw new Error('must provide key');
  let hash = this.hashKey(key);
  if(this.buckets[hash] === undefined) throw new Error('invalid key');
  return this.buckets[hash].find(key);
};

HashTable.prototype.remove = function(key) {
  if(!key) throw new Error('must provide key');
  let hash = this.hashKey(key);
  if(this.buckets[hash] === undefined) throw new Error('list is empty');
  this.buckets[hash].remove(key);

};
