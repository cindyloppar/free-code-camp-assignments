function dropElements(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i]) === true) {
            return arr.slice(i,arr.length)
        }

    }
    return [];

}
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));