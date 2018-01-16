
function generate(a, n = a.length) {
    var results = [];
    var c = [];

    for (var i = 0; i < n; i++) {
        c[i] = 0;

    }
    results.push(a)

    var i = 0;
    while (i < n) {
        if (c[i] < i) {
            if (i % 2 === 0) {
                var splitted = a.split('');
                const temp0 = splitted[0];
                const tempi = splitted[i];
                splitted[0] = tempi;
                splitted[i] = temp0;
                a = splitted.join('');

            } else {
                var splitted = a.split('');
                const temp0 = splitted[c[i]];
                const tempi = splitted[i];
                splitted[c[i]] = tempi;
                splitted[i] = temp0;
                a = splitted.join('');
            }
            results.push(a);
            c[i] += 1;
            i = 0;
        } else {
            c[i] = 0;
            i += 1;
        }
    }
    return results.length;
}


console.log(generate("ABCD"));


