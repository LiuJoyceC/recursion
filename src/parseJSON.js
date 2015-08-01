// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	// your code goes here
	var str = (json+'').trim();
	var first = str[0];
	var last = str[str.length - 1];

	switch (true) {
		case (first === '[' && last === ']'):
		case (first === '{' && last === '}'):
		case (first === '"' && last === '"'):
			return str.slice(1, str.length - 1);
		case (!isNaN(+str)):
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