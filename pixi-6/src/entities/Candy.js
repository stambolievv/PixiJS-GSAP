export default class Candy {
  constructor(config, stage, texture, position) {
    this._config = config;
    this._stage = stage;


    this.sprite = null;
    this.velocity = null;

    this._setup(texture, position);
    this._stage.addChild(this.sprite);
  }

  get isOutOfBounds() {
    const biggerSide = this.sprite.width > this.sprite.height ? this.sprite.width : this.sprite.height;
    return this.sprite.position.y - biggerSide - this.velocity > this._config.renderer.height;
  }

  update(deltaTime) {
    this.sprite.rotation += this.velocity * deltaTime * 0.01;
    this.sprite.position.y += this.velocity * deltaTime;
  }

  _setup(texture, position) {
    const spawnPoint = {
      x: Math.floor(Math.random() * ((position.x + this._config.candy.fall.offset) - (position.x - this._config.candy.fall.offset)) + (position.x - this._config.candy.fall.offset)),
      y: position.y
    };

    this.sprite = new PIXI.Sprite(texture);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(spawnPoint.x, spawnPoint.y);

    this.velocity = Math.random() * (this._config.candy.fall.max - this._config.candy.fall.min) + this._config.candy.fall.min;
  }
}