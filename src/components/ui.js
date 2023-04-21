import formattedTime from '../utils/formattedTime.js';

class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = 'Bangers ';
    this.color = 'white';
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.font = this.fontSize + 'px ' + this.fontFamily;

    context.fillText('Score: ' + this.game.score, 20, 40);
    context.fillText(`Timer: ${formattedTime(this.game.gameTime)}`, 20, 100);

    if (!this.game.isGameStarted) {
      context.font = '55px ' + this.fontFamily;
      context.fillText(
        "Press 'S' to start",
        this.game.width * 0.35,
        this.game.height * 0.5
      );
    }

    if (this.game.gameOver) {
      context.textAlign = 'center';
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = 'Most Wondrous!';
        message2 = 'Well done explorer!';
      } else {
        message1 = 'Blazes!';
        message2 = 'Get my repair kit and try again!';
      }
      context.font = '70px ' + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = '25px ' + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
      context.font = '55px ' + this.fontFamily;
      context.fillText(
        "Press 'R' to restart",
        this.game.width * 0.5,
        this.game.height * 0.5 + 120
      );
    }

    if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

    context.restore();
  }
}

export default UI;
