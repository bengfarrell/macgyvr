import BaseApplication from '../../src/baseapplication.js';
import TestScene from '../objects/testscene.js';

export default class Main extends BaseApplication {
    onCreate(scene, scenecollection) {
        scene.addObjects([
            new TestScene({ scene: '../assets/tempscene.json' })
        ]);
    }

    onRender(time) {}
}
