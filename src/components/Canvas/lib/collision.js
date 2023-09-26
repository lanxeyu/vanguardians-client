

function checkAtkBoxCollisions(characters, enemies) {
    for (const spriteA of characters) {
      for (const spriteB of enemies) {
        if (isColliding(spriteA.atkBox, spriteB)) {
          spriteB.currHealth -= spriteA.atk
          console.log(spriteB.currHealth)
        }
      }
    }
}

function isColliding(atkBoxA, spriteB) {
    const atkBoxAX1 = atkBoxA.position.x;
    const atkBoxAY1 = atkBoxA.position.y;
    const atkBoxAX2 = atkBoxAX1 + atkBoxA.width;
    const atkBoxAY2 = atkBoxAY1 + atkBoxA.height;
  
    const spriteBX1 = spriteB.position.x;
    const spriteBY1 = spriteB.position.y;
    const spriteBX2 = spriteBX1 + spriteB.width;
    const spriteBY2 = spriteBY1 + spriteB.height;
  
    return !(
      atkBoxAX2 < spriteBX1 ||
      atkBoxAX1 > spriteBX2 ||
      atkBoxAY2 < spriteBY1 ||
      atkBoxAY1 > spriteBY2
    );
}
  

export { checkAtkBoxCollisions }