export default class BaseApplication {
    constructor(scene) {
        scene.registerApplication(this);
    }

    onCreate(scene, scenecollection) {}
    onPreRender(time) {}
    onRender(time) {}
}
