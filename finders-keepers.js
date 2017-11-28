
function findElement(arr, func) {
   
  filterArray = arr.filter(func)
  return filterArray;
  
//   var num;

 
//   for (var a = 0; a < arr.length; a++) {

//     if (func(arr[a])) {
//       num = arr[a];
//       return num;
//     }
//  }
  
//   return num;
// }

// findElement([1, 2, 3, 4], function(num) {
//   return num % 2 === 0;
// });
 
}
console.log(findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; }));
