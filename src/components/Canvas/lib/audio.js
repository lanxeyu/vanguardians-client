import backgroundMusic from '/audio/bgmusic2.mp3';
import spearSfx from '/audio/spear.wav';
import spearHitSfx from '/audio/spearhit.wav';
import duncanSfx from '/audio/duncanattack.wav';
import duncanHitSfx from '/audio/duncanhit.wav';
import duncanDefSfx from '/audio/duncandefense.wav';
import lightningSfx from '/audio/lightning.wav';
import lightningHitSfx from '/audio/lightninghit.wav';
import lanxeSfx from '/audio/lanxeattack.wav';
import lanxeHitSfx from '/audio/lanxehit.wav';
import slashSfx from '/audio/slash.wav';
import slashHitSfx from '/audio/slashhit.wav';
import fireballSfx from '/audio/fireball.wav';
import fireballHitSfx from '/audio/fireballhit.wav';
import healSfx from '/audio/heal.wav';
import heal2Sfx from '/audio/heal2.wav';
import skeletonSfx from '/audio/skeletonattack.wav';
import goblinSfx from '/audio/goblinattack.wav';
import demonSfx from '/audio/demonattack.wav';
import trollSfx from '/audio/trollattack.wav';
import switchSfx from '/audio/switch.wav';
import arSfx from '/audio/ar.wav';

class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio(backgroundMusic);
    this.backgroundMusic.volume = 0.1;
    this.backgroundMusic.currentTime = 0.7;
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  pauseBackgroundMusic() {
    this.backgroundMusic.pause();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0.7;
  }

  playSfx(audio, volume = 0.1) {
    const soundEffectInstance = new Audio(audio);
    soundEffectInstance.volume = volume;
    soundEffectInstance.play();
  }

  playSpearSfx() {
    this.playSfx(spearSfx);
  }

  playSpearHitSfx() {
    this.playSfx(spearHitSfx, 0.05);
  }

  playDuncanSfx() {
    this.playSfx(duncanSfx);
  }

  playDuncanHitSfx() {
    this.playSfx(duncanHitSfx);
  }

  playDuncanDefSfx() {
    this.playSfx(duncanDefSfx);
  }

  playLightningSfx() {
    this.playSfx(lightningSfx, 0.5);
  }

  playLightningHitSfx() {
    this.playSfx(lightningHitSfx);
  }

  playLanxeSfx() {
    this.playSfx(lanxeSfx);
  }

  playLanxeHitSfx() {
    this.playSfx(lanxeHitSfx);
  }

  playSlashSfx() {
    this.playSfx(slashSfx);
  }

  playSlashHitSfx() {
    this.playSfx(slashHitSfx);
  }

  playFireballSfx() {
    this.playSfx(fireballSfx);
  }

  playFireballHitSfx() {
    this.playSfx(fireballHitSfx);
  }

  playHealSfx() {
    this.playSfx(healSfx);
  }

  playHeal2Sfx() {
    this.playSfx(heal2Sfx);
  }

  playSkeletonSfx() {
    this.playSfx(skeletonSfx);
  }

  playGoblinSfx() {
    this.playSfx(goblinSfx);
  }

  playDemonSfx() {
    this.playSfx(demonSfx);
  }

  playTrollSfx() {
    this.playSfx(trollSfx);
  }

  playSwitchSfx() {
    this.playSfx(switchSfx);
  }

  playArSfx() {
    this.playSfx(arSfx);
  }
}

export const audioManager = new AudioManager();
