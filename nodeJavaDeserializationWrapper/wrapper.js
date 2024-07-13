"use strict";

const javaDeserialization = require('java-deserialization');

/**
 * Wraps javaDeserialization.parse() to let it accept a plain javascript ArrayBuffer.
 * 
 * @param {ArrayBuffer} jsBuffer 
 * @returns {object} JSON object representation of the Java class.
 */
module.exports.parse = function parse(jsArrayBuffer) {
    const nodeBuffer = Buffer.from(jsArrayBuffer);
    return javaDeserialization.parse(nodeBuffer);
};