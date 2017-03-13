export default class Daydream {
    constructor() {
        this.connected = false;
        this._callbacks = [];
        this._controller = new DaydreamController();
        this._controller.onStateChange((state) => this.onControllerUpdate(state));
        this._sensorfusion = new MadgwickAHRS();
        this._sensorfusion.setQuaternion( [ 0.7071067811865475, 0, 0, 0.7071067811865475 ] ); // Hack-ish: Rotate internal quaternion
        this._buttons = {
            app: false,
            home: false,
            click: false,
            volumePlus: false,
            volumeMinus: false,
            xTouch: 0,
            yTouch: 0
        };
    }

    /**
     * connect and start listening
     */
    start() {
        this._controller.connect();
        this.connected = true;
    }

    /**
     * on controller update
     * @param state
     */
    onControllerUpdate(state) {
        this._sensorfusion.update(
            state.xGyro, state.yGyro, state.zGyro,
            state.xAcc, state.yAcc, state.zAcc,
            state.xOri, state.yOri, state.zOri
        );

        var changed = [];
        if (state.isClickDown !== this._buttons.click) {
            this._buttons.click = state.isClickDown;
            changed.push( { 'click': state.isClickDown });
        }

        if (state.isAppDown !== this._buttons.app) {
            this._buttons.app = state.isAppDown;
            changed.push( { 'app': state.isAppDown });
        }

        if (state.isHomeDown !== this._buttons.home) {
            this._buttons.home = state.isHomeDown;
            changed.push( { 'home': state.isHomeDown });
        }

        if (state.isVolMinusDown !== this._buttons.volumeMinus) {
            this._buttons.volumeMinus = state.isVolMinusDown;
            changed.push( { 'volumeMinus': state.isVolMinusDown });
        }

        if (state.isVolPlusDown !== this._buttons.volumePlus) {
            this._buttons.volumePlus = state.isVolPlusDown;
            changed.push( { 'volumePlus': state.isVolPlusDown });
        }

        if (state.xTouch !== this._buttons.xTouch && state.yTouch !== this._buttons.yTouch) {
            changed.push( { 'touch': { x: state.xTouch, y: state.yTouch } });
        }

        if (changed.length > 0) {
            for (var c = 0; c < this._callbacks.length; c++) {
                this._callbacks[c].apply(this, [changed, state]);
            }
        }
    }

    /**
     * get orientation of device
     */
    get orientation() {
        var q = new THREE.Quaternion();
        var sf = this._sensorfusion.getQuaternion();
        sf.y -= Math.PI/2;
        q = q.fromArray(sf);
        return q;
    }

    /**
     * add listener
     * @param callback
     */
    addListener(callback) {
        this._callbacks.push(callback);
    }

    /**
     * detect against possible objects
     * @param possibleObjects
     */
    pointingAt(possibleObjects) {
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( new THREE.Vector2(0, 0), this.sceneCollection.camera );
        var collisions = raycaster.intersectObjects( possibleObjects );
        return collisions;
    }
}
