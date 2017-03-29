import BaseGroup from '../../src/basegroup.js';

export default class Dome extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     */
    onCreate() {
        this._mesh = new THREE.Mesh(this.createGeometry(), this.createMaterial());
        this.add(this._mesh, 'dome');

        this._particle = new THREE.Mesh(this.createParticleGeometry(), this.createParticleMaterial());
        this._particle.scale.x = this._particle.scale.y = 10;
        this.add( this._particle );
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
        if (this.scene.controller.connected) {
            var collisions = this.scene.controller.pointingAt([this._mesh]).collisions;
            if (collisions.length > 0) {
                this._particle.position.copy( collisions[0].point );
            }
        }
    }

    /**
     * create globe geometry
     * @returns {THREE.IcosahedronGeometry}
     */
    createGeometry() {
        return new THREE.IcosahedronGeometry( 800, 2 );
    }

    /**
     * create particle geometry
     * @returns {THREE.IcosahedronGeometry}
     */
    createParticleGeometry() {
        return new THREE.SphereGeometry(1, 4, 4);
    }

    /**
     * create globe material
     */
    createMaterial() {
        return new THREE.MeshPhongMaterial({
            color      :  0xc1c489,
            side       :  THREE.BackSide,
            shininess  :  10,
            shading    :  THREE.FlatShading
        });
    }

    /**
     * create particle material
     * @returns {MeshPhongMaterial|db|Ca|*}
     */
    createParticleMaterial() {
        return new THREE.MeshPhongMaterial({
            color      :  0xff0000,
            shading    :  THREE.FlatShading
        });
    }
}
