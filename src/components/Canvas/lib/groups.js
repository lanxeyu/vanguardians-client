let allSprites = [];
let guardians = [];
let guardianProjectiles = [];
let enemies = [];
let enemyProjectiles = [];
let damageNumbers = [];
let van = [];
let background = [];
let ui = [];
let portraits = []
let foreground = [];
let guardianHealingProjectiles = [];
let popUpMsgs = [];
let timers = [];
let fx = [];

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

function clearAllSprites() {
    allSprites = [];
}

function resetAllGroups() {
    allSprites = [];
    guardians.length = 0;
    guardianProjectiles.length = 0;
    enemies.length = 0;
    enemyProjectiles.length = 0;
    damageNumbers.length = 0;
    van.length = 0;
    background.length = 0;
    ui.length = 0;
    portraits.length = 0;
    foreground.length = 0;
    guardianHealingProjectiles.length = 0;
    popUpMsgs = [];
    timers = [];
    fx = [];
}

function drawGuardians(context) {
    for (const sprite of guardians) {
        sprite.draw(context);
    }
}

function drawEnemies(context) {
    for (const sprite of enemies) {
        sprite.draw(context);
    }
}

function drawGuardianProjectiles(context) {
    for (const sprite of guardianProjectiles) {
        sprite.draw(context);
    }
}

function drawGuardianHealingProjectiles(context) {
    for (const sprite of guardianHealingProjectiles) {
        sprite.draw(context);
    }
}

function drawEnemyProjectiles(context) {
    for (const sprite of enemyProjectiles) {
        sprite.draw(context);
    }
}

function drawDamageNumbers(context) {
    for (const sprite of damageNumbers) {
        sprite.draw(context);
    }
}

function drawAllHealthbars(context) {
    for (const sprite of guardians) {
        sprite.drawHealthbars(context);
    }
    for (const sprite of enemies) {
        sprite.drawHealthbars(context);
    }
}

function drawVan(context) {
    for (const sprite of guardians) {
        sprite.draw(context);
    }
}

function drawBackground(context) {
    for (const sprite of background) {
        sprite.draw(context);
    }
}

function drawPopUpMsgs(context) {
    for (const sprite of popUpMsgs) {
        sprite.draw(context)
    }
}

function drawFX(context) {
    for (const sprite of fx) {
        sprite.draw(context);
    }
}

function drawForeground(context) {
    for (const sprite of foreground) {
        sprite.draw(context)
    }
}

function drawUI(context) {
    for (const sprite of ui) {
        sprite.draw(context)
    }
}


export {
    addToGroup,
    removeFromGroup,
    allSprites,
    guardians,
    guardianProjectiles,
    guardianHealingProjectiles,
    enemies,
    enemyProjectiles,
    damageNumbers,
    van,
    background,
    ui,
    foreground,
    portraits,
    updateAllSprites,
    clearAllSprites,
    resetAllGroups,
    popUpMsgs,
    timers,
    fx,
    drawGuardians,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardianHealingProjectiles,
    drawEnemyProjectiles,
    drawDamageNumbers,
    drawPopUpMsgs,
    drawAllHealthbars,
    drawVan,
    drawBackground,
    drawForeground,
    drawUI,
    drawFX
};
