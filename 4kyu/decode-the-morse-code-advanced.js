/**
 * https://www.codewars.com/kata/decode-the-morse-code-advanced
 *
 * Part of Series 2/3
 * This kata is part of a series on the Morse code.
 * Make sure you solve the previous part before you try this one.
 * After you solve this kata, you may move to the next one.
 *
 *
 * In this kata you have to write a Morse code decoder for wired electrical telegraph.
 * Electric telegraph is operated on a 2-wire line with a key that, when pressed,
 * connects the wires together, which can be detected on a remote station.
 * The Morse code encodes every character being transmitted as a sequence of
 * "dots" (short presses on the key) and "dashes" (long presses on the key).
 *
 * When transmitting the Morse code, the international standard specifies that:
 *  - "Dot" – is 1 time unit long.
 *  - "Dash" – is 3 time units long.
 *  - Pause between dots and dashes in a character – is 1 time unit long.
 *  - Pause between characters inside a word – is 3 time units long.
 *  - Pause between words – is 7 time units long.
 *
 * However, the standard does not specify how long that "time unit" is.
 * And in fact different operators would transmit at different speed.
 * An amateur person may need a few seconds to transmit a single character,
 * a skilled professional can transmit 60 words per minute, and robotic transmitters may go way faster.
 *
 * For this kata we assume the message receiving is performed automatically
 * by the hardware that checks the line periodically,
 * and if the line is connected (the key at the remote station is down), 1 is recorded,
 * and if the line is not connected (remote key is up), 0 is recorded.
 * After the message is fully received, it gets to you for decoding as a string containing only symbols 0 and 1.
 *
 * For example, the message HEY JUDE, that is ···· · −·−−   ·−−− ··− −·· · may be received as follows:
 * 1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011
 *
 * As you may see, this transmission is perfectly accurate according to the standard,
 * and the hardware sampled the line exactly two times per "dot".
 *
 * That said, your task is to implement two functions:
 *  - Function decodeBits(bits),
 *    that should find out the transmission rate of the message,
 *    correctly decode the message to dots ., dashes - and spaces (one between characters, three between words)
 *    and return those as a string.
 *    Note that some extra 0's may naturally occur at the beginning and the end of a message, make sure to ignore them.
 *    Also if you have trouble discerning if the particular sequence of 1's is a dot or a dash, assume it's a dot.
 *  - Function decodeMorse(morseCode), that would take the output of the previous function and return a human-readable string.
 */
let decodeMorse = require('../6kyu/decode-the-morse-code');

/*
 * 分析：
 *  - 按下用1表示，抬起用0表示；
 *  - 点：按下1个单位时长；
 *  - 线：按下3个单位时长；
 *  - 点和线之间的停顿：1个单位时长；
 *  - 字母之间的停顿：3个单位时长；
 *  - 单词之间的停顿：7个单位时长；
 *  
 *  在现实中，这个单位时长因人而异，在本题中也需要自行判断；
 *  分析可知：
 *  - 最长的一串0出现的地方肯定是单词之间的停顿，即包含7个单位时长，
 *    而且这串0的长度应该是7的整数倍；
 *  - 如果↑不是7的整数倍，则说明只包含一个单词，
 *    此时应该找字母间的停顿，即3个单位时长倍数的0串；
 *  - 同理，↑没有3的倍数的0串，那里面的最长0串就是一个单位时长；
 *  - 如果根本没有0，即全部是1的话，即只有一个字母
 *    这样根本无法判断单位时长，于是可以按题设的要求，假设这一串0是一个“点”
 *  
 *  注意：
 *  - 处理之前先把 leading 和 trailing 的 0 去掉；
 *  - 题设很坑，这里的点横 和 6kyu那题用的特么不一样啊：
 *    ···· · −·−−   ·−−− ··− −·· ·
 *    .... . -.--   .--- ..- -.. .
 */
function decodeBits(bits) {
    // remove leading and trailing zeros
    bits = bits.replace(/^0+/, '').replace(/0+$/, '');

    // can NOT decide the unit, assume to be a 'dot'(which is 'E')
    if (bits.indexOf('0') < 0) return '.';

    // find out the longest zero sequence
    let maxZeroLen = Math.max(...bits.replace(/1+/g, '1').split('1').map(zeroStr => zeroStr.length));

    // detect the unit length
    let unitLen = maxZeroLen % 7 === 0 ? maxZeroLen / 7
        : maxZeroLen % 3 === 0 ? maxZeroLen / 3 : maxZeroLen;

    // map units into one
    bits = bits.replace(new RegExp('([01]){' + unitLen + '}', 'g'), '$1');

    // replace with dots or dashes
    return bits.split('0'.repeat(7)).map(wordsBits => {
        return wordsBits.split('0'.repeat(3)).map(lettersBits => {
            return lettersBits.split('0').map(letterBit => {
                return letterBit > 1 ? '-' : '.';
            }).join('');
        }).join(' ')
    }).join('   ');
}

// console.log(decodeBits('001100000011000000000000001111110'));

let hey_jude = '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011';
console.log(decodeBits(hey_jude)); // ···· · −·−−   ·−−− ··− −·· ·
console.log(decodeMorse(decodeBits(hey_jude))); // HEY JUDE

console.log(decodeMorse(decodeBits('110011'))); // I
console.log(decodeMorse(decodeBits('111')));    // E(.) not T(-)
console.log(decodeMorse(decodeBits('111111'))); // E
console.log(decodeMorse(decodeBits('100010'))); // EE

/**
 * 社区解答：https://www.codewars.com/kata/54b72c16cd7f5154e9000457/solutions/javascript
 * 思路基本一致，不过每一步的实现都比我优雅，单位时长实际上就是最短的1或者0串的长度。
 */
// function decodeBits(bits) {
//     // Trim zeros
//     bits = bits.replace(/(^0+|0+$)/g, '');
//
//     // Find transmission rate
//     var rate = Math.min.apply(null, bits.match(/0+|1+/g).map(function (b) {
//         return b.length;
//     }));
//
//     // Convert to morse code
//     bits = bits
//         .replace(new RegExp('(?:111){' + rate + '}(?:0{' + rate + '}|$)', 'g'), '-')
//         .replace(new RegExp('1{' + rate + '}(?:0{' + rate + '}|$)', 'g'), '.')
//         .replace(new RegExp('(?:000000){' + rate + '}', 'g'), '   ')
//         .replace(new RegExp('(?:00){' + rate + '}', 'g'), ' ');
//
//     return bits;
// }

