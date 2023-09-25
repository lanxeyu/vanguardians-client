const allSprites = []
const characters = []
const enemies = []


function updateAllSprites() {
    for (const sprite of allSprites) {
        sprite.update();
    }
}


export {updateAllSprites}
export { allSprites, characters, enemies }