const allSprites = []
const characters = []
const enemies = []

function addToAllSprites(sprite) {
    allSprites.push(sprite);
}

function removeFromAllSprites(sprite) {
    const index = allSprites.indexOf(sprite);
    if (index !== -1) {
        allSprites.splice(index, 1);
    }
}

function addToCharacters(sprite) {
    characters.push(sprite);
}

function removeFromCharacters(sprite) {
    const index = characters.indexOf(sprite);
    if (index !== -1) {
        characters.splice(index, 1);
    }
}

function addToEnemies(sprite) {
    enemies.push(sprite);
}

function removeFromEnemies(sprite) {
    const index = enemies.indexOf(sprite);
    if (index !== -1) {
        enemies.splice(index, 1);
    }
}

function updateAllSprites() {
    for (const sprite of allSprites) {
        sprite.update();
    }
}

export { 
        addToAllSprites, removeFromAllSprites, 
        addToCharacters, removeFromCharacters,
        addToEnemies, removeFromEnemies,
        updateAllSprites
    }
