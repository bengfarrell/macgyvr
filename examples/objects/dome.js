import BaseGroup from '../../src/basegroup.js';

export default class Dome extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     */
    onCreate() {
        this._material = this.createMaterial();
        this._coloredFace = 0;
        this._mesh = new THREE.Mesh(this.createGeometry(), this._material);
        this.add(this._mesh, 'dome');
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
    }

    onInput() {

    }

    /**
     * create globe geometry
     * @returns {THREE.IcosahedronGeometry}
     */
    createGeometry() {
        return new THREE.IcosahedronGeometry( 800, 2 );
    }

    /**
     * create globe material
     */
    createMaterial() {
        return new THREE.MeshPhongMaterial({
            color      :  0xc1c489,
            vertexColors: THREE.FaceColors,
            side       :  THREE.BackSide,
            shininess  :  10,
            shading    :  THREE.FlatShading
        });
    }
}
