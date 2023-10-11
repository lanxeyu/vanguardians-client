let silkscreenFont = null;
    
function getSilkscreenFont() {
    if (silkscreenFont === null) {
        silkscreenFont = new FontFace("Silkscreen",
        "url(fonts/Silkscreen-Regular.ttf)")
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