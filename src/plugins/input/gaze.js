export default class GazeInput {
    constructor(camera) {
        this._camera = camera;
        this.connected = false;
        this._callbacks = [];
        document.body.addEventListener('mousedown', (e) => this.onClick(e) );
    }

    /**
     * connect and start listening
     */
    start() {
        this.connected = true;
    }

    /**
     * add listener
     * @param callback
     */
    addListener(callback) {
        this._callbacks.push(callback);
    }

    /**
     * on body click
     */
    onClick(event) {
        for (var c = 0; c < this._callbacks.length; c++) {
            this._callbacks[c].apply(this);
        }
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
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( new THREE.Vector2(0, 0), this._camera );
        var collisions = raycaster.intersectObjects( possibleObjects );
        return collisions;
    }
}
