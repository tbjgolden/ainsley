/** @license Ainsley v0.0.1-beta.7 (Tom Golden <tom.bio> @tbjgolden) */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var messages = {};
var predicates = {};
var collections = ["array", "arrayLike", "iterable", "object"];
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var keys = Object.keys;
var slice = Array.prototype.slice;
var isArray = Array.isArray;
var neginf = Number.NEGATIVE_INFINITY;
var posinf = Number.POSITIVE_INFINITY;
var haveSymbols = typeof Symbol === "function";
var haveMaps = typeof Map === "function";
var haveSets = typeof Set === "function";
var fns = [{
  n: "equal",
  f: equal,
  s: "equal {e}"
}, {
  n: "undefined",
  f: isUndefined,
  s: "be undefined"
}, {
  n: "null",
  f: isNull,
  s: "be null"
}, {
  n: "assigned",
  f: assigned,
  s: "be assigned"
}, {
  n: "primitive",
  f: primitive,
  s: "be primitive type"
}, {
  n: "contains",
  f: contains,
  s: "contain {e}"
}, {
  n: "in",
  f: isIn,
  s: "be in {e}"
}, {
  n: "containsKey",
  f: containsKey,
  s: "contain key {e}"
}, {
  n: "keyIn",
  f: keyIn,
  s: "be key in {e}"
}, {
  n: "zero",
  f: zero,
  s: "be 0"
}, {
  n: "one",
  f: one,
  s: "be 1"
}, {
  n: "infinity",
  f: infinity,
  s: "be infinity"
}, {
  n: "number",
  f: number,
  s: "be Number"
}, {
  n: "integer",
  f: integer,
  s: "be integer"
}, {
  n: "float",
  f: _float,
  s: "be non-integer number"
}, {
  n: "even",
  f: even,
  s: "be even number"
}, {
  n: "odd",
  f: odd,
  s: "be odd number"
}, {
  n: "greater",
  f: greater,
  s: "be greater than {e}"
}, {
  n: "less",
  f: less,
  s: "be less than {e}"
}, {
  n: "between",
  f: between,
  s: "be between {e} and {e2}"
}, {
  n: "greaterOrEqual",
  f: greaterOrEqual,
  s: "be greater than or equal to {e}"
}, {
  n: "lessOrEqual",
  f: lessOrEqual,
  s: "be less than or equal to {e}"
}, {
  n: "inRange",
  f: inRange,
  s: "be in the range {e} to {e2}"
}, {
  n: "positive",
  f: positive,
  s: "be positive number"
}, {
  n: "negative",
  f: negative,
  s: "be negative number"
}, {
  n: "string",
  f: string,
  s: "be String"
}, {
  n: "emptyString",
  f: emptyString,
  s: "be empty string"
}, {
  n: "nonEmptyString",
  f: nonEmptyString,
  s: "be non-empty string"
}, {
  n: "match",
  f: match,
  s: "match {e}"
}, {
  n: "boolean",
  f: _boolean,
  s: "be Boolean"
}, {
  n: "object",
  f: object,
  s: "be Object"
}, {
  n: "emptyObject",
  f: emptyObject,
  s: "be empty object"
}, {
  n: "nonEmptyObject",
  f: nonEmptyObject,
  s: "be non-empty object"
}, {
  n: "instanceStrict",
  f: instanceStrict,
  s: "be instanceof {t}"
}, {
  n: "thenable",
  f: thenable,
  s: "be promise-like"
}, {
  n: "instance",
  f: instance,
  s: "be {t}"
}, {
  n: "like",
  f: like,
  s: "be like {e}"
}, {
  n: "array",
  f: array,
  s: "be Array"
}, {
  n: "emptyArray",
  f: emptyArray,
  s: "be empty array"
}, {
  n: "nonEmptyArray",
  f: nonEmptyArray,
  s: "be non-empty array"
}, {
  n: "arrayLike",
  f: arrayLike,
  s: "be array-like"
}, {
  n: "iterable",
  f: iterable,
  s: "be iterable"
}, {
  n: "date",
  f: date,
  s: "be valid Date"
}, {
  n: "function",
  f: isFunction,
  s: "be Function"
}, {
  n: "hasLength",
  f: hasLength,
  s: "have length {e}"
}, {
  n: "throws",
  f: _throws,
  s: "throw"
}];
fns.forEach(function (_ref) {
  var n = _ref.n,
      f = _ref.f,
      s = _ref.s;
  messages[n] = "expected {a} to ".concat(s);
  predicates[n] = f;
});
var functions = mixin({
  map: map,
  all: all,
  any: any
}, predicates);
var assert = createModifiedPredicates(assertModifier, assertImpl);
var not = createModifiedPredicates(notModifier, notImpl);
var maybe = createModifiedPredicates(maybeModifier, maybeImpl);
assert.not = createModifiedModifier(assertModifier, not, "not ");
assert.maybe = createModifiedModifier(assertModifier, maybe, "maybe ");
collections.forEach(createOfPredicates);
createOfModifiers(assert, assertModifier);
createOfModifiers(not, notModifier);
collections.forEach(createMaybeOfModifiers);
/**
 * Public function `equal`.
 *
 * Returns true if `lhs` and `rhs` are strictly equal, without coercion.
 * Returns false otherwise.
 */

function equal(lhs, rhs) {
  return lhs === rhs;
}
/**
 * Public function `undefined`.
 *
 * Returns true if `data` is undefined, false otherwise.
 */


function isUndefined(data) {
  return data === undefined;
}
/**
 * Public function `null`.
 *
 * Returns true if `data` is null, false otherwise.
 */


function isNull(data) {
  return data === null;
}
/**
 * Public function `assigned`.
 *
 * Returns true if `data` is not null or undefined, false otherwise.
 */


function assigned(data) {
  return data !== undefined && data !== null;
}
/**
 * Public function `primitive`.
 *
 * Returns true if `data` is a primitive type, false otherwise.
 */


function primitive(data) {
  var type;

  switch (data) {
    case null:
    case undefined:
    case false:
    case true:
      return true;
  }

  type = _typeof(data);
  return type === "string" || type === "number" || haveSymbols && type === "symbol";
}
/**
 * Public function `zero`.
 *
 * Returns true if `data` is zero, false otherwise.
 */


function zero(data) {
  return data === 0;
}
/**
 * Public function `one`.
 *
 * Returns true if `data` is one, false otherwise.
 */


function one(data) {
  return data === 1;
}
/**
 * Public function `infinity`.
 *
 * Returns true if `data` is positive or negative infinity, false otherwise.
 */


function infinity(data) {
  return data === neginf || data === posinf;
}
/**
 * Public function `number`.
 *
 * Returns true if `data` is a number, false otherwise.
 */


function number(data) {
  return typeof data === "number" && data > neginf && data < posinf;
}
/**
 * Public function `integer`.
 *
 * Returns true if `data` is an integer, false otherwise.
 */


function integer(data) {
  return typeof data === "number" && data % 1 === 0;
}
/**
 * Public function `float`.
 *
 * Returns true if `data` is a non-integer number, false otherwise.
 */


function _float(data) {
  return number(data) && data % 1 !== 0;
}
/**
 * Public function `even`.
 *
 * Returns true if `data` is an even number, false otherwise.
 */


function even(data) {
  return typeof data === "number" && data % 2 === 0;
}
/**
 * Public function `odd`.
 *
 * Returns true if `data` is an odd number, false otherwise.
 */


function odd(data) {
  return integer(data) && data % 2 !== 0;
}
/**
 * Public function `greater`.
 *
 * Returns true if `lhs` is a number greater than `rhs`, false otherwise.
 */


function greater(lhs, rhs) {
  return number(lhs) && lhs > rhs;
}
/**
 * Public function `less`.
 *
 * Returns true if `lhs` is a number less than `rhs`, false otherwise.
 */


function less(lhs, rhs) {
  return number(lhs) && lhs < rhs;
}
/**
 * Public function `between`.
 *
 * Returns true if `data` is a number between `x` and `y`, false otherwise.
 */


function between(data, x, y) {
  if (x < y) {
    return greater(data, x) && data < y;
  }

  return less(data, x) && data > y;
}
/**
 * Public function `greaterOrEqual`.
 *
 * Returns true if `lhs` is a number greater than or equal to `rhs`, false
 * otherwise.
 */


function greaterOrEqual(lhs, rhs) {
  return number(lhs) && lhs >= rhs;
}
/**
 * Public function `lessOrEqual`.
 *
 * Returns true if `lhs` is a number less than or equal to `rhs`, false
 * otherwise.
 */


function lessOrEqual(lhs, rhs) {
  return number(lhs) && lhs <= rhs;
}
/**
 * Public function `inRange`.
 *
 * Returns true if `data` is a number in the range `x..y`, false otherwise.
 */


function inRange(data, x, y) {
  if (x < y) {
    return greaterOrEqual(data, x) && data <= y;
  }

  return lessOrEqual(data, x) && data >= y;
}
/**
 * Public function `positive`.
 *
 * Returns true if `data` is a positive number, false otherwise.
 */


function positive(data) {
  return greater(data, 0);
}
/**
 * Public function `negative`.
 *
 * Returns true if `data` is a negative number, false otherwise.
 */


function negative(data) {
  return less(data, 0);
}
/**
 * Public function `string`.
 *
 * Returns true if `data` is a string, false otherwise.
 */


function string(data) {
  return typeof data === "string";
}
/**
 * Public function `emptyString`.
 *
 * Returns true if `data` is the empty string, false otherwise.
 */


function emptyString(data) {
  return data === "";
}
/**
 * Public function `nonEmptyString`.
 *
 * Returns true if `data` is a non-empty string, false otherwise.
 */


function nonEmptyString(data) {
  return string(data) && data !== "";
}
/**
 * Public function `match`.
 *
 * Returns true if `data` is a string that matches `regex`, false otherwise.
 */


function match(data, regex) {
  return string(data) && !!data.match(regex);
}
/**
 * Public function `boolean`.
 *
 * Returns true if `data` is a boolean value, false otherwise.
 */


function _boolean(data) {
  return data === false || data === true;
}
/**
 * Public function `object`.
 *
 * Returns true if `data` is a plain-old JS object, false otherwise.
 */


function object(data) {
  return toString.call(data) === "[object Object]";
}
/**
 * Public function `emptyObject`.
 *
 * Returns true if `data` is an empty object, false otherwise.
 */


function emptyObject(data) {
  return object(data) && !some(data, function () {
    return true;
  });
}

function some(data, predicate) {
  for (var key in data) {
    if (hasOwnProperty.call(data, key)) {
      if (predicate(key, data[key])) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Public function `nonEmptyObject`.
 *
 * Returns true if `data` is a non-empty object, false otherwise.
 */


function nonEmptyObject(data) {
  return object(data) && some(data, function () {
    return true;
  });
}
/**
 * Public function `thenable`.
 *
 * Returns true if `data` has a `then` method.
 */


function thenable(data) {
  return assigned(data) && isFunction(data.then);
}
/**
 * Public function `instanceStrict`.
 *
 * Returns true if `data` is an instance of `prototype`, false otherwise.
 */


function instanceStrict(data, prototype) {
  try {
    return data instanceof prototype;
  } catch (error) {
    return false;
  }
}
/**
 * Public function `instance`.
 *
 * Returns true if `data` is an instance of `prototype`, false otherwise.
 * Falls back to testing constructor.name and Object.prototype.toString
 * if the initial instanceof test fails.
 */


function instance(data, prototype) {
  try {
    return instanceStrict(data, prototype) || data.constructor.name === prototype.name || toString.call(data) === "[object " + prototype.name + "]";
  } catch (error) {
    return false;
  }
}
/**
 * Public function `like`.
 *
 * Tests whether `data` 'quacks like a duck'. Returns true if `data` has all
 * of the properties of `archetype` (the 'duck'), false otherwise.
 */


function like(data, archetype) {
  var name;

  for (name in archetype) {
    if (hasOwnProperty.call(archetype, name)) {
      if (hasOwnProperty.call(data, name) === false || _typeof(data[name]) !== _typeof(archetype[name])) {
        return false;
      }

      if (object(data[name]) && like(data[name], archetype[name]) === false) {
        return false;
      }
    }
  }

  return true;
}
/**
 * Public function `array`.
 *
 * Returns true if `data` is an array, false otherwise.
 */


function array(data) {
  return isArray(data);
}
/**
 * Public function `emptyArray`.
 *
 * Returns true if `data` is an empty array, false otherwise.
 */


function emptyArray(data) {
  return isArray(data) && data.length === 0;
}
/**
 * Public function `nonEmptyArray`.
 *
 * Returns true if `data` is a non-empty array, false otherwise.
 */


function nonEmptyArray(data) {
  return isArray(data) && data.length > 0;
}
/**
 * Public function `arrayLike`.
 *
 * Returns true if `data` is an array-like object, false otherwise.
 */


function arrayLike(data) {
  return assigned(data) && data.length >= 0;
}
/**
 * Public function `iterable`.
 *
 * Returns true if `data` is an iterable, false otherwise.
 */


function iterable(data) {
  if (!haveSymbols) {
    // Fall back to `arrayLike` predicate in pre-ES6 environments.
    return arrayLike(data);
  }

  return assigned(data) && isFunction(data[Symbol.iterator]);
}
/**
 * Public function `contains`.
 *
 * Returns true if `data` contains `value`, false otherwise.
 * Works with objects, arrays and array-likes (including strings).
 */


function contains(data, value) {
  var iterator, iteration;

  if (!assigned(data)) {
    return false;
  }

  if (haveSets && instanceStrict(data, Set)) {
    return data.has(value);
  }

  if (string(data)) {
    return data.indexOf(value) !== -1;
  }

  if (haveSymbols && data[Symbol.iterator] && isFunction(data.values)) {
    iterator = data.values();

    do {
      iteration = iterator.next();

      if (iteration.value === value) {
        return true;
      }
    } while (!iteration.done);

    return false;
  }

  return some(data, function (key, dataValue) {
    return dataValue === value;
  });
}
/**
 * Public function `in`.
 *
 * Returns true if `value` is in `data`, false otherwise.
 * Like `contains`, but with arguments flipped.
 */


function isIn(value, data) {
  return contains(data, value);
}
/**
 * Public function `containsKey`.
 *
 * Returns true if `data` contains key `key`, false otherwise.
 * Works with objects, arrays and array-likes (including strings).
 */


function containsKey(data, key) {
  if (!assigned(data)) {
    return false;
  }

  if (haveMaps && instanceStrict(data, Map)) {
    return data.has(key);
  }

  if (iterable(data) && !number(+key)) {
    return false;
  }

  return !!data[key];
}
/**
 * Public function `keyIn`.
 *
 * Returns true if key `key` is in `data`, false otherwise.
 * Like `contains`, but with arguments flipped.
 */


function keyIn(key, data) {
  return containsKey(data, key);
}
/**
 * Public function `hasLength`.
 *
 * Returns true if `data` has a length property that equals `length`, false
 * otherwise.
 */


function hasLength(data, length) {
  return assigned(data) && data.length === length;
}
/**
 * Public function `date`.
 *
 * Returns true if `data` is a valid date, false otherwise.
 */


function date(data) {
  return instanceStrict(data, Date) && integer(data.getTime());
}
/**
 * Public function `function`.
 *
 * Returns true if `data` is a function, false otherwise.
 */


function isFunction(data) {
  return typeof data === "function";
}
/**
 * Public function `throws`.
 *
 * Returns true if `data` is a function that throws, false otherwise.
 */


function _throws(data) {
  if (!isFunction(data)) {
    return false;
  }

  try {
    data();
  } catch (error) {
    return true;
  }

  return false;
}
/**
 * Public function `map`.
 *
 * Maps each value from `data` to the corresponding predicate and returns
 * the results. If the same function is to be applied across all of the data,
 * a single predicate function may be passed in.
 */


function map(data, predicates) {
  var result;

  if (isArray(data)) {
    result = [];
  } else {
    result = {};
  }

  if (isFunction(predicates)) {
    forEach(data, function (key, value) {
      result[key] = predicates(value);
    });
  } else {
    if (!isArray(predicates)) {
      assert.object(predicates);
    }

    var dataKeys = keys(data || {});
    forEach(predicates, function (key, predicate) {
      dataKeys.some(function (dataKey, index) {
        if (dataKey === key) {
          dataKeys.splice(index, 1);
          return true;
        }

        return false;
      });

      if (isFunction(predicate)) {
        if (not.assigned(data)) {
          result[key] = !!predicate.m;
        } else {
          result[key] = predicate(data[key]);
        }
      } else {
        result[key] = map(data[key], predicate);
      }
    });
  }

  return result;
}

function forEach(object, action) {
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      action(key, object[key]);
    }
  }
}
/**
 * Public function `all`
 *
 * Check that all boolean values are true
 * in an array or object returned from `map`.
 */


function all(data) {
  if (isArray(data)) {
    return testArray(data, false);
  }

  assert.object(data);
  return testObject(data, false);
}

function testArray(data, result) {
  var i;

  for (i = 0; i < data.length; i += 1) {
    if (data[i] === result) {
      return result;
    }
  }

  return !result;
}

function testObject(data, result) {
  var key, value;

  for (key in data) {
    if (hasOwnProperty.call(data, key)) {
      value = data[key];

      if (object(value) && testObject(value, result) === result) {
        return result;
      }

      if (value === result) {
        return result;
      }
    }
  }

  return !result;
}
/**
 * Public function `any`
 *
 * Check that at least one boolean value is true
 * in an array or object returned from `map`.
 */


function any(data) {
  if (isArray(data)) {
    return testArray(data, true);
  }

  assert.object(data);
  return testObject(data, true);
}

function mixin(target, source) {
  forEach(source, function (key, value) {
    target[key] = value;
  });
  return target;
}
/**
 * Public modifier `assert`.
 *
 * Throws if `predicate` returns false.
 */


function assertModifier(predicate, defaultMessage) {
  return function () {
    var args = arguments;
    var argCount = predicate.l || predicate.length;
    var message = args[argCount];
    var ErrorType = args[argCount + 1];
    assertImpl(predicate.apply(null, args), nonEmptyString(message) ? message : defaultMessage.replace("{a}", messageFormatter(args[0])).replace("{e}", messageFormatter(args[1])).replace("{e2}", messageFormatter(args[2])).replace("{t}", function () {
      var arg = args[1];

      if (arg && arg.name) {
        return arg.name;
      }

      return arg;
    }), isFunction(ErrorType) ? ErrorType : TypeError);
    return args[0];
  };
}

function messageFormatter(arg) {
  return function () {
    if (string(arg)) {
      return '"' + arg.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
    }

    if (arg && arg !== true && arg.constructor && !instanceStrict(arg, RegExp) && typeof arg !== "number") {
      return arg.constructor.name;
    }

    return arg;
  };
}

function assertImpl(value, message, ErrorType) {
  if (value) {
    return value;
  }

  throw new (ErrorType || Error)(message || "assert failed");
}
/**
 * Public modifier `not`.
 *
 * Negates `predicate`.
 */


function notModifier(predicate) {
  var modifiedPredicate = function modifiedPredicate() {
    return notImpl(predicate.apply(null, arguments));
  };

  modifiedPredicate.l = predicate.length;
  return modifiedPredicate;
}

function notImpl(value) {
  return !value;
}
/**
 * Public modifier `maybe`.
 *
 * Returns true if predicate argument is  null or undefined,
 * otherwise propagates the return value from `predicate`.
 */


function maybeModifier(predicate) {
  var modifiedPredicate = function modifiedPredicate() {
    if (not.assigned(arguments[0])) {
      return true;
    }

    return predicate.apply(null, arguments);
  };

  modifiedPredicate.l = predicate.length; // Hackishly indicate that this is a maybe.xxx predicate.
  // Without this flag, the alternative would be to iterate
  // through the maybe predicates or use indexOf to check,
  // which would be time-consuming.

  modifiedPredicate.m = true;
  return modifiedPredicate;
}

function maybeImpl(value) {
  if (assigned(value) === false) {
    return true;
  }

  return value;
}
/**
 * Public modifier `of`.
 *
 * Applies the chained predicate to members of the collection.
 */


function ofModifier(target, type, predicate) {
  var modifiedPredicate = function modifiedPredicate() {
    var collection, args;
    collection = arguments[0];

    if (target === "maybe" && not.assigned(collection)) {
      return true;
    }

    if (!type(collection)) {
      return false;
    }

    collection = coerceCollection(type, collection);
    args = slice.call(arguments, 1);

    try {
      collection.forEach(function (item) {
        if ((target !== "maybe" || assigned(item)) && !predicate.apply(null, [item].concat(args))) {
          // TODO: Replace with for...of when ES6 is required.
          throw 0;
        }
      });
    } catch (ignore) {
      return false;
    }

    return true;
  };

  modifiedPredicate.l = predicate.length;
  return modifiedPredicate;
}

function coerceCollection(type, collection) {
  switch (type) {
    case arrayLike:
      return slice.call(collection);

    case object:
      return keys(collection).map(function (key) {
        return collection[key];
      });

    default:
      return collection;
  }
}

function createModifiedPredicates(modifier, object) {
  return createModifiedFunctions([modifier, predicates, object, ""]);
}

function createModifiedFunctions(args) {
  var modifier, messageModifier, object, functions;
  modifier = args.shift();
  messageModifier = args.pop();
  object = args.pop();
  functions = args.pop();
  forEach(functions, function (key, fn) {
    var message = messages[key];

    if (message && messageModifier) {
      message = message.replace("to", messageModifier + "to");
    }

    Object.defineProperty(object, key, {
      configurable: false,
      enumerable: true,
      writable: false,
      value: modifier.apply(null, args.concat(fn, message))
    });
  });
  return object;
}

function createModifiedModifier(modifier, modified, messageModifier) {
  return createModifiedFunctions([modifier, modified, {}, messageModifier]);
}

function createOfPredicates(key) {
  predicates[key].of = createModifiedFunctions([ofModifier.bind(null, null), predicates[key], predicates, {}, ""]);
}

function createOfModifiers(base, modifier) {
  collections.forEach(function (key) {
    base[key].of = createModifiedModifier(modifier, predicates[key].of);
  });
}

function createMaybeOfModifiers(key) {
  maybe[key].of = createModifiedFunctions([ofModifier.bind(null, "maybe"), predicates[key], predicates, {}, ""]);
  assert.maybe[key].of = createModifiedModifier(assertModifier, maybe[key].of);
  assert.not[key].of = createModifiedModifier(assertModifier, not[key].of);
}

var check = mixin(functions, {
  assert: assert,
  not: not,
  maybe: maybe
});

var fastClone = function fastClone(val) {
  check.assert.not["function"](val);
  if (_typeof(val) !== "object") return val;
  check.assert.array(val);
  var arr = [];
  var len = val.length;

  for (var i = 0; i < len; i++) {
    arr.push(fastClone(val[i]));
  }

  return arr;
};
var map$1 = function map(arr, fn) {
  check.assert.array(arr);
  check.assert["function"](fn);
  var out = [];
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    out.push(fn(arr[i]));
  }

  return out;
};
var flat = function flat(arr) {
  check.assert.array.of.array(arr);
  return [].concat.apply([], arr);
};
var combinations = function combinations(mods) {
  check.assert.array(mods);
  check.assert.array.of.nonEmptyArray(mods);
  var list = [[]];

  while (mods.length) {
    list = flat(mods.shift().map(function (opt) {
      return list.map(function (prev) {
        return prev.concat([opt]);
      });
    }));
  }

  return list;
};
var assign = function assign(objects) {
  check.assert.nonEmptyArray(objects);
  check.assert.array.of.nonEmptyObject(objects);
  var out = {};
  var len = objects.length;

  for (var i = 0; i < len; i++) {
    var obj = objects[i];

    for (var nextKey in obj) {
      out[nextKey] = obj[nextKey];
    }
  }

  return out;
};
var toString$1 = function toString(value) {
  return typeof value === "string" ? value : value + "";
};

var iteratorRegex = /\{[a-z]+\}/gi; // private constants

var _hyphenOrDigitRegex = /-|[^0-9]/g;
var _notUpperOrDigitRegex = /[^A-Z0-9]/g; // private helpers

var _expandDeclaration = function _expandDeclaration(subpair) {
  return "".concat(subpair[0], ":").concat(subpair[1]);
};

var _addEmptyMod = function _addEmptyMod(mod) {
  return [["", ""]].concat(mod);
};

var _toCase = function _toCase(s, upper) {
  return s["to".concat(upper ? "Upp" : "Low", "erCase")]();
};

var _toPair = function _toPair(input, isValue) {
  if (typeof input === "number") {
    var str = toString$1(input);
    return [str.replace(_hyphenOrDigitRegex, function (match) {
      return match === "-" ? "N" : "";
    }), str];
  } else {
    return [_toCase(input.replace(_notUpperOrDigitRegex, ""), isValue), _toCase(input, false)];
  }
};

var _toPairs = function _toPairs(inputs, isValue) {
  return inputs.length ? map$1(inputs, function (input) {
    return _toPair(input, isValue);
  }) : map$1(Object.keys(inputs), function (key) {
    return [toString$1(key), toString$1(inputs[key])];
  });
}; // expand ainsley.defs


var expandDefs = function expandDefs(ainsley, ruleSet) {
  var pair = ruleSet[1].reduce(function (iters, pair) {
    return [iters[0].concat(toString$1(pair[0]).match(iteratorRegex) || []), iters[1].concat(toString$1(pair[1]).match(iteratorRegex) || [])];
  }, [[], []]);
  return map$1(combinations(flat([map$1(pair[0], function (iter) {
    return map$1(_toPairs(ainsley[iter]), function (pair) {
      return [iter, pair[0], pair[1]];
    });
  }), map$1(pair[1], function (iter) {
    return map$1(_toPairs(ainsley[iter], true), function (pair) {
      return [iter, pair[0], pair[1]];
    });
  })])), function (perm) {
    var clone = fastClone(ruleSet);

    for (var i = 0; clone[0].includes("&"); i++) {
      clone[0] = clone[0].replace("&", perm[i][1]);
    }

    for (var _i = 0; _i < clone[1].length; _i++) {
      var decl = clone[1][_i];

      while (perm.length > 0 && decl[0].includes(perm[0][0])) {
        var first = perm.shift();
        decl[0] = decl[0].replace(first[0], first[2]);
      }
    }

    for (var _i2 = 0; _i2 < clone[1].length; _i2++) {
      var _decl = clone[1][_i2];

      while (perm.length > 0 && _decl[1].includes(perm[0][0])) {
        var _first = perm.shift();

        _decl[1] = _decl[1].replace(_first[0], _first[2]);
      }
    }

    return clone;
  });
}; // expand ainsley.props

var expandProps = function expandProps(pair) {
  var prop = _toPairs([pair[0]])[0];

  return map$1(_toPairs(pair[1], true), function (subpair) {
    return ["".concat(prop[0]).concat(subpair[0]), [[prop[1], subpair[1]]]];
  });
}; // compile ainsley to a simple stylesheet ast

var ainsleyToAST = function ainsleyToAST(ainsley) {
  var ast = [].concat(flat(map$1(ainsley.defs || [], function (def) {
    return expandDefs(ainsley, def);
  })), flat(map$1(ainsley.props || [], expandProps)), ainsley.raw || []);
  return [ainsley.reset || ""].concat(flat(map$1(combinations(map$1(ainsley.mods || [], _addEmptyMod)), function (comb) {
    return comb.reduce(function (ast, pair) {
      if (!pair[1]) {
        return ast;
      } else if (pair[1][0] === "@") {
        return [[pair[1], map$1(ast, function (subpair) {
          return ["".concat(pair[0]).concat(subpair[0]), subpair[1]];
        })]];
      } else {
        return map$1(ast, function (subpair) {
          return ["".concat(pair[0]).concat(subpair[0]).concat(pair[1]), subpair[1]];
        });
      }
    }, ast);
  })));
};
var ruleToCSS = function ruleToCSS(rule) {
  if (typeof rule === "string") return rule;
  return rule[0][0] === "@" ? "".concat(rule[0], "{").concat(astToCSS(rule[1]), "}") : ".".concat(rule[0], "{").concat(map$1(rule[1], _expandDeclaration).join(";"), "}");
}; // generate css from simple stylesheet ast

var astToCSS = function astToCSS(ast) {
  return map$1(ast, ruleToCSS).join("");
}; // generate css from ainsley

var ainsleyToCSS = function ainsleyToCSS(ainsley) {
  return astToCSS(ainsleyToAST(ainsley));
}; // insert ainsley into a dom

var ainsleyInsert = function ainsleyInsert(ainsley, stylesheet) {
  var ast = ainsleyToAST(ainsley);

  for (var i = ast.length - 1; i >= 0; i--) {
    stylesheet.insertRule(ruleToCSS(ast[i]), 0);
  }
};

var isRegexp = function (input) {
  return Object.prototype.toString.call(input) === '[object RegExp]';
};

var flagMap = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  sticky: 'y',
  unicode: 'u'
};

var cloneRegexp = function (regexp) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!isRegexp(regexp)) {
    throw new TypeError('Expected a RegExp instance');
  }

  var flags = Object.keys(flagMap).map(function (flag) {
    return (typeof options[flag] === 'boolean' ? options[flag] : regexp[flag]) ? flagMap[flag] : '';
  }).join('');
  var clonedRegexp = new RegExp(options.source || regexp.source, flags);
  clonedRegexp.lastIndex = typeof options.lastIndex === 'number' ? options.lastIndex : regexp.lastIndex;
  return clonedRegexp;
};

var regex = cloneRegexp(iteratorRegex, {
  global: false
});

var isIterator = function isIterator(str) {
  return regex.test(str);
};

var checkDefs = function checkDefs(errors, defs) {
  try {
    check.assert.array(defs);
    check.assert.array.of.nonEmptyArray(defs);
    defs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          sel = _ref2[0],
          vals = _ref2[1];

      check.assert.nonEmptyString(sel);
      check.assert.nonEmptyArray(vals);
      check.assert.array.of.nonEmptyArray(vals);
      vals.forEach(function (decl) {
        check.assert.hasLength(decl, 2);

        var _decl = _slicedToArray(decl, 2),
            prop = _decl[0],
            val = _decl[1];

        check.assert.nonEmptyString(prop);
        check.assert(check.nonEmptyString(val) || check.number(val));
      });
    });
  } catch (err) {
    errors.push("\"defs\" is invalid: ".concat(err.message));
  }
};

var checkProps = function checkProps(errors, props) {
  try {
    check.assert.array(props);
    check.assert.array.of.nonEmptyArray(props);
    props.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          prop = _ref4[0],
          valsExpr = _ref4[1];

      check.assert.nonEmptyString(prop);
      checkIterator(errors, valsExpr, "props");
    });
  } catch (err) {
    errors.push("\"props\" is invalid: ".concat(err.message));
  }
};

var checkRaw = function checkRaw(errors, raw) {
  try {
    check.assert.array(raw);
    check.assert.array.of.nonEmptyArray(raw);
    raw.forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          sel = _ref6[0],
          vals = _ref6[1];

      check.assert.nonEmptyString(sel);
      check.assert.nonEmptyArray(vals);
      check.assert.array.of.nonEmptyArray(vals);
      vals.forEach(function (decl) {
        check.assert.hasLength(decl, 2);

        var _decl2 = _slicedToArray(decl, 2),
            prop = _decl2[0],
            val = _decl2[1];

        check.assert.nonEmptyString(prop);
        check.assert(check.nonEmptyString(val) || check.number(val));
      });
    });
  } catch (err) {
    errors.push("\"raw\" is invalid: ".concat(err.message));
  }
};

var checkMods = function checkMods(errors, mods) {
  try {
    check.assert.array(mods);
    check.assert.array.of.nonEmptyArray(mods);
    mods.forEach(function (group) {
      check.assert.nonEmptyArray(group);
      check.assert.array.of.nonEmptyArray(group);
      group.forEach(function (pair) {
        check.assert.hasLength(pair, 2);

        var _pair = _slicedToArray(pair, 2),
            prefix = _pair[0],
            mod = _pair[1];

        check.assert.nonEmptyString(prefix);
        check.assert.nonEmptyString(mod);
      });
    });
  } catch (err) {
    errors.push("\"mods\" is invalid: ".concat(err.message));
  }
};

var checkReset = function checkReset(errors, reset) {
  try {
    check.assert.maybe.string(reset);
  } catch (err) {
    errors.push("\"reset\" is invalid: ".concat(err.message));
  }
};

var checkIterator = function checkIterator(errors, iterator, name) {
  try {
    check.assert(check.nonEmptyObject(iterator) && Object.values(iterator).every(function (val) {
      return check.nonEmptyString(val) || check.number(val);
    }) || check.nonEmptyArray(iterator) && iterator.every(function (val) {
      return check.nonEmptyString(val) || check.number(val);
    }));
  } catch (err) {
    errors.push("\"".concat(name, "\" is invalid: ").concat(err.message));
  }
};

var lint = function lint(ainsley) {
  var errors = [];

  try {
    var defsJson = JSON.stringify(ainsley.defs);

    for (var k in ainsley) {
      if (isIterator(k)) {
        checkIterator(errors, ainsley[k], k);

        if (!defsJson.includes(k)) {
          errors.push("iterator ".concat(k, " defined but not used in \"defs\""));
        }
      } else if (k === "defs") {
        checkDefs(errors, ainsley.defs);
        var match = defsJson.match(iteratorRegex);

        if (match) {
          for (var i = 0; i < match.length; i++) {
            if (!ainsley[match[i]]) {
              errors.push("iterator ".concat(match[i], " referenced in \"defs\" but not defined"));
            }
          }
        }
      } else if (k === "props") {
        checkProps(errors, ainsley.props);
      } else if (k === "raw") {
        checkRaw(errors, ainsley.raw);
      } else if (k === "mods") {
        checkMods(errors, ainsley.mods);
      } else if (k === "reset") {
        checkReset(errors, ainsley.reset);
      } else {
        errors.push("invalid property \"".concat(k, "\" found"));
      }
    }
  } catch (err) {
    errors.push("Error during lint: ".concat(err.message));
  }

  return errors.length ? errors : null;
};

var empty = {
  reset: "",
  defs: [],
  props: [],
  raw: [],
  mods: []
};

var extend = function extend(ainsleys) {
  check.assert.nonEmptyArray(ainsleys);
  check.assert.array.of.object(ainsleys);
  ainsleys.forEach(function (subainsley) {
    check.assert.maybe.array.of.nonEmptyArray(subainsley.defs);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.props);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.raw);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.mods);
  });
  var result = ainsleys.reduce(function (ainsley, next) {
    return assign([ainsley, next, {
      defs: flat([ainsley.defs, next.defs || []]),
      props: flat([ainsley.props, next.props || []]),
      raw: flat([ainsley.raw, next.raw || []]),
      mods: flat([ainsley.mods, next.mods || []])
    }]);
  }, empty);
  lint(result);
  return result;
};

// prettier-ignore
var base = {
  defs: [["c&", [["color", "{colors}"]]], ["bgc&", [["background-color", "{colors}"]]], ["fs&", [["font-size", "{typeScale}"], ["line-height", 1.2]]], ["&&", [["{scalar}", "{scale}"]]], ["&&", [["{direction}", "{scale}"]]], ["&&&", [["{vector}-{direction}", "{scale}"]]], ["m&N&", [["margin-{direction}", "-{scale}"]]], ["bgp&&", [["background-position", "{xLoc} {yLoc}"]]], ["b&w&", [["border-{direction}-width", "{scale}"]]], ["b&c&", [["border-{direction}-color", "{colors}"]]], ["fx&&&", [["flex", "{flexChange} {flexChange} {flexBasis}"]]], ["&&", [["{flexCrossAxes}", "{flexCrossAxis}"]]], ["ov&&", [["overflow", "{overflow} {overflow}"]]]],
  props: [["Display", ["Inline", "Block", "FleX", "None", "Inline-Block", "Inline-FleX"]], ["Text-Decoration", ["Line-through", "Underline", "None"]], ["Font-STyle", ["Italic", "Normal"]], ["Text-Transform", ["Uppercase", "Lowercase"]], ["Overflow-Wrap", ["Break-Word", "Anywhere", "Normal"]], ["Background-Repeat", ["Repeat", "No-repeat"]], ["Position", ["Relative", "Absolute", "Fixed", "Sticky"]], ["Text-Align", ["Left", "Center", "Right", "Justify"]], ["Vertical-Align", ["Top", "Middle", "Bottom"]], ["Cursor", ["Default", "Pointer"]], ["Pointer-Events", ["None", "All"]], ["Z-Index", [0, 1, 2, 4, 8, 16, 32, -1]], ["Opacity", [0, 10, 20, 40, 80, 100]], ["White-Space", ["Pre", "Pre-Wrap", "NoWrap", "Normal"]], ["BackGround-Size", ["CoVer", "ConTain"]], ["FleX-Direction", ["Row", "Column", "Row-Reverse", "Column-Reverse"]], ["Justify-Content", ["Center", "Flex-Start", "Flex-End", "Space-Between", "Space-Evenly"]], ["Line-Height", {
    B: 1,
    T: 1.2,
    C: 1.3
  }], ["Font-Weight", {
    N: 400,
    M: 600,
    B: 700
  }]],
  mods: [[["o-", ":hover"], ["o-", ":focus"], ["o-", ":active"]], [["s-", "@media(min-width:384px)"], ["m-", "@media(min-width:768px)"], ["l-", "@media(min-width:1024px)"], ["x-", "@media(min-width:1536px)"]]],
  "{overflow}": ["Hidden", "Scroll", "Auto", "Visible"],
  "{flexCrossAxes}": ["Align-Items", "Align-Self", "Align-Content"],
  "{flexCrossAxis}": ["Flex-Start", "Flex-End", "Center", "Baseline", "Stretch"],
  "{flexChange}": {
    "0": "0",
    "1": "1",
    "2": "2",
    X: "11111111"
  },
  "{flexBasis}": {
    "0": "0%",
    A: "auto",
    P: "100%"
  },
  "{xLoc}": ["Left", "Right", "Center"],
  "{yLoc}": ["Top", "Bottom", "Center"],
  "{scalar}": ["Width", "maX-Width", "miN-Width", "Height", "maX-Height", "miN-Height", "Border-Radius"],
  "{vector}": ["Margin", "Padding"],
  "{direction}": ["Top", "Left", "Right", "Bottom"],
  "{colors}": {
    W: "white",
    B: "black",
    TR: "transparent",
    G98: "hsl(0,0%,98%)",
    G94: "hsl(0,0%,94%)",
    G88: "hsl(0,0%,88%)",
    G80: "hsl(0,0%,80%)",
    G30: "hsl(0,0%,30%)",
    G20: "hsl(0,0%,20%)",
    G10: "hsl(0,0%,10%)",
    B05: "hsla(0,0%,0%,05%)",
    B10: "hsla(0,0%,0%,10%)",
    B20: "hsla(0,0%,0%,20%)",
    B40: "hsla(0,0%,0%,40%)",
    B80: "hsla(0,0%,0%,80%)",
    W05: "hsla(0,0%,100%,05%)",
    W10: "hsla(0,0%,100%,10%)",
    W20: "hsla(0,0%,100%,20%)",
    W40: "hsla(0,0%,100%,40%)",
    W80: "hsla(0,0%,100%,80%)",
    PRIMARY: "#8d1d90",
    ALTPRIMARY: "#9d3ea0",
    SECONDARY: "#b7de58",
    ALTSECONDARY: "#c1e270",
    GOOD: "#3bb273",
    LIGHTGOOD: "#ebf7f1",
    WARN: "#e1bc29",
    LIGHTWARN: "#fcf8e9",
    BAD: "#e15554",
    LIGHTBAD: "#fceeed",
    MSG: "#3d70b2",
    LIGHTMSG: "#ebf0f7"
  },
  "{typeScale}": {
    H1: "72px",
    H2: "48px",
    H3: "32px",
    H4: "24px",
    H5: "20px",
    LG: "20px",
    MD: "16px",
    SM: "14px",
    XS: "12px"
  },
  "{scale}": {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "3": "3px",
    "10": "4px",
    "15": "6px",
    "20": "8px",
    "25": "12px",
    "30": "16px",
    "35": "24px",
    "40": "32px",
    "45": "48px",
    "50": "64px",
    "55": "96px",
    "60": "128px",
    "65": "192px",
    "70": "256px",
    "75": "384px",
    "80": "512px",
    "85": "768px",
    "90": "1024px",
    "95": "1536px",
    P50: "50%",
    P: "100%",
    H: "100vh",
    W: "100vw",
    X: "11111111px"
  },
  "reset": "*,::after,::before{box-sizing:border-box;outline-offset:0;border:0 solid}[type=button],[type=date],[type=datetime-local],[type=email],[type=file],[type=image],[type=month],[type=number],[type=password],[type=reset],[type=search],[type=submit],[type=tel],[type=text],[type=time],[type=url],[type=week],a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,button,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,time,tt,u,ul,var,video{margin:0;padding:0;border:0 solid;background:0 0;font:inherit;color:inherit;text-align:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}html{overflow-y:scroll;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:none}textarea{resize:vertical;overflow:auto}applet,canvas,img,object,svg,video{max-width:100%;height:auto}"
};

exports.ainsleyInsert = ainsleyInsert;
exports.ainsleyToAST = ainsleyToAST;
exports.ainsleyToCSS = ainsleyToCSS;
exports.astToCSS = astToCSS;
exports.base = base;
exports.expandDefs = expandDefs;
exports.expandProps = expandProps;
exports.extend = extend;
exports.iteratorRegex = iteratorRegex;
exports.lint = lint;
exports.ruleToCSS = ruleToCSS;
//# sourceMappingURL=ainsley.cjs.js.map
