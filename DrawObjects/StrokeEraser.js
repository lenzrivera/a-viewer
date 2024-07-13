import { Stroke } from "./Stroke.js";

/**
 * 
 */
export class StrokeEraser extends Stroke {

    /**
     * @param {import('../Point.js').Point} origin 
     * @param {import('../Point.js').Point[]} originOffsets 
     * @param {string} color 
     * @param {number} width 
     */
    constructor(origin, originOffsets, color, width) {
        super(origin, originOffsets, color, width); 
    }

    /**
     * Draws a regular Stroke on a canvas.
     * 
     * @param {HTMLCanvasElement} ctx2d
     * @param {import('../Point.js').Point} globalTranslation
     * @param {number} globalScale
     */
    // eslint-disable-next-line no-unused-vars
    draw(ctx2d, globalTranslation, globalScale) {   
        // Only erase (draw if the erase color and opacity are not transparent) over
        // the strokes currently already drawn on the canvas.
        ctx2d.globalCompositeOperation = 'destination-out';
        super.draw(ctx2d, globalTranslation, globalScale);
        ctx2d.globalCompositeOperation = 'source-over';      
    }

}