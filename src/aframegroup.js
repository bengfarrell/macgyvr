import BaseGroup from './basegroup.js';

export default class AFrameGroup extends BaseGroup {
    constructor(markup) {
        super();
        this._agroup = document.createElement('a-entity');
        this._agroup.innerHTML = markup;
        this._group = this._agroup.object3D;
        document.body.appendChild(this._agroup);
        this.onInitialize(this._config);
    }

}
