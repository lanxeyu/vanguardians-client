import { addToGroup, guardians, enemies, guardianProjectiles, guardianHealingProjectiles } from "./groups";
import { Sprite } from "./sprite";
import { CHAR_MODES, CHAR_STATES } from "./statemanagers"
import { KnockedOut } from "./utilclasses";

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

            if ((type === "guardian" && sprite.position.x > this.position.x) ||
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
                (type === "guardian" && sprite.position.x > this.position.x) ||
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
        if (this.image === this.sprites.attack.image && 
            this.framesCurrent < this.sprites.attack.framesMax - 1) {
            return;
        } else if (this.image === this.sprites.attack2?.image && 
                   this.sprites.attack2 &&
                   this.framesCurrent < this.sprites.attack2.framesMax - 1) {
            return;
        }
        else if (this.image === this.sprites.hit.image && 
            this.framesCurrent < this.sprites.hit.framesMax -1) {
            return;
        }
            
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
        this.positionXLimit = 1000;
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
            let tempDate = new Date();
            this.endTime = new Date(tempDate.getTime() + 10000);
            this.knockedOutElapsed = 0;
            
            new KnockedOut("Knocked Out", this.position.x + (this.width / 2), this.position.y)
            setTimeout(() => {
                this.isKnockedOut = false;
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
            this.position.x += this.knockBackDistance;

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
            this.position.x < this.positionXLimit && 
            !this.checkTargetInRange()) {
                this.switchSprite('run')
                this.position.x += this.movSpd;
        }
    }

    update() {
        if (!this.isKnockedOut) {
            if (this.currHealth <= 0) {
                this.getKnockedOut();
            }
            this.updateTarget();
            this.updateAttacking();
            this.updatePosition();
        }
        else {
            if (this.knockedOutElapsed >= this.knockedOutLifeTime) {
                this.knockedOutElapsed = this.knockedOutLifeTime
            }
            else {
                console.log("Time Diff: " + (this.endTime - new Date()));
                console.log("KnockedOutLifeTime: " + this.knockedOutLifeTime);
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
        this.toggleAttributes();
    }

    draw(context) {
        super.draw(context)
        if (this.isKnockedOut) {
            context.fillStyle = 'rgb(255, 255, 255)';
            let knockedBarWidth = this.healthBarWidth * (this.knockedOutElapsed / this.knockedOutLifeTime)
            // console.log(this.knockedOutElapsed)
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
        this.atk = 5;
        this.atkSpd = 700;
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
                this.atkSpd = 700;
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
                this.atkSpd = 700;
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
        if(this.currentMode === CHAR_MODES.MODE_1){
            this.target = this.findRandomTarget(enemies, "guardian");
        } else if(this.currentMode === CHAR_MODES.MODE_2){
            this.target = this.findLowestHpGuardian(guardians)
        }
    }

    attack() {
        if(this.currentMode === CHAR_MODES.MODE_1){
            this.switchSprite('attack')
            this.isAttacking = true;
            new Lightning(this.target.position.x, this.target.position.y - 650);
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
    constructor(x, y, imageSrc, scale = 2.8, framesMax = 9, offset = { x: 40, y: 90 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.name = "james";
        this.position = { x, y };
        this.width = 150;
        this.height = 70;
        this.maxHealth = 140;
        this.currHealth = this.maxHealth;
        this.atk = 4;
        this.atkSpd = 800;
        this.atkRange = 900;
        this.movSpd = 4;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: this.height,
        };
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
        this.atkRange = 700;
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
            new Spear2(this.position.x, (this.position.y + 50), "src/components/canvas/img/Steph/Spear move.png");
            setTimeout(() => {
                this.isAttacking = false;
            }, 5);
        
        } else {
            new Spear(this.position.x, (this.position.y + 50), "src/components/canvas/img/Steph/Spear move.png");
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
        this.maxHealth = 175;
        this.currHealth = this.maxHealth;
        this.atk = 2;
        this.atkSpd = 1800;
        this.atkRange = 150;
        this.movSpd = 4;

        this.knockBackStrength = 10;
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
                this.knockBackResistance = 5;
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
            new Slash(this.position.x, this.position.y);
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

    update() {
        this.updatePosition();
    }
}

class Lightning extends Projectile {
    constructor(x, y, imageSrc, scale = 1.5, framesMax = 20, offset = { x: 200, y: 200 },) {
        super(x, y, imageSrc, scale, framesMax, offset);

        this.position = { x, y };
        this.atk = "Stunned";
        this.movSpd = 15;
        this.width = 60;
        this.height = 595;
        this.stunDuration = 3000;

        this.framesCurrent = 20;
        this.framesElapsed = 20;
        this.framesHold = 5;
    }

    updatePosition() {
        this.position.y += this.movSpd;
    }

    draw(context) {
        context.fillStyle = "orange";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    explodeOnImpact() {
        if (this.position.y === this.target.position.y)
            new Explosion(this.position.x, this.position.y + 100);
    }
}

class Explosion extends Projectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.atk = 5;
        this.movSpd = 0;
        this.width = 200;
        this.height = 150;
        this.stunDuration = 4000;
    }

    draw(context) {
        context.fillStyle = "pink";
        context.fillRect(this.position.x - 75, this.position.y, this.width, this.height);
    }
}

class Spear extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 4, offset = { x: 15, y: 40 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 7;
        this.movSpd = 25;
        this.width = 100;
        this.height = 5;

        this.knockBackStrength = 50;
    }

    // draw(context) {
    //     context.fillStyle = "plum";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class Spear2 extends Projectile {
    constructor(x, y, imageSrc, scale = 3, framesMax = 4, offset = { x: 15, y: 40 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.atk = 5;
        this.movSpd = 25;
        this.width = 100;
        this.height = 5;

        this.knockBackStrength = 0;
    }

    // draw(context) {
    //     context.fillStyle = "plum";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class Slash extends Projectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.atk = 2;
        this.movSpd = 25;
        this.width = 40;
        this.height = 150;

        this.knockBackStrength = 0;
    }

    draw(context) {
        context.fillStyle = "plum";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
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
        this.heal = 10;
        this.movSpd = 10;
        this.width = 40;
        this.height = 40;
    }
}

class Heal2 extends HealingProjectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.heal = 1;
        this.movSpd = 10;
        this.width = 40;
        this.height = 40;
    }
}

export { Character, Lanxe, Robbie, Duncan, Steph, James, Alex, Spear, Spear2, Lightning, Explosion, Heal, Heal2, Slash };
