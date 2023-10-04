import { Sprite } from "./sprite";
import { addToGroup, ui, portraits } from "./groups";
import { CHAR_MODES, CHAR_STATES } from "./statemanagers";
import { getScores } from "./stattracker";

class PortraitIcon extends Sprite {
    constructor(guardian, x, y, increment) {
        super();
        // addToGroup(this, portraitIcons);
        addToGroup(this, ui);
        addToGroup(this, portraits)

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
            this.portraitImage.src = "images/lanxe-portrait.png"
        }
        else if (this.guardian.name === "robbie") {
            this.portraitImage.src = "images/robbie-portrait.png"
        }
        else if (this.guardian.name === "james") {
            this.portraitImage.src = "images/james-portrait.png"
        }
        else if (this.guardian.name === "duncan") {
            this.portraitImage.src = "images/duncan-portrait.png"
        }
        else if (this.guardian.name === "steph") {
            this.portraitImage.src = "images/steph-portrait.png"
        }
        else if (this.guardian.name === "alex") {
            this.portraitImage.src = "images/alex-portrait.png"
        }
        else if (this.guardian.name === "van") {
            // console.log("van found")
            this.portraitImage.src = "images/van-portrait.png"
        }

        this.mode1Image = new Image();
        this.mode1Image.src = 'images/mode-1.png'
        this.mode2Image = new Image();
        this.mode2Image.src = 'images/mode-2.png'

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
            context.drawImage(this.mode2Image, this.position.x + (this.width / 2) - 14, this.position.y + this.height - 27, 28, 25)
        }

        context.fillStyle = 'rgb(255, 255, 255)'
        context.font = "24px Silkscreen";
        context.textAlign = "center"
        context.fillText(this.hotkey, this.position.x + (this.width / 2), this.position.y + this.height + 30)
    }

    update() {
        this.currentHPBar = this.barWidth * (this.guardian.currHealth / this.guardian.maxHealth);
        this.currentEXPBar = this.barWidth * (this.guardian.currExp / this.guardian.maxExp);
    }
}

class TopBar extends Sprite {
    constructor(x, y, width, height) {
        super(x, y);
        addToGroup(this, ui);

        this.name = "topbar"

        this.width = width;
        this.height = height;

        // if (scores) {
        //     this.score = scores;
        // }
        // else {
        //     this.scores = 0;
        // }
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
        context.fillText(getScores(), this.position.x + (this.width / 2), this.position.y + 65)

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
        this.roots.src = 'images/roots.png';

        this.barWidth = 180;
        this.barHeight = 18;

        this.mode1Image = new Image();
        this.mode1Image.src = 'images/mode-1.png'
        this.mode1LargeImage = new Image();
        this.mode1LargeImage.src = 'images/mode-1-large.png'
        this.mode2Image = new Image();
        this.mode2Image.src = 'images/mode-2.png'
        this.mode2LargeImage = new Image();
        this.mode2LargeImage.src = 'images/mode-2-large.png'

        this.targetImage = new Image();
        if (target) {
            this.target = target;
            this.currentHPBar = this.target.currHealth;
            this.currentEXPBar = this.target.currExp;
            if (this.target.name === "van") {
                this.targetImage.src = 'images/van-portrait.png';
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
                context.drawImage(this.mode2LargeImage, this.position.x + 518 + (this.mode2LargeImage.width / 2) - 14, this.position.y - this.height + 19, 69, 63)
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
            this.targetImage.src = "images/lanxe-portrait.png"
        }
        else if (this.target.name === "robbie") {
            this.targetImage.src = "images/robbie-portrait.png"
        }
        else if (this.target.name === "james") {
            this.targetImage.src = "images/james-portrait.png"
        }
        else if (this.target.name === "duncan") {
            this.targetImage.src = "images/duncan-portrait.png"
        }
        else if (this.target.name === "steph") {
            this.targetImage.src = "images/steph-portrait.png"
        }
        else if (this.target.name === "alex") {
            this.targetImage.src = "images/alex-portrait.png"
        }
        else if (this.target.name === "van") {
            this.targetImage.src = "images/van-portrait.png"
        }

    }
}

export { PortraitIcon, TopBar, BottomBar };