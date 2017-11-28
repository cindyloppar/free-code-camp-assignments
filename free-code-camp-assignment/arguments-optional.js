
function sumTwoArguments(firstArgument,secondArgument){

    // returns an object {'0':2, '1':3}.
    // return arguments; 

// returns an array of the arguments.
  var arr = [];
  for(var i = 0; i < arguments.length; i++){
      arr.push(arguments[i]);
    }
    return arr;
}


console.log(sumTwoArguments(2,3));