import config from './config.js';
import Controller from './utils/Controller.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

const controller = new Controller(config, stage);

app.loader
  .add('rocket', './assets/images/rocket.png')
  .add('merlin', './assets/images/merlin.png')
  .load(({ resources }) => {
    controller.createRockets(resources);

    app.ticker.add((deltaTime) => controller.updateRockets(deltaTime));
  });