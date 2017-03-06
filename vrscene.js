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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQ0FxQix1QkFDakI7QUFHQTs7O3dCQUFjOzhCQUNWOzthQUFBLEFBQUssT0FBTyxFQUFFLFNBQWQsQUFBWSxBQUFXLEFBQ3ZCO2FBQUEsQUFBSyxVQUFVLElBQUksTUFBSixBQUFVLGtCQUFWLEFBQTRCLElBQUksT0FBQSxBQUFPLGFBQWEsT0FBcEQsQUFBMkQsYUFBM0QsQUFBd0UsS0FBdkYsQUFBZSxBQUE2RSxBQUM1RjthQUFBLEFBQUssWUFBWSxJQUFJLE1BQUosQUFBVSxXQUFXLEtBQXRDLEFBQWlCLEFBQTBCLEFBQzNDO2FBQUEsQUFBSyxVQUFMLEFBQWUsV0FBZixBQUEwQixBQUM3QjtBQUVEOzs7Ozs7OztpQ0FHUyxBQUNMO2dCQUFJLEtBQUEsQUFBSyxLQUFULEFBQWMsU0FBUyxBQUNuQjtxQkFBQSxBQUFLLEFBQ1A7QUFGRixtQkFFUSxBQUNKO3FCQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2pCO0FBQ0w7QUFFRDs7Ozs7Ozs7O3lDQUlpQixBQUNiO21CQUFPLEtBQVAsQUFBWSxBQUNmO0FBRUQ7Ozs7Ozs7Ozs7b0MsQUFLWTtnQkFDSixDQUFKLEFBQUssUUFBUSxBQUFFO3lCQUFBLEFBQVMsQUFBSztBQUM3QjtpQkFBQSxBQUFLLEtBQUwsQUFBVSxXQUFXLE9BQUEsQUFBTyxXQUFXLE9BQWxCLEFBQXlCLFdBQTlDLEFBQXlELEFBQ3pEO2lCQUFBLEFBQUssS0FBTCxBQUFVLFlBQVksT0FBQSxBQUFPLFlBQVksT0FBbkIsQUFBMEIsWUFBaEQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sUUFBUSxPQUFmLEFBQXNCLFFBQTVDLEFBQW9ELEFBQ3BEO2lCQUFBLEFBQUssS0FBTCxB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S0FBSixBQUFTLGNBQWMsQUFDbkI7dUJBQUEsQUFBTyxRQUFRLEtBQUEsQUFBSyxZQUFwQixBQUFnQyxBQUNuQztBQUVEOztpQkFBQSxBQUFLLGVBQUwsQUFBb0IsQUFDdkI7Ozs7aUMsQUFFUSxPQUFPLEFBQ1o7Z0JBQUksQ0FBQyxLQUFMLEFBQVUsa0JBQWtCLEFBQ3hCO3FCQUFBLEFBQUssWUFBTCxBQUFpQixPQUFqQixBQUF3QixRQUFRLE9BQWhDLEFBQXVDLFlBQVksT0FBbkQsQUFBMEQsQUFDN0Q7QUFGRCxtQkFFTyxBQUNIO3FCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixRQUFRLE9BQWxDLEFBQXlDLFlBQVksT0FBckQsQUFBNEQsQUFDL0Q7QUFDRDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsU0FBUyxPQUFBLEFBQU8sYUFBYSxPQUFyRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsQUFDM0I7QUFFRDs7Ozs7Ozs7OzJDQUltQixBQUFFOzthQUdyQjs7Ozs7Ozs7O2lELEFBT3lCLE0sQUFBTSxRLEFBQVEsUUFBUSxBQUFFOzs7MEIsQUExTWpDLElBQUksQUFDaEI7aUJBQUEsQUFBSyxxQkFBTCxBQUEwQixBQUM3QjtBQUVEOzs7Ozs7Ozs7MEIsQUFJaUIsSUFBSSxBQUNqQjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCO0FBRUQ7Ozs7Ozs7OzswQixBQUlhLElBQUksQUFDYjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCOzs7OztFLEFBL0Z3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWUkNhbWVyYSB7XG4gICAgLyoqXG4gICAgICogYy10b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fb29iID0geyBfYWN0aXZlOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLl9jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jYW1lcmEpO1xuICAgICAgICB0aGlzLl9jb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGNhbWVyYSBmb3Igc2NlbmVcbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vdXRPZkJvZHlSZW5kZXIoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcm9vdCBUSFJFRS5qcyBjYW1lcmEgaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmF8KnxQZXJzcGVjdGl2ZUNhbWVyYXxFYX1cbiAgICAgKi9cbiAgICBnZXRUaHJlZUNhbWVyYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbWVyYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBydW4gb3V0IG9mIGJvZHkgY3ljbGUgZm9yIHZpc3VhbCBkZWJ1Z2dpbmdcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGdvT3V0T2ZCb2R5KHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxuICAgICAgICB0aGlzLl9vb2IudmVsb2NpdHkgPSBwYXJhbXMudmVsb2NpdHkgPyBwYXJhbXMudmVsb2NpdHkgOiAxO1xuICAgICAgICB0aGlzLl9vb2IubWF4SGVpZ2h0ID0gcGFyYW1zLm1heEhlaWdodCA/IHBhcmFtcy5tYXhIZWlnaHQgOiAxMDA7XG4gICAgICAgIHRoaXMuX29vYi5ob3ZlclRpbWUgPSBwYXJhbXMuaG92ZXIgPyBwYXJhbXMuaG92ZXIgOiAyMDA7XG4gICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IDA7XG4gICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uID0gMTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MgPSB0aGlzLl9jYW1lcmEucG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fb29iLl9vcmlnaW5hbFhSb3QgPSB0aGlzLl9jYW1lcmEucm90YXRpb24ueDtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb29iOyAvLyBuaWNlIHRvIGxldCBjb25zdW1lcnMga25vdyB3aGF0IHJhbmRvbSBzdHVmZiB3ZSdyZSBpbmplY3RpbmdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY3ljbGUgZm9yIG91dCBvZiBib2R5IG1vdmVtZW50XG4gICAgICovXG4gICAgb3V0T2ZCb2R5UmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5fb29iLl9ob3ZlcmluZyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgLS07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm90YXRpb25JbmNyZW1lbnQgPSAtKC1NYXRoLlBJLzIgLSB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCkgLyAodGhpcy5fb29iLm1heEhlaWdodC90aGlzLl9vb2IudmVsb2NpdHkpO1xuICAgICAgICB0aGlzLl9jYW1lcmEucG9zaXRpb24ueSArPSB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqIHRoaXMuX29vYi52ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnJvdGF0aW9uLnggLT0gcm90YXRpb25JbmNyZW1lbnQgKiB0aGlzLl9vb2IuX2RpcmVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPiB0aGlzLl9vb2IubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2RpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgICAgIHRoaXMuX29vYi5faG92ZXJpbmcgPSB0aGlzLl9vb2IuaG92ZXJUaW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55IDwgdGhpcy5fb29iLl9vcmlnaW5hbFlQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ID0gdGhpcy5fb29iLl9vcmlnaW5hbFlQb3M7XG4gICAgICAgICAgICB0aGlzLl9vb2IuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFZSQ2FtZXJhIGZyb20gJy4vdnJjYW1lcmEuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGRlZmF1bHQgY2xhc3MgcHJvcGVydGllc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGN1cnJlbnQgdGltZSBzdGFtcFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29sbGVjdGlvbiBvZiBzY2VuZSBvYmplY3RzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgcHJlcmVuZGVyIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwb3N0cmVuZGVyIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcG9zdFJlbmRlckNhbGxCYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgc2V0dXAgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvYmplY3RzIGluIHNjZW5lXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbnRpLWFsaWFzIHRocmVlanMgcmVuZGVyZXJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaXMgaW5zcGVjdGFibGUgKGZvciBUaHJlZUpTIGluc3BlY3RvcilcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhZGQgbGlnaHRzIGF1dG9tYXRpY2FsbHk/XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYXV0b2xpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvblByZVJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uUG9zdFJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvbkNyZWF0ZShjYikge1xuICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdG8gc2NlbmVcbiAgICAgKiBAcGFyYW0gb2JqZWN0c1xuICAgICAqL1xuICAgIGFkZE9iamVjdHMob2JqZWN0cykge1xuICAgICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3RzID0gW29iamVjdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChvYmplY3RzW2NdKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2NdLmNyZWF0ZSh0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdPYmplY3RzID0gb2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3NjZW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lRGF0YVVSSSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzY2VuZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbnNwZWN0YWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2FudGlhbGlhcycpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdhdXRvbGlnaHQnKSkge1xuICAgICAgICAgICAgdGhpcy5fYXV0b2xpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGNyZWF0ZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5mb3JtYXRQYWdlKCk7XG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLnBhcnNlQXR0cmlidXRlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdyZWFkeScpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmluaXQzRFNjZW5lKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZm9ybWF0UGFnZSgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9ICcxMDB2dyc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gJzEwMHZoJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlclxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0aW1lT2JqID0geyBub3c6IG5vdywgZGVsdGE6IG5vdyAtIHRoaXMudGltZSB9O1xuICAgICAgICB0aGlzLnRpbWUgPSBub3c7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxiYWNrKCB0aGlzLl9jb2xsZWN0aW9uLCB0aW1lT2JqICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aW1lT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayh0aW1lT2JqKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGUgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAzRCBzY2VuZVxuICAgICAqL1xuICAgIGluaXQzRFNjZW5lKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigge2FudGlhbGlhczogdGhpcy5fYW50aWFsaWFzfSApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCggdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5kb21FbGVtZW50ICk7XG5cblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhID0gbmV3IFZSQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhID0gdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5nZXRUaHJlZUNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlVlJFZmZlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0ID0gbmV3IFRIUkVFLlZSRWZmZWN0KHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnVmlldykge1xuICAgICAgICAgICAgdGhpcy5heGVzID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoNTApO1xuICAgICAgICAgICAgdGhpcy5heGVzLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuYXhlcyk7XG5cbiAgICAgICAgICAgIHZhciBncmlkWFogPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigyMDAsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKGdyaWRYWik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYXV0b2xpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ09iamVjdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fcGVuZGluZ09iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3b2JqID0gdGhpcy5fcGVuZGluZ09iamVjdHNbY107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gobmV3b2JqKTtcbiAgICAgICAgICAgICAgICBuZXdvYmouY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93LnNjZW5lID0gdGhpcy5fY29sbGVjdGlvbi5zY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVWUkVmZmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgZGV0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaGVkQ2FsbGJhY2soKSB7fTtcblxuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59XG4iXX0=
