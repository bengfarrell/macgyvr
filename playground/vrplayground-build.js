(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VRPlayground = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _basegroup = require('../../src/basegroup.js');

var _basegroup2 = _interopRequireDefault(_basegroup);

var _tween = require('../../src/plugins/tween.js');

var _tween2 = _interopRequireDefault(_tween);

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

var Cube = function (_BaseGroup) {
    _inherits(Cube, _BaseGroup);

    function Cube() {
        _classCallCheck(this, Cube);

        return _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).apply(this, arguments));
    }

    _createClass(Cube, [{
        key: 'onCreate',

        /**
         * on create scene (or earliest possible opportunity)
         * @param scene
         */
        value: function onCreate() {
            var _this2 = this;

            this._material = this.createMaterial();
            var mesh = new THREE.Mesh(this.createGeometry(), this._material);
            this.add(mesh, 'cube');
            this.group.position.z = -20;
            this.tweener = new _tween2.default(this);

            document.addEventListener('keyup', function (event) {
                if (event.keyCode === 32) {
                    var props = {
                        target: mesh,
                        duration: 3000
                    };
                    _this2.tweener.animateColor(0xff0000, 0x00ff00, props);
                    _this2.tweener.animatePosition(new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 6, 3), props);
                }
            });
        }

        /**
         * on render
         * @param time
         */

    }, {
        key: 'onRender',
        value: function onRender(time) {
            this.group.rotation.y += .01;
        }

        /**
         * create globe geometry
         * @returns {THREE.IcosahedronGeometry}
         */

    }, {
        key: 'createGeometry',
        value: function createGeometry() {
            return new THREE.CubeGeometry(5, 5, 5, 10, 10);
        }

        /**
         * create globe material
         */

    }, {
        key: 'createMaterial',
        value: function createMaterial() {
            return new THREE.MeshPhongMaterial({
                color: 0xff0000,
                shininess: 10,
                shading: THREE.FlatShading,
                transparent: true,
                opacity: 1
            });
        }
    }]);

    return Cube;
}(_basegroup2.default);

exports.default = Cube;

},{"../../src/basegroup.js":4,"../../src/plugins/tween.js":5}],2:[function(require,module,exports){
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

var _basegroup = require('../../src/basegroup.js');

var _basegroup2 = _interopRequireDefault(_basegroup);

var _tween = require('../../src/plugins/tween.js');

var _tween2 = _interopRequireDefault(_tween);

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

var TestScene = function (_BaseGroup) {
  _inherits(TestScene, _BaseGroup);

  function TestScene() {
    _classCallCheck(this, TestScene);

    return _possibleConstructorReturn(this, (TestScene.__proto__ || Object.getPrototypeOf(TestScene)).apply(this, arguments));
  }

  _createClass(TestScene, [{
    key: 'onCreate',

    /**
     * on create scene (or earliest possible opportunity)
     */
    value: function onCreate() {}
  }, {
    key: 'onJSONSceneLoaded',
    value: function onJSONSceneLoaded(scene) {
      _get(TestScene.prototype.__proto__ || Object.getPrototypeOf(TestScene.prototype), 'onJSONSceneLoaded', this).call(this, scene);
      this._cube = scene.getObjectByName('Box 1');
      this._sphere = scene.getObjectByName('Sphere 2');
    }
  }, {
    key: 'onRender',

    /**
     * on render
     * @param time
     */
    value: function onRender(time) {}
  }]);

  return TestScene;
}(_basegroup2.default);

exports.default = TestScene;

},{"../../src/basegroup.js":4,"../../src/plugins/tween.js":5}],3:[function(require,module,exports){
'use strict';

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

var _cube = require('./objects/cube.js');

var _cube2 = _interopRequireDefault(_cube);

var _testscene = require('./objects/testscene.js');

var _testscene2 = _interopRequireDefault(_testscene);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var VRPlaygroundScene = function () {
    function VRPlaygroundScene(scene) {
        _classCallCheck(this, VRPlaygroundScene);

        scene.onPreRender = this.render;

        scene.addObjects([new _cube2.default(), new _testscene2.default({ scene: './assets/testscene.json' })]);
    }

    _createClass(VRPlaygroundScene, [{
        key: 'render',
        value: function render(time) {}
    }]);

    return VRPlaygroundScene;
}();

exports.default = VRPlaygroundScene;

},{"./objects/cube.js":1,"./objects/testscene.js":2}],4:[function(require,module,exports){
'use strict';

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

var BaseGroup = function () {
    function BaseGroup(params) {
        _classCallCheck(this, BaseGroup);

        /**
         * parent group of child objects we will create
         * @type {THREE.Object3D}
         * @private
         */
        this._group = new THREE.Object3D();

        /** additional render hooks we can add */
        this._renderHooks = [];

        this._config = params;
        this.onInitialize(params);
    }

    /**
     * get name of group
     */

    _createClass(BaseGroup, [{
        key: 'onCreate',

        /**
         * overridable methods
         * leave empty to be a simple abstraction we don't have to call super on
         * @param scene
         */
        value: function onCreate(scene) {}
    }, {
        key: 'onRender',
        value: function onRender(scene, time) {}
    }, {
        key: 'onInitialize',
        value: function onInitialize(params) {}
    }, {
        key: 'onAssetsLoaded',
        value: function onAssetsLoaded(geometry, material) {}
    }, {
        key: 'onJSONSceneLoadProgress',
        value: function onJSONSceneLoadProgress(progress) {}
    }, {
        key: 'onJSONSceneLoadError',
        value: function onJSONSceneLoadError(err) {}
    }, {
        key: 'onJSONSceneLoaded',
        value: function onJSONSceneLoaded(scene) {
            this.add(scene);
        }
    }, {
        key: 'create',

        /**
         * on create scene (or earliest possible opportunity)
         * @param scene
         */
        value: function create(scene) {
            var _this = this;

            this._group.name = this.name;
            this._sceneCollection = scene;
            scene.scene.add(this._group);

            if (this._config && this._config.assets) {
                // todo: determine when to use JSON Loader, OBJ loader, or whatever
                var loader = new THREE.JSONLoader();
                loader.load(this._config.assets, function (geometry, materials) {
                    _this.onAssetsLoaded(geometry, materials);
                });
            }

            if (this._config && this._config.scene) {
                // todo: determine when to use JSON Loader, OBJ loader, or whatever
                var loader = new THREE.ObjectLoader();
                loader.load(this._config.scene, function (loaded) {
                    _this.onJSONSceneLoaded(loaded);
                }, function (progress) {
                    _this.onJSONSceneLoadProgress(progress);
                }, function (err) {
                    _this.onJSONSceneLoadError(err);
                });
            }

            this.onCreate();
        }

        /**
         * add object to scene
         * @param object
         */

    }, {
        key: 'add',
        value: function add(object, name) {
            if (!name) {
                name = this.name + '-child';
            }
            object.name = name;
            this._group.add(object);
        }
    }, {
        key: 'addRenderHook',
        value: function addRenderHook(method) {
            this._renderHooks.push(method);
        }

        /**
         * get parent group object
         * @returns {THREE.Object3D}
         */

    }, {
        key: 'preRender',

        /**
         * on prerender scene
         * @param scene
         */
        value: function preRender() {}

        /**
         * on render scene
         * @param time
         */

    }, {
        key: 'render',
        value: function render(time) {
            for (var c = 0; c < this._renderHooks.length; c++) {
                this._renderHooks[c].apply(this, [time]);
            }
            this.onRender(time);
        }
    }, {
        key: 'name',
        get: function get() {
            return this.constructor.name;
        }
    }, {
        key: 'group',
        get: function get() {
            return this._group;
        }

        /**
         * get scene
         * @returns {THREE.Object3D}
         */

    }, {
        key: 'sceneCollection',
        get: function get() {
            return this._sceneCollection;
        }

        /**
         * get children of this group
         * @returns {Array}
         */

    }, {
        key: 'children',
        get: function get() {
            return this._group.children;
        }
    }]);

    return BaseGroup;
}();

exports.default = BaseGroup;

},{}],5:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _color = require('../utils/color.js');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Tween = function () {
    function Tween(group) {
        var _this = this;

        _classCallCheck(this, Tween);

        if (!createjs) {
            throw new Error('CreateJS Tween must be included in your build or linked via script to animate');
            return;
        }
        group.addRenderHook(function (scene, time) {
            return _this.onRender(scene, time);
        });
        this.animations = [];
    }

    /**
     * animate THREE.js mesh position property
     * @param {int} from
     * @param {int} to
     * @param options
     */

    _createClass(Tween, [{
        key: 'animateColor',
        value: function animateColor(from, to, options) {
            var _this2 = this;

            if ((typeof from === 'undefined' ? 'undefined' : _typeof(from)) !== 'object') {
                if (typeof from !== 'number' && from.charAt(0) === '#') {
                    from = Number('0x' + from.substr(1, from.length));
                    from = _color2.default.decToRGB(from);
                } else {
                    from = _color2.default.decToRGB(from);
                }
            }

            if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) !== 'object') {
                if (typeof to !== 'number' && to.charAt(0) === '#') {
                    to = Number('0x' + to.substr(1, to.length));
                    to = _color2.default.decToRGB(to);
                } else {
                    to = _color2.default.decToRGB(to);
                }
            }

            from = this.populateStartAnimationObject(from, options);
            from.animation.step.push(function (step) {
                return _this2.animateColorStep(step);
            });
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * animate THREE.js mesh position property
         * @param {Three.js Vector3} from
         * @param {Three.js Vector3} to
         * @param options
         */

    }, {
        key: 'animatePosition',
        value: function animatePosition(from, to, options) {
            var _this3 = this;

            from = { x: from.x, y: from.y, z: from.z };
            to = { x: to.x, y: to.y, z: to.z };
            from = this.populateStartAnimationObject(from, options);
            from.animation.step.push(function (step) {
                return _this3.animatePositionStep(step);
            });
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * create and start animation
         * @param from
         * @param to
         * @param options
         */

    }, {
        key: 'animate',
        value: function animate(from, to, options) {
            if (!createjs) {
                throw new Error('CreateJS Tween must be included in your build or linked via script to animate');
                return;
            }

            if (!options.step) {
                throw new Error('Please define a "step" property on options to specify a callback for each animation update');
            }

            from = this.populateStartAnimationObject(from, to);
            this.createTween(to, from, options);
            this.animations.push(from);
        }

        /**
         * populate animation start object
         * @param from
         * @param options
         * @returns {*}
         */

    }, {
        key: 'populateStartAnimationObject',
        value: function populateStartAnimationObject(from, options) {
            from.animation = {};
            from.animation.animating = true;
            from.animation.step = [];
            if (options.step) {
                from.animation.step.push(options.step);
            }
            from.animation.target = options.target;
            from.animation.loop = options.loop;
            from.animation.complete = options.complete;
            return from;
        }

        /**
         * create tween
         * @param to
         * @param from
         * @param options
         * @returns {Tween}
         */

    }, {
        key: 'createTween',
        value: function createTween(to, from, options) {
            createjs.Tween.get(from, options).to(to, options.duration).call(function () {
                if (!this._loop) {
                    this.animation.animating = false;
                }
                if (this.animation.complete) {
                    this.animation.complete.apply(this, [this]);
                }
            });
        }

        /**
         * animate step for Three.JS position
         * @param step
         */

    }, {
        key: 'animatePositionStep',
        value: function animatePositionStep(step) {
            step.animation.target.position.set(step.x, step.y, step.z);
        }

        /**
         * animate step for Three.JS material color
         * @param step
         */

    }, {
        key: 'animateColorStep',
        value: function animateColorStep(step) {
            step.animation.target.material.color.setRGB(step.r / 255, step.g / 255, step.b / 255);
        }

        /**
         * animate render hook
         * @param time
         * @param scene
         */

    }, {
        key: 'onRender',
        value: function onRender(scene, time) {
            var running = [];
            for (var c = 0; c < this.animations.length; c++) {
                if (this.animations[c].animation.animating) {
                    running.push(this.animations[c]);
                    for (var d = 0; d < this.animations[c].animation.step.length; d++) {
                        this.animations[c].animation.step[d].apply(this, [this.animations[c]]);
                    }
                }
            }
            this.animations = running;
        }
    }]);

    return Tween;
}();

exports.default = Tween;

},{"../utils/color.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /**
     * turn decimal color to RGB
     * @param dec
     * @returns {{r: number, g: number, b: number}}
     */
    decToRGB: function decToRGB(dec) {
        var r = dec >> 16 & 0xff;
        var g = dec >> 8 & 0xff;
        var b = dec & 0xff;
        return { r: r, g: g, b: b };
    },
    RGBToDec: function RGBToDec(rgb) {
        return rgb.r << 16 + rgb.g << 16 + rgb.b;
    }
};

},{}]},{},[3])(3)
});

//# sourceMappingURL=vrplayground-build.js.map
