![cf](http://i.imgur.com/7v5ASc8.png) lab 35 - Hash Table Data Structure
====

# Overview
* Created a `HashTable` constructor
  * The buckets were implemented as an array of DoubleLinkedLists for handling of collisions
* Implemented the following prototype methods:
  * `.hash(key)` converts a string into a number that will index your buckets
  * `.set(key, value)` stores a value in the hashed keys bucket
  * `.get(key)` looks in the hashed keys bucket and returns the value of the node containing the key, or null if not found
  * `.remove(key)` removes the dll node node containing the key
