// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here

  // helper function used to allow backslash-escaping in strings
  var parseEscape = function(string) {
    //test for illegal characters
    for (var i = 0; i < string.length; i++) {
      if (['\n','\r','\t','\b','\f'].indexOf(string[i]) !== -1) {
        throw new SyntaxError;
      }
    }
    
    var segments = string.split('\\');
    var afterEsc = false;
    var firstChar;
    _.each(segments, function(segment, index) {
      if (afterEsc) {
        if (segment.slice(1).indexOf('"') !== -1) {throw new SyntaxError;}
        switch (segment[0]) {
          case undefined: firstChar = '\\'; afterEsc = false; break;
          case 'n': firstChar = '\n'; break;
          case 'r': firstChar = '\r'; break;
          case 't': firstChar = '\t'; break;
          case 'b': firstChar = '\b'; break;
          case 'f': firstChar = '\f'; break;
          case '\'': firstChar = '\''; break;
          case '\"': firstChar = '\"'; break;
          default: throw new SyntaxError;
        }
        segments[index] = firstChar + segment.slice(1);
      } else {
        if (segment.indexOf('"') !== -1) {throw new SyntaxError;}
        afterEsc = true;
      }
    })
    return segments.join('');
  }

  // helper function to split array/object by comma, but with
  // consideration for nested arrays/objects/strings
  var splitObj = function(inner, delim) {
    var splits = [];
    var charsAdded = 0;
    var openType;
    var queue = [];

    for (var j = 0; j < inner.length; j++) {
      openType = ['[', '{', '"'].indexOf(inner[j]);
      if (openType !== -1 && (openType !== 2 || queue[0] !== 2)) {
        if (openType !== 2 || inner[j-1] !== '\\') {
          queue.unshift(openType);
        }
      } else {
        if (inner[j] === delim && queue.length === 0) {
          splits.push(inner.slice(charsAdded, j));
          charsAdded = j + 1;
        } else if (queue.length > 0 && [']', '}', '"'][queue[0]] === inner[j]
          && inner[j-1] !== '\\') {
          queue.shift();
        }
      }
    } 
    if (queue.length > 0) {throw new SyntaxError;}
    splits.push(inner.slice(charsAdded));
    return splits;
  }


  var str = (json+'').trim();
  var first = str[0];
  var last = str[str.length - 1];
  var inner = str.slice(1, str.length - 1);

  switch (true) {
    case (str.length === 0):
      throw new SyntaxError();
    case (first === '[' && last === ']'):
      var result = [];
      if (inner.trim().length) {
        _.each(splitObj(inner,','), function(val) {
          result.push(parseJSON(val));
        });
      }
      return result;
    case (first === '{' && last === '}'):
      var result = {};
      if (inner.trim().length) {
        _.each(splitObj(inner,','), function(val) {
          var pair = splitObj(val,':');
          pair[0] = pair[0].trim();
          if (pair.length !== 2 ||
            pair[0][0] !== '"' ||
            pair[0][pair[0].length - 1] !== '"') {

            throw new SyntaxError();
          }
          result[pair[0].slice(1, pair[0].length - 1)] = parseJSON(pair[1]);
        });
      }
      return result;
    case (first === '"' && last === '"'):
      return parseEscape(inner);
    case (!isNaN(+str) && Math.abs(+str) !== Infinity):
    // JSON.parse does not allow Infinity or -Infinity
      return +str;
    case (str === 'true'):
      return true;
    case (str === 'false'):
      return false;
    case (str === 'null'):
      return null;
    default:
      throw new SyntaxError();
  }
};


// My notes:
// Will convert any output of JSON.stringify to the original argument
// (exception: when original argument contains a function or undefined)
// JSON.parse will not recognize single quotation marks within the
// argument string, only double quotation marks
// JSON.parse will ignore leading/ending spaces unless between double
// quotation mark characters. eg: JSON.parse(' [ 1   ,2,"  string  "]  ')
// would return [1,2,"  string  "];
// entering a primitive value other than a string will return itself
// entering a non-primitive value will throw an error
// object keys must be between double quotation mark characters


// A SyntaxError can be thrown by calling the command: throw new SyntaxError();

// Cases:
// Begins and ends with '[', ']'
// Begins + ends with '{','}'
// Begins and ends with double quotation mark characters
// +str is not NaN
// Equals 'true', 'false', or 'null'