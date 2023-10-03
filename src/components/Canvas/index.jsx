import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initCanvas } from "./lib/canvas";
import { Background, Foreground } from "./lib/sprite";
import { PortraitIcon, TopBar, BottomBar } from "./lib/gui"
import { Van } from "./lib/van";
import {
    spawnDuncan,
    spawnEnemies,
    spawnJames,
    spawnLanxe,
    spawnRobbie,
    spawnSteph,
} from "./lib/spawner";
import { checkAtkBoxCollisions, checkHealingProjectileCollisions, checkProjectileCollisions } from "./lib/collision";
import {
    guardians,
    enemies,
    guardianProjectiles,
    guardianHealingProjectiles,
    drawAllHealthbars,
    drawDamageNumbers,
    drawEnemies,
    drawGuardianProjectiles,
    drawGuardianHealingProjectiles,
    drawGuardians,
    drawVan,
    drawForeground,
    drawUI,
    drawBackground,
    updateAllSprites,
    van,
    ui,
    clearAllSprites,
    drawPopUpMsgs,
} from "./lib/groups";
import { loadFonts } from './lib/resources'
import { GAME_STATES } from "./lib/statemanagers";
import { useGameStart } from "./lib/utils";
import { addKeyListener } from "./lib/utils";
import "../../pages/Home/index.css";

const Canvas = () => {
    const [showGameOver, setShowGameOver] = useState(false);
    const gameStarted = useGameStart();
    // const [scores, setScores] = useState(0);
    // const [totalKills, setTotalKills] = useState(0);

    useEffect(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        const canvasLeft = canvas.offsetLeft;
        const canvasTop = canvas.offsetTop;

        const originX = canvas.width / 2, originY = canvas.height / 2;

        loadFonts();

        let scores = 0;
        let totalKills = 0;

        let currentGameState = GAME_STATES.MAIN_MENU

        if (canvas) {
            initCanvas(canvas);
            context.scale(1, 1)

            if (gameStarted){
                const background = new Background(0, 0, 1366, 766, 0, 0, 'src/components/canvas/img/starsky-bg.png', 0);
                const cloud1 = new Background(0, canvas.height, 1366, 329, 0, -(168 + 329), 'src/components/canvas/img/cloud1-bg.png', 1);
                const cloud2 = new Background(0, canvas.height, 1366, 113, 0, -(168 + 113), 'src/components/canvas/img/cloud2-bg.png', 1);
                

                const middleground = new Background(0, 0, 3326, 840, 0, -98, 'src/components/canvas/img/middleground2.png', 3)
                const ground = new Foreground(0, canvas.height, 2016, 288, 0, -278, 'src/components/canvas/img/ground.png', 5)
                const grass = new Foreground(0, canvas.height, 1366, 168, 0, -293, 'src/components/canvas/img/grass.png', 5)

                new Van(50, 348, "src/components/canvas/img/van.png");

                spawnDuncan();
                spawnLanxe();
                // spawnSteph();
                // spawnRobbie();
                // spawnJames();
                // spawnAlex();

                for (let i = 0; i < guardians.length; i++) {
                    new PortraitIcon(guardians[i], 20, canvas.height - 160 - 120, i)
                }

                new TopBar((canvas.width / 2) - 40, 0, 140, 70, scores);
                new BottomBar(0, canvas.height, canvas.width, 168, null)

            }

            // Main game loop logic
            const gameLoop = () => {
                context.clearRect(0, 0, canvas.width, canvas.height)
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                if (gameStarted) {
                    if (!van[0].isAlive) {
                        clearAllSprites();
                        setShowGameOver(true);
                    } else if (enemies.length == 0) {

                        spawnEnemies();
                    }

                    // Parallax attempt
                    let firstPosX = originX;
                    for (let i = 0; i < guardians.length; i++) {
                        let currPointX = guardians[i].position.x + (guardians[i].width / 2);
                        if (currPointX > firstPosX) firstPosX = currPointX;
                    }

                    // console.log(firstPosX)

                    // context.transform(1, 0, 0, 1, -firstPosX , 0)

                    updateAllSprites(context);

                    checkAtkBoxCollisions(guardians, enemies);
                    checkAtkBoxCollisions(enemies, guardians);
                    checkProjectileCollisions(guardianProjectiles, enemies);
                    checkHealingProjectileCollisions(guardianHealingProjectiles, guardians)

                    
                    drawBackground(context);
                    drawVan(context);
                    drawGuardians(context);
                    drawEnemies(context);
                    drawAllHealthbars(context);
                    drawGuardianProjectiles(context);
                    drawGuardianHealingProjectiles(context);
                    drawDamageNumbers(context);
                    drawPopUpMsgs(context);

                    drawForeground(context)

                    drawUI(context);

                }
                else {
                    context.fillStyle = 'rgb(255, 255, 255)'
                    context.textAlign = "center";

                    context.font = "36px Silkscreen";
                    context.fillText("VANGUARDIANS", canvas.width / 2, canvas.height / 2 - 100)

                    context.font = "18px Silkscreen";
                    context.fillText("Press Enter to Play", canvas.width / 2, canvas.height / 2)
                }
                requestAnimationFrame(gameLoop);
            };
            gameLoop();
            if (gameStarted){
                // gameLoop();
            }

            // Click Event to target elements in the canvas
            canvas.addEventListener('click', function(event) {
                let x = event.pageX - canvasLeft,
                    y = event.pageY - canvasTop;

                // Loop from last drawn
                for (let i = guardians.length-1; i >= 0; i--) {
                    // console.log(guardians[i].name)
                    if (y > guardians[i].position.y && y < guardians[i].position.y + guardians[i].height 
                        && x > guardians[i].position.x && x < guardians[i].position.x + guardians[i].width) {
                            
                        if (gameStarted) { // Game Started
                            console.log(`${guardians[i].name} has been Clicked!`)
                            for (let j = 0; j < ui.length; j++) {
                                if (ui[j].name === "bottombar") ui[j].setTarget(guardians[i])
                            }
                            
                        }
                        else { // Main Menu

                        }
                        break; // Break out of loop if element found
                    }
                }
                
            }, false);
        }
    }, [gameStarted]);

    useEffect(() => {
        addKeyListener();
    }, []);

    return (
        <div>
            <canvas id="canvas"></canvas>
            {showGameOver && (
                <div id="popup-container">
                    <div id="popup">
                        <p>GameOver...</p>
                        <p>Score: {van[0].score}</p>
                        <p>High Score: {van[0].score}</p>
                        <p>Total Kills: {van[0].enemiesKilled}</p>
                        <Link to={"/"}>Return Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Canvas;
