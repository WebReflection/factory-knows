/*! (c) Andrea Giammarchi - ISC */
function factoryKnows(fn) {
  // it should be a WeakSet, but IE11 has only a WeakMap so ... KISS
  // pony/polyfill available here: https://github.com/ungap/weakmap#weakmap
  var knowledge = new WeakMap;
  return Object.defineProperty(
    function () {
      var value = fn.apply(this, arguments);
      knowledge.set(value, true);
      return value;
    },
    'knows',
    {value: knowledge.has.bind(knowledge)}
  );
}
module.exports = factoryKnows;
