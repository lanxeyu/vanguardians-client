import { addToGroup, guardians, enemies, guardianProjectiles } from "./groups";
import { Sprite } from "./sprite";

// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor(
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        healthBarPosition = { x: 0, y: 0 }
    ) {
        super(x, y, imageSrc, scale, framesMax, offset, healthBarPosition);
        this.isAlive = true;
        this.target = null;

        this.isKnockedBack = false;
        this.isStunned = false;
        this.damageResistance = 0;

        this.healthBarHeight = 8;
        this.healthBarWidth = 70;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.healthBarPosition = { x, y };
    }

    getDamaged(damage) {
        if (this.damageResistance > 0) {
            const reducedDamage = damage / this.damageResistance;
            this.currHealth -= reducedDamage;
        } else {
            this.currHealth -= damage;
        }
    }

    getKnockedBack(distance) {
        this.isKnockedBack = true;
        this.knockBackDistance = distance;
        setTimeout(() => {
            this.isKnockedBack = false;
            if (!this.isStunned) {
                this.getStunned(200);
            }
        }, 150);
    }

    getStunned(duration) {
        this.isStunned = true;
        setTimeout(() => {
            this.isStunned = false;
        }, duration);
    }

    findNearestTarget(group, type) {
        let nearestTarget = null;
        let nearestDistance = Infinity;

        for (const sprite of group) {
            const distance = Math.abs(sprite.position.x - this.position.x);

            if (
                (type === "guardian" && sprite.position.x > this.position.x) ||
                (type === "enemy" && sprite.position.x < this.position.x)
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
                (type === "enemy" && sprite.position.x < this.position.x)
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
            this.position.x + this.healthBarPosition.x,
            this.position.y - this.healthBarPosition.y,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x + this.healthBarPosition.x,
            this.position.y - this.healthBarPosition.y,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
    }
}

// --------------------  STATE MANAGERS -----------------------------

const CHAR_STATES = {
    IDLE: 0,
    FORWARD: 1,
    ATTACKING: 2,
    FLEEING: 3,
};

const CHAR_MODES = {
    MODE_1: 0,
    MODE_2: 1,
};

// --------------------  GUARDIAN CLASSES  -------------------------
class Guardian extends Character {
    constructor(
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        healthBarPosition = { x: 0, y: 0 }
    ) {
        super(x, y, imageSrc, scale, framesMax, offset, healthBarPosition);
        addToGroup(this, guardians);
        this.positionXLimit = 900;
        this.homePositionX = 50;
        this.isKnockedOut = false;

        this.currentState = CHAR_STATES.IDLE;
        this.currentMode = CHAR_MODES.MODE_1;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    getKnockedOut() {
        this.isKnockedOut = true;
        setTimeout(() => {
            this.isKnockedOut = false;
        }, 10000);
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, "guardian");
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        // Distance between player and home
        const retreatDistance = Math.abs(this.position.x - this.homePositionX) 

        // Knockback check
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance;

        // Retreat block
        } else if(this.isRetreating){
            if (retreatDistance > this.movSpd) {
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
        } else if (!this.isKnockedBack && !this.isStunned && this.target && this.position.x < this.positionXLimit && !this.checkTargetInRange()) {
            this.position.x += this.movSpd;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
    }

    updateAttacking() {
        if (this.target && this.checkTargetInRange() && this.atkCooldown <= 0) {
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
        if (!this.isKnockedOut) {
            if (this.currHealth <= 0) {
                this.getKnockedOut();
            }
            this.updateTarget();
            this.updatePosition();
            this.updateAttacking();
            this.updateAnimation();
        }
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
}

class Lanxe extends Guardian {
    constructor(x, y, imageSrc, scale = 3.8, framesMax = 8, offset = { x: 215, y: 355 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 700;
        this.atkRange = 250;
        this.movSpd = 4;
        this.damageResistance = 2;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };

        this.healthBarPosition.x = 130;
        this.healthBarPosition.y = 100;
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.atk = 5;
                this.atkSpd = 700;
                this.atkRange = 250;
                this.damageResistance = 0;
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
                this.damageResistance = 0;
        }
    }

    // draw(context) {
    //     this.atkBox.position.x = this.position.x
    //     this.atkBox.position.y = this.position.y
    //     context.fillStyle = "blue"
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);

    //     if (this.isAttacking) {
    //         context.fillRect(
    //             this.atkBox.position.x,
    //             this.atkBox.position.y,
    //             this.atkBox.width,
    //             this.atkBox.height
    //         );
    //     }
    // }
}

class Robbie extends Guardian {
    constructor(x, y, imageSrc, scale = 2, framesMax = 6, offset = { x: 215, y: 175 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
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

        this.healthBarPosition.x = -35;
        this.healthBarPosition.y = 85;
    }

    updateTarget() {
        this.target = this.findRandomTarget(enemies, "guardian");
    }

    attack() {
        this.isAttacking = true;
        new Lightning(this.target.position.x, this.target.position.y - 650);
        setTimeout(() => {
            this.isAttacking = false;
        }, 10);
    }

    // draw(context) {
    //     context.fillStyle = "green";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class James extends Guardian {
    constructor(x, y, imageSrc, scale = 3, framesMax = 9, offset = { x: 215, y: 250 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.width = 150;
        this.height = 70;
        this.maxHealth = 120;
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
            height: 50,
        };

        this.currentState = CHAR_STATES.FLEEING;
    }

    // draw(context) {
    //     switch (this.currentState) {
    //         case CHAR_STATES.FORWARD:
    //             context.fillStyle = `rgb(
    //                 200,
    //                 20,
    //                 200)`;
    //             break;
    //         case CHAR_STATES.FLEEING:
    //             context.fillStyle = `rgb(
    //                 200,
    //                 200,
    //                 0)`;

    //             break;
    //         case CHAR_STATES.IDLE:
    //             context.fillStyle = `rgb(
    //                 200,
    //                 200,
    //                 200)`;
    //             break;
    //     }
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class Steph extends Guardian {
    constructor(x, y, imageSrc, scale = 4, framesMax = 8, offset = { x: 215, y: 278 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 80;
        this.currHealth = this.maxHealth;
        this.atk = 4;
        this.atkSpd = 2000;
        this.atkRange = 700;
        this.movSpd = 2;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;

        this.healthBarPosition.x = 50;
        this.healthBarPosition.y = 70;
    }

    attack() {
        this.isAttacking = true;
        new Spear(this.position.x, this.position.y);
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
    }

    // draw(context) {
    //     context.fillStyle = "LightSkyBlue";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }
}

class Duncan extends Guardian {
    constructor(x, y, imageSrc, scale = 3.8, framesMax = 10, offset = { x: 215, y: 355 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        this.position = { x, y };
        this.width = 90;
        this.height = 170;
        this.maxHealth = 175;
        this.currHealth = this.maxHealth;
        this.atk = 2;
        this.atkSpd = 2300;
        this.atkRange = 150;
        this.movSpd = 4.5;

        this.knockBackStrength = 10;
        this.knockBackResistance = 2;
        this.damageResistance = 0;

        this.isRetreating = false;
        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.healthBarPosition.x = 130;
        this.healthBarPosition.y = 110;
    }

    toggleAttributes() {
        switch (this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.damageResistance = 0;
                this.knockBackResistance = 2;
                break;
            case CHAR_MODES.MODE_2:
                this.damageResistance = 3;
                this.knockBackResistance = 10;
                break;
            default:
                this.damageResistance = 0;
                this.knockBackResistance = 2;
        }
    }

    updatePosition() {
        const retreatDistance = Math.abs(this.position.x - this.homePositionX) 
        
        // Mode 1 Block
        if (this.currentMode == CHAR_MODES.MODE_1){
            
            // Knockback check
            if (this.isKnockedBack) {
                this.position.x += this.knockBackDistance / this.knockBackResistance;
            
            // Retreat block
            } else if (this.isRetreating){
                if (retreatDistance > this.movSpd) {
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
            } else if (!this.isKnockedBack && !this.isStunned && this.target && this.position.x < this.positionXLimit && this.checkTargetInRange() == false) {
                this.position.x += this.movSpd;
            }
        }

        // Mode 2 Block
        else {
            if (this.isKnockedBack) {
                this.position.x += this.knockBackDistance / this.knockBackResistance;
            }
        }
    }

    updateAttacking() {
        if (this.currentMode == CHAR_MODES.MODE_1) {
            super.updateAttacking();
        }
    }

    // updatePosition() {
    //     if (this.currentMode == CHAR_MODES.MODE_1){
    //         if (this.isKnockedBack) {
    //             this.position.x += this.knockBackDistance / this.knockBackResistance;
    //         } else if (
    //             !this.isKnockedBack &&
    //             !this.isStunned &&
    //             this.target &&
    //             this.position.x < this.positionXLimit &&
    //             this.checkTargetInRange() == false
    //         ) {
    //             this.position.x += this.movSpd;
    //         }
    //     } else {
    //         if (this.isKnockedBack) {
    //             this.position.x += this.knockBackDistance / this.knockBackResistance;
    //         }
    //     }
    // }


    // draw(context) {
    //     context.fillStyle = "purple";
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);

    //     if (this.isAttacking) {
    //         context.fillRect(
    //             this.atkBox.position.x,
    //             this.atkBox.position.y,
    //             this.atkBox.width,
    //             this.atkBox.height
    //         );
    //     }
    // }
}

class Alex extends Guardian {
    constructor() {
        super();
    }
}

// --------------------  GUARDIAN PROJECTILE CLASSES  -------------------------
class Projectile extends Sprite {
    constructor() {
        super();
        addToGroup(this, guardianProjectiles);
    }

    updatePosition() {
        this.position.x += this.movSpd;
    }

    update() {
        this.updatePosition();
    }
}

class Lightning extends Projectile {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.atk = "Stunned";
        this.movSpd = 15;
        this.width = 60;
        this.height = 595;
        this.stunDuration = 3000;
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
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.atk = 7;
        this.movSpd = 25;
        this.width = 100;
        this.height = 5;

        this.knockBackStrength = 50;
    }

    draw(context) {
        context.fillStyle = "plum";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export { Character, Lanxe, Robbie, Duncan, Steph, James, Alex, Spear, Lightning, Explosion, Projectile };
