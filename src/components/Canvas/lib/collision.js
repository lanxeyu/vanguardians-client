import { DamageNumber } from "./utilclasses";
import { Duncan, Robbie } from "./guardians";
import { Skeleton } from "./enemies";

function checkAtkBoxCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) {
        if (
            spriteA.atkBox &&
            spriteA.isAttacking == true && 
            !spriteA.atkBox.hasCollided) {

            for (const spriteB of spriteGroup2) {
                if (isAtkBoxColliding(spriteA.atkBox, spriteB)) {
                    spriteB.currHealth -= spriteA.atk
                    new DamageNumber(spriteA.atk, spriteB.position.x, spriteB.position.y)

                    // --------- SPECIAL HIT INTERACTIONS ---------

                    // GUARDIANS             
                    if (spriteA instanceof Duncan) {
                        spriteB.getKnockedBack(15)
                    }
                    else if (spriteA instanceof Robbie) {
                        spriteB.getStunned(1000)
                    }

                    // ENEMIES
                    else if (spriteA instanceof Skeleton){
                        spriteB.getKnockedBack(-5)
                    }
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
  

export { checkAtkBoxCollisions, isAtkBoxColliding }