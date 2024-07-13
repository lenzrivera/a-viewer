import { Modifier } from "./Modifier.js";

/**
 * 
 */
export class Translate extends Modifier {

    /**
     * @param {import('../Point.js').Point} offset
     * @param {import('../DrawObjects/Stroke.js').Stroke[]} targetStrokes 
     */
    constructor(offset, targetStrokes) {
        super(targetStrokes);

        /**
         * @type {import('../Point.js').Point} 
         */
        this.offset = offset;
    }

    /** 
     * Does the action on its corresponding stroke.
     * 
     * @override
     */
    do() {
        for (const stroke of this.targets)
            stroke.translate(this.offset);
    }

    /**
     * Undoes the action on its corresponding stroke.
     * 
     * @override
     */
    undo() {
        for (const stroke of this.targets)
            stroke.translate(this.offset.multiply(-1));
    }

}