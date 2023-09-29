import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initCanvas } from "./lib/canvas";
import { Lanxe, Robbie, Duncan, Steph, James } from "./lib/guardians";
import { Background, Van } from "./lib/sprite";
import { spawnSkeleton, spawnDemon } from "./lib/spawner";
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import { 
    guardians, enemies, guardianProjectiles,
    drawAllHealthbars,
    drawDamageNumbers,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardians,
    drawVan,
    drawBackground,
    updateAllSprites,
    van,
} from "./lib/groups";
import { useGameStart } from "./lib/utils";
import "../../pages/Home/index.css";


const Canvas = () => {
    const [showGameOver, setShowGameOver] = useState(false);
    const gameStarted = useGameStart();

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        if (canvas) {
            initCanvas(canvas);

            if (gameStarted){
                new Background(0, 0, "src/components/canvas/img/test-background.png");
                new Van(50, 533, "src/components/canvas/img/van.png");
    
                // Spawn objects // to be removed and use a dynamic spawner function
                new Duncan(50, 513);
                new Lanxe(50, 533);
                new Robbie(50, 533);
                new Steph(50, 533);
                new James(50, 613);
            }

            spawnSkeleton();
            spawnDemon();

            // Main game loop logic
            const gameLoop = () => {
                if (gameStarted) {
                    if (!van[0].isAlive) {
                        setShowGameOver(true);
                    }

                    updateAllSprites(context);

                    checkAtkBoxCollisions(guardians, enemies);
                    checkAtkBoxCollisions(enemies, guardians);
                    checkProjectileCollisions(guardianProjectiles, enemies);

                    drawBackground(context);
                    drawVan(context)
                    drawGuardians(context);
                    drawEnemies(context);
                    drawAllHealthbars(context);
                    drawGuardianProjectiles(context);
                    drawDamageNumbers(context);


                    requestAnimationFrame(gameLoop);
                }
            };
            if (gameStarted){
                gameLoop();
            }
        }
    }, [gameStarted]);

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
