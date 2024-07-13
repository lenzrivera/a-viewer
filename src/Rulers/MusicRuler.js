import { Ruler } from './Ruler.js';

/**
 * @todo
 */
export class MusicRuler extends Ruler {

    /**
     * @param {string} color 
     * @param {number} period 
     * @param {number} width 
     */
    constructor(color, period, width) {
        super(color, period, width);
    }

    /**
     * Primes the lines that compose a ruler, but **does not** render them.
     * 
     * @param {CanvasRenderingContext2D} ctx2d
     * @param {import{'./Point.js'}.Point} globalTranslation
     * @param {number} globalScale
     * 
     * @override
     */
    drawLines(ctx2d, globalTranslation, globalScale) {}

}