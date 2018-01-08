/**
 * http://www.codewars.com/kata/maximum-subarray-sum
 *
 * The maximum sum subarray problem consists in
 * finding the maximum sum of a contiguous subsequence
 * in an array or list of integers:
 *
 * maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
 * // should be 6: [4, -1, 2, 1]
 *
 * Easy case is when the list is made up of only positive numbers
 * and the maximum sum is the sum of the whole array.
 * If the list is made up of only negative numbers, return 0 instead.
 *
 * Empty list is considered to have zero greatest sum.
 * Note that the empty list or array is also a valid sublist/subarray.
 */

/*
 * 分析：
 * 用二重循环来解决吧。
 */
function maxSequence(arr) {
    let maxSum = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        let tmpSum = arr[i];
        if (maxSum < arr[i]) maxSum = arr[i];
        for (let j = i + 1, len = arr.length; j < len; j++) {
            tmpSum += arr[j];
            if (maxSum < tmpSum) maxSum = tmpSum;
        }
    }
    return maxSum;
}

console.log(maxSequence([])); // 0
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

/**
 * 社区解答：http://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/solutions/javascript
 *
 * 解释：
 * Let's image a broken line chart presenting the sum.
 *  http://i.imgur.com/HnEEx0Q.png
 *
 * You could try climbing from most bottom valley to the most top peak.
 * The difference between them is the answer we want.
 * At the first glance, you may want to pick the most top and most bottom point to get the answer.
 * But you will notice the answer is wrong when the most bottom point come after the most top point.
 *
 * As a result.
 * I'll try to keep the most bottom point so far,
 * //min = Math.min(sum, min);
 * and update the answer if the new difference is bigger than origin answer.
 * //ans = Math.max(ans, sum - min);
 *
 */
// function maxSequence(arr) {
//     var min = 0, ans = 0, i, sum = 0;
//     for (i = 0; i < arr.length; ++i) {
//         sum += arr[i];
//         min = Math.min(sum, min);
//         ans = Math.max(ans, sum - min);
//     }
//     return ans;
// }