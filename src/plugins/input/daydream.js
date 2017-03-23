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
        var q = new THREE.Quaternion();
        var sf = this._sensorfusion.getQuaternion();
        q = q.fromArray(sf);
        //var offset = new THREE.Quaternion( Math.PI/2, 0, 0);
        //q = q.multiply(offset);
        return q;
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
        var direction = new THREE.Vector3(0, 0, 1);
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
        var button = document.createElement('img');
        button.className = 'daydream-button';
        button.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgOCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fS5zdDF7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1taXRlcmxpbWl0OjEwO30uc3Qye2ZpbGw6I0ZGRkZGRjt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwzLjdDMCwxLjcsMS43LDAsMy43LDBzMy44LDEuNywzLjgsMy44djE1LjZjMCwyLjEtMS43LDMuOC0zLjgsMy44UzAsMjEuNCwwLDE5LjNWMy43eiIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjMuNyIgY3k9IjkuNSIgcj0iMS41Ii8+PGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMy43IiBjeT0iMTMuMSIgcj0iMS41Ii8+PGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMy43IiBjeT0iMy43IiByPSIzLjciLz48L3N2Zz4=';
        button.title = 'Connect to Daydream Controller';
        var s = button.style;
        s.position = 'absolute';
        s.width = '24px';
        s.height = '24px';
        s.backgroundSize = 'cover';
        s.backgroundColor = 'transparent';
        s.border = 0;
        s.userSelect = 'none';
        s.webkitUserSelect = 'none';
        s.MozUserSelect = 'none';
        s.cursor = 'pointer';
        s.padding = '12px';
        s.zIndex = 1;
        s.display = 'inline-block';
        s.boxSizing = 'content-box';
        s.bottom = 0;
        s.left = 0;

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

        document.body.appendChild(button);
    };
}
