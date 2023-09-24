import React from 'react'
import { useEffect } from 'react';
import { initCanvas } from './lib/canvas';

const Canvas = () => {

  useEffect(() => {
    initCanvas()
  }, []);


  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  )
}

export default Canvas