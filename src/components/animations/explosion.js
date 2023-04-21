class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.frameX = 0;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width = 200;
    this.height = 200;
    this.positionX = Number(x) - 200 * 0.5;
    this.positionY = Number(y) - 200 * 0.5;
    this.fps = 30;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.maxFrame = 8;
  }
  update(deltaTime) {
    this.positionX -= this.game.layerSpeed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
}

export default Explosion;
