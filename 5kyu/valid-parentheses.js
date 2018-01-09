/**
 * https://www.codewars.com/kata/valid-parentheses/train/javascript
 *
 * Write a function called that takes a string of parentheses,
 * and determines if the order of the parentheses is valid.
 * The function should return true if the string is valid,
 * and false if it's invalid.
 *
 * Examples
 *   "()"              =>  true
 *   ")(()))"          =>  false
 *   "("               =>  false
 *   "(())((()())())"  =>  true
 *
 * Constraints
 *   0 <= input.length <= 100
 * You may assume that the input string will only contain opening
 * and closing parenthesis and will not be an empty string.
 */

/*
 * 分析：
 * 遍历，记录左括号的数量：
 * 如果左括号提前“脱销”（被匹配完），则表明 invalid
 * 如果遍历完左括号的数量不为零，也一样表明 invalid
 */

function validParentheses(parens) {
    parens = parens.split('');
    let leftCount = 0;
    for (let i = 0; i < parens.length; i++) {
        leftCount += parens[i] === '(' ? 1 : -1;
        if (leftCount < 0) return false;
    }
    return leftCount === 0;
}

console.log(validParentheses("()")); // true
console.log(validParentheses(")(()))")); // false
console.log(validParentheses("(")); // false
console.log(validParentheses("(())((()())())")); // true

/**
 * 社区解答：
 * https://www.codewars.com/kata/52774a314c2333f0a7000688/solutions/javascript
 * 
 * 思路是一样的，下面这个解答还加入了正则匹配，更符合应用的场景
 */
// function validParentheses(string){
//     var tokenizer = /[()]/g, // ignores characters in between; parentheses are
//         count = 0,           // pretty useless if they're not grouping *something*
//         token;
//     while(token = tokenizer.exec(string), token !== null){
//         if(token == "(") {
//             count++;
//         } else if(token == ")") {
//             count--;
//             if(count < 0) {
//                 return false;
//             }
//         }
//     }
//     return count == 0;
// }