/**
 * TEMP TESTS
 */

/**
 *
 * let n = 5
 * how to output a (n-1)! like this as follows:
 * ------
 * 54321
 * 5321
 * 521
 * 51
 * ------
 * 4321
 * 421
 * 41
 * ------
 * 321
 * 31
 * ------
 * 21
 * ------
 * 1
 */
let n = 5;

let fa = n => {
    if (n > 0) {
        // console.log(n);
        for (let i = n; i > 0; i--) {
            console.log(i);
        }
        fa(n - 1);
    }
};

fa(5);

// for (let i = n; i > 0; i--) {
//     console.log('----------------');
//     // console.log(i);
//     foo(i);
// }