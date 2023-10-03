import { addToGroup, allSprites, guardians, van, removeFromGroup } from "./groups";
import { Sprite } from "./sprite";
import { spawnGuardians } from "./spawner";
import { restoreAllHealth } from "./utils";
import { LevelUp } from "./utilclasses";

class Van extends Sprite {
    constructor(x, y, imageSrc, scale = 1.0) {
        super(x, y, imageSrc, scale);
        addToGroup(this, guardians);
        addToGroup(this, van);
        this.isAlive = true;
        this.position = { x, y };
        this.width = 180;
        this.height = 150;
        this.damageResistance = 1;
        this.maxHealth = 100;
        this.currHealth = this.maxHealth;
        this.healthBarHeight = 8;
        this.healthBarWidth = 200;
        this.maxExp = 10;
        this.currExp = 0;
        this.lvl = 1;
        this.score = 0;
        this.enemiesKilled = 0;

        this.name = "van"
    }

    // draw(context) {
    //     super.draw(context)
    //     context.drawImage(this.image, this.position.x, this.position.y);
    //     context.fillStyle = 'purple'
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // }

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

    getDamaged(damage) {
        this.currHealth -= damage;
    }

    getKnockedBack() {}
    getStunned() {}

    update() {
        if (this.currHealth <= 0) {
            this.isAlive = false;
            removeFromGroup(this, allSprites);
            removeFromGroup(this, guardians);
        } else if (this.currExp >= this.maxExp) {
            this.lvl += 1;
            this.currExp = 0;
            this.maxExp = 10 * 2 ** this.lvl;
            restoreAllHealth();
            spawnGuardians();
            new LevelUp(`Level Up!`, this.position.x + (this.width / 2) + 60, this.position.y - 30);
            if (this.lvl === 2) {
                new LevelUp('New Guardian: Steph the Huntress', this.position.x + (this.width / 2) + 60, this.position.y - 0)
            }
            else if(this.lvl === 3) {
                new LevelUp('New Guardian: Robbie the Wizard', this.position.x + (this.width / 2) + 60, this.position.y - 0)
            }
            else if(this.lvl === 4) {
                new LevelUp('New Guardian: James the Fire Worm', this.position.x + (this.width / 2) + 60, this.position.y - 0)
            }
            else if(this.lvl === 5) {
                new LevelUp('New Guardian: Alex the Battlemage', this.position.x + (this.width / 2) + 60, this.position.y - 0)
            }
            
        }
    }
}

export { Van };
