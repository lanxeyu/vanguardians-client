import { addToGroup, allSprites, guardians, van, removeFromGroup } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(x, y, imageSrc, scale = 1, framesMax = 1) {
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
        addToGroup(this, allSprites);
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

class Van extends Sprite {
    constructor(x, y, imageSrc, scale = 1) {
        super(x, y, imageSrc, scale);
        addToGroup(this, guardians);
        addToGroup(this, van);
        this.position = { x, y };
        this.width = 180;
        this.height = 150;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.healthBarHeight = 8;
        this.healthBarWidth = 70;
        this.exp;
        this.lvl;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }

    drawHealthbars(context) {
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x + 50,
            this.position.y - 25,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            // Guardian knocked-out logic to be implemented
            removeFromGroup(this, allSprites);
            removeFromGroup(this, guardians);
            removeFromGroup(this, van);
            // Game over logic
        }
    }

    getKnockedBack() {}
    getStunned() {}
}

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

export { Sprite, Character, CHAR_STATES, CHAR_MODES, Van };
