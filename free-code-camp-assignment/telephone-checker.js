function telephoneCheck(str){
    var reg = /^\d{10}$/|/^\d{3}[-]\d{4}$/
return true;
}

console.log(telephoneCheck("5555555555"))
console.log(telephoneCheck("555-5555")); 
