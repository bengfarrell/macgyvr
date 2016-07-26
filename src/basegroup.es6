export default class BaseGroup {
    constructor(params) {

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Object3D();

        if (params && params.assets) {
            // todo: determine when to use JSON Loader, OBJ loader, or whatever
            var loader = new THREE.JSONLoader();
            loader.load(params.assets, (geometry, materials) => {
                this.onAssetsLoaded(geometry, materials);
            });
        }

        this.onInitialize(params);
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
     * @param custom
     */
    onCreate(scene, custom) {};
    onRender(scene, custom) {};
    onInitialize(params) {};
    onAssetsLoaded(geometry, material) {};

    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     * @param custom
     */
    create(scene, custom) {
        this._group.name = this.name;
        scene.scene.add(this._group);
        this.onCreate(scene, custom);
    }

    /**
     * add object to scene
     * @param object
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
     * get children of this group
     * @returns {Array}
     */
    get children() {
        return this._group.children;
    }

    /**
     * on prerender scene
     * @param scene
     * @param custom
     */
    preRender(scene, custom) {}

    /**
     * on render scene
     * @param scene
     * @param custom
     */
    render(scene, custom) {
        this.onRender(scene, custom);
    }
}