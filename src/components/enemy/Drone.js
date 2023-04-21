import Enemy from './enemy.js';

class Drone extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width = 115;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById('drone');
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}

export default Drone;
