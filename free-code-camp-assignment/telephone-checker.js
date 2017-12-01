function telephoneCheck(str){
    var reg =    /^(1|1 )?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/;
return reg.test(str);
}

console.log(telephoneCheck("5555555555")) 
console.log(telephoneCheck("(555)555-5555"));
console.log(telephoneCheck("1 555 555 5555"));


