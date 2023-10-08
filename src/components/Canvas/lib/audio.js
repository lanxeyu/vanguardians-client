import backgroundMusic from '/audio/bgmusic2.mp3';
import spearSfx from '/audio/spear.wav';
import lightningSfx from '/audio/lightning.wav';
import slashSfx from '/audio/slash.wav'
import duncanSfx from '/audio/duncanattack.wav'
import skeletonSfx from '/audio/swordattack.wav'
import goblinSfx from '/audio/goblinattack.wav'
import swordHitSfx from '/audio/swordhit.wav'
import lanxeSfx from '/audio/lanxeattack.wav'
import demonSfx from '/audio/demonattack.wav'
import switchSfx from '/audio/switch.wav'

class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio(backgroundMusic);
    this.backgroundMusic.volume = 0.1
    this.backgroundMusic.currentTime = 0.7

    this.spearSfx = new Audio(spearSfx)
    this.spearSfx.volume = 0.1

    this.lightningSfx = new Audio(lightningSfx)
    this.lightningSfx.volume = 0.5

    this.slashSfx = new Audio(slashSfx)
    this.slashSfx.volume = 0.1

    this.duncanSfx = new Audio(duncanSfx)
    this.duncanSfx.volume = 0.1

    this.skeletonSfx = new Audio(skeletonSfx)
    this.skeletonSfx.volume = 0.1

    this.goblinSfx = new Audio(goblinSfx)
    this.goblinSfx.volume = 0.1

    this.swordHitSfx = new Audio(swordHitSfx)
    this.swordHitSfx.volume = 0.1

    this.lanxeSfx = new Audio(lanxeSfx)
    this.lanxeSfx.volume = 0.1

    this.demonSfx = new Audio(demonSfx)
    this.demonSfx.volume = 0.1

    this.switchSfx = new Audio(switchSfx)
    this.switchSfx.volume = 0.1
  }

  playBackgroundMusic() {
    this.backgroundMusic.play()
  }

  pauseBackgroundMusic() {
    this.backgroundMusic.pause()
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0.7
  }

  playSpearSfx() {
    this.spearSfx.play()
  }
  
  playLightningSfx() {
    this.lightningSfx.play()
  }

  playSlashSfx() {
    this.slashSfx.play()
  }

  playDuncanSfx() {
    this.duncanSfx.play()
  }

  playSkeletonSfx() {
    this.skeletonSfx.play()
  }

  playGoblinSfx() {
    this.goblinSfx.play()
  }

  playSwordHitSfx() {
    this.swordHitSfx.play()
  }

  playLanxeSfx() {
    this.lanxeSfx.play()
  }

  playDemonSfx() {
    this.demonSfx.play()
  }

  playSwitchSfx() {
    this.switchSfx.play()
  }


}

export const audioManager = new AudioManager();
