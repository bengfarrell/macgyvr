import BaseApplication from '../../src/baseapplication.js';
import InteractableCube from '../objects/interactablecube.js';
import PointableDome from '../objects/pointabledome.js';
import ResponsiveInput from '../../src/plugins/input/responsive.js';

export default class Main extends BaseApplication {
    onCreate(scene, scenecollection) {
        scenecollection.input = new ResponsiveInput(scenecollection.camera);
        scenecollection.input.connect();

        scene.addObjects([
            new PointableDome(),
            new InteractableCube()
        ]);
    }

    onRender(time) {}
}
