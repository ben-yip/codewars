/**
 * http://www.codewars.com/kata/directions-reduction/train/
 */

/*
 * 思路：不断遍历数组，每次除去第一次找到的相邻的两个相反的方向，直到找不到为止
 */

function _vain(dir1, dir2) {
    let temp = [dir1, dir2].sort();
    dir1 = temp[0];
    dir2 = temp[1];
    return dir1 === 'NORTH' && dir2 === 'SOUTH'
        || dir1 === 'EAST' && dir2 === 'WEST';
}

// console.log(_vain("EAST", 'EAST'));
// console.log(_vain('SOUTH', "WEST"));
// console.log(_vain('SOUTH', "NORTH"));
// console.log(_vain("EAST", 'SOUTH'));

function dirReduc(directions) {
    let length;

    do {
        length = directions.length;
        for (let i = 1, len = directions.length; i < len; i++) {
            if (_vain(directions[i - 1], directions[i])) {
                directions.splice(i - 1, 2); // length changes here.
                break;
            }
        }
    } while (length !== directions.length);

    return directions;
}

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])); // [ 'WEST' ]
console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"])); // ["NORTH", "WEST", "SOUTH", "EAST"]
console.log(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"])); // []

/**
 * 解答区排名最高的两个答案，一个用 Array.reduce，另一个用正则，都很妙。
 * http://www.codewars.com/kata/550f22f4d758534c1100025a/solutions/javascript
 */
