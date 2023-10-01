import { addToGroup, allSprites } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor() {
        addToGroup(this, allSprites);
    }

    update(context) {
        this.draw(context)
    }
}

class Background extends Sprite {
    constructor(x, y, imageSrc) {
        super();
        this.position = { x, y };
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;

        console.log(this.image)
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {}


}

class Layer extends Sprite {
    constructor(x, y, width, height, offsetX, offsetY, imageSrc, movSpd) {
        super()
        console.log(x)
        let posX = x + offsetX;
        let posY = y + offsetY;
        this.position = {x: posX, y: posY}
        this.width = width;
        this.height = height;
        this.x2 = this.width;

        
        this.movSpd = movSpd;
        this.isMoving = false
        this.isMovingRight = false

        this.image = new Image();
        this.image.src = imageSrc;
        
    }

    update() {
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
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y)
    }

    setIsMoving(isMoving) {
        this.isMoving = isMoving;
    }
}

class PortraitIcon extends Sprite {
    constructor(x, y, increment, imageSrc) {
        super();
        this.position = { x, y };
        this.increment = increment;
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = imageSrc;
        this.spacing = 20;

        console.log(this.image)
    }

    draw(context) {
        context.fillStyle = 'rgb(45,46,55)'
        context.fillRect(20 + this.increment * this.spacing , canvas.height - 168 - this.height - 30, this.width, this.height);
        context.lineWidth = 5;

        context.drawImage(this.image, this.position.x, this.position.y)

        context.strokeStyle = 'rgb(24,24,39)'
        context.strokeRect(20 + this.increment * this.spacing, canvas.height - 168 - this.height  - 30, this.width, this.height);
        
    }

    update() {}
} 

// --------------------  STATE MANAGERS -----------------------------

const CHAR_STATES = {
    IDLE: 0,
    FORWARD: 1,
    ATTACKING: 2,
    FLEEING: 3,
};

const CHAR_MODES = {
    MODE_1: 0,
    MODE_2: 1,
};

// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor() {
        super();
        this.isAlive = true;
        this.target = null;

        this.isKnockedBack = false;
        this.isStunned = false;

        this.healthBarHeight = 8;
        this.healthBarWidth = 70;
    }

    getKnockedBack(distance) {
        this.isKnockedBack = true;
        this.knockBackDistance = distance;
        setTimeout(() => {
            this.isKnockedBack = false;
            if (!this.isStunned) {
                this.getStunned(200);
            }
        }, 150);
    }

    getStunned(duration) {
        this.isStunned = true;
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
            return !(Math.abs(this.target.position.x - this.position.x) > this.atkRange);
    }

    drawHealthbars(context) {
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x,
            this.position.y - 25,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
    }
}

export { Sprite, Background, Layer, Character, PortraitIcon, CHAR_STATES, CHAR_MODES };
