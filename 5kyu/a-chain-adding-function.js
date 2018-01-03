/**
 * http://www.codewars.com/kata/a-chain-adding-function/train/javascript
 *
 * We want to create a function that will add numbers together when called in succession.
 *   add(1)(2); // returns 3
 *
 * We also want to be able to continue to add numbers to our chain.
 *   add(1)(2)(3); // 6
 *   add(1)(2)(3)(4); // 10
 *   add(1)(2)(3)(4)(5); // 15
 *
 * A single call should return the number passed in.
 *   add(1); // 1
 *
 * We should be able to store the returned values and reuse them.
 *   var addTwo = add(2);
 *   addTwo; // 2
 *   addTwo + 5; // 7
 */
/*
 * 思考：
 *  add 要作为一个 function 被调用，而其值又应该是一个数值。
 *  可以想到的是把 add 定义为 function，然后重写 valueOf 的返回值。
 *  至于累加的值，还需要一个内部的变量来存储。
 */

/*
 * 这是一开始的实现：
 * 直接把累加值绑在函数上的话，多次调用的话依然会一直累加下去，因为无法知道应该何时清零
 */
// function add(n) {
//     let me = arguments.callee;
//     me.sum = me.sum ? me.sum + n : n;
//     return add;
// }
//
// add.toString = add.valueOf = function () {
//     return this.sum;
// }.bind(add);

/**
 * 于是想着应该包装一下..
 *
 * 重写 valueOf 后，console.log(add(1)) 的输出为 { [Number: 1] valueOf: [Function] }，
 *   其实 [Number: 1] 就已经表示访问该值的时候返回的就是 1，控制台这样输出只是表示它是对象而已。
 *   因为以前没这样子做过，被误导了，于是想不通就看了答案。。。
 *
 * 以下是自己的实现（其实也和社区的主流实现方法差不多了）:
 */
function Add(n) {
    let fn = function (n) {
        fn.sum += n;
        return fn;
    };

    fn.sum = n;

    fn.valueOf = function () {
        return fn.sum;
    };

    return fn;
}

let add = function (n) {
    return new Add(n);
};

console.log(add(1));
console.log(add(1)(2));
console.log(add(1)(2)(3)(4)(5));

/**
 * http://www.codewars.com/kata/a-chain-adding-function/solutions/javascript?show-solutions=1
 *
 * 这是社区排名最前的一个实现：
 *  巧妙的地方在于直接把形参给利用起来，每次都返回一个包装内部的新函数，这样累加的和就不会污染到 add 函数
 */
// function add(n) {
//     let fn = function (x) {
//         return add(n + x);
//     };
//
//     fn.valueOf = function () {
//         return n;
//     };
//
//     return fn;
// }

