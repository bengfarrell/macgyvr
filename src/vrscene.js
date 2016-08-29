(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TrivrScene = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJzY2VuZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FDQ0k7Ozs7Ozt3Q0FJZ0IsQUFDWjtBQUtBOzs7OztpQkFBQSxBQUFLLGNBQUwsQUFBbUIsQUFFbkI7O0FBS0E7Ozs7O2lCQUFBLEFBQUssb0JBQUwsQUFBeUIsQUFFekI7O0FBSUE7Ozs7aUJBQUEsQUFBSyxxQkFBTCxBQUEwQixBQUUxQjs7QUFJQTs7OztpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBRTNCOztBQUlBOzs7O2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFFM0I7O0FBS0E7Ozs7O2lCQUFBLEFBQUssZ0JBQUwsQUFBcUIsQUFFckI7O0FBS0E7Ozs7O2lCQUFBLEFBQUssYUFBTCxBQUFrQixBQUVsQjs7QUFLQTs7Ozs7aUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBRWxCOztBQUtBOzs7OztpQkFBQSxBQUFLLGVBQUwsQUFBb0IsQUFFcEI7O0FBS0E7Ozs7O2lCQUFBLEFBQUssZUFBTCxBQUFvQixBQUN2QjtBQUVEOzs7Ozs7OzthQXdCQTs7Ozs7O21DLEFBSVcsU0FBUyxBQUNoQjtnQkFBSSxDQUFDLFFBQUwsQUFBYSxRQUFRLEFBQ2pCOzBCQUFVLENBQVYsQUFBVSxBQUFDLEFBQ2Q7QUFFRDs7Z0JBQUksS0FBSixBQUFTLGNBQWMsQUFDbkI7cUJBQUssSUFBSSxJQUFULEFBQWEsR0FBRyxJQUFJLFFBQXBCLEFBQTRCLFFBQTVCLEFBQW9DLEtBQUssQUFDckM7eUJBQUEsQUFBSyxjQUFMLEFBQW1CLEtBQUssUUFBeEIsQUFBd0IsQUFBUSxBQUNoQzs0QkFBQSxBQUFRLEdBQVIsQUFBVyxPQUFPLEtBQWxCLEFBQXVCLGFBQWEsS0FBcEMsQUFBeUMsQUFDNUM7QUFDSjtB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QixBQUM3QjtBQUVEOzs7Ozs7Ozs7MEIsQUFJaUIsSUFBSSxBQUNqQjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCO0FBRUQ7Ozs7Ozs7OzswQixBQUlhLElBQUksQUFDYjtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLEFBQzlCOzs7OztFLEFBaEd3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGRlZmF1bHQgY2xhc3MgcHJvcGVydGllc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbGxlY3Rpb24gb2Ygc2NlbmUgb2JqZWN0c1xuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNvbGxlY3Rpb24gb2Ygc2NlbmUgb2JqZWN0cyBkZWZpbmVkIGJ5IGNvbXBvbmVudCB1c2Vyc1xuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9jdXN0b21Db2xsZWN0aW9uID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHByZXJlbmRlciBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxCYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgcG9zdHJlbmRlciBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHNldHVwIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtudWxsfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogb2JqZWN0cyBpbiBzY2VuZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZGVidWcgdmlld1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbnRpLWFsaWFzIHRocmVlanMgcmVuZGVyZXJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaXMgaW5zcGVjdGFibGUgKGZvciBUaHJlZUpTIGluc3BlY3RvcilcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBpbml0aWFsaXplZFxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHByZSByZW5kZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBzZXQgb25QcmVSZW5kZXIoY2IpIHtcbiAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2sgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgcHJlIHJlbmRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHNldCBvblBvc3RSZW5kZXIoY2IpIHtcbiAgICAgICAgdGhpcy5fcG9zdFJlbmRlckNhbGxiYWNrID0gY2I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHByZSByZW5kZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBzZXQgb25DcmVhdGUoY2IpIHtcbiAgICAgICAgdGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrID0gY2I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIHRvIHNjZW5lXG4gICAgICogQHBhcmFtIG9iamVjdHNcbiAgICAgKi9cbiAgICBhZGRPYmplY3RzKG9iamVjdHMpIHtcbiAgICAgICAgaWYgKCFvYmplY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0cyA9IFtvYmplY3RzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBvYmplY3RzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gob2JqZWN0c1tjXSk7XG4gICAgICAgICAgICAgICAgb2JqZWN0c1tjXS5jcmVhdGUodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IG9iamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXJzZSBhdHRyaWJ1dGVzIG9uIGVsZW1lbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhcnNlQXR0cmlidXRlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdzY2VuZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZURhdGFVUkkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc2NlbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnZGVidWd2aWV3JykpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2luc3BlY3RhYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3BlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYW50aWFsaWFzJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2FudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBjcmVhdGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLnBhcnNlQXR0cmlidXRlcygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBlbGVtZW50IGF0dGFjaGVkIGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndnJkaXNwbGF5cHJlc2VudGNoYW5nZScsIGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpKTtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdyZWFkeScpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmluaXQzRFNjZW5lKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGUgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAzRCBzY2VuZVxuICAgICAqL1xuICAgIGluaXQzRFNjZW5lKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigge2FudGlhbGlhczogdGhpcy5fYW50aWFsaWFzfSApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZCggdGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlci5kb21FbGVtZW50ICk7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDAwKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QgPSBuZXcgVEhSRUUuVlJFZmZlY3QodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlcik7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY29udHJvbHMgPSBuZXcgVEhSRUUuVlJDb250cm9scyh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY29udHJvbHMuc3RhbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubWFuYWdlciA9IG5ldyBXZWJWUk1hbmFnZXIodGhpcy5fY29sbGVjdGlvbi5yZW5kZXJlciwgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3QsIHtoaWRlQnV0dG9uOiBmYWxzZSwgaXNVbmRpc3RvcnRlZDpmYWxzZX0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZWJ1Z1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDUwKTtcbiAgICAgICAgICAgIHRoaXMuYXhlcy5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLmF4ZXMpO1xuXG4gICAgICAgICAgICB2YXIgZ3JpZFhaID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAxMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZChncmlkWFopO1xuXG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5saWdodC5wb3NpdGlvbi5zZXQoMTAwLDI1MCwxMDApO1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zY2VuZS5hZGQodGhpcy5fY29sbGVjdGlvbi5saWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2NlbmVTZXR1cENhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ09iamVjdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgdGhpcy5fcGVuZGluZ09iamVjdHMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3b2JqID0gdGhpcy5fcGVuZGluZ09iamVjdHNbY107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzLnB1c2gobmV3b2JqKTtcbiAgICAgICAgICAgICAgICBuZXdvYmouY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24sIHRoaXMuX2N1c3RvbUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbnNwZWN0YWJsZSkge1xuICAgICAgICAgICAgd2luZG93LnNjZW5lID0gdGhpcy5fY29sbGVjdGlvbi5zY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdC5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgZGV0YWNoZWQgY2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRldGFjaGVkQ2FsbGJhY2soKSB7fTtcblxuXG4gICAgLyoqXG4gICAgICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ciBhdHRyaWJ1dGUgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsIG9sZCB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsIG5ldyB2YWx1ZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge307XG59Il19
