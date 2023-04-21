import './styles/styles.css';
import Game from './components/game.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('main');
  const ctx = canvas.getContext('2d');
  canvas.height = 500;
  canvas.width = 1200;

  const game = new Game(canvas.height, canvas.width);
  let lastTime = 0;

  function animation(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animation);
  }

  animation(0);
});
