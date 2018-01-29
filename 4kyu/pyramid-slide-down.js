/**
 * https://www.codewars.com/kata/pyramid-slide-down/train/javascript
 *
 * ###Lyrics... Pyramids are amazing! Both in architectural and mathematical sense. If you have a computer, you can mess with pyramids even if you are not in Egypt at the time. For example, let's consider the following problem. Imagine that you have a plane pyramid built of numbers, like this one here:
 *
 *    /3/
 *   \7\ 4
 *  2 \4\ 6
 * 8 5 \9\ 3
 *
 * Here comes the task...
 *
 * Let's say that the 'slide down' is a sum of consecutive numbers from the top to the bottom of the pyramid. As you can see, the longest 'slide down' is 3 + 7 + 4 + 9 = 23
 *
 * Your task is to write a function longestSlideDown (in ruby: longest_slide_down) that takes a pyramid representation as argument and returns its' longest 'slide down'. For example,
 *
 * longestSlideDown [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]
 * -- => 23
 *
 * ###By the way... My tests include some extraordinarily high pyramides so as you can guess, brute-force method is a bad idea unless you have a few centuries to waste. You must come up with something more clever than that.
 *
 * (c) This task is a lyrical version of the Problem 18 and/or Problem 67 on ProjectEuler(https://projecteuler.net/).
 */

/*
 * 分析：
 * - 简单来说，就是一直"下滑"，求所能经过路径的最大和，
 *   每走一步都只能选择左边或者右边，
 *   每下一层都只会比上一层多一个元素，
 *   所以说是选左右，实际上就是选下一层的当前index，或者index+1的元素。
 * - 每一步都选左右当中最大的那个并不能保证其走的整个路径的和是最大的，那怎么办呢？
 * - 所有路径的数目等于金字塔层数的阶乘，全部算一遍肯定是可以找到答案的，不过不现实，效率太低。
 */
function longestSlideDown(pyramid) {
    let sum = pyramid[0][0],
        i = 0;
    pyramid.shift();
    pyramid.forEach(arr => {
        sum += arr[i] > arr[i + 1] ? arr[i] : arr[++i];
    });
    return sum;
}

console.log(longestSlideDown([
    [3],
    [7, 4],
    [2, 4, 6],
    [8, 5, 9, 3]
])); // 23

console.log(longestSlideDown([
    [75],
    [95, 64],
    [17, 47, 82],
    [18, 35, 87, 10],
    [20, 4, 82, 47, 65],
    [19, 1, 23, 75, 3, 34],
    [88, 2, 77, 73, 7, 63, 67],
    [99, 65, 4, 28, 6, 16, 70, 92],
    [41, 41, 26, 56, 83, 40, 80, 70, 33],
    [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
    [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
    [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
    [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
    [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
])); // 1074

/**
 * 社区解答：
 */