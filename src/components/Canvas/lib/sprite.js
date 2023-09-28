import { addToGroup, allSprites } from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(){

    }

    // Animation methods go here
}


// --------------------  CHARACTER CLASS - Parent of Guardian & Enemy classes  --------------------
class Character extends Sprite {
    constructor(){
        super()
        addToGroup(this, allSprites)
        this.isAlive = true
        this.target = null

        this.healthBarHeight = 8
        this.healthBarWidth = 70
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



export { Character, Sprite, CHAR_STATES, CHAR_MODES}