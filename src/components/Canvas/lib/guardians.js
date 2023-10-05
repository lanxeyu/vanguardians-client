import { addToGroup, guardians, enemies, guardianProjectiles, guardianHealingProjectiles } from "./groups";
import { Sprite } from "./sprite";
import { CHAR_MODES, CHAR_STATES } from "./statemanagers"
import { KnockedOut, SwitchMode } from "./utilclasses";

// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor(
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites
    ) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.isAlive = true;
        this.target = null;

        this.isKnockedBack = false;
        this.isStunned = false;

        this.knockBackStrength = 0;
        this.knockBackResistance = 1;
        this.damageResistance = 1;

        this.healthBarHeight = 8;
        this.healthBarWidth = 70;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    getDamaged(damage) {
        if (!this.isKnockedOut) {
            this.switchSprite('hit')
            if (this.damageResistance > 0) {
                const reducedDamage = damage / this.damageResistance;
                if (reducedDamage > this.currHealth) {
                    this.currHealth = 0;
                }
                else {
                    this.currHealth -= reducedDamage;
                }
                
            } else {
                if (damage > this.currHealth) {
                    this.currHealth = 0;
                }
                else {
                    this.currHealth -= damage;
                }
            }
        }
    }

    getHealed(heal) {
        if(this.currHealth + heal < this.maxHealth){
            this.currHealth += heal
        } else {
            this.currHealth = this.maxHealth
        }
    }

    getKnockedBack(distance) {
        if (this.isKnockedBack === false) {
            this.isKnockedBack = true;
            this.knockBackDistance = (distance / this.knockBackResistance);
            setTimeout(() => {
                this.isKnockedBack = false;
                if (!this.isStunned) {
                    this.getStunned(200);
                }   
            }, 150);
        }
    }

    getStunned(duration) {
        this.isStunned = true;
        setTimeout(() => {
            this.isStunned = false;
        }, duration);
    }

    findLowestHpGuardian(guardians){
        let lowestHp = 10;
        let lowestHpG;

        for (const guardian of guardians) {
                const guardianHp = guardian.currHealth / guardian.maxHealth
                if(guardianHp < lowestHp && guardian.name !== "van"){
                lowestHp = guardianHp
                lowestHpG = guardian
                }
            }
        return lowestHpG
    }

    findNearestTarget(group, type) {
        let nearestTarget = null;
        let nearestDistance = Infinity;

        for (const sprite of group) {
            const distance = Math.abs(sprite.position.x - this.position.x);

            if ((type === "guardian" && sprite.position.x > this.position.x && sprite.position.x < 1366) ||
                (type === "enemy" && sprite.position.x < this.position.x && !sprite.isKnockedOut)
            ) {
                if (distance < nearestDistance) {
                    nearestTarget = sprite;
                    nearestDistance = distance;
                }
            }
        }
        return nearestTarget;
    }

    findRandomTarget(group, type) {
            const validTargets = [];
    
            for (const sprite of group) {
                if (
                    (type === "guardian" && sprite.position.x > this.position.x && sprite.position.x < 1366) ||
                    (type === "enemy" && sprite.position.x < this.position.x && !sprite.isKnockedOut)
                ) {
                    validTargets.push(sprite);
                }
            }
    
            if (validTargets.length === 0) {
                return null;
            }
    
            const randomIndex = Math.floor(Math.random() * validTargets.length);
            return validTargets[randomIndex];
    }

    checkTargetInRange() {
        if (this.target)
            return !(Math.abs(this.target.position.x - this.position.x) > this.atkRange);
    }

    drawHealthbars(context) {
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + (this.width / 2) - (this.healthBarWidth / 2),
            this.position.y - 10,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x + (this.width / 2) - (this.healthBarWidth / 2),
            this.position.y - 10,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
    }
    
    drawKnockedOutBars(context) {
        if (this.isKnockedOut) {
            context.fillStyle = 'rgb(255, 255, 255)';
            let knockedBarWidth = this.healthBarWidth * (this.knockedOutElapsed / this.knockedOutLifeTime)
            context.fillRect(this.position.x + (this.width / 2) - (this.healthBarWidth / 2), this.position.y, knockedBarWidth, 5);
        }
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
    }

    updateAnimation() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    updateAttacking() {
        if (!this.isStunned && this.target && this.checkTargetInRange() && this.atkCooldown <= 0) {
            this.attack();
            this.atkCooldown = this.atkSpd;
            this.atkTimer = setTimeout(() => {
                this.isAttacking = false;
            }, 50);
        }
        if (this.atkCooldown > 0) {
            this.atkCooldown -= 16;
        }
    }

    switchSprite(sprite) {
        // console.log(sprite)
        if (this.image === this.sprites.attack.image && 
            this.framesCurrent < this.sprites.attack.framesMax - 1) {
            return;
        } 
        else if (this.image === this.sprites.attack2?.image && 
                   this.sprites.attack2 &&
                   this.framesCurrent < this.sprites.attack2.framesMax - 1) {
            return;
        }
        else if (this.image === this.sprites.hit.image && 
            this.framesCurrent < this.sprites.hit.framesMax -1) {
            return;
        }
        else if (this.image === this.sprites.death.image &&
            this.framesCurrent === this.sprites.death.framesMax -1) {
                // console.log('Dead')
            if (this.isKnockedOut) return this.framesHold = this.knockedOutLifeTime;
            // console.log('Dead Hold') 
            if (sprite != 'idle') {
                return this.framesHold = this.sprites.death.framesDeathHold
            }           
            
        }
        else if(this.isKnockedOut === false) {
            this.framesHold = 5
        }
        // console.log('switching');
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                }
                break;
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'attack2':
                if (this.image !== this.sprites.attack2.image){
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'hit':
                if (this.image !== this.sprites.hit.image){
                    this.image = this.sprites.hit.image
                    this.framesMax = this.sprites.hit.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'defend':
                if (this.image !== this.sprites.defend.image){
                    this.image = this.sprites.defend.image
                    this.framesMax = this.sprites.defend.framesMax
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break;
        }
    }
}

// --------------------  GUARDIAN CLASSES  -------------------------
class Guardian extends Character {
    constructor(
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
    ) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        addToGroup(this, guardians);
        this.positionXLimitR = 1000;
        this.positionXLimitL = 0;
        this.homePositionX = 50;
        this.isKnockedOut = false;

        this.endTime = new Date()
        this.knockedOutLifeTime = 10000
        this.knockedOutElapsed = 0;

        this.currentState = CHAR_STATES.IDLE;
        this.currentMode = CHAR_MODES.MODE_1;    
    }

    getKnockedOut() {
        if (this.isKnockedOut === false) {
            // console.log("knockedout");
            let tempDate = new Date();
            this.endTime = new Date(tempDate.getTime() + this.knockedOutLifeTime);
            this.knockedOutElapsed = 0;
            new KnockedOut("Knocked Out", this.position.x + (this.width / 2), this.position.y)
            setTimeout(() => {
                // console.log('recovered');
                this.isKnockedOut = false;
                this.switchSprite('idle')
                new KnockedOut("Recovered", this.position.x + (this.width / 2), this.position.y)
                this.currHealth = this.maxHealth;
            }, this.knockedOutLifeTime);
            this.isKnockedOut = true;
        }
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, "guardian");
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        this.switchSprite('idle')

        // Distance between player and home
        const retreatDistance = Math.abs(this.position.x - this.homePositionX) 

        // Knockback check
        if (this.isKnockedBack) {
            if(this.position.x > this.positionXLimitL){
                this.position.x += this.knockBackDistance;
            }

        // Retreat block
        } else if(this.isRetreating){
            if (retreatDistance > this.movSpd) {
                this.switchSprite('run')
                if (this.homePositionX > this.position.x) {
                    this.position.x += this.movSpd
                } 
                else if (this.homePositionX < this.position.x) {
                    this.position.x -= this.movSpd
                }
            }
            else {
                this.position.x = this.homePositionX
                this.currentState = CHAR_STATES.IDLE
            }
        
        // Normal movement block
        } else if (!this.isKnockedBack && 
            !this.isStunned && this.target && 
            this.position.x < this.positionXLimitR &&
            !this.checkTargetInRange()) {
                this.switchSprite('run')
                this.position.x += this.movSpd;
        }
    }

    update() {
        // console.log(this.currHealth);
        // console.log(this.isKnockedOut);
        if (this.currHealth <= 0) {
            this.getKnockedOut();
        }
        if (!this.isKnockedOut) {
            this.updateTarget();
            this.updateAttacking();
            this.updatePosition();
        }
        else {
            if (this.knockedOutElapsed >= this.knockedOutLifeTime) {
                this.knockedOutElapsed = this.knockedOutLifeTime
            }
            else {
                // console.log("Time Diff: " + (this.endTime - new Date()));
                // console.log("KnockedOutLifeTime: " + this.knockedOutLifeTime);
                this.knockedOutElapsed =  this.knockedOutLifeTime - (this.endTime - new Date())
            }
        }
        
        this.updateAnimation();
    }

    toggleModes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.currentMode = CHAR_MODES.MODE_2;
                break;
            case CHAR_MODES.MODE_2:
                this.currentMode = CHAR_MODES.MODE_1;
                break;
            default:
                this.currentMode = CHAR_MODES.MODE_1;
        }
        new SwitchMode('Switch!', this.position.x, this.position.y)
        this.toggleAttributes();
    }

    draw(context) {
        super.draw(context)
        if (this.isKnockedOut) {
            context.fillStyle = 'rgb(255, 255, 255)';
            this.switchSprite('death')
            let knockedBarWidth = this.healthBarWidth * (this.knockedOutElapsed / this.knockedOutLifeTime)
            context.fillRect(this.position.x + (this.width / 2) - (this.healthBarWidth / 2), this.position.y, knockedBarWidth, 5);
        }
    }
}

class Lanxe extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "lanxe"
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.atk = 3;
        this.atkSpd = 500;
        this.atkRange = 250;
        this.movSpd = 6;
        this.damageResistance = 1;
        
        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: this.height,
        };
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.atk = 5;
                this.atkSpd = 500;
                this.atkRange = 250;
                this.damageResistance = 1;
                break;
            case CHAR_MODES.MODE_2:
                this.atk = 8;
                this.atkSpd = 2000;
                this.atkRange = 250;
                this.damageResistance = 2;
                break;
            default:
                this.atk = 5;
                this.atkSpd = 500;
                this.atkRange = 250;
                this.damageResistance = 1;
        }
    }
}

class Robbie extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "robbie";
        this.position = { x, y };
        this.width = 70;
        this.height = 140;
        this.maxHealth = 60;
        this.currHealth = this.maxHealth;
        this.atk = 3;
        this.atkSpd = 5000;
        this.atkRange = 1000;
        this.movSpd = 3;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
    }

    updateTarget() {
        if (this.currentMode === CHAR_MODES.MODE_1) {
            if (!enemies.includes(this.target)) {
                this.target = this.findRandomTarget(enemies, "guardian");
            }
        } else if (this.currentMode === CHAR_MODES.MODE_2) {
            this.target = this.findLowestHpGuardian(guardians);
        }
    }

    attack() {
        if(this.currentMode === CHAR_MODES.MODE_1){
            this.switchSprite('attack')
            this.isAttacking = true;
            new Lightning(this.target.position.x, this.target.position.y - 650, "images/Robbie/Lightning.png");
            setTimeout(() => {
            this.isAttacking = false;
            }, 10);
        } 
                
        else if(this.currentMode === CHAR_MODES.MODE_2){
            this.switchSprite('attack2')
            this.isAttacking = true;
            new Heal(this.target.position.x, this.target.position.y -20)
            setTimeout(() => {
                this.isAttacking = false;
            }, 5)
        }
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.atkSpd = 5000;
                break;
            case CHAR_MODES.MODE_2:
                this.atkSpd = 3000;
                break;
            default:
                this.atkSpd = 5000;
        }
    }
}

class James extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "james";
        this.position = { x, y };
        this.width = 150;
        this.height = 70;
        this.maxHealth = 120;
        this.currHealth = this.maxHealth;
        this.atk = 7;
        this.atkSpd = 1500;
        this.atkRange = 1100;
        this.movSpd = 4;

        this.knockBackStrength = 10;
        this.damageResistance = 0;
        this.knockBackResistance = 0;

        this.isUnstoppable = false;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.width + 20,
            height: this.height + 20,
        };
    }

    getStunned(duration) {
        if (this.currentMode === CHAR_MODES.MODE_2) return;
        this.isStunned = true;
        setTimeout(() => {
            this.isStunned = false;
        }, duration);
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.damageResistance = 0;
                this.knockBackResistance = 0;
                this.atkSpd = 1500;
                this.atk = 7;
                break;
            case CHAR_MODES.MODE_2:
                this.damageResistance = 20;
                this.knockBackResistance = 20;
                this.atkSpd = 50;
                this.atk = 1;
                break;
            default:
                this.damageResistance = 0;
                this.knockBackResistance = 0;
        }
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true;

        if (this.currentMode == CHAR_MODES.MODE_1) {
            new Fireball(this.position.x + this.width - 23, this.position.y - 23, "images/James/Move.png", 3, 6, { x: 46, y: 46 }, this.target)
            setTimeout(() => {
                this.isAttacking = false;
            }, 5);
        }
    }

    updatePosition() {
        // Mode 1
        if (this.currentMode == CHAR_MODES.MODE_1){
            super.updatePosition()
        }
        // Mode 2
        else {
            if (!this.isKnockedBack) {
                if (this.target) {
                    if (this.target.isAlive) {
                        this.isUnstoppable = true;
                        let targetPosX = this.target.position.x + (this.target.width / 2)
                        let targetPosY = this.target.position.y + (this.target.height / 4)
                        if (this.position.x < targetPosX) {
                            this.position.x += this.movSpd * 4;
                            if (this.position.y < targetPosY) {
                                this.position.y += this.movSpd;
                            }
                            else if (this.position.y > targetPosY) {
                                this.position.y -= this.movSpd;
                            }
                        }
                        else {
                            this.position.x -= this.movSpd * 4;
                            if (this.position.y < targetPosY) {
                                this.position.y += this.movSpd;
                            }
                            else if (this.position.y > targetPosY) {
                                this.position.y -= this.movSpd;
                            }
                        }
                    }
                    else {
                        // console.log('No Target');
                        this.isUnstoppable = true;
                        this.position.x += this.movSpd * 4;
                    }
                    
                    }
                }
            }
            
    }

    // updateAttacking() {
    //     if (this.currentMode == CHAR_MODES.MODE_2) {
    //         super.updateAttacking();
    //     }
    // }

    update() {
        // console.log(this.currHealth);
        // console.log(this.isKnockedOut);
        if (this.currHealth <= 0) {
            this.getKnockedOut();
        }
        if (!this.isKnockedOut) {
            this.updateTarget();
            this.updateAttacking();
            this.updatePosition();
        }
        else {
            console.log(this.position.y);
            let floor = 490;
            let bottom = this.position.y + this.height;
            let fallSpd = 2;
            if (bottom < floor) {
                this.position.y += fallSpd;
            }
            else {
               this.position.y = floor - this.height;
            }
            if (this.knockedOutElapsed >= this.knockedOutLifeTime) {
                this.knockedOutElapsed = this.knockedOutLifeTime
            }
            else {
                // console.log("Time Diff: " + (this.endTime - new Date()));
                // console.log("KnockedOutLifeTime: " + this.knockedOutLifeTime);
                this.knockedOutElapsed =  this.knockedOutLifeTime - (this.endTime - new Date())
            }
        }
        
        this.updateAnimation();
    }

    toggleModes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.currentMode = CHAR_MODES.MODE_2;
                break;
            case CHAR_MODES.MODE_2:
                console.log(this.isUnstoppable);
                if (this.isUnstoppable) return;
                this.currentMode = CHAR_MODES.MODE_1;
                break;
            default:
                this.currentMode = CHAR_MODES.MODE_1;
        }
        new SwitchMode('Switch!', this.position.x, this.position.y)
        this.toggleAttributes();
        
    }
    
}

class Steph extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "steph";
        this.position = { x, y };
        this.width = 50;
        this.height = 140;
        this.maxHealth = 80;
        this.currHealth = this.maxHealth;
        this.atkSpd = 700;
        this.atkRange = 900;
        this.movSpd = 4;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.atkSpd = 700;
                break;
            case CHAR_MODES.MODE_2:
                this.atkSpd = 2000;
                break;
            default:
                this.atkSpd = 700;
        }
    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true;

        if (this.currentMode == CHAR_MODES.MODE_1){
            new Spear2(this.position.x, (this.position.y + 50), "images/Steph/Spear move.png");
            setTimeout(() => {
                this.isAttacking = false;
            }, 5);
        
        } else {
            new Spear(this.position.x, (this.position.y + 50), "images/Steph/Spear move.png");
            setTimeout(() => {
                this.isAttacking = false;
            }, 5);
        }
    }
}

class Duncan extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "duncan";
        this.position = { x, y };
        this.width = 90;
        this.height = 180;
        this.maxHealth = 125;
        this.currHealth = this.maxHealth;
        this.atk = 2;
        this.atkSpd = 1800;
        this.atkRange = 150;
        this.movSpd = 3;

        this.knockBackStrength = 20;
        this.knockBackResistance = 2;
        this.damageResistance = 1;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: this.height,
        };
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.damageResistance = 1;
                this.knockBackResistance = 2;
                break;
            case CHAR_MODES.MODE_2:
                this.damageResistance = 4;
                this.knockBackResistance = 10;
                break;
            default:
                this.damageResistance = 1;
                this.knockBackResistance = 2;
        }
    }

    updatePosition() {
        // Mode 1 Block
        if (this.currentMode == CHAR_MODES.MODE_1){
            super.updatePosition()
        }

        // Mode 2 Block
        else {
            this.switchSprite('defend')
            if (this.isKnockedBack) {
                this.position.x += this.knockBackDistance;
            }
        }
    }

    updateAttacking() {
        if (this.currentMode == CHAR_MODES.MODE_1) {
            super.updateAttacking();
        }
    }

}

class Alex extends Guardian {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "alex"
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.atkSpd = 2900;
        this.atkRange = 450;
        this.movSpd = 4;
        
        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.atkSpd = 2900;
                break;
            case CHAR_MODES.MODE_2:
                this.atkSpd = 800;
                break;
            default:
                this.atkSpd = 2900;
        }
    }

    updateTarget() {
        if (this.currentMode == CHAR_MODES.MODE_1){
            super.updateTarget()
        }
    }

    attack() {
        this.isAttacking = true;
        if (this.currentMode == CHAR_MODES.MODE_1){
            this.switchSprite('attack')
            new Slash(this.position.x, this.position.y, "images/Alex/Projectile.png");
            setTimeout(() => {
                this.isAttacking = false;
            }, 5);

        } else if(this.currentMode == CHAR_MODES.MODE_2){
            this.switchSprite('attack2')
            for (const guardian of guardians) {
                new Heal2(guardian.position.x, guardian.position.y -20)
            }
            setTimeout(() => {
                this.isAttacking = false;
            }, 5)
        }  
    }

    updatePosition() {
        // Mode 1 Block
        if (this.currentMode == CHAR_MODES.MODE_1){
            super.updatePosition()
        }

        // Mode 2 Block
        else {
            this.switchSprite('idle')
            if (this.isKnockedBack) {
                this.position.x += this.knockBackDistance;
            }
        }
    }
}

// --------------------  GUARDIAN PROJECTILE CLASSES  -------------------------
class Projectile extends Sprite {
    constructor( 
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },) {
        super(x, y, imageSrc, scale, framesMax, offset);
        addToGroup(this, guardianProjectiles);

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    updatePosition() {
        this.position.x += this.movSpd;
    }

    updateAnimation() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.updatePosition();
        this.updateAnimation();
    }
    
}

class Lightning extends Projectile {
    constructor(x, y, imageSrc, scale = 5, framesMax = 5, offset = { x: 250, y:-200 },) {
        super(x, y, imageSrc, scale, framesMax, offset);

        this.position = { x, y };
        this.atk = "Stunned";
        this.movSpd = 10;
        this.width = 70;
        this.height = 595;
    }

    updatePosition() {
        this.position.y += this.movSpd;
    }

    // draw(context) {
    //     context.fillStyle = "orange";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }

    // explodeOnImpact() {
    //     if (this.position.y === this.target.position.y)
    //         new Explosion(this.position.x, this.position.y + 100, "images/Robbie/Explosion.png");
    // }
}

class Explosion extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 10, offset = { x: 0, y: 0 },) {
        super(x, y, imageSrc, scale, framesMax, offset);
        
        this.position = { x, y };
        this.atk = 3;
        this.movSpd = 0;
        this.width = 200;
        this.height = 150;
        this.stunDuration = 1000;
    }

    // draw(context) {
    //     context.fillStyle = "pink";
    //     context.fillRect(this.position.x - 75, this.position.y, this.width, this.height);
    // }
}

class Spear extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 4, offset = { x: 15, y: 40 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 7;
        this.movSpd = 25;
        this.width = 100;
        this.height = 5;

        this.framesHold = 10;

        this.knockBackStrength = 50;
    }
}

class Spear2 extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 4, offset = { x: 15, y: 40 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 5;
        this.movSpd = 25;
        this.width = 100;
        this.height = 5;

        this.framesHold = 10;

        this.knockBackStrength = 0;
    }
}

class Slash extends Projectile {
    constructor(x, y, imageSrc, scale = 8, framesMax = 10, offset = { x: 0, y: 40 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 1;
        this.movSpd = 25;
        this.width = 40;
        this.height = 150;

        this.knockBackStrength = 0;
    }

    // draw(context) {
    //     context.fillStyle = "aqua";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class Fireball extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 6, offset = { x: 46, y: 46 }, target) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 5;
        this.movSpd = 4;    
        this.width = 46;
        this.height = 46;

        this.framesHold = 30;

        this.target = target;
        
        this.knockBackStrength = 1;
    }

    updatePosition() {
        if (this.target) {
            if (this.target.isAlive) {
                let targetPosX = this.target.position.x + (this.target.width / 2)
                let targetPosY = this.target.position.y + (this.target.height / 4)
                if (this.position.x < targetPosX) {
                    this.position.x += this.movSpd;
                    if (this.position.y < targetPosY) {
                        this.position.y += this.movSpd / 10;
                    }
                    else if (this.position.y > targetPosY) {
                        this.position.y -= this.movSpd / 10;
                    }
                }
                else {
                    this.position.x -= this.movSpd;
                    if (this.position.y < targetPosY) {
                        this.position.y += this.movSpd / 10;
                    }
                    else if (this.position.y > targetPosY) {
                        this.position.y -= this.movSpd / 10;
                    }
                }
            }
            else {
                // console.log('No Target');
                this.position.x += this.movSpd;
            }
            
        }
        this.updateAnimation();
    }

    // draw(context) {
    //     super.draw(context);
    //     context.fillStyle = "rgb(255, 200, 200)";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class FireballExplosion extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 7, offset = { x: 0, y: 0 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        
        this.position = { x, y };
        this.atk = 5;
        this.movSpd = 0;
        this.width = 150;
        this.height = 150;
    }

    draw(context) {
        // super.draw(context);
        // context.fillStyle = "pink";
        // context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }


}

class LivingBomb extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 7, offset = { x: 0, y: 0 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        
        this.position = { x, y };
        this.atk = 50;
        this.movSpd = 0;
        this.width = 250;
        this.height = 250;
        this.knockbackStrength = 20;
    }

    draw(context) {
        // super.draw(context);
        // context.fillStyle = "pink";
        // context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }


}


// --------------------  GUARDIAN HEALING PROJECTILE CLASSES  -------------------------

class HealingProjectile extends Sprite {
    constructor() {
        super();
        addToGroup(this, guardianHealingProjectiles);
    }

    updatePosition() {
        this.position.y += this.movSpd;
    }

    draw(context) {
        context.fillStyle = "green"
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}


class Heal extends HealingProjectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.heal = 20;
        this.movSpd = 10;
        this.width = 40;
        this.height = 40;
    }
}

class Heal2 extends HealingProjectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.heal = 2;
        this.movSpd = 10;
        this.width = 40;
        this.height = 40;
    }
}

export { Character, Lanxe, Robbie, Duncan, Steph, James, Alex, Spear, Spear2, Lightning, Explosion, Fireball, FireballExplosion, LivingBomb, Heal, Heal2, Slash };
