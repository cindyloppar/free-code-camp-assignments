//Sum all the prime numbers up to and including the provided number.
//A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.

function prime(number) {
    for (var i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }

    }
    return true;
}
function sumPrimes(num) {
    var sum = 0;
    for (var x = 2; x <= num; x++) {
        if (prime(x)) {
            sum += x;
        }


    }
    return sum;

}


console.log(sumPrimes(10));

