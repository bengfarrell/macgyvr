import BaseGroup from '../src/basegroup.js';

export default class SpinningCube extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate(scene) {
        this.cube = this.add(BABYLON.Mesh.CreateBox('cube', 2, scene));
        this.cube.position.y = 1;
        this.cube.position.z = 10;
    }

    onRender(deltatime) {
        this.cube.rotate(BABYLON.Axis.Y, .005, BABYLON.Space.LOCAL);
        this.cube.rotate(BABYLON.Axis.Z, .005, BABYLON.Space.LOCAL);
    }
}
