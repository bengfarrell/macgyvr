import Color from '../utils/color.js';

export default class Tween {
    constructor(group) {}

    /**
     * animate THREE.js mesh position property
     * @param {int} from
     * @param {int} to
     * @param options
     */
    animateColor(from, to, options) {
        if (typeof from !== 'object') {
            if (typeof from !== 'number' && from.charAt(0) === '#') {
                from = Number('0x' + from.substr(1, from.length));
                from = Color.decToRGB(from);
            } else {
                from = Color.decToRGB(from);
            }
        }

        if (typeof to !== 'object') {
            if (typeof to !== 'number' && to.charAt(0) === '#') {
                to = Number('0x' + to.substr(1, to.length));
                to = Color.decToRGB(to);
            } else {
                to = Color.decToRGB(to);
            }
        }

        from = this.populateStartAnimationObject(from, options);
        from.animation.step.push( (step) => this.animateColorStep(step));

        var anim = this.createTween(to, from, options);
        anim.start();
    }

    /**
     * animate THREE.js mesh position property
     * @param {Three.js Vector3} from
     * @param {Three.js Vector3} to
     * @param options
     */
    animatePosition(from, to, options) {
        from = { x: from.x, y: from.y, z: from.z };
        to = { x: to.x, y: to.y, z: to.z };
        from = this.populateStartAnimationObject(from, options);
        from.animation.step.push( (step) => this.animatePositionStep(step));
        var anim = this.createTween(to, from, options);
        anim.start();
    }

    /**
     * create and start animation
     * @param from
     * @param to
     * @param options
     */
    animate(from, to, options) {
        if (!options.step) {
            throw new Error('Please define a "step" property on options to specify a callback for each animation update');
        }

        from = this.populateStartAnimationObject(from, to);
        var anim = this.createTween(to, from, options);
        anim.start();
    }

    /**
     * populate animation start object
     * @param from
     * @param options
     * @returns {*}
     */
    populateStartAnimationObject(from, options) {
        from.animation = {};
        from.animation.animating = true;
        from.animation.step = [];
        if (options.step) {
            from.animation.step.push(options.step);
        }
        from.animation.target = options.target;
        from.animation.loop = options.loop;
        from.animation.complete = options.complete;
        return from;
    }

    /**
     * create tween
     * @param to
     * @param from
     * @param options
     * @returns {Tween}
     */
    createTween(to, from, options) {
        return new TWEEN.Tween(from, options)
            .to(to, options.duration)
            .onUpdate(function (value) {
                for (var d = 0; d < this.animation.step.length; d++) {
                    this.animation.step[d].apply(this, [this]);
                }
            })
            .onComplete( function() {
                if (!this._loop) {
                    this.animation.animating = false;
                }
                if (this.animation.complete) {
                    this.animation.complete.apply(this, [this]);
                }
            });
    }

    /**
     * animate step for Three.JS position
     * @param step
     */
    animatePositionStep(step) {
        step.animation.target.position.set(step.x, step.y, step.z);
    }

    /**
     * animate step for Three.JS material color
     * @param step
     */
    animateColorStep(step) {
        step.animation.target.material.color.setRGB(step.r/255, step.g/255, step.b/255);
    }

    /**
     * animate render hook
     * @param time
     */
    /*onRender(time) {
        var running = [];
        for (var c = 0; c < this.animations.length; c++) {
            if (this.animations[c].animation.animating) {
                running.push(this.animations[c]);
                console.log(this.animations[c])
                for (var d = 0; d < this.animations[c].animation.step.length; d++) {
                    this.animations[c].update();
                    //this.animations[c].animation.step[d].apply(this, [this.animations[c]]);
                }
            }
        }
        this.animations = running;
    }*/
}
