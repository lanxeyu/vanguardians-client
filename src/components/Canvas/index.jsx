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
import { Background, Layer, PortraitIcon } from "./lib/sprite";
import { loadFonts, getMiddleground, getGround, getRoots } from './lib/resources'

const Canvas = () => {
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        loadFonts();

        if (canvas) {
            initCanvas(canvas);
            context.scale(1, 1)

            const background = new Background(
                0,
                -140,
                'src/components/canvas/img/test-background.png'
            );

            const middleground = new Layer(0, 0, 3326, 840, 0, -108, 'src/components/canvas/img/middleground2.png', 0)
            const ground = new Layer(0, canvas.height, 2016, 288, 0, -288, 'src/components/canvas/img/ground.png', 0)
            const roots = new Layer(0, canvas.height, 1366, 168, 0, -168, 'src/components/canvas/img/roots.png', 0)
            const grass = new Layer(0, canvas.height, 1366, 168, 0, -303, 'src/components/canvas/img/grass.png', 0)

            // Spawn objects // to be removed and use a dynamic spawner function
            new Duncan(50, canvas.height - 168 - 290);
            new Lanxe(50, canvas.height - 168 - 270);
            new Robbie(50, canvas.height - 168 - 270);
            new Steph(50, canvas.height - 168 - 270);
            new James(50, canvas.height - 168 - 190);

            spawnSkeleton();

            // Main game loop logic
            const gameLoop = () => {
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                

                updateAllSprites(context);

                checkAtkBoxCollisions(guardians, enemies);
                checkAtkBoxCollisions(enemies, guardians);
                checkProjectileCollisions(guardianProjectiles, enemies);

                background.draw(context);
                context.fillStyle = 'rgb(59, 77, 109)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                middleground.draw(context);
                ground.draw(context);
                
                drawGuardians(context);
                drawEnemies(context);
                drawAllHealthbars(context);
                drawGuardianProjectiles(context);
                drawDamageNumbers(context);

                grass.draw(context);

                for (let i = 0; i < guardians.length; i++) {
                  console.log(typeof guardians[i])
                  // new PortraitIcon(20, canvas.height - 168)
                }

                // Character HUD Info
                context.fillStyle = 'rgb(45,46,55)'
                context.fillRect(20, canvas.height - 168 - 64 - 30, 64, 64);
                context.lineWidth = 5;
                context.strokeStyle = 'rgb(24,24,39)'
                context.strokeRect(20, canvas.height - 168 - 64 - 30, 64, 64);

                // Bottom HUD Element
                context.fillStyle = 'rgb(45,46,55)'
                context.fillRect(0, canvas.height, canvas.width, -168);
                context.lineWidth = 10;
                context.strokeStyle = 'rgb(24,24,39)'
                context.strokeRect(0 + 5, canvas.height - 5, canvas.width - 10, -158);
                roots.draw(context);

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
