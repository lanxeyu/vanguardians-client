import backgroundMusic from '/audio/bgmusic2.mp3';

class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio(backgroundMusic);
    this.backgroundMusic.volume = 0.1; // Set initial volume (1.0 for full volume)
    this.backgroundMusic.currentTime = 0.7
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  pauseBackgroundMusic() {
    this.backgroundMusic.pause();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  setVolume(volume) {
    if (volume >= 0 && volume <= 1) {
      this.backgroundMusic.volume = volume;
    }
  }

  setCurrentTime(timeInSeconds) {
    if (timeInSeconds >= 0) {
      this.backgroundMusic.currentTime = timeInSeconds;
    }
  }
}

export const audioManager = new AudioManager();
