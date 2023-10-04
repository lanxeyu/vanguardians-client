import { Lanxe, Robbie, Duncan, Steph, James, Alex } from "./guardians";
import { Skeleton, Goblin, Demon, Troll, Mushroom } from "./enemies";
import { van, guardians } from "./groups";
import { PortraitIcon } from "./gui";
import { LevelUp, WaveMessage } from "./utilclasses";

function spawnGuardians() {
    switch (van[0].lvl) {
        case 2:
            spawnDuncan();
            break;
        case 3:
            spawnRobbie();
            break;
        case 4:
            spawnLanxe();
            break;
        case 5:
            spawnAlex();
            break;
        case 6:
            spawnJames();
            break;
        default:
            break;
    }
    new PortraitIcon(guardians[guardians.length-1], 20, 768 - 160 - 120, guardians.length-1);
}

let waveCounter = 0;

function spawnEnemies() {
    waveCounter += 1;
    new WaveMessage(`Wave starting: ${waveCounter}`, canvas.width / 2, (canvas.height / 2) - 200)
    switch (waveCounter) {
        case 1:
            for (let i = 0; i < 1; i++) {
                spawnSkeleton();
            }
            break;
        case 2:
            for (let i = 0; i < 2; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 1; i++) {
                spawnGoblin();
            }
            break;
        case 3:
            for (let i = 0; i < 3; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 3; i++) {
                spawnGoblin();
            }
            break;
        case 4:
            for (let i = 0; i < 4; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 1; i++) {
                spawnDemon();
            }
            break;
        case 5:
            for (let i = 0; i < 5; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 2; i++) {
                spawnDemon();
            }
            break;
        case 6:
            for (let i = 0; i < 10; i++) {
                spawnGoblin();
            }
            break;
        case 7:
            for (let i = 0; i < 8; i++) {
                spawnGoblin();
            }
            for (let i = 0; i < 4; i++) {
                spawnDemon();
            }
            break;
        case 8:
            for (let i = 0; i < 6; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 10; i++) {
                spawnGoblin();
            }
            for (let i = 0; i < 5; i++) {
                spawnDemon();
            }
            break;
        case 9:
            for (let i = 0; i < 10; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 8; i++) {
                spawnGoblin();
            }
            for (let i = 0; i < 8; i++) {
                spawnDemon();
            }
            break;
        case 10:
            for (let i = 0; i < 6; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 10; i++) {
                spawnGoblin();
            }
            for (let i = 0; i < 6; i++) {
                spawnDemon();
            }
            for (let i = 0; i < 3; i++) {
                spawnTroll();
            }
            break;
        case 11:
            for (let i = 0; i < 20; i++) {
                spawnGoblin();
            }
            for (let i = 0; i < 4; i++) {
                spawnTroll();
            }
            break;
        case 12:
            for (let i = 0; i < 15; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 5; i++) {
                spawnTroll();
            }
            break;
        case 13:
            for (let i = 0; i < 10; i++) {
                spawnDemon();
            }
            for (let i = 0; i < 5; i++) {
                spawnTroll();
            }
            break;
        default:
            // Win Game logic
            break;
    }
}



// Constructor arguements
// (x, y, imageSrc, scale, framesMax, offset, sprites)
function spawnLanxe() {
    new Lanxe(50, canvas.height - 168 - 260, "images/Lanxe/Idle.png", 2.6, 8, { x: 225, y: 166 },
    {
        idle: {
            imageSrc: "images/Lanxe/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "images/Lanxe/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Lanxe/Attack.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Lanxe/Hit.png",
            framesMax: 4
        }
    });
    new LevelUp('New Guardian: Lanxe the Samurai', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  
}

function spawnDuncan() {
    new Duncan(50, canvas.height - 168 - 280, "images/Duncan/Idle.png", 3.0, 10, { x: 266, y: 205 },
    {
        idle: {
            imageSrc: "images/Duncan/Idle.png",
            framesMax: 10
        },
        run: {
            imageSrc: "images/Duncan/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Duncan/Attack.png",
            framesMax: 5
        },
        hit: {
            imageSrc: "images/Duncan/Hit.png",
            framesMax: 3
        },
        defend: {
            imageSrc: "images/Duncan/Defend.png",
            framesMax: 1
        }
    });
    new LevelUp('New Guardian: Duncan the Tank', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  
}

function spawnSteph() {
    new Steph(50, canvas.height - 168 - 260, "images/Steph/Idle.png", 3.0, 8, { x: 195, y: 140 },
    {
        idle: {
            imageSrc: "images/Steph/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "images/Steph/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Steph/Attack.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Steph/Hit.png",
            framesMax: 3
        }
    });
    new LevelUp('New Guardian: Steph the Huntress', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnRobbie() {
    new Robbie(50, canvas.height - 168 - 250, "images/Robbie/Idle.png", 1.5, 6, { x: 120, y: 70 },
    {
        idle: {
            imageSrc: "images/Robbie/Idle.png",
            framesMax: 6
        },
        run: {
            imageSrc: "images/Robbie/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Robbie/Attack.png",
            framesMax: 6
        },
        attack2: {
            imageSrc: "images/Robbie/Attack2.png",
            framesMax: 6
        },
        hit: {
            imageSrc: "images/Robbie/Hit.png",
            framesMax: 4
        } 
    });
    new LevelUp('New Guardian: Robbie the Wizard', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnAlex() {
    new Alex(50, canvas.height - 168 - 260, "images/Alex/Idle.png", 2.9, 10, { x: 200, y: 140 },
    {
        idle: {
            imageSrc: "images/Alex/Idle.png",
            framesMax: 10
        },
        run: {
            imageSrc: "images/Alex/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Alex/Attack.png",
            framesMax: 4
        },
        attack2: {
            imageSrc: "images/Alex/Attack2.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Alex/Hit.png",
            framesMax: 3
        }
    });
    new LevelUp('New Guardian: Alex the Battlemage', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnJames() {
    new James(50, canvas.height - 168 - 180, "images/James/Idle.png", 2.8, 9, { x: 40, y: 90 },
    {
        idle: {
            imageSrc: "images/James/Idle.png",
            framesMax: 9
        },
        run: {
            imageSrc: "images/James/Run.png",
            framesMax: 9
        },
        attack: {
            imageSrc: "images/James/Attack.png",
            framesMax: 6
        },
        hit: {
            imageSrc: "images/James/Hit.png",
            framesMax: 3
        }
    });
    new LevelUp('New Guardian: James the Fire Worm', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  
}

function spawnSkeleton() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;
    new Skeleton(randomX, canvas.height - 168 - 260, "images/Skeleton/Idle.png", 2.6, 4, { x: 140, y: 113 },
    {
        idle: {
            imageSrc: "images/Skeleton/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "images/Skeleton/Run.png",
            framesMax: 4
        },
        attack: {
            imageSrc: "images/Skeleton/Attack.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Skeleton/Hit.png",
            framesMax: 4
        }
    });
}

function spawnGoblin() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;
    new Goblin(randomX, canvas.height - 168 - 230, "images/Goblin/Idle.png", 2.6, 4, { x: 150, y: 143 },
    {
        idle: {
            imageSrc: "images/Goblin/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "images/Goblin/Run.png",
            framesMax: 6
        },
        attack: {
            imageSrc: "images/Goblin/Attack.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Goblin/Hit.png",
            framesMax: 4
        }
    });
}

function spawnDemon() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;
    new Demon(randomX, canvas.height - 168 - 270, "images/Demon/Flight.png", 2.6, 8, { x: 150, y: 160 },
    {
        idle: {
            imageSrc: "images/Demon/Flight.png",
            framesMax: 8
        },
        run: {
            imageSrc: "images/Demon/Flight.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Demon/Attack.png",
            framesMax: 4
        },
        hit: {
            imageSrc: "images/Demon/Hit.png",
            framesMax: 4
        }
    });
}

function spawnTroll() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;
    new Troll(randomX, canvas.height - 168 - 260, "images/Troll/Idle.png", 2.6, 10, { x: 220, y: 195 },
    {
        idle: {
            imageSrc: "images/Troll/Idle.png",
            framesMax: 10
        },
        run: {
            imageSrc: "images/Troll/Run.png",
            framesMax: 8
        },
        attack: {
            imageSrc: "images/Troll/Attack.png",
            framesMax: 5
        },
        hit: {
            imageSrc: "images/Troll/Hit.png",
            framesMax: 3
        }
    });
}

function spawnMushroom() {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Mushroom(randomX, canvas.height - 168 - 230, "images/Mushroom/Idle.png");
}

function resetWaveCounter() {
    waveCounter = 0;
}

export {
    spawnGuardians,
    spawnEnemies,
    spawnDuncan,
    spawnLanxe,
    spawnRobbie,
    spawnSteph,
    spawnJames,
    spawnAlex,
    waveCounter,
    resetWaveCounter
};
