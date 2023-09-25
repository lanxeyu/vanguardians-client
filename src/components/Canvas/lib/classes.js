import { addToGroup, removeFromGroup, allSprites, characters, enemies } from "./groups"

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
    
            if ((type === 'character' && sprite.position.x > this.position.x) ||
                (type === 'enemy' && sprite.position.x < this.position.x)) {
                if (distance < nearestDistance) {
                    nearestTarget = sprite;
                    nearestDistance = distance;
                }
            }
        }
        return nearestTarget;
    }
    
    update() {
        if (!this.isAlive) {
            removeFromGroup(this, allSprites)
        }
        this.updateTarget()
        this.updatePosition()
    }
}


// --------------------  CHARACTER CLASSES  ------------------------- 
class Character extends Sprite {
    constructor() {
        super()
        addToGroup(this, characters)
    }

    // Methods that affect all player characters go here
}

class Lanxe extends Character {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.maxHealth = 100
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 1000
        this.atkRange = 200
        this.movSpd = 4
    }
    
    updateTarget() {
        this.target = this.findNearestTarget(enemies, 'character' )
    }

    updatePosition() {
        // Calculate direction to target
        const direction = this.target.position.x - this.position.x

        // Move towards target
        if (direction > this.atkRange) {
            this.position.x += this.movSpd
        } 

    }

    draw(context) {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }

}


// --------------------  ENEMY CLASSES  ------------------------- 
class Enemy extends Sprite {
    constructor() {
        super()
        addToGroup(this, enemies)
    }

    
    updatePosition() {
        // Calculate direction to target
        const direction = this.target.position.x - this.position.x

        // Move towards target
        if (direction < -this.atkRange) {
            this.position.x -= this.movSpd
        }

    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.maxHealth = 20
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 1500
        this.atkRange = 100
        this.movSpd = 2
    }
    
    updateTarget() {
        this.target = this.findNearestTarget(characters, 'enemy')
    }

    draw(context) {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Lanxe, Skeleton }
