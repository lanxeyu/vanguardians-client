import React, { useEffect } from 'react';
import { initCanvas } from './lib/canvas';
import { Robbie, Lanxe, James, Skeleton, DamageNumber } from './lib/classes';
import { updateAllSprites } from './lib/groups';
import { drawAllSprites, updateAllSprites } from './lib/groups';
import { checkAtkBoxCollisions } from './lib/collision';
import { guardians, enemies } from './lib/groups';

const Canvas = () => {

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    if (canvas) {
      initCanvas(canvas);

      // Spawn objects // to be removed and use a dynamic spawner function
      const lanxe = new Lanxe(50, 500)
      const robbie = new Robbie(50, 500)
      const james = new James(900, 500)
      const skeleton = new Skeleton(1800, 500)

      const damageNumber = new DamageNumber(skeleton, skeleton.position.x + (skeleton.width / 2), skeleton.position.y)

      // Main game loop logic
      const gameLoop = () => {

        // Enemy spawner function to be called
        
        checkAtkBoxCollisions(guardians, enemies)
        updateAllSprites()

        // Clear the canvas
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Render game objects
        drawAllSprites(context)

        damageNumber.draw(context)

        requestAnimationFrame(gameLoop);
      }
      gameLoop();
    }
  }, []); 

  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  );
}

export default Canvas;
