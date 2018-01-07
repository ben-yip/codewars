/**
 * http://www.codewars.com/kata/sum-of-pairs/train/javascript
 *
 * Given a list of integers and a single sum value,
 * return the first two values (parse from the left please)
 * in order of appearance that add up to form the sum.
 *
 *
 * sum_pairs([11, 3, 7, 5],         10)
 * #              ^--^      3 + 7 = 10
 * == [3, 7]
 *
 * sum_pairs([4, 3, 2, 3, 4],         6)
 * #          ^-----^         4 + 2 = 6, indices: 0, 2 *
 * #             ^-----^      3 + 3 = 6, indices: 1, 3
 * #                ^-----^   2 + 4 = 6, indices: 2, 4
 * #  * entire pair is earlier, and therefore is the correct answer == [4, 2]
 * == [4, 2]
 *
 * sum_pairs([0, 0, -2, 3], 2)
 * #  there are no pairs of values that can be added to produce 2.
 * == None/nil/undefined (Based on the language)
 *
 * sum_pairs([10, 5, 2, 3, 7, 5],         10)
 * #              ^-----------^   5 + 5 = 10, indices: 1, 5
 * #                    ^--^      3 + 7 = 10, indices: 3, 4 *
 * #  * entire pair is earlier, and therefore is the correct answer == [3, 7]
 * == [3, 7]
 * #  不是很懂为什么 [3, 7] 会'earlier'，不可能是因为 index 的差更小吧？
 *
 *
 * Negative numbers and duplicate numbers can and will appear.
 *
 * NOTE: There will also be lists tested of lengths upwards of 10,000,000 elements.
 * Be sure your code doesn't time out.
 */

/*
 * 分析：
 * 暂时能想到的方法就是二重循环去遍历了，
 * 最多是找到之后马上 break 掉，但还是想不通上面的那个例子啊..
 */

let sum_pairs = function (ints, sum) {
    console.log(ints.length + ' test elements');

    let results = [];
    // let breakFlag = false;
    for (let i = 0, len = ints.length; i < len; i++) {
        // if (breakFlag) break;
        let augend = ints[i];
        for (let j = i + 1, len = ints.length; j < len; j++) {
            // console.log(augend + ' ' + ints[j]);
            if (augend + ints[j] === sum) {
                results.push([i, j]);
                // breakFlag = true;
                break;
                // return [augend, ints[j]];
            }
        }
    }

    // 要找出所有符合结果中的 index 的差最小的话，上面就得执行完整遍历
    // if (results.length) {
    //     let differences = results.map(r => {
    //         return r[1] - r[0];
    //     });
    //     // console.log(differences);
    //     let index = differences.indexOf(Math.min.apply(Math, differences));
    //     // console.log(index);
    //     return [
    //         ints[results[index][0]],
    //         ints[results[index][1]]
    //     ];
    // }
    
    if (results.length) {
        return [
            ints[results[0][0]],
            ints[results[0][1]]
        ];
    }
};

console.log(sum_pairs([1, 4, 8, 7, 3, 15], 8));  // [1, 7]
console.log(sum_pairs([1, -2, 3, 0, -6, 1], -6));  // [0, -6]
console.log(sum_pairs([20, -13, 40], -7));  // undefined
console.log(sum_pairs([1, 2, 3, 4, 1, 0], 2));  // [1, 1]
console.log(sum_pairs([10, 5, 2, 3, 7, 5], 10));  // [3, 7]   NOTE: [5, 5] is incorrect!
console.log(sum_pairs([4, -2, 3, 3, 4], 8));  // [4, 4]
console.log(sum_pairs([0, 2, 0], 0));  // [0, 0]
console.log(sum_pairs([5, 9, 13, -3], 10));  // [13, -3]