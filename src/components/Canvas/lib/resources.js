let silkscreenFont = null;
let middlegroundImage = null;
let rootsImage = null;
let groundImage = null;

function getSilkscreenFont() {
    if (silkscreenFont === null) {
        silkscreenFont = new FontFace("Silkscreen",
        "url(https://fonts.googleapis.com/css2?family=Silkscreen&display=swap");
    }

    return silkscreenFont;

}

function getMiddleground() {
    

    if (middlegroundImage === null) {
        middlegroundImage = new Image();
        middlegroundImage.src = 'src/components/canvas/img/middleground.png';
    }

    return middlegroundImage;
}

function getRoots() {
    if (rootsImage === null) {
        rootsImage = new Image();
        rootsImage.src = 'src/components/canvas/img/roots.png';
    }

    return rootsImage;
}

function getGround() {
    if (groundImage === null) {
        groundImage = new Image();
        groundImage.src = 'src/components/canvas/img/ground.png';
    }

    return groundImage;
}

function loadFonts() {
    getSilkscreenFont().load().then((font) => {
        document.fonts.add(font);
    });
}

export {
    getSilkscreenFont,
    loadFonts,
    getMiddleground,
    getRoots,
    getGround
}