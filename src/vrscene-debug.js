(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TrivrScene = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var _vrscene = require('./vrscene.es6');

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

},{"./vrscene.es6":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var _vrcamera = require('./vrcamera.es6');

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
        }
    }, {
        key: 'createdCallback',

        /**
         * element created callback
         * @private
         */
        value: function createdCallback() {
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
                this._preRenderCallback(timeObj, this._collection, this._customCollection);
            }

            if (this._disableVREffect) {
                this._collection.renderer.render(this._collection.scene, this._collection.camera);
            } else {
                this._collection.manager.render(this._collection.scene, this._collection.camera);
            }

            for (var c = 0; c < this._sceneObjects.length; c++) {
                this._sceneObjects[c].render(timeObj, this._collection, this._customCollection);
            }

            if (this._postRenderCallback) {
                this._postRenderCallback(timeObj, this._collection, this._customCollection);
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

                this._collection.light = new THREE.PointLight(0xffffff);
                this._collection.light.position.set(100, 250, 100);
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

},{"./vrcamera.es6":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuZXM2Iiwic3JjL3Zyc2NlbmUtZGVidWcuZXM2Iiwic3JjL3Zyc2NlbmUuZXM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFDQXFCLHVCQUNqQjtBQUdBOzs7d0JBQWM7OEJBQ1Y7O2FBQUEsQUFBSyxPQUFPLEVBQUUsU0FBZCxBQUFZLEFBQVcsQUFDdkI7YUFBQSxBQUFLLFVBQVUsSUFBSSxNQUFKLEFBQVUsa0JBQVYsQUFBNEIsSUFBSSxPQUFBLEFBQU8sYUFBYSxPQUFwRCxBQUEyRCxhQUEzRCxBQUF3RSxLQUF2RixBQUFlLEFBQTZFLEFBQzVGO2FBQUEsQUFBSyxZQUFZLElBQUksTUFBSixBQUFVLFdBQVcsS0FBdEMsQUFBaUIsQUFBMEIsQUFDM0M7YUFBQSxBQUFLLFVBQUwsQUFBZSxXQUFmLEFBQTBCLEFBQzdCO0FBRUQ7Ozs7Ozs7O2lDQUdTLEFBQ0w7Z0JBQUksS0FBQSxBQUFLLEtBQVQsQUFBYyxTQUFTLEFBQ25CO3FCQUFBLEFBQUssQUFDUDtBQUZGLG1CQUVRLEFBQ0o7cUJBQUEsQUFBSyxVQUFMLEFBQWUsQUFDakI7QUFDTDtBQUVEOzs7Ozs7Ozs7eUNBSWlCLEFBQ2I7bUJBQU8sS0FBUCxBQUFZLEFBQ2Y7QUFFRDs7Ozs7Ozs7OztvQyxBQUtZO2dCQUNKLENBQUosQUFBSyxRQUFRLEFBQUU7eUJBQUEsQUFBUyxBQUFLO0FBQzdCO2lCQUFBLEFBQUssS0FBTCxBQUFVLFdBQVcsT0FBQSxBQUFPLFdBQVcsT0FBbEIsQUFBeUIsV0FBOUMsQUFBeUQsQUFDekQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sWUFBWSxPQUFuQixBQUEwQixZQUFoRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLEtBQUwsQUFBVSxZQUFZLE9BQUEsQUFBTyxR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T0FBakIsQUFBd0IsU0FBUyxPQUFBLEFBQU8sYUFBYSxPQUFyRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsQUFDM0I7QUFFRDs7Ozs7Ozs7OzJDQUltQixBQUFFOzthQUdyQjs7Ozs7Ozs7O2lELEFBT3lCLE0sQUFBTSxRLEFBQVEsUUFBUSxBQUFFOzs7MEIsQUEzTGpDLElBQUksQUFDaEI7aUJBQUEsQUFBSyxxQkFBTCxBQUEwQixBQUM3QjtBQUVEOzs7Ozs7Ozs7MEIsQUFJaUIsSUFBSSxBQUNqQjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCO0FBRUQ7Ozs7Ozs7OzswQixBQUlhLElBQUksQUFDYjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCOzs7OztFLEFBL0Z3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNhbWVyYSB7XG4gICAgLyoqXG4gICAgICogYy10b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fb29iID0geyBfYWN0aXZlOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jYW1lcmEpO1xuICAgICAgICB0aGlzLl9jb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGNhbWVyYSBmb3Igc2NlbmVcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vdXRPZkJvZHlSZW5kZXIoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcm9vdCBUSFJFRS5qcyBjYW1lcmEgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmF8KnxQZXJzcGVjdGl2ZUNhbWVyYXxFYX1cbiAgICAgKi9cbiAgICBnZXRUaHJlZUNhbWVyYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbWVyYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBydW4gb3V0IG9mIGJvZHkgY3ljbGUgZm9yIHZpc3VhbCBkZWJ1Z2dpbmdcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGdvT3V0T2ZCb2R5KHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxuICAgICAgICB0aGlzLl9vb2IudmVsb2NpdHkgPSBwYXJhbXMudmVsb2NpdHkgPyBwYXJhbXMudmVsb2NpdHkgOiAxO1xuICAgICAgICB0aGlzLl9vb2IubWF4SGVpZ2h0ID0gcGFyYW1zLm1heEhlaWdodCA/IHBhcmFtcy5tYXhIZWlnaHQgOiAxMDA7XG4gICAgICAgIHRoaXMuX29vYi5ob3ZlclRpbWUgPSBwYXJhbXMuaG92ZXIgPyBwYXJhbXMuaG92ZXIgOiAyMDA7XG4gICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IDA7XG4gICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uID0gMTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFhSb3QgPSB0aGlzLl9jYW1lcmEucm90YXRpb24ueDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb29iOyAvLyBuaWNlIHRvIGxldCBjb25zdW1lcnMga25vdyB3aGF0IHJhbmRvbSBzdHVmZiB3ZSdyZSBpbmplY3RpbmdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY3ljbGUgZm9yIG91dCBvZiBib2R5IG1vdmVtZW50XG4gICAgICovXG4gICAgb3V0T2ZCb2R5UmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb29iLl9ob3ZlcmluZyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgLS07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm90YXRpb25JbmNyZW1lbnQgPSAtKC1NYXRoLlBJLzIgLSB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCkgLyAodGhpcy5fb29iLm1heEhlaWdodC90aGlzLl9vb2IudmVsb2NpdHkpO1xuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueSArPSB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqIHRoaXMuX29vYi52ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnJvdGF0aW9uLnggLT0gcm90YXRpb25JbmNyZW1lbnQgKiB0aGlzLl9vb2IuX2RpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPiB0aGlzLl9vb2IubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgPSB0aGlzLl9vb2IuaG92ZXJUaW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55IDwgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5fb29iLl9vcmlnaW5hbFlQb3M7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFZSU2NlbmUgZnJvbSAnLi92cnNjZW5lLmVzNic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVlJTY2VuZSB7XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBkZWZhdWx0IGNsYXNzIHByb3BlcnRpZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHN1cGVyLnNldFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGVidWcgdmlld1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkaXNhYmxlIFZSIHJlbmRlcmVyL2VmZmVjdFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2Rpc2FibGVWUkVmZmVjdCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvdXQgb2YgYm9keSB0cmlnZ2VyIGtleSBjb2RlIChzZXR0YWJsZSB2aWEgZWxlbWVudCBhdHRyaWJ1dGVzKVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSA9IDMyOyAvLyBzcGFjZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBzdXBlci5wYXJzZUF0dHJpYnV0ZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2RlYnVndmlldycpKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdkaXNhYmxldnInKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZVZSRWZmZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnb3V0b2Zib2R5a2V5Y29kZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9vdXRPZkJvZHlLZXlDb2RlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ291dG9mYm9keWtleWNvZGUnKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5hdHRhY2hlZENhbGxiYWNrKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gcGFyc2VJbnQodGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEuZ29PdXRPZkJvZHkoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBWUkNhbWVyYSBmcm9tICcuL3ZyY2FtZXJhLmVzNic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY3VycmVudCB0aW1lIHN0YW1wXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHMgZGVmaW5lZCBieSBjb21wb25lbnQgdXNlcnNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwcmVyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHBvc3RyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBzZXR1cCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9iamVjdHMgaW4gc2NlbmVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFudGktYWxpYXMgdGhyZWVqcyByZW5kZXJlclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyBpbnNwZWN0YWJsZSAoZm9yIFRocmVlSlMgaW5zcGVjdG9yKVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvblByZVJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uUG9zdFJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvbkNyZWF0ZShjYikge1xuICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdG8gc2NlbmVcbiAgICAgKiBAcGFyYW0gb2JqZWN0c1xuICAgICAqL1xuICAgIGFkZE9iamVjdHMob2JqZWN0cykge1xuICAgICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3RzID0gW29iamVjdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChvYmplY3RzW2NdKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2NdLmNyZWF0ZSh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdPYmplY3RzID0gb2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3NjZW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lRGF0YVVSSSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzY2VuZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbnNwZWN0YWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2FudGlhbGlhcycpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgY3JlYXRlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5wYXJzZUF0dHJpYnV0ZXMoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBhdHRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncmVhZHknKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5pbml0M0RTY2VuZSgpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlclxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0aW1lT2JqID0geyBub3c6IG5vdywgZGVsdGE6IG5vdyAtIHRoaXMudGltZSB9O1xuICAgICAgICB0aGlzLnRpbWUgPSBub3c7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxiYWNrKCB0aW1lT2JqLCB0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlciggdGltZU9iaiwgdGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbiApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcG9zdFJlbmRlckNhbGxiYWNrKCB0aW1lT2JqLCB0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uICk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShlID0+IHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgM0Qgc2NlbmVcbiAgICAgKi9cbiAgICBpbml0M0RTY2VuZSgpIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoIHthbnRpYWxpYXM6IHRoaXMuX2FudGlhbGlhc30gKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQoIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuZG9tRWxlbWVudCApO1xuXG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYSA9IG5ldyBWUkNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSA9IHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEuZ2V0VGhyZWVDYW1lcmEoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5jYW1lcmEpO1xuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdCA9IG5ldyBUSFJFRS5WUkVmZmVjdCh0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLm1hbmFnZXIgPSBuZXcgV2ViVlJNYW5hZ2VyKHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIsIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LCB7aGlkZUJ1dHRvbjogZmFsc2UsIGlzVW5kaXN0b3J0ZWQ6ZmFsc2V9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Z1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDUwKTtcbiAgICAgICAgICAgIHRoaXMuYXhlcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLmF4ZXMpO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZFhaID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZChncmlkWFopO1xuXG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ09iamVjdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fcGVuZGluZ09iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3b2JqID0gdGhpcy5fcGVuZGluZ09iamVjdHNbY107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gobmV3b2JqKTtcbiAgICAgICAgICAgICAgICBuZXdvYmouY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24sIHRoaXMuX2N1c3RvbUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93LnNjZW5lID0gdGhpcy5fY29sbGVjdGlvbi5zY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVWUkVmZmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgZGV0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaGVkQ2FsbGJhY2soKSB7fTtcblxuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59XG4iXX0=
