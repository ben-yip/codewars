/**
 * http://www.codewars.com/kata/double-cola/train/javascript
 *
 * Sheldon, Leonard, Penny, Rajesh and Howard are in the queue
 * for a "Double Cola" drink vending machine;
 * there are no other people in the queue.
 * The first one in the queue (Sheldon) buys a can,
 * drinks it and doubles! The resulting two Sheldons
 * go to the end of the queue. Then the next in the queue (Leonard) buys a can,
 * drinks it and gets to the end of the queue as two Leonards, and so on.
 *
 * For example, Penny drinks the third can of cola and the queue will look like this:
 *   Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
 *
 * Write a program that will return the name of the person who will drink the n-th cola.
 *
 * Note that in the very beginning the queue looks like that:
 *   Sheldon, Leonard, Penny, Rajesh, Howard
 *
 * The input data consist of an array which contains five names, and single integer n.
 *  (1 ≤ n ≤ 1000,000,000).
 */

/*
 * 分析：
 * 队列初始长度为5，不断循环，队头拿出来后，变成两倍重新放到队尾。
 * 然后求第几个是什么。序号从1开始。
 * 因为 n 比较大，整个队列一直放在内存会爆的，而且一直循环做去掉一个再加回两个的操作也太慢了，会超时。
 *
 * 实际上是按2的指数级增长的：
 * 把循环一次看做一组，如循环2次后，最后一组中，每个元素的个数是2^2=4
 * SLPRH-SSLLPPRRHH-SSSSLLLLPPPPRRRRHHHH
 * 5     10         20
 * 那就不断叠加直到找到需要查找元素所在的组。
 * 
 * 例如此时查找位置为16，则是位于查找到第2组的位置（从0开始算），这个2也是该组的指数值
 * 那么先减去前面的不需要的考虑的组的长度，算出要求解的位置位于所在组的什么位置，即 16 - 15 = 1
 * 好了，此时已知所在组的长度为 5 * 2^2 = 20，那么列出等式 1/20 = ?/5，实质上就是按初始队列的长度比例缩放，即可求出真实的index
 * 
 */

function whoIsNext(names, r) {
    // console.log('=======================');

    let sum = names.length,
        exp = 0; // the exponent
    while (sum < r) {
        sum += names.length * Math.pow(2, ++exp);
    }
    // console.log(exp);

    let previousGroupsSum = sum - names.length * Math.pow(2, exp),
        lastGroupIndex = r - previousGroupsSum,
        index = Math.ceil(lastGroupIndex / Math.pow(2, exp));

    return names[index - 1];
}

console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 1));  // "Sheldon"
console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 16)); // "Sheldon"
console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52)); // "Penny"
console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 7230702951)); // "Leonard"

/**
 * http://www.codewars.com/kata/551dd1f424b7a4cdae0001f0/solutions/javascript
 * 这是排名第一的社区解答：
 * 思路和我自己的类似，不过他把【累计求和】与【减去前面不需要的组】的操作都一起放在循环中了
 * 
 * function whoIsNext(names, r) {
 *     var l = names.length;
 *     while (r >= l) {
 *         r -= l;
 *         l *= 2;
 *     }
 *     return names[Math.ceil(names.length * r / l) - 1];
 * }
 */








