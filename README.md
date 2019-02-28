# 🏭👃factory-knows

[![Build Status](https://travis-ci.com/WebReflection/factory-knows.svg?branch=master)](https://travis-ci.com/WebReflection/factory-knows) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/factory-knows/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/factory-knows?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/factory-knows.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

An `instanceof` alternative for non class based, factory oriented, programming.

```js
import $ from 'factory-knows';
// OR
// const $ = require('factory-knows');
// OR
// <script src="https://unpkg.com/factory-knows"></script>
// <script>const Factory = factoryKnows(...);</script>

const Person = $((name = 'anonymous') => ({
  birthday() {
    this.age++;
    console.log('🎉');
  },
  age: 0,
  name
}));

const me = Person('A G');
Person.knows(me); // true
me.birthday();    // 🎉

const {assign} = Object;
const Employee = $((company, name) => assign(
  Person(name),
  {
    levelUP() {
      this.experience++;
      console.log('🤝');
    },
    experience: 0,
    company
  }
));

const roadrunner = Employee('ACME', 'RoadRunner');
Person.knows(roadrunner);   // true
Employee.knows(roadrunner); // true
roadrunner.levelUP();       // 🤝
roadrunner.experience;      // 1
```