import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Home = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const toggleShowHowToPlay = () => {
    if (showHowToPlay) {
      setShowHowToPlay(false)
    } else {
      setShowHowToPlay(true)
      setShowDescription(false)
    }
  }

  return (
    <div id="homepage-container">
      <h1 id='homepage-title'>
        HOME
      </h1>

      <div id="home-text-container">
        <h2 id='description-of-game'>
          DESCRIPTION OF GAME
        </h2>

        <h2 id='how-to-play' 
        onClick={toggleShowHowToPlay}
        >
          HOW TO PLAY
        </h2>
      </div>

      {showHowToPlay && (
        <div id = "popup-container">
          <div id = "popup" data-testid="howtoplay-popup">
            <button 
            id ="close-button" 
            onClick={toggleShowHowToPlay} 
            >
              X
            </button>
            <p>
              How to play...
            </p>
          </div>
        </div>
      )}

      <div id='play-button-container'>
        <Link id="link-to-game" to="/game"> 
          <button id="play-button">Play Now!</button>
        </Link>
      </div>

      <div id='images-container'>
        <img src="src\pages\Home\images\fantasywarrior.gif" alt="fantasy warrior" />
        <img src="src\pages\Home\images\heavyarmor.gif" alt="heavy armor" />
        <img src="src\pages\Home\images\fireworm.gif" alt="fireworm" />
        <img src="src\pages\Home\images\martialhero.gif" alt="martial hero" />
        <img src="src\pages\Home\images\wizard.gif" alt="wizard" />
        <img src="src\pages\Home\images\huntress.gif" alt="huntress" />
      </div>
      <div id="home-footer"></div>
    </div>
  )
}

export default Home
