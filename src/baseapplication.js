export default class BaseApplication {
    constructor(el, cfg) {
        if (!cfg) {
            cfg = {};
        }
        this.element = el;
        this.engine = new BABYLON.Engine(this.element, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.appConfig = cfg;
        this.root = null;
        this.isApplication = true;
        this.children = [];
        this.engine.runRenderLoop( () => this.tick() );
        this.onCreate(this.scene);

        this.cameras = [];
        this.lights = [];

        if (cfg.camera) {
            this.addCamera(cfg.camera);
        }

        if (cfg.lights) {
            this.addLights(cfg.lights);
        }

        if (cfg.inspector) {
            document.addEventListener('keydown', e => this.onKeyDown(e) );
        }

        this.initialized = true;
    }

    /**
     * convenience method to add a typical camera
     */
    addCamera() {
        let camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.element, true);
        this.cameras.push(camera);
    }

    /**
     * convenience method to add a typical light
     */
    addLights() {
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

    }

    get config() {
        return this.appConfig;
    }

    /**
     * render engine tick
     */
    tick() {
        if (this.initialized && this.cameras.length > 0) {
            this.scene.render();
            this.onRender(this.engine.getDeltaTime());
        }
    }

    /**
     * add objects to application group
     * @param objects
     */
    add(objects) {
        if (!this.root) {
            this.root = new BABYLON.Mesh('application-root', this.scene);
        }
        let asArray = true;
        if (objects.length === undefined) {
            objects = [objects];
            asArray = false;
        }
        for (let c in objects) {
            if (objects[c].isGroup) {
                if (!objects[c].group) {
                    objects[c].initializeGroup(this.scene);
                }
                objects[c].group.parent = this.root;
            } else {
                objects[c].parent = this.root;
            }
            this.children.push(objects[c]);

            if (objects[c].onParented) {
                objects[c].onParented(this.scene, this.root);
            }
        }

        if (asArray) {
            return objects;
        } else {
            return objects[0];
        }
    }

    onKeyDown(e) {
        if (this.config.inspector) {
            if (e.keyCode === this.config.inspector || String.fromCharCode(e.keyCode).toLowerCase() === this.config.inspector ) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        }
    }

    onCreate(sceneEl) {}
    onRender(time) {}
}
