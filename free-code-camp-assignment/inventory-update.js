function updatedInventory(arr1,arr2){
    
  for (var i = 0; i < arr2.length; i++) {
    var foundMatch = false;
   
  for (var n = 0; n < arr1.length; n ++) {
       if (arr1[n][1].indexOf(arr2[i][1]) !== -1) {
      arr1[n][0] += arr2[i][0];
           foundMatch = true;} 
       }
 
   if (foundMatch === false) {
  arr1.push(arr2[i]);} 
}

arr1.sort(function(a, b) {
    if (a[1] < b[1]) {
        return -1; }
    return 1;
});
return arr1;
}

console.log(updateInventory(curInv, newInv));
