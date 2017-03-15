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
             * current vr display
             */
            this._vrDisplay;

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

    }, {
        key: 'registerApplication',
        value: function registerApplication(scope) {
            this._application = scope;
            if (this._initialized) {
                this._application.onCreate(this, this._collection);
            }
        }

        /**
         * add to scene
         * @param objects
         */

    }, {
        key: 'addObjects',
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
            this.setupStage();
            this.init3DScene();
        }
    }, {
        key: 'setupStage',
        value: function setupStage() {
            var _this3 = this;

            navigator.getVRDisplays().then(function (displays) {
                return _this3.onVRDisplays(displays);
            });
        }
    }, {
        key: 'onVRDisplays',
        value: function onVRDisplays(displays) {
            var _this4 = this;

            if (displays.length > 0) {
                this._vrDisplay = displays[0];
                console.log('my display', this._vrDisplay);
                this._vrDisplay.requestAnimationFrame(function () {
                    return _this4.render();
                });
            }
        }
    }, {
        key: 'formatPage',
        value: function formatPage() {
            document.body.style.width = '100%';
            document.body.style.height = '100%';
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
            var _this5 = this;

            var now = Date.now();
            var timeObj = { now: now, delta: now - this.time };
            this.time = now;

            this._collection.vrcamera.render();

            if (this._preRenderCallback && this._application) {
                this._application.onPreRender(timeObj);
            }

            if (this._disableVREffect) {
                this._collection.renderer.render(this._collection.scene, this._collection.camera);
            } else {
                this._collection.manager.render(this._collection.scene, this._collection.camera);
            }

            for (var c = 0; c < this._sceneObjects.length; c++) {
                this._sceneObjects[c].render(timeObj);
            }

            if (this._postRenderCallback && this._application) {
                this._application.onRender(timeObj);
            }
            this._vrDisplay.requestAnimationFrame(function (e) {
                return _this5.render();
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
    }]);

    return _class;
}(HTMLElement);

exports.default = _class;

},{"./vrcamera.js":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS1kZWJ1Zy5qcyIsInNyYy92cnNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFDQXFCLHVCQUNqQjtBQUdBOzs7d0JBQWM7OEJBQ1Y7O2FBQUEsQUFBSyxPQUFPLEVBQUUsU0FBZCxBQUFZLEFBQVcsQUFDdkI7YUFBQSxBQUFLLFVBQVUsSUFBSSxNQUFKLEFBQVUsa0JBQVYsQUFBNEIsSUFBSSxPQUFBLEFBQU8sYUFBYSxPQUFwRCxBQUEyRCxhQUEzRCxBQUF3RSxLQUF2RixBQUFlLEFBQTZFLEFBQzVGO2FBQUEsQUFBSyxZQUFZLElBQUksTUFBSixBQUFVLFdBQVcsS0FBdEMsQUFBaUIsQUFBMEIsQUFDM0M7YUFBQSxBQUFLLFVBQUwsQUFBZSxXQUFmLEFBQTBCLEFBQzdCO0FBRUQ7Ozs7Ozs7O2lDQUdTLEFBQ0w7Z0JBQUksS0FBQSxBQUFLLEtBQVQsQUFBYyxTQUFTLEFBQ25CO3FCQUFBLEFBQUssQUFDUDtBQUZGLG1CQUVRLEFBQ0o7cUJBQUEsQUFBSyxVQUFMLEFBQWUsQUFDakI7QUFDTDtBQUVEOzs7Ozs7Ozs7eUNBSWlCLEFBQ2I7bUJBQU8sS0FBUCxBQUFZLEFBQ2Y7QUFFRDs7Ozs7Ozs7OztvQyxBQUtZO2dCQUNKLENBQUosQUFBSyxRQUFRLEFBQUU7eUJBQUEsQUFBUyxBQUFLO0FBQzdCO2lCQUFBLEFBQUssS0FBTCxBQUFVLFdBQVcsT0FBQSxBQUFPLFdBQVcsT0FBbEIsQUFBeUIsV0FBOUMsQUFBeUQsQUFDekQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sWUFBWSxPQUFuQixBQUEwQixZQUFoRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLEtBQUwsQUFBVSxZQUFZLE9BQUEsQUFBTyxRQUFRLE9BQWYsQUFBc0IsUUFBNUMsQUFBb0Qs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QjtBQUVEOzs7Ozs7Ozs7MkNBSW1CLEFBQUU7O2FBRXJCOzs7Ozs7Ozs7aUQsQUFPeUIsTSxBQUFNLFEsQUFBUSxRQUFRLEFBQUU7Ozs7RSxBQS9SeEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVlJDYW1lcmEge1xuICAgIC8qKlxuICAgICAqIGMtdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX29vYiA9IHsgX2FjdGl2ZTogZmFsc2UgfTtcbiAgICAgICAgdGhpcy5fY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwMCk7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xzID0gbmV3IFRIUkVFLlZSQ29udHJvbHModGhpcy5fY2FtZXJhKTtcbiAgICAgICAgdGhpcy5fY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBjYW1lcmEgZm9yIHNjZW5lXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb29iLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMub3V0T2ZCb2R5UmVuZGVyKCk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHJvb3QgVEhSRUUuanMgY2FtZXJhIGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1RIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhfCp8UGVyc3BlY3RpdmVDYW1lcmF8RWF9XG4gICAgICovXG4gICAgZ2V0VGhyZWVDYW1lcmEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW1lcmE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcnVuIG91dCBvZiBib2R5IGN5Y2xlIGZvciB2aXN1YWwgZGVidWdnaW5nXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEByZXR1cm5zIHt7fX1cbiAgICAgKi9cbiAgICBnb091dE9mQm9keShwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMpIHsgcGFyYW1zID0ge307IH1cbiAgICAgICAgdGhpcy5fb29iLnZlbG9jaXR5ID0gcGFyYW1zLnZlbG9jaXR5ID8gcGFyYW1zLnZlbG9jaXR5IDogMTtcbiAgICAgICAgdGhpcy5fb29iLm1heEhlaWdodCA9IHBhcmFtcy5tYXhIZWlnaHQgPyBwYXJhbXMubWF4SGVpZ2h0IDogMTAwO1xuICAgICAgICB0aGlzLl9vb2IuaG92ZXJUaW1lID0gcGFyYW1zLmhvdmVyID8gcGFyYW1zLmhvdmVyIDogMjAwO1xuICAgICAgICB0aGlzLl9vb2IuX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgPSAwO1xuICAgICAgICB0aGlzLl9vb2IuX2RpcmVjdGlvbiA9IDE7XG4gICAgICAgIHRoaXMuX29vYi5fb3JpZ2luYWxZUG9zID0gdGhpcy5fY2FtZXJhLnBvc2l0aW9uLnk7XG4gICAgICAgIHRoaXMuX29vYi5fb3JpZ2luYWxYUm90ID0gdGhpcy5fY2FtZXJhLnJvdGF0aW9uLng7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29vYjsgLy8gbmljZSB0byBsZXQgY29uc3VtZXJzIGtub3cgd2hhdCByYW5kb20gc3R1ZmYgd2UncmUgaW5qZWN0aW5nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGN5Y2xlIGZvciBvdXQgb2YgYm9keSBtb3ZlbWVudFxuICAgICAqL1xuICAgIG91dE9mQm9keVJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX29vYi5faG92ZXJpbmcgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2hvdmVyaW5nIC0tO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdGF0aW9uSW5jcmVtZW50ID0gLSgtTWF0aC5QSS8yIC0gdGhpcy5fb29iLl9vcmlnaW5hbFhSb3QpIC8gKHRoaXMuX29vYi5tYXhIZWlnaHQvdGhpcy5fb29iLnZlbG9jaXR5KTtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgKz0gdGhpcy5fb29iLl9kaXJlY3Rpb24gKiB0aGlzLl9vb2IudmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX2NhbWVyYS5yb3RhdGlvbi54IC09IHJvdGF0aW9uSW5jcmVtZW50ICogdGhpcy5fb29iLl9kaXJlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ID4gdGhpcy5fb29iLm1heEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fb29iLl9kaXJlY3Rpb24gKj0gLTE7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2hvdmVyaW5nID0gdGhpcy5fb29iLmhvdmVyVGltZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW1lcmEucG9zaXRpb24ueSA8IHRoaXMuX29vYi5fb3JpZ2luYWxZUG9zKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueSA9IHRoaXMuX29vYi5fb3JpZ2luYWxZUG9zO1xuICAgICAgICAgICAgdGhpcy5fb29iLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBWUlNjZW5lIGZyb20gJy4vdnJzY2VuZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVlJTY2VuZSB7XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBkZWZhdWx0IGNsYXNzIHByb3BlcnRpZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHN1cGVyLnNldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGVidWcgdmlld1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkaXNhYmxlIFZSIHJlbmRlcmVyL2VmZmVjdFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2Rpc2FibGVWUkVmZmVjdCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvdXQgb2YgYm9keSB0cmlnZ2VyIGtleSBjb2RlIChzZXR0YWJsZSB2aWEgZWxlbWVudCBhdHRyaWJ1dGVzKVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSA9IDMyOyAvLyBzcGFjZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBzdXBlci5wYXJzZUF0dHJpYnV0ZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2RlYnVndmlldycpKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxldnInKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZVZSRWZmZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnb3V0b2Zib2R5a2V5Y29kZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdXRPZkJvZHlLZXlDb2RlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ291dG9mYm9keWtleWNvZGUnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5hdHRhY2hlZENhbGxiYWNrKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gcGFyc2VJbnQodGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEuZ29PdXRPZkJvZHkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBWUkNhbWVyYSBmcm9tICcuL3ZyY2FtZXJhLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBkZWZhdWx0IGNsYXNzIHByb3BlcnRpZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjdXJyZW50IHRpbWUgc3RhbXBcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbGxlY3Rpb24gb2Ygc2NlbmUgb2JqZWN0c1xuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGN1cnJlbnQgdnIgZGlzcGxheVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fdnJEaXNwbGF5O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwcmVyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHBvc3RyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBzZXR1cCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9iamVjdHMgaW4gc2NlbmVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFudGktYWxpYXMgdGhyZWVqcyByZW5kZXJlclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyBpbnNwZWN0YWJsZSAoZm9yIFRocmVlSlMgaW5zcGVjdG9yKVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFkZCBsaWdodHMgYXV0b21hdGljYWxseT9cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hdXRvbGlnaHQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcHBsaWNhdGlvbiBzY29wZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVnaXN0ZXIgYXBwbGljYXRpb24gc2NvcGVcbiAgICAgKiBAcGFyYW0gc2NvcGVcbiAgICAgKi9cbiAgICByZWdpc3RlckFwcGxpY2F0aW9uKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uID0gc2NvcGU7XG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24ub25DcmVhdGUodGhpcywgdGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdG8gc2NlbmVcbiAgICAgKiBAcGFyYW0gb2JqZWN0c1xuICAgICAqL1xuICAgIGFkZE9iamVjdHMob2JqZWN0cykge1xuICAgICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3RzID0gW29iamVjdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChvYmplY3RzW2NdKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2NdLmNyZWF0ZSh0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdPYmplY3RzID0gb2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3NjZW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lRGF0YVVSSSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzY2VuZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbnNwZWN0YWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2FudGlhbGlhcycpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdhdXRvbGlnaHQnKSkge1xuICAgICAgICAgICAgdGhpcy5fYXV0b2xpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGNyZWF0ZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5mb3JtYXRQYWdlKCk7XG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLnBhcnNlQXR0cmlidXRlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcblxuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMuc2V0dXBTdGFnZSgpO1xuICAgICAgICB0aGlzLmluaXQzRFNjZW5lKCk7XG4gICAgfVxuICAgIFxuICAgIHNldHVwU3RhZ2UoKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZXRWUkRpc3BsYXlzKCkudGhlbiggZGlzcGxheXMgPT4gdGhpcy5vblZSRGlzcGxheXMoZGlzcGxheXMpKTtcbiAgICB9XG5cbiAgICBvblZSRGlzcGxheXMoZGlzcGxheXMpIHtcbiAgICAgICAgaWYgKGRpc3BsYXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3ZyRGlzcGxheSA9IGRpc3BsYXlzWzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ215IGRpc3BsYXknLCB0aGlzLl92ckRpc3BsYXkpO1xuICAgICAgICAgICAgdGhpcy5fdnJEaXNwbGF5LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtYXRQYWdlKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlclxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0aW1lT2JqID0geyBub3c6IG5vdywgZGVsdGE6IG5vdyAtIHRoaXMudGltZSB9O1xuICAgICAgICB0aGlzLnRpbWUgPSBub3c7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2sgJiYgdGhpcy5fYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uLm9uUHJlUmVuZGVyKHRpbWVPYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVWUkVmZmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLm1hbmFnZXIucmVuZGVyKCB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLCB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9zY2VuZU9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0c1tjXS5yZW5kZXIodGltZU9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcG9zdFJlbmRlckNhbGxiYWNrICYmIHRoaXMuX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vblJlbmRlcih0aW1lT2JqKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92ckRpc3BsYXkucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGUgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAzRCBzY2VuZVxuICAgICAqL1xuICAgIGluaXQzRFNjZW5lKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigge2FudGlhbGlhczogdGhpcy5fYW50aWFsaWFzfSApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCggdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5kb21FbGVtZW50ICk7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYSA9IG5ldyBWUkNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSA9IHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEuZ2V0VGhyZWVDYW1lcmEoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5jYW1lcmEpO1xuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdCA9IG5ldyBUSFJFRS5WUkVmZmVjdCh0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLm1hbmFnZXIgPSBuZXcgV2ViVlJNYW5hZ2VyKHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIsIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LCB7aGlkZUJ1dHRvbjogZmFsc2UsIGlzVW5kaXN0b3J0ZWQ6ZmFsc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Z1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDUwKTtcbiAgICAgICAgICAgIHRoaXMuYXhlcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLmF4ZXMpO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZFhaID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZChncmlkWFopO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2F1dG9saWdodCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQucG9zaXRpb24uc2V0KDEwMCwyNTAsMTAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayAmJiB0aGlzLl9hcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24ub25DcmVhdGUodGhpcywgdGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ09iamVjdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fcGVuZGluZ09iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3b2JqID0gdGhpcy5fcGVuZGluZ09iamVjdHNbY107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gobmV3b2JqKTtcbiAgICAgICAgICAgICAgICBuZXdvYmouY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93LnNjZW5lID0gdGhpcy5fY29sbGVjdGlvbi5zY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVWUkVmZmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgZGV0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaGVkQ2FsbGJhY2soKSB7fTtcblxuICAgIC8qKlxuICAgICAqIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHIgYXR0cmlidXRlIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbCBvbGQgdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbCBuZXcgdmFsdWVcbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgb2xkVmFsLCBuZXdWYWwpIHt9O1xufVxuIl19
