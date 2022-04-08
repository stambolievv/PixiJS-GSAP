import Particle from '../entities/Particle.js';

export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.particles = [];
  }

  createParticle(resources) {
    const spritesheet = new PIXI.Texture(resources['monsters'].texture);

    for (let i = 0; i < this.config.particle.intensity; i++) {
      const texture = new PIXI.Texture(spritesheet, this._randomFrame(spritesheet));

      const particle = new Particle(this.config, this.stage, texture);
      this.particles.push(particle);
    }
  }

  updateParticle(deltaTime) {
    this.particles.forEach((particle, index) => {
      particle.update(deltaTime);

      if (particle.lifeOver) {
        this.particles.splice(index, 1);
        particle.texture.destroy();
      }
    });
  }

  _randomFrame(spritesheet) {
    const sourceW = 32;
    const sourceH = 32;

    const frameX = Math.floor(Math.random() * (spritesheet.width / sourceW)) * sourceW;
    const frameY = Math.floor(Math.random() * (spritesheet.height / sourceH)) * sourceH;

    return new PIXI.Rectangle(frameX, frameY, sourceW, sourceH);
  }
}
