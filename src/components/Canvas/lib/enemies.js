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
            this.position.x += this.knockBackDistance
        }
        else if (!this.isKnockedBack && !this.isStunned && this.target && !this.checkTargetInRange()) {
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
            van[0].currExp += this.expGrant
            van[0].score += this.expGrant
            van[0].enemiesKilled += 1
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, enemies);
        }
        this.updateTarget()
        this.updatePosition()
        this.updateAttacking()
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 50
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 2000
        this.atkRange = 100
        this.movSpd = 4
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
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y + 50
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
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 80
        this.maxHealth = 10
        this.currHealth = this.maxHealth
        this.atk = 2
        this.atkSpd = 1000
        this.atkRange = 100
        this.movSpd = 6
        this.expGrant = 1

        this.knockBackStrength = 0

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
        console.log(this.healthBarHeight)
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y + 50
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
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 70
        this.maxHealth = 50
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 2000
        this.atkRange = 100
        this.movSpd = 3
        this.expGrant = 7

        this.knockBackStrength = 0

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.atkRange,
            height: 120,
        }

        // Constant target
        this.target = van[0];
    }

    draw(context) {
        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
        this.atkBox.position.y = this.position.y + 50
        context.fillStyle = "brown"
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



export { Skeleton, Goblin, Demon }
