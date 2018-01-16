/**
 * http://www.codewars.com/kata/recover-a-secret-string-from-random-triplets/train/javascript
 *
 * There is a secret string which is unknown to you.
 * Given a collection of random triplets from the string, recover the original string.
 *
 * A triplet here is defined as a sequence of three letters
 * such that each letter occurs somewhere before the next in the given string.
 * "whi" is a triplet for the string "whatisup".
 *
 * As a simplification, you may assume that no letter occurs
 * more than once in the secret string.
 *
 * You can assume nothing about the triplets given to you
 * other than that they are valid triplets
 * and that they contain sufficient information to deduce the original string.
 * In particular, this means that the secret string will never contain letters
 * that do not occur in one of the triplets given to you.
 */

/*
 * 分析：
 *
 * 规则：
 * - triplet 不会包含结果中不存在的字母；
 * - 结果中不会有重复的字母；
 *
 * 思路：
 * - 不断遍历 triplets，对每个 triplet 中的每个字母进行处理
 * - 如果当前字母在 secret 中，那么检查其前后字母的情况
 * - 如果应该出现前面的字母：
 * --- 不在 secret 中，则插入到当前字母的前一个位置；
 * --- 已经存在于 secret 且其位置在当前字母后面，则把它挪到当前字母的前面；
 * --- 否则不动它；
 * - 应该出现在后面的字母做类似的处理。
 * - 使用一个 flag 作为处理的标志，secret 不再变化后结束循环。
 */
function recoverSecret(triplets) {
    let secret = triplets[0]; // use the first triplet as base secret
    let flag = true;
    while (flag) {
        flag = false;

        triplets.forEach((triplet) => {
            // console.log('---------------------------');
            triplet.forEach((letter, i) => {
                let curLetterIndex = secret.indexOf(letter);
                if (curLetterIndex < 0) return; // current letter not in secret, thus can't be used as a reference point

                // check previous letter
                let preLetter = triplet[i - 1];
                if (preLetter) {
                    let preLetterIndex = secret.indexOf(preLetter);
                    if (preLetterIndex < 0) {
                        secret.splice(curLetterIndex, 0, preLetter);
                        flag = true;
                    } else if (preLetterIndex > curLetterIndex) {
                        secret.splice(preLetterIndex, 1);
                        secret.splice(curLetterIndex - 1, 0, preLetter);
                        flag = true;
                    }
                }

                // check next letter
                let nextLetter = triplet[i + 1];
                if (nextLetter) {
                    let nextLetterIndex = secret.indexOf(nextLetter);
                    if (nextLetterIndex < 0) {
                        secret.splice(curLetterIndex + 1, 0, nextLetter);
                        flag = true;
                    } else if (nextLetterIndex < curLetterIndex) {
                        secret.splice(nextLetterIndex, 1);
                        secret.splice(curLetterIndex, 0, nextLetter);
                        flag = true;
                    }
                    // console.log(curLetterIndex + '    ' + nextLetterIndex);
                }
                // console.log(secret);
            });
        });
    }
    return secret.join('');
}

console.log(
    recoverSecret([
        ['t', 'u', 'p'],
        ['w', 'h', 'i'],
        ['t', 's', 'u'],
        ['a', 't', 's'],
        ['h', 'a', 'p'],
        ['t', 'i', 's'],
        ['w', 'h', 's']
    ])
); // "whatisup"

console.log(
    recoverSecret([
        ['h', 'a', 'p'],
        ['t', 's', 'u'],
        ['t', 'i', 's'],
        ['w', 'h', 's'],
        ['a', 't', 's'],
        ['w', 'h', 'i'],
        ['t', 'u', 'p'],
    ])
); // "whatisup"

console.log(
    recoverSecret([
        ['t', 's', 'f'],
        ['a', 's', 'u'],
        ['m', 'a', 'f'],
        ['a', 'i', 'n'],
        ['s', 'u', 'n'],
        ['m', 'f', 'u'],
        ['a', 't', 'h'],
        ['t', 'h', 'i'],
        ['h', 'i', 'f'],
        ['m', 'h', 'f'],
        ['a', 'u', 'n'],
        ['m', 'a', 't'],
        ['f', 'u', 'n'],
        ['h', 's', 'n'],
        ['a', 'i', 's'],
        ['m', 's', 'n'],
        ['m', 's', 'u']
    ])
); // "mathisfun"

/**
 * 社区解答：
 * http://www.codewars.com/kata/53f40dff5f9d31b813000774/solutions/javascript
 *
 * 玛德还用上了递归↓
 */
// let recoverSecret = function (triplets) {
//     for (let [first] of triplets) {
//         if (triplets.every(tuple => tuple.indexOf(first) <= 0)) {
//             triplets.filter(([item]) => item == first).forEach(tuple => tuple.shift());
//             return first + recoverSecret(triplets.filter(tuple => tuple.length > 0));
//         }
//     }
//     return '';
// };

/**
 * 这是我自己第一次做的时候的解法，也是别样萌
 * http://www.codewars.com/kata/53f40dff5f9d31b813000774/solutions/javascript/me/best_practice
 */
// var recoverSecret = function (triplets) {
//
// // collect all characters
//     let secret = triplets.reduce((pre, cur) => {
//         return pre.concat(cur)
//     });
// // remove duplicated characters
//     secret = [...new Set(secret)];
//
//     console.log(secret);
//
// // I don't chenk when the secret is ready,
// // But adjusting letters' position 3 times
// //  should be OK enough.
//     let count = 0;
//     while (count < 3) {
//         for (let i = 0; i < triplets.length; i++) {
//             let letter0 = triplets[i][0];
//             let letter1 = triplets[i][1];
//             let letter2 = triplets[i][2];
//
//             let i0, i1, i2;
//
//             i0 = secret.indexOf(letter0);
//             i1 = secret.indexOf(letter1);
//             if (i0 > i1) {
//                 secret.splice(i1, 1);
//                 secret.splice(i0, 0, letter1);
//             }
//
//             i1 = secret.indexOf(letter1);
//             i2 = secret.indexOf(letter2);
//             if (i1 > i2) {
//                 secret.splice(i2, 1);
//                 secret.splice(i1, 0, letter2);
//             }
//         }
//
//         count++;
//     }
//
//     return secret.join('');
// }