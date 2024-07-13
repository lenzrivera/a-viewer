import { Ruler } from './Ruler.js';

/**
 * 
 */
export class VerticalRuler extends Ruler {

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
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} ctx2d
     * @param {import{'./Point.js'}.Point} globalTranslation
     * @param {number} globalScale
     * 
     * @override
     */
    drawLines(canvas, ctx2d, globalTranslation, globalScale) {
        VerticalRuler.drawLines(this, canvas, ctx2d, globalTranslation, globalScale);
    }

    /**
     * Primes the lines that compose a ruler, but **does not** render them.
     * 
     * Made a static method for other Ruler classes to reuse this method simultaneously
     * with the drawLines() of other Ruler classes. 
     * 
     * @param {Ruler} ruler
     * @param {CanvasRenderingContext2D} ctx2d
     * @param {import{'./Point.js'}.Point} globalTranslation
     * @param {number} globalScale
     */
    static drawLines(ruler, ctx2d, globalTranslation, globalScale) {
        const scaledOffset = globalTranslation.x % ruler.period * globalScale; 
        const scaledPeriod = ruler.period * globalScale;

        const halfPeriod = scaledPeriod * 0.5;
        const halfNoOfRulersToRender = Math.floor(ctx2d.canvas.width / scaledPeriod) * 0.5 + 1;

        ctx2d.setTransform(1, 0, 0, 1, 0, 0);
        ctx2d.translate(ctx2d.canvas.width * 0.5 + scaledOffset, 0);

        ctx2d.lineWidth = ruler.width; 
        ctx2d.strokeStyle = ruler.color;

        for (let i = 0; i < halfNoOfRulersToRender; i++) {
            // Floor to avoid anti-aliasing and thus speed up rendering
            const rulerXCoord = Math.floor(halfPeriod * (2 * i + 1));

            ctx2d.moveTo(rulerXCoord, 0);
            ctx2d.lineTo(rulerXCoord, ctx2d.canvas.width);

            ctx2d.moveTo(-rulerXCoord, 0);
            ctx2d.lineTo(-rulerXCoord, ctx2d.canvas.width);
        }
    }

}