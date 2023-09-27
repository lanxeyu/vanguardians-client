import { Skeleton } from "./enemies";

const spawnSkeleton = () => {
    new Skeleton(1366, 500);
    setTimeout(spawnSkeleton, 1500);
}

export { spawnSkeleton }