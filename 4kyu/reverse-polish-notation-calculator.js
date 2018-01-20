/**
 * https://www.codewars.com/kata/reverse-polish-notation-calculator/train/javascript
 *
 * Your job is to create a calculator which evaluates expressions in Reverse Polish notation.
 * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 *
 * For example
 * expression 5 1 2 + 4 * + 3 -
 * (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation)
 * should evaluate to 14.
 *
 * Note that for simplicity you may assume that there are always spaces between numbers and operations,
 * e.g. 1 3 + expression is valid, but 1 3+ isn't.
 * Empty expression should evaluate to 0.
 *
 * Valid operations are +, -, *, /.
 * You may assume that there won't be exceptional situations (like stack underflow or division by zero).
 */

/*
 * 分析：
 * 这个算法就是栈的应用，
 * 注意减法和除法中两个操作数的先后关系
 */
function calc(expr) {
    let operands = expr.split(' '),
        stack = [];
    operands.forEach((op => {
        switch (op) {
            case '+':
                stack.push(parseFloat(stack.pop()) + parseFloat(stack.pop()));
                break;
            case '-':
                stack.push(-(parseFloat(stack.pop()) - parseFloat(stack.pop())));
                break;
            case '*':
                stack.push(parseFloat(stack.pop()) * parseFloat(stack.pop()));
                break;
            case '/':
                stack.push(1 / (parseFloat(stack.pop()) / parseFloat(stack.pop())));
                break;
            default:
                stack.push(op);
        }
    }));
    return parseFloat(stack.pop()) || 0;
}

console.log(calc(""));        // 0,   "Should work with empty string"
console.log(calc("1 2 3"));   // 3,   "Should parse numbers"
console.log(calc("1 2 3.5")); // 3.5, "Should parse float numbers"
console.log(calc("1 3 +"));   // 4,   "Should support addition"
console.log(calc("1 3 *"));   // 3,   "Should support multiplication"
console.log(calc("1 3 -"));   // -2,  "Should support subtraction"
console.log(calc("4 2 /"));   // 2,   "Should support division"
console.log(calc("5 1 2 + 4 * + 3 -"));  // 14


/**
 * 社区解答：
 * https://www.codewars.com/kata/52f78966747862fc9a0009ae/solutions/javascript
 * 都差不多，就不贴了。
 */