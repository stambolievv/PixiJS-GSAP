import config from './config.js';
import Controller from './utils/Controller.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

const controller = new Controller(config, stage);
const mouse = { x: undefined, y: undefined };

app.ticker.add((deltaTime) => {
  controller.createCircle(mouse);
  controller.updateCircle(deltaTime);
});

app.renderer.view.addEventListener('mousemove', e => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});