function dropElements(arr, func){
    for(var i = 0; i < arr.length; i++){
        if(func(arr[0])){

        }else{
            arr.shift();
        }
    }
    return arr;

}
console.log(dropElements([1, 2, 3], function(n) {return n < 3; }));