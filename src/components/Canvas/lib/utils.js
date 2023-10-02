import { useState, useEffect } from "react";
import { guardians, van } from "./groups";

function useGameStart() {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter" && !gameStarted) {
        setGameStarted(true);
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

function useRetreatGuardians() {
  const [onCooldown, setOnCooldown] = useState(false);

  useEffect(() => {

    function handleKeyPress(event){
      if(event.key === "r" && onCooldown === (false)){
        for (const guardian of guardians) {
            guardian.position.x = 30
            setOnCooldown(true)
            setTimeout(setOnCooldown(false), 10000)
        }
      }
    }

    document.addEvenetListener("keydown", handleKeyPress)

  }, [])
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

  // keyFunctions["r"] = function () {
  //   if(retreatCooldown === false)
  //   for (const guardian of guardians) {
  //     guardian.position.x = 30
  //     retreatCooldown = true;
  //     setTimeout(retreatCooldown = false, 10000)
  //   }
  // }


  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key in keyFunctions) {
      keyFunctions[key]();
    }
  });
}

export { useGameStart, restoreAllHealth, addKeyListener }
