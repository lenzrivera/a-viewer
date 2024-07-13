import { Point } from '../Point.js';

/**
 * 
 */
export class PaperData {

    /**
     * @param {string} bgColor 
     * @param {import('../DrawObjects/Stroke.js').Stroke[]} strokes 
     * @param {import('../Actions/Action.js').Action[]} history 
     * @param {import('../Rulers/Ruler.js').Ruler} ruler 
     */
    constructor(bgColor, strokes, history, ruler) {
        /**
         * @type {string}
         */
        this.bgColor = bgColor;

        /**
         * @type {import('../Actions/Action.js').Action[]}
         */
        this.history = history;
    
        /**
         * @type {import('../DrawObjects/Stroke.js').Stroke[]}
         */
        this.strokes = strokes;
    
        /**
         * @type {import('../Rulers/Ruler.js').Ruler}
         */
        this.ruler = ruler;
    
        /**
         * @type {Point}
         */
        this.viewCenter = new Point(0, 0);
    
        /**
         * @type {number}
         */
        this.viewScale = 1;
    }

}