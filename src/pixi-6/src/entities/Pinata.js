export default class Pinata {
  constructor(config, stage, sprite) {
    this.config = config;
    this.stage = stage;

    this.texture = null;

    this._setup(sprite);
    this.stage.addChild(this.texture);
  }

  _setup(sprite) {
    this.texture = new PIXI.Sprite(sprite);

    this.texture.anchor.set(this.config.pinata.position.x, this.config.pinata.position.y);
    this.texture.position.set(this.config.renderer.width * this.config.pinata.position.x, this.config.renderer.height * this.config.pinata.position.y);

    this.texture.interactive = true;
  }
}