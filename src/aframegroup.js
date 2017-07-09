import BaseGroup from './basegroup.js';
import AFrameUtils from './utils/aframe.js';

export default class AFrameGroup extends BaseGroup {
    constructor(config) {
        super(config);
    }

    init() {
        this._agroup = document.createElement('a-entity');
        if (this.config && this.config.markup) {
            this._agroup.innerHTML = config.markup;
        }
        this._group = this._agroup.object3D;

        super.init();
    }

    get group() {
        return this._agroup;
    }

    addedToScene(scene) {
        scene.appendChild(this._agroup);
        this._agroup.id = this.name;
        super.addedToScene(scene);
    }

    /**
     * translate/move to
     * @param position
     */
    translate(position) {
        let currentPos = this._agroup.getAttribute('position');
        if (currentPos) {
            if (!position.x) {
                position.x = currentPos.x;
            }
            if (!position.y) {
                position.y = currentPos.y;
            }
            if (!position.z) {
                position.z = currentPos.z;
            }
        } else {
            if (!position.x) {
                position.x = 0;
            }
            if (!position.y) {
                position.y = 0;
            }
            if (!position.z) {
                position.z = 0;
            }
        }
        this._agroup.setAttribute('position', position.x + ' ' + position.y + ' ' + position.z);
    }

    add(element, name) {
        if (element.isMacgyvrGroup) {
            // not an element, but a group object, pass through to base class
            super.add(element, name);
        } else {
            this._agroup.appendChild(element);
            return element;
        }
    }

}

AFrameGroup.utils = AFrameUtils;
