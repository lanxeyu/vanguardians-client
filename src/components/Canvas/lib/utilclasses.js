import { addToGroup, damageNumbers, removeFromGroup } from "./groups"
import { Character } from "./sprite"

// -------------------- DAMAGE NUMBERS CLASS (Trial) -------------------------
class DamageNumber extends Character {
    constructor(text, x, y) {
        super()
        addToGroup(this, damageNumbers)
        this.offsetY = 20
        this.offsetX = 0
        let newPointY = y - this.offsetY
        let newPointX = x - this.offsetX
        this.position = { x: newPointX, y: newPointY }
        this.movSpd = 1
        this.lifeTime = 1000

        this.endTime = new Date()
        this.endTime.setSeconds(this.endTime.getSeconds() + this.lifeTime / 1000)
        
        this.elapsedTime = 0
        this.text = text

        this.alpha = 1

        // console.log(x, y)
        // console.log(newPointX, newPointY)
        // console.log(this.position)
        // setTimeout(() => {

        // }, this.lifeTime * 1000)
        // console.log(this.lifeTime - (this.endTime - new Date()))
    }

    update(context) {
        this.draw(context)
        let newPointY = this.position.y - this.movSpd
        let newPointX = this.position.x
        // if (this.target) newPointX = this.target.position.x + (this.target.width / 2)

        this.position = { x: newPointX, y:  newPointY }

        if (this.elapsedTime >= this.lifeTime) {
            this.elapsedTime = this.lifeTime
            removeFromGroup(this, damageNumbers)
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
        context.font = "18px Silkscreen";
        // context.textAlign = "center";
        context.fillText(this.text, this.position.x, this.position.y)
    }
}

export { DamageNumber }