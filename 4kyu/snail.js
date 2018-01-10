/**
 * https://www.codewars.com/kata/snail
 *
 * Snail Sort
 *   Given an n x n array, return the array elements arranged from outermost elements
 *   to the middle element, traveling clockwise.
 *
 * array = [[1,2,3],
 *          [4,5,6],
 *          [7,8,9]]
 * snail(array) #=> [1,2,3,6,9,8,7,4,5]
 *
 * For better understanding, please follow the numbers of the next array consecutively:
 *
 * array = [[1,2,3],
 *          [8,9,4],
 *          [7,6,5]]
 * snail(array) #=> [1,2,3,4,5,6,7,8,9]
 *
 * NOTE: The idea is not sort the elements from the lowest value to the highest;
 *       the idea is to traverse the 2-d array in a clockwise snailshell pattern.
 * NOTE 2: The 0x0 (empty matrix) is represented as [[]]
 */

/*
 * 分析：
 * 螺旋地遍历一个二维矩阵，可分解为4个方向的移动轨迹，
 * 还需要控制每个方向的移动应该何时转向，于是就定义4个顶点，
 * 每次转向时，还需要更新这些顶点。
 * 直到走完为止。
 */
function snail(matrix) {
    let vertexes = {
        topRight: matrix[0].length - 1,    // → limit, [x increases], y remains
        bottomRight: matrix[0].length - 1, // ↓ limit, x remains, [y increases]
        bottomLeft: 0,                     // ← limit, [x decreases], y remains
        topLeft: 0                         // ↑ limit, x remains, [y decreases]
    };

    let result = [],
        resultLen;
    // let debugCount = 1;
    do {
        // console.log(debugCount++);

        // moving →
        resultLen = result.length;
        for (let i = vertexes.topLeft; i <= vertexes.topRight; i++) {
            result.push(matrix[vertexes.topLeft][i]);
        }
        vertexes.topLeft++;
        // console.log(result);
        if (resultLen === result.length) return result;


        // moving ↓
        resultLen = result.length;
        for (let i = vertexes.topLeft; i <= vertexes.bottomRight; i++) {
            result.push(matrix[i][vertexes.bottomRight]);
        }
        vertexes.topRight--;
        // console.log(result);
        if (resultLen === result.length) return result;


        // moving ←
        resultLen = result.length;
        for (let i = vertexes.topRight; i >= vertexes.bottomLeft; i--) {
            result.push(matrix[vertexes.bottomRight][i]);
        }
        vertexes.bottomRight--;
        // console.log(result);
        if (resultLen === result.length) return result;


        // moving ↑
        resultLen = result.length;
        for (let i = vertexes.bottomRight; i >= vertexes.bottomLeft + 1; i--) {
            result.push(matrix[i][vertexes.bottomLeft]);
        }
        vertexes.bottomLeft++;
        // console.log(result);
        if (resultLen === result.length) return result;

    } while (resultLen !== result.length);
}

console.log(snail([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
])); // [1,2,3,4,5,6,7,8,9]

// console.log(snail([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ])); // [1,2,3,6,9,8,7,4,5]

console.log(snail([
    [11, 12, 13, 14],
    [22, 23, 24, 15],
    [21, 26, 25, 16],
    [20, 19, 18, 17]
])); // [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ]

/**
 * 社区解答：https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/solutions/javascript
 *
 * 其实直接把这个矩阵螺旋地裁剪就可以了，
 * 这样做的好处是不用在遍历的途中判断边界。
 */
// snail = function(array) {
//     var result;
//     while (array.length) {
//         // Steal the first row.
//         result = (result ? result.concat(array.shift()) : array.shift());
//         // Steal the right items.
//         for (var i = 0; i < array.length; i++)
//             result.push(array[i].pop());
//         // Steal the bottom row.
//         result = result.concat((array.pop() || []).reverse());
//         // Steal the left items.
//         for (var i = array.length - 1; i >= 0; i--)
//             result.push(array[i].shift());
//     }
//     return result;
// }