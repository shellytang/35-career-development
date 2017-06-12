'use strict';

const expect = require('chai').expect;
const HashTable = require('../lib/hash-table');

describe('Hash Table Module', function() {

  beforeEach(done => {
    this.hashTable = new HashTable();
    done();
  });
  afterEach(done => {
    this.hashTable = null;
    done();
  });

  describe.only('hash table constructor', () => {
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

    // it('should hash a key', done => {
    //   let expectHash = this.hashTable.hashKey('testing');
    //   // let actualHash =
    //   expect(expectHash).to.equal(actualHash);
    //   done();
    // });
    // it('should always hash a key to less than 8192', done => {
    //   this.fakeKeys.forEach(key => {
    //     expect(this.hashTable.hashKey(key)).to.be.lessThan(8192);
    //   });
    //   done();
    // });
  });
  describe('set method', () => {
    it('should add a new value to the hash table', done => {
      let expectKey = this.hashTable.hashKey('test key');
      this.hashTable.set('test key', 'test value');
      expect(this.hashTable.buckets[expectKey]).to.equal('test value');
      done();
    });
  });
  describe('get method', () => {
    it('should retrieve a value from the hash table by it\'s key', done => {
      this.hashTable.set('test key', 'test value');
      let expectVal = 'test value';
      let actualVal = this.hashTable.get('test key');

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
