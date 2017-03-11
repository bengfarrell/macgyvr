import VRCamera from './vrcamera.js';

export default class extends HTMLElement {
    /**
     * initialize default class properties
     * @private
     */
    setProperties() {
        /**
         * current time stamp
         * @type {number}
         */
        this.time = Date.now();

        /**
         * collection of scene objects
         * @type {{}}
         * @private
         */
        this._collection = {};

        /**
         * scene prerender callback
         * @type {null}
         */
        this._preRenderCallBack = null;

        /**
         * scene postrender callback
         * @type {null}
         */
        this._postRenderCallBack = null;

        /**
         * scene setup callback
         * @type {null}
         */
        this._sceneSetupCallback = null;

        /**
         * objects in scene
         * @type {Array}
         * @private
         */
        this._sceneObjects = [];

        /**
         * anti-alias threejs renderer
         * @type {boolean}
         * @private
         */
        this._antialias = false;

        /**
         * is inspectable (for ThreeJS inspector)
         * @type {boolean}
         * @private
         */
        this._inspectable = false;

        /**
         * add lights automatically?
         * @type {boolean}
         * @private
         */
        this._autolight = false;

        /**
         * scene initialized
         * @type {boolean}
         * @private
         */
        this._initialized = false;

        /**
         * application scope
         */
        this._application;
    }

    /**
     * register application scope
     * @param scope
     */
    registerApplication(scope) {
        this._application = scope;
        if (this._initialized) {
            this._application.onCreate(this, this._collection);
        }
    }

    /**
     * add to scene
     * @param objects
     */
    addObjects(objects) {
        if (!objects.length) {
            objects = [objects];
        }

        if (this._initialized) {
            for (var c = 0; c < objects.length; c++) {
                this._sceneObjects.push(objects[c]);
                objects[c].create(this._collection);
            }
        } else {
            this._pendingObjects = objects;
        }
    }

    /**
     * parse attributes on element
     * @private
     */
    parseAttributes() {
        if (this.hasAttribute('scene')) {
            this._sceneDataURI = this.getAttribute('scene');
        }

        if (this.hasAttribute('inspectable')) {
            this._inspectable = true;
        }

        if (this.hasAttribute('antialias')) {
            this._antialias = true;
        }

        if (this.hasAttribute('autolight')) {
            this._autolight = true;
        }
    };

    /**
     * element created callback
     * @private
     */
    createdCallback() {
        this.formatPage();
        this.setProperties();
        this.parseAttributes();
    };

    /**
     * element attached callback
     * @private
     */
    attachedCallback() {
        this.root = this;
        window.addEventListener('resize', event => this.onResize(event));
        window.addEventListener('vrdisplaypresentchange', event => this.onResize(event));

        var event = new CustomEvent('ready');
        this.dispatchEvent(event);
        this.init3DScene();
        this.render();
    }

    formatPage() {
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
    }

    /**
     * render
     */
    render() {
        var now = Date.now();
        var timeObj = { now: now, delta: now - this.time };
        this.time = now;

        this._collection.vrcamera.render();

        if (this._preRenderCallback && this._application) {
            this._application.onPreRender(timeObj);
        }

        if (this._disableVREffect) {
            this._collection.renderer.render( this._collection.scene, this._collection.camera );
        } else {
            this._collection.manager.render( this._collection.scene, this._collection.camera );
        }

        for (var c = 0; c < this._sceneObjects.length; c++) {
            this._sceneObjects[c].render(timeObj);
        }

        if (this._postRenderCallback && this._application) {
            this._application.onRender(timeObj);
        }
        window.requestAnimationFrame(e => this.render());
    }

    /**
     * initialize 3D scene
     */
    init3DScene() {
        this._collection.scene = new THREE.Scene();
        this._collection.renderer = new THREE.WebGLRenderer( {antialias: this._antialias} );
        this._collection.renderer.setSize(window.innerWidth, window.innerHeight);
        this.root.appendChild( this._collection.renderer.domElement );

        this._collection.vrcamera = new VRCamera();
        this._collection.camera = this._collection.vrcamera.getThreeCamera();
        this._collection.scene.add(this._collection.camera);

        if (!this._disableVREffect) {
            this._collection.effect = new THREE.VREffect(this._collection.renderer);
            this._collection.effect.setSize(window.innerWidth, window.innerHeight);
            this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, {hideButton: false, isUndistorted:false});
        }

        if (this._debugView) {
            this.axes = new THREE.AxisHelper(50);
            this.axes.position.set(0, 0, 0);
            this._collection.scene.add(this.axes);

            var gridXZ = new THREE.GridHelper(200, 10);
            this._collection.scene.add(gridXZ);
        }

        if (this._autolight) {
            this._collection.light = new THREE.PointLight(0xffffff);
            this._collection.light.position.set(100,250,100);
            this._collection.scene.add(this._collection.light);
        }

        if (this._sceneSetupCallback && this._application) {
            this._application.onCreate(this, this._collection);
        }

        if (this._pendingObjects) {
            for (var c = 0; c < this._pendingObjects.length; c++) {
                var newobj = this._pendingObjects[c];
                this._sceneObjects.push(newobj);
                newobj.create(this._collection);
            }
            this._pendingObjects = [];
        }

        if (this._inspectable) {
            window.scene = this._collection.scene;
        }

        this._initialized = true;
    }

    onResize(event) {
        if (!this._disableVREffect) {
            this._collection.effect.setSize(window.innerWidth, window.innerHeight);
        } else {
            this._collection.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        this._collection.camera.aspect = window.innerWidth / window.innerHeight;
        this._collection.camera.updateProjectionMatrix();
    }

    /**
     * element detached callback
     * @private
     */
    detachedCallback() {};

    /**
     * attributeChangedCallback
     * @private
     * @param {String} attr attribute changed
     * @param {*} oldVal old value
     * @param {*} newVal new value
     */
    attributeChangedCallback(attr, oldVal, newVal) {};
}
