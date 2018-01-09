/**
 * https://www.codewars.com/kata/merged-string-checker/train/javascript
 *
 * At a job interview, you are challenged to write an algorithm to check if a given string, s,
 * can be formed from two other strings, part1 and part2.
 *
 * The restriction is that the characters in part1 and part2 are in the same order as in s.
 *
 * The interviewer gives you the following example
 * and tells you to figure out the rest from the given test cases.
 *
 * For example:
 *   'codewars' is a merge from 'cdw' and 'oears':
 *
 *       s:  c o d e w a r s   = codewars
 *   part1:  c   d   w         = cdw
 *   part2:    o   e   a r s   = oears
 */

/*
 * 分析：
 * 看例子都说明不了啥：需要考虑长度吗？字母重复的问题怎么办？
 */
function isMerge(s, part1, part2) {
    // invalid merge length
    if (s.length !== part1.length + part2.length) return false;
    // invalid merge letters
    if (s.split('').sort().join('') !==
        part1.split('').concat(part2.split('')).sort().join('')) return false;

    return sameOrder(s, part1) && sameOrder(s, part2);
}

function sameOrder(s, part) {
    s = s.split('');
    part = part.split('');
    let index = 0;
    for (let i = 0; i < part.length; i++) {
        let nextIndex = s.indexOf(part[i], index); // search from last found index
        if (nextIndex < index) return false;
        if (nextIndex >= s.length) return false;
        index = nextIndex;
    }
    return true;
}

console.log(isMerge('codewars', 'code', 'wars')); // true
console.log(isMerge('codewars', 'cdw', 'oears')); // true
console.log(isMerge('codewars', 'cod', 'wars')); // false

/**
 * 社区解答：
 * https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa/solutions/javascript
 * 
 * 基本上都是在用递归来实现，思路差不多：
 *   3个字符串同时取第一个字符，比较 part1 和 part2 是否有一个与之相同，
 *   有的话就 slice 掉第一个字符，然后递归。
 * 
 * 觉得自己的解法是一个清流啊，不过也易懂。
 */
// function isMerge(s, part1, part2) {
//     return !s ? !(part1 || part2) :
//         s[0] == part1[0] && isMerge(s.slice(1), part1.slice(1), part2) ||
//         s[0] == part2[0] && isMerge(s.slice(1), part1, part2.slice(1));
// }

// 遇到两边都相同时，这里做了一个分叉，然后取 OR 的结果
// function isMerge(s, part1, part2) {
//     if (s === "" && part1 === "" && part2 === "") return true;
//
//     if (s !== "") {
//         if (s[0] === part1[0] && part1[0] === part2[0]) {
//             // we make two branches of an recursion and get OR of the answers
//             return (isMerge(s.slice(1), part1.slice(1), part2) || isMerge(s.slice(1), part1, part2.slice(1)));
//         } else if (s[0] === part1[0]) {
//             return isMerge(s.slice(1), part1.slice(1), part2);
//         } else if (s[0] === part2[0]) {
//             return isMerge(s.slice(1), part1, part2.slice(1));
//         }
//     }
//
//     return false;
// }