import BaseApplication from '../../src/baseapplication.js';
import AnimatedCube from '../objects/animatedcube.js';
import Dome from '../objects/dome.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.add([
            new Dome(),
            new AnimatedCube()
        ]);
    }

    onRender(time) {}
}
