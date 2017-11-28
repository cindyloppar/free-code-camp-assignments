function truthChecker(collection, pre){
    for(var i = 0; i < collection; i++){
        if(!collection[i][pre]){
            return false;
        }
    }
    return true;
}

console.log(truthChecker([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));
