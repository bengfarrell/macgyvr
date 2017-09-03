import BaseInput from './baseinput.js';

export default class GazeInput extends BaseInput {
    constructor(camera) {
        super();
        this._camera = camera;
    }

    /**
     * connect and start listening
     */
    connect() {
        super.connect();
        document.body.addEventListener('mousedown', (e) => this.onClick(e) );
    }

    /**
     * disconnect
     */
    disconnect() {
        super.disconnect();
        document.body.removeEventListener('mousedown', (e) => this.onClick(e) );
    }

    /**
     * on body click
     */
    onClick(event) {
        var e = {};
        this.dispatchEvent('button', e );
    }

    /**
     * get orientation of device
     */
    get orientation() {
        return this._camera.quaternion;
    }

    /**
     * detect against possible objects
     * @param possibleObjects
     */
    pointingAt(possibleObjects) {
        if (!possibleObjects) {
            possibleObjects = this._pointables;
        }
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( new THREE.Vector2(0, 0), this._camera );
        var collisions = raycaster.intersectObjects( possibleObjects );
        var objects = [];
        for (var c = 0; c < collisions.length; c++) {
            if (objects.indexOf(collisions[c].object) == -1) {
                objects.push(collisions[c].object);
            }
        }
        return { objects: objects, collisions: collisions };
    }
}
