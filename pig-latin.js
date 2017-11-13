
    function translateToPigLatin(str) {
        var vowels = ['a', 'e', 'i', 'o', 'u']

        if (vowels.indexOf(str[0]) === -1 && str.length <= 5) {
            str = str.slice(1) + str.indexOf(str[0]);
            str = str.slice(1) + str[0] + str.indexOf(str[0]) + 'ay';

        } else if (str.indexOf(str[0]) !== -1 ) {
            str = str + 'way';

        } if (vowels.indexOf(str[0]) === -1 && str.length > 5) {

            str = ste.slice(1) + str[0] + 'ay';
        }
        return str;
    }
    console.log("consolate")

