
import config from './config.js';
import Controller from './utils/Controller.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

const controller = new Controller(config, stage);

app.loader
  .add('clipboard', './assets/images/Clipboard01.png')
  .add('./assets/images/420.png')
  .add('./assets/images/biohazard.png')
  .add('./assets/images/camera.png')
  .add('./assets/images/pen.png')
  .add('./assets/images/ruby.png')
  .add('./assets/images/sausage.png')
  .add('./assets/images/star.png')
  .add('./assets/images/submarine.png')
  .add('./assets/images/web.png')
  .load(({ resources }) => {
    controller.createSlider();
    controller.createMovieFrame(app.renderer, resources);

    app.ticker.add((deltaTime) => controller.updateMovieFrame(deltaTime));
  });