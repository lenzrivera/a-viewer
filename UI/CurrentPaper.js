import { PaperData } from './PaperData.js';
import { Navigation } from './Navigation.js';
import { Renderer } from './Renderer.js';

import { HorizontalRuler } from '../Rulers/HorizontalRuler.js';

/**
 * 
 */
export const CurrentPaper = {

    /**
     * @type {PaperData}
     */
    data: null,

    /**
     * @param {PaperData} data
     */
    set(data) {
        this.data = data;
        Navigation.target = this.data;
        Renderer.target = this.data;

        Renderer.setBackgroundColor(this.data.bgColor);
        Renderer.renderPaper();
    }

};

CurrentPaper.set(
    new PaperData('rgba(255, 255, 244, 1)', 
    [], 
    [], 
    new HorizontalRuler('rgba(210, 210, 210, 1)', 300, 2)));