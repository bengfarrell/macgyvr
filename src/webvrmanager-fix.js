/**
* Helper for entering VR mode. Fix for new WebVR API
*/
WebVRManager.prototype.enterVRMode_ = function() {
    this.hmd.requestPresent([{
        source: this.renderer.domElement,
        predistorted: this.predistorted
    }]);
};