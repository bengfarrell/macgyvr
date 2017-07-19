export default {
    createNode(tagname, attributes) {
        var el = document.createElement(tagname);
        for (var c in attributes) {
            var key = c.replace(/_/g, '-'); // hyphens not cool in JSON, use underscore, and we convert to hyphen here
            el.setAttribute(key, attributes[c]);
        }
        return el;
    },

    addAnimation(parent, props, cleanWhenDone) {
        let el = this.createNode('a-animation', props);
        if (cleanWhenDone) {
            el.addEventListener('animationend', function () {
                el.parentNode.removeChild(el);
            });
        }
        parent.appendChild(el);
        return el;
    }
}
