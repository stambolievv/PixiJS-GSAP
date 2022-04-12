import config from './config.js';
import Controller from './utils/Controller.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

const controller = new Controller(config, stage);

app.loader
  .add('pokenata', './assets/images/pokenata.gif')
  .add('./assets/images/candy/bean_blue.png')
  .add('./assets/images/candy/bean_green.png')
  .add('./assets/images/candy/bean_orange.png')
  .add('./assets/images/candy/bean_purple.png')
  .add('./assets/images/candy/bean_red.png')
  .add('./assets/images/candy/bean_yellow.png')
  .add('./assets/images/candy/heart_blue.png')
  .add('./assets/images/candy/heart_green.png')
  .add('./assets/images/candy/heart_orange.png')
  .add('./assets/images/candy/heart_purple.png')
  .add('./assets/images/candy/heart_red.png')
  .add('./assets/images/candy/heart_yellow.png')
  .add('./assets/images/candy/jelly_blue.png')
  .add('./assets/images/candy/jelly_green.png')
  .add('./assets/images/candy/jelly_orange.png')
  .add('./assets/images/candy/jelly_purple.png')
  .add('./assets/images/candy/jelly_red.png')
  .add('./assets/images/candy/jelly_yellow.png')
  .add('./assets/images/candy/lollipop_blue.png')
  .add('./assets/images/candy/lollipop_green.png')
  .add('./assets/images/candy/lollipop_orange.png')
  .add('./assets/images/candy/lollipop_purple.png')
  .add('./assets/images/candy/lollipop_red.png')
  .add('./assets/images/candy/lollipop_yellow.png')
  .add('./assets/images/candy/mm_blue.png')
  .add('./assets/images/candy/mm_green.png')
  .add('./assets/images/candy/mm_orange.png')
  .add('./assets/images/candy/mm_purple.png')
  .add('./assets/images/candy/mm_red.png')
  .add('./assets/images/candy/mm_yellow.png')
  .add('./assets/images/candy/star_blue.png')
  .add('./assets/images/candy/star_green.png')
  .add('./assets/images/candy/star_orange.png')
  .add('./assets/images/candy/star_purple.png')
  .add('./assets/images/candy/star_red.png')
  .add('./assets/images/candy/star_yellow.png')
  .add('./assets/images/candy/swirlstroke_blue.png')
  .add('./assets/images/candy/swirlstroke_green.png')
  .add('./assets/images/candy/swirlstroke_orange.png')
  .add('./assets/images/candy/swirlstroke_purple.png')
  .add('./assets/images/candy/swirlstroke_red.png')
  .add('./assets/images/candy/swirlstroke_yellow.png')
  .add('./assets/images/candy/wrappedsolid_blue.png')
  .add('./assets/images/candy/wrappedsolid_green.png')
  .add('./assets/images/candy/wrappedsolid_orange.png')
  .add('./assets/images/candy/wrappedsolid_purple.png')
  .add('./assets/images/candy/wrappedsolid_red.png')
  .add('./assets/images/candy/wrappedsolid_yellow.png')
  .add('./assets/images/candy/wrappedtrans_blue.png')
  .add('./assets/images/candy/wrappedtrans_green.png')
  .add('./assets/images/candy/wrappedtrans_orange.png')
  .add('./assets/images/candy/wrappedtrans_purple.png')
  .add('./assets/images/candy/wrappedtrans_red.png')
  .add('./assets/images/candy/wrappedtrans_yellow.png')
  .load(({ resources }) => {
    controller.createPinata(resources);
    controller.setScore();

    app.ticker.add((deltaTime) => {
      controller.updateCandy(deltaTime);
    });
  });