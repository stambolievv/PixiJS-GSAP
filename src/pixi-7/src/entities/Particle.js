export default class Particle {
  constructor(config, stage, texture) {
    this._config = config;
    this._stage = stage;

    this.sprite = null;
    this.lifespan = null;
    this.touched = false;

    this.velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };

    this._setup(texture);
    this._stage.addChild(this.sprite);
  }

  get lifeOver() {
    return this.lifespan <= 0;
  }

  update(deltaTime) {
    this.lifespan -= 1 * deltaTime;

    this.sprite.position.x += (this.velocity.x * this._config.particle.speed) * deltaTime;
    this.sprite.position.y += (this.velocity.y * this._config.particle.speed) * deltaTime;

    if (this.sprite.position.y + this.velocity.y <= 0 || this.sprite.position.y + this.sprite.height + this.velocity.y >= this._config.renderer.height) {
      this.velocity.y = this.velocity.y * -1;
      this.touched = true;
    }
    if (this.sprite.position.x + this.velocity.x <= 0 || this.sprite.position.x + this.sprite.width + this.velocity.x >= this._config.renderer.width) {
      this.velocity.x = this.velocity.x * -1;
      this.touched = true;
    }
  }

  _setup(texture) {
    this.sprite = new PIXI.Sprite(texture);

    this.sprite.position.set(Math.random() * (this._config.renderer.width - this.sprite.width), Math.random() * (this._config.renderer.height - this.sprite.height));

    this.lifespan = Math.floor(Math.random() * (this._config.particle.lifespan.max - this._config.particle.lifespan.min) + this._config.particle.lifespan.min);
  }
}