import { Action } from "./Action.js";

/**
 * Action but for multiple targets
 */
export class Modifier extends Action {

    /**
     * @param {import('../DrawObjects/Stroke.js').Stroke[]} targetStrokes
     */
    constructor(targetStrokes) {
        super();
        
        /**
         * @type {import('../DrawObjects/Stroke.js').Stroke[]}
         */
        this.targets = targetStrokes;
    }

}