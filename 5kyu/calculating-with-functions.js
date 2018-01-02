/**
 * http://www.codewars.com/kata/calculating-with-functions
 *
 * This time we want to write calculations using functions and get the results. Let's have a look at some examples:
 *   seven(times(five()));  // must return 35
 *   four(plus(nine()));    // must return 13
 *   eight(minus(three())); // must return 5
 *   six(dividedBy(two())); // must return 3
 */

let OPERATIONS = {
    PLUS: 0,
    MINUS: 1,
    TIMES: 2,
    DIVIDED: 3,
};

let number = function (number) {
    return function (formula) {
        if (formula) {
            switch (formula.op) {
                case OPERATIONS.PLUS:
                    return number + formula.num;
                case OPERATIONS.MINUS:
                    return number - formula.num;
                case OPERATIONS.TIMES:
                    return number * formula.num;
                case OPERATIONS.DIVIDED:
                    return number / formula.num;
                default :
                    return number;
            }
        } else {
            return number;
        }
    }
};

let zero = number(0),
    one = number(1),
    two = number(2),
    three = number(3),
    four = number(4),
    five = number(5),
    six = number(6),
    seven = number(7),
    eight = number(8),
    nine = number(9);

let operate = function (operation) {
    return function (num) {
        return {
            op: operation,
            num: num
        }
    }
};

let plus = operate(OPERATIONS.PLUS),
    minus = operate(OPERATIONS.MINUS),
    times = operate(OPERATIONS.TIMES),
    dividedBy = operate(OPERATIONS.DIVIDED);


console.log(seven(times(five()))); // must return 35
console.log(four(plus(nine()))); // must return 13
console.log(eight(minus(three()))); // must return 5
console.log(six(dividedBy(two()))); // must return 3


/**
 * 解法都大同小异，就是下面这种生成函数的方式比较妙：
 * ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].forEach(function(funName, i) {
 *   this[funName] = function(operation) {return operation ? operation(i) : i};
 * });
 */