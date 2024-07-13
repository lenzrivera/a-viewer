import { Stroke } from "./Stroke.js";

import { Point } from "../Point.js";

/**
 * 
 */
export class InkStroke extends Stroke {

    /**
     * @param {import('../Point.js').Point} origin 
     * @param {import('../Point.js').Point[]} originOffsets 
     * @param {string} color 
     * @param {number} width 
     */
    constructor(origin, originOffsets, color, width, envelope) {
        super(origin, originOffsets, color, width); 

        /**
         * @type {Point[]}
         */
        this.envelope = envelope.map(p => new Point(p.X + this.origin.x, p.Y + this.origin.y));
    }

    /**
     * Draws an InkStroke on a canvas.
     * 
     * @param {HTMLCanvasElement} ctx2d
     * @param {import('../Point.js').Point} globalTranslation
     * @param {number} globalScale
     */
    // eslint-disable-next-line no-unused-vars
    draw(ctx2d, globalTranslation, globalScale) {   
        if (!this.visible)
            return;
        
        ctx2d.save();

        // Draw the outline of the stroke (via its envelope).
        ctx2d.lineWidth = 1;
        
        ctx2d.beginPath();
        for (const vertex of this.envelope) {
            ctx2d.lineTo(vertex.x, vertex.y);
        }

        // Restrict the drawing of the ink stroke to only the area defined by its evelope.
        // That is, only fill up the area within the previously drawn stroke outline.  
        ctx2d.clip();

        ctx2d.lineCap = 'round';
        ctx2d.lineJoin = 'round';
        ctx2d.lineWidth = this.width; 
        ctx2d.strokeStyle = this.color;

        for (const vertex of this.vertices) {
            ctx2d.lineTo(vertex.x, vertex.y);
        }

        ctx2d.stroke();
        ctx2d.restore();
    }

}