import { DamageNumber, HealNumber } from "./utilclasses";
import { Duncan, James, Spear, Lightning, Explosion, Spear2, Slash, Fireball, FireballExplosion, LivingBomb } from "./guardians";
import { Skeleton, Troll } from "./enemies";
import { allSprites, guardianHealingProjectiles, guardianProjectiles, removeFromGroup } from "./groups";
import { FireballEffect, LivingBombEffect } from "./effects";
import { CHAR_MODES } from "./statemanagers";

function checkAtkBoxCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) {
        if (
            spriteA.atkBox &&
            spriteA.isAttacking == true) {
            // console.log(spriteA.name);
            for (const spriteB of spriteGroup2) {
                if (isAtkBoxColliding(spriteA.atkBox, spriteB) && (!spriteA.isKnockedOut || !spriteB.isKnockedOut)) {
                    spriteB.getDamaged(spriteA.atk)
                    new DamageNumber((spriteA.atk/spriteB.damageResistance), spriteB.position.x + (spriteB.width / 2), spriteB.position.y)

                    // --------- SPECIAL HIT INTERACTIONS ---------

                    // GUARDIANS             
                    if (spriteA instanceof Duncan) {
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }

                    // ENEMIES
                    else if (spriteA instanceof Skeleton){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof Troll){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof James) {
                        console.log(spriteA.currentMode);
                        if (spriteA.currentMode === CHAR_MODES.MODE_2) {
                            console.log('Explode');
                            spriteB.getKnockedBack(spriteA.knockBackStrength)
                            spriteA.getKnockedBack(10)
                            spriteA.isUnstoppable = false;
                            spriteA.getKnockedOut();
                            new LivingBomb(spriteB.position.x + (spriteB.width / 2), spriteB.position.y + (spriteB.height / 2), "images/James/Explosion.png")
                        }
                    }
                    if (spriteB instanceof James) {
                        console.log(spriteB.currentMode);
                        console.log('Attacked James');
                        if (spriteB.currentMode === CHAR_MODES.MODE_2) {
                            console.log('Explode Retaliation');
                            spriteA.getKnockedBack(spriteB.knockBackStrength)
                            spriteB.getKnockedBack(10)
                            spriteA.isUnstoppable = false;
                            spriteB.getKnockedOut();
                            new LivingBomb(spriteB.position.x - (spriteB.width / 2), spriteB.position.y - (spriteB.height / 2), "images/James/Explosion.png")
                        }
                    }
                }
            }
        }
    }
}

function checkHealingProjectileCollisions(spriteGroup1, spriteGroup2) {
    for (const spriteA of spriteGroup1) { 
        for (const spriteB of spriteGroup2){
            if(areSpritesColliding(spriteA, spriteB) && (spriteB.name !== "van")){
                spriteB.getHealed(spriteA.heal)
                new HealNumber(spriteA.heal, spriteB.position.x, spriteB.position.y)
            }
        }
        removeFromGroup(spriteA, guardianHealingProjectiles)
        removeFromGroup(spriteA, allSprites)
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
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 5)
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 5)
                    new Explosion(spriteB.position.x, spriteB.position.y, "images/Robbie/Explosion.png")
                }

                else if(spriteA instanceof Explosion) {
                    spriteB.getStunned(spriteA.stunDuration)
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 20)
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 20)
                }

                else if(spriteA instanceof Slash) {
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 200);
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 200);
                }

                else if(spriteA instanceof Fireball) {
                    spriteB.getKnockedBack(spriteA.knockBackStrength)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    new FireballExplosion(spriteB.position.x, spriteB.position.y, "images/James/Explosion.png")
                }
                else if (spriteA instanceof FireballExplosion) {
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    new FireballEffect(spriteA.position.x - (spriteA.width / 2), spriteA.position.y - (spriteA.height / 2), "images/James/Explosion.png");
                }
                else if (spriteA instanceof LivingBomb) {
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    new LivingBombEffect(spriteA.position.x - (spriteA.width / 2), spriteA.position.y - (spriteA.height / 2), "images/James/explosion-2.png");
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