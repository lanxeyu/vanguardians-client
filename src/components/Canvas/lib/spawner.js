import { Lanxe, Robbie, Duncan, Steph, James, Alex } from "./guardians";
import { Skeleton, Demon, Mushroom } from "./enemies";
import { van } from "./groups";

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
}

let waveCounter = 0;

function spawnEnemies() {
    waveCounter += 1;
    console.log("Wave starting: ", waveCounter);

    switch (waveCounter) {
        case 1:
            for (let i = 0; i < 10; i++) {
                spawnSkeleton();
                spawnMushroom();
            }
            break;
        case 2:
            for (let i = 0; i < 2; i++) {
                spawnSkeleton();
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
    new Duncan(50, 513, "src/components/canvas/img/Duncan/Idle.png");
}

function spawnLanxe() {
    new Lanxe(50, 533, "src/components/canvas/img/Lanxe/Idle.png");
}

function spawnRobbie() {
    new Robbie(50, 533, "src/components/canvas/img/Robbie/Idle.png");
}

function spawnSteph() {
    new Steph(50, 533, "src/components/canvas/img/Stephanie/Idle.png");
}

function spawnJames() {
    new James(50, 613, "src/components/canvas/img/James/Idle.png");
}

function spawnAlex() {
    new Alex(50, 533);
}

function spawnSkeleton() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, 533);
}

function spawnDemon() {
    const minX = 1366;
    const maxX = 2000;
    const randomX = Math.random() * (maxX - minX) + minX;

    new Demon(randomX, 480);
}

function spawnMushroom() {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Mushroom(randomX, 533);
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
};
