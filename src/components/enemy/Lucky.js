import { LUCKY } from '../../utils/constants.js';
import Enemy from './enemy.js';

class Lucky extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.positionY = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 3;
    this.score = 15;
    this.image = document.getElementById('lucky');
    this.frameY = Math.floor(Math.random() * 2);
    this.type = LUCKY;
  }
}

export default Lucky;
