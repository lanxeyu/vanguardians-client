import { addToGroup, allSprites, guardians, van, removeFromGroup, background } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(x, y, imageSrc, scale = 1, framesMax = 1) {
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
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }
    update() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
}

class Background extends Sprite {
    constructor(x, y, imageSrc, scale = 1){
        super(x, y, imageSrc, scale)
        addToGroup(this, background)
    }
}

class Van extends Sprite {
    constructor(x, y, imageSrc, scale = 1) {
        super(x, y, imageSrc, scale);
        addToGroup(this, guardians);
        addToGroup(this, van);
        this.isAlive = true
        this.position = { x, y };
        this.width = 180;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.healthBarHeight = 8;
        this.healthBarWidth = 70;
        this.maxExp = 10;
        this.currExp = 0;
        this.lvl = 1;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }

    drawHealthbars(context) {
        // Healthbar
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 15,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 15,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
        
        // Expbar
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "white";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 25,
            (this.currExp / this.maxExp) * this.healthBarWidth,
            this.healthBarHeight
        );
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, guardians);
        }
        else if (this.currExp >= this.maxExp) {
            this.lvl += 1;
            this.currExp = 0;
            this.maxExp = 10 * (2 ** this.lvl)
        }

    }

    getKnockedBack() {}
    getStunned() {}
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
    constructor(x, y, imageSrc, scale = 1, framesMax = 1) {
        super(x, y, imageSrc, scale, framesMax);
        this.isAlive = true;
        this.target = null;

        this.isKnockedBack = false;
        this.isStunned = false;

        this.healthBarHeight = 8;
        this.healthBarWidth = 70;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
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

export { Sprite, Background, Van, Character, CHAR_STATES, CHAR_MODES };
