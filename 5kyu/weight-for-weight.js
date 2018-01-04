/**
 * http://www.codewars.com/kata/weight-for-weight/train/javascript
 *
 * My friend John and I are members of the "Fat to Fit Club (FFC)".
 * John is worried because each month a list with the weights of members
 * is published and each month he is the last on the list which means he is the heaviest.
 *
 * I am the one who establishes the list so I told him:
 * "Don't worry any more, I will modify the order of the list".
 * It was decided to attribute a "weight" to numbers.
 * The weight of a number will be from now on the sum of its digits.
 *
 * For example 99 will have "weight" 18, 100 will have "weight" 1
 * so in the list 100 will come before 99.
 * Given a string with the weights of FFC members in normal order
 * can you give this string ordered by "weights" of these numbers?
 *
 * "56 65 74 100 99 68 86 180 90" ordered by numbers weights
 *   becomes: "100 180 90 56 65 74 68 86 99"
 *
 * When two numbers have the same "weight",
 * let us class them as if they were strings and not numbers:
 * 100 is before 180 because its "weight" (1) is less than the one of 180 (9)
 * and 180 is before 90 since, having the same "weight" (9) it comes before as a string.
 *
 * All numbers in the list are positive numbers and the list can be empty.
 */

/*
 * 分析：
 * 简单来讲就是把数字按照其权重来重新排序（升序），
 * 权重就是各位数字相加之和。
 * 对于权重相同的数字，就视为string来排序。[要小心 sort 不是稳定排序]
 */
function orderWeight(str) {
    return str.trim().length ?
        str.trim()
            .split(' ')
            // .sort() // 如果 sort 是稳定排序的话，这里事先排一次就得了
            .map(numStr => {
                return {
                    numStr: numStr,
                    weight: numStr.split('').reduce((prev, next) => {
                        return prev + parseInt(next);
                    }, 0)
                }
            })
            .sort((a, b) => {
                if (a.weight === b.weight) {
                    return a.numStr.localeCompare(b.numStr);
                } else {
                    return a.weight - b.weight;
                }
            })
            .map(obj => obj.numStr)
            .join(' ')
        : '';
}

console.log(orderWeight('')); // ''
console.log(orderWeight("103 123 4444 99 2000")); // "2000 103 123 4444 99"
console.log(orderWeight("2000 10003 1234000 44444444 9999 11 11 22 123")); // "11 11 2000 10003 22 123 1234000 44444444 9999"

console.log(orderWeight("71899703 200 6 91 425 4 67407 7 96488 6 4 2 7 31064 9 7920 1 34608557 27 72 18 81"));
// (√) 1 2 200 4 4 6 6 7 7 18 27 72 81 9 91 425 31064 7920 67407 96488 34608557 71899703
// (×) 1 2 200 4 4 6 6 7 7 27 18 81 9 72 91 425 31064 7920 67407 96488 34608557 71899703

/**
 * 在 sort 的比较函数中，使用了 localeCompare 来解决权重一致时，字符串的排序问题。
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
 *
 * 社区中的解法也和我自己写的如出一撤。
 */