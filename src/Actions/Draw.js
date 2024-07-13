import { Action } from "./Action.js";

/**
 * 
 */
export class Draw extends Action {

    /**
     * @param {import('../DrawObjects/Stroke.js').Stroke} targetStroke 
     */
    constructor(targetStroke) {
        super();
        
        /**
         * @type {import('../DrawObjects/Stroke.js').Stroke}
         */
        this.target = targetStroke;
    }

    /** 
     * Does the action on its corresponding stroke.
     * 
     * @override
     */
    do() {
        this.target.visible = true;
    }

    /**
     * Undoes the action on its corresponding stroke.
     * 
     * @override
     */
    undo() {
        this.target.visible = false;
    }

}