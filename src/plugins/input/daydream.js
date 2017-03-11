export default class Daydream {
    constructor() {
        this._callbacks = [];
        this._controller = new DaydreamController();
        this._controller.onStateChange((state) => this.onControllerUpdate(state));
        this._sensorfusion = new MadgwickAHRS();
        this._sensorfusion.setQuaternion( [ 0.7071067811865475, 0, 0, 0.7071067811865475 ] ); // Hack-ish: Rotate internal quaternion
        this._buttons = {
            app: false,
            home: false,
            click: false,
            touch: false
        };
    }

    /**
     * connect and start listening
     */
    connect() {
        this._controller.connect();
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

        if (state.isAppDown !== this._buttons.click) {
            this._buttons.app = state.isAppDown;
            changed.push( { 'app': state.isAppDown });
        }

        if (state.isHomeDown !== this._buttons.home) {
            this._buttons.home = state.isHomeDown;
            changed.push( { 'home': state.isHomeDown });
        }

        if (state.xTouch > 0 && state.yTouch > 0) {
            changed.push( { 'touch': { x: state.xTouch, y: state.yTouch } });
        }

        if (changed.length > 0) {
            for (var c = 0; c < this._callbacks.length; c++) {
                this._callbacks[c].apply(this, [changed, state]);
            }
        }
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
    detect(possibleObjects) {
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( new THREE.Vector2(0, 0), this.sceneCollection.camera );
        var collisions = raycaster.intersectObjects( possibleObjects );
        return collisions;
    }
}
