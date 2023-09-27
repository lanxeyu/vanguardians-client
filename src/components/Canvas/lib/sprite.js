import { addToGroup, allSprites } from "./groups";

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
        return !(Math.abs(this.target.position.x - this.position.x) > this.atkRange)
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



export { Sprite, CHAR_STATES, CHAR_MODES}