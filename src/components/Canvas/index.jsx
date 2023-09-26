import React, { useEffect } from 'react';
import { initCanvas } from './lib/canvas';
import { Robbie, Lanxe, Skeleton } from './lib/classes';
import { updateAllSprites } from './lib/groups';

const Canvas = () => {

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    if (canvas) {
      initCanvas(canvas);

      // Spawn objects // to be removed and use a dynamic spawner function
      const lanxe = new Lanxe(50, 500)
      const robbie = new Robbie(50, 500)
      const skeleton = new Skeleton(1000, 500)

      // Main game loop logic
      const gameLoop = () => {

        // Game calculations function to be called
        // Enemy spawner function to be called
        // Collision detection function to be called

        updateAllSprites()

        // Clear the canvas
        context.fillStyle = 'black'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Render game objects
        lanxe.draw(context)
        robbie.draw(context)
        skeleton.draw(context)

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
