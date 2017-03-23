import BaseGroup from '../../src/basegroup.js';
import Tween from '../../src/plugins/tween.js';

export default class Cube extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate() {
        this._material = this.createMaterial();
        this._mesh = new THREE.Mesh(this.createGeometry(), this._material);
        this.add(this._mesh, 'cube');
        this.group.position.z = -20;
        this.tweener = new Tween(this);

        var props = {
            target: this._mesh,
            duration: 3000
        };
        this.tweener.animateColor( 0xff0000, 0x00ff00, props );
        this.tweener.animatePosition( new THREE.Vector3(0,0,0), new THREE.Vector3(10,6,3), props );
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {}

    /**
     * create globe geometry
     * @returns {THREE.IcosahedronGeometry}
     */
    createGeometry() {
        return new THREE.CubeGeometry(5, 5, 5, 10, 10);
    }

    /**
     * create globe material
     */
    createMaterial() {
        return new THREE.MeshPhongMaterial({
            color      :  0xff0000,
            shininess  :  10,
            shading    :  THREE.FlatShading,
            transparent: true,
            opacity    : 1
        });
    }
}
