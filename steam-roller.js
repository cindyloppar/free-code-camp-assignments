function steamrollArray(arr){
    var array = [];
    for(var i = 0; i < arr.length; i++){
if(Array.isArray(arr[i])){
    array = array.concat(steamrollArray(arr[i]))
}else{
    array.push(arr[i])
}
}
return array;
}

console.log(steamrollArray([1, [2], [3, [[4]]]]));