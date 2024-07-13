import { Stroke } from "./Stroke.js";

/**
 * 
 */
export class WidthStroke extends Stroke {

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
     * Draws a scale-indepndent fixed-width Stroke on a canvas.
     * 
     * @param {HTMLCanvasElement} ctx2d
     * @param {import('../Point.js').Point} globalTranslation
     * @param {number} globalScale
     */
    // eslint-disable-next-line no-unused-vars
    draw(ctx2d, globalTranslation, globalScale) {       
        if (!this.visible)
            return;
        
        ctx2d.lineCap = 'round';
        ctx2d.lineJoin = 'round';
        ctx2d.lineWidth = this.width / globalScale; 
        ctx2d.strokeStyle = this.color;

        ctx2d.beginPath();
        for (const vertex of this.vertices) {
            ctx2d.lineTo(vertex.x, vertex.y);
        }

        ctx2d.stroke();
    }

}