import { addToGroup, removeFromGroup, allSprites, guardians, enemies } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){
        addToGroup(this, allSprites)
        this.isAlive = true
        this.target = null
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

    checkTargetInRange() {
        return !(Math.abs(this.target.position.x - this.position.x) > this.atkRange)
    }
}

// --------------------  GUARDIAN CLASSES  -------------------------
class Guardian extends Sprite {
    constructor() {
        super();
        addToGroup(this, guardians);
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 50);
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, "guardian");
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.target && this.checkTargetInRange() == false) {
            this.position.x += this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            // Guardian knocked-out logic to be implemented
        }
        this.updateTarget();
        this.updatePosition();

        if (this.target && this.checkTargetInRange() && this.attackCooldown <= 0) {
            // Call the attack method
            this.attack();
            
            // Set the attack cooldown based on this.atkSpd
            this.attackCooldown = this.atkSpd;
            
            // Start a timer to reset isAttacking after a delay
            this.attackTimer = setTimeout(() => {
              this.isAttacking = false;
            }, 50); // Adjust the delay as needed
        }
      
        // Decrement the attack cooldown
        if (this.attackCooldown > 0) {
        this.attackCooldown -= 20; // 20 milliseconds per frame (adjust as needed)
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
        this.atkSpd = 1000
        this.atkRange = 200
        this.movSpd = 4
        this.attackTimer = null;
        this.attackCooldown = 0;

        this.isAttacking = false;
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50,
        };
    }

    draw(context) {
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
        this.atkSpd = 600;
        this.atkRange = 400;
        this.movSpd = 3;
    }
    
    draw(context) {
        context.fillStyle = "green";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
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
        this.atk = 4;
        this.atkSpd = 1000;
        this.atkRange = 700;
        this.movSpd = 2;

        new Projectile(this.position);
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
        this.atkSpd = 4000;
        this.atkRange = 150;
        this.movSpd = 4.5;
        this.attackTimer = null;
        this.attackCooldown = 0;

        this.isAttacking = false;
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

// --------------------  ENEMY CLASSES  -------------------------
class Enemy extends Sprite {
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
        if (this.target && this.target && this.checkTargetInRange() == false) {
            this.position.x -= this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, enemies);
        }
        this.updateTarget();
        this.updatePosition();
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 150
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 1500
        this.atkRange = 100
        this.movSpd = 4
    }

    draw(context) {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 
class Projectile extends Sprite {
    constructor(x, y){
        super()    
        this.position= {x, y}
        this.movSpd = 5
        this.width = 100
        this.height = 5
    }

    draw(context) {    
        context.fillStyle = 'plum'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    updatePosition() {
        this.position.x += this.movSpd
    }

    update() {
        this.updatePosition()
    }
}


export { Robbie, Lanxe, Duncan, Steph, Skeleton, Projectile }
