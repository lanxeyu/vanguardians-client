const allSprites = [];
const guardians = [];
const guardianProjectiles = [];
const enemies = [];
const enemyProjectiles = [];
const damageNumbers = [];

function addToGroup(sprite, group) {
    group.push(sprite);
}

function removeFromGroup(sprite, group) {
    const index = group.indexOf(sprite);
    if (index !== -1) {
        group.splice(index, 1);
    }
}

function updateAllSprites() {
    for (const sprite of allSprites) {
        sprite.update();
    }
}

function drawGuardians (context) {
    for (const sprite of guardians) {
        sprite.draw(context)
    }
}

function drawEnemies (context) {
    for (const sprite of enemies) {
        sprite.draw(context)
    }
}

function drawGuardianProjectiles (context) {
    for (const sprite of guardianProjectiles) {
        sprite.draw(context)
    }
}

function drawEnemyProjectiles (context) {
    for (const sprite of enemyProjectiles) {
        sprite.draw(context)
    }
}

function drawDamageNumbers (context) {
    for (const sprite of damageNumbers) {
        sprite.draw(context)
    }
}

function drawAllHealthbars (context) {
    for (const sprite of guardians) {
        sprite.drawHealthbars(context)
    }
    for (const sprite of enemies) {
        sprite.drawHealthbars(context)
    }
}

export { 
    addToGroup, removeFromGroup,
    allSprites, guardians, guardianProjectiles, enemies, enemyProjectiles, damageNumbers,
    updateAllSprites,
    drawGuardians, drawEnemies, drawGuardianProjectiles, drawEnemyProjectiles, drawDamageNumbers, drawAllHealthbars
}
