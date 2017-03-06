import Cube from './objects/cube.js';
import TestScene from './objects/testscene.js';

export default class VRPlaygroundScene {
    constructor(scene) {
        scene.onPreRender = this.render;

        scene.addObjects([
            new Cube(),
            new TestScene({ scene: './assets/testscene.json' }),
        ]);
    }

    render(time) {
    }
}
