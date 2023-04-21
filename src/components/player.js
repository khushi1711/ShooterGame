import { ARROW_DOWN, ARROW_UP } from '../utils/constants.js';
import Projectile from './projectile.js';

class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.positionX = 20;
    this.positionY = 100;
    this.maxSpeed = 3;
    this.projectiles = [];
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.powerUp = false;
    this.powerTimer = 0;
    this.powerLimit = 8000;
  }

  draw(context) {
    context.fillStyle = 'black';
    if (this.game.debug)
      context.strokeRect(
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );

    // draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });

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

  updatePosition(deltaTime) {
    if (this.game.keys.includes(ARROW_UP)) this.positionY -= this.maxSpeed;
    if (this.game.keys.includes(ARROW_DOWN)) this.positionY += this.maxSpeed;
    else this.positionY += 0;

    if (this.positionY > this.game.height - this.height * 0.5)
      this.positionY = this.game.height - this.height * 0.5;

    if (this.positionY < -this.height * 0.5)
      this.positionY = -this.height * 0.5;

    // to handle shoots
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    // animation
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    // power up
    if (this.powerUp) {
      if (this.powerTimer >= this.powerLimit) {
        this.powerUp = false;
        this.powerTimer = 0;
        this.frameY = 0;
        this.game.sound.powerDown();
      } else {
        this.frameY = 1;
        if (!this.game.gameOver) this.game.ammo += 0.1;
        if (!Number.isNaN(deltaTime)) this.powerTimer += deltaTime;
      }
    }
  }

  //   shoot
  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.positionX + 80, this.positionY + 30)
      );

      this.game.ammo--;
    }
    this.game.sound.shot();
    if (this.powerUp) this.shootBottom();
  }

  shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.positionX + 80, this.positionY + 175)
      );

      this.game.ammo--;
    }
  }

  // power up
  enterPowerUp() {
    this.powerUp = true;
    this.powerTimer = 0;
    this.game.ammo = this.game.maxAmmo;
    this.game.sound.powerUp();
  }
}

export default Player;
