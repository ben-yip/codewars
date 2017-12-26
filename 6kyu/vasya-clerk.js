/**
 * https://www.codewars.com/kata/555615a77ebc7c2c8a0000b8
 *
 */

function tickets(peopleInLine) {
    let d25 = 0, d50 = 0; // 100 can NOT be return as a change, so no need to record
    let enoughChange = true;

    for (let i = 0, len = peopleInLine.length; i < len; i++) {
        let bill = peopleInLine[i];
        switch (bill) {
            case 25:
                d25++;
                break;
            case 50:
                d50++;
                if (--d25 < 0) {
                    enoughChange = false;
                }
                break;
            case 100:
                if (d50 > 0) {
                    d50--;
                    if (d25 > 0) {
                        d25--;
                    } else {
                        enoughChange = false;
                    }
                } else {
                    d25 -= 3;
                    if (d25 < 0) {
                        enoughChange = false;
                    }
                }
        }
        // console.log(bill);
        // console.log(d25 + ' -- ' + d50);

        if (!enoughChange) break; // return ASAP
    }

    return enoughChange ? 'YES' : 'NO';
}
