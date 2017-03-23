import BaseApplication from '../../src/baseapplication.js';
import Cube from '../objects/cube.js';
import Dome from '../objects/dome.js';

export default class Main extends BaseApplication {
    onCreate(scene, scenecollection) {
        scene.addObjects([
            new Dome(),
            new Cube()
        ]);
    }

    onRender(time) {}
}
