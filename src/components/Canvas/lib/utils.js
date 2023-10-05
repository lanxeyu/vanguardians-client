import { useState, useEffect } from "react";
import { guardians, van } from "./groups";
import { SwitchMode } from "./utilclasses";
import { GAME_STATES, getCurrentGameState, setCurrentGameState } from "./statemanagers";
import { audioManager } from "./audio";

function useGameStart() {
  
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    function handleKeyPress(event) {

      if (event.key === "Enter" && (getCurrentGameState() === GAME_STATES.MAIN_MENU || 
      getCurrentGameState() === GAME_STATES.END_SCREEN)) {
        // setGameStarted(true);
        setCurrentGameState(GAME_STATES.PLAYING)
        audioManager.playBackgroundMusic();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStarted]);

  return gameStarted;
}


function restoreAllHealth() {
  for (const guardian of guardians) {
    guardian.currHealth = guardian.maxHealth
  }
  van[0].currHealth = van[0].maxHealth
}

function addKeyListener() {
  const keyFunctions = {};

  for (let i = 1; i <= 6; i++) {
    keyFunctions[i.toString()] = function () {
      if (guardians[i]) {
        guardians[i].toggleModes();
        
      }
    };
  }

  keyFunctions["r"] = function () {
    for (const guardian of guardians) {
      guardian.isRetreating = true;
    }
  }

  keyFunctions["a"] = function () {
    for (const guardian of guardians) {
      guardian.isRetreating = false;
    }
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key in keyFunctions) {
      keyFunctions[key]();
    }
  });
}

export { useGameStart, restoreAllHealth, addKeyListener }
