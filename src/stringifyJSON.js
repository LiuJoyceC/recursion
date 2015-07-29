// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // Error case
  if (_.indexOf(['function','undefined'], typeof obj) != -1) {
    return;
  }

  // Base case 1
  else if (typeof obj == 'string') {
    return '"' + obj + '"';
  }

  // Base case 2
  else if (typeof obj != 'object' || obj === null) {
    return obj + '';
  }

  // Recursive case
  else {
    var result = '';
    if (Array.isArray(obj)) {
      _.each(obj,function(element) {
        result = result + ',' + (stringifyJSON(element) || 'null');
      });
      return '[' + result.slice(1) + ']';
    }
  }
};
/*
var stringifyJSON = function (obj) {
  return '9';
}*/