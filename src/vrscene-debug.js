import VRScene from './vrscene.js';

export default class extends VRScene {
    /**
     * initialize default class properties
     * @private
     */
    setProperties() {
        super.setProperties();

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
    parseAttributes() {
        super.parseAttributes();

        if (this.hasAttribute('debugview')) {
            this._debugView = true;
        }

        if (this.hasAttribute('disablevr')) {
            this._disableVREffect = true;
        }

        if (this.hasAttribute('outofbodykeycode')) {
            this._outOfBodyKeyCode = this.getAttribute('outofbodykeycode');
        }
    };

    /**
     * element attached callback
     * @private
     */
    attachedCallback() {
        super.attachedCallback();
        document.addEventListener('keydown', event => this.onKeyDown(event));
    }

    onKeyDown(event) {
        if (event.keyCode === parseInt(this._outOfBodyKeyCode)) {
            this._collection.vrcamera.goOutOfBody();
        }
    }
}
