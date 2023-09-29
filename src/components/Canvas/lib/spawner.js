import { Skeleton, Demon } from "./enemies";

const spawnSkeleton = () => {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, 533);

    setTimeout(spawnSkeleton, 3000);
}

const spawnDemon = () => {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Demon(randomX, 450);

    setTimeout(spawnDemon, 5000);
}

export { spawnSkeleton, spawnDemon }
