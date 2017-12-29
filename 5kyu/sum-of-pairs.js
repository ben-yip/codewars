/**
 * http://www.codewars.com/kata/sum-of-pairs/train/javascript
 *
 * sum_pairs([4, 3, 2, 3, 4],         6)
 * #          ^-----^         4 + 2 = 6, indices: 0, 2 *
 * #             ^-----^      3 + 3 = 6, indices: 1, 3
 * #                ^-----^   2 + 4 = 6, indices: 2, 4
 * #  * entire pair is earlier, and therefore is the correct answer == [4, 2]
 *
 * sum_pairs([10, 5, 2, 3, 7, 5],         10)
 * #              ^-----------^   5 + 5 = 10, indices: 1, 5
 * #                    ^--^      3 + 7 = 10, indices: 3, 4 *
 * #  * entire pair is earlier, and therefore is the correct answer == [3, 7]
 * #  不是很懂为什么 [3, 7] 会排在前面，是因为 index 的差更小？
 *
 * 特么测试的数组会有 10,000,000 个值，还要小心超时。
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
    if (results.length) {
        let differences = results.map(r => {
            return r[1] - r[0];
        });
        // console.log(differences);
        let index = differences.indexOf(Math.min.apply(Math, differences));
        // console.log(index);
        return [
            ints[results[index][0]],
            ints[results[index][1]]
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