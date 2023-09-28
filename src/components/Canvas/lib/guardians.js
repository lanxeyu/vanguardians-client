import {
    addToGroup,
    removeFromGroup,
    allSprites,
    guardians,
    enemies,
    guardianProjectiles,
} from "./groups";
import { Character, CHAR_STATES, CHAR_MODES } from "./sprite";

// --------------------  GUARDIAN CLASSES  -------------------------
class Guardian extends Character {
    constructor() {
        super();
        addToGroup(this, guardians); // Add this Guardian to the guardians group.

        this.currentState = CHAR_STATES.IDLE; // Set the initial state to IDLE.
        this.currentMode = CHAR_MODES.MODE_1; // Set the initial mode to MODE_1.
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, "guardian");
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance;
        } else if (
            !this.isKnockedBack &&
            !this.isStunned &&
            this.target &&
            this.position.x < 900 &&
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

            // Set a timer to reset the character's attacking state after a short duration (50 milliseconds).
            // This ensures that the character doesn't keep attacking continuously.
            this.atkTimer = setTimeout(() => {
                this.isAttacking = false;
            }, 50);
        }
        // Decrease the attack cooldown timer, allowing the character to attack again when it reaches 0.
        if (this.atkCooldown > 0) {
            // Decrease the cooldown timer by a fixed interval (16 milliseconds).
            this.atkCooldown -= 16;
        }
    }

    update(context) {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            // Guardian knocked-out logic to be implemented
            removeFromGroup(this, allSprites);
            removeFromGroup(this, guardians);
        }
        this.updateTarget();
        this.updatePosition();
        this.updateAttacking();
        this.draw(context);
        this.drawHealthbars(context);
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
        this.atkSpd = 2000;
        this.atkRange = 200;
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
        context.fillStyle = "blue";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Draw the attack box when the Guardian is attacking.
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
        this.atkSpd = 2000;
        this.atkRange = 600;
        this.movSpd = 3;

        this.stunDuration = 1000;

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
        context.fillStyle = "green";
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
        context.fillStyle = "LightSkyBlue";
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
            this.position.x < 900 &&
            this.checkTargetInRange() == false
        ) {
            this.position.x += this.movSpd;
        }
    }

    draw(context) {
        context.fillStyle = "purple";
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
class Projectile extends Character {
    constructor() {
        super();
        addToGroup(this, guardianProjectiles);
    }

    updatePosition() {
        // Move the projectile horizontally based on its movement speed (movSpd).
        this.position.x += this.movSpd;
    }

    update(context) {
        this.updatePosition();
        this.draw(context);
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

        this.knockBackStrength = 30;
    }

    draw(context) {
        context.fillStyle = "plum";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export { Lanxe, Robbie, Duncan, Steph, James, Spear };
