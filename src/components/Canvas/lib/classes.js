import { addToAllSprites, addToCharacters, addToEnemies, removeFromAllSprites } from "./groups"

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){
        this.isAlive = true

        // Add created Sprite into allSprites group
        addToAllSprites(this)
    }

    // Methods that affect all sprites go here

    updateAnimation() {

    }

    update() {
        if (!this.isAlive) {
            removeFromAllSprites(this)
        }
        this.updatePosition()
        this.updateAnimation()
    }

}


// --------------------  CHARACTER CLASSES  ------------------------- 
class Character extends Sprite {
    constructor() {
        super()

        // Add created Character into characters group
        addToCharacters(this)
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
        this.movSpd = 4
    }
    
    updatePosition() {
        if (this.position.x <= 1200)
            this.position.x += this.movSpd

    }

    draw(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }

}


// --------------------  ENEMY CLASSES  ------------------------- 
class Enemy extends Sprite {
    constructor() {
        super()

        // Add created Enemy into enemies group
        addToEnemies(this)
    }

    // Methods that affect all enemies go here
    
    updatePosition() {
        if (this.position.x >= 200)
            this.position.x -= this.movSpd
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
        this.movSpd = 2

    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Lanxe, Skeleton };
