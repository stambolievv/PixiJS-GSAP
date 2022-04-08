export default class Particle {
  constructor(config, stage, sprite) {
    this.config = config;
    this.stage = stage;

    this.texture = null;
    this.lifespan = null;

    this.velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };

    this._setup(sprite);
    this.stage.addChild(this.texture);
  }

  get lifeOver() {
    return this.lifespan <= 0;
  }

  get _touchingTopOrBottom() {
    return (this.texture.position.x + this.velocity.x <= 0 || this.texture.position.x + this.texture.width + this.velocity.x >= this.config.renderer.width);
  }

  get _touchingLeftOrRight() {
    return (this.texture.position.y + this.velocity.y <= 0 || this.texture.position.y + this.texture.height + this.velocity.y >= this.config.renderer.height);
  }

  update(deltaTime) {
    this.lifespan -= 1 * deltaTime;

    this.texture.position.x += (this.velocity.x * this.config.particle.speed) * deltaTime;
    this.texture.position.y += (this.velocity.y * this.config.particle.speed) * deltaTime;

    if (this._touchingTopOrBottom) { this.velocity.x = this.velocity.x * -1; }
    if (this._touchingLeftOrRight) { this.velocity.y = this.velocity.y * -1; }
  }

  _setup(sprite) {
    this.texture = new PIXI.Sprite(sprite);

    this.texture.position.set(Math.random() * (this.config.renderer.width - this.texture.width), Math.random() * (this.config.renderer.height - this.texture.height));

    this.lifespan = Math.floor(Math.random() * (this.config.particle.lifespan.max - this.config.particle.lifespan.min) + this.config.particle.lifespan.min);
  }
}