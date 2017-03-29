import BaseGroup from '../../src/basegroup.js';
import Animation from '../../src/utils/animation.js';

export default class Cube extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     * @param scene
     */
    onCreate() {
        this._pointingAt = false;
        this._material = this.createMaterial();
        this._mesh = new THREE.Mesh(this.createGeometry(), this._material);
        this.scene.controller.addPointable(this._mesh);
        this.scene.controller.addListener('button', (type, event) => this.onClick(type, event));
        this.add(this._mesh, 'cube');
        this.group.position.z = -20;
        this._mesh.position.x = -12;
        this.animation = new Animation(this);
    }

    /**
     * on click
     * @param type
     * @param event
     */
    onClick(type, event) {
        if (this.scene.controller.isPointingAt(this._mesh)) {
            var props = {
                target: this._mesh,
                duration: 3000
            };
            this.animation.animatePosition( this._mesh.position, new THREE.Vector3(Math.random() * 15, Math.random() * 15, Math.random() * 15), props );
        }
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
        this._mesh.rotation.y += .01;
        var pointing = this._scene.controller.isPointingAt(this._mesh);
        if (pointing !== this._pointingAt) {
            if (pointing) {
                this._mesh.scale.set(1.05, 1.05, 1.05);
                this._mesh.material.color.set(0xffff00);
            } else {
                this._mesh.scale.set(1.0, 1.0, 1.0);
                this._mesh.material.color.set(0xff0000);
            }
            this._pointingAt = pointing;
        }
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
        });
    }
}
