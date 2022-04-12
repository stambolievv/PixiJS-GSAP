import Particle from '../entities/Particle.js';

export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.spritesheet = null;
    this.particles = [];
  }

  createParticle(resources) {
    this.spritesheet = new PIXI.Texture(resources['monsters'].texture);

    for (let i = 0; i < this._config.particle.intensity; i++) {
      const texture = new PIXI.Texture(this.spritesheet, this._randomFrame());

      const particle = new Particle(this._config, this._stage, texture);
      this.particles.push(particle);
    }
  }

  updateParticle(deltaTime) {
    this.particles.forEach((particle, index) => {
      particle.update(deltaTime);

      if (particle.touched) {
        particle.touched = false;
        particle.sprite.texture = new PIXI.Texture(this.spritesheet, this._randomFrame());
      }

      if (particle.lifeOver) {
        this.particles.splice(index, 1);
        particle.sprite.destroy();
      }
    });
  }

  _randomFrame() {
    const sourceW = 32;
    const sourceH = 32;

    const frameX = Math.floor(Math.random() * (this.spritesheet.width / sourceW)) * sourceW;
    const frameY = Math.floor(Math.random() * (this.spritesheet.height / sourceH)) * sourceH;

    return new PIXI.Rectangle(frameX, frameY, sourceW, sourceH);
  }
}
