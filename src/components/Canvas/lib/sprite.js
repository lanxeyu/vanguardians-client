import { addToGroup, allSprites, background, foreground} from "./groups";

// --------------------  MAIN SPRITE CLASS  --------------------
class Sprite {
    constructor(x, y, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }) {
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
        this.offset = offset;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
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


export { Sprite, Background, Foreground };
