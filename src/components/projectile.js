class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.positionX = x;
    this.positionY = y;
    this.height = 3;
    this.width = 10;
    this.speed = 5;
    this.markedForDeletion = false;
    this.image = document.getElementById('projectile');
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    context.drawImage(this.image, this.positionX, this.positionY);
  }

  update() {
    this.positionX += this.speed;
    if (this.positionX > this.game.width * 0.85) this.markedForDeletion = true;
  }
}

export default Projectile;
