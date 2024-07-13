import { Modifier } from "./Modifier.js";

/**
 * 
 */
export class StrongErase extends Modifier {

    /**
     * @param {import('../DrawObjects/Stroke.js').Stroke[]} targetStrokes 
     */
    constructor(targetStrokes) {
        super(targetStrokes);
    }

    /** 
     * Does the action on its corresponding stroke.
     * 
     * @override
     */
    do() {
        for (const stroke of this.targets)
            stroke.visible = false;
    }

    /**
     * Undoes the action on its corresponding stroke.
     * 
     * @override
     */
    undo() {
        for (const stroke of this.targets)
            stroke.visible = true;
    }

}