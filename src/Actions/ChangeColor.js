import { Modifier } from "./Modifier.js";

/**
 * 
 */
export class ChangeColor extends Modifier {

    /**
     * @param {string} setColor
     * @param {import('../DrawObjects/Stroke.js').Stroke[]} targetStrokes 
     */
    constructor(setColor, targetStrokes) {
        super(targetStrokes);

        /**
         * @param {string[]}
         */
        this.prevColors = targetStrokes.map(s => s.color);
        
        /**
         * @param {string}
         */ 
        this.setColor = setColor;
    }

    /** 
     * Does the action on its corresponding stroke.
     * 
     * @override
     */
    do() {
        for (const stroke of this.targets)
            stroke.color = this.setColor;
    }

    /**
     * Undoes the action on its corresponding stroke.
     * 
     * @override
     */
    undo() {
        for (const [i, stroke] of this.targets.entries())
            stroke.color = this.prevColors[i];
    }

}