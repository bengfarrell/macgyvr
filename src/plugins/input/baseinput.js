export default class BaseInput {
    constructor() {
        this.connected = false;
        this._callbacks = [];
        this._pointables = [];
        this._lastPointingAtList = [];
    }

    /**
     * add pointable obj
     * @param obj
     */
    addPointable(obj) {
        this._pointables.push(obj);
    }

    /**
     * rmeove pointable object
     * @param obj
     */
    removePointable(obj) {
        for (var c = 0; c < this._pointables.length; c++) {
            if (this._pointables.indexOf(obj) !== -1) {
                this._pointables.splice(c, 1);
            }
        }
    }

    /**
     * clear all pointables
     */
    clearPointables() {
        this._pointables = [];
    }

    /**
     * connect and start listening
     */
    connect() {
        this.connected = true;
        this.dispatchEvent('connected');
    }

    /**
     * disconnect
     */
    disconnect() {
        this.connected = false;
    }

    /**
     * get orientation of device
     */
    get orientation() {}

    /**
     * add listener
     * @param eventtype
     * @param callback
     */
    addListener(eventtype, callback) {
        this._callbacks.push( { type: eventtype, callback: callback } );
    }

    /**
     * dispatch event
     * @param type
     * @param params
     */
    dispatchEvent(type, params) {
        for (var c = 0; c < this._callbacks.length; c++) {
            if (type === this._callbacks[c].type) {
                this._callbacks[c].callback.apply(this, [type, params]);
            }
        }

    }

    /**
     * clear listeners
     */
    clearListeners() {
        this._callbacks = [];
    }

    /**
     * detect against possible objects
     * @param possibleObjects
     */
    pointingAt(possibleObjects) {
        return { objects: [], collisions: []};
    }

    /**
     * check if pointing at a specific mesh
     * @param mesh
     * @returns {boolean}
     */
    isPointingAt(mesh) {
        return this.pointingAt([mesh]).objects.indexOf(mesh) !== -1;
    }
}
