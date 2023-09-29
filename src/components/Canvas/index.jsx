import React, { useEffect } from "react";
import { initCanvas } from "./lib/canvas";
import { Lanxe, Robbie, Duncan, Steph, James } from "./lib/guardians";
import { spawnSkeleton } from "./lib/spawner";
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import { 
    guardians, enemies, guardianProjectiles,
    drawAllHealthbars,
    drawDamageNumbers,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardians,
    drawBackground,
    updateAllSprites } from "./lib/groups";
import { Img, Van } from "./lib/sprite";
import { useGameStart } from "./lib/events";

const Canvas = () => {

    const gameStarted = useGameStart();

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        if (canvas) {
            initCanvas(canvas);

            if (gameStarted) {
                new Img(0, 0, "src/components/Canvas/img/test-background.png");
                new Van(50, 533);

                // Spawn objects // to be removed and use a dynamic spawner function
                new Duncan(50, 513);
                new Lanxe(50, 533);
                new Robbie(50, 533);
                new Steph(50, 533);
                new James(50, 613);
    
                spawnSkeleton();
            }

            // Main game loop logic
            const gameLoop = () => {
                if (gameStarted) {
                    context.fillStyle = "black";
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    updateAllSprites(context);

                    checkAtkBoxCollisions(guardians, enemies);
                    checkAtkBoxCollisions(enemies, guardians);
                    checkProjectileCollisions(guardianProjectiles, enemies);

                    drawBackground(context);
                    drawGuardians(context);
                    drawEnemies(context);
                    drawAllHealthbars(context);
                    drawGuardianProjectiles(context);
                    drawDamageNumbers(context);

                    requestAnimationFrame(gameLoop);
                }

            };
            gameLoop();
        }
    }, [gameStarted]);

    return (
        <div>
            <canvas id="canvas"></canvas>
        </div>
    );
};

export default Canvas;
