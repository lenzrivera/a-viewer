import { Ruler } from './Ruler.js';
import { HorizontalRuler } from './HorizontalRuler.js';
import { VerticalRuler } from './VerticalRuler.js';

/**
 * 
 */
export class CrossRuler extends Ruler {

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
    drawLines(ctx2d, globalTranslation, globalScale) {
        HorizontalRuler.drawLines(this, ctx2d, globalTranslation, globalScale);
        VerticalRuler.drawLines(this, ctx2d, globalTranslation, globalScale);
    }

}