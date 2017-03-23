import BaseGroup from '../../src/basegroup.js';

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
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
        this.group.rotation.y += .01;
    }

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
