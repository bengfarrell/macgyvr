import BaseGroup from '../basegroup.js';
import AFrameUtils from './aframe.js';

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
        if (element instanceof HTMLElement) {
            this._agroup.appendChild(element);
            return element;
        }

        if (element instanceof AFrameGroup) {
            this._childgroups.push(element);
            this._agroup.appendChild(element.group);
            return element;
        }
        super.add(element, name);
    }

}

AFrameGroup.utils = AFrameUtils;
