/**
 * applied on Strokes
 */
export class Action {

    constructor() {}

    /** 
     * Does the action on its corresponding stroke.
     * 
     * @abstract
     */
    do() {}

    /**
     * Undoes the action on its corresponding stroke.
     * 
     * @abstract
     */
    undo() {}

}