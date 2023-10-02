import { addToGroup, allSprites, guardians, van, removeFromGroup, background, foreground, ui} from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(x, y, imageSrc, scale = 1, framesMax = 1) {
        addToGroup(this, allSprites);
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

// class Background extends Sprite {
//     constructor(x, y, imageSrc, scale = 1){
//         super(x, y, imageSrc, scale)
//         addToGroup(this, background)
//     }
// }

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

        this.name = "van"
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }

    drawHealthbars(context) {
        // Healthbar
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + 55,
            this.position.y - 15,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            this.position.x + 55,
            this.position.y - 15,
            (this.currHealth / this.maxHealth) * this.healthBarWidth,
            this.healthBarHeight
        );
        
        // Expbar
        context.fillStyle = "grey";
        context.fillRect(
            this.position.x + 55,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "white";
        context.fillRect(
            this.position.x + 55,
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

class Background extends Sprite {
    constructor(x, y, width, height, offsetX, offsetY, imageSrc, movSpd) {
        super()
        addToGroup(this, background)
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

class Foreground extends Sprite {
    constructor(x, y, width, height, offsetX, offsetY, imageSrc, movSpd) {
        super()
        addToGroup(this, foreground)
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
    constructor(guardian, x, y, increment) {
        super();
        // addToGroup(this, portraitIcons);
        addToGroup(this, ui);

        this.name = "portraiticon";
        this.spacing = 10;
        this.width = 64;
        this.height = 64;

        let posX = x + (increment * this.width) + (increment * this.spacing);
        this.position = { x: posX, y };
        this.guardian = guardian;
        this.increment = increment;
        
        if (this.guardian.name === "van") {
            this.hotkey = "V"
        }
        else {
            this.hotkey = String(increment)
        }

        this.barWidth = 64;
        this.currentHPBar = this.barWidth * (this.guardian.currHealth / this.guardian.maxHealth);
        this.currentEXPBar = this.barWidth * (this.guardian.currExp / this.guardian.maxExp);

        this.portraitImage = new Image()

        if (this.guardian.name === "lanxe") {
            this.portraitImage.src = "src/components/canvas/img/lanxe-portrait.png"
        }
        else if (this.guardian.name === "robbie") {
            this.portraitImage.src = "src/components/canvas/img/robbie-portrait.png"
        }
        else if (this.guardian.name === "james") {
            this.portraitImage.src = "src/components/canvas/img/james-portrait.png"
        }
        else if (this.guardian.name === "duncan") {
            this.portraitImage.src = "src/components/canvas/img/duncan-portrait.png"
        }
        else if (this.guardian.name === "steph") {
            this.portraitImage.src = "src/components/canvas/img/steph-portrait.png"
        }
        else if (this.guardian.name === "alex") {
            this.portraitImage.src = "src/components/canvas/img/alex-portrait.png"
        }
        else if (this.guardian.name === "van") {
            console.log("van found")
            this.portraitImage.src = "src/components/canvas/img/van.png"
        }

        this.mode1Image = new Image();
        this.mode1Image.src = 'src/components/canvas/img/mode-1.png'
        this.mode2Image = new Image();
        this.mode2Image.src = 'src/components/canvas/img/mode-2.png'

    }

    draw(context) {
        context.fillStyle = 'rgb(78,78,78)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.lineWidth = 5;

        context.drawImage(this.portraitImage, this.position.x, this.position.y, this.width, this.height)

        context.strokeStyle = 'rgb(58,58,58)'
        context.strokeRect(this.position.x, this.position.y, this.width, this.height);
        
        context.fillStyle = "grey";
        context.fillRect(this.position.x, this.position.y + this.height, this.barWidth, 5)

        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y + this.height, this.currentHPBar, 5)

        context.fillStyle = "grey";
        context.fillRect(this.position.x, this.position.y + this.height + 5, this.barWidth, 5)

        context.fillStyle = "rgb(255, 233, 58)";
        context.fillRect(this.position.x, this.position.y + this.height + 5, this.currentEXPBar, 5)

        if (this.guardian.currentMode === CHAR_MODES.MODE_1) {
            context.drawImage(this.mode1Image, this.position.x + (this.width / 2) - 13, this.position.y + this.height - 27, 25, 25)
        }
        else if (this.guardian.currentMode === CHAR_MODES.MODE_2) {
            context.drawImage(this.mode2Image, this.position.x + (this.width / 2) - 14, this.position.y, 28, 25)
        }

        context.fillStyle = 'rgb(255, 255, 255)'
        context.font = "24px Silkscreen";
        context.fillText(this.hotkey, this.position.x + (this.width / 2), this.position.y + this.height + 30)
    }

    update() {
        this.currentHPBar = this.barWidth * (this.guardian.currHealth / this.guardian.maxHealth);
        this.currentEXPBar = this.barWidth * (this.guardian.currExp / this.guardian.maxExp);
    }
}

class TopBar extends Sprite {
    constructor(x, y, width, height, scores) {
        super(x, y);
        addToGroup(this, ui);

        this.name = "topbar"

        this.width = width;
        this.height = height;

        if (scores) {
            this.score = scores;
        }
        else {
            this.scores = 0;
        }
    }

    draw(context) {

        context.fillStyle = 'rgb(78,78,78)'
        //context.fillRect(this.position.x, this.position.y, this.width, this.height + 10);
        context.lineWidth = 4;
        context.strokeStyle = 'rgb(58,58,58)'
        // context.strokeRect(this.position.x + 5, this.position.y - 5 + 10, this.width - 10, this.height);

        context.fillStyle = 'rgb(255, 255, 255)';
        context.font = "24px Silkscreen";
        context.textAlign = "center"
        context.fillText("SCORE", this.position.x + (this.width / 2), this.position.y + 35)
        context.fillText(this.scores, this.position.x + (this.width / 2), this.position.y + 65)

    }


    update() {

    }

}

class BottomBar extends Sprite {
    constructor(x, y, width, height, target) {
        super(x, y);
        addToGroup(this, ui);

        this.name = "bottombar"

        this.width = width;
        this.height = height;

        this.roots = new Image();
        this.roots.src = 'src/components/canvas/img/roots.png';

        this.barWidth = 180;
        this.barHeight = 18;

        this.mode1Image = new Image();
        this.mode1Image.src = 'src/components/canvas/img/mode-1.png'
        this.mode1LargeImage = new Image();
        this.mode1LargeImage.src = 'src/components/canvas/img/mode-1-large.png'
        this.mode2Image = new Image();
        this.mode2Image.src = 'src/components/canvas/img/mode-2.png'
        this.mode2LargeImage = new Image();
        this.mode2LargeImage.src = 'src/components/canvas/img/mode-2-large.png'

        this.targetImage = new Image();
        if (target) {
            this.target = target;
            this.currentHPBar = this.target.currHealth;
            this.currentEXPBar = this.target.currExp;
            if (this.target.name === "van") {
                this.targetImage.src = 'src/components/canvas/img/van.png';
            }    
        }
        else {
            this.target = null;
            this.currentHPBar = this.barWidth;
            this.currentEXPBar = 0;
        }
    }

    draw(context) {

        // Bottom HUD Element
        context.fillStyle = 'rgb(78,78,78)'
        context.fillRect(this.position.x, this.position.y, this.width, -this.height);
        context.lineWidth = 10;
        context.strokeStyle = 'rgb(58,58,58)'
        context.strokeRect(this.position.x + 5, this.position.y - 5, this.width - 10, -this.height);
        context.drawImage(this.roots, this.position.x, this.position.y, this.width, -this.height - 10)
        
        if (this.target) {
            context.drawImage(this.targetImage, this.position.x + 40, this.position.y - this.height + 15, 100, 100 * this.targetImage.height / this.targetImage.width)

            context.fillStyle = 'rgb(255, 255, 255)';
            context.font = "24px Silkscreen";
            context.fillText(String(this.target.name).toUpperCase(), this.position.x + 40 + (100 / 2), this.position.y - this.height + 140)
            context.textAlign = 'left';
            context.fillText("HEALTH", this.position.x + 182, this.position.y - this.height + 45)

            context.fillStyle = "grey";
            context.fillRect(this.position.x + 183, this.position.y - this.height + 55, this.barWidth, this.barHeight)

            context.fillStyle = "red";
            context.fillRect(this.position.x + 183, this.position.y - this.height + 55, this.currentHPBar, this.barHeight)

            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillText("EXPERIENCE", this.position.x + 182, this.position.y - this.height + 100)

            context.fillStyle = "grey";
            context.fillRect(this.position.x + 183, this.position.y - this.height + 110, this.barWidth, this.barHeight)

            context.fillStyle = "rgb(255, 233, 58)";
            context.fillRect(this.position.x + 183, this.position.y - this.height + 110, this.currentEXPBar, this.barHeight)

            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillText(`${this.target.currHealth}/${this.target.maxHealth}`, this.position.x + 382, this.position.y - this.height + 71)

            if (this.target.maxExp) {
                context.fillText(`${this.target.currExp}/${this.target.maxExp}`, this.position.x + 382, this.position.y - this.height + 126)
            }
            else {
                context.fillText(`0/0`, this.position.x + 382, this.position.y - this.height + 126)
            }
            

            if (this.target.currentMode === CHAR_MODES.MODE_1) {
                context.drawImage(this.mode1LargeImage, this.position.x + 520 + (this.mode1LargeImage.width / 2) - 13, this.position.y - this.height + 20, 63, 63)
                context.fillText(`MODE 1`, this.position.x + 520, this.position.y - this.height + 110)
            }
            else if (this.target.currentMode === CHAR_MODES.MODE_2) {
                context.drawImage(this.mode2LargeImage, this.position.x + 100 + (this.mode2LargeImage.width / 2) - 14, this.position.y - this.height, 69, 63)
                context.fillText(`MODE 2`, this.position.x + 520, this.position.y - this.height + 110)
            }
            
        }
    }


    update() {
        
        if (this.target) {
            this.currentHPBar = this.barWidth * (this.target.currHealth / this.target.maxHealth);
            this.currentEXPBar = this.barWidth * (this.target.currExp / this.target.maxExp);
        }
    }

    setTarget(target) { 
        this.target = target;
        console.log("Setting target")
        if (this.target.name === "lanxe") {
            this.targetImage.src = "src/components/canvas/img/lanxe-portrait.png"
        }
        else if (this.target.name === "robbie") {
            this.targetImage.src = "src/components/canvas/img/robbie-portrait.png"
        }
        else if (this.target.name === "james") {
            this.targetImage.src = "src/components/canvas/img/james-portrait.png"
        }
        else if (this.target.name === "duncan") {
            this.targetImage.src = "src/components/canvas/img/duncan-portrait.png"
        }
        else if (this.target.name === "steph") {
            this.targetImage.src = "src/components/canvas/img/steph-portrait.png"
        }
        else if (this.target.name === "alex") {
            this.targetImage.src = "src/components/canvas/img/alex-portrait.png"
        }
        else if (this.target.name === "van") {
            this.targetImage.src = "src/components/canvas/img/van.png"
        }

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
        let posX = this.position.x;
        if (this.healthBarWidth < this.width) posX = this.position.x + (this.width / 2) - (this.healthBarWidth / 2);
        
        context.fillRect(
            posX,
            this.position.y - 25,
            this.healthBarWidth,
            this.healthBarHeight
        );

        context.fillStyle = "red";
        context.fillRect(
            posX,
            this.position.y - 25,
            (this.currHealth / this.maxHealth   ) * this.healthBarWidth,
            this.healthBarHeight
        );
    }
}

export { Sprite, Background, Van, Character, Foreground, PortraitIcon, TopBar, BottomBar, CHAR_STATES, CHAR_MODES };
