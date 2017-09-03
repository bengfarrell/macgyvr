export default class BaseGroup {
    constructor(params) {
        this._config = params;
        this._children = [];
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

    onParented(scene, parent) {
        this._scene = scene;
        this._group = new BABYLON.Mesh(this.constructor.name + '-group', this._scene);
        this._scene._engine.runRenderLoop( () => this.tick() );
        this.onCreate(scene, parent);
    }

    /**
     * overridable methods
     * leave empty to be a simple abstraction we don't have to call super on
     * @param scene
     */
    onRender(scene, time) {};
    onCreate(params) {};

    /**
     * add object to parent
     * @param object
     */
    add(object) {
        this._children.push(object);
        if (object.onParented) {
            object.onParented(this._scene, this._group);
        }
        return object;
    }

    get application() {
        let parent = this.parent;
        while (parent) {
            if (parent.isApplication) {
                return parent;
            }
            parent = parent.parent;
        }
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
        return this._children;
    }

    /**
     * on a-frame component tick
     * @param time
     */
    tick(time) {
        this.onRender(this.scene._engine.getDeltaTime());
    }
}
