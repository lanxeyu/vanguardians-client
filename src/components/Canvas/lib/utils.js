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


export { useGameStart, restoreAllHealth }
