export default {
    /**
     * turn decimal color to RGB
     * @param dec
     * @returns {{r: number, g: number, b: number}}
     */
    decToRGB(dec) {
        var r = (dec >> 16) & 0xff;
        var g = (dec >> 8)  & 0xff;
        var b = dec & 0xff;
        return { r: r, g: g, b: b };
    },

    RGBToDec(rgb) {
        return rgb.r << 16 + rgb.g << 16 + rgb.b;
    }
}
