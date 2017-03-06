(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MacgyVRScene = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var VRCamera = function () {
    /**
     * c-tor
     */
    function VRCamera() {
        _classCallCheck(this, VRCamera);

        this._oob = { _active: false };
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this._controls = new THREE.VRControls(this._camera);
        this._controls.standing = true;
    }

    /**
     * render camera for scene
     */

    _createClass(VRCamera, [{
        key: "render",
        value: function render() {
            if (this._oob._active) {
                this.outOfBodyRender();
            } else {
                this._controls.update();
            }
        }

        /**
         * get root THREE.js camera instance
         * @returns {THREE.PerspectiveCamera|*|PerspectiveCamera|Ea}
         */

    }, {
        key: "getThreeCamera",
        value: function getThreeCamera() {
            return this._camera;
        }

        /**
         * run out of body cycle for visual debugging
         * @param params
         * @returns {{}}
         */

    }, {
        key: "goOutOfBody",
        value: function goOutOfBody(params) {
            if (!params) {
                params = {};
            }
            this._oob.velocity = params.velocity ? params.velocity : 1;
            this._oob.maxHeight = params.maxHeight ? params.maxHeight : 100;
            this._oob.hoverTime = params.hover ? params.hover : 200;
            this._oob._active = true;
            this._oob._hovering = 0;
            this._oob._direction = 1;
            this._oob._originalYPos = this._camera.position.y;
            this._oob._originalXRot = this._camera.rotation.x;

            return this._oob; // nice to let consumers know what random stuff we're injecting
        }

        /**
         * render cycle for out of body movement
         */

    }, {
        key: "outOfBodyRender",
        value: function outOfBodyRender() {
            if (this._oob._hovering > 0) {
                this._oob._hovering--;
                return;
            }

            var rotationIncrement = -(-Math.PI / 2 - this._oob._originalXRot) / (this._oob.maxHeight / this._oob.velocity);
            this._camera.position.y += this._oob._direction * this._oob.velocity;
            this._camera.rotation.x -= rotationIncrement * this._oob._direction;

            if (this._camera.position.y > this._oob.maxHeight) {
                this._oob._direction *= -1;
                this._oob._hovering = this._oob.hoverTime;
            } else if (this._camera.position.y < this._oob._originalYPos) {
                this._camera.position.y = this._oob._originalYPos;
                this._oob._active = false;
            }
        }
    }]);

    return VRCamera;
}();

exports.default = VRCamera;

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _vrscene = require('./vrscene.js');

var _vrscene2 = _interopRequireDefault(_vrscene);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _class = function (_VRScene) {
    _inherits(_class, _VRScene);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'setProperties',

        /**
         * initialize default class properties
         * @private
         */
        value: function setProperties() {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'setProperties', this).call(this);

            /**
             * debug view
             * @type {boolean}
             * @private
             */
            this._debugView = false;

            /**
             * disable VR renderer/effect
             * @type {boolean}
             * @private
             */
            this._disableVREffect = false;

            /**
             * out of body trigger key code (settable via element attributes)
             * @type {number}
             * @private
             */
            this._outOfBodyKeyCode = 32; // space
        }

        /**
         * parse attributes on element
         * @private
         */

    }, {
        key: 'parseAttributes',
        value: function parseAttributes() {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'parseAttributes', this).call(this);

            if (this.hasAttribute('debugview')) {
                this._debugView = true;
            }

            if (this.hasAttribute('disablevr')) {
                this._disableVREffect = true;
            }

            if (this.hasAttribute('outofbodykeycode')) {
                this._outOfBodyKeyCode = this.getAttribute('outofbodykeycode');
            }
        }
    }, {
        key: 'attachedCallback',

        /**
         * element attached callback
         * @private
         */
        value: function attachedCallback() {
            var _this2 = this;

            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'attachedCallback', this).call(this);
            document.addEventListener('keydown', function (event) {
                return _this2.onKeyDown(event);
            });
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (event.keyCode === parseInt(this._outOfBodyKeyCode)) {
                this._collection.vrcamera.goOutOfBody();
            }
        }
    }]);

    return _class;
}(_vrscene2.default);

exports.default = _class;

},{"./vrscene.js":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _vrcamera = require('./vrcamera.js');

var _vrcamera2 = _interopRequireDefault(_vrcamera);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var _class = function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'setProperties',

        /**
         * initialize default class properties
         * @private
         */
        value: function setProperties() {
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
        }

        /**
         * set pre render callback
         * @param cb
         */

    }, {
        key: 'addObjects',

        /**
         * add to scene
         * @param objects
         */
        value: function addObjects(objects) {
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

    }, {
        key: 'parseAttributes',
        value: function parseAttributes() {
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
        }
    }, {
        key: 'createdCallback',

        /**
         * element created callback
         * @private
         */
        value: function createdCallback() {
            this.formatPage();
            this.setProperties();
            this.parseAttributes();
        }
    }, {
        key: 'attachedCallback',

        /**
         * element attached callback
         * @private
         */
        value: function attachedCallback() {
            var _this2 = this;

            this.root = this;
            window.addEventListener('resize', function (event) {
                return _this2.onResize(event);
            });
            window.addEventListener('vrdisplaypresentchange', function (event) {
                return _this2.onResize(event);
            });
            var event = new CustomEvent('ready');
            this.dispatchEvent(event);
            this.init3DScene();
            this.render();
        }
    }, {
        key: 'formatPage',
        value: function formatPage() {
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.overflow = 'hidden';
        }

        /**
         * render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var now = Date.now();
            var timeObj = { now: now, delta: now - this.time };
            this.time = now;

            this._collection.vrcamera.render();

            if (this._preRenderCallback) {
                this._preRenderCallback(this._collection, timeObj);
            }

            if (this._disableVREffect) {
                this._collection.renderer.render(this._collection.scene, this._collection.camera);
            } else {
                this._collection.manager.render(this._collection.scene, this._collection.camera);
            }

            for (var c = 0; c < this._sceneObjects.length; c++) {
                this._sceneObjects[c].render(timeObj);
            }

            if (this._postRenderCallback) {
                this._postRenderCallback(timeObj);
            }
            window.requestAnimationFrame(function (e) {
                return _this3.render();
            });
        }

        /**
         * initialize 3D scene
         */

    }, {
        key: 'init3DScene',
        value: function init3DScene() {
            this._collection.scene = new THREE.Scene();
            this._collection.renderer = new THREE.WebGLRenderer({ antialias: this._antialias });
            this._collection.renderer.setSize(window.innerWidth, window.innerHeight);
            this.root.appendChild(this._collection.renderer.domElement);

            this._collection.vrcamera = new _vrcamera2.default();
            this._collection.camera = this._collection.vrcamera.getThreeCamera();
            this._collection.scene.add(this._collection.camera);

            if (!this._disableVREffect) {
                this._collection.effect = new THREE.VREffect(this._collection.renderer);
                this._collection.effect.setSize(window.innerWidth, window.innerHeight);
                this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, { hideButton: false, isUndistorted: false });
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
                this._collection.light.position.set(100, 250, 100);
                this._collection.scene.add(this._collection.light);
            }

            if (this._sceneSetupCallback) {
                this._sceneSetupCallback(this._collection);
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
    }, {
        key: 'onResize',
        value: function onResize(event) {
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

    }, {
        key: 'detachedCallback',
        value: function detachedCallback() {}
    }, {
        key: 'attributeChangedCallback',

        /**
         * attributeChangedCallback
         * @private
         * @param {String} attr attribute changed
         * @param {*} oldVal old value
         * @param {*} newVal new value
         */
        value: function attributeChangedCallback(attr, oldVal, newVal) {}
    }, {
        key: 'onPreRender',
        set: function set(cb) {
            this._preRenderCallback = cb;
        }

        /**
         * set pre render callback
         * @param cb
         */

    }, {
        key: 'onPostRender',
        set: function set(cb) {
            this._postRenderCallback = cb;
        }

        /**
         * set pre render callback
         * @param cb
         */

    }, {
        key: 'onCreate',
        set: function set(cb) {
            this._sceneSetupCallback = cb;
        }
    }]);

    return _class;
}(HTMLElement);

exports.default = _class;

},{"./vrcamera.js":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS1kZWJ1Zy5qcyIsInNyYy92cnNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFDQXFCLHVCQUNqQjtBQUdBOzs7d0JBQWM7OEJBQ1Y7O2FBQUEsQUFBSyxPQUFPLEVBQUUsU0FBZCxBQUFZLEFBQVcsQUFDdkI7YUFBQSxBQUFLLFVBQVUsSUFBSSxNQUFKLEFBQVUsa0JBQVYsQUFBNEIsSUFBSSxPQUFBLEFBQU8sYUFBYSxPQUFwRCxBQUEyRCxhQUEzRCxBQUF3RSxLQUF2RixBQUFlLEFBQTZFLEFBQzVGO2FBQUEsQUFBSyxZQUFZLElBQUksTUFBSixBQUFVLFdBQVcsS0FBdEMsQUFBaUIsQUFBMEIsQUFDM0M7YUFBQSxBQUFLLFVBQUwsQUFBZSxXQUFmLEFBQTBCLEFBQzdCO0FBRUQ7Ozs7Ozs7O2lDQUdTLEFBQ0w7Z0JBQUksS0FBQSxBQUFLLEtBQVQsQUFBYyxTQUFTLEFBQ25CO3FCQUFBLEFBQUssQUFDUDtBQUZGLG1CQUVRLEFBQ0o7cUJBQUEsQUFBSyxVQUFMLEFBQWUsQUFDakI7QUFDTDtBQUVEOzs7Ozs7Ozs7eUNBSWlCLEFBQ2I7bUJBQU8sS0FBUCxBQUFZLEFBQ2Y7QUFFRDs7Ozs7Ozs7OztvQyxBQUtZO2dCQUNKLENBQUosQUFBSyxRQUFRLEFBQUU7eUJBQUEsQUFBUyxBQUFLO0FBQzdCO2lCQUFBLEFBQUssS0FBTCxBQUFVLFdBQVcsT0FBQSxBQUFPLFdBQVcsT0FBbEIsQUFBeUIsV0FBOUMsQUFBeUQsQUFDekQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sWUFBWSxPQUFuQixBQUEwQixZQUFoRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLEtBQUwsQUFBVSxZQUFZLE9BQUEsQUFBTyxRQUFRLE9BQWYsQUFBc0IsUUFBNUMsQUFBb0Qs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WjtnQkFBSSxDQUFDLEtBQUwsQUFBVSxrQkFBa0IsQUFDeEI7cUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLFFBQVEsT0FBaEMsQUFBdUMsWUFBWSxPQUFuRCxBQUEwRCxBQUM3RDtBQUZELG1CQUVPLEFBQ0g7cUJBQUEsQUFBSyxZQUFMLEFBQWlCLFNBQWpCLEFBQTBCLFFBQVEsT0FBbEMsQUFBeUMsWUFBWSxPQUFyRCxBQUE0RCxBQUMvRDtBQUNEO2lCQUFBLEFBQUssWUFBTCxBQUFpQixPQUFqQixBQUF3QixTQUFTLE9BQUEsQUFBTyxhQUFhLE9BQXJELEFBQTRELEFBQzVEO2lCQUFBLEFBQUssWUFBTCxBQUFpQixPQUFqQixBQUF3QixBQUMzQjtBQUVEOzs7Ozs7Ozs7MkNBSW1CLEFBQUU7O2FBR3JCOzs7Ozs7Ozs7aUQsQUFPeUIsTSxBQUFNLFEsQUFBUSxRQUFRLEFBQUU7OzswQixBQTFNakMsSUFBSSxBQUNoQjtpQkFBQSxBQUFLLHFCQUFMLEFBQTBCLEFBQzdCO0FBRUQ7Ozs7Ozs7OzswQixBQUlpQixJQUFJLEFBQ2pCO2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFDOUI7QUFFRDs7Ozs7Ozs7OzBCLEFBSWEsSUFBSSxBQUNiO2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFDOUI7Ozs7O0UsQUEvRndCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZSQ2FtZXJhIHtcbiAgICAvKipcbiAgICAgKiBjLXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vb2IgPSB7IF9hY3RpdmU6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMDApO1xuICAgICAgICB0aGlzLl9jb250cm9scyA9IG5ldyBUSFJFRS5WUkNvbnRyb2xzKHRoaXMuX2NhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xzLnN0YW5kaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY2FtZXJhIGZvciBzY2VuZVxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX29vYi5fYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm91dE9mQm9keVJlbmRlcigpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByb290IFRIUkVFLmpzIGNhbWVyYSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYXwqfFBlcnNwZWN0aXZlQ2FtZXJhfEVhfVxuICAgICAqL1xuICAgIGdldFRocmVlQ2FtZXJhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FtZXJhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1biBvdXQgb2YgYm9keSBjeWNsZSBmb3IgdmlzdWFsIGRlYnVnZ2luZ1xuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZ29PdXRPZkJvZHkocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zKSB7IHBhcmFtcyA9IHt9OyB9XG4gICAgICAgIHRoaXMuX29vYi52ZWxvY2l0eSA9IHBhcmFtcy52ZWxvY2l0eSA/IHBhcmFtcy52ZWxvY2l0eSA6IDE7XG4gICAgICAgIHRoaXMuX29vYi5tYXhIZWlnaHQgPSBwYXJhbXMubWF4SGVpZ2h0ID8gcGFyYW1zLm1heEhlaWdodCA6IDEwMDtcbiAgICAgICAgdGhpcy5fb29iLmhvdmVyVGltZSA9IHBhcmFtcy5ob3ZlciA/IHBhcmFtcy5ob3ZlciA6IDIwMDtcbiAgICAgICAgdGhpcy5fb29iLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9vb2IuX2hvdmVyaW5nID0gMDtcbiAgICAgICAgdGhpcy5fb29iLl9kaXJlY3Rpb24gPSAxO1xuICAgICAgICB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcyA9IHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55O1xuICAgICAgICB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCA9IHRoaXMuX2NhbWVyYS5yb3RhdGlvbi54O1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vb2I7IC8vIG5pY2UgdG8gbGV0IGNvbnN1bWVycyBrbm93IHdoYXQgcmFuZG9tIHN0dWZmIHdlJ3JlIGluamVjdGluZ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBjeWNsZSBmb3Igb3V0IG9mIGJvZHkgbW92ZW1lbnRcbiAgICAgKi9cbiAgICBvdXRPZkJvZHlSZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2hvdmVyaW5nID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyAtLTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3RhdGlvbkluY3JlbWVudCA9IC0oLU1hdGguUEkvMiAtIHRoaXMuX29vYi5fb3JpZ2luYWxYUm90KSAvICh0aGlzLl9vb2IubWF4SGVpZ2h0L3RoaXMuX29vYi52ZWxvY2l0eSk7XG4gICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ICs9IHRoaXMuX29vYi5fZGlyZWN0aW9uICogdGhpcy5fb29iLnZlbG9jaXR5O1xuICAgICAgICB0aGlzLl9jYW1lcmEucm90YXRpb24ueCAtPSByb3RhdGlvbkluY3JlbWVudCAqIHRoaXMuX29vYi5fZGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW1lcmEucG9zaXRpb24ueSA+IHRoaXMuX29vYi5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uICo9IC0xO1xuICAgICAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IHRoaXMuX29vYi5ob3ZlclRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPCB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcykge1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcztcbiAgICAgICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVlJTY2VuZSBmcm9tICcuL3Zyc2NlbmUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFZSU2NlbmUge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICBzdXBlci5zZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlYnVnIHZpZXdcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGlzYWJsZSBWUiByZW5kZXJlci9lZmZlY3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kaXNhYmxlVlJFZmZlY3QgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb3V0IG9mIGJvZHkgdHJpZ2dlciBrZXkgY29kZSAoc2V0dGFibGUgdmlhIGVsZW1lbnQgYXR0cmlidXRlcylcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX291dE9mQm9keUtleUNvZGUgPSAzMjsgLy8gc3BhY2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXJzZSBhdHRyaWJ1dGVzIG9uIGVsZW1lbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhcnNlQXR0cmlidXRlcygpIHtcbiAgICAgICAgc3VwZXIucGFyc2VBdHRyaWJ1dGVzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdkZWJ1Z3ZpZXcnKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWdWaWV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZXZyJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVWUkVmZmVjdCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ291dG9mYm9keWtleWNvZGUnKSkge1xuICAgICAgICAgICAgdGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdvdXRvZmJvZHlrZXljb2RlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBhdHRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuYXR0YWNoZWRDYWxsYmFjaygpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4gdGhpcy5vbktleURvd24oZXZlbnQpKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IHBhcnNlSW50KHRoaXMuX291dE9mQm9keUtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLmdvT3V0T2ZCb2R5KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVlJDYW1lcmEgZnJvbSAnLi92cmNhbWVyYS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY3VycmVudCB0aW1lIHN0YW1wXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwcmVyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHBvc3RyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBzZXR1cCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9iamVjdHMgaW4gc2NlbmVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFudGktYWxpYXMgdGhyZWVqcyByZW5kZXJlclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyBpbnNwZWN0YWJsZSAoZm9yIFRocmVlSlMgaW5zcGVjdG9yKVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFkZCBsaWdodHMgYXV0b21hdGljYWxseT9cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hdXRvbGlnaHQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uUHJlUmVuZGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxiYWNrID0gY2I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHByZSByZW5kZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBzZXQgb25Qb3N0UmVuZGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uQ3JlYXRlKGNiKSB7XG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0byBzY2VuZVxuICAgICAqIEBwYXJhbSBvYmplY3RzXG4gICAgICovXG4gICAgYWRkT2JqZWN0cyhvYmplY3RzKSB7XG4gICAgICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iamVjdHMgPSBbb2JqZWN0c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0cy5wdXNoKG9iamVjdHNbY10pO1xuICAgICAgICAgICAgICAgIG9iamVjdHNbY10uY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBvYmplY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFyc2UgYXR0cmlidXRlcyBvbiBlbGVtZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYXJzZUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnc2NlbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVEYXRhVVJJID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NjZW5lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2luc3BlY3RhYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYW50aWFsaWFzJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2F1dG9saWdodCcpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvbGlnaHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgY3JlYXRlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmZvcm1hdFBhZ2UoKTtcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMucGFyc2VBdHRyaWJ1dGVzKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgYXR0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMuaW5pdDNEU2NlbmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBmb3JtYXRQYWdlKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJzEwMHZ3JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSAnMTAwdmgnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIHRpbWVPYmogPSB7IG5vdzogbm93LCBkZWx0YTogbm93IC0gdGhpcy50aW1lIH07XG4gICAgICAgIHRoaXMudGltZSA9IG5vdztcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLnJlbmRlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2soIHRoaXMuX2NvbGxlY3Rpb24sIHRpbWVPYmogKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlVlJFZmZlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIucmVuZGVyKCB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLCB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5tYW5hZ2VyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fc2NlbmVPYmplY3RzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHNbY10ucmVuZGVyKHRpbWVPYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcG9zdFJlbmRlckNhbGxiYWNrKHRpbWVPYmopO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSA9PiB0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIDNEIHNjZW5lXG4gICAgICovXG4gICAgaW5pdDNEU2NlbmUoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7YW50aWFsaWFzOiB0aGlzLl9hbnRpYWxpYXN9ICk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKCB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEgPSBuZXcgVlJDYW1lcmEoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgPSB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLmdldFRocmVlQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVWUkVmZmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QgPSBuZXcgVEhSRUUuVlJFZmZlY3QodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlcik7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5tYW5hZ2VyID0gbmV3IFdlYlZSTWFuYWdlcih0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLCB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdCwge2hpZGVCdXR0b246IGZhbHNlLCBpc1VuZGlzdG9ydGVkOmZhbHNlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGVidWdWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLmF4ZXMgPSBuZXcgVEhSRUUuQXhpc0hlbHBlcig1MCk7XG4gICAgICAgICAgICB0aGlzLmF4ZXMucG9zaXRpb24uc2V0KDAsIDAsIDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5heGVzKTtcblxuICAgICAgICAgICAgdmFyIGdyaWRYWiA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDIwMCwgMTApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQoZ3JpZFhaKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9hdXRvbGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZik7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0LnBvc2l0aW9uLnNldCgxMDAsMjUwLDEwMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayh0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nT2JqZWN0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9wZW5kaW5nT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdvYmogPSB0aGlzLl9wZW5kaW5nT2JqZWN0c1tjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChuZXdvYmopO1xuICAgICAgICAgICAgICAgIG5ld29iai5jcmVhdGUodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3BlY3RhYmxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2NlbmUgPSB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBkZXRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoZWRDYWxsYmFjaygpIHt9O1xuXG5cbiAgICAvKipcbiAgICAgKiBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyIGF0dHJpYnV0ZSBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWwgb2xkIHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWwgbmV3IHZhbHVlXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7fTtcbn1cbiJdfQ==
