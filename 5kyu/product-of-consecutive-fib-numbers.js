/**
 * https://www.codewars.com/kata/product-of-consecutive-fib-numbers
 *
 * The Fibonacci numbers are the numbers in the following integer sequence (Fn):
 *     0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * such as
 *     F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.
 *
 * Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying
 *     F(n) * F(n+1) = prod.
 *
 * Your function productFib takes an integer (prod) and returns an array:
 *     [F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
 * depending on the language if F(n) * F(n+1) = prod.
 *
 * If you don't find two consecutive F(m) verifying F(m) * F(m+1) = prod
 *   you will return  [F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
 *   F(m) being the smallest one such as F(m) * F(m+1) > prod.
 *
 * Examples
 * productFib(714) # should return [21, 34, true],
 *                 # since F(8) = 21, F(9) = 34 and 714 = 21 * 34
 * productFib(800) # should return [34, 55, false],
 *                 # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
 *
 * Notes: Not useful here but we can tell how to choose the number n up to which to go:
 * we can use the "golden ratio" phi(Φ) which is (1 + sqrt(5))/2
 * knowing that F(n) is asymptotic to: phi^n / sqrt(5).
 * That gives a possible upper bound to n.
 *
 * You can see examples in "Example test".
 * References
 *  http://en.wikipedia.org/wiki/Fibonacci_number
 *  http://oeis.org/A000045
 */

/*
 * 分析：
 * 尝试找出两个相邻的斐波那契数，其乘积等于给定的数。
 * 上面的提示中给出了利用黄金比例估算 F(n)，以确定 n 上限的方法
 * 我觉得还是重头开始算吧，也用不了多少时间。
 * 直到算出来的乘积大于给定的数就可以停止了。
 * 
 * 附黄金比例：
 * > (Math.sqrt(5) + 1) / 2
 * 1.618033988749895
 * > (Math.sqrt(5) - 1) / 2
 * 0.6180339887498949
 */
function productFib(prod) {
    let a = 0, b = 1;
    while (a * b < prod) {
        let temp = a;
        a = b;
        b += temp;
    }
    return [a, b, a * b === prod];
}

console.log(productFib(4895)); // [55, 89, true]
console.log(productFib(5895)); // [89, 144, false]
console.log(productFib(74049690)); // [6765, 10946, true]
console.log(productFib(84049690)); // [10946, 17711, false]
console.log(productFib(193864606)); // [10946, 17711, true]
console.log(productFib(447577)); // [610, 987, false]
console.log(productFib(602070)); // [610, 987, true]

/**
 * 社区解答：
 * https://www.codewars.com/kata/5541f58a944b85ce6d00006a/solutions/javascript
 * 
 * 思路都是一样的，
 * 下面这个解答优雅的地方在于用了 ES6 的解构来更新 a和b 的值
 */
// function productFib(prod){
//     let [a, b] = [0, 1];
//     while(a * b < prod) [a, b] = [b, a + b];
//     return [a, b, a * b === prod];
// }