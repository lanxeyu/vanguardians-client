import { Van } from "./sprite";

const checkGameOver = () => {
  console.log(Van.isAlive)
  if(Van.currHealth < 1){
   console.log("game over")
  }
}

export { checkGameOver }
