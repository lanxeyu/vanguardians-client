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
                // spawnMushroom()
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

function spawnDuncan() {
    new Duncan(50, canvas.height - 168 - 280, "src/components/canvas/img/Duncan/Idle.png");
    new LevelUp('New Guardian: Duncan the Tank', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  
}

function spawnLanxe() {
    new Lanxe(50, canvas.height - 168 - 260, "src/components/canvas/img/Lanxe/Idle.png");
    new LevelUp('New Guardian: Lanxe the Samurai', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  

}

function spawnRobbie() {
    new Robbie(50, canvas.height - 168 - 250, "src/components/canvas/img/Robbie/Idle.png");
    new LevelUp('New Guardian: Robbie the Wizard', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnSteph() {
    new Steph(50, canvas.height - 168 - 260, "src/components/canvas/img/Stephanie/Idle.png");
    new LevelUp('New Guardian: Steph the Huntress', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnJames() {
    new James(50, canvas.height - 168 - 180, "src/components/canvas/img/James/Worm/Idle.png");
    new LevelUp('New Guardian: James the Fire Worm', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)  
}

function spawnAlex() {
    new Alex(50, canvas.height - 168 - 260, "src/components/canvas/img/Alex/Idle.png");
    new LevelUp('New Guardian: Alex the Battlemage', van[0].position.x + (van[0].width / 2) + 60, van[0].position.y - 0)
}

function spawnSkeleton() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, canvas.height - 168 - 260, "src/components/canvas/img/Skeleton/Idle.png");
}

function spawnGoblin() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Goblin(randomX, canvas.height - 168 - 230, "src/components/canvas/img/Goblin/Idle.png");
}

function spawnDemon() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Demon(randomX, canvas.height - 168 - 270, "src/components/canvas/img/Demon/Flight.png");
}

function spawnTroll() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Troll(randomX, canvas.height - 168 - 260, "src/components/canvas/img/Troll/Idle.png");
}

function spawnMushroom() {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Mushroom(randomX, canvas.height - 168 - 230, "src/components/canvas/img/Mushroom/Idle.png");
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
};
