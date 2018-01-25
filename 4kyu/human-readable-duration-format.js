/**
 * http://www.codewars.com/kata/human-readable-duration-format/train/javascript
 *
 * Your task in order to complete this Kata is to write a function which formats a duration,
 * given as a number of seconds, in a human-friendly way.
 *
 * The function must accept a non-negative integer. If it is zero, it just returns "now".
 * Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.
 *
 * It is much easier to understand with an example:
 *   formatDuration(62)    // returns "1 minute and 2 seconds"
 *   formatDuration(3662)  // returns "1 hour, 1 minute and 2 seconds"
 * Note that spaces are important.
 *
 * Detailed rules
 * - The resulting expression is made of components like 4 seconds, 1 year, etc.
 *   In general, a positive integer and one of the valid units of time, separated by a space.
 *   The unit of time is used in plural if the integer is greater than 1.
 * - The components are separated by a comma and a space (", "). Except the last component,
 *   which is separated by " and ", just like it would be written in English.
 * - A more significant units of time will occur before than a least significant one.
 *   Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.
 * - Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.
 * - A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.
 * - A unit of time must be used "as much as possible". It means that the function should not return 61 seconds,
 *   but 1 minute and 1 second instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.
 * - For the purpose of this Kata, a year is 365 days and a day is 24 hours.
 */

/*
 * 分析：
 * 把秒数转换为可读的字符串，因此除了计算，还有一大堆规则需要注意。
 * 另外注意单位只有：年、日、时、分、秒。(没有月)
 */
function formatDuration(seconds) {
    if (seconds === 0) return 'now';
    if (seconds < 0) throw new Error('para should be a positive integer.');

    let y, d, h, m, s;
    y = seconds / (60 * 60 * 24 * 365) >> 0;
    seconds -= y * 365 * 24 * 60 * 60;
    d = seconds / (60 * 60 * 24) >> 0;
    seconds -= d * 24 * 60 * 60;
    h = seconds / (60 * 60) >> 0;
    seconds -= h * 60 * 60;
    m = seconds / (60) >> 0;
    seconds -= m * 60;
    s = seconds;

    y = y ? y + ' year' + (y > 1 ? 's' : '') : '';
    d = d ? d + ' day' + (d > 1 ? 's' : '') : '';
    h = h ? h + ' hour' + (h > 1 ? 's' : '') : '';
    m = m ? m + ' minute' + (m > 1 ? 's' : '') : '';
    s = s ? s + ' second' + (s > 1 ? 's' : '') : '';

    let arr = [];
    [y, d, h, m, s].forEach(value => {
        if (value) arr.push(value);
    });
    let last = arr.pop();
    return (arr.length > 0 ? arr.join((', ')) + ' and ' : '') + last;
}

console.log(formatDuration(0));    // "now"
console.log(formatDuration(1));    // "1 second"
console.log(formatDuration(62));   // "1 minute and 2 seconds"
console.log(formatDuration(120));  // "2 minutes"
console.log(formatDuration(3600)); // "1 hour"
console.log(formatDuration(3662)); // "1 hour, 1 minute and 2 seconds"
console.log(formatDuration(123456789)); // "3 years, 333 days, 21 hours, 33 minutes and 9 seconds"

/**
 * 社区解答：http://www.codewars.com/kata/52742f58faf5485cae000b9a/solutions/javascript
 * 下面两个解答中，输出最终结果时，都用了正则的捕获组把最后一个前面加上' and'，鹅妹子嘤。
 */
/**
 * 这个计算的方式不错，按照秒、分、时、日、年这样的顺序计算的：
 */
// function formatDuration(seconds) {
//     if (!seconds) return "now";
//     var strout = "";
//     var s = seconds % 60;
//     seconds = (seconds - s) / 60;
//     var m = seconds % 60;
//     seconds = (seconds - m) / 60;
//     var h = seconds % 24;
//     seconds = (seconds - h) / 24;
//     var d = seconds % 365;
//     seconds = (seconds - d) / 365;
//     var y = seconds;
//
//     var english = [];
//     if (y) english.push(y + " year" + (y > 1 ? 's' : ''));
//     if (d) english.push(d + " day" + (d > 1 ? 's' : ''));
//     if (h) english.push(h + " hour" + (h > 1 ? 's' : ''));
//     if (m) english.push(m + " minute" + (m > 1 ? 's' : ''));
//     if (s) english.push(s + " second" + (s > 1 ? 's' : ''));
//
//     return english.join(", ").replace(/,([^,]*)$/, " and$1");
// }

/**
 * 这个预定义了各个单位对秒的转换率，并利用了 Object 的 key 来进行循环
 */
// function formatDuration(seconds) {
//     var time = {year: 31536000, day: 86400, hour: 3600, minute: 60, second: 1},
//         res = [];
//
//     if (seconds === 0) return 'now';
//
//     for (var key in time) {
//         if (seconds >= time[key]) {
//             var val = Math.floor(seconds / time[key]);
//             res.push(val += val > 1 ? ' ' + key + 's' : ' ' + key);
//             seconds = seconds % time[key];
//         }
//     }
//
//     return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/, ' and' + '$1') : res[0]
// }