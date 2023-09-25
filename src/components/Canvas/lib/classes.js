import { allSprites, characters, enemies } from "./groups"

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){
        this.is_alive = true

        // Add created Sprite into allSprites group
        allSprites.push(this)
    }

    // Methods that affect all sprites go here

    updateAnimation() {

    }

    update() {
        this.updatePosition()
        this.updateAnimation()
    }

}


// --------------------  CHARACTER CLASSES  ------------------------- 
class Character extends Sprite {
    constructor() {
        super()

        // Add created Character into characters group
        characters.push(this)
    }

    // Methods that affect all player characters go here
}


class Lanxe extends Character {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.max_hp = 100
        this.curr_hp = this.max_hp
        this.attack = 5
        this.attack_spd = 1000
        this.move_spd = 4
    }
    
    updatePosition() {
        if (this.position.x <= 1200)
            this.position.x += this.move_spd

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
        enemies.push(this)
    }

    // Methods that affect all enemies go here
    
    updatePosition() {
        if (this.position.x >= 200)
            this.position.x -= this.move_spd
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.max_hp = 20
        this.curr_hp = this.max_hp
        this.attack = 5
        this.attack_spd = 1500
        this.move_spd = 2

    }



    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Lanxe, Skeleton };
