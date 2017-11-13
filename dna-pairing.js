function pairElement(str) {

  var pairedElement = [];


  var search = function(char) {
    switch (char) {
      case 'A':
       pairedElement.push(['A', 'T']);
        break;
      case 'T':
        pairedElement.push(['T', 'A']);
        break;
      case 'C':
        pairedElement.push(['C', 'G']);
        break;
      case 'G':
        pairedElement.push(['G', 'C']);
        break;
    }
  };

  // Loops through the input and pair.
  for (var i = 0; i < str.length; i++) {
    search(str[i]);
  }

  return pairedElement;
}
 

console.log(pairElement("GCG"));