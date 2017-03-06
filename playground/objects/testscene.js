import BaseGroup from '../../src/basegroup.js';
import Tween from '../../src/plugins/tween.js';

export default class TestScene extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     */
    onCreate() {
    }

    onJSONSceneLoaded(scene) {
        super.onJSONSceneLoaded(scene);
        this._cube = scene.getObjectByName('Box 1');
        this._sphere = scene.getObjectByName('Sphere 2');
    };

    /**
     * on render
     * @param time
     */
    onRender(time) {
    }
}
