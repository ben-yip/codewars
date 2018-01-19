/**
 * http://www.codewars.com/kata/strings-mix/train/javascript
 *
 * Given two strings s1 and s2, we want to visualize how different the two strings are.
 * We will only take into account the lowercase letters (a to z).
 * First let us count the frequency of each lowercase letters in s1 and s2.
 *
 * s1 = "A aaaa bb c"
 * s2 = "& aaa bbb c d"
 * s1 has 4 'a', 2 'b', 1 'c'
 * s2 has 3 'a', 3 'b', 1 'c', 1 'd'
 *
 * So the maximum for 'a' in s1 and s2 is 4 from s1;
 * the maximum for 'b' is 3 from s2.
 * In the following we will not consider letters
 * when the maximum of their occurrences is less than or equal to 1.
 *
 * We can resume the differences between s1 and s2 in the following string:
 * "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa
 * because the maximum for a is 4.
 * In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.
 *
 * The task is to produce a string in which each lowercase letters of s1 or s2
 * appears as many times as its maximum if this maximum is strictly greater than 1;
 * these letters will be prefixed by the number of the string
 * where they appear with their maximum value and :.
 * If the maximum is in s1 as well as in s2 the prefix is =:.
 *
 * In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix)
 * will be in decreasing order of their length and when they have the same length
 * sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint);
 * the different groups will be separated by '/'. See examples and "Example Tests".
 *
 *
 * Hopefully other examples can make this clearer.
 *
 * s1 = "my&friend&Paul has heavy hats! &"
 * s2 = "my friend John has many many friends &"
 * mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"
 *
 * s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
 * s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
 * mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"
 *
 * s1="Are the kids at home? aaaaa fffff"
 * s2="Yes they are here! aaaaa fffff"
 * mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"
 */

/*
 * 分析：
 * 不难，就是比较烦，基本步骤如下：
 * - 过滤非[a-z]字符；【注意正则取反的应用】
 * - 统计各个字符的出现次数；
 * - 去除出现次数为一个的统计结果；
 * - 比较两组统计结果，推入结果数组，要记录来自哪一个字符串；
 * - 结果数组排序，
 * --- 出现次数越多的排前面，
 * --- 出现次数一致，按照来源排列 s1 > s2 > =
 * --- 出现次数一致，且来源一致，按照字母表升序排列
 * 相同长度的按字典升序；
 * - 使用 / 来拼接字符串；
 *
 * 下面的实现中使用了二维数组，如果用对象数组的话可能阅读起来会更直观点。
 */
function mix(s1, s2) {
    let arr1 = count(filterLowercase(s1), '1'),
        arr2 = count(filterLowercase(s2), '2');

    // merge results
    let resultArr = [];
    arr1.concat(arr2).sort((a, b) => {
        return a[0].localeCompare(b[0]);
    }).forEach((tuple, i, arr) => {
        if (arr[i + 1] && arr[i][0] === arr[i + 1][0]) {
            let count1 = arr[i][1],
                count2 = arr[i + 1][1];
            if (count1 > count2) resultArr.push(arr[i]);
            else if (count2 > count1) resultArr.push(arr[i + 1]);
            else resultArr.push([arr[i][0], arr[i][1], '=']);
        } else if (!arr[i - 1] || arr[i - 1] && arr[i][0] !== arr[i - 1][0]) {
            resultArr.push(arr[i]);
        }
    });


    // sort base on occurrences and lexicographic order
    let order = {
        '1': 1,
        '2': 2,
        '=': 3
    };
    resultArr.sort((a, b) => {
        if (a[1] === b[1]) {
            if (a[2] === b[2]) {
                return a[0].localeCompare(b[0]);
            } else {
                return order[a[2]] - order[b[2]];
            }
        } else {
            return b[1] - a[1]; // descending
        }
    });

    // console.log(resultArr);

    return resultArr.map(tuple => {
        return tuple[2] + ':' + new Array(tuple[1]).fill(tuple[0]).join('');
    }).join('/');
}

/**
 * Only keep lowercase letters.
 * @param str
 * @returns {string | void | *}
 */
function filterLowercase(str) {
    return str.replace(/[^a-z]/g, '');
}

/**
 * Count occurrence of each letter,
 * and leave out those shows up only once.
 *
 * The tag is used to mark its origin.
 * @param str
 * @param tag
 * @returns {Array}
 */
function count(str, tag) {
    let resultSet = [],
        c = 1;
    if (!tag) tag = '';

    let arr = str.split('').sort();
    arr.push('FOO'); // used for the last circulation
    arr.forEach((letter, i, arr) => {
        if (arr[i - 1]) {
            if (letter === arr[i - 1]) {
                c++;
            } else if (c > 1) {
                resultSet.push([arr[i - 1], c, tag]);
                c = 1;
            }
        }
    });
    return resultSet;
}

console.log(mix("Are they here", "yes, they are here")); // "2:eeeee/2:yy/=:hh/=:rr"
console.log(mix("looping is fun but dangerous", "less dangerous than coding")); // "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg"
console.log(mix(" In many languages", " there's a pair of functions")); // "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt"
console.log(mix("Lords of the Fallen", "gamekult")); // "1:ee/1:ll/1:oo"
console.log(mix("codewars", "codewars")); // ""
console.log(mix("A generation must confront the looming ", "codewarrs")); // "1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr"


/**
 * 社区解答：
 * http://www.codewars.com/kata/5629db57620258aa9d000014/solutions/javascript
 * 大体思路都差不多，只是别人写起来都好优雅啊，
 * 也有好些地方都用上了 ES6 的 API
 * 比起自己的糟糕实现真是相形见绌
 */

/**
 * 统计字母出现次数时，用的是reduce的方法，其中直接把字母直接作为对象属性来统计次数，不错的 one-liner
 */
// function mix(s1, s2) {
//     var counter = s => s.replace(/[^a-z]/g, '').split('').sort().reduce((x, y) => (x[y] = 1 + (x[y] || 0), x), {});
//     s1 = counter(s1);
//     s2 = counter(s2);
//     var res = [], keys = new Set(Object.keys(s1).concat(Object.keys(s2)));
//     keys.forEach(key => {
//         var c1 = s1[key] || 0, c2 = s2[key] || 0, count = Math.max(c1, c2);
//         if (count > 1) {
//             var from = [1, '=', 2][Math.sign(c2 - c1) + 1];
//             var str = [...Array(count)].map(_ => key).join('');
//             res.push(from + ':' + str);
//         }
//     });
//     return res.sort((x, y) => y.length - x.length || (x < y ? -1 : 1)).join('/');
// }
/**
 * 这种更贴近我自己的思路：加上用的对象数组的数据结构，
 *
 * 还用上了 filter 来统计每个字母的出现个数，非常优雅
 * 最后组装阶段用了模板字符串的特性，以及其重复字符的方法，非常棒
 * 其余各个地方的条件判断也非常简洁
 */
// const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
// function mix(s1, s2) {
//     return alphabet
//         .map(char => {
//             const s1Count = s1.split('').filter(x => x === char).length,
//                 s2Count = s2.split('').filter(x => x === char).length,
//                 maxCount = Math.max(s1Count, s2Count);
//
//             return {
//                 char: char,
//                 count: maxCount,
//                 src: maxCount > s1Count ? '2' : maxCount > s2Count ? '1' : '='
//             };
//         })
//         .filter(c => c.count > 1)
//         .sort((objA, objB) => objB.count - objA.count || (objA.src + objA.char > objB.src + objB.char ? 1 : -1))
//         .map(c => `${c.src}:${c.char.repeat(c.count)}`)
//         .join('/');
// }
