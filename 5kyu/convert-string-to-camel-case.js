/**
 * https://www.codewars.com/kata/convert-string-to-camel-case/train/javascript
 *
 * Complete the method/function so that it converts dash/underscore delimited words into camel casing.
 * The first word within the output should be capitalized only if the original word was capitalized.
 *
 * Examples:
 *
 * // returns "theStealthWarrior"
 * toCamelCase("the-stealth-warrior")
 *
 * // returns "TheStealthWarrior"
 * toCamelCase("The_Stealth_Warrior")
 */

/*
 * 分析：
 * 一个简单的字符串练习
 */
function toCamelCase(str) {
    let splitter = str.match(/-/) ? '-' : '_';
    let words = str.split(splitter);
    return words.reduce((result, curWord) => {
        result += curWord.charAt(0).toLocaleUpperCase() + curWord.slice(1);
        return result;
    });
}

console.log(toCamelCase('')); // ''
console.log(toCamelCase("the_stealth_warrior")); // "theStealthWarrior"
console.log(toCamelCase("The-Stealth-Warrior")); // "TheStealthWarrior"
console.log(toCamelCase("A-B-C")); // "ABC"

/**
 * 社区解答：
 * https://www.codewars.com/kata/517abf86da9663f1d2000003/solutions/javascript
 * 
 * 还是正则牛逼。
 */
// function toCamelCase(str){
//     var regExp=/[-_]\w/ig;
//     return str.replace(regExp,function(match){
//         return match.charAt(1).toUpperCase();
//     });
// }