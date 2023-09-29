import React, { useEffect } from 'react';
import { initCanvas } from './lib/canvas';
import { Lanxe, Robbie, Duncan, Steph, James } from './lib/guardians';
import { spawnSkeleton } from './lib/spawner';
import { guardianProjectiles, updateAllSprites } from './lib/groups';
import { checkAtkBoxCollisions, checkProjectileCollisions } from './lib/collision';
import { guardians, enemies } from './lib/groups';
import { Background } from './lib/sprite';

const Canvas = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    if (canvas) {
      initCanvas(canvas);

      new Background(0 ,0, './src/assets/images/bg_sample.png');

      // Spawn objects // to be removed and use a dynamic spawner function
      new Duncan(50, 513);
      new Lanxe(50, 533);
      new Robbie(50, 533);
      new Steph(50, 533);
      new James(50, 613);

      spawnSkeleton();

      // Main game loop logic
      const gameLoop = () => {
        updateAllSprites(context);
        checkAtkBoxCollisions(guardians, enemies);
        checkAtkBoxCollisions(enemies, guardians);
        checkProjectileCollisions(guardianProjectiles, enemies)

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
