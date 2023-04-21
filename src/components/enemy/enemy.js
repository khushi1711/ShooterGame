class Enemy {
  constructor(game) {
    this.game = game;
    this.positionX = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update() {
    this.positionX += this.speedX - this.game.layerSpeed;
    if (this.positionX + this.width < 0) this.markedForDeletion = true;

    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context) {
    context.fillStyle = 'black';
    if (this.game.debug) {
      context.strokeRect(
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
      context.fillStyle = 'black';
      context.font = '20px';
      context.fillText(this.lives, this.positionX, this.positionY);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
}

export default Enemy;
