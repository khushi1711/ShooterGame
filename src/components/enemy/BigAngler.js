import Enemy from './enemy.js';

class BigAngler extends Enemy {
  constructor(game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.positionY = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 3;
    this.score = 3;
    this.image = document.getElementById('angler2');
    this.frameY = Math.floor(Math.random() * 2);
  }
}

export default BigAngler;
