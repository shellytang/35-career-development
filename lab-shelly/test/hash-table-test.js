'use strict';

const expect = require('chai').expect;
const faker = require('faker');
const HashTable = require('../lib/hash-table');
const DLL = require('../lib/dll');

describe('Hash Table Module', function() {
  //
  // beforeEach(done => {
  //   let hashTable = new HashTable();
  //   done();
  // });
  // afterEach(done => {
  //   hashTable = null;
  //   done();
  // });

  describe('hash table constructor', () => {
    let hashTable = new HashTable();
    it('should instantiate a new empty hash table', done => {
      expect(hashTable).to.be.instanceOf(Object, HashTable);
      expect(hashTable).to.not.be.null;
      done();
    });
    it('should have a default size of 8192', done => {
      expect(hashTable.buckets.length).to.equal(8192);
      done();
    });
    it('should have a default buckets property with assigned array', done => {
      expect(hashTable.buckets).to.be.instanceOf(Array);
      done();
    });
  }); //


  describe('hashKey method', () => {

    let hashTable = new HashTable();

    it('should hash a key', done => {
      let expectHash = hashTable.hashKey('testing');
      let actualHash = 766;
      expect(expectHash).to.equal(actualHash);
      done();
    });

    it('should always hash a key to less than 8192', done => {
      this.fakeKeys = [...Array(100)].map(() => faker.hacker.phrase());
      this.fakeKeys.forEach(key => {
        expect(hashTable.hashKey(key)).to.be.lessThan(8192);
      });
      delete this.fakeKeys;
      done();
    });
  });


  describe('set method', () => {

    let hashTable = new HashTable();
    let expectKey = hashTable.hashKey('test key');
    hashTable.set('test key');

    it('should create a doubly linked list if bucket index is undefined', done => {
      expect(hashTable.buckets[expectKey]).to.be.instanceOf(Object, DLL);
      done();
    });

    it('should create the doubly linked list in the correct bucket index', done => {
      expect(hashTable.buckets[expectKey]).to.not.equal(undefined);
      done();
    });

    it('should add a new value to the doubly linked list', done => {
      expect(hashTable.buckets[expectKey].tail.val).to.equal('test key');
      expect(hashTable.buckets[expectKey].length).to.equal(0);
      done();
    });

    it('should handle key collisions', done => {
      let collisionKey = hashTable.hashKey('key test');
      hashTable.set('key test');
      expect(hashTable.buckets[expectKey].key).to.equal(hashTable.buckets[collisionKey].key);
      expect(hashTable.buckets[expectKey].length).to.equal(1);
      done();
    });
  });

  describe('get method', () => {
    let hashTable = new HashTable();
    hashTable.set('test key');

    it('should retrieve a value from the hash table by it\'s key', done => {
      let expectVal = 'test value';
      let actualVal = hashTable.get('test key');
      expect(expectVal).to.equal(actualVal);
      done();
    });
  });

  describe('remove method', () => {
    it('should remove an item from the hash table', done => {
      this.hashTable.set('test key', 'test value');

      let expectKey = this.hashTable.hashKey('test key');
      let expectVal = 'test value';
      let actualVal = this.hashTable.get('test key');

      expect(expectVal).to.equal(actualVal);

      this.hashTable.remove('test key');

      expect(this.hashTable.buckets[expectKey]).to.be.undefined;
      done();
    });
  });
});
