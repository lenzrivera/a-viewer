import { DrawObject } from "./DrawObject.js";

/**
 * actual stroke on paper
 */
export class Stroke extends DrawObject {

    /**
     * @param {import('../Point.js').Point} origin 
     * @param {import('../Point.js').Point[]} originOffsets 
     * @param {string} color 
     * @param {number} width 
     */
    constructor(origin, originOffsets, color, width) {
        super(origin, originOffsets); 

        /**
         * @type {string}
         */
        this.color = color;

        /**
         * @type {boolean}
         */
        this.visible = true;

        /**
         * @type {number}
         */
        this.width = width;
    }

    /**
     * Draws a regular Stroke on a canvas.
     * 
     * @param {HTMLCanvasElement} ctx2d
     * @param {import('../Point.js').Point} globalTranslation
     * @param {number} globalScale
     * 
     * @override
     */
    // eslint-disable-next-line no-unused-vars
    draw(ctx2d, globalTranslation, globalScale) {  
        if (!this.visible)
            return;
        
        ctx2d.lineCap = 'round';
        ctx2d.lineJoin = 'round';
        ctx2d.lineWidth = this.width; 
        ctx2d.strokeStyle = this.color;

        ctx2d.beginPath();
        for (const vertex of this.vertices){
            ctx2d.lineTo(vertex.x, vertex.y);
        }

        ctx2d.stroke();
    }

    /**
     * @param {import('../Point.js').Point} offset 
     */
    translate(offset) {
        this.origin = this.origin.add(offset);
        this.vertices = this.originOffsets.map(o => o.add(this.origin));
    }

}