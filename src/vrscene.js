(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CCWCThreeJSVRScene = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'setProperties',

        /**
         * initialize default class properties
         * @private
         */
        value: function setProperties() {
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

            if (this.hasAttribute('debugview')) {
                this._debugView = true;
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
            this.dom = {};
            window.addEventListener('resize', function (event) {
                return _this2.onResize(event);
            });
            window.addEventListener('vrdisplaypresentchange', function (event) {
                return _this2.onResize(event);
            });
            var event = new CustomEvent('ready');
            this.dispatchEvent(event);
            setTimeout(function () {
                _this2.init3DScene();
                _this2.render();
            }, 100);
        }

        /**
         * render
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            this._collection.controls.update();

            if (this._preRenderCallback) {
                this._preRenderCallback(this._collection, this._customCollection);
            }

            this._collection.renderer.render(this._collection.scene, this._collection.camera);

            for (var c = 0; c < this._sceneObjects.length; c++) {
                this._sceneObjects[c].render(this._collection, this._customCollection);
            }

            if (this._postRenderCallback) {
                this._postRenderCallback(this._collection, this._customCollection);
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

            this._collection.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
            this._collection.effect = new THREE.VREffect(this._collection.renderer);
            this._collection.effect.setSize(window.innerWidth, window.innerHeight);
            this._collection.controls = new THREE.VRControls(this._collection.camera);
            this._collection.controls.standing = true;
            this._collection.scene.add(this._collection.camera);
            this._collection.manager = new WebVRManager(this._collection.renderer, this._collection.effect, { hideButton: false, isUndistorted: false });

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
            this._collection.effect.setSize(window.innerWidth, window.innerHeight);
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJzY2VuZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQ0tvQixBQU1aOzs7Ozs7aUJBQUEsQUFBSyxjQUFMLEFBQW1CLEFBT25COzs7Ozs7O2lCQUFBLEFBQUssb0JBQUwsQUFBeUIsQUFNekI7Ozs7OztpQkFBQSxBQUFLLHFCQUFMLEFBQTBCLEFBTTFCOzs7Ozs7aUJBQUEsQUFBSyxzQkFBTCxBQUEyQixBQU0zQjs7Ozs7O2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFPM0I7Ozs7Ozs7aUJBQUEsQUFBSyxnQkFBTCxBQUFxQixBQU9yQjs7Ozs7OztpQkFBQSxBQUFLLGFBQUwsQUFBa0IsQUFPbEI7Ozs7Ozs7aUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBT2xCOzs7Ozs7O2lCQUFBLEFBQUssZUFBTCxBQUFvQixBQU9wQjs7Ozs7OztpQkFBQSxBQUFLLGVBQUwsQUFBb0IsQUFDdkI7Ozs7Ozs7Ozs7Ozs7OzttQyxBQThCVSxTQUFTLEFBQ2hCO2dCQUFJLENBQUMsUUFBTCxBQUFhLFFBQVEsQUFDakI7MEJBQVUsQ0FBVixBQUFVLEFBQUMsQUFDZDtBQUVEOztnQkFBSSxLQUFKLEFBQVMsY0FBYyxBQUNuQjtxQkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksUUFBcEIsQUFBNEIsUUFBNUIsQUFBb0MsS0FBSyxBQUNyQzt5QkFBQSxBQUFLLGNBQUwsQUFBbUIsS0FBSyxRQUF4QixBQUF3QixBQUFRLEFBQ2hDOzRCQUFBLEFBQVEsR0FBUixBQUFXLE9BQU8sS0FBbEIsQUFBdUIsYUFBYSxLQUFwQyxBQUF5QyxBQUM1QztBQUNKO0FBTEQsbUJBS08sQUFDSDtxQkFBQSxBQUFLLGtCQUFMLEFBQXVCLEFBQzFCO0FBQ0o7Ozs7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QUFNZ0IsSUFBSSxBQUNqQjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCOzs7Ozs7Ozs7OzBCLEFBTVksSUFBSSxBQUNiO2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFDOUI7Ozs7O0UsQUFoR3dCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZGVmYXVsdCBjbGFzcyBwcm9wZXJ0aWVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogY29sbGVjdGlvbiBvZiBzY2VuZSBvYmplY3RzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29sbGVjdGlvbiBvZiBzY2VuZSBvYmplY3RzIGRlZmluZWQgYnkgY29tcG9uZW50IHVzZXJzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2N1c3RvbUNvbGxlY3Rpb24gPSB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgcHJlcmVuZGVyIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwb3N0cmVuZGVyIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcG9zdFJlbmRlckNhbGxCYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgc2V0dXAgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvYmplY3RzIGluIHNjZW5lXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZWJ1ZyB2aWV3XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZGVidWdWaWV3ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFudGktYWxpYXMgdGhyZWVqcyByZW5kZXJlclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyBpbnNwZWN0YWJsZSAoZm9yIFRocmVlSlMgaW5zcGVjdG9yKVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvblByZVJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uUG9zdFJlbmRlcihjYikge1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvbkNyZWF0ZShjYikge1xuICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgdG8gc2NlbmVcbiAgICAgKiBAcGFyYW0gb2JqZWN0c1xuICAgICAqL1xuICAgIGFkZE9iamVjdHMob2JqZWN0cykge1xuICAgICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3RzID0gW29iamVjdHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IG9iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChvYmplY3RzW2NdKTtcbiAgICAgICAgICAgICAgICBvYmplY3RzW2NdLmNyZWF0ZSh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdPYmplY3RzID0gb2JqZWN0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhcnNlIGF0dHJpYnV0ZXMgb24gZWxlbWVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFyc2VBdHRyaWJ1dGVzKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3NjZW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lRGF0YVVSSSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzY2VuZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdkZWJ1Z3ZpZXcnKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWdWaWV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnaW5zcGVjdGFibGUnKSkge1xuICAgICAgICAgICAgdGhpcy5faW5zcGVjdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdhbnRpYWxpYXMnKSkge1xuICAgICAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGNyZWF0ZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMucGFyc2VBdHRyaWJ1dGVzKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgYXR0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGF0dGFjaGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuZG9tID0ge307XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdDNEU2NlbmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGUgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAzRCBzY2VuZVxuICAgICAqL1xuICAgIGluaXQzRFNjZW5lKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigge2FudGlhbGlhczogdGhpcy5fYW50aWFsaWFzfSApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCggdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5kb21FbGVtZW50ICk7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QgPSBuZXcgVEhSRUUuVlJFZmZlY3QodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlcik7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Z1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDUwKTtcbiAgICAgICAgICAgIHRoaXMuYXhlcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLmF4ZXMpO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZFhaID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZChncmlkWFopO1xuXG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ09iamVjdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fcGVuZGluZ09iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3b2JqID0gdGhpcy5fcGVuZGluZ09iamVjdHNbY107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gobmV3b2JqKTtcbiAgICAgICAgICAgICAgICBuZXdvYmouY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24sIHRoaXMuX2N1c3RvbUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93LnNjZW5lID0gdGhpcy5fY29sbGVjdGlvbi5zY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgZGV0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaGVkQ2FsbGJhY2soKSB7fTtcblxuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59Il19
