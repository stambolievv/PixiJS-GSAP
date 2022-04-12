import config from './config.js';
import Controller from './utils/Controller.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.ParticleContainer(config.particle.intensity, { uvs: true });
app.stage.addChild(stage);

const controller = new Controller(config, stage);

app.loader
  .add('monsters', './assets/images/monsters.png')
  .load(({ resources }) => {
    controller.createParticle(resources);

    app.ticker.add((deltaTime) => controller.updateParticle(deltaTime));
  });