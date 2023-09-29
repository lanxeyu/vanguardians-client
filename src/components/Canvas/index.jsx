import React, { useEffect } from "react";
import { initCanvas } from "./lib/canvas";
import { Lanxe, Robbie, Duncan, Steph, James } from "./lib/guardians";
import { spawnSkeleton } from "./lib/spawner";
import {
    drawAllHealthbars,
    drawDamageNumbers,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardians,
    guardianProjectiles,
    updateAllSprites,
} from "./lib/groups";
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import { guardians, enemies } from "./lib/groups";
import { Background, Van } from "./lib/sprite";

const Canvas = () => {
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        if (canvas) {
            initCanvas(canvas);

            const background = new Background(
                0,
                0,
                "src/components/canvas/img/test-background.png"
            );

            new Van(50, 533)

            // Spawn objects // to be removed and use a dynamic spawner function
            // new Duncan(50, 513);
            // new Lanxe(50, 533);
            // new Robbie(50, 533);
            // new Steph(50, 533);
            new James(50, 613);

            spawnSkeleton();

            // Main game loop logic
            const gameLoop = () => {
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);

                updateAllSprites(context);

                checkAtkBoxCollisions(guardians, enemies);
                checkAtkBoxCollisions(enemies, guardians);
                checkProjectileCollisions(guardianProjectiles, enemies);

                background.draw(context);

                drawGuardians(context);
                drawEnemies(context);
                drawAllHealthbars(context);
                drawGuardianProjectiles(context);
                drawDamageNumbers(context);

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
