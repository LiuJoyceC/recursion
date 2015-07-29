// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, element){
	// Added a second parameter to allow function to recursively
	// find child nodes of each element

  // your code here
  element = element || document; // First call will have one argument
  								// so element will be set to document

 // Initializes result array, onto which results from recursive calls
 // will be concatenated
  if (element.classList === undefined || _.indexOf(element.classList, className) === -1) {
  	var result = [];
  } else {
  	var result = [element];
  }


  _.each(element.childNodes, function(child) {
  	// result from recursive call gets concatenated to the current result
  	result = result.concat(getElementsByClassName(className, child));
  });

  return result;
};

// alternate solution in case we're required to have a base case and not allowed
// to use loops (including _.each):
// but this is a less elegant solution than above
// Also passes the Mocha Spec Runner (if you want to test it, don't forget to
// delete the 1 from the function name in both the first and last lines)

var getElementsByClassName1 = function(className, element, remainingNodes) {
	element = element || document;
	remainingNodes = remainingNodes || [];

	if (element.classList === undefined || _.indexOf(element.classList, className) === -1) {
  	var result = [];
  } else {
  	var result = [element];
  }

  // prepending childNodes to remainingNodes (maintains same order as native function)
  // since childNodes is an array-like object, must convert to true array first using slice
  remainingNodes = [].slice.apply(element.childNodes).concat(remainingNodes);

  // Base case
  if (remainingNodes.length === 0) {
  	return result;
  }

  // Recursive case
  else {
  	return result.concat(getElementsByClassName1(className, remainingNodes.shift(), remainingNodes));
  }
  
}