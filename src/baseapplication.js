import AFrameGroup from './aframegroup.js';

export default class BaseApplication {
    constructor(ascene, cfg) {
        if (!cfg) {
            cfg = {};
        }
        this._ascene = ascene;
        this._ascene.appConfig = cfg;
        this._ascene.addBehavior(this);
        this.el = { isPlaying: true };
        this.onCreate(ascene);
    }

    get config() {
        return this._ascene.appConfig;
    }

    /**
     * a-frame tick
     * @param time
     */
    tick(time) {
        this.onRender(time)
    }

    /**
     * add objects to scene
     * @param grouplist
     */
    add(grouplist) {
        if (grouplist.length === undefined) {
            grouplist = [grouplist];
        }
        for (var c in grouplist) {
            grouplist[c].addedToScene(this._ascene);

            if (grouplist[c].group) {
                this._ascene.appendChild(grouplist[c].group);
                this._ascene.addBehavior(grouplist[c]);
            } else {
                this._ascene.appendChild(grouplist[c]);
            }
        }
    }

    onCreate(ascene) {}
    onRender(time) {}
}
