export default class extends HTMLElement {
    /**
     * initialize default class properties
     * @private
     */
    setProperties() {
        /**
         * collection of scene objects
         * @type {{}}
         * @private
         */
        this._collection = {};

        /**
         * collection of scene objects defined by component users
         * @type {{}}
         * @private
         */
        this._customCollection = {};

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
         * debug view
         * @type {boolean}
         * @private
         */
        this._debugView = false;

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
         * scene initialized
         * @type {boolean}
         * @private
         */
        this._initialized = false;
    }

    /**
     * set pre render callback
     * @param cb
     */
    set onPreRender(cb) {
        this._preRenderCallback = cb;
    }

    /**
     * set pre render callback
     * @param cb
     */
    set onPostRender(cb) {
        this._postRenderCallback = cb;
    }

    /**
     * set pre render callback
     * @param cb
     */
    set onCreate(cb) {
        this._sceneSetupCallback = cb;
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
                objects[c].create(this._collection, this._customCollection);
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

        if (this.hasAttribute('debugview')) {
            this._debugView = true;
        }

        if (this.hasAttribute('inspectable')) {
            this._inspectable = true;
        }

        if (this.hasAttribute('antialias')) {
            this._antialias = true;
        }
    };

    /**
     * element created callback
     * @private
     */
    createdCallback() {
        this.setProperties();
        this.parseAttributes();
    };

    /**
     * element attached callback
     * @private
     */
    attachedCallback() {
        this.root = this;
        this.dom = {};
        window.addEventListener('resize', event => this.onResize(event));
        window.addEventListener('vrdisplaypresentchange', event => this.onResize(event));
        var event = new CustomEvent('ready');
        this.dispatchEvent(event);
        setTimeout( () => {
            this.init3DScene();
            this.render();
        }, 100);
    }

    /**
     * render
     */
    render() {
        this._collection.controls.update();

        if (this._preRenderCallback) {
            this._preRenderCallback(this._collection, this._customCollection);
        }

        this._collection.renderer.render( this._collection.scene, this._collection.camera );

        for (var c = 0; c < this._sceneObjects.length; c++) {
            this._sceneObjects[c].render(this._collection, this._customCollection);
        }

        if (this._postRenderCallback) {
            this._postRenderCallback(this._collection, this._customCollection);
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

        this._collection.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this._collection.effect = new THREE.VREffect(this._collection.renderer);
        this._collection.effect.setSize(window.innerWidth, window.innerHeight);
        this._collection.controls = new THREE.VRControls(this._collection.camera);
        this._collection.controls.standing = true;
        this._collection.scene.add(this._collection.camera);
        this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, {hideButton: false, isUndistorted:false});

        if (this._debugView) {
            this.axes = new THREE.AxisHelper(50);
            this.axes.position.set(0, 0, 0);
            this._collection.scene.add(this.axes);

            var gridXZ = new THREE.GridHelper(200, 10);
            this._collection.scene.add(gridXZ);

            this._collection.light = new THREE.PointLight(0xffffff);
            this._collection.light.position.set(100,250,100);
            this._collection.scene.add(this._collection.light);
        }

        if (this._sceneSetupCallback) {
            this._sceneSetupCallback(this._collection, this._customCollection);
        }

        if (this._pendingObjects) {
            for (var c = 0; c < this._pendingObjects.length; c++) {
                var newobj = this._pendingObjects[c];
                this._sceneObjects.push(newobj);
                newobj.create(this._collection, this._customCollection);
            }
            this._pendingObjects = [];
        }

        if (this._inspectable) {
            window.scene = this._collection.scene;
        }

        this._initialized = true;
    }

    onResize(event) {
        this._collection.effect.setSize(window.innerWidth, window.innerHeight);
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