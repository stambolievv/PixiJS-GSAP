export default class Candy {
  constructor(config, stage, sprite, position) {
    this.config = config;
    this.stage = stage;


    this.texture = null;
    this.velocity = null;

    this._setup(sprite, position);
    this.stage.addChild(this.texture);
  }

  get isOutOfBounds() {
    const biggerSide = this.texture.width > this.texture.height ? this.texture.width : this.texture.height;
    return this.texture.position.y - biggerSide - this.velocity > this.config.renderer.height;
  }

  update(deltaTime) {
    this.texture.rotation += this.velocity * deltaTime * 0.01;
    this.texture.position.y += this.velocity * deltaTime;
  }

  _setup(sprite, position) {
    const spawnPoint = {
      x: Math.floor(Math.random() * ((position.x + this.config.candy.fall.offset) - (position.x - this.config.candy.fall.offset)) + (position.x - this.config.candy.fall.offset)),
      y: position.y
    };

    this.texture = new PIXI.Sprite(sprite);

    this.texture.anchor.set(0.5, 0.5);
    this.texture.position.set(spawnPoint.x, spawnPoint.y);

    this.velocity = Math.random() * (this.config.candy.fall.max - this.config.candy.fall.min) + this.config.candy.fall.min;
  }
}