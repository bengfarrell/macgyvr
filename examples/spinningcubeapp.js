import BaseApplication from '../src/baseapplication.js';
import SpinningCubeObject from './spinningcubeobject.js';

export default class Main extends BaseApplication {
    onCreate(scene) {
        let ground = BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);
        ground.position.y = -2;
        ground.position.z = 5;
        this.add([
            new SpinningCubeObject(),
            ground
        ]);

    }
}
