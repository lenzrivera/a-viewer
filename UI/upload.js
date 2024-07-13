/**
 * Handles a user uploading an .apaper file to the site.
 */

import { CurrentPaper } from './CurrentPaper.js';
import { Parser } from '../Parser/Parser.js';

/**
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector('#fileInput');

/**
 * @type {FileReader}
 */
const reader = new FileReader();

// Handle user upload of paper data file
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    reader.readAsArrayBuffer(file);
});

// Read and process user upload of paper data file
reader.addEventListener('load', () => {
    const rawPaperData = reader.result;
    CurrentPaper.set(Parser.parseRawPaperData(rawPaperData));

    console.log(CurrentPaper);
});