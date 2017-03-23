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
                this._vrDisplay.requestAnimationFrame(function () {
                    return _this4.render();
                });
            }
        }

        /**
         * take care of style and meta-tags
         */

    }, {
        key: 'formatPage',
        value: function formatPage() {
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

    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var now = Date.now();
            var timeObj = { now: now, delta: now - this.time };
            this.time = now;

            this._collection.vrcamera.render();

            if (this._application) {
                this._application.onPreRender(timeObj);
            }

            this._collection.manager.render(this._collection.scene, this._collection.camera);

            for (var c = 0; c < this._sceneObjects.length; c++) {
                this._sceneObjects[c].render(timeObj);
            }

            if (this._application) {
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

            this._collection.effect = new THREE.VREffect(this._collection.renderer);
            this._collection.effect.setSize(window.innerWidth, window.innerHeight);
            this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, { hideButton: false, isUndistorted: false });

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
    }, {
        key: 'onResize',
        value: function onResize(event) {
            this._collection.renderer.setSize(window.innerWidth, window.innerHeight);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS1kZWJ1Zy5qcyIsInNyYy92cnNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJLEFDQXFCLHVCQUNqQjtBQUdBOzs7d0JBQWM7OEJBQ1Y7O2FBQUEsQUFBSyxPQUFPLEVBQUUsU0FBZCxBQUFZLEFBQVcsQUFDdkI7YUFBQSxBQUFLLFVBQVUsSUFBSSxNQUFKLEFBQVUsa0JBQVYsQUFBNEIsSUFBSSxPQUFBLEFBQU8sYUFBYSxPQUFwRCxBQUEyRCxhQUEzRCxBQUF3RSxLQUF2RixBQUFlLEFBQTZFLEFBQzVGO2FBQUEsQUFBSyxZQUFZLElBQUksTUFBSixBQUFVLFdBQVcsS0FBdEMsQUFBaUIsQUFBMEIsQUFDM0M7YUFBQSxBQUFLLFVBQUwsQUFBZSxXQUFmLEFBQTBCLEFBQzdCO0FBRUQ7Ozs7Ozs7O2lDQUdTLEFBQ0w7Z0JBQUksS0FBQSxBQUFLLEtBQVQsQUFBYyxTQUFTLEFBQ25CO3FCQUFBLEFBQUssQUFDUDtBQUZGLG1CQUVRLEFBQ0o7cUJBQUEsQUFBSyxVQUFMLEFBQWUsQUFDakI7QUFDTDtBQUVEOzs7Ozs7Ozs7eUNBSWlCLEFBQ2I7bUJBQU8sS0FBUCxBQUFZLEFBQ2Y7QUFFRDs7Ozs7Ozs7OztvQyxBQUtZO2dCQUNKLENBQUosQUFBSyxRQUFRLEFBQUU7eUJBQUEsQUFBUyxBQUFLO0FBQzdCO2lCQUFBLEFBQUssS0FBTCxBQUFVLFdBQVcsT0FBQSxBQUFPLFdBQVcsT0FBbEIsQUFBeUIsV0FBOUMsQUFBeUQsQUFDekQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sWUFBWSxPQUFuQixBQUEwQixZQUFoRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLEtBQUwsQUFBVSxZQUFZLE9BQUEsQUFBTyxRQUFRLE9BQWYsQUFBc0IsUUFBNUMsQUFBb0Qs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QW9CLEFBQ3ZCOzs7O2lDLEFBRVEsT0FBTyxBQUNaO2lCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixRQUFRLE9BQWxDLEFBQXlDLFlBQVksT0FBckQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLFNBQVMsT0FBQSxBQUFPLGFBQWEsT0FBckQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLEFBQzNCO0FBRUQ7Ozs7Ozs7OzsyQ0FJbUIsQUFBRTs7YUFFckI7Ozs7Ozs7OztpRCxBQU95QixNLEFBQU0sUSxBQUFRLFFBQVEsQUFBRTs7OztFLEFBaFN4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNhbWVyYSB7XG4gICAgLyoqXG4gICAgICogYy10b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fb29iID0geyBfYWN0aXZlOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jYW1lcmEpO1xuICAgICAgICB0aGlzLl9jb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGNhbWVyYSBmb3Igc2NlbmVcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vdXRPZkJvZHlSZW5kZXIoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcm9vdCBUSFJFRS5qcyBjYW1lcmEgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmF8KnxQZXJzcGVjdGl2ZUNhbWVyYXxFYX1cbiAgICAgKi9cbiAgICBnZXRUaHJlZUNhbWVyYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbWVyYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBydW4gb3V0IG9mIGJvZHkgY3ljbGUgZm9yIHZpc3VhbCBkZWJ1Z2dpbmdcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGdvT3V0T2ZCb2R5KHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxuICAgICAgICB0aGlzLl9vb2IudmVsb2NpdHkgPSBwYXJhbXMudmVsb2NpdHkgPyBwYXJhbXMudmVsb2NpdHkgOiAxO1xuICAgICAgICB0aGlzLl9vb2IubWF4SGVpZ2h0ID0gcGFyYW1zLm1heEhlaWdodCA/IHBhcmFtcy5tYXhIZWlnaHQgOiAxMDA7XG4gICAgICAgIHRoaXMuX29vYi5ob3ZlclRpbWUgPSBwYXJhbXMuaG92ZXIgPyBwYXJhbXMuaG92ZXIgOiAyMDA7XG4gICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IDA7XG4gICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uID0gMTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFhSb3QgPSB0aGlzLl9jYW1lcmEucm90YXRpb24ueDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb29iOyAvLyBuaWNlIHRvIGxldCBjb25zdW1lcnMga25vdyB3aGF0IHJhbmRvbSBzdHVmZiB3ZSdyZSBpbmplY3RpbmdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY3ljbGUgZm9yIG91dCBvZiBib2R5IG1vdmVtZW50XG4gICAgICovXG4gICAgb3V0T2ZCb2R5UmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb29iLl9ob3ZlcmluZyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgLS07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm90YXRpb25JbmNyZW1lbnQgPSAtKC1NYXRoLlBJLzIgLSB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCkgLyAodGhpcy5fb29iLm1heEhlaWdodC90aGlzLl9vb2IudmVsb2NpdHkpO1xuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueSArPSB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqIHRoaXMuX29vYi52ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnJvdGF0aW9uLnggLT0gcm90YXRpb25JbmNyZW1lbnQgKiB0aGlzLl9vb2IuX2RpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPiB0aGlzLl9vb2IubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgPSB0aGlzLl9vb2IuaG92ZXJUaW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55IDwgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5fb29iLl9vcmlnaW5hbFlQb3M7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFZSU2NlbmUgZnJvbSAnLi92cnNjZW5lLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBWUlNjZW5lIHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGRlZmF1bHQgY2xhc3MgcHJvcGVydGllc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgc3VwZXIuc2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZWJ1ZyB2aWV3XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZGVidWdWaWV3ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG91dCBvZiBib2R5IHRyaWdnZXIga2V5IGNvZGUgKHNldHRhYmxlIHZpYSBlbGVtZW50IGF0dHJpYnV0ZXMpXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vdXRPZkJvZHlLZXlDb2RlID0gMzI7IC8vIHNwYWNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFyc2UgYXR0cmlidXRlcyBvbiBlbGVtZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYXJzZUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHN1cGVyLnBhcnNlQXR0cmlidXRlcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnZGVidWd2aWV3JykpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ291dG9mYm9keWtleWNvZGUnKSkge1xuICAgICAgICAgICAgdGhpcy5fb3V0T2ZCb2R5S2V5Q29kZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdvdXRvZmJvZHlrZXljb2RlJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBhdHRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuYXR0YWNoZWRDYWxsYmFjaygpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4gdGhpcy5vbktleURvd24oZXZlbnQpKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IHBhcnNlSW50KHRoaXMuX291dE9mQm9keUtleUNvZGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLmdvT3V0T2ZCb2R5KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVlJDYW1lcmEgZnJvbSAnLi92cmNhbWVyYS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY3VycmVudCB0aW1lIHN0YW1wXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjdXJyZW50IHZyIGRpc3BsYXlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3ZyRGlzcGxheTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb2JqZWN0cyBpbiBzY2VuZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW50aS1hbGlhcyB0aHJlZWpzIHJlbmRlcmVyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzIGluc3BlY3RhYmxlIChmb3IgVGhyZWVKUyBpbnNwZWN0b3IpXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5zcGVjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYWRkIGxpZ2h0cyBhdXRvbWF0aWNhbGx5P1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2F1dG9saWdodCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBpbml0aWFsaXplZFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFwcGxpY2F0aW9uIHNjb3BlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWdpc3RlciBhcHBsaWNhdGlvbiBzY29wZVxuICAgICAqIEBwYXJhbSBzY29wZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyQXBwbGljYXRpb24oc2NvcGUpIHtcbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb24gPSBzY29wZTtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uLm9uQ3JlYXRlKHRoaXMsIHRoaXMuX2NvbGxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIHRvIHNjZW5lXG4gICAgICogQHBhcmFtIG9iamVjdHNcbiAgICAgKi9cbiAgICBhZGRPYmplY3RzKG9iamVjdHMpIHtcbiAgICAgICAgaWYgKCFvYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0cyA9IFtvYmplY3RzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBvYmplY3RzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gob2JqZWN0c1tjXSk7XG4gICAgICAgICAgICAgICAgb2JqZWN0c1tjXS5jcmVhdGUodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IG9iamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXJzZSBhdHRyaWJ1dGVzIG9uIGVsZW1lbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhcnNlQXR0cmlidXRlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdzY2VuZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZURhdGFVUkkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2NlbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnaW5zcGVjdGFibGUnKSkge1xuICAgICAgICAgICAgdGhpcy5faW5zcGVjdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdhbnRpYWxpYXMnKSkge1xuICAgICAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0b2xpZ2h0JykpIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dG9saWdodCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBjcmVhdGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0UGFnZSgpO1xuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5wYXJzZUF0dHJpYnV0ZXMoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBhdHRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3ZyZGlzcGxheXByZXNlbnRjaGFuZ2UnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG5cbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdyZWFkeScpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLnNldHVwU3RhZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0M0RTY2VuZSgpO1xuICAgIH1cbiAgICBcbiAgICBzZXR1cFN0YWdlKCkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VlJEaXNwbGF5cygpLnRoZW4oIGRpc3BsYXlzID0+IHRoaXMub25WUkRpc3BsYXlzKGRpc3BsYXlzKSk7XG4gICAgfVxuXG4gICAgb25WUkRpc3BsYXlzKGRpc3BsYXlzKSB7XG4gICAgICAgIGlmIChkaXNwbGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl92ckRpc3BsYXkgPSBkaXNwbGF5c1swXTtcbiAgICAgICAgICAgIHRoaXMuX3ZyRGlzcGxheS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGFrZSBjYXJlIG9mIHN0eWxlIGFuZCBtZXRhLXRhZ3NcbiAgICAgKi9cbiAgICBmb3JtYXRQYWdlKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgICAgIHZhciBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBtZXRhLmNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG1ldGEpO1xuXG4gICAgICAgIG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGEubmFtZSA9ICd2aWV3cG9ydCc7XG4gICAgICAgIG1ldGEuY29udGVudCA9ICd3aWR0aD1kZXZpY2Utd2lkdGgsIHVzZXItc2NhbGFibGU9bm8sIG1pbmltdW0tc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEuMCwgc2hyaW5rLXRvLWZpdD1ubyc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobWV0YSk7XG5cbiAgICAgICAgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgbWV0YS5uYW1lID0gJ21vYmlsZS13ZWItYXBwLWNhcGFibGUnO1xuICAgICAgICBtZXRhLmNvbnRlbnQgPSAneWVzJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChtZXRhKTtcblxuICAgICAgICBtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICBtZXRhLm5hbWUgPSAnYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZSc7XG4gICAgICAgIG1ldGEuY29udGVudCA9ICd5ZXMnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG1ldGEpO1xuXG4gICAgICAgIG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtZXRhJyk7XG4gICAgICAgIG1ldGEubmFtZSA9ICdhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlJztcbiAgICAgICAgbWV0YS5jb250ZW50ID0gJ2JsYWNrLXRyYW5zbHVjZW50JztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChtZXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXJcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgdGltZU9iaiA9IHsgbm93OiBub3csIGRlbHRhOiBub3cgLSB0aGlzLnRpbWUgfTtcbiAgICAgICAgdGhpcy50aW1lID0gbm93O1xuXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24udnJjYW1lcmEucmVuZGVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vblByZVJlbmRlcih0aW1lT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG5cbiAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9zY2VuZU9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0c1tjXS5yZW5kZXIodGltZU9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uLm9uUmVuZGVyKHRpbWVPYmopO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZyRGlzcGxheS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSA9PiB0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIDNEIHNjZW5lXG4gICAgICovXG4gICAgaW5pdDNEU2NlbmUoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7YW50aWFsaWFzOiB0aGlzLl9hbnRpYWxpYXN9ICk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKCB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhID0gbmV3IFZSQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhID0gdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5nZXRUaHJlZUNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QgPSBuZXcgVEhSRUUuVlJFZmZlY3QodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlcik7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Z1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDUwKTtcbiAgICAgICAgICAgIHRoaXMuYXhlcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLmF4ZXMpO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZFhaID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZChncmlkWFopO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2F1dG9saWdodCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQucG9zaXRpb24uc2V0KDEwMCwyNTAsMTAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5zY2VuZUNvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24udnJTY2VuZSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vbkNyZWF0ZSh0aGlzLCB0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nT2JqZWN0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9wZW5kaW5nT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdvYmogPSB0aGlzLl9wZW5kaW5nT2JqZWN0c1tjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChuZXdvYmopO1xuICAgICAgICAgICAgICAgIG5ld29iai5jcmVhdGUodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3BlY3RhYmxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2NlbmUgPSB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGRldGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXRhY2hlZENhbGxiYWNrKCkge307XG5cbiAgICAvKipcbiAgICAgKiBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyIGF0dHJpYnV0ZSBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWwgb2xkIHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWwgbmV3IHZhbHVlXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7fTtcbn1cbiJdfQ==
