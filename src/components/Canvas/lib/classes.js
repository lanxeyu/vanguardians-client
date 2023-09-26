import { addToGroup, removeFromGroup, allSprites, guardians, enemies } from "./groups"


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
    
            if ((type === 'guardian' && sprite.position.x > this.position.x) ||
                (type === 'enemy' && sprite.position.x < this.position.x)) {
                if (distance < nearestDistance) {
                    nearestTarget = sprite;
                    nearestDistance = distance;
                }
            }
        }
        return nearestTarget;
    }
}


// --------------------  GUARDIAN CLASSES  ------------------------- 
class Guardian extends Sprite {
    constructor() {
        super()
        addToGroup(this, guardians)
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, 'guardian' )
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.target) {
          // Calculate direction to target
          const direction = this.target.position.x - this.position.x;
      
            // Move towards target
            if (direction > this.atkRange) {
                this.position.x += this.movSpd;
            }
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive == false
            // Guardian knocked-out logic to be implemented
        }
        this.updateTarget()
        this.updatePosition()
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

        this.isAttacking = false
        this.atkBox = {
            position: this.position,
            width: this.atkRange,
            height: 50
        }
    }

    attack() {
        this.isAttacking = true
        this.isAttacking = false
    }
    
    draw(context) {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.fillRect(this.atkBox.position.x, this.atkBox.position.y, this.atkBox.width, this.atkBox.height)
    }

}

class Robbie extends Guardian {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 60
        this.currHealth = this.maxHealth
        this.atk = 3
        this.atkSpd = 600
        this.atkRange = 400
        this.movSpd = 3
    }

    draw(context) {
        context.fillStyle = 'green'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


// --------------------  ENEMY CLASSES  ------------------------- 
class Enemy extends Sprite {
    constructor() {
        super()
        addToGroup(this, enemies)
    }

    // Default target for Enemies if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(guardians, 'enemy')
    }

    // Default movement for Enemies if not overriden in the subclass
    updatePosition() {
        if (this.target) {
            // Calculate direction to target
            const direction = this.target.position.x - this.position.x;
        
            // Check if the direction is greater than the attack range
            if (Math.abs(direction) > this.atkRange) {
                // Move towards the target
                const moveAmount = Math.sign(direction) * this.movSpd;
                this.position.x += moveAmount;
            }
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive == false
            removeFromGroup(this, allSprites)
            removeFromGroup(this, enemies)
        }
        this.updateTarget()
        this.updatePosition()
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 20
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 1500
        this.atkRange = 100
        this.movSpd = 2
    }
    
    draw(context) {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Robbie, Lanxe, Skeleton }
