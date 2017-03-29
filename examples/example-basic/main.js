import BaseApplication from '../../src/baseapplication.js';
import Cube from '../objects/cube.js';
import Dome from '../objects/dome.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.add([
            new Dome(),
            new Cube()
        ]);
    }

    onRender(time) {}
}