import BaseApplication from '../../src/baseapplication.js';
import VirtualDayDream from '../objects/virtualdaydream.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        this.add([
            new VirtualDayDream({ geometry: '../assets/daydream.json' })
        ]);
    }

    onRender(time) {}
}
