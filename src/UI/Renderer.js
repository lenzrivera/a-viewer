/**
 * 
 */
export const Renderer = {

    /**
     * @type {HTMLCanvasElement}
     */
    canvas: document.querySelector('#canvas'),

    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx2d: document.querySelector('#canvas').getContext('2d'),

    /**
     * @type {import('./PaperData').PaperData}
     */
    target: null,


    // //

    /**
     * 
     */
    clearCanvas() {
        // Reset origin to the default topmost-left.
        this.ctx2d.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx2d.clearRect(0, 0, this.ctx2d.canvas.width, this.ctx2d.canvas.height);
    },

    /**
     * Renders the content of the CurrentPaper.
     */
    renderPaper() {
        this.clearCanvas();
        this.renderStrokes();
        this.renderRuler();
    },


    // //

    /**
     * @param {CanvasRenderingContext2D} ctx2d
     */
    renderRuler() {
        this.ctx2d.globalCompositeOperation = 'destination-over';

        this.ctx2d.beginPath();
        this.target.ruler.drawLines(this.ctx2d, this.target.viewCenter, this.target.viewScale);
        this.ctx2d.stroke();

        this.ctx2d.globalCompositeOperation = 'source-over';
    },

    /**
     * @param {CanvasRenderingContext2D} ctx2d
     */
    renderStrokes() {      
        this.ctx2d.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx2d.translate(this.ctx2d.canvas.width * 0.5, this.ctx2d.canvas.height * 0.5);
        this.ctx2d.scale(this.target.viewScale, this.target.viewScale);
        this.ctx2d.translate(this.target.viewCenter.x, this.target.viewCenter.y);

        for (const stroke of this.target.strokes) {
            stroke.draw(this.ctx2d, this.target.viewCenter, this.target.viewScale);
        }
    },

    /**
     * @param {string} color
     */
    setBackgroundColor(color) {
        this.canvas.style.background = color;
    }

};