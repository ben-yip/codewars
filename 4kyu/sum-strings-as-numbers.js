/**
 * https://www.codewars.com/kata/sum-strings-as-numbers/train/javascript
 *
 * Given the string representations of two integers, return the string representation of the sum of those integers.
 *
 * For example:
 * sumStrings('1','2') // => '3'
 *
 * A string representation of an integer will contain no characters besides the ten numerals "0" to "9".
 */

/*
 * 分析：
 * 这题的坑在于，需要处理超大的整数。
 * 直接使用数字类型的话，科学计数法会忽略掉后面的部分小数，
 * 于是就拆开成一截一截地算吧，合并时处理好进位就可以了
 * 注意去除结果的前导0
 */
function sumStrings(a, b) {
    let chunkLen = 10;
    let chunk = numStr => {
        let arr = [];
        while (numStr.length) {
            arr.push(numStr.slice(-chunkLen));
            numStr = numStr.slice(0, -chunkLen);
        }
        return arr;
    };

    let arrA = chunk(a),
        arrB = chunk(b),
        arrSum = [],
        carry = 0;

    // console.log(arrA);
    // console.log(arrB);

    while (arrA.length || arrB.length) {
        let sum =
            +(arrA.shift() || 0)
            +
            +(arrB.shift() || 0)
            +
            +carry;

        carry = sum.toString().length > chunkLen
            ? sum.toString().charAt(0)
            : 0;

        arrSum.unshift(sum.toString().slice(-chunkLen));
    }

    let firstGroup = parseInt(arrSum.shift()) || '';
    return firstGroup + arrSum.join('');
}

console.log(sumStrings('123', '456')); // '579'
console.log(sumStrings('987', '456')); // '1443'
console.log(sumStrings('', '5')); // '5'
console.log(sumStrings('00103', '08567')); // '8670'
console.log(sumStrings('712569312664357328695151392', '8100824045303269669937')); // '712577413488402631964821329'
console.log(sumStrings('50095301248058391139327916261', '81055900096023504197206408605')); // '131151201344081895336534324866'

/**
 * 社区解答：http://www.codewars.com/kata/5324945e2ece5e1f32000370/solutions/javascript
 * 另见大数计算的封装： http://jsfromhell.com/classes/bignumber
 *
 * 思路基本一致，不过社区的解答中统统都是逐位计算的，
 * 我觉得在我自己的实现中，分块的方式效率会高一点。
 */
// String.prototype.reverse = function () {
//     return this.split('').reverse().join('');
// };
// function sumStrings(a, b) {
//     a = a.reverse();
//     b = b.reverse();
//     var carry = 0;
//     var index = 0;
//     var sumDigits = [];
//     while (index < a.length || index < b.length || carry != 0) {
//         var aDigit = index < a.length ? parseInt(a[index]) : 0;
//         var bDigit = index < b.length ? parseInt(b[index]) : 0;
//         var digitSum = aDigit + bDigit + carry;
//         sumDigits.push((digitSum % 10).toString());
//         carry = Math.floor(digitSum / 10);
//         index++;
//     }
//     sumDigits.reverse();
//     while (sumDigits[0] == '0') sumDigits.shift();
//     return sumDigits.join('');
// }