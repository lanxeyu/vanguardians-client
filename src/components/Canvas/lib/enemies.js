import { addToGroup, removeFromGroup, allSprites, guardians, enemies, van } from "./groups";
import { Character } from "./guardians";

// --------------------  ENEMY CLASSES  -------------------------
class Enemy extends Character {
    constructor() {
        super();
        addToGroup(this, enemies);
    }

    // Default target for Enemies if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(guardians, "enemy");
    }

    // Default movement for Enemies if not overriden in the subclass
    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance;
        } else if (
            !this.isKnockedBack &&
            !this.isStunned &&
            this.target &&
            !this.checkTargetInRange()
        ) {
            this.position.x -= this.movSpd;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 5);
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

    update() {
        if (this.currHealth <= 0) {
            van[0].currExp += this.expGrant;
            van[0].score += this.expGrant;
            van[0].enemiesKilled += 1;
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, enemies);
        }
        this.updateTarget();
        this.updatePosition();
        this.updateAttacking();
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 50;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 2000;
        this.atkRange = 100;
        this.movSpd = 4;
        this.expGrant = 4;

        this.knockBackStrength = -7;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 100,
        }
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y
        context.fillStyle = "red"
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


class Goblin extends Enemy {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 80;
        this.maxHealth = 10;
        this.currHealth = this.maxHealth;
        this.atk = 2;
        this.atkSpd = 1000;
        this.atkRange = 100;
        this.movSpd = 6;
        this.expGrant = 1;

        this.knockBackStrength = 0;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 100,        
        }
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y
        context.fillStyle = "green"
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

class Demon extends Enemy {
    constructor(x, y) {
        super();
        this.position = { x, y };
        this.width = 70;
        this.height = 70;
        this.maxHealth = 50;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 2000;
        this.atkRange = 100;
        this.movSpd = 3;
        this.expGrant = 7;

        this.knockBackStrength = 0;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 120,
        };

        // Constant target
        this.target = van[0];
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3;
        this.atkBox.position.y = this.position.y + 50;
        context.fillStyle = "brown";
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

    // No need to update target as it is constantly the van
    updateTarget() {}
}

class Troll extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 200
        this.maxHealth = 200
        this.currHealth = this.maxHealth
        this.atk = 20
        this.atkSpd = 4000
        this.atkRange = 100
        this.movSpd = 2
        this.expGrant = 50

        this.knockBackStrength = -60
        this.knockBackResistance = 5

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.atkRange,
            height: 50,
        }
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y
        context.fillStyle = "maroon"
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

class Mushroom extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 1000
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 2000
        this.atkRange = 200
        this.movSpd = 2
        this.expGrant = 4

        this.knockBackStrength = -7

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.atkRange,
            height: 50,
        }

        this.isJumping = false
        this.jumpHeight = 100
        this.jumpSpeed = 5
        this.gravity = 0.2
        this.initialY = y;      // Store the initial Y position for jumping

    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y + 50
        context.fillStyle = "hotpink"
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

    updateTarget() {
        this.target = this.findRandomTarget(guardians, "enemy")
    }

    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance / this.knockBackResistance;
        } else if (!this.isKnockedBack && !this.isStunned && this.target && !this.checkTargetInRange()) {
            // If the target is out of range and the Mushroom is not jumping, start jumping towards the target
            if (!this.isJumping) {
                this.startJump()
            }
        }
    
        if (this.isJumping) {
            // Update the X position to move towards the target
            if (this.target) {
                const targetX = this.target.position.x
                const direction = Math.sign(targetX - this.position.x)
                this.position.x += direction * this.movSpd
            }
    
            // Update the Y position for jumping
            this.position.y -= this.jumpSpeed
            this.jumpSpeed -= this.gravity
    
            // Check if the Mushroom has reached the ground
            if (this.position.y >= this.initialY) {
                this.position.y = this.initialY
                this.isJumping = false
            }
        }
    }
    
    attack() {
        if (!this.isAttacking && !this.isJumping) {
            this.startJump()
        }
    
        this.isAttacking = true
    
        setTimeout(() => {
            this.isAttacking = false
        }, 5)
    }
    
    startJump() {
        if (!this.isJumping) {
            this.isJumping = true
            this.jumpSpeed = this.jumpHeight * 0.1
        }
    }
}

export { Skeleton, Goblin, Demon, Troll, Mushroom }


