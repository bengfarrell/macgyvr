import BaseGroup from '../../src/basegroup.js'

export default class VirtualDayDream extends BaseGroup {
    /**
     * on create scene (or earliest possible opportunity)
     */
    onCreate() {
    }

    onAssetsLoaded(geometry) {
        this._mesh = new THREE.Mesh(geometry, this.createMaterial());
        this.add(this._mesh, 'controller');
        this.group.position.z = -20;
        this.group.scale.set(1000, 1000, 1000);
    }

    /**
     * create globe material
     */
    createMaterial() {
        return new THREE.MeshPhongMaterial({
            color: 0x888899,
            shininess: 15,
            side: THREE.DoubleSide
        });
    }

    /**
     * on render
     * @param time
     */
    onRender(time) {
        if (this._mesh && this.scene.controller) {
            this._mesh.quaternion.copy(this.scene.controller.orientation);
        }
    }
}
