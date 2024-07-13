// General utility functions for the parser stuffs

/**
 * @param {number} signedInt 
 * @returns {string}
 */
export function signedIntToRGBAString(signedInt) {
    // Credit:
    // https://stackoverflow.com/questions/11866781/how-do-i-convert-an-integer-to-a-javascript-color/11866980

    signedInt >>>= 0;
    var b = signedInt & 0xFF,
        g = (signedInt & 0xFF00) >>> 8,
        r = (signedInt & 0xFF0000) >>> 16,
        a = ( (signedInt & 0xFF000000) >>> 24 ) / 255;

    return "rgba(" + [r, g, b, a].join(",") + ")";
}