export default class BaseGroup {
    constructor(params) {

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Group();
        this._config = params;
        this._childgroups = [];
        this._isAddedToScene = false;

        this.el = { isPlaying: true };

        this.init();
    }

    init() {
        this.onCreate(this.config);
    }

    /**
     * get name of group
     */
    get name() {
        return this.constructor.name;
    }

    /**
     * get app config
     * @returns {*}
     */
    get appConfig() {
        return this._scene.appConfig;
    }

    /**
     * get config
     * @returns {*}
     */
    get config() {
        return this._config;
    }

    /**
     * overridable methods
     * leave empty to be a simple abstraction we don't have to call super on
     * @param scene
     */
    onAdded(scene) {};
    onRender(scene, time) {};
    onCreate(params) {};

    /**
     * on added to scene
     * @param scene
     */
    addedToScene(scene) {
        if (!this._isAddedToScene) {
            this._isAddedToScene = true;
            this._group.name = this.name;
            this._scene = scene;
            this.onAdded();
        }

        for (let c = 0; c < this._childgroups.length; c++) {
            this._childgroups[c].addedToScene();
        }
    }

    /**
     * add object to parent
     * @param object
     * @param name
     */
    add(object, name) {
        if (!name) {
            name = this.name + '-child';
        }
        object.group.name = name;

        /*if (object) {
            this._childgroups.push(object);
            this._group.add(object.group);
        } else {
            this._group.add(object);
        }
        return object;*/
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
    get scene() {
        return this._scene;
    }

    /**
     * get children of this group
     * (note: unsure if this should be objects or to mix in real threejs groups and aframe entities with this call - for now just macgyvr based object)
     * @returns {Array}
     */
    get children() {
        return this._childgroups;
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
