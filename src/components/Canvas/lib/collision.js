import { DamageNumber, HealNumber } from "./utilclasses";
import { Duncan, James, Spear, Lightning, Explosion, Spear2, Slash, Fireball, FireballExplosion, LivingBomb, Lanxe } from "./guardians";
import { Skeleton, Troll } from "./enemies";
import { allSprites, guardianHealingProjectiles, guardianProjectiles, removeFromGroup } from "./groups";
import { FireballEffect, LivingBombEffect } from "./effects";
import { CHAR_MODES } from "./statemanagers";
import { audioManager } from "./audio";

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

                    // GUARDIANS ATTACKING             
                    if (spriteA instanceof Duncan) {
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof Lanxe) {
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof James) {
                        if (spriteA.currentMode === CHAR_MODES.MODE_2) {
                            spriteB.getKnockedBack(5) // Enemy
                            spriteA.getKnockedBack(15) // James
                            spriteA.isUnstoppable = false;
                            spriteA.getKnockedOut();
                            new LivingBomb(spriteB.position.x - (spriteB.width / 2), spriteB.position.y - (spriteB.height / 2), "/images/James/Explosion.png")
                        }
                    }

                    // ENEMIES ATTACKING
                    else if (spriteA instanceof Skeleton){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }
                    else if (spriteA instanceof Troll){
                        spriteB.getKnockedBack(spriteA.knockBackStrength)
                    }


                    // GUARDIANS RECEIVING ATTACK             
                    if (spriteB instanceof Duncan && spriteB.currentMode == CHAR_MODES.MODE_2) {
                        audioManager.playDuncanDefSfx()
                    }

                    else if (spriteB instanceof James) {
                        if (spriteB.currentMode === CHAR_MODES.MODE_2) {
                            spriteA.getKnockedBack(5) // Enemy
                            spriteB.getKnockedBack(15) // James
                            spriteB.isUnstoppable = false;
                            spriteB.getKnockedOut();
                            new LivingBomb(spriteA.position.x - (spriteA.width / 2), spriteA.position.y - (spriteA.height / 2), "/images/James/Explosion.png")
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
        let effectTriggered = false;
        for (const spriteB of spriteGroup2) {
            if (areSpritesColliding(spriteA, spriteB)) {
                spriteB.getDamaged(spriteA.atk)
                new DamageNumber(spriteA.atk, spriteB.position.x, spriteB.position.y)
            
                // --------- SPECIAL HIT INTERACTIONS ---------

                // GUARDIANS             
                if (spriteA instanceof Spear) {
                    audioManager.playSpearHitSfx()
                    spriteB.getKnockedBack(spriteA.knockBackStrength)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                }
                
                if (spriteA instanceof Spear2) {
                    audioManager.playSpearHitSfx()
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                }

                else if (spriteA instanceof Lightning) {
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 5)
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 5)
                    if (!effectTriggered) {
                        new Explosion(spriteB.position.x, spriteB.position.y, "/images/Robbie/Explosion.png")
                        effectTriggered = true;
                    }
                }

                else if(spriteA instanceof Explosion) {
                    // audioManager.playLightningHitSfx() // Too loud on multiple instances
                    new DamageNumber("Stunned", spriteB.position.x, spriteB.position.y + 20)
                    spriteB.getStunned(spriteA.stunDuration)
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 20)
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 20)
                }

                else if(spriteA instanceof Slash) {
                    // audioManager.playSlashHitSfx() // Too loud on multiple instances
                    setTimeout(() => removeFromGroup(spriteA, guardianProjectiles), 200);
                    setTimeout(() => removeFromGroup(spriteA, allSprites), 200);
                }

                else if(spriteA instanceof Fireball) {
                    audioManager.playFireballHitSfx()
                    spriteB.getKnockedBack(spriteA.knockBackStrength)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    if (!effectTriggered) {
                        new FireballExplosion(spriteB.position.x, spriteB.position.y, "/images/James/Explosion.png")
                        effectTriggered = true;
                    }
                    
                }
                else if (spriteA instanceof FireballExplosion) {
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    if (!effectTriggered) {
                        new FireballEffect(spriteA.position.x - (spriteA.width / 2), spriteA.position.y - (spriteA.height / 2), "/images/James/explosion-b.png");
                        effectTriggered = true;
                    }
                    
                }
                else if (spriteA instanceof LivingBomb) {
                    spriteB.getKnockedBack(spriteA.knockBackStrength)
                    removeFromGroup(spriteA, guardianProjectiles)
                    removeFromGroup(spriteA, allSprites)
                    if (!effectTriggered) {
                        new LivingBombEffect(spriteA.position.x - (spriteA.width / 2), spriteA.position.y - (spriteA.height / 2), "/images/James/explosion-2.png");
                        effectTriggered = true;
                    }
                    
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