let silkscreenFont = null;
let middlegroundImage = null;
let rootsImage = null;
let groundImage = null;

function getSilkscreenFont() {
    if (silkscreenFont === null) {
        silkscreenFont = new FontFace("Silkscreen",
        "url(src/components/canvas/fonts/Silkscreen-Regular.ttf)")
    }

    return silkscreenFont;

}

function loadFonts() {
    getSilkscreenFont().load().then((font) => {
        document.fonts.add(font);
    });
}

export {
    getSilkscreenFont,
    loadFonts
}