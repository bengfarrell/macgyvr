import BaseGroup from './basegroup.js';

export default class AFrameGroup extends BaseGroup {
    constructor(markup) {
        super();
        this._agroup = document.createElement('a-entity');
        if (markup) {
            this._agroup.innerHTML = markup;
        }
        this._group = this._agroup.object3D;

    }

    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    create(scene) {
        scene.appendChild(this._agroup);
        this.onInitialize(this._config);

        super.create(scene);
        this._agroup.id = this.name;
    }

}
