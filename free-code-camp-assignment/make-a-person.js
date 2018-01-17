

var Person = function(firstAndLast) {
    // Complete the method below and implement the others similarly
    this.getFullName = function() {
      return firstAndLast;
      
    };
  this.getFirstName = function(){
    var first = firstAndLast.split(" ");
    return first[0];
  };
  this.getLastName = function(){
    var last = firstAndLast.split(" ");
    return last[1];
  };
  this.setFirstName = function(first){
    firstAndLast = first + " " + firstAndLast.split(" ")[1];
    return firstAndLast;
  };
  this.setLastName = function(last){
    firstAndLast = firstAndLast.split(" ")[0] + " "  + last;
    return firstAndLast;
  };
  this.setFullName = function(firstandlast){
    firstAndLast = firstandlast;
    return firstAndLast;
  };
    return firstAndLast;
};

var bob = new Person('Bob Ross');
console.log(bob.getFullName());
