import { DamageNumber } from "./utilclasses";

function checkAtkBoxCollisions(guardians, enemies) {
    for (const spriteA of guardians) {
        if (spriteA.isAttacking == true) {
            for (const spriteB of enemies) {
                if (isAtkBoxColliding(spriteA.atkBox, spriteB)) {
                    spriteB.currHealth -= spriteA.atk
                    new DamageNumber(spriteA.atk, spriteB.position.x, spriteB.position.y)
                    // console.log(spriteB.currHealth)
                }
            }
        }
    }
}

function isAtkBoxColliding(atkBoxA, spriteB) {
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