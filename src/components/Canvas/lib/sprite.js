import { addToGroup, allSprites } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){
    addToGroup(this, allSprites)
    }

    update(context) {
        this.draw(context)
    }
}

class Background extends Sprite {
    constructor(x, y, imageSrc){
        super()
        this.position = {x,y}
        this.width = 1366
        this.height = 768
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = 1
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width * this.scale, this.height * this.scale)
    }


}

class Layer extends Sprite {
    constructor(x, y, width, height, image, movSpd) {
        super()
        this.position = {x, y}
        this.width = width;
        this.height = height;
        this.x2 = this.width;

        this.image = image;
        this.movSpd = movSpd;
        this.isMoving = false
        this.isMovingRight = false
    }

    update(context) {
        if (this.isMoving) {
            if (this.position.x < - this.width) {
                this.position.x = this.width - this.movSpd + this.x2;
            }
            else {
                this.position.x -= this.movSpd;
            }

            if (this.x2 < -this.width) {
                this.x2 = this.width - this.movSpd + this.x2;
            }
            else {
                this.x2 -= this.movSpd;
            }
        }
        
        this.draw(context)
    }

    draw(context) {
        context.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
    }

    setIsMoving(isMoving) {
        this.isMoving = isMoving;
    }

}

// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor(){
        super()
        this.isAlive = true
        this.target = null

        this.isKnockedBack = false
        this.isStunned = false

        this.healthBarHeight = 8
        this.healthBarWidth = 70
    }

    getKnockedBack(distance) {
        this.isKnockedBack = true
        this.knockBackDistance = distance
        setTimeout(() => {
            this.isKnockedBack = false;
            if (!this.isStunned) {
                this.getStunned(200)
            }
        }, 150);
    }

    getStunned(duration) {
        this.isStunned = true
        setTimeout(() => {
            this.isStunned = false;
        }, duration);

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

    findRandomTarget(group, type) {
        const validTargets = [];
    
        for (const sprite of group) {
            if (
                (type === "guardian" && sprite.position.x > this.position.x) ||
                (type === "enemy" && sprite.position.x < this.position.x)
            ) {
                validTargets.push(sprite);
            }
        }
    
        if (validTargets.length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * validTargets.length);
        return validTargets[randomIndex];
    }

    checkTargetInRange() {
        if (this.target)
            return !(Math.abs(this.target.position.x - this.position.x) > this.atkRange)
    }

    drawHealthbars(context) {
        context.fillStyle = 'grey';
        context.fillRect(this.position.x, this.position.y - 25, this.healthBarWidth, this.healthBarHeight)

        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y - 25, this.currHealth/this.maxHealth * this.healthBarWidth, this.healthBarHeight)
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



export { Sprite, Background, Character, CHAR_STATES, CHAR_MODES}