
function orbitalPeriod(averageAltitude) {
    var graditudeMass = 398600.4418;
    var earthRadius = 6367.4447;
    var emptyArray = []
    var adding = 0;
    for (var i = 0; i < averageAltitude.length; i++) {

        adding = averageAltitude[i].avgAlt + earthRadius ;
        var toThePowerOfThree = Math.pow(adding,3) /graditudeMass;
        var square = Math.sqrt(toThePowerOfThree);   
        var pie = 2 * Math.PI;
        var answer = Math.round(pie * square);
        emptyArray.push({name:averageAltitude[i].name, orbitalPeriod:answer});
         
        }
        return emptyArray;
}
console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }
]));

