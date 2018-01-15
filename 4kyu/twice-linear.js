/**
 * http://www.codewars.com/kata/twice-linear/train/javascript
 *
 * Consider a sequence u where u is defined as follows:
 *     The number u(0) = 1 is the first one in u.
 *     For each x in u, then y = 2 * x + 1 and z = 3 * x + 1 must be in u too.
 *     There are no other numbers in u.
 *
 * Ex: u = [1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, ...]
 * 1 gives 3 and 4, then 3 gives 7 and 10, 4 gives 9 and 13, then 7 gives 15 and 22 and so on...
 *
 * #Task:
 * Given parameter n the function dbl_linear (or dblLinear...)
 * returns the element u(n) of the ordered (with <) sequence u.
 *
 * #Example: dbl_linear(10) should return 22
 * #Note: Focus attention on efficiency
 */

/*
 * 分析：
 * 数列中的值一个可以变出两个，一直分裂下去，
 * 按升序排列后，求指定位置的值。
 *
 * 思路：
 * 开始有一个值，为1
 * 裂变1次：1+2
 * 裂变2次：1+2+4
 * 裂变3次：1+2+4+8
 * 裂变n次：2^0 + 2^1 + 2^2 + 2^3 + ... + 2^n（等比数列）
 * 算到起码这么多次，然后排序取值。
 *
 * 实际上这是一棵二叉树，做递归计算的时候需要广度优先(使用队列)。
 * 左边的树枝中的值会比较小，（加上中途会出现重复的值），可能需要多算好几层？
 * 这样实现的话既不高效，也极度容易爆栈。
 *
 * 改进：在使用队列来进行广度优先生成时，每次取走队列中最小的那个，
 * 结果：即便如此还是广度优先，n=6,000 时大概需要6s，而 n=60,000 就超时12s了。。
 * 思考问题：需要的结果应该多数在左边树枝那里。。那么该如何剪掉不必要的右枝？
 *          甚至乎，大概也只是下一层的左边树枝比上一层的右边小，也许这个算法根本就不合适。
 *
 */
function dblLinear(n) {
    console.log('-->' + n);

    let set = new Set([1]),
        queue = [];

    (function fission(x) {
        // console.log(x);
        let y = x * 2 + 1,
            z = x * 3 + 1;
        set.add(y);
        set.add(z);

        queue.push(y, z);
        if (set.size < n * 1.25) {
            fission(queue.sort((a, b) => a - b).shift());
        }
    })(1);

    let array = Array.from(set).sort((a, b) => a - b);
    // console.log(array);
    return array[n];
}

console.log(dblLinear(10)); // 22
console.log(dblLinear(20)); // 57
console.log(dblLinear(30)); // 91
console.log(dblLinear(50)); // 175
console.log(dblLinear(100)); // 447
console.log(dblLinear(500)); // 3355
console.log(dblLinear(1000)); // 8488
console.log(dblLinear(2000)); // 19773
console.log(dblLinear(6000)); // 80914
console.log(dblLinear(10000)); // 可能是 157654
console.log(dblLinear(60000)); //

/**
 * 社区解答：
 */