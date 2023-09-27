import { addToGroup, removeFromGroup, allSprites, guardians, enemies } from "./groups";
import { Sprite } from "./sprite";


// --------------------  ENEMY CLASSES  -------------------------
class Enemy extends Sprite {
    constructor() {
        super();
        addToGroup(this, enemies);
    }

    // Default target for Enemies if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(guardians, "enemy");
    }

    // Default movement for Enemies if not overriden in the subclass
    updatePosition() {
        if (this.target && this.target && this.checkTargetInRange() == false) {
            this.position.x -= this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, enemies);
        }
        this.updateTarget();
        this.updatePosition();
    }
}

class Skeleton extends Enemy {
    constructor(x, y) {
        super()
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 150
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 1500
        this.atkRange = 100
        this.movSpd = 4
    }

    draw(context) {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export { Skeleton }