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
 * - 可能有多个解；
 * - 那就从n-1的开始，遍历一次看有没有符合的。
 *   该算法的查找顺序为：（假设 n=6）
 *   -- 54321
 *   -- 4321
 *   -- 321
 *   -- 21
 *   -- 1
 *   这种遍历做法的弊端是可能会遗漏符合要求的解。
 */
function decompose(n) {
    let square = n * n;
    for (let i = n - 1; i > 0; i--) {
        let sum = 0, result = [];
        for (let j = i; j > 0; j--) {
            if (sum + j * j <= square) {
                result.unshift(j);
                sum += j * j;
            }
            if (sum === square) return result;
        }
    }
    return null;
}

/*
 * 题目中要求返回所有可能解中“最大"的那个，应该理解成数组的最后一项最大的那个解。
 * （然而却发现按照上面的算法OJ也能通过，它只会检查 累加和 以及 数组序列是否递增）
 * 所以就想办法弄了个阶乘式的遍历，例如 n=6，则遍历的序列的顺序为：
 * ------
 * 54321
 * 5321
 * 521
 * 51
 * ------
 * 4321
 * 421
 * 41
 * ------
 * 321
 * 31
 * ------
 * 21
 * 直到找到为止。 
 * 
 * 然而超时了...........如果要提高效率的话，可以从数学的角度分析一下，跳过循环中一些不必要的计算
 */
function decomposeFacto(n) {
    let square = n * n;
    let facto = (n, origin) => {
        if (n > 0) {
            let sum = 0, result = [];
            result.unshift(origin);
            sum += origin * origin;
            for (let i = n; i > 0; i--) {
                if (sum + i * i <= square) {
                    result.unshift(i);
                    sum += i * i;
                }
            }
            return sum === square ? result : facto(n - 1, origin);
        } else return [];
    };
    for (let i = n - 1; i > 0; i--) {
        let re = facto(i - 1, i);
        if (re.length) return re;
    }
    return null;
}

console.log(decompose(2));  // null
console.log(decompose(7));  // [2, 3, 6]
console.log(decompose(11)); // [1, 2, 4, 10]
console.log(decompose(50));      // [14, 48]
console.log(decomposeFacto(50)); // [1, 3, 5, 8, 49]
console.log(decompose(87802));  // Expected: [1,4,5,419,87801] Got: [1,5,937,87797] Sorted: true Total: true
console.log(decompose(123456)); // [1, 2, 7, 29, 496, 123455]
console.log(decompose(123457)); // [1, 3, 7, 31, 702, 123455]

/**
 * 社区解答：https://www.codewars.com/kata/54eb33e5bc1a25440d000891/solutions/javascript
 * 只能说6666
 */
// function decompose(n, n2 = n * n, i = n, prev) {
//     while (n2 > 0 && i-- > 1) {
//         if (prev = decompose(n, n2 - i * i, i)) {
//             return prev.concat(i)
//         }
//     }
//     return (n2 === 0) ? [] : null
// }