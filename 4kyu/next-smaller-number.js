/**
 * https://www.codewars.com/kata/5659c6d896bc135c4c00021e
 */

let n = 9999999999;

let nArr = (n + '').split('');

/**
 全排列（递归交换）算法
 1、将第一个位置分别放置各个不同的元素；
 2、对剩余的位置进行全排列（递归）；
 3、递归出口为只对一个元素进行全排列。
 */
function getFullPermutation(arr) {
    let result = [];
    (function fn(n) { //为第n个位置选择元素
        for (let i = n; i < arr.length; i++) {
            swap(arr, i, n);
            if (n + 1 < arr.length - 1) {  //判断数组中剩余的待全排列的元素是否大于1个
                fn(n + 1);  //从第n+1个下标进行全排列}
            }
            else {
                result.push(arr.concat()); //记录一组结果（结果集中不能引用arr，而是创建一个副本）
            }
            swap(arr, i, n);
        }
    })(0);
    return result;
}

function swap(arr, i, j) {
    if (i !== j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// 处理结果
let resultNumbers = getFullPermutation(nArr)
    .map((digitArr) => {
        return parseInt(digitArr.join('')); // 全部转换成数字
    })
    .filter((candidate) => {
        let noLeading0 = (candidate + '').length === nArr.length; // 保证没有前导0（位数一致）
        let smaller = candidate < n; // 需要小于原来的输入
        return noLeading0 && smaller;
    })
    .sort(); // 升序排列

if (resultNumbers.length) {
    console.log(resultNumbers.pop());
} else {
    console.log(-1);
}
