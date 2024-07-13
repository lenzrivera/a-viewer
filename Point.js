/**
 * 
 */
 export class Point {

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        /**
         * @param {number} x
         */
        this.x = x;

        /**
         * @param {number} y
         */
        this.y = y;
    }


    // Arithmetic //

    /**
     * @param {Point} point 
     * @returns {Point}
     */
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

    /**
     * @param {Point} point 
     * @returns {Point}
     */
    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    /**
     * @param {Point} point 
     * @returns {Point}
     */
    multiply(point) {
        return new Point(this.x * point.x, this.y * point.y);
    }

    /**
     * @param {Point} point 
     * @returns {Point}
     */
    subtract(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }


    // Vector //

    /**
     * @param {Point} point 
     * @returns {number}
     */
    dot(point) {
        return this.x * point.x + this.y * point.y;
    }

}