import React, { useEffect } from "react";
import { initCanvas } from "./lib/canvas";
import { Lanxe, Robbie, Duncan, Steph, James } from "./lib/guardians";
import { spawnSkeleton } from "./lib/spawner";
import { guardianProjectiles, updateAllSprites } from "./lib/groups";
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import { guardians, enemies } from "./lib/groups";

const Canvas = () => {
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        if (canvas) {
            initCanvas(canvas);
            // Spawn objects // to be removed and use a dynamic spawner function
            new Lanxe(50, 500);
            new Robbie(50, 500);
            new Duncan(50, 480);
            new Steph(50, 500);
            new James(50, 580);

            spawnSkeleton();

            // Main game loop logic
            const gameLoop = () => {
                // Clear the canvas
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);

                updateAllSprites(context);
                checkAtkBoxCollisions(guardians, enemies);
                checkAtkBoxCollisions(enemies, guardians);
                checkProjectileCollisions(guardianProjectiles, enemies);

                requestAnimationFrame(gameLoop);
            };
            gameLoop();
        }
    }, []);

    return (
        <div>
            <canvas id="canvas"></canvas>
        </div>
    );
};

export default Canvas;
