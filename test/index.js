var $ = require('../cjs');

var Valuable = $((value = '') => ({
  append(obj) {
    if (Valuable.knows(obj))
      this.value += obj.value;
    else
      this.value += String(obj);
  },
  value
}));

var valuable = Valuable('a');
valuable.append('b');
valuable.append(Valuable('c'));
console.assert(valuable.value === 'abc', 'Valuable works');

var Extended = $((value = '') =>
  Object.assign(
    Valuable(value),
    {
      prepend(obj) {
        if (Extended.knows(obj))
          this.value = obj.value + this.value;
        else
          this.value = String(obj) + this.value;
      }
    }
  )
);

var extended = Extended('b');
extended.append(Extended('c'));
extended.prepend(Extended('a'));
console.assert(extended.value === 'abc', 'Extended works');

var Super = $((value = '') => {
  var object = Extended(value);
  var {append} = object;                // ◀━━┓ that 🎉🎉🎉
  return Object.assign(object, {        //    ┃
    append(obj) {                       // ◀━/┫ not that ⚠️
      console.log('with super append'); //    ┃
      append.apply(object, arguments);  // ━━━┛
    },
    prepend(obj) {
      if (Valuable.knows(obj))
        this.value = obj.value + this.value;
      else
        this.value = String(obj) + this.value;
    }
  });
});

var superior = Super('b');
superior.append(Super('c'));
superior.prepend(Super('a'));
console.assert(superior.value === 'abc', 'Super works');
