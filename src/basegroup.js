export default class BaseGroup {
    constructor(params) {

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Group();

        this._config = params;
        this.onInitialize(params);

        this.el = { isPlaying: true };
    }

    /**
     * get name of group
     */
    get name() {
        return this.constructor.name;
    }

    /**
     * overridable methods
     * leave empty to be a simple abstraction we don't have to call super on
     * @param scene
     */
    onCreate(scene) {};
    onRender(scene, time) {};
    onInitialize(params) {};
    onAssetsLoaded(geometry, material) {};
    onJSONSceneLoadProgress(progress) {};
    onJSONSceneLoadError(err) {};
    onJSONSceneLoaded(scene) { this.add(scene) };

    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    create(scene) {
        this._group.name = this.name;
        scene.object3D.add(this._group);

        if (this._config && this._config.assets) {
            // todo: determine when to use JSON Loader, OBJ loader, or whatever
            var loader = new THREE.JSONLoader();
            loader.load(this._config.assets, (geometry, materials) => {
                this.onAssetsLoaded(geometry, materials);
            });
        }

        if (this._config && this._config.geometry) {
            var loader = new THREE.BufferGeometryLoader();
            loader.load(this._config.geometry, (geometry) => {
                this.onAssetsLoaded(geometry);
            });
        }

        if (this._config && this._config.scene) {
            var loader = new THREE.ObjectLoader();
            loader.load(this._config.scene, (loaded) => {
                this.onJSONSceneLoaded(loaded);
            }, (progress) => {
                this.onJSONSceneLoadProgress(progress);
            }, (err) => {
                this.onJSONSceneLoadError(err);
            });
        }

        this.onCreate();
    }

    /**
     * add object to scene
     * @param object
     * @param name
     */
    add(object, name) {
        if (!name) {
            name = this.name + '-child';
        }
        object.name = name;
        this._group.add(object);
    }

    /**
     * get parent group object
     * @returns {THREE.Object3D}
     */
    get group() {
        return this._group;
    }

    /**
     * get scene
     * @returns {THREE.Object3D}
     */
    get sceneCollection() {
        return this._sceneCollection;
    }

    /**
     * get children of this group
     * @returns {Array}
     */
    get children() {
        return this._group.children;
    }

    /**
     * on prerender scene
     * @param scene
     */
    preRender() {}

    /**
     * on a-frame component tick
     * @param time
     */
    tick(time) {
        this.onRender(time);
    }
}
