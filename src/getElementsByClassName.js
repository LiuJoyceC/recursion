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
