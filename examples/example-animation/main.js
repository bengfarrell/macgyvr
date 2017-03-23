import BaseApplication from '../../src/baseapplication.js';
import AnimatedCube from '../objects/animatedcube.js';
import Dome from '../objects/dome.js';

export default class Main extends BaseApplication {
    onCreate(scene, scenecollection) {
        scene.addObjects([
            new Dome(),
            new AnimatedCube()
        ]);
    }

    onRender(time) {}
}
