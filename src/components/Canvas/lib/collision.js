import { DamageNumber } from "./utilclasses";
import { Duncan, Robbie, Spear, Lightning, Explosion, Heal, Spear2 } from "./guardians";
import { Skeleton, Troll } from "./enemies";
import { allSprites, guardianHealingProjectiles, guardianProjectiles, removeFromGroup } from "./groups";

function checkAtkBoxCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) {
        if (
            spriteA.atkBox &&
            spriteA.isAttacking == true) {

            for (const spriteB of spriteGroup2) {
                if (isAtkBoxColliding(spriteA.atkBox, spriteB) && (!spriteA.isKnockedOut || !spriteB.isKnockedOut)) {
                    spriteB.getDamaged(spriteA.atk)
                    new DamageNumber((spriteA.atk/spriteB.damageResistance), spriteB.position.x + (spriteB.width / 2), spriteB.position.y)

                    // --------- SPECIAL HIT INTERACTIONS ---------

                    // GUARDIANS             
                    if (spriteA instanceof Duncan) {
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof Robbie) {
                        spriteB.getStunned(spriteA.stunDuration)
                    }

                    // ENEMIES
                    else if (spriteA instanceof Skeleton){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof Troll){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }

                }
            }
        }
    }
}

function checkHealingProjectileCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) { 
        for (const spriteB of spriteGroup2){
            if(areSpritesColliding(spriteA, spriteB)){
                spriteB.getHealed(spriteA.heal)
                new DamageNumber(spriteA.heal, spriteB.position.x, spriteB.position.y)
            }
        }
        removeFromGroup(spriteA, guardianHealingProjectiles)
        // removeFromGroup(spriteA, allSprites)
    }
}

function checkProjectileCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) {
        for (const spriteB of spriteGroup2) {
            if (areSpritesColliding(spriteA, spriteB)) {
                if(spriteA.atk !== "Stunned"){
                    spriteB.getDamaged(spriteA.atk)
                    new DamageNumber(spriteA.atk, spriteB.position.x, spriteB.position.y)
                } else {
                    new DamageNumber(spriteA.atk, spriteB.position.x, spriteB.position.y + 20)
                }
                

                // --------- SPECIAL HIT INTERACTIONS ---------

                // GUARDIANS             
                if (spriteA instanceof Spear) {
                    spriteB.getKnockedBack(spriteA.knockBackStrength)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                }
                
                if (spriteA instanceof Spear2) {
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                }

                else if (spriteA instanceof Lightning) {
                    // spriteB.getStunned(spriteA.stunDuration)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    new Explosion(spriteB.position.x, spriteB.position.y)
                }

                else if(spriteA instanceof Explosion) {
                    spriteB.getStunned(spriteA.stunDuration)
                    setTimeout(removeFromGroup(spriteA, guardianProjectiles), 5)
                    removeFromGroup(spriteA, allSprites)
                }

                // ENEMIES
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

function areSpritesColliding(spriteA, spriteB) {
    const spriteAX1 = spriteA.position.x;
    const spriteAY1 = spriteA.position.y;
    const spriteAX2 = spriteAX1 + spriteA.width;
    const spriteAY2 = spriteAY1 + spriteA.height;
  
    const spriteBX1 = spriteB.position.x;
    const spriteBY1 = spriteB.position.y;
    const spriteBX2 = spriteBX1 + spriteB.width;
    const spriteBY2 = spriteBY1 + spriteB.height;
  
    return !(
      spriteAX2 < spriteBX1 ||
      spriteAX1 > spriteBX2 ||
      spriteAY2 < spriteBY1 ||
      spriteAY1 > spriteBY2
    );
}

  

export { checkAtkBoxCollisions,  checkProjectileCollisions, isAtkBoxColliding, areSpritesColliding, checkHealingProjectileCollisions }
