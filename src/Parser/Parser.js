import { PaperData } from '../UI/PaperData.js';

import { CrossRuler } from '../Rulers/CrossRuler.js';
import { HorizontalRuler } from '../Rulers/HorizontalRuler.js';
import { MusicRuler } from '../Rulers/MusicRuler.js';
import { NoneRuler } from '../Rulers/NoneRuler.js';
import { VerticalRuler } from '../Rulers/VerticalRuler.js';

import { PaperObjectsParser } from "./PaperObjectsParser.js";

import { signedIntToRGBAString } from './util.js';

/**
 * Handles parsing of raw .apaper files, and essentially provides 
 * the data classes required to  view/render an .apaper file.
 */
export const Parser = {

    // Parsing //

    /**
     * @param {ArrayBuffer} rawPaperData
     */
    parseRawPaperData(rawPaperData) {
        // Via nodeJavaDeserialization; ported using browserify.
        // eslint-disable-next-line no-undef
        const jsonData = javaDeserialization.parse(rawPaperData)[0];
        console.log(jsonData); console.log(jsonData.drawn_objs.list);

        const bgColor = signedIntToRGBAString(jsonData.background_color);
        const paperObjects = new PaperObjectsParser(jsonData);
        const ruler = this.determineRuler(jsonData);

        return new PaperData(bgColor, paperObjects.strokes, paperObjects.actions, ruler);
    },


    // Utility //

    /**
     * @param {object} jsonData 
     * @returns {import('./Rulers/Ruler.js').Ruler}
     */
    determineRuler(jsonData) {
        const rulerColor = signedIntToRGBAString(jsonData.background_rule_color);
        const rulerPeriod = jsonData.background_rule_period;
        const rulerWidth = jsonData.background_rule_width;

        switch (jsonData.background_rule_mode.concat('')) {
            case 'NONE':
                return new NoneRuler(rulerColor, rulerPeriod, rulerWidth);

            case 'VERTICAL':
                return new VerticalRuler(rulerColor, rulerPeriod, rulerWidth);

            case 'CROSS':
                return new CrossRuler(rulerColor, rulerPeriod, rulerWidth);

            case 'MUSIC':
                return new MusicRuler(rulerColor, rulerPeriod, rulerWidth);

            case 'HORIZON':
                return new HorizontalRuler(rulerColor, rulerPeriod, rulerWidth);
        }
    }

};