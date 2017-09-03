import BaseInput from './baseinput.js';
import GazeInput from './gaze.js';
import DaydreamInput from './daydream.js';

export default class ResponsiveInput extends BaseInput {
    constructor(camera) {
        super();
        this.connected = false;
        this._gaze = new GazeInput(camera);
        this._daydream = new DaydreamInput(camera);
        this._activeInput = this._gaze;

        this._gaze.addListener('button', (eventtype, event) => this.onGazeInputClick(eventtype, event));
        this._gaze.addListener('pointingat', (eventtype, event) => this.onPointingAt(eventtype, event));
        this._gaze.connect();

        // connecting to daydream just puts a button in the scene because Bluetooth must be initiated by a user
        this._daydream.connect();
        this._daydream.addListener('connected', () => this.onDayDreamConnected());
        this._daydream.addListener('button', () => this.onDayDreamButtonClick());
    }

    /**
     * on render
     */
    onRender() {
        this._activeInput.onRender();
    }

    /**
     * add pointable obj
     * @param obj
     */
    addPointable(obj) {
        this._gaze.addPointable(obj);
        this._daydream.addPointable(obj);
    }

    /**
     * rmeove pointable object
     * @param obj
     */
    removePointable(obj) {
        this._gaze.removePointable(obj);
        this._daydream.removePointable(obj);
    }

    /**
     * clear all pointables
     */
    clearPointables() {
        this._gaze.clearPointables();
        this._daydream.clearPointables();
    }

    /**
     * connect and start listening
     */
    connect() {
        this.connected = true;
        this.dispatchEvent('connected');
    }

    /**
     * on gaze input click
     */
    onGazeInputClick(eventtype, event) {
        event.changed = [{ gazeclick: 'click'}];
        event.state = { orientation: this._gaze.orientation };
        this.dispatchEvent('button', event);
    }

    /**
     * on daydream bluetooth connected
     */
    onDayDreamConnected() {
        this._activeInput = this._daydream;
    }

    /**
     * on daydream button click
     */
    onDayDreamButtonClick() {
        this.dispatchEvent('button', event);
    }

    /**
     * get orientation of device
     */
    get orientation() {
        return this._activeInput.orientation;
    }

    /**
     * add listener
     * @param eventtype
     * @param callback
     */
    addListener(eventtype, callback) {
        this._callbacks.push( { type: eventtype, callback: callback } );
    }

    /**
     * detect against possible objects
     * @param possibleObjects
     */
    pointingAt(possibleObjects) {
        return this._activeInput.pointingAt(possibleObjects);
    }

    /**
     * check if pointing at a specific mesh
     * @param mesh
     * @returns {boolean}
     */
    isPointingAt(mesh) {
        return this._activeInput.isPointingAt(mesh);
    }
}
