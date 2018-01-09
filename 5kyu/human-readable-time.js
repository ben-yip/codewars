/**
 * https://www.codewars.com/kata/human-readable-time/train/javascript
 *
 * Write a function, which takes a non-negative integer (seconds) as input
 * and returns the time in a human-readable format (HH:MM:SS)
 *
 *     HH = hours, padded to 2 digits, range: 00 - 99
 *     MM = minutes, padded to 2 digits, range: 00 - 59
 *     SS = seconds, padded to 2 digits, range: 00 - 59
 *
 * The maximum time never exceeds 359999 (99:59:59)
 */

/*
 * 分析：
 * 把 秒数 转换为 时:分:秒 的格式
 */

function humanReadable(seconds) {
    let h = seconds / 3600 >> 0;
    let m = seconds % 3600 / 60 >> 0;
    let s = seconds - h * 3600 - m * 60;

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;

    return h + ':' + m + ':' + s;
}

console.log(humanReadable(0));      //  '00:00:00'
console.log(humanReadable(5));      //  '00:00:05'
console.log(humanReadable(60));     //  '00:01:00'
console.log(humanReadable(86399));  //  '23:59:59'
console.log(humanReadable(359999)); //  '99:59:59'

/**
 * 社区解答：
 * https://www.codewars.com/kata/52685f7382004e774f0001f7/solutions/javascript
 * 
 * ↑笨了，其实求秒数的话直接 seconds 求模 60 就得了：
 */
// function humanReadable(seconds) {
//     var pad = function (x) {
//         return (x < 10) ? "0" + x : x;
//     }
//     return pad(parseInt(seconds / (60 * 60))) + ":" +
//         pad(parseInt(seconds / 60 % 60)) + ":" +
//         pad(seconds % 60)
// }