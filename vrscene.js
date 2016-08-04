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

            var template = this.owner.querySelector('template');
            var clone = template.content.cloneNode(true);
            this.root = this.createShadowRoot();
            this.root.appendChild(clone);

            this.dom = {};
            this.dom.scene = this.root.querySelector('.threecontainer');
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
            this.dom.scene.appendChild(this._collection.renderer.domElement);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdnJzY2VuZS5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQ0tvQixBQU1aOzs7Ozs7aUJBQUEsQUFBSyxjQUFMLEFBQW1CLEFBT25COzs7Ozs7O2lCQUFBLEFBQUssb0JBQUwsQUFBeUIsQUFNekI7Ozs7OztpQkFBQSxBQUFLLHFCQUFMLEFBQTBCLEFBTTFCOzs7Ozs7aUJBQUEsQUFBSyxzQkFBTCxBQUEyQixBQU0zQjs7Ozs7O2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFPM0I7Ozs7Ozs7aUJBQUEsQUFBSyxnQkFBTCxBQUFxQixBQU9yQjs7Ozs7OztpQkFBQSxBQUFLLGFBQUwsQUFBa0IsQUFPbEI7Ozs7Ozs7aUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBT2xCOzs7Ozs7O2lCQUFBLEFBQUssZUFBTCxBQUFvQixBQU9wQjs7Ozs7OztpQkFBQSxBQUFLLGVBQUwsQUFBb0IsQUFDdkI7Ozs7Ozs7Ozs7Ozs7OzttQyxBQThCVSxTQUFTLEFBQ2hCO2dCQUFJLENBQUMsUUFBTCxBQUFhLFFBQVEsQUFDakI7MEJBQVUsQ0FBVixBQUFVLEFBQUMsQUFDZDtBQUVEOztnQkFBSSxLQUFKLEFBQVMsY0FBYyxBQUNuQjtxQkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksUUFBcEIsQUFBNEIsUUFBNUIsQUFBb0MsS0FBSyxBQUNyQzt5QkFBQSxBQUFLLGNBQUwsQUFBbUIsS0FBSyxRQUF4QixBQUF3QixBQUFRLEFBQ2hDOzRCQUFBLEFBQVEsR0FBUixBQUFXLE9BQU8sS0FBbEIsQUFBdUIsYUFBYSxLQUFwQyxBQUF5QyxBQUM1QztBQUNKO0FBTEQsbUJBS08sQUFDSDtxQkFBQSxBQUFLLGtCQUFMLEFBQXVCLEFBQzFCO0FBQ0o7Ozs7Ozs7Ozs7MENBTWlCLEFBQ2Q7Z0JBQUksS0FBQSxBQUFLLGFBQVQsQUFBSSxBQUFrQixVQUFVLEFBQzVCO3FCQUFBLEFBQUssZ0JBQWdCLEtBQUEsQUFBSyxhQUExQixBQUFxQixBQUFrQixBQUMxQztBQUVEOztnQkFBSSxLQUFBLEFBQUssYUFBVCxBQUFJLEFBQWtCLGNBQWMsQUFDaEM7cUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBQ3JCO0FBRUQ7O2dCQUFJLEtBQUEsQUFBSyxhQUFULEFBQUksQUFBa0IsZ0JBQWdCLEFBQ2xDO3FCQUFBLEFBQUssZUFBTCxBQUFvQixBQUN2QjtBQUVEOztnQkFBSSxLQUFBLEFBQUssYUFBVCxBQUFJLEFBQWtCLGNBQWMsQUFDaEM7cUJBQUEsQUFBSyxhQUFMLEFBQWtCLEFBQ3JCO0FBQ0o7Ozs7Ozs7OzswQ0FNaUIsQUFDZDtpQkFBQSxBQUFLLEFBQ0w7aUJBQUEsQUFBSyxBQUNSOzs7Ozs7Ozs7MkNBTWtCO3lCQUNmOztnQkFBSSxXQUFXLEtBQUEsQUFBSyxNQUFMLEFBQVcsY0FBMUIsQUFBZSxBQUF5QixBQUN4QztnQkFBSSxRQUFRLFNBQUEsQUFBUyxRQUFULEFBQWlCLFVBQTdCLEFBQVksQUFBMkIsQUFDdkM7aUJBQUEsQUFBSyxPQUFPLEtBQVosQUFBWSxBQUFLLEFBQ2pCO2lCQUFBLEFBQUssS0FBTCxBQUFVLFlBQVYsQUFBc0IsQUFFdEI7O2lCQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1g7aUJBQUEsQUFBSyxJQUFMLEFBQVMsUUFBUSxLQUFBLEFBQUssS0FBTCxBQUFVLGNBQTNCLEFBQWlCLEFBQXdCLEFBQ3pDO21CQUFBLEFBQU8saUJBQVAsQUFBd0IsVUFBVSxpQkFBQTt1QkFBUyxPQUFBLEFBQUssU0FBZCxBQUFTLEFBQWM7QUFBekQsQUFDQTttQkFBQSxBQUFPLGlCQUFQLEFBQXdCLDBCQUEwQixpQkFBQTt1QkFBUyxPQUFBLEFBQUssU0FBZCxBQUFTLEFBQWM7QUFBekUsQUFDQTtnQkFBSSxRQUFRLElBQUEsQUFBSSxZQUFoQixBQUFZLEFBQWdCLEFBQzVCO2lCQUFBLEFBQUssY0FBTCxBQUFtQixBQUNuQjt1QkFBWSxZQUFNLEFBQ2Q7dUJBQUEsQUFBSyxBQUNMO3VCQUFBLEFBQUssQUFDUjtBQUhELGVBQUEsQUFHRyxBQUNOOzs7Ozs7Ozs7aUNBS1E7eUJBQ0w7O2lCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixBQUUxQjs7Z0JBQUksS0FBSixBQUFTLG9CQUFvQixBQUN6QjtxQkFBQSxBQUFLLG1CQUFtQixLQUF4QixBQUE2QixhQUFhLEtBQTFDLEFBQStDLEFBQ2xEO0FBRUQ7O2lCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixPQUFRLEtBQUEsQUFBSyxZQUF2QyxBQUFtRCxPQUFPLEtBQUEsQUFBSyxZQUEvRCxBQUEyRSxBQUUzRTs7aUJBQUssSUFBSSxJQUFULEFBQWEsR0FBRyxJQUFJLEtBQUEsQUFBSyxjQUF6QixBQUF1QyxRQUF2QyxBQUErQyxLQUFLLEFBQ2hEO3FCQUFBLEFBQUssY0FBTCxBQUFtQixHQUFuQixBQUFzQixPQUFPLEtBQTdCLEFBQWtDLGFBQWEsS0FBL0MsQUFBb0QsQUFDdkQ7QUFFRDs7Z0JBQUksS0FBSixBQUFTLHFCQUFxQixBQUMxQjtxQkFBQSxBQUFLLG9CQUFvQixLQUF6QixBQUE4QixhQUFhLEtBQTNDLEFBQWdELEFBQ25EO0FBQ0Q7bUJBQUEsQUFBTyxzQkFBc0IsYUFBQTt1QkFBSyxPQUFMLEFBQUssQUFBSztBQUF2QyxBQUNIOzs7Ozs7Ozs7c0NBS2EsQUFDVjtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsUUFBUSxJQUFJLE1BQTdCLEFBQXlCLEFBQVUsQUFDbkM7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLFdBQVcsSUFBSSxNQUFKLEFBQVUsY0FBZSxFQUFDLFdBQVcsS0FBakUsQUFBNEIsQUFBeUIsQUFBaUIsQUFDdEU7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLFNBQWpCLEFBQTBCLFFBQVEsT0FBbEMsQUFBeUMsWUFBWSxPQUFyRCxBQUE0RCxBQUM1RDtpQkFBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWUsWUFBYSxLQUFBLEFBQUssWUFBTCxBQUFpQixTQUE3QyxBQUFzRCxBQUV0RDs7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLFNBQVMsSUFBSSxNQUFKLEFBQVUsa0JBQVYsQUFBNEIsSUFBSSxPQUFBLEFBQU8sYUFBYSxPQUFwRCxBQUEyRCxhQUEzRCxBQUF3RSxLQUFsRyxBQUEwQixBQUE2RSxBQUN2RztpQkFBQSxBQUFLLFlBQUwsQUFBaUIsU0FBUyxJQUFJLE1BQUosQUFBVSxTQUFTLEtBQUEsQUFBSyxZQUFsRCxBQUEwQixBQUFvQyxBQUM5RDtpQkFBQSxBQUFLLFlBQUwsQUFBaUIsT0FBakIsQUFBd0IsUUFBUSxPQUFoQyxBQUF1QyxZQUFZLE9BQW5ELEFBQTBELEFBQzFEO2lCQUFBLEFBQUssWUFBTCxBQUFpQixXQUFXLElBQUksTUFBSixBQUFVLFdBQVcsS0FBQSxBQUFLLFlBQXRELEFBQTRCLEFBQXNDLEFBQ2xFO2lCQUFBLEFBQUssWUFBTCxBQUFpQixTQUFqQixBQUEwQixXQUExQixBQUFxQyxBQUNyQztpQkFBQSxBQUFLLFlBQUwsQUFBaUIsTUFBakIsQUFBdUIsSUFBSSxLQUFBLEFBQUssWUFBaEMsQUFBNEMsQUFDNUM7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLFVBQVUsSUFBQSxBQUFJLGFBQWEsS0FBQSxBQUFLLFlBQXRCLEFBQWtDLFVBQVUsS0FBQSxBQUFLLFlBQWpELEFBQTZELFFBQVEsRUFBQyxZQUFELEFBQWEsT0FBTyxlQUFwSCxBQUEyQixBQUFxRSxBQUFrQyxBQUVsSTs7Z0JBQUksS0FBSixBQUFTLFlBQVksQUFDakI7cUJBQUEsQUFBSyxPQUFPLElBQUksTUFBSixBQUFVLFdBQXRCLEFBQVksQUFBcUIsQUFDakM7cUJBQUEsQUFBSyxLQUFMLEFBQVUsU0FBVixBQUFtQixJQUFuQixBQUF1QixHQUF2QixBQUEwQixHQUExQixBQUE2QixBQUM3QjtxQkFBQSxBQUFLLFlBQUwsQUFBaUIsTUFBakIsQUFBdUIsSUFBSSxLQUEzQixBQUFnQyxBQUVoQzs7b0JBQUksU0FBUyxJQUFJLE1BQUosQUFBVSxXQUFWLEFBQXFCLEtBQWxDLEFBQWEsQUFBMEIsQUFDdkM7cUJBQUEsQUFBSyxZQUFMLEFBQWlCLE1BQWpCLEFBQXVCLElBQXZCLEFBQTJCLEFBRTNCOztxQkFBQSxBQUFLLFlBQUwsQUFBaUIsUUFBUSxJQUFJLE1BQUosQUFBVSxXQUFuQyxBQUF5QixBQUFxQixBQUM5QztxQkFBQSxBQUFLLFlBQUwsQUFBaUIsTUFBakIsQUFBdUIsU0FBdkIsQUFBZ0MsSUFBaEMsQUFBb0MsS0FBcEMsQUFBd0MsS0FBeEMsQUFBNEMsQUFDNUM7cUJBQUEsQUFBSyxZQUFMLEFBQWlCLE1BQWpCLEFBQXVCLElBQUksS0FBQSxBQUFLLFlBQWhDLEFBQTRDLEFBQy9DO0FBRUQ7O2dCQUFJLEtBQUosQUFBUyxxQkFBcUIsQUFDMUI7cUJBQUEsQUFBSyxvQkFBb0IsS0FBekIsQUFBOEIsYUFBYSxLQUEzQyxBQUFnRCxBQUNuRDtBQUVEOztnQkFBSSxLQUFKLEFBQVMsaUJBQWlCLEFBQ3RCO3FCQUFLLElBQUksSUFBVCxBQUFhLEdBQUcsSUFBSSxLQUFBLEFBQUssZ0JBQXpCLEFBQXlDLFFBQXpDLEFBQWlELEtBQUssQUFDbEQ7d0JBQUksU0FBUyxLQUFBLEFBQUssZ0JBQWxCLEFBQWEsQUFBcUIsQUFDbEM7eUJBQUEsQUFBSyxjQUFMLEFBQW1CLEtBQW5CLEFBQXdCLEFBQ3hCOzJCQUFBLEFBQU8sT0FBTyxLQUFkLEFBQW1CLGFBQWEsS0FBaEMsQUFBcUMsQUFDeEM7QUFDRDtxQkFBQSxBQUFLLGtCQUFMLEFBQXVCLEFBQzFCO0FBRUQ7O2dCQUFJLEtBQUosQUFBUyxjQUFjLEFBQ25CO3VCQUFBLEFBQU8sUUFBUSxLQUFBLEFBQUssWUFBcEIsQUFBZ0MsQUFDbkM7QUFFRDs7aUJBQUEsQUFBSyxlQUFMLEFBQW9CLEFBQ3ZCOzs7O2lDLEFBRVEsT0FBTyxBQUNaO2lCQUFBLEFBQUssWUFBTCxBQUFpQixPQUFqQixBQUF3QixRQUFRLE9BQWhDLEFBQXVDLFlBQVksT0FBbkQsQUFBMEQsQUFDMUQ7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLFNBQVMsT0FBQSxBQUFPLGFBQWEsT0FBckQsQUFBNEQsQUFDNUQ7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLE9BQWpCLEFBQXdCLEFBQzNCOzs7Ozs7Ozs7OzJDQU1rQixBQUFFOzs7Ozs7Ozs7OztpRCxBQVVJLE0sQUFBTSxRLEFBQVEsUUFBUSxBQUFFOzs7MEIsQUF4TGpDLElBQUksQUFDaEI7aUJBQUEsQUFBSyxxQkFBTCxBQUEwQixBQUM3Qjs7Ozs7Ozs7OzswQixBQU1nQixJQUFJLEFBQ2pCO2lCQUFBLEFBQUssc0JBQUwsQUFBMkIsQUFDOUI7Ozs7Ozs7Ozs7MEIsQUFNWSxJQUFJLEFBQ2I7aUJBQUEsQUFBSyxzQkFBTCxBQUEyQixBQUM5Qjs7Ozs7RSxBQWhHd0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBkZWZhdWx0IGNsYXNzIHByb3BlcnRpZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjb2xsZWN0aW9uIG9mIHNjZW5lIG9iamVjdHMgZGVmaW5lZCBieSBjb21wb25lbnQgdXNlcnNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbiA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBwcmVyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVSZW5kZXJDYWxsQmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjZW5lIHBvc3RyZW5kZXIgY2FsbGJhY2tcbiAgICAgICAgICogQHR5cGUge251bGx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wb3N0UmVuZGVyQ2FsbEJhY2sgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2VuZSBzZXR1cCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7bnVsbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9iamVjdHMgaW4gc2NlbmVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlYnVnIHZpZXdcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW50aS1hbGlhcyB0aHJlZWpzIHJlbmRlcmVyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzIGluc3BlY3RhYmxlIChmb3IgVGhyZWVKUyBpbnNwZWN0b3IpXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5faW5zcGVjdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2NlbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uUHJlUmVuZGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX3ByZVJlbmRlckNhbGxiYWNrID0gY2I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0IHByZSByZW5kZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2JcbiAgICAgKi9cbiAgICBzZXQgb25Qb3N0UmVuZGVyKGNiKSB7XG4gICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCBwcmUgcmVuZGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNiXG4gICAgICovXG4gICAgc2V0IG9uQ3JlYXRlKGNiKSB7XG4gICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayA9IGNiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCB0byBzY2VuZVxuICAgICAqIEBwYXJhbSBvYmplY3RzXG4gICAgICovXG4gICAgYWRkT2JqZWN0cyhvYmplY3RzKSB7XG4gICAgICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iamVjdHMgPSBbb2JqZWN0c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgb2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjZW5lT2JqZWN0cy5wdXNoKG9iamVjdHNbY10pO1xuICAgICAgICAgICAgICAgIG9iamVjdHNbY10uY3JlYXRlKHRoaXMuX2NvbGxlY3Rpb24sIHRoaXMuX2N1c3RvbUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ09iamVjdHMgPSBvYmplY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGFyc2UgYXR0cmlidXRlcyBvbiBlbGVtZW50XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYXJzZUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnc2NlbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVEYXRhVVJJID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NjZW5lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2RlYnVndmlldycpKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCdpbnNwZWN0YWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2FudGlhbGlhcycpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbnRpYWxpYXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVsZW1lbnQgY3JlYXRlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5wYXJzZUF0dHJpYnV0ZXMoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBhdHRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXR0YWNoZWRDYWxsYmFjaygpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy5vd25lci5xdWVyeVNlbGVjdG9yKCd0ZW1wbGF0ZScpO1xuICAgICAgICBsZXQgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgICAgIHRoaXMucm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG5cbiAgICAgICAgdGhpcy5kb20gPSB7fTtcbiAgICAgICAgdGhpcy5kb20uc2NlbmUgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcignLnRocmVlY29udGFpbmVyJyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2cmRpc3BsYXlwcmVzZW50Y2hhbmdlJywgZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudCkpO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdDNEU2NlbmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVSZW5kZXJDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fcHJlUmVuZGVyQ2FsbGJhY2sodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnJlbmRlciggdGhpcy5fY29sbGVjdGlvbi5zY2VuZSwgdGhpcy5fY29sbGVjdGlvbi5jYW1lcmEgKTtcblxuICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHRoaXMuX3NjZW5lT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmVPYmplY3RzW2NdLnJlbmRlcih0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wb3N0UmVuZGVyQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RSZW5kZXJDYWxsYmFjayh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGUgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSAzRCBzY2VuZVxuICAgICAqL1xuICAgIGluaXQzRFNjZW5lKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigge2FudGlhbGlhczogdGhpcy5fYW50aWFsaWFzfSApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuZG9tLnNjZW5lLmFwcGVuZENoaWxkKCB0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMDApO1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdCA9IG5ldyBUSFJFRS5WUkVmZmVjdCh0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5lZmZlY3Quc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jb250cm9scyA9IG5ldyBUSFJFRS5WUkNvbnRyb2xzKHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5jb250cm9scy5zdGFuZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhKTtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5tYW5hZ2VyID0gbmV3IFdlYlZSTWFuYWdlcih0aGlzLl9jb2xsZWN0aW9uLnJlbmRlcmVyLCB0aGlzLl9jb2xsZWN0aW9uLmVmZmVjdCwge2hpZGVCdXR0b246IGZhbHNlLCBpc1VuZGlzdG9ydGVkOmZhbHNlfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnVmlldykge1xuICAgICAgICAgICAgdGhpcy5heGVzID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoNTApO1xuICAgICAgICAgICAgdGhpcy5heGVzLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKHRoaXMuYXhlcyk7XG5cbiAgICAgICAgICAgIHZhciBncmlkWFogPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigyMDAsIDEwKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc2NlbmUuYWRkKGdyaWRYWik7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZik7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0LnBvc2l0aW9uLnNldCgxMDAsMjUwLDEwMCk7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lLmFkZCh0aGlzLl9jb2xsZWN0aW9uLmxpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zY2VuZVNldHVwQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lU2V0dXBDYWxsYmFjayh0aGlzLl9jb2xsZWN0aW9uLCB0aGlzLl9jdXN0b21Db2xsZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wZW5kaW5nT2JqZWN0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCB0aGlzLl9wZW5kaW5nT2JqZWN0cy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHZhciBuZXdvYmogPSB0aGlzLl9wZW5kaW5nT2JqZWN0c1tjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZU9iamVjdHMucHVzaChuZXdvYmopO1xuICAgICAgICAgICAgICAgIG5ld29iai5jcmVhdGUodGhpcy5fY29sbGVjdGlvbiwgdGhpcy5fY3VzdG9tQ29sbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nT2JqZWN0cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3BlY3RhYmxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2NlbmUgPSB0aGlzLl9jb2xsZWN0aW9uLnNjZW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uZWZmZWN0LnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZWxlbWVudCBkZXRhY2hlZCBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGV0YWNoZWRDYWxsYmFjaygpIHt9O1xuXG5cbiAgICAvKipcbiAgICAgKiBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyIGF0dHJpYnV0ZSBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWwgb2xkIHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWwgbmV3IHZhbHVlXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7fTtcbn0iXX0=
