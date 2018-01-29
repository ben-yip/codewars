/**
 * TEMP TESTS
 */

let fa = function (n) {
    if (n > 1) {
        return n * fa(n - 1);
    } else return 1;
};

console.log(fa(50));