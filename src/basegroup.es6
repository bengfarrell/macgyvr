export default class BaseGroup {
    constructor(params) {

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Object3D();

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