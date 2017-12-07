
function sym(args) {
    var array = [];
    for (var i = 0; i < arguments.length; i++) {
        array.push(arguments[i]);
    }
    function difference(arr1, arr2) {
        var answer = [];
        arr1.forEach(function (items) {
            if (arr2.indexOf(items) === -1 && answer.indexOf(items) === -1) {
                answer.push(items)
            }
        });

        arr2.forEach(function(items){
            if(arr1.indexOf(items) === -1 && answer.indexOf(items) === -1){
                answer.push(items);
            }
        });
         return answer;
    }

     return array.reduce(difference);
}

console.log(sym([1, 2, 3], [5, 2, 1, 4]));