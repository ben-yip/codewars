/**
 * https://www.codewars.com/kata/5286d92ec6b5a9045c000087
 */

let q = 'user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue';

// decode and do split twice( & and =)
let decoded = decodeURIComponent(q);
let split = decoded.split('&');
let arrMap = [];
split.forEach((item) => {
    arrMap.push(item.split('='));
});

let obj = {};
arrMap.forEach((item) => {
    let keyPath = item[0].split('.');

    // populate the value to the last one of key path.
    let tempObj = {};
    tempObj[keyPath[keyPath.length - 1]] = item[1];

    // concat one by one from the deepest till the top level of key path.
    let t = tempObj;
    console.log(t);
    keyPath.reduceRight((pre, cur, index) => {
        let x = {};
        x[cur] = t;
        t = x;
        console.log(t);
    });
    console.log('=================');

    // deep merge to result object
    mergeJSON(obj, t);
});

// 不返还新Object，而是main改变
function mergeJSON(main, minor) {
    for (let key in minor) {

        if (main[key] === undefined) {  // 不冲突的，直接赋值
            main[key] = minor[key];
            continue;
        }

        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以main为主，忽略即可。故不需要else
        if (isJSON(minor[key])) {
            // arguments.callee 递归调用，并且与函数名解耦
            arguments.callee(main[key], minor[key]);
        }
    }
}

function isJSON(target) {
    return typeof target === "object" && target.constructor === Object;
}

console.log(arrMap);
console.log(obj);


// Converts a URL Query String into an object map
function convertQueryToMap(query) {
    console.log(query);

    // do split twice( & and =)

    // do the decode job in the very end instead
    // let decoded = decodeURIComponent(query);
    // console.log(decoded);

    let split = query.split('&');
    let arrMap = [];
    split.forEach((item) => {
        arrMap.push(item.split('='));
    });

    let obj = {};
    arrMap.forEach((item) => {
        let keyPath = item[0].split('.');

        // populate the value to the last one of key path.
        let tempObj = {};
        tempObj[keyPath[keyPath.length - 1]] = item[1];

        // concat one by one from the deepest till the top level of key path.
        let t = tempObj;
        console.log(t);
        keyPath.reduceRight((pre, cur, index) => {
            let x = {};
            x[cur] = t;
            t = x;
            console.log(t);
        });
        console.log('---------------------------------');

        // deep merge to result object
        mergeJSON(obj, t);
    });

    /**
     * 递归（深）合并
     * from http://www.jianshu.com/p/574538a62c7d
     */
    // 不返还新Object，而是main改变
    function mergeJSON(main, minor) {
        for (let key in minor) {

            if (main[key] === undefined) {  // 不冲突的，直接赋值
                main[key] = minor[key];
                continue;
            }

            // 冲突了，如果是Object，看看有么有不冲突的属性
            // 不是Object 则以main为主，忽略即可。故不需要else
            if (isJSON(minor[key])) {
                // arguments.callee 递归调用，并且与函数名解耦
                arguments.callee(main[key], minor[key]);
            }
        }
    }

    function isJSON(target) {
        return typeof target === "object" && target.constructor === Object;
    }

    // a common trick to deal with string work in object
    obj = JSON.parse(decodeURIComponent(JSON.stringify(obj)));
    console.log(obj);
    return obj;
}


