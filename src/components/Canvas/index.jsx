import React, { useEffect } from 'react';
import { initCanvas } from './lib/canvas';
import { Robbie, Lanxe, Duncan, James, Steph, Skeleton, DamageNumber } from './lib/classes';
import { drawAllSprites, updateAllSprites } from './lib/groups';
import { checkAtkBoxCollisions } from './lib/collision';
import { guardians, enemies } from './lib/groups';

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

      // Spawn objects // to be removed and use a dynamic spawner function
      const lanxe = new Lanxe(50, 500)
      const robbie = new Robbie(50, 500)
      const james = new James(900, 500)
      const skeleton = new Skeleton(1800, 500)

      const damageNumber = new DamageNumber('9999', skeleton.position.x , skeleton.position.y)
      
        const spawnSkeleton = () => {
          new Skeleton(1800, 500);
          setTimeout(spawnSkeleton, 1500);
        }
        spawnSkeleton();
        
        new Projectile(50, 500)

      // Main game loop logic
      const gameLoop = () => {
        updateAllSprites();
        checkAtkBoxCollisions(guardians, enemies);
        

        // Clear the canvas
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render game objects
        drawAllSprites(context);

        damageNumber.draw(context)

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
