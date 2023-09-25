// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){
        this.is_alive = true

    }

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
    }
}


class Lanxe extends Character {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.move_spd = 4
    }
    
    updatePosition() {
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
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.move_spd = 2

    }

    updatePosition() {
        this.position.x -= this.move_spd
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Lanxe, Skeleton };
