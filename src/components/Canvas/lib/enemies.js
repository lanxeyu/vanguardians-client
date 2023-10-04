import { addToGroup, removeFromGroup, allSprites, guardians, enemies, van } from "./groups";
import { Character } from "./guardians";
import { incrementTotalKills, incrementScoreByValue } from "./stattracker";

// --------------------  ENEMY CLASSES  -------------------------
// (x, y, imageSrc, scale, framesMax, offset, sprites)

class Enemy extends Character {
    constructor(
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites
    ) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        addToGroup(this, enemies);
    }

    // Default target for Enemies if not overriden in the subclass
    updateTarget() {
        this.target = this.findNearestTarget(guardians, "enemy");
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack.image && 
            this.framesCurrent < this.sprites.attack.framesMax - 1) {
            return;
        } 
        else if (this.image === this.sprites.attack2?.image && 
                   this.sprites.attack2 &&
                   this.framesCurrent < this.sprites.attack2.framesMax - 1) {
            return;
        }
        else if (this.image === this.sprites.hit.image && 
            this.framesCurrent < this.sprites.hit.framesMax -1) {
            return;
        }

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                }
                break;
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'attack2':
                if (this.image !== this.sprites.attack2.image){
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'hit':
                if (this.image !== this.sprites.hit.image){
                    this.image = this.sprites.hit.image
                    this.framesMax = this.sprites.hit.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'defend':
                if (this.image !== this.sprites.defend.image){
                    this.image = this.sprites.defend.image
                    this.framesMax = this.sprites.defend.framesMax
                }
                break;
        }
    }
    // Default movement for Enemies if not overriden in the subclass
    updatePosition() {
        this.switchSprite('idle')

        this.atkBox.position.x = this.position.x + this.width - this.atkRange - 30
        this.atkBox.position.y = this.position.y

        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance;
        } else if (
            !this.isKnockedBack &&
            !this.isStunned &&
            this.target &&
            !this.checkTargetInRange()
        ) {
            this.switchSprite('run')
            this.position.x -= this.movSpd;
        }
    }

    update() {
        if (this.currHealth <= 0) {
            van[0].currExp += this.expGrant;
            van[0].score += this.expGrant;
            van[0].enemiesKilled += 1;
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, enemies);
            incrementTotalKills();
            console.log(this.name);
            switch(this.name) {
                case "skeleton":
                    console.log('incrementing skeleton');
                    incrementScoreByValue(100);
                break;
                case "goblin":
                    incrementScoreByValue(50);
                break;
                case "demon":
                    incrementScoreByValue(250);
                break;
                case "troll":
                    incrementScoreByValue(500);
                break;
                default:


            }
        }
        this.updateTarget();
        this.updatePosition();
        this.updateAttacking();

        this.updateAnimation();
    }
}

class Skeleton extends Enemy {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "skeleton";
        this.position = { x, y };
        this.width = 70;
        this.height = 150;
        this.maxHealth = 50;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 2000;
        this.atkRange = 100;
        this.movSpd = 2;
        this.expGrant = 4;

        this.knockBackStrength = -7;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 100,
        }
    }
}

class Goblin extends Enemy {
        
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "goblin"
        this.position = { x, y };
        this.width = 70;
        this.height = 100;
        this.maxHealth = 10;
        this.currHealth = this.maxHealth;
        this.atk = 2;
        this.atkSpd = 1000;
        this.atkRange = 100;
        this.movSpd = 4;
        this.expGrant = 1;

        this.knockBackStrength = 0;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x + this.width - this.atkRange - 30,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 100,        
        }
    }
}

class Demon extends Enemy {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites);
        this.name = "demon"
        this.position = { x, y };
        this.width = 70;
        this.height = 70;
        this.maxHealth = 50;
        this.currHealth = this.maxHealth;
        this.atk = 5;
        this.atkSpd = 2000;
        this.atkRange = 100;
        this.movSpd = 1.5;
        this.expGrant = 7;

        this.knockBackStrength = 0;

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x + this.width - this.atkRange - 30,
                y: this.position.y,
            },
            width: this.atkRange,
            height: 120,
        };

        this.target = van[0];
    }

    // No need to update target as it is constantly the van
    updateTarget() {}
}

class Troll extends Enemy {
    constructor(x, y, imageSrc, scale, framesMax, offset, sprites) {
        super(x, y, imageSrc, scale, framesMax, offset, sprites)
        this.name = "troll"
        this.position = {x, y}
        this.width = 70
        this.height = 200
        this.maxHealth = 300
        this.currHealth = this.maxHealth
        this.atk = 20
        this.atkSpd = 4000
        this.atkRange = 100
        this.movSpd = 1
        this.expGrant = 50

        this.knockBackStrength = -60
        this.knockBackResistance = 10

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x + this.width - this.atkRange - 30,
                y: this.position.y
            },
            width: 200,
            height: 100,
        }
    }
}

class Mushroom extends Enemy {
    constructor(x, y, imageSrc, scale = 2.6, framesMax = 4, offset = { x: 158, y: 143 }) {
        super(x, y, imageSrc, scale, framesMax, offset)
        this.position = {x, y}
        this.width = 70
        this.height = 150
        this.maxHealth = 50
        this.currHealth = this.maxHealth
        this.atk = 5
        this.atkSpd = 2000
        this.atkRange = 200
        this.movSpd = 2
        this.expGrant = 4

        this.knockBackStrength = -7

        this.isAttacking = false;
        this.atkTimer = null;
        this.atkCooldown = 0;
        this.atkBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.atkRange,
            height: 50,
        }

        this.isJumping = false
        this.jumpHeight = 100
        this.jumpSpeed = 5
        this.gravity = 0.2
        this.initialY = y;
    }

    // draw(context) {
    //     this.atkBox.position.x = this.position.x + this.width - this.atkRange - 3
    //     this.atkBox.position.y = this.position.y + 50
    //     context.fillStyle = "hotpink"
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);

    //     if (this.isAttacking) {
    //         context.fillRect(
    //             this.atkBox.position.x,
    //             this.atkBox.position.y,
    //             this.atkBox.width,
    //             this.atkBox.height
    //         );
    //     }
    // }

    updatePosition() {
        if (this.isKnockedBack) {
            this.position.x += this.knockBackDistance / this.knockBackResistance;
        } else if (!this.isKnockedBack && !this.isStunned && this.target && !this.checkTargetInRange()) {
            // If the target is out of range and the Mushroom is not jumping, start jumping towards the target
            if (!this.isJumping) {
                this.startJump()
            }
        }
    
        if (this.isJumping) {
            // Update the X position to move towards the target
            if (this.target) {
                const targetX = this.target.position.x
                const direction = Math.sign(targetX - this.position.x)
                this.position.x += direction * this.movSpd
            }
    
            // Update the Y position for jumping
            this.position.y -= this.jumpSpeed
            this.jumpSpeed -= this.gravity
    
            // Check if the Mushroom has reached the ground
            if (this.position.y >= this.initialY) {
                this.position.y = this.initialY
                this.isJumping = false
            }
        }
    }
    
    attack() {
        if (!this.isAttacking && !this.isJumping) {
            this.startJump()
        }
    
        this.isAttacking = true
    
        setTimeout(() => {
            this.isAttacking = false
        }, 5)
    }
    
    startJump() {
        if (!this.isJumping) {
            this.isJumping = true
            this.jumpSpeed = this.jumpHeight * 0.1
        }
    }
}

export { Skeleton, Goblin, Demon, Troll, Mushroom }


