let Alphabet = {
    BINARY: '01',
    OCTAL: '01234567',
    DECIMAL: '0123456789',
    HEXA_DECIMAL: '0123456789abcdef',
    ALPHA_LOWER: 'abcdefghijklmnopqrstuvwxyz',
    ALPHA_UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

/*
 * 如果单纯是基本的数值的进制转换，可以只用內建的API实现（不超过36进制）：
 *  dec2bin = dec => parseInt(dec, 10).toString(2),
 *  dec2oct = dec => parseInt(dec, 10).toString(8),
 *  dec2hex = dec => parseInt(dec, 10).toString(16),
 *  bin2dec = bin => parseInt(bin, 2),
 *  oct2dec = oct => parseInt(oct, 8),
 *  hex2dec = hex => parseInt(hex, 16),
 */

/**
 * Generate converter from other bases to Decimal.
 * @param srcAlphabet
 * @returns {Function}
 */
function getRadix2DecConverter(srcAlphabet) {
    return function (input) {
        input = input.split('');
        let result = 0,
            exponent = 0;
        while (input.length) {
            // let n = input.pop();
            // console.log(n);
            // console.log(srcAlphabet.indexOf(n));

            result += srcAlphabet.indexOf(input.pop()) * Math.pow(srcAlphabet.length, exponent++);
        }
        return result;
    }
}

/**
 * Generate converter from Decimal to other bases.
 * @param destAlphabet
 * @returns {Function}
 */
function getDec2RadixConverter(destAlphabet) {
    return function (dec) {
        dec = parseInt(dec, 10);
        let radix = destAlphabet.length,
            result = [],
            mod = 0;
        while (dec >= radix) {
            // console.log('-------');
            mod = dec % radix;
            dec = parseInt(dec / radix);
            result.unshift(destAlphabet[mod]);
        }
        result.unshift(destAlphabet[dec >> 0]);
        return result.join('');
    }
}

let bin2dec = getRadix2DecConverter(Alphabet.BINARY),
    oct2dec = getRadix2DecConverter(Alphabet.OCTAL),
    hex2dec = getRadix2DecConverter(Alphabet.HEXA_DECIMAL),
    alphaL2dec = getRadix2DecConverter(Alphabet.ALPHA_LOWER),
    alphaU2dec = getRadix2DecConverter(Alphabet.ALPHA_UPPER),
    alpha2dec = getRadix2DecConverter(Alphabet.ALPHA),
    alphaN2dec = getRadix2DecConverter(Alphabet.ALPHA_NUMERIC);

let dec2bin = getDec2RadixConverter(Alphabet.BINARY),
    dec2oct = getDec2RadixConverter(Alphabet.OCTAL),
    dec2hex = getDec2RadixConverter(Alphabet.HEXA_DECIMAL),
    dec2alphaL = getDec2RadixConverter(Alphabet.ALPHA_LOWER),
    dec2alphaU = getDec2RadixConverter(Alphabet.ALPHA_UPPER),
    dec2alpha = getDec2RadixConverter(Alphabet.ALPHA),
    dec2alphaN = getDec2RadixConverter(Alphabet.ALPHA_NUMERIC);


console.log(dec2hex(16));    // 10
console.log(dec2alphaL(27)); // bb
console.log(bin2dec('1010')); // 10
console.log(alphaL2dec('bb'));  // 27

console.log('------------');
console.log(alphaU2dec('SAME'));   // 316684
console.log(dec2alphaU('316684')); // SAME

console.log('------------');
console.log(alphaL2dec('hello')); // 3276872
console.log(dec2hex('3276872'));  // 320048

console.log('------------');
console.log(alpha2dec('CodeWars')); // 29063972814726
console.log(dec2oct('29063972814726')); // 646737361477606