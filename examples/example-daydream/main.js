import BaseApplication from '../../src/baseapplication.js';
import VirtualDayDream from '../objects/virtualdaydream.js';
import DayDreamInput from '../../src/input/daydream.js';
import PointableDome from '../objects/pointabledome.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.add([
            new VirtualDayDream({ geometry: '../assets/daydream.json' }),
            new PointableDome(),
        ]);

        scene.controller = new DayDreamInput(scene.camera);
        scene.controller.connect();
    }

    onRender(time) {}
}
