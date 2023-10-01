import { useState, useEffect } from "react";

export function useGameStart() {
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