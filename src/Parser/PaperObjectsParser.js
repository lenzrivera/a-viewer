import { InkStroke } from '../DrawObjects/InkStroke.js';
import { Stroke } from '../DrawObjects/Stroke.js';
import { StrokeEraser } from '../DrawObjects/StrokeEraser.js';
import { WidthStroke } from '../DrawObjects/WidthStroke.js';

import { ChangeColor } from '../Actions/ChangeColor.js';
import { Draw } from '../Actions/Draw.js';
import { StrongErase } from '../Actions/StrongErase.js';
import { StrokeErase } from '../Actions/StrokeErase.js';
import { Translate } from '../Actions/Translate.js';

import { Point } from '../Point.js';
import { signedIntToRGBAString } from './util.js';

/**
 * 
 */
export class PaperObjectsParser {

    /**
     * @param {object} jsonPaperData
     */
    constructor(jsonPaperData) {
        /**
         * @type {import('../Actions/Action.js').Action[]}
         */
        this.actions = [];

        /**
         * @type {import('../DrawObjects/DrawObject.js').DrawObject[]}
         */
        this.strokes = [];

        /**
         * A map of *raw* strokes with modifiers (e.g., translation, color change) 
         * applied on them to their corresponding native Stroke objects. 
         * 
         * @type {Map<object, Stroke>}
         */
        this.strokeMap = new Map();


        this.parsePaperObjects(jsonPaperData.drawn_objs.list);
    }


    // General Add //

    /**
     * For general actions, e.g. Draw, StrongErase.
     * 
     * @param {import('../Actions/Action.js').Action} action 
     */
    addAction(action) {
        // Already invoke the action on its corresponding stroke.
        action.do();
        this.actions.push(action);
    }

    /**
     * For all Strokes, e.g. InkStroke, StrokeEraser.
     * 
     * @param {object} rawDrawObject
     * @param {import('../DrawObjects/DrawObject.js').DrawObject} drawObject
     * @param {import('../Actions/Action.js').Action} correspondingAction
     */
    addStroke(rawDrawObject, drawObject, correspondingAction) {
        // A stroke comes with a corresponding Draw or StrokeErase action.
        this.addAction(correspondingAction);
        this.strokes.push(drawObject);

        // Let the modifiers further down in the PaperObject list know the 
        // corresponding native Stroke objects of the strokes they modify.
        if (rawDrawObject.modified_history)
            this.strokeMap.set(rawDrawObject, drawObject);
    }

    /**
     * For anything in the .apaper file: basically modifiers (Actions) and DrawObjects.
     * 
     * @param {object} rawPaperObject 
     */
    addPaperObject(rawPaperObject) {
        const color = signedIntToRGBAString(rawPaperObject.color);
        const origin = new Point(rawPaperObject.origin.X, rawPaperObject.origin.Y);
        const vertices = rawPaperObject.vertexes.list.map(v => new Point(v.X, v.Y));
        const width = rawPaperObject.width;

        switch (rawPaperObject.class.name) {

            case 'jp.gr.java_conf.pepperretas.apaper.InkStroke':
                this.addDrawStroke(rawPaperObject, 
                    new InkStroke(origin, vertices, color, width, rawPaperObject.envelope.list));
                break;

            case 'jp.gr.java_conf.pepperretas.apaper.Stroke':
                this.addDrawStroke(rawPaperObject, new Stroke(origin, vertices, color, width));
                break;

            case 'jp.gr.java_conf.pepperretas.apaper.WidthStroke':
                this.addDrawStroke(rawPaperObject, new WidthStroke(origin, vertices, color, width));
                break;
                

            case 'jp.gr.java_conf.pepperretas.apaper.StrongEraser':
                this.addStrongEraser(rawPaperObject);
                break;

            case 'jp.gr.java_conf.pepperretas.apaper.StrokeEraser': 
                this.addStrokeEraser(rawPaperObject, new StrokeEraser(origin, vertices, color, width));
                break;


            case 'jp.gr.java_conf.pepperretas.apaper.DrawObjectPack': 
                this.parseDrawObjectPack(rawPaperObject);
                break;

        }
    }

    /**
     * @param {object[]} rawModifiedStrokes 
     */
    getModifiedStrokes(rawModifiedStrokes) {
        return rawModifiedStrokes.map(rawStroke => this.strokeMap.get(rawStroke));
    }


    // Specialized Add //

    /**
     * @param {object} rawColorChanger
     */
    addColorChanger(rawColorChanger) {
        const coloredStrokes = this.getModifiedStrokes(rawColorChanger.modified_objs.list);
        this.addAction(new ChangeColor(signedIntToRGBAString(rawColorChanger.color), coloredStrokes));
    }

    /**
     * @param {object} rawStroke
     * @param {Stroke} stroke
     */
    addDrawStroke(rawStroke, stroke) {
        this.addStroke(rawStroke, stroke, new Draw(stroke));
    }

    /**
     * @param {object} rawStrongEraser
     */
    addStrongEraser(rawStrongEraser) {
        const erasedStrokes = this.getModifiedStrokes(rawStrongEraser.erased_objs.list);
        this.addAction(new StrongErase(erasedStrokes));
    }

    /**
     * @param {object} rawStrokeEraser
     * @param {StrokeEraser} strokeEraser
     */
    addStrokeEraser(rawStrokeEraser, strokeEraser) {
        const eraseAction = new StrokeErase(strokeEraser);    
        this.addStroke(rawStrokeEraser, strokeEraser, eraseAction);
    }

    /**
     * @param {object} rawTranslator
     */
    addTranslator(rawTranslator) {
        const translatedStrokes = this.getModifiedStrokes(rawTranslator.modified_objs.list);
        this.addAction(new Translate(new Point(rawTranslator.offset.X, rawTranslator.offset.Y), translatedStrokes));
    }


    // Parsing //

    /**
     * @param {object} rawDrawObjectPack 
     */
    parseDrawObjectPack(rawDrawObjectPack) {
        // The members should be in chronological order, so don't
        // worry about any sort of modifier order shenanigans.
        for (const rawPaperObj of rawDrawObjectPack.members.list) {
            if (rawPaperObj.class.name === 'jp.gr.java_conf.pepperretas.apaper.Translator') {
                this.addTranslator(rawPaperObj);
            } else if (rawPaperObj.class.name === 'jp.gr.java_conf.pepperretas.apaper.ColorChanger') {
                this.addColorChanger(rawPaperObj);
            } else {
                // A duplication was done; any translations and other modifiers will be handled
                // via the above if-else cases since those modifiers are packaged in one DrawObjectPack.
                this.addPaperObject(rawPaperObj);
            }
        }
    }

    /**
     * @param {object} rawPaperObjects
     */
    parsePaperObjects(rawPaperObjects) {
        // Skip the first PaperObject because it (probably) only represents 
        // the view quad and is always present by default.
        for (let i = 1; i < rawPaperObjects.length; i++) {
            const rawPaperObject = rawPaperObjects[i];
            this.addPaperObject(rawPaperObject);
        }
    }

}