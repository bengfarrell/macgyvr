export default class BaseGroup {
    constructor(params) {
        this._config = params;
        this._children = [];
        this.isGroup = true;
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

    initializeGroup(scene) {
        this._group = new BABYLON.Mesh(this.constructor.name + '-group', scene);
    }

    onParented(scene, parent) {
        this._scene = scene;
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
    add(objects) {
        let asArray = true;
        if (objects.length === undefined) {
            objects = [objects];
            asArray = false;
        }
        for (let c = 0; c < objects.length; c++) {
            if (objects[c].isGroup) {
                if (!objects[c].group) {
                    objects[c].initializeGroup(this.scene);
                }
                objects[c].group.parent = this._group;
            } else {
                objects[c].parent = this._group;
            }
            this._children.push(objects[c]);
            if (objects[c].onParented) {
                objects[c].onParented(this._scene, this._group);
            }
        }

        if (asArray) {
            return objects;
        } else {
            return objects[0];
        }
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
