export default class Pinata {
  constructor(config, stage, texture) {
    this._config = config;
    this._stage = stage;

    this.sprite = null;

    this._setup(texture);
    this._stage.addChild(this.sprite);
  }

  _setup(texture) {
    this.sprite = new PIXI.Sprite(texture);

    this.sprite.anchor.set(this._config.pinata.position.x, this._config.pinata.position.y);
    this.sprite.position.set(this._config.renderer.width * this._config.pinata.position.x, this._config.renderer.height * this._config.pinata.position.y);

    this.sprite.interactive = true;
  }
}