// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){

    }
    
    updatePosition() {

    }

    updateAnimation() {

    }

    update() {
        this.updatePosition
        this.updateAnimation
    }
}

// --------------------  CHARACTER CLASSES  ------------------------- 

class Character extends Sprite {
    constructor() {
        super()
        this.is_alive = true
    }
}


class Lanxe extends Character {
    constructor(x, y) {
        super()
        this.position = {x, y}
    }
    
    updatePosition() {


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
        this.is_alive = true
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}

    }

    updatePosition() {

    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 70, 150)
    }
}

// --------------------  PROJECTILE CLASSES  ------------------------- 




export { Lanxe, Skeleton };
