/**
 * @abstract
 */
export class Ruler {

    /**
     * @param {string} color 
     * @param {number} period 
     * @param {number} width 
     */
    constructor(color, period, width) {
        /**
         * @type {string}
         */
        this.color = color;

        /**
         * @type {number}
         */
        this.period = period;

        /**
         * @type {number}
         */
        this.width = width;
    }

    /**
     * Primes the lines that compose a ruler, but **does not** render them.
     * 
     * @param {CanvasRenderingContext2D} ctx2d
     * @param {import{'./Point.js'}.Point} globalTranslation
     * @param {number} globalScale
     * 
     * @virtual
     */
    drawLines(ctx2d, globalTranslation, globalScale) {}

}