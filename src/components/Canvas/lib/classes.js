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
    
    update() {
        if (!this.isAlive) {
            removeFromGroup(this, allSprites)
            removeFromGroup(this, characters)
            removeFromGroup(this, enemies)
        }
        this.updateTarget()
        this.updatePosition()
    }
}

// --------------------  STATE MANAGERS -----------------------------

const CHAR_STATES = {
    IDLE: 0,
    FORWARD: 1,
    ATTACKING: 2,
    FLEEING: 3
}

const CHAR_MODES = {
    MODE_1: 0,
    MODE_2: 1
}

// --------------------  GUARDIAN CLASSES  ------------------------- 
class Guardian extends Sprite {
    constructor() {
        super()
        addToGroup(this, guardians)

        this.currentState = CHAR_STATES.IDLE
        this.currentMode = CHAR_MODES.MODE_1
    }

    // Default target for Guardians if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(enemies, 'guardian' )
    }

    // Default movement for Guardians if not overriden in the subclass
    updatePosition() {
        if (this.target && (this.checkTargetInRange() == false)) {
            this.position.x += this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false
            // Guardian knocked-out logic to be implemented
        }
        this.updateTarget()
        this.updatePosition()

        if (this.target && this.checkTargetInRange()) {
            this.attack()
        }
        console.log(this.isAttacking)
    
        // Calculate direction to target
        const direction = Math.abs(this.target.position.x - this.position.x)

        // Home position (temporary) - retreat point

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
        this.atkSpd = 1000
        this.atkRange = 200
        this.movSpd = 4
    }
    
    draw(context) {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.isAttacking) {
            context.fillRect(this.atkBox.position.x, this.atkBox.position.y, this.atkBox.width, this.atkBox.height)
        }

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

        this.currentState = CHAR_STATES.FORWARD
    }

    draw(context) {
        context.fillStyle = 'green'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class James extends Guardian {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.maxHealth = 120
        this.currHealth = this.maxHealth
        this.atk = 4
        this.atkSpd = 800
        this.atkRange = 50
        this.movSpd = 4

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
        context.fillRect(this.position.x, this.position.y, 150, 50)
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
        if (this.target && this.target && (this.checkTargetInRange() == false)) {
            this.position.x -= this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false
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
        this.height = 150
        this.width = 70
    }
    
    draw(context) {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 



// -------------------- DAMAGE NUMBERS CLASS (Trial) -------------------------

class DamageNumber extends Sprite {
    constructor(target, x, y) {
        super()
        this.offsetY = 20
        this.offsetX = 0
        let newPointY = y - this.offsetY
        let newPointX = x - this.offsetX
        this.position = { x: newPointX, y: newPointY }
        this.movSpd = 1
        this.lifeTime = 1000

        this.endTime = new Date()
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000)
        
        this.elapsedTime = 0
        this.text = '9999'

        this.alpha = 1

        this.target = target

        console.log(x, y)
        console.log(newPointX, newPointY)
        console.log(this.position)
        // setTimeout(() => {

        // }, this.lifeTime * 1000)
        console.log(this.lifeTime - (this.endTime - new Date()))
    }

    update() {
        let newPointY = this.position.y - this.movSpd
        let newPointX = this.position.x
        // if (this.target) newPointX = this.target.position.x + (this.target.width / 2)

        this.position = { x: newPointX, y:  newPointY }

        if (this.elapsedTime >= this.lifeTime) {
            this.elapsedTime = this.lifeTime
        }
        else {
            this.elapsedTime =  this.lifeTime - (this.endTime - new Date())
        }
        
        if (this.alpha <= 0) {
            this.alpha = 0
        }
        else {
            this.alpha = 1 - (Math.round((this.elapsedTime / this.lifeTime) * 100) / 100)
        }
        
    }

    draw(context) {
        context.fillStyle = 'rgba(255, 255, 0, ' + this.alpha +')'
        context.font = "18px Arial";
        // context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y)
    }
}


export { Robbie, Lanxe, James, Skeleton, DamageNumber }
