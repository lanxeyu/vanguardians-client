


function getSilkscreenFont() {
    let font = new FontFace("Silkscreen",
    "url(https://fonts.googleapis.com/css2?family=Silkscreen&display=swap");

    if (font === null) {
        font = new FontFace("Silkscreen",
        "url(https://fonts.googleapis.com/css2?family=Silkscreen&display=swap");
    }

    return font;

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