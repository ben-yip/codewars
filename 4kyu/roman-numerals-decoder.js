/**
 * https://www.codewars.com/kata/roman-numerals-decoder/train/javascript
 *
 * Create a function that takes a Roman numeral as its argument
 * and returns its value as a numeric decimal integer.
 * You don't need to validate the form of the Roman numeral.
 *
 * Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately,
 * starting with the leftmost digit and skipping any 0s.
 * So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC)
 * and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII).
 * The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.
 *
 * Example:
 *
 * solution('XXI'); // should return 21
 *
 * Help:
 * Symbol    Value
 * I          1
 * V          5
 * X          10
 * L          50
 * C          100
 * D          500
 * M          1,000
 */

/*
 * 分析：
 * （本题的逆操作见 ./roman-numerals-encoder.js）
 * 
 * 主要操作是分割各个数位，然后套字典就可以了。
 * 问题在于如何分割：既然字典已经有了，那就可以用字典逐个匹配(贪心)，直到整个串翻译完
 */
let romanNum = {
    'I': 1,
    'II': 2,
    'III': 3,
    'IV': 4,
    'V': 5,
    'VI': 6,
    'VII': 7,
    'VIII': 8,
    'IX': 9,
    'X': 10,
    'XX': 20,
    'XXX': 30,
    'XL': 40,
    'L': 50,
    'LX': 60,
    'LXX': 70,
    'LXXX': 80,
    'XC': 90,
    'C': 100,
    'CC': 200,
    'CCC': 300,
    'CD': 400,
    'D': 500,
    'DC': 600,
    'DCC': 700,
    'DCCC': 800,
    'CM': 900,
    'M': 1000,
    'MM': 2000,
    'MMM': 3000,
    'MMMM': 4000,
    'MMMMM': 5000,
    'MMMMMM': 6000,
    'MMMMMMM': 7000,
    'MMMMMMMM': 8000,
    'MMMMMMMMM': 9000
};

function solution(roman) {
    let result = 0;
    while (roman.length) {
        let greedMatch = '';
        for (let ro in romanNum) {
            if (roman.indexOf(ro) === 0) {
                if (ro.length > greedMatch.length) greedMatch = ro;
            }
        }
        if (greedMatch.length) {
            result += romanNum[greedMatch];
            roman = roman.substring(greedMatch.length);
        }
    }
    return result;
}

console.log(solution('MCMXC'));   // 1990
console.log(solution('MMVIII'));  // 2008
console.log(solution('MDCLXVI')); // 1666

/**
 * 社区解答：https://www.codewars.com/kata/51b6249c4612257ac0000005/solutions/javascript
 * 
 * 遍历时，只判断与下一个字符的关系，巧妙地利用了左减右加的规则。
 * 看回自己的解法，也算是和 roman-numerals-encoder 那题呼应了，不失为另一种思路。
 */
// function solution(roman) {
//     var data = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
//     var numbers = roman.split('');
//     var sum = 0, i;
//     for (i = 0; i < numbers.length; i++) {
//         if (data[numbers[i]] < data[numbers[i + 1]]) {
//             sum += data[numbers[i + 1]] - data[numbers[i]];
//             i++;
//         } else {
//             sum += data[numbers[i]];
//         }
//     }
//     return sum;
// }