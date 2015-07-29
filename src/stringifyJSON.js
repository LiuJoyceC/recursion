// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // Base case 1: functions and undefined
  if (_.indexOf(['function','undefined'], typeof obj) != -1) {
    return;
  }

  // Base case 2: strings
  else if (typeof obj == 'string') {
    return '"' + obj + '"';
  }

  // Base case 3: numbers, booleans, and null
  else if (typeof obj != 'object' || obj === null) {
    return obj + '';
  }

  // Recursive cases
  else {
    var result = '';

    // Recursive case 1: arrays
    if (Array.isArray(obj)) {
      _.each(obj,function(element) {
        result = result + ',' + (stringifyJSON(element) || 'null');
      });
      return '[' + result.slice(1) + ']';
    }

    // Recursive case 2: non-array objects
    else {
      var nestedResult;
      _.each(obj, function(element, key) {
        nestedResult = stringifyJSON(element);
        if (nestedResult) {
          result = result + ',"' + key + '":' + nestedResult;
        }
      })
      return '{' + result.slice(1) + '}';
    }
  }
};