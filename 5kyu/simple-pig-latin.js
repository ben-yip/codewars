/**
 * https://www.codewars.com/kata/simple-pig-latin
 *
 * Move the first letter of each word to the end of it,
 * then add "ay" to the end of the word. Leave punctuation marks untouched.
 *
 * Examples
 *   pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
 *   pigIt('Hello world !');     // elloHay orldWay !
 */

/*
 * 分析：
 * 一个操作字符串的练习，也涉及到了正则
 */
function pigIt(str) {
    return str
        .trim()
        .split(' ')
        .map(word => {
            if (word.toLocaleLowerCase().match(/[a-z]+/)) {
                word = word.substring(1) + word.charAt(0) + 'ay';
            }
            return word;
        })
        .join(' ');
}

console.log(pigIt('Pig latin is cool')); // igPay atinlay siay oolcay
console.log(pigIt('Hello world !'));     // elloHay orldWay !

/**
 * 社区解答：
 * https://www.codewars.com/kata/520b9d2ad5c005041100000f/solutions/javascript
 * 
 * 正则达人用的是捕获组
 */
// function pigIt(str){
//     return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")
// }