import { Sprite } from './sprite';
import { fx, addToGroup, removeFromGroup } from './groups';

class Effects extends Sprite {
    constructor( 
        x,
        y,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
        ) {
        super(x, y, imageSrc, scale, framesMax, offset);
        addToGroup(this, fx);

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.framesMax = framesMax;
        
        // for (const sprite in this.sprites) {
        //     sprites[sprite].image = new Image()
        //     sprites[sprite].image.src = sprites[sprite].imageSrc
        // }
    }

    updatePosition() {
        // this.position.x += this.movSpd;
    }

    updateAnimation() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        if (this.framesCurrent = this.framesMax - 1) {
            // console.log(this.framesCurrent);
            removeFromGroup(this, fx);
        }
        
        this.updateAnimation();

    }
}

class FireballEffect extends Effects {
    constructor(x, y, imageSrc, scale = 5, framesMax = 7, offset = { x: 0, y: 0 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        addToGroup(this, fx);

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 2000;

        this.framesMax = framesMax;
        
        // for (const sprite in this.sprites) {
        //     sprites[sprite].image = new Image()
        //     sprites[sprite].image.src = sprites[sprite].imageSrc
        // }
    }
}

class LivingBombEffect extends Effects {
    constructor(x, y, imageSrc, scale = 5, framesMax = 10, offset = { x: 0, y: 0 }) {
        super(x, y, imageSrc, scale, framesMax, offset);
        addToGroup(this, fx);

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 100;

        this.framesMax = framesMax;
        
        // for (const sprite in this.sprites) {
        //     sprites[sprite].image = new Image()
        //     sprites[sprite].image.src = sprites[sprite].imageSrc
        // }
    }
}

export { FireballEffect, LivingBombEffect }
