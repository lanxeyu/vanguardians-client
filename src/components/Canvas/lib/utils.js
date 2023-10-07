import { useState, useEffect } from "react";
import { guardians, van } from "./groups";
import { SwitchMode } from "./utilclasses";
import { GAME_STATES, getCurrentGameState, setCurrentGameState, setCurrentGroupCommand, getCurrentGroupCommand, GROUP_COMMANDS } from "./statemanagers";
import { audioManager } from "./audio";

let keyDownListener = null;

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

let KeyDownSingleton = (function () {
  let keyDownInstance;

  function createInstance() {
      const keyFunctions = {};
      for (let i = 1; i <= 6; i++) {
        keyFunctions[i.toString()] = function () {
          // console.log("Pressed: " + i.toString());
          // console.log("Guardians Length: " + guardians.length);
    
          if (getCurrentGameState() === GAME_STATES.PLAYING) {
            if (guardians[i] && guardians.length > i) {
              guardians[i].toggleModes();
              
            }
          }
          
        };
      }
    
      keyFunctions["r"] = function () {
        if (getCurrentGameState() === GAME_STATES.PLAYING) {
          setCurrentGroupCommand(GROUP_COMMANDS.RETREAT);
        }
      }
    
      keyFunctions["a"] = function () {
        if (getCurrentGameState() === GAME_STATES.PLAYING) {
          setCurrentGroupCommand(GROUP_COMMANDS.ADVANCE);
        }
      }

      document.addEventListener("keydown", function test(event) {
        keyDownInstance = test;
        const key = event.key;
        if (key in keyFunctions) {
          // console.log(key);
          keyFunctions[key]();
        }
      });
      

      return keyDownInstance;
  }

  return {
      getInstance: function () {
          if (!keyDownInstance) {
              keyDownInstance = createInstance();
          }
          return keyDownInstance;
      }
  };
})();


function addKeyListener() {
  

  const keyFunctions = {};  
  
  
  for (let i = 1; i <= 6; i++) {
    keyFunctions[i.toString()] = function () {
      // console.log("Pressed: " + i.toString());
      // console.log("Guardians Length: " + guardians.length);

      if (getCurrentGameState() === GAME_STATES.PLAYING) {
        if (guardians[i] && guardians.length > i) {
          guardians[i].toggleModes();
          
        }
      }
      
    };
  }

  keyFunctions["r"] = function () {
    if (getCurrentGameState() === GAME_STATES.PLAYING) {
      setCurrentGroupCommand(GROUP_COMMANDS.RETREAT);
    }
  }

  keyFunctions["a"] = function () {
    if (getCurrentGameState() === GAME_STATES.PLAYING) {
      setCurrentGroupCommand(GROUP_COMMANDS.ADVANCE);
    }
  }

  document.addEventListener("keydown", function test(event) {
    keyDownListener = test;
    const key = event.key;
    if (key in keyFunctions) {
      // console.log(key);
      keyFunctions[key]();
    }
  });
}

function addKeyDownListener() {
  KeyDownSingleton.getInstance();
}

function getKeyDownListener() { return keyDownListener}

function clearKeyListener() {
  // document.removeEventListener("keydown", keyDownListener);
}





export { useGameStart, restoreAllHealth, addKeyListener, getKeyDownListener, clearKeyListener, addKeyDownListener }
