import { Draw } from "./Draw.js";

/**
 * 
 */
export class StrokeErase extends Draw {

    /**
     * @param {import('../DrawObjects/Stroke.js').Stroke} targetStroke 
     */
    constructor(targetStroke) {
        super(targetStroke);
    }

}