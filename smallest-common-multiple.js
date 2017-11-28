function smallestCommons(arr) {

 var sortedArray = arr.sort();
  var newArr = [];
  function multiples(smallest, highest, mult){
    for(var i = smallest; i < highest; i++){
      newArr.push(i);
      if(mult % i !== 0){

        return false;
      }
      
    }
    return true;
  }
  
  var smallest = sortedArray[0];
  var highest = sortedArray[1];
  var mult = highest;

  while(!multiples(smallest, highest, mult)){
     mult += highest;
  }
       
      return mult;  
}


console.log(smallestCommons([1, 13]));
