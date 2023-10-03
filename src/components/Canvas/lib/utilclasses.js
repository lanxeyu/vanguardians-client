import { addToGroup, damageNumbers, removeFromGroup, popUpMsgs, timers } from "./groups";
import { Sprite } from "./sprite";


// -------------------- DAMAGE NUMBERS CLASS (Trial) -------------------------
class DamageNumber extends Sprite {
    constructor(text, x, y) {
        super();
        addToGroup(this, damageNumbers);
        this.offsetY = 20;
        this.offsetX = 0;
        let newPointY = y - this.offsetY;
        let newPointX = x - this.offsetX;
        this.position = { x: newPointX, y: newPointY };
        this.movSpd = 1;
        this.lifeTime = 1000;

        this.endTime = new Date();
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000);

        this.elapsedTime = 0;
        this.text = text;

        this.alpha = 1;
    }

    update() {
        let newPointY = this.position.y - this.movSpd;
        let newPointX = this.position.x;

        this.position = { x: newPointX, y: newPointY };

        if (this.elapsedTime >= this.lifeTime) {
            this.elapsedTime = this.lifeTime;
            removeFromGroup(this, damageNumbers);
        } else {
            this.elapsedTime = this.lifeTime - (this.endTime - new Date());
        }

        if (this.alpha <= 0) {
            this.alpha = 0;
        } else {
            this.alpha = 1 - Math.round((this.elapsedTime / this.lifeTime) * 100) / 100;
        }
    }

    draw(context) {
        context.fillStyle = "rgba(255, 255, 0, " + this.alpha + ")";
        context.font = "18px Silkscreen";
        // context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y);
    }
}

class HealNumber extends Sprite {
    constructor(text, x, y) {
        super();
        addToGroup(this, damageNumbers);
        this.offsetY = 20;
        this.offsetX = 0;
        let newPointY = y - this.offsetY;
        let newPointX = x - this.offsetX;
        this.position = { x: newPointX, y: newPointY };
        this.movSpd = 1;
        this.lifeTime = 1000;

        this.endTime = new Date();
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000);

        this.elapsedTime = 0;
        this.text = text;

        this.alpha = 1;
    }

    update() {
        let newPointY = this.position.y - this.movSpd;
        let newPointX = this.position.x;

        this.position = { x: newPointX, y: newPointY };

        if (this.elapsedTime >= this.lifeTime) {
            this.elapsedTime = this.lifeTime;
            removeFromGroup(this, damageNumbers);
        } else {
            this.elapsedTime = this.lifeTime - (this.endTime - new Date());
        }

        if (this.alpha <= 0) {
            this.alpha = 0;
        } else {
            this.alpha = 1 - Math.round((this.elapsedTime / this.lifeTime) * 100) / 100;
        }
    }

    draw(context) {
        context.fillStyle = "rgba(57, 255, 20, " + this.alpha + ")";
        context.font = "18px Silkscreen";
        // context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y);
    }
}

class LevelUp extends Sprite {
    constructor(text, x, y) {
        super();
        addToGroup(this, popUpMsgs);
        this.offsetY = 20;
        this.offsetX = 0;
        let newPointY = y - this.offsetY;
        let newPointX = x - this.offsetX;
        this.position = { x: newPointX, y: newPointY };
        this.movSpd = 1;
        this.lifeTime = 2500;

        this.endTime = new Date();
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000);

        this.elapsedTime = 0;
        this.text = text;

        this.alpha = 1;

        // this.timer = setTimeout(() => {}, this.lifeTime * 1000);
        // addToGroup(this.timer, timers);
    }

    update() {
        let newPointY = this.position.y - this.movSpd;
        let newPointX = this.position.x;

        this.position = { x: newPointX, y: newPointY };

        if (this.elapsedTime >= this.lifeTime) {
            removeFromGroup(this, popUpMsgs);
            // removeFromGroup(this.timer, popUpMsgs);
            this.elapsedTime = this.lifeTime;
        } else {
            this.elapsedTime = this.lifeTime - (this.endTime - new Date());
        }

        if (this.alpha <= 0) {
            this.alpha = 0;
        } else {
            this.alpha = 1 - Math.round((this.elapsedTime / this.lifeTime) * 100) / 100;
        }
    }

    draw(context) {
        context.fillStyle = "rgba(255, 255, 0, " + this.alpha + ")";
        context.font = "50px Silkscreen";
        if (this.text != "Level Up!") context.font = "15px Silkscreen";
        context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y);
    }
}

class WaveMessage extends Sprite{
    constructor(text, x, y) {
        super();
        addToGroup(this, popUpMsgs);
        this.offsetY = 20;
        this.offsetX = 0;
        let newPointY = y - this.offsetY;
        let newPointX = x - this.offsetX;
        this.position = { x: newPointX, y: newPointY };
        this.movSpd = 0.1;
        this.lifeTime = 1000;

        this.endTime = new Date();
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000);

        this.elapsedTime = 0;
        this.text = text;

        this.alpha = 1;

        setTimeout(() => {}, this.lifeTime * 1000);
    }

    update() {
        let newPointY = this.position.y - this.movSpd;
        let newPointX = this.position.x;

        this.position = { x: newPointX, y: newPointY };

        if (this.elapsedTime >= this.lifeTime) {
            removeFromGroup(this, popUpMsgs);
            this.elapsedTime = this.lifeTime;
        } else {
            this.elapsedTime = this.lifeTime - (this.endTime - new Date());
        }

        if (this.alpha <= 0) {
            this.alpha = 0;
        } else {
            this.alpha = 1 - Math.round((this.elapsedTime / this.lifeTime) * 100) / 100;
        }
    }

    draw(context) {
        context.fillStyle = "rgba(255, 255, 0, " + this.alpha + ")";
        context.font = "70px Silkscreen";
        // context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y);
    }
}

class SwitchMode extends Sprite {
    constructor(text, x, y) {
        super();
        addToGroup(this, popUpMsgs);
        this.offsetY = 20;
        this.offsetX = 0;
        let newPointY = y - this.offsetY;
        let newPointX = x - this.offsetX;
        this.position = { x: newPointX, y: newPointY };
        this.movSpd = 1;
        this.lifeTime = 2500;

        this.endTime = new Date();
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000);

        this.elapsedTime = 0;
        this.text = text;

        this.alpha = 1;

        // this.timer = setTimeout(() => {}, this.lifeTime * 1000);
        // addToGroup(this.timer, timers);
    }

    update() {
        let newPointY = this.position.y - this.movSpd;
        let newPointX = this.position.x;

        this.position = { x: newPointX, y: newPointY };

        if (this.elapsedTime >= this.lifeTime) {
            removeFromGroup(this, popUpMsgs);
            // removeFromGroup(this.timer, popUpMsgs);
            this.elapsedTime = this.lifeTime;
        } else {
            this.elapsedTime = this.lifeTime - (this.endTime - new Date());
        }

        if (this.alpha <= 0) {
            this.alpha = 0;
        } else {
            this.alpha = 1 - Math.round((this.elapsedTime / this.lifeTime) * 100) / 100;
        }
    }

    draw(context) {
        context.fillStyle = "rgba(255, 255, 0, " + this.alpha + ")";
        context.font = "20px Silkscreen";
        context.textAlign = "center";
        context.fillText(this.text, this.position.x + this.width / 2 + 12, this.position.y);
    }
}

class KnockedOut extends Sprite {
    constructor(text, x, y) {
        super()
        // addToGroup(this, popUpMsgs);
        this.offsetY = 20
        this.offsetX = 0
        let newPointY = y - this.offsetY
        let newPointX = x - this.offsetX
        this.position = { x: newPointX, y: newPointY }
        this.movSpd = 1
        this.lifeTime = 2500

        this.endTime = new Date()
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000)
        
        this.elapsedTime = 0
        this.text = text

        this.alpha = 1

        //  this.timer = setTimeout(() => {
        // }, this.lifeTime * 1000)
        // addToGroup(this.timer, timers);
    }

    update() {
        let newPointY = this.position.y - this.movSpd
        let newPointX = this.position.x

        this.position = { x: newPointX, y:  newPointY }

        if (this.elapsedTime >= this.lifeTime) {
            // removeFromGroup(this, popUpMsgs);
            // removeFromGroup(this.timer, timers);
            this.elapsedTime = this.lifeTime
        }
        else {
            this.elapsedTime =  this.lifeTime - (this.endTime - new Date())
        }
        
        if (this.alpha <= 0) {
            this.alpha = 0
        }
        else {
            this.alpha = 1 - (Math.round((this.elapsedTime / this.lifeTime) * 100) / 100)
        }
        
    }

    draw(context) {
        context.fillStyle = 'rgba(255, 255, 0, ' + this.alpha +')'
        context.font = "20px Silkscreen";
        context.textAlign = "center";
        context.fillText(this.text, this.position.x + (this.width / 2) + 12, this.position.y)
    }
}

export { DamageNumber, HealNumber, LevelUp, SwitchMode, KnockedOut, WaveMessage }
