import React, { useState } from "react";
import "./index.css";

const Home = () => {
    const [showDescription, setShowDescription] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const toggleShowDescription = () => {
        if (showDescription) {
            setShowDescription(false);
        } else {
            setShowDescription(true);
            setShowHowToPlay(false);
        }
    };

    const toggleShowHowToPlay = () => {
        if (showHowToPlay) {
            setShowHowToPlay(false);
        } else {
            setShowHowToPlay(true);
            setShowDescription(false);
        }
    };

    return (
        <div id="homepage-container">
            <h1 id="homepage-title">Vanguardians</h1>

            <div id="home-text-container">
                <h2 id="description-of-game" onClick={toggleShowDescription}>
                    DESCRIPTION OF GAME
                </h2>

                <h2 id="how-to-play" onClick={toggleShowHowToPlay}>
                    HOW TO PLAY
                </h2>
            </div>
            {showDescription && (
                <div id="popup-container">
                    <div id="popup">
                        <button id="close-button" onClick={toggleShowDescription}>
                            X
                        </button>
                        <p>Description of the game...</p>
                    </div>
                </div>
            )}

            {showHowToPlay && (
                <div id="popup-container">
                    <div id="popup">
                        <button id="close-button" onClick={toggleShowHowToPlay}>
                            X
                        </button>
                        <p>How to play...</p>
                    </div>
                </div>
            )}

            <div id="images-container">
                <img src="src\pages\Home\images\fantasywarrior.gif" alt="fantasy warrior" />
                <img src="src\pages\Home\images\heavyarmor.gif" alt="heavy armor" />
                <img src="src\pages\Home\images\fireworm.gif" alt="fireworm" />
                <img src="src\pages\Home\images\martialhero.gif" alt="martial hero" />
                <img src="src\pages\Home\images\wizard.gif" alt="wizard" />
                <img src="src\pages\Home\images\huntress.gif" alt="huntress" />
            </div>
            <div id="home-footer"></div>
        </div>
    );
};

export default Home;
