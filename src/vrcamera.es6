export default class VRCamera {
    /**
     * c-tor
     */
    constructor() {
        this._oob = { _active: false };
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this._controls = new THREE.VRControls(this._camera);
        this._controls.standing = true;
    }

    /**
     * render camera for scene
     */
    render() {
        if (this._oob._active) {
            this.outOfBodyRender();
         } else {
            this._controls.update();
         }
    }

    /**
     * get root THREE.js camera instance
     * @returns {THREE.PerspectiveCamera|*|PerspectiveCamera|Ea}
     */
    getThreeCamera() {
        return this._camera;
    }

    /**
     * run out of body cycle for visual debugging
     * @param params
     * @returns {{}}
     */
    goOutOfBody(params) {
        if (!params) { params = {}; }
        this._oob.velocity = params.velocity ? params.velocity : 1;
        this._oob.maxHeight = params.maxHeight ? params.maxHeight : 100;
        this._oob.hoverTime = params.hover ? params.hover : 200;
        this._oob._active = true;
        this._oob._hovering = 0;
        this._oob._direction = 1;
        this._oob._originalYPos = this._camera.position.y;
        this._oob._originalXRot = this._camera.rotation.x;

        return this._oob; // nice to let consumers know what random stuff we're injecting
    }

    /**
     * render cycle for out of body movement
     */
    outOfBodyRender() {
        if (this._oob._hovering > 0) {
            this._oob._hovering --;
            return;
        }

        var rotationIncrement = -(-Math.PI/2 - this._oob._originalXRot) / (this._oob.maxHeight/this._oob.velocity);
        this._camera.position.y += this._oob._direction * this._oob.velocity;
        this._camera.rotation.x -= rotationIncrement * this._oob._direction;

        if (this._camera.position.y > this._oob.maxHeight) {
            this._oob._direction *= -1;
            this._oob._hovering = this._oob.hoverTime;
        } else if (this._camera.position.y < this._oob._originalYPos) {
            this._camera.position.y = this._oob._originalYPos;
            this._oob._active = false;
        }
    }
}
