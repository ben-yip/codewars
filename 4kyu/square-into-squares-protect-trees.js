/**
 * http://www.codewars.com/kata/square-into-squares-protect-trees/train/javascript
 *
 * My little sister came back home from school with the following task:
 * given a squared sheet of paper she has to cut it in pieces which,
 * when assembled, give squares the sides of which form an increasing sequence of numbers.
 * At the beginning it was lot of fun but little by little we were tired of seeing the pile of torn paper.
 * So we decided to write a program that could help us and protects trees.
 *
 * Task
 * Given a positive integral number n, return a strictly increasing sequence of numbers,
 * (list/array/string depending on the language) so that the sum of the squares is equal to n².
 * If there are multiple solutions (and there will be), return the result with the largest possible values:
 *
 * Examples
 * decompose(11) must return [1,2,4,10].
 * Note that there are actually two ways to decompose 11²,
 * 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10² but don't return [2,6,9], since 9 is smaller than 10.
 *
 * For decompose(50) don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49]
 * since [1, 1, 4, 9, 49] doesn't form a strictly increasing sequence.
 *
 * Note
 * - Neither [n] nor [1,1,1,…,1] are valid solutions.
 * - If no valid solution exists, return nil, null, Nothing, None (depending on the language)
 *   or "[]" (C) ,{} (C++), [] (Swift).
 * - The function "decompose" will take a positive integer n
 *   and return the decomposition of N = n² as: [x1 ... xk]
 *
 * Note for Bash
 * - decompose 50 returns "1,3,5,8,49"
 * - decompose 4  returns "Nothing"
 *
 * Hint
 * Very often xk will be n-1.
 */

/*
 * 分析：
 * 给定一个整数，求这个整数的平方所能拆解成的一系列平方和（严格递增）
 * - [n] 或者 [1,1,1,…,1] 都是无效的；
 * - 可能有多个解，返回最大的那个；
 * 那就从n-1的开始，遍历一次看有么有符合的咯。
 */
function decompose(n) {
    let square = n * n,
        result = [],
        valid = arr => { // check if it is a strictly increasing array
            return arr.length ? arr.every((val, i, arr) => {
                return arr[i - 1] ? val > arr[i - 1] : true;
            }) : false;
        };

    let foo = []
    n--;
    while (!valid(result) && n > 0) {
        result = [];
        let sum = 0;
        for (let i = n; i > 0; i--) {
            sum = 0;
            for (let j = i; j > 0; j--) {
                if (sum + j * j <= square) {
                    result.unshift(j);
                    sum += j * j;
                }
            }
            if (sum !== square) result = []; // not valid, reset to empty
            else foo.push(result)
            // if (sum + i * i <= square) {
            //     result.unshift(i);
            //     sum += i * i;
            // }
        }
        n--;
    }

    console.log(foo);

    return n > 0 ? result : null;
}


// console.log(decompose(2));  // null
// console.log(decompose(7));  // [2, 3, 6]
// console.log(decompose(11)); // [1, 2, 4, 10]
console.log(decompose(50)); // [1, 3, 5, 8, 49] // not [14, 48]

/**
 * 社区解答：
 */