import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initCanvas } from "./lib/canvas";
import { Background } from "./lib/sprite";
import { Van } from "./lib/van";
import {
    spawnDuncan,
    spawnEnemies,
    spawnJames,
    spawnLanxe,
    spawnRobbie,
    spawnSteph,
} from "./lib/spawner";
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import {
    guardians,
    enemies,
    guardianProjectiles,
    drawAllHealthbars,
    drawDamageNumbers,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardians,
    drawVan,
    drawBackground,
    updateAllSprites,
    van,
    clearAllSprites,
    drawPopUpMsgs,
    drawEnemyProjectiles,
} from "./lib/groups";
import { useGameStart } from "./lib/utils";
import { addKeyListener } from "./lib/utils";
import "../../pages/Home/index.css";

const Canvas = () => {
    const [showGameOver, setShowGameOver] = useState(false);
    const gameStarted = useGameStart();

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        if (canvas) {
            initCanvas(canvas);

            if (gameStarted) {
                new Background(0, 0, "src/components/canvas/img/test-background.png");
                new Van(50, 420, "src/components/canvas/img/van.png");

                // --- Enable spawn to test Guardian ---
                // Default start has Duncan and Lanxe at lvl 1
                spawnDuncan();
                spawnLanxe();
                // spawnSteph();
                // spawnRobbie();
                // spawnJames();
                // spawnAlex();
            }

            // Main game loop logic
            const gameLoop = () => {
                if (gameStarted) {
                    if (!van[0].isAlive) {
                        clearAllSprites();
                        setShowGameOver(true);
                    } else if (enemies.length == 0) {
                        spawnEnemies();
                    }

                    updateAllSprites(context);

                    checkAtkBoxCollisions(guardians, enemies);
                    checkAtkBoxCollisions(enemies, guardians);
                    checkProjectileCollisions(guardianProjectiles, enemies);

                    drawBackground(context);
                    drawVan(context);
                    drawGuardians(context);
                    drawEnemies(context);
                    drawAllHealthbars(context);
                    drawGuardianProjectiles(context);
                    drawEnemyProjectiles(context)
                    drawDamageNumbers(context);
                    drawPopUpMsgs(context);

                    

                    requestAnimationFrame(gameLoop);
                }
            };
            if (gameStarted) {
                gameLoop();
            }
        }
    }, [gameStarted]);

    useEffect(() => {
        addKeyListener(key => {
            switch (key) {
                case "1":
                    break;
                case "2":
                    break;
                default:
                    break;
            }
        });
    }, []);

    return (
        <div>
            <canvas id="canvas"></canvas>
            {showGameOver && (
                <div id="popup-container">
                    <div id="popup">
                        <p>GameOver...</p>
                        <p>Score: 1000</p>
                        <p>High Score: 3043</p>
                        <p>Total Kills: 340</p>
                        <Link to={"/"}>Return Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Canvas;
