import React from 'react'
import { Canvas } from '../../components'
import './index.css'

const GamePage = () => {
  return (
    <>
    <div className="game">
      <div id="canvas-left-border"></div>
      <Canvas />
      <div id="canvas-right-border"></div>
    </div>
    <div id="game-footer"></div>
    </>
    
  )
}

export default GamePage
