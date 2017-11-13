function pairing(str) {
    var pairing = [];
    var pairingElements = function (character) {
        switch (character) {
            case 'A':
                pairing.push['A', 'T'];
                break;
            case 'T':
                pairing.push['T', 'C'];
                break;
            case 'C':
                pairing.push['C', 'G'];
                break;
            case 'G':
                pairing.push['G', 'C']
                break;

        };
    }
    for (var i = 0; i < str.lenth; i++) {
        search(str[i]);
    }
    return pairing

}