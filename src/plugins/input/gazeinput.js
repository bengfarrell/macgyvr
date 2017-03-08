export default class GazeInput {
    constructor(sceneCollection, colliders) {
        this.sceneCollection = sceneCollection;
        this._colliders = colliders;
        this._callbacks = [];
        document.body.addEventListener('mousedown', (e) => this.onClick(e) );
    }

    set colliderObjects(objs) {
        this._colliders = objs;
    }

    get colliderObjects() {
        return objs;
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
            var collisions = [];
            if (this._colliders && this._colliders.length > 0) {
                collisions = this.detect(this._colliders);
            }
            this._callbacks[c].apply(this, [collisions]);
        }
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
