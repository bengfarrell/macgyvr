import BaseInput from './baseinput.js';

export default class Daydream extends BaseInput {
    constructor(camera) {
        super();
        this._camera = camera;
        this._controller = new DaydreamController();
        this._controller.onStateChange((state) => this.onControllerUpdate(state));
        this._sensorfusion = new MadgwickAHRS();
        this._sensorfusion.setQuaternion( [ 0.7071067811865475, 0, 0, 0.7071067811865475 ] ); // Hack-ish: Rotate internal quaternion
        this._buttons = {
            app: false,
            home: false,
            click: false,
            volumePlus: false,
            volumeMinus: false,
            xTouch: 0,
            yTouch: 0
        };
    }

    /**
     * connect and start listening
     */
    connect() {
        this.createButton();
    }

    /**
     * on controller update
     * @param state
     */
    onControllerUpdate(state) {
        this._sensorfusion.update(
            state.xGyro, state.yGyro, state.zGyro,
            state.xAcc, state.yAcc, state.zAcc,
            state.xOri, state.yOri, state.zOri
        );

        var changed = [];
        if (state.isClickDown !== this._buttons.click) {
            this._buttons.click = state.isClickDown;
            changed.push( { 'click': state.isClickDown });
        }

        if (state.isAppDown !== this._buttons.app) {
            this._buttons.app = state.isAppDown;
            changed.push( { 'app': state.isAppDown });
        }

        if (state.isHomeDown !== this._buttons.home) {
            this._buttons.home = state.isHomeDown;
            changed.push( { 'home': state.isHomeDown });
        }

        if (state.isVolMinusDown !== this._buttons.volumeMinus) {
            this._buttons.volumeMinus = state.isVolMinusDown;
            changed.push( { 'volumeMinus': state.isVolMinusDown });
        }

        if (state.isVolPlusDown !== this._buttons.volumePlus) {
            this._buttons.volumePlus = state.isVolPlusDown;
            changed.push( { 'volumePlus': state.isVolPlusDown });
        }

        if (state.xTouch !== this._buttons.xTouch && state.yTouch !== this._buttons.yTouch) {
            changed.push( { 'touch': { x: state.xTouch, y: state.yTouch } });
        }

        if (changed.length > 0) {
            var event = { changed: changed, controllerstate: state };
            if (this._pointables.length > 0) {
                event.pointingat = this.pointingAt(this._pointables);
            }
            this.dispatchEvent('button', { changed: changed, controllerstate: state });
        }
    }

    /**
     * on click to connect controller
     */
    onConnectController() {
        super.connect();
        this._controller.connect();
        this.dispatchEvent('connected');
    }

    /**
     * get orientation of device
     */
    get orientation() {
        if (!this.connected) {
            return new THREE.Quaternion();
        }
        var q1 = new THREE.Quaternion().fromArray(this._sensorfusion.getQuaternion());
        var q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI/2, 0, 0));
        return q2.multiply(q1);
    }

    /**
     * detect against possible objects
     * @param possibleObjects
     */
    pointingAt(possibleObjects) {
        if (!possibleObjects) {
            possibleObjects = this._pointables;
        }

        var m = new THREE.Matrix4().makeRotationFromQuaternion(this.orientation);
        var direction = new THREE.Vector3(0, 0, -1);
        direction = direction.applyMatrix4(m);

        var raycaster = new THREE.Raycaster();
        raycaster.set( this._camera.position, direction );
        var collisions = raycaster.intersectObjects( possibleObjects );
        var objects = [];
        for (var c = 0; c < collisions.length; c++) {
            if (objects.indexOf(collisions[c].object) == -1) {
                objects.push(collisions[c].object);
            }
        }
        return { objects: objects, collisions: collisions };
    }

    createButton() {
        var button = document.createElement('button');
        button.className = 'a-enter-vr-button';
        button.title = 'Connect to Daydream Controller';
        var s = button.style;
        s.left = '30px';
        s.background = 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTM4LjMsOC40YzMuNSwwLDYuNSwzLDYuNSw2LjVzLTMsNi43LTYuNyw2LjdsLTI3LjYsMGMtMy43LDAtNi43LTMtNi43LTYuN2MwLTMuNywzLjItNi41LDYuOS02LjVMMzguMyw4LjR6IgoJLz4KPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjguMSIgY3k9IjE0LjkiIHI9IjIuNyIvPgo8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIyMS43IiBjeT0iMTQuOSIgcj0iMi43Ii8+CjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjM4LjMiIGN5PSIxNC45IiByPSI2LjUiLz4KPC9zdmc+Cg==") 50% 50%/70% 70% no-repeat rgba(0,0,0,.35)';

        // Prevent button from being selected and dragged.
        button.draggable = false;
        button.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        // Style it on hover.
        button.addEventListener('mouseenter', function(e) {
            s.filter = s.webkitFilter = 'drop-shadow(0 0 5px rgba(255,255,255,1))';
        });
        button.addEventListener('mouseleave', function(e) {
            s.filter = s.webkitFilter = '';
        });

        // assign click event
        button.addEventListener('click', e => this.onConnectController(e));

        document.querySelector('.a-enter-vr').appendChild(button);
    };
}
