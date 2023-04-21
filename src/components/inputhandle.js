import { ARROW_DOWN, ARROW_UP } from '../utils/constants.js';

class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener('keydown', (e) => {
      if (
        (e.key === ARROW_UP || e.key === ARROW_DOWN) &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === ' ') {
        this.game.player.shootTop();
      } else if (e.key === 'd') {
        this.game.debug = !this.game.debug;
      } else if (e.key === 's') {
        this.game.startGame();
      } else if (e.key === 'r') {
        if (this.game.gameOver) {
          this.game.restartGame();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.game.keys.includes(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}

export default InputHandler;
