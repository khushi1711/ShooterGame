import Player from './player.js';
import InputHandler from './inputhandle.js';
import UI from './ui.js';
import Angler from './enemy/Angler.js';
import checkCollision from '../utils/checkCollision.js';
import Background from './background.js';
import BigAngler from './enemy/BigAngler.js';
import Lucky from './enemy/Lucky.js';
import { LUCKY } from '../utils/constants.js';
import Particle from './particles.js';
import Drone from './enemy/Drone.js';
import SmokeExplosion from './animations/smokeExplosion.js';
import FireExplosion from './animations/fireExplosion.js';
import SoundController from './sound.js';

class Game {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.background = new Background(this);
    this.sound = new SoundController(this);
    this.isGameStarted = false;
    this.keys = [];
    this.enemies = [];
    this.particles = [];
    this.explosions = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 300;
    this.enemyTimer = 0;
    this.enemyInterval = 500;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 300;
    this.gameTime = 0;
    this.timeLimit = 60000;
    this.layerSpeed = 1;
    this.debug = false;
  }

  startGame() {
    this.isGameStarted = true;
  }

  restartGame() {
    delete this.player;
    delete this.input;
    delete this.ui;
    delete this.background;
    delete this.sound;

    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.background = new Background(this);
    this.sound = new SoundController(this);
    this.isGameStarted = true;
    this.keys = [];
    this.enemies = [];
    this.particles = [];
    this.explosions = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 300;
    this.enemyTimer = 0;
    this.enemyInterval = 500;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 300;
    this.gameTime = 0;
    this.timeLimit = 60000;
    this.layerSpeed = 1;
  }

  update(deltaTime) {
    // background
    this.background.update();

    // player update
    this.player.updatePosition(deltaTime);

    if (!this.isGameStarted) return;

    // game time
    if (!Number.isNaN(deltaTime) && !this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;

    // handle ammo refill
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      if (!Number.isNaN(deltaTime)) this.ammoTimer += deltaTime;
    }

    // handle Explosions
    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    // handle particles
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );

    // handle enemy
    this.enemies.forEach((enemy) => {
      enemy.update();
      if (checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.addExplosion(enemy);
        this.sound.hit();
        this.particles.push(
          new Particle(
            this,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );

        if (enemy.type === LUCKY) {
          this.player.enterPowerUp();
        } else {
          if (!this.gameOver) this.score--;
        }
      }

      this.player.projectiles.forEach((projectile) => {
        if (checkCollision(projectile, enemy)) {
          projectile.markedForDeletion = true;
          this.particles.push(
            new Particle(
              this,
              enemy.positionX + enemy.width * 0.5,
              enemy.positionY + enemy.height * 0.5
            )
          );
          enemy.lives--;

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            this.particles.push(
              new Particle(
                this,
                enemy.positionX + enemy.width * 0.5,
                enemy.positionY + enemy.height * 0.5
              )
            );
            this.addExplosion(enemy);
            this.sound.explosion();
            if (!this.gameOver) this.score += enemy.score;
            if (this.score >= this.winningScore) this.gameOver = true;
          }
        }
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      if (!Number.isNaN(deltaTime)) this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
  }

  addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.3) this.enemies.push(new Angler(this));
    else if (randomize < 0.6) this.enemies.push(new BigAngler(this));
    else if (randomize < 0.9) this.enemies.push(new Drone(this));
    else this.enemies.push(new Lucky(this));
  }

  addExplosion(enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.positionX + enemy.width * 0.5,
          enemy.positionY + enemy.height * 0.5
        )
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.positionX + enemy.width * 0.5,
          enemy.positionY + enemy.height * 0.5
        )
      );
    }
  }
}

export default Game;
