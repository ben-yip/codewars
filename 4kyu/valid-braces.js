/**
 * http://www.codewars.com/kata/valid-braces/train/javascript
 *
 * Write a function that takes a string of braces,
 * and determines if the order of the braces is valid.
 * It should return true if the string is valid, and false if it's invalid.
 *
 * This Kata is similar to the Valid Parentheses Kata,
 * but introduces new characters: brackets [], and curly braces {}.
 * Thanks to @arnedag for the idea!
 *
 * All input strings will be nonempty, and will only consist of
 * parentheses, brackets and curly braces: ()[]{}.
 *
 * What is considered Valid?
 *  A string of braces is considered valid if all braces are matched with the correct brace.
 *
 * Examples
 *   "(){}[]"   =>  True
 *   "([{}])"   =>  True
 *   "(}"       =>  False
 *   "[(])"     =>  False
 *   "[({})](]" =>  False
 */

/*
 * 分析：
 * 是 ../5kyu/valid-parentheses.js 的进阶版
 * 因为会涉及到不同类型括号嵌套的问题，所以用栈来实现比较合适
 */
function validBraces(braces) {
    // console.log(braces);
    braces = braces.trim().split('');
    let stack = [];
    for (let i = 0; i < braces.length; i++) {
        switch (braces[i]) {
            case ')':
                if (stack[stack.length - 1] === '(') {
                    stack.pop();
                    break;
                }
            // fall through
            case ']':
                if (stack[stack.length - 1] === '[') {
                    stack.pop();
                    break;
                }
            // fall through
            case '}':
                if (stack[stack.length - 1] === '{') {
                    stack.pop();
                    break;
                }
            // fall through
            default:
                stack.push(braces[i]);
        }
        // console.log(stack);
    }
    return stack.length === 0;
}

console.log(validBraces("(){}[]"));   // true
console.log(validBraces("([{}])"));   // true
console.log(validBraces("(}"));       // false
console.log(validBraces("[(])"));     // false
console.log(validBraces("[({})](]")); // false

/**
 * 社区解答：
 * http://www.codewars.com/kata/5277c8a221e209d3f6000b56/solutions/javascript
 */

/**
 * 用栈来实现的话，思路和自己的差不多
 */
// function validBraces(braces) {
//     var matches = {'(': ')', '{': '}', '[': ']'};
//     var stack = [];
//     var currentChar;
//
//     for (var i = 0; i < braces.length; i++) {
//         currentChar = braces[i];
//
//         if (matches[currentChar]) { // opening braces
//             stack.push(currentChar);
//         } else { // closing braces
//             if (currentChar !== matches[stack.pop()]) {
//                 return false;
//             }
//         }
//     }
//
//     return stack.length === 0; // any unclosed braces left?
// }

/**
 * 这个实现也挺巧妙
 */
// function validBraces(braces){
//     while(braces.indexOf("{}") != -1 || braces.indexOf("()") != -1 || braces.indexOf("[]") != -1){
//         braces = braces.replace("{}", "").replace("()", "").replace("[]", "");
//     }
//     return braces.length == 0;
// }
/**
 * 这个和上面的思路一样，只是用来正则来表达
 */
function validBraces(braces){
    while(/\(\)|\[\]|\{\}/g.test(braces)){braces = braces.replace(/\(\)|\[\]|\{\}/g,"")}
    return !braces.length;
}
