import { Renderer } from './Renderer.js';

import { Point } from '../Point.js';

/**
 * @type {number}
 */
const MINIMUM_SCALE = 0.05;

/**
* @type {number}
*/
const MAXIMUM_SCALE = 4;

/**
 * @type {number}
 */
const PAN_FACTOR = 37;

/**
 * @type {number}
 */
const ZOOM_SPEED = 0.95;

/**
 * 
 */
export const Navigation = {

    /**
     * @type {number}
     */
    loopId: null,

    /**
     * @type {Map}
     */
    pressedKeys: new Map(),
 
    /**
     * @type {DOMHighResTimeStamp}
     */
    previousTime: 0,

    /**
     * @type {import('./PaperData').PaperData}
     */
    target: null,


    // Input //

    /**
     * @param {DOMHighResTimeStamp} currentTime 
     */
    inputCheckerLoop(currentTime) {
        const dt = currentTime - this.previousTime;
        this.previousTime = currentTime;

        // Panning //
        // Note that +y indicates going down and -y indicates going up in the original app;
        // this is followed here as well.

        const interpPanSpeed = PAN_FACTOR * Math.pow(this.target.viewScale , -0.5);

        if (this.pressedKeys.get('KeyW'))
            this.panPaper(0, interpPanSpeed);

        if (this.pressedKeys.get('KeyS'))
            this.panPaper(0, -interpPanSpeed);

        if (this.pressedKeys.get('KeyA'))
            this.panPaper(interpPanSpeed, 0);

        if (this.pressedKeys.get('KeyD'))
            this.panPaper(-interpPanSpeed, 0);

        // Zooming //

        const interpZoomSpeed = ZOOM_SPEED;

        if (this.pressedKeys.get('KeyQ'))
            this.setPaperScale(this.target.viewScale * interpZoomSpeed);
        
        if (this.pressedKeys.get('KeyE'))
            this.setPaperScale(this.target.viewScale / interpZoomSpeed);

        this.loopId = requestAnimationFrame(this.inputCheckerLoop.bind(this));
    },

    startInputCheckerLoop() {
        this.currentTime = performance.now();
        this.loopId = requestAnimationFrame(this.inputCheckerLoop.bind(this));
    },

    stopInputCheckerLoop() {
        cancelAnimationFrame(this.loopid);
        this.loopId = null;
    }, 


    // Movement //

    /**
     * Pans the current paper.
     * 
     * @param {number} dX 
     * @param {number} dY 
     */
    panPaper(dX, dY) {
        this.target.viewCenter = this.target.viewCenter.add(new Point(dX, dY));
        Renderer.renderPaper();
    },

    /**
     * Sets the scale of the current paper.
     * 
     * @param {number} scale 
     */
    setPaperScale(scale) {
        // Clamp CurrentPaper.viewScale between MINIMUM_SCALE and MAXIMUM_SCALE, inclusive.
        this.target.viewScale = Math.min(Math.max(scale, MINIMUM_SCALE), MAXIMUM_SCALE);
        Renderer.renderPaper();
    }

};


// Keypress Listeners //

document.addEventListener('keydown', (e) => {
    Navigation.pressedKeys.set(e.code, true);
});

document.addEventListener('keyup', (e) => {
    Navigation.pressedKeys.set(e.code, false);
});

Navigation.startInputCheckerLoop();