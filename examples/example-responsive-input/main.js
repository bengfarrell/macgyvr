import BaseApplication from '../../src/baseapplication.js';
import InteractableCube from '../objects/interactablecube.js';
import ResponsiveInput from '../../src/input/responsive.js'
import PointableDome from '../objects/pointabledome.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        scene.controller = new ResponsiveInput(scene.camera);
        scene.controller.connect();

        this.add([
            new InteractableCube(),
            new PointableDome(),
        ]);
    }

    onRender(time) {}
}
