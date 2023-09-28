import { addToGroup, removeFromGroup, allSprites, guardians, enemies, guardianProjectiles } from "./groups";
import { Sprite, CHAR_STATES, CHAR_MODES } from "./sprite";


// --------------------  GUARDIAN CLASSES  -------------------------
class Guardian extends Sprite {
    constructor() {
        super();
        addToGroup(this, guardians);

        this.currentState = CHAR_STATES.IDLE
        this.currentMode = CHAR_MODES.MODE_1
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, "guardian");
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.target && (this.position.x < 900) && (this.checkTargetInRange() == false)) {
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
        this.updateTarget()
        this.updatePosition()
        this.updateAttacking()
    }

    toggleModes() {
        switch(this.currentMode) {
            case CHAR_MODES.MODE_1:
                this.currentMode = CHAR_MODES.MODE_2
            break
            case CHAR_MODES.MODE_2:
                this.currentMode = CHAR_MODES.MODE_1
            break
            default:
                this.currentMode = CHAR_MODES.MODE_1
        }
    }
}

class Lanxe extends Guardian {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 100
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 2000
        this.atkRange = 200
        this.movSpd = 4

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
        this.atkBox.position.x = this.position.x
        this.atkBox.position.y = this.position.y
        context.fillStyle = "blue";
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
        this.atkSpd = 2000;
        this.atkRange = 400;
        this.movSpd = 3;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
    }

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
        super() 
        this.position = {x, y}
        this.width = 150
        this.height = 70
        this.maxHealth = 120
        this.currHealth = this.maxHealth
        this.atk = 4
        this.atkSpd = 800
        this.atkRange = 400
        this.movSpd = 4

        this.isAttacking = false
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50
        }

        this.currentState = CHAR_STATES.FLEEING
    }

    draw(context) {
        switch(this.currentState) {
            case CHAR_STATES.FORWARD:
                context.fillStyle = `rgb(
                    200,
                    20,
                    200)`
            break
            case CHAR_STATES.FLEEING:
                context.fillStyle = `rgb(
                    200,
                    200,
                    0)`
                
            break
            case CHAR_STATES.IDLE:
                context.fillStyle = `rgb(
                    200,
                    200,
                    200)`
            break
        }
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Steph extends Guardian {
    constructor(x, y) {
        super();
        this.position = {x, y};
        this.width = 70;
        this.height = 150;
        this.maxHealth = 80;
        this.currHealth = this.maxHealth;

        this.healthBarHeight= 8

        this.atk = 4;
        this.atkSpd = 2000;
        this.atkRange = 700;
        this.movSpd = 2;

        this.isAttacking = false;

        this.shootArrow();
    }

    shootArrow() {
        setInterval(() => {
            if (this.isAlive) {
                this.isAttacking = true
                new Spear(this.position.x, this.position.y);
            }
        }, this.atkSpd);
    }

    draw(context) {
        context.fillStyle = 'LightSkyBlue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.fillStyle = 'grey';
        context.fillRect(this.position.x, this.position.y - 15, this.width, this.healthBarHeight);

        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y - 15, this.currHealth/this.maxHealth * 100, this.healthBarHeight);
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
        this.atkSpd = 3300;
        this.atkRange = 150;
        this.movSpd = 4.5;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
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
class Projectile extends Sprite {
    constructor(){
        super();
    }

    updatePosition() {
        this.position.x += this.movSpd
    }

    update() {
        this.updatePosition()
    }
}

class Spear extends Projectile {
    constructor(x,y) {
        super()
        addToGroup(this, guardianProjectiles)
        this.position= {x, y}
        this.movSpd = 20
        this.width = 100
        this.height = 5
    }

    draw(context) {    
        context.fillStyle = 'plum'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export { Lanxe, Robbie, Duncan, Steph, James }
