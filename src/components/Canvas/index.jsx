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
import { checkAtkBoxCollisions, checkProjectileCollisions } from "./lib/collision";
import { guardians, enemies } from "./lib/groups";
import { Background, Layer, PortraitIcon } from "./lib/sprite";
import { loadFonts, getMiddleground, getGround, getRoots } from './lib/resources'
import { useGameStart } from "./lib/utils";
import "../../pages/Home/index.css";


const Canvas = () => {
    const [showGameOver, setShowGameOver] = useState(false);
    const gameStarted = useGameStart();

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        loadFonts();

        if (canvas) {
            initCanvas(canvas);
            context.scale(1, 1)

            

            

            
            if (gameStarted){
                const background = new Background(0, -140, 'src/components/canvas/img/test-background.png');
                
    
                // Spawn objects // to be removed and use a dynamic spawner function
                // new Duncan(50, 513);
                // new Lanxe(50, 533);
                // new Robbie(50, 533);
                // new Steph(50, 533);
                // new James(50, 613);

                const middleground = new Layer(0, 0, 3326, 840, 0, -108, 'src/components/canvas/img/middleground2.png', 0)
                const ground = new Layer(0, canvas.height, 2016, 288, 0, -288, 'src/components/canvas/img/ground.png', 0)
                const roots = new Layer(0, canvas.height, 1366, 168, 0, -168, 'src/components/canvas/img/roots.png', 0)
                const grass = new Layer(0, canvas.height, 1366, 168, 0, -303, 'src/components/canvas/img/grass.png', 0)

                new Van(50, 533, "src/components/canvas/img/van.png");

                // Spawn objects // to be removed and use a dynamic spawner function
                new Duncan(50, canvas.height - 168 - 290);
                new Lanxe(50, canvas.height - 168 - 270);
                new Robbie(50, canvas.height - 168 - 270);
                new Steph(50, canvas.height - 168 - 270);
                new James(50, canvas.height - 168 - 190);
            }

            spawnSkeleton();
            spawnDemon();

            // Main game loop logic
            const gameLoop = () => {
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                if (gameStarted) {
                    if (!van[0].isAlive) {
                        setShowGameOver(true);
                    }

                    updateAllSprites(context);

                    checkAtkBoxCollisions(guardians, enemies);
                    checkAtkBoxCollisions(enemies, guardians);
                    checkProjectileCollisions(guardianProjectiles, enemies);

                    drawBackground(context);
                    context.fillStyle = 'rgb(59, 77, 109)';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    middleground.draw(context);
                    ground.draw(context);

                    drawVan(context)

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
