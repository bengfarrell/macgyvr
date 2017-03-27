import BaseApplication from '../../src/baseapplication.js';
import Cube from '../objects/cube.js';
import Dome from '../objects/dome.js';
import AFrameGroup from '../objects/aframeobject.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.add([
            new Dome(),
            new Cube(),
            new AFrameGroup(document.getElementById('ascene').innerHTML)
        ]);
    }

    onRender(time) {}
}
