import { Skeleton } from "./enemies";

const spawnSkeleton = () => {
    const minX = 1366
    const maxX = 2000
    const randomX = Math.random() * (maxX - minX) + minX;

    new Skeleton(randomX, 500);

    setTimeout(spawnSkeleton, 3000);
}

export { spawnSkeleton }