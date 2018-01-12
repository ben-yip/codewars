/**
 * http://www.codewars.com/kata/roman-numerals-encoder/train/javascript
 *
 * Create a function taking a positive integer as its parameter
 * and returning a string containing the Roman Numeral representation of that integer.
 *
 * Modern Roman numerals are written by expressing each digit separately
 * starting with the left most digit and skipping any digit with a value of zero.
 * In Roman numerals:
 * 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC.
 * 2008 is written as 2000=MM, 8=VIII; or MMVIII.
 * 1666 uses each Roman symbol in descending order: MDCLXVI.
 *
 * Example:
 * solution(1000); // should return 'M'
 *
 * Help:
 * Symbol Value
 * I       1
 * V       5
 * X       10
 * L       50
 * C       100
 * D       500
 * M       1,000
 *
 * Remember that there can't be more than 3 identical symbols in a row.
 * More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals
 */

/*
 * 分析：
 * 罗马数字转换器：
 * - 每个（即每个数位上的）数字单独表示；
 * - 0的话就为空；
 * - 小数字写在大数字的左边表示减去，写在右边表示累加；
 * - 同一个字母不能连续出现超过3次；
 * 
 * 规律：
 * 1    2    3     4    5    6    7     8      9
 * I    II   III   IV   V    VI   VII   VIII   IX
 * 10   20   30    40   50   60   70    80     90
 * X    XX   XXX   XL   L    LX   LXX   LXXX   LC
 * ...
 * 既然都是固定的了，还不如用穷举来实现。。
 * 另外，测试例子中超过 3,000 是继续用多个 M 来表示的，无法吐槽. 
 */

// convert the number to a roman numeral
function solution(number) {
    // console.log(number);
    let symbols = {
        0: '',
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X',
        20: 'XX',
        30: 'XXX',
        40: 'XL',
        50: 'L',
        60: 'LX',
        70: 'LXX',
        80: 'LXXX',
        90: 'XC',
        100: 'C',
        200: 'CC',
        300: 'CCC',
        400: 'CD',
        500: 'D',
        600: 'DC',
        700: 'DCC',
        800: 'DCCC',
        900: 'CM',
        1000: 'M',
        2000: 'MM',
        3000: 'MMM',
        4000: 'MMMM',
        5000: 'MMMMM',
        6000: 'MMMMMM',
        7000: 'MMMMMMM',
        8000: 'MMMMMMMM',
        9000: 'MMMMMMMMM',
    };
    let pow = number.toString().length - 1;
    return number.toString().split('').map((digit) => {
        let num = digit * Math.pow(10, pow--);
        return symbols[num];
    }).join('');
}

console.log(solution(1));    // 'I'
console.log(solution(4));    // 'IV'
console.log(solution(1000)); // 'M'
console.log(solution(1990)); // 'MCMXC'
console.log(solution(2007)); // 'MMVII'

/**
 * 社区解答：http://www.codewars.com/kata/51b62bf6a9c58071c600001b/solutions/javascript
 *
 * 其实思路还是差不多，关键在于特殊的数字符号会出现在 1,4,5,9,*0 这5个数字中。
 * 除了这种思路，很多人也是和我一样用的穷举法，这题真没啥意思。
 */
// function solution(number) {
//     // convert the number to a roman numeral
//     var roman = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
//
//     var ans = '';
//     while (number > 0) {
//         for (a in roman) {
//             if (roman[a] <= number) {
//                 ans += a;
//                 number -= roman[a];
//                 break;
//             }
//
//         }
//     }
//     return ans;
// }
/*==============================================*/
/* 下面的解法也是定义了1,4,5,9,0 这几个转折点*/
// function solution(number) {
//     return [
//         {threshold: 1000, char: 'M'},
//         {threshold: 900, char: 'CM'},
//         {threshold: 500, char: 'D'},
//         {threshold: 400, char: 'CD'},
//         {threshold: 100, char: 'C'},
//         {threshold: 90, char: 'XC'},
//         {threshold: 50, char: 'L'},
//         {threshold: 40, char: 'XL'},
//         {threshold: 10, char: 'X'},
//         {threshold: 9, char: 'IX'},
//         {threshold: 5, char: 'V'},
//         {threshold: 4, char: 'IV'},
//         {threshold: 1, char: 'I'}
//     ].reduce(function (prev, curr, idx, arr) {
//         while (number >= curr.threshold) {
//             prev += curr.char;
//             number -= curr.threshold;
//         }
//         return prev;
//     }, '');
// }