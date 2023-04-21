import Explosion from './explosion.js';

class SmokeExplosion extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);
    this.image = document.getElementById('smoke');
  }
}

export default SmokeExplosion;
