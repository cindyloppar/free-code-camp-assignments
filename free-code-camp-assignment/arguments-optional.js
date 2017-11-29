
function sumTwoArguments(firstArgument,secondArgument){
   var args = Array.from(arguments);
    var sum = 0;
    if (secondArgument) {
        var answer = firstArgument + secondArgument;
        if (typeof answer !== "number") {
            return undefined;
        } else {
            return answer;
        }
    } else
        if (typeof firstArgument !== "number") {
            return undefined;
        }
    return function (secondArgument) {
        var answer = firstArgument + secondArgument;
        if (typeof answer == "string") { return undefined; }
        else { return answer; }
    };
}
    
console.log(sumTwoArguments(2,3));