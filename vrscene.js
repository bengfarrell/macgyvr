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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJjYW1lcmEuanMiLCJzcmMvdnJzY2VuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQ0FxQix1QkFDakI7QUFHQTs7O3dCQUFjOzhCQUNWOzthQUFBLEFBQUssT0FBTyxFQUFFLFNBQWQsQUFBWSxBQUFXLEFBQ3ZCO2FBQUEsQUFBSyxVQUFVLElBQUksTUFBSixBQUFVLGtCQUFWLEFBQTRCLElBQUksT0FBQSxBQUFPLGFBQWEsT0FBcEQsQUFBMkQsYUFBM0QsQUFBd0UsS0FBdkYsQUFBZSxBQUE2RSxBQUM1RjthQUFBLEFBQUssWUFBWSxJQUFJLE1BQUosQUFBVSxXQUFXLEtBQXRDLEFBQWlCLEFBQTBCLEFBQzNDO2FBQUEsQUFBSyxVQUFMLEFBQWUsV0FBZixBQUEwQixBQUM3QjtBQUVEOzs7Ozs7OztpQ0FHUyxBQUNMO2dCQUFJLEtBQUEsQUFBSyxLQUFULEFBQWMsU0FBUyxBQUNuQjtxQkFBQSxBQUFLLEFBQ1A7QUFGRixtQkFFUSxBQUNKO3FCQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2pCO0FBQ0w7QUFFRDs7Ozs7Ozs7O3lDQUlpQixBQUNiO21CQUFPLEtBQVAsQUFBWSxBQUNmO0FBRUQ7Ozs7Ozs7Ozs7b0MsQUFLWTtnQkFDSixDQUFKLEFBQUssUUFBUSxBQUFFO3lCQUFBLEFBQVMsQUFBSztBQUM3QjtpQkFBQSxBQUFLLEtBQUwsQUFBVSxXQUFXLE9BQUEsQUFBTyxXQUFXLE9BQWxCLEFBQXlCLFdBQTlDLEFBQXlELEFBQ3pEO2lCQUFBLEFBQUssS0FBTCxBQUFVLFlBQVksT0FBQSxBQUFPLFlBQVksT0FBbkIsQUFBMEIsWUFBaEQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxLQUFMLEFBQVUsWUFBWSxPQUFBLEFBQU8sUUFBUSxPQUFmLEFBQXNCLFFBQTVDLEFBQW9ELEFBQ3BEO2lCQUFBLEFBQUssS0FBTCxB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QkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksS0FBQSxBQUFLLGdCQUF6QixBQUF5QyxRQUF6QyxBQUFpRCxLQUFLLEFBQ2xEO3dCQUFJLFNBQVMsS0FBQSxBQUFLLGdCQUFsQixBQUFhLEFBQXFCLEFBQ2xDO3lCQUFBLEFBQUssY0FBTCxBQUFtQixLQUFuQixBQUF3QixBQUN4QjsyQkFBQSxBQUFPLE9BQU8sS0FBZCxBQUFtQixBQUN0QjtBQUNEO3FCQUFBLEFBQUssa0JBQUwsQUFBdUIsQUFDMUI7QUFFRDs7Z0JBQUksS0FBSixBQUFTLGNBQWMsQUFDbkI7dUJBQUEsQUFBTyxRQUFRLEtBQUEsQUFBSyxZQUFwQixBQUFnQyxBQUNuQztBQUVEOztpQkFBQSxBQUFLLGVBQUwsQUFBb0IsQUFDdkI7Ozs7aUMsQUFFUSxPQUFPLEFBQ1o7Z0JBQUksQ0FBQyxLQUFMLEFBQVUsa0JBQWtCLEFBQ3hCO3FCQUFBLEFBQUssWUFBTCxBQUFpQixPQUFqQixBQUF3QixRQUFRLE9BQWhDLEFBQXVDLFlBQVksT0FBbkQsQUFBMEQsQUFDN0Q7QUFGRCxtQkFFTyxBQUNIO3FCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixRQUFRLE9BQWxDLEFBQXlDLFlBQVksT0FBckQsQUFBNEQsQUFDL0Q7QUFDRDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsU0FBUyxPQUFBLEFBQU8sYUFBYSxPQUFyRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsQUFDM0I7QUFFRDs7Ozs7Ozs7OzJDQUltQixBQUFFOzthQUVyQjs7Ozs7Ozs7O2lELEFBT3lCLE0sQUFBTSxRLEFBQVEsUUFBUSxBQUFFOzs7O0UsQUE5UXhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZSQ2FtZXJhIHtcbiAgICAvKipcbiAgICAgKiBjLXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vb2IgPSB7IF9hY3RpdmU6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMDApO1xuICAgICAgICB0aGlzLl9jb250cm9scyA9IG5ldyBUSFJFRS5WUkNvbnRyb2xzKHRoaXMuX2NhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xzLnN0YW5kaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgY2FtZXJhIGZvciBzY2VuZVxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX29vYi5fYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm91dE9mQm9keVJlbmRlcigpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByb290IFRIUkVFLmpzIGNhbWVyYSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYXwqfFBlcnNwZWN0aXZlQ2FtZXJhfEVhfVxuICAgICAqL1xuICAgIGdldFRocmVlQ2FtZXJhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FtZXJhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1biBvdXQgb2YgYm9keSBjeWNsZSBmb3IgdmlzdWFsIGRlYnVnZ2luZ1xuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgZ29PdXRPZkJvZHkocGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zKSB7IHBhcmFtcyA9IHt9OyB9XG4gICAgICAgIHRoaXMuX29vYi52ZWxvY2l0eSA9IHBhcmFtcy52ZWxvY2l0eSA/IHBhcmFtcy52ZWxvY2l0eSA6IDE7XG4gICAgICAgIHRoaXMuX29vYi5tYXhIZWlnaHQgPSBwYXJhbXMubWF4SGVpZ2h0ID8gcGFyYW1zLm1heEhlaWdodCA6IDEwMDtcbiAgICAgICAgdGhpcy5fb29iLmhvdmVyVGltZSA9IHBhcmFtcy5ob3ZlciA/IHBhcmFtcy5ob3ZlciA6IDIwMDtcbiAgICAgICAgdGhpcy5fb29iLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9vb2IuX2hvdmVyaW5nID0gMDtcbiAgICAgICAgdGhpcy5fb29iLl9kaXJlY3Rpb24gPSAxO1xuICAgICAgICB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcyA9IHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55O1xuICAgICAgICB0aGlzLl9vb2IuX29yaWdpbmFsWFJvdCA9IHRoaXMuX2NhbWVyYS5yb3RhdGlvbi54O1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vb2I7IC8vIG5pY2UgdG8gbGV0IGNvbnN1bWVycyBrbm93IHdoYXQgcmFuZG9tIHN0dWZmIHdlJ3JlIGluamVjdGluZ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBjeWNsZSBmb3Igb3V0IG9mIGJvZHkgbW92ZW1lbnRcbiAgICAgKi9cbiAgICBvdXRPZkJvZHlSZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9vb2IuX2hvdmVyaW5nID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyAtLTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3RhdGlvbkluY3JlbWVudCA9IC0oLU1hdGguUEkvMiAtIHRoaXMuX29vYi5fb3JpZ2luYWxYUm90KSAvICh0aGlzLl9vb2IubWF4SGVpZ2h0L3RoaXMuX29vYi52ZWxvY2l0eSk7XG4gICAgICAgIHRoaXMuX2NhbWVyYS5wb3NpdGlvbi55ICs9IHRoaXMuX29vYi5fZGlyZWN0aW9uICogdGhpcy5fb29iLnZlbG9jaXR5O1xuICAgICAgICB0aGlzLl9jYW1lcmEucm90YXRpb24ueCAtPSByb3RhdGlvbkluY3JlbWVudCAqIHRoaXMuX29vYi5fZGlyZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLl9jYW1lcmEucG9zaXRpb24ueSA+IHRoaXMuX29vYi5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX29vYi5fZGlyZWN0aW9uICo9IC0xO1xuICAgICAgICAgICAgdGhpcy5fb29iLl9ob3ZlcmluZyA9IHRoaXMuX29vYi5ob3ZlclRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPCB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcykge1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnBvc2l0aW9uLnkgPSB0aGlzLl9vb2IuX29yaWdpbmFsWVBvcztcbiAgICAgICAgICAgIHRoaXMuX29vYi5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVlJDYW1lcmEgZnJvbSAnLi92cmNhbWVyYS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY3VycmVudCB0aW1lIHN0YW1wXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwcmVyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHBvc3RyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBzZXR1cCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9iamVjdHMgaW4gc2NlbmVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFudGktYWxpYXMgdGhyZWVqcyByZW5kZXJlclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyBpbnNwZWN0YWJsZSAoZm9yIFRocmVlSlMgaW5zcGVjdG9yKVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFkZCBsaWdodHMgYXV0b21hdGljYWxseT9cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hdXRvbGlnaHQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcHBsaWNhdGlvbiBzY29wZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVnaXN0ZXIgYXBwbGljYXRpb24gc2NvcGVcbiAgICAgKiBAcGFyYW0gc2NvcGVcbiAgICAgKi9cbiAgICByZWdpc3RlckFwcGxpY2F0aW9uKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uID0gc2NvcGU7XG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24ub25DcmVhdGUodGhpcywgdGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdG8gc2NlbmVcbiAgICAgKiBAcGFyYW0gb2JqZWN0c1xuICAgICAqL1xuICAgIGFkZE9iamVjdHMob2JqZWN0cykge1xuICAgICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3RzID0gW29iamVjdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChvYmplY3RzW2NdKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2NdLmNyZWF0ZSh0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdPYmplY3RzID0gb2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3NjZW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lRGF0YVVSSSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzY2VuZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbnNwZWN0YWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2FudGlhbGlhcycpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdhdXRvbGlnaHQnKSkge1xuICAgICAgICAgICAgdGhpcy5fYXV0b2xpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGNyZWF0ZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5mb3JtYXRQYWdlKCk7XG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLnBhcnNlQXR0cmlidXRlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcblxuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMuaW5pdDNEU2NlbmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBmb3JtYXRQYWdlKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJzEwMHZ3JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSAnMTAwdmgnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIHRpbWVPYmogPSB7IG5vdzogbm93LCBkZWx0YTogbm93IC0gdGhpcy50aW1lIH07XG4gICAgICAgIHRoaXMudGltZSA9IG5vdztcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhLnJlbmRlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjayAmJiB0aGlzLl9hcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb24ub25QcmVSZW5kZXIodGltZU9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlci5yZW5kZXIoIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUsIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhICk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aW1lT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2sgJiYgdGhpcy5fYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uLm9uUmVuZGVyKHRpbWVPYmopO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSA9PiB0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIDNEIHNjZW5lXG4gICAgICovXG4gICAgaW5pdDNEU2NlbmUoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB7YW50aWFsaWFzOiB0aGlzLl9hbnRpYWxpYXN9ICk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKCB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnZyY2FtZXJhID0gbmV3IFZSQ2FtZXJhKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhID0gdGhpcy5fY29sbGVjdGlvbi52cmNhbWVyYS5nZXRUaHJlZUNhbWVyYSgpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlVlJFZmZlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0ID0gbmV3IFRIUkVFLlZSRWZmZWN0KHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnVmlldykge1xuICAgICAgICAgICAgdGhpcy5heGVzID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoNTApO1xuICAgICAgICAgICAgdGhpcy5heGVzLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuYXhlcyk7XG5cbiAgICAgICAgICAgIHZhciBncmlkWFogPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigyMDAsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKGdyaWRYWik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYXV0b2xpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrICYmIHRoaXMuX2FwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbi5vbkNyZWF0ZSh0aGlzLCB0aGlzLl9jb2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nT2JqZWN0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9wZW5kaW5nT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdvYmogPSB0aGlzLl9wZW5kaW5nT2JqZWN0c1tjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChuZXdvYmopO1xuICAgICAgICAgICAgICAgIG5ld29iai5jcmVhdGUodGhpcy5fY29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3BlY3RhYmxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2NlbmUgPSB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZVZSRWZmZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBkZXRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoZWRDYWxsYmFjaygpIHt9O1xuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59XG4iXX0=
