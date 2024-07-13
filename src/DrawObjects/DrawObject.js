/**
 * a set of vertices on a paper
 */
export class DrawObject {

    /**
     * 
     * @param {import('../Point.js').Point} origin 
     * @param {import('../Point.js').Point[]} originOffsets 
     */
    constructor(origin, originOffsets) {
        /**
         * The point in *world space* from which the vertices of a DrawObject are based on.
         * 
         * @type {import('../Point.js').Point}
         */
        this.origin = origin;

        /**
         * The offsets from the origin that define the vertices of a DrawObject in *world space*.
         * 
         * @type {import('./Point.js.js').Point[]}
         */
        this.originOffsets = originOffsets;

        /**
         * The vertices of a DrawObject in *world space*.
         * 
         * @type {import('./Point.js.js').Point[]}
         */
        this.vertices = originOffsets.map(o => o.add(this.origin));
    }
    
    /**
     * Draws a DrawObject on a canvas.
     * 
     * @param {HTMLCanvasElement} ctx2d
     * @param {import('../Point.js').Point} globalTranslation
     * @param {number} globalScale
     * 
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    draw(ctx2d, globalTranslation, globalScale) {}

}