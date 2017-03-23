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
         * current vr display
         */
        this._vrDisplay;

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
        this.setupStage();
        this.init3DScene();
    }
    
    setupStage() {
        navigator.getVRDisplays().then( displays => this.onVRDisplays(displays));
    }

    onVRDisplays(displays) {
        if (displays.length > 0) {
            this._vrDisplay = displays[0];
            this._vrDisplay.requestAnimationFrame( () => this.render());
        }
    }

    /**
     * take care of style and meta-tags
     */
    formatPage() {
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';

        var meta = document.createElement('meta');
        meta.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(meta);

        meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no';
        document.getElementsByTagName('head')[0].appendChild(meta);

        meta = document.createElement('meta');
        meta.name = 'mobile-web-app-capable';
        meta.content = 'yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        meta = document.createElement('meta');
        meta.name = 'apple-mobile-web-app-capable';
        meta.content = 'yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        meta = document.createElement('meta');
        meta.name = 'apple-mobile-web-app-status-bar-style';
        meta.content = 'black-translucent';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    /**
     * render
     */
    render() {
        var now = Date.now();
        var timeObj = { now: now, delta: now - this.time };
        this.time = now;

        this._collection.vrcamera.render();

        if (this._application) {
            this._application.onPreRender(timeObj);
        }

        this._collection.manager.render( this._collection.scene, this._collection.camera );

        for (var c = 0; c < this._sceneObjects.length; c++) {
            this._sceneObjects[c].render(timeObj);
        }

        if (this._application) {
            this._application.onRender(timeObj);
        }
        this._vrDisplay.requestAnimationFrame(e => this.render());
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

        this._collection.effect = new THREE.VREffect(this._collection.renderer);
        this._collection.effect.setSize(window.innerWidth, window.innerHeight);
        this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, {hideButton: false, isUndistorted:false});

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

        if (this._application) {
            this._application.sceneCollection = this._collection;
            this._application.vrScene = this;
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
        this._collection.renderer.setSize(window.innerWidth, window.innerHeight);
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
