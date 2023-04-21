import Enemy from './enemy.js';

class Angler extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.positionY = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 2;
    this.score = 2;
    this.image = document.getElementById('angler1');
    this.frameY = Math.floor(Math.random() * 3);
  }
}

export default Angler;
