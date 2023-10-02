import { Skeleton, Demon } from "./enemies";

function spawnSkeleton() {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, 344);

    setTimeout(spawnSkeleton, 3000);
}

function spawnDemon() {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Demon(randomX, 294);

    setTimeout(spawnDemon, 9000);
}

// function spawnGuardians() {

// }

export { spawnSkeleton, spawnDemon }

