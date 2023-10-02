import {
    addToGroup,
    removeFromGroup,
    allSprites,
    guardians,
    enemies,
    guardianProjectiles,
} from './groups';
import { Sprite } from './sprite';

// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor(x, y, imageSrc, scale = 1, framesMax = 1) {
        super(x, y, imageSrc, scale, framesMax);
        this.isAlive = true;
        this.target = null;

        this.isKnockedBack = false;
        this.isStunned = false;

        this.healthBarHeight = 8;
        this.healthBarWidth = 70;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
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
                (type === 'guardian' && sprite.position.x > this.position.x) ||
                (type === 'enemy' && sprite.position.x < this.position.x)
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
                (type === 'guardian' && sprite.position.x > this.position.x) ||
                (type === 'enemy' && sprite.position.x < this.position.x)
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
        context.fillStyle = 'grey';
        context.fillRect(
            this.position.x,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = 'red';
        context.fillRect(
            this.position.x,
            this.position.y - 25,
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
    constructor() {
        super();
        addToGroup(this, guardians);
        this.positionXLimit = 900;

        this.currentState = CHAR_STATES.IDLE;
        this.currentMode = CHAR_MODES.MODE_1;
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, 'guardian');
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance;
        } else if (
            !this.isKnockedBack &&
            !this.isStunned &&
            this.target &&
            this.position.x < this.positionXLimit &&
            !this.checkTargetInRange()
        ) {
            this.position.x += this.movSpd;
        }

        /*
        let homePositionX = 50
        // Distance between player and home
        const retreatDistance = Math.abs(this.position.x - homePositionX) 
        switch(this.currentState) {
            case CHAR_STATES.IDLE:

            break
            case CHAR_STATES.FORWARD:
                // Move towards target
                if (direction > this.atkRange) {
                    this.position.x += this.movSpd
                } 
            break
            case CHAR_STATES.ATTACKING:

            break
            case CHAR_STATES.FLEEING:
                if (retreatDistance > this.movSpd) {
                    if (homePositionX > this.position.x) {
                        this.position.x += this.movSpd
                    } 
                    else if (homePositionX < this.position.x) {
                        this.position.x -= this.movSpd
                    }
                }
                else {
                    this.position.x = homePositionX
                    this.currentState = CHAR_STATES.IDLE
                }
                
            break
            default:

        }
        */
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

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            // Guardian knocked-out logic to be implemented
            removeFromGroup(this, allSprites);
            removeFromGroup(this, guardians);
        }
        this.updateTarget();
        this.updatePosition();
        this.updateAttacking();
    }

    toggleModes() {
        console.log('Toggled mode for ', this);
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
    }
}

class Lanxe extends Guardian {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 1000;
        this.atkRange = 250;
        this.movSpd = 4;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };
    }

    draw(context) {
        this.atkBox.position.x = this.position.x;
        this.atkBox.position.y = this.position.y;
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            context.fillRect(
                this.atkBox.position.x,
                this.atkBox.position.y,
                this.atkBox.width,
                this.atkBox.height
            );
        }
    }
}

class Robbie extends Guardian {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 60;
        this.currHealth = this.maxHealth;
        this.atk = 3;
        this.atkSpd = 5000;
        this.atkRange = 1000;
        this.movSpd = 3;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
    }

    updateTarget() {
        this.target = this.findRandomTarget(enemies, 'guardian');
    }

    attack() {
        this.isAttacking = true;
        new Lightning(this.target.position.x, this.target.position.y - 650);
        setTimeout(() => {
            this.isAttacking = false;
        }, 10);
    }

    draw(context) {
        context.fillStyle = 'green';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class James extends Guardian {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 150;
        this.height = 70;
        this.maxHealth = 120;
        this.currHealth = this.maxHealth;
        this.atk = 4;
        this.atkSpd = 800;
        this.atkRange = 900;
        this.movSpd = 4;

        this.isAttacking = false;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };

        this.currentState = CHAR_STATES.FLEEING;
    }

    draw(context) {
        switch (this.currentState) {
            case CHAR_STATES.FORWARD:
                context.fillStyle = `rgb(
                    200,
                    20,
                    200)`;
                break;
            case CHAR_STATES.FLEEING:
                context.fillStyle = `rgb(
                    200,
                    200,
                    0)`;

                break;
            case CHAR_STATES.IDLE:
                context.fillStyle = `rgb(
                    200,
                    200,
                    200)`;
                break;
        }
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Steph extends Guardian {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 80;
        this.currHealth = this.maxHealth;
        this.atk = 4;
        this.atkSpd = 2000;
        this.atkRange = 700;
        this.movSpd = 2;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
    }

    attack() {
        this.isAttacking = true;
        new Spear(this.position.x, this.position.y);
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
    }

    draw(context) {
        context.fillStyle = 'LightSkyBlue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Duncan extends Guardian {
    constructor(x, y) {
        super();
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

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };
    }

    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance / this.knockBackResistance;
        } else if (
            !this.isKnockedBack &&
            !this.isStunned &&
            this.target &&
            this.position.x < this.positionXLimit &&
            this.checkTargetInRange() == false
        ) {
            this.position.x += this.movSpd;
        }
    }

    draw(context) {
        context.fillStyle = 'purple';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            context.fillRect(
                this.atkBox.position.x,
                this.atkBox.position.y,
                this.atkBox.width,
                this.atkBox.height
            );
        }
    }
}

class Alex extends Guardian {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.atk = 10;
        this.atkSpd = 3400;
        this.atkRange = 300;
        this.movSpd = 3;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 60,
        };
    }

    draw(context) {
        this.atkBox.position.x = this.position.x;
        this.atkBox.position.y = this.position.y;
        context.fillStyle = 'yellow';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (this.isAttacking) {
            context.fillRect(
                this.atkBox.position.x,
                this.atkBox.position.y,
                this.atkBox.width,
                this.atkBox.height
            );
        }
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
        this.atk = 'Stunned';
        this.movSpd = 15;
        this.width = 60;
        this.height = 590;
        this.stunDuration = 3000;
    }

    updatePosition() {
        this.position.y += this.movSpd;
    }

    draw(context) {
        context.fillStyle = 'orange';
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
        context.fillStyle = 'pink';
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
        context.fillStyle = 'plum';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export { Character, Lanxe, Robbie, Duncan, Steph, James, Alex, Spear, Lightning, Explosion };
