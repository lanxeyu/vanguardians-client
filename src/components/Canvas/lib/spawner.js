import { Lanxe, Robbie, Duncan, Steph, James, Alex } from "./guardians";
import { Skeleton, Goblin, Demon, Troll } from "./enemies";
import { van, guardians } from "./groups";
import { PortraitIcon } from "./gui";


function spawnGuardians() {
    switch (van[0].lvl) {
        case 2:
            spawnSteph();
            break;
        case 3:
            spawnRobbie();
            break;
        case 4:
            spawnJames();
            break;
        case 5:
            // spawnAlex();
            break;
        default:
            break;
    }
    new PortraitIcon(guardians[guardians.length-1], 20, 768 - 160 - 120, guardians.length-1);
}

let waveCounter = 0;

function spawnEnemies() {
    waveCounter += 1;
    console.log("Wave starting: ", waveCounter);

    switch (waveCounter) {
        case 1:
            for (let i = 0; i < 2; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 3; i++) {
                spawnGoblin();
            }
            break;
        case 2:
            for (let i = 0; i < 20; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 2; i++) {
                spawnTroll();
            }
            break;
        case 3:
            for (let i = 0; i < 4; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 1; i++) {
                spawnDemon();
            }
            break;
        case 4:
            for (let i = 0; i < 6; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 3; i++) {
                spawnDemon();
            }
            break;
        case 5:
            for (let i = 0; i < 14; i++) {
                spawnSkeleton();
            }
            for (let i = 0; i < 3; i++) {
                spawnDemon();
            }
            break;
        default:
            // Win Game logic
            break;
    }
}

function spawnDuncan() {
    new Duncan(50, canvas.height - 168 - 280, "src/components/canvas/img/Duncan/Idle.png");
}

function spawnLanxe() {
    new Lanxe(50, canvas.height - 168 - 260, "src/components/canvas/img/Lanxe/Idle.png");
}

function spawnRobbie() {
    new Robbie(50, canvas.height - 168 - 250, "src/components/canvas/img/Robbie/Idle.png");
}

function spawnSteph() {
    new Steph(50, canvas.height - 168 - 260, "src/components/canvas/img/Stephanie/Idle.png");
}

function spawnJames() {
    new James(50, canvas.height - 168 - 180, "src/components/canvas/img/James/Worm/Idle.png");
}

function spawnAlex() {
    new Alex(50, canvas.height - 168 - 260, "src/components/canvas/img/Alex/Idle.png");
}

function spawnSkeleton() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, 340);
}

function spawnGoblin() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Goblin(randomX, 410);
}

function spawnDemon() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Demon(randomX, 300);
}

function spawnTroll() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Troll(randomX, 290);
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
