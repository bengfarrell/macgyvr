export default class BaseApplication {
    constructor(ascene) {
        this._ascene = ascene;
        this._ascene.addBehavior(this);
        this.el = { isPlaying: true };
        this.onCreate(ascene);
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
        for (var c in grouplist) {
            grouplist[c].create(this._ascene);
            this._ascene.addBehavior(grouplist[c]);
        }
    }

    onCreate(ascene) {}
    onRender(time) {}
}
