
function pairwise(arr, arg) {
    var result = 0;
  for(var x = 0 ; x <arr.length; x++){
    for(var y = 0; y <arr.length; y++){
      if(x === y){
        break;
     }
      if(arr[x] + arr[y] === arg){
        result += x + y;
        delete arr[x];
        delete arr[y];
      } 
    }
  }
  return result;
}

console.log(pairwise([1, 4, 2, 3, 0, 5], 7));