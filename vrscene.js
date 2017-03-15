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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQ0FxQix1QkFDakI7QUFHQTs7O3dCQUFjOzhCQUNWOzthQUFBLEFBQUssT0FBTyxFQUFFLFNBQWQsQUFBWSxBQUFXLEFBQ3ZCO2FBQUEsQUFBSyxVQUFVLElBQUksTUFBSixBQUFVLGtCQUFWLEFBQTRCLElBQUksT0FBQSxBQUFPLGFBQWEsT0FBcEQsQUFBMkQsYUFBM0QsQUFBd0UsS0FBdkYsQUFBZSxBQUE2RSxBQUM1RjthQUFBLEFBQUssWUFBWSxJQUFJLE1BQUosQUFBVSxXQUFXLEtBQXRDLEFBQWlCLEFBQTBCLEFBQzNDO2FBQUEsQUFBSyxVQUFMLEFBQWUsV0FBZixBQUEwQixBQUM3QjtBQUVEOzs7Ozs7OztpQ0FHUyxBQUNMO2dCQUFJLEtBQUEsQUFBSyxLQUFULEFBQWMsU0FBUyxBQUNuQjtxQkFBQSxBQUFLLEFBQ1A7QUFGRixtQkFFUSxBQUNKO3FCQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2pCO0FBQ0w7QUFFRDs7Ozs7Ozs7O3lDQUlpQixBQUNiO21CQUFPLEtBQVAsQUFBWSxBQUNmO0FBRUQ7Ozs7Ozs7Ozs7b0MsQUFLWTtnQkFDSixDQUFKLEFBQUssUUFBUSxBQUFFO3lCQUFBLEFBQVMsQUFBSztBQUM3QjtpQkFBQSxBQUFLLEtBQUwsQUFBVSxXQUFXLE9BQUEsQUFBTyxXQUFXLE9BQWxCLEFBQXlCLFdBQTlDLEFBQXlELEFBQ3pEO2lCQUFBLEFBQUssS0FBTCxBQUFVLFlBQVksT0FBQSxBQUFPLFlBQVksT0FBbkIsQUFBMEIsWUFBaEQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sUUFBUSxPQUFmLEFBQXNCLFFBQTVDLEFBQW9ELEFBQ3BEO2lCQUFBLEFBQUssS0FBTCxB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QVMsT0FBQSxBQUFPLGFBQWEsT0FBckQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLEFBQzNCO0FBRUQ7Ozs7Ozs7OzsyQ0FJbUIsQUFBRTs7YUFFckI7Ozs7Ozs7OztpRCxBQU95QixNLEFBQU0sUSxBQUFRLFFBQVEsQUFBRTs7OztFLEFBOVJ4QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNhbWVyYSB7XG4gICAgLyoqXG4gICAgICogYy10b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fb29iID0geyBfYWN0aXZlOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jYW1lcmEpO1xuICAgICAgICB0aGlzLl9jb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGNhbWVyYSBmb3Igc2NlbmVcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vdXRPZkJvZHlSZW5kZXIoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcm9vdCBUSFJFRS5qcyBjYW1lcmEgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmF8KnxQZXJzcGVjdGl2ZUNhbWVyYXxFYX1cbiAgICAgKi9cbiAgICBnZXRUaHJlZUNhbWVyYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbWVyYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBydW4gb3V0IG9mIGJvZHkgY3ljbGUgZm9yIHZpc3VhbCBkZWJ1Z2dpbmdcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGdvT3V0T2ZCb2R5KHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxuICAgICAgICB0aGlzLl9vb2IudmVsb2NpdHkgPSBwYXJhbXMudmVsb2NpdHkgPyBwYXJhbXMudmVsb2NpdHkgOiAxO1xuICAgICAgICB0aGlzLl9vb2IubWF4SGVpZ2h0ID0gcGFyYW1zLm1heEhlaWdodCA/IHBhcmFtcy5tYXhIZWlnaHQgOiAxMDA7XG4gICAgICAgIHRoaXMuX29vYi5ob3ZlclRpbWUgPSBwYXJhbXMuaG92ZXIgPyBwYXJhbXMuaG92ZXIgOiAyMDA7XG4gICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IDA7XG4gICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uID0gMTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFhSb3QgPSB0aGlzLl9jYW1lcmEucm90YXRpb24ueDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb29iOyAvLyBuaWNlIHRvIGxldCBjb25zdW1lcnMga25vdyB3aGF0IHJhbmRvbSBzdHVmZiB3ZSdyZSBpbmplY3RpbmdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY3ljbGUgZm9yIG91dCBvZiBib2R5IG1vdmVtZW50XG4gICAgICovXG4gICAgb3V0T2ZCb2R5UmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb29iLl9ob3ZlcmluZyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgLS07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm90YXRpb25JbmNyZW1lbnQgPSAtKC1NYXRoLlBJLzIgLSB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCkgLyAodGhpcy5fb29iLm1heEhlaWdodC90aGlzLl9vb2IudmVsb2NpdHkpO1xuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueSArPSB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqIHRoaXMuX29vYi52ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnJvdGF0aW9uLnggLT0gcm90YXRpb25JbmNyZW1lbnQgKiB0aGlzLl9vb2IuX2RpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPiB0aGlzLl9vb2IubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgPSB0aGlzLl9vb2IuaG92ZXJUaW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55IDwgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5fb29iLl9vcmlnaW5hbFlQb3M7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFZSQ2FtZXJhIGZyb20gJy4vdnJjYW1lcmEuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGRlZmF1bHQgY2xhc3MgcHJvcGVydGllc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGN1cnJlbnQgdGltZSBzdGFtcFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29sbGVjdGlvbiBvZiBzY2VuZSBvYmplY3RzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY3VycmVudCB2ciBkaXNwbGF5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl92ckRpc3BsYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHByZXJlbmRlciBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxCYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgcG9zdHJlbmRlciBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHNldHVwIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb2JqZWN0cyBpbiBzY2VuZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW50aS1hbGlhcyB0aHJlZWpzIHJlbmRlcmVyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzIGluc3BlY3RhYmxlIChmb3IgVGhyZWVKUyBpbnNwZWN0b3IpXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5zcGVjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYWRkIGxpZ2h0cyBhdXRvbWF0aWNhbGx5P1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2F1dG9saWdodCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBpbml0aWFsaXplZFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFwcGxpY2F0aW9uIHNjb3BlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWdpc3RlciBhcHBsaWNhdGlvbiBzY29wZVxuICAgICAqIEBwYXJhbSBzY29wZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyQXBwbGljYXRpb24oc2NvcGUpIHtcbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb24gPSBzY29wZTtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vbkNyZWF0ZSh0aGlzLCB0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0byBzY2VuZVxuICAgICAqIEBwYXJhbSBvYmplY3RzXG4gICAgICovXG4gICAgYWRkT2JqZWN0cyhvYmplY3RzKSB7XG4gICAgICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iamVjdHMgPSBbb2JqZWN0c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0cy5wdXNoKG9iamVjdHNbY10pO1xuICAgICAgICAgICAgICAgIG9iamVjdHNbY10uY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBvYmplY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFyc2UgYXR0cmlidXRlcyBvbiBlbGVtZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYXJzZUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnc2NlbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVEYXRhVVJJID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NjZW5lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2luc3BlY3RhYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYW50aWFsaWFzJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2F1dG9saWdodCcpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvbGlnaHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgY3JlYXRlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmZvcm1hdFBhZ2UoKTtcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMucGFyc2VBdHRyaWJ1dGVzKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgYXR0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCgncmVhZHknKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXR1cFN0YWdlKCk7XG4gICAgICAgIHRoaXMuaW5pdDNEU2NlbmUoKTtcbiAgICB9XG4gICAgXG4gICAgc2V0dXBTdGFnZSgpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFZSRGlzcGxheXMoKS50aGVuKCBkaXNwbGF5cyA9PiB0aGlzLm9uVlJEaXNwbGF5cyhkaXNwbGF5cykpO1xuICAgIH1cblxuICAgIG9uVlJEaXNwbGF5cyhkaXNwbGF5cykge1xuICAgICAgICBpZiAoZGlzcGxheXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdnJEaXNwbGF5ID0gZGlzcGxheXNbMF07XG4gICAgICAgICAgICB0aGlzLl92ckRpc3BsYXkucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB0aGlzLnJlbmRlcigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdFBhZ2UoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIHRpbWVPYmogPSB7IG5vdzogbm93LCBkZWx0YTogbm93IC0gdGhpcy50aW1lIH07XG4gICAgICAgIHRoaXMudGltZSA9IG5vdztcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLnJlbmRlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjayAmJiB0aGlzLl9hcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24ub25QcmVSZW5kZXIodGltZU9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aW1lT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2sgJiYgdGhpcy5fYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uLm9uUmVuZGVyKHRpbWVPYmopO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZyRGlzcGxheS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSA9PiB0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIDNEIHNjZW5lXG4gICAgICovXG4gICAgaW5pdDNEU2NlbmUoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7YW50aWFsaWFzOiB0aGlzLl9hbnRpYWxpYXN9ICk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKCB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhID0gbmV3IFZSQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhID0gdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5nZXRUaHJlZUNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlVlJFZmZlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0ID0gbmV3IFRIUkVFLlZSRWZmZWN0KHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnVmlldykge1xuICAgICAgICAgICAgdGhpcy5heGVzID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoNTApO1xuICAgICAgICAgICAgdGhpcy5heGVzLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuYXhlcyk7XG5cbiAgICAgICAgICAgIHZhciBncmlkWFogPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigyMDAsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKGdyaWRYWik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYXV0b2xpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrICYmIHRoaXMuX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vbkNyZWF0ZSh0aGlzLCB0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nT2JqZWN0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9wZW5kaW5nT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdvYmogPSB0aGlzLl9wZW5kaW5nT2JqZWN0c1tjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChuZXdvYmopO1xuICAgICAgICAgICAgICAgIG5ld29iai5jcmVhdGUodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3BlY3RhYmxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2NlbmUgPSB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBkZXRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoZWRDYWxsYmFjaygpIHt9O1xuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59XG4iXX0=
