/**
 * https://www.codewars.com/kata/base-conversion
 * 
 * In this kata you have to implement a base converter, 
 * which converts positive integers between arbitrary bases / alphabets. 
 * Here are some pre-defined alphabets:
 * 
 * var Alphabet = {
 *   BINARY:        '01',
 *   OCTAL:         '01234567',
 *   DECIMAL:       '0123456789',
 *   HEXA_DECIMAL:  '0123456789abcdef',
 *   ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
 *   ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
 *   ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
 *   ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
 * };
 * 
 * The function convert() should take an input (string), 
 * the source alphabet (string) and the target alphabet (string). 
 * You can assume that the input value always consists of characters from the source alphabet. You don't need to validate it.
 * 
 * 
 * Examples
 * 
 * // convert between numeral systems
 * convert("15", Alphabet.DECIMAL, Alphabet.BINARY); // should return "1111"
 * convert("15", Alphabet.DECIMAL, Alphabet.OCTAL); // should return "17"
 * convert("1010", Alphabet.BINARY, Alphabet.DECIMAL); // should return "10"
 * convert("1010", Alphabet.BINARY, Alphabet.HEXA_DECIMAL); // should return "a"
 * 
 * // other bases
 * convert("0", Alphabet.DECIMAL, Alphabet.ALPHA); // should return "a"
 * convert("27", Alphabet.DECIMAL, Alphabet.ALPHA_LOWER); // should return "bb"
 * convert("hello", Alphabet.ALPHA_LOWER, Alphabet.HEXA_DECIMAL); // should return "320048"
 * convert("SAME", Alphabet.ALPHA_UPPER, Alphabet.ALPHA_UPPER); // should return "SAME"
 * 
 * Additional Notes:
 *  - The maximum input value can always be encoded in a number without loss of precision in JavaScript. 
 *    In Haskell, intermediate results will probably be too large for Int.
 *  - The function must work for any arbitrary alphabets, not only the pre-defined ones
 *  - You don't have to consider negative numbers
 */

/*
 * 分析：
 * 是一个多种不同进制的的转换器：
 * - 数值之间的进制互转比较容易理解，符合常识；
 * - 对于数值和其他字符表的互转，实际上还是进制的转换，例如全小写的字母表就可以看做26进制；
 * - 因为要支持任意进制相互转化，所以这是一个多对多转换器，当然每个转换规则都实现一遍是不现实的，
 *   因此可以把10进制作为桥梁，这样只需要在内部实现10进制与其他进制相互转换就可以了。
 */

let Alphabet = {
    BINARY:        '01',
    OCTAL:         '01234567',
    DECIMAL:       '0123456789',
    HEXA_DECIMAL:  '0123456789abcdef',
    ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
    ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

function convert(input, srcAlphabet, destAlphabet) {
    // console.log(input);
    // console.log(srcAlphabet);
    // console.log(destAlphabet);

    // convert source alphabet to decimal
    input = input.split('');
    let dec = 0,
        exponent = 0;
    while (input.length) {
        dec += srcAlphabet.indexOf(input.pop()) * Math.pow(srcAlphabet.length, exponent++);
    }

    // convert from decimal to target alphabet
    let radix = destAlphabet.length,
        result = [],
        mod = 0;
    while (dec >= radix) {
        mod = dec % radix;
        dec = parseInt(dec / radix);
        result.unshift(destAlphabet[mod]);
    }
    result.unshift(destAlphabet[dec >> 0]);
    return result.join('');
}

console.log(convert('hello', Alphabet.ALPHA_LOWER, Alphabet.HEXA_DECIMAL));  // 320048
console.log(convert('CodeWars', Alphabet.ALPHA, Alphabet.OCTAL));  // 646737361477606
console.log(convert(
    'PbqrJnef',
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM') // ROT-13 custom alphabet
);  // CodeWars

/**
 * 社区解答：
 * https://www.codewars.com/kata/526a569ca578d7e6e300034e/solutions/javascript
 * 思路基本上一样，到时觉得我自己的实现比较容易理解和符合直觉
 */
/**
 * 也是要转两次
 */
// function convert(input, source, target) {
//     var inBase = source.length, len = input.length;
//     var value = input.split('')
//         .reduce(function (p, v, i) {
//             return p + source.indexOf(v) * Math.pow(inBase, len - i - 1)
//         }, 0);
//     return toBase(value, target);
// }
// /* 还用上了递归 */
// function toBase(value, target) {
//     var base = target.length;
//     if (value < base) return '' + target.charAt(value);
//     return toBase(Math.floor(value / base), target) + target.charAt(value % base);
// }
/**
 * 思路也是差不多的
 */
// function convert(input, source, target) {
//     let s = 0;
//     let str = '';
//     for (let i = 0; i < input.length; i++) {
//         s = s * source.length + source.indexOf(input[i]);
//     }
//     while (s > 0) {
//         str = target[s % target.length] + str;
//         s = Math.floor(s / target.length);
//     }
//     return str ? str : target[0];
// }