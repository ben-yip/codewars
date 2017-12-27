/**
 * https://www.codewars.com/kata/53907ac3cd51b69f790006c5/train/javascript
 */

/* Should return ᐃ type:
  0 : if ᐃ cannot be made with given sides
  1 : acute ᐃ
  2 : right ᐃ
  3 : obtuse ᐃ
*/
function triangleType(a, b, c) {
    let arr = [a, b, c].sort((i, j) => {
        return i - j;
    });

    if (arr[0] + arr[1] <= arr[2]) return 0;

    let sqSum = Math.pow(arr[0], 2) + Math.pow(arr[1], 2),
        sqC = Math.pow(arr[2], 2);

    if (sqSum > sqC) return 1;
    else if (sqSum === sqC) return 2;
    else return 3;
}

/*
 * 注意乘方要用 Math.pow()
 * ^ 表示的是异或
 */