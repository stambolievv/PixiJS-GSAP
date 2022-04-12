export default class Circle {
  constructor(config, stage, mouse) {
    this._config = config;
    this._stage = stage;
    this.mouse = mouse;

    this.graphic = new PIXI.Graphics();

    this.pos = { x: (Math.random() * (this._config.renderer.width + 500)) - 250, y: (Math.random() * (this._config.renderer.height + 500)) - 250 };
    this.dim = { r: Math.random() * (this._config.circle.radius.max - this._config.circle.radius.min) + this._config.circle.radius.min };
    this.color = this._config.circle.color;

    this._draw();
  }

  update(deltaTime) {
    this.graphic.x = (((this.mouse.x - this._config.renderer.width / 2) * this.dim.r) * 0.01) * deltaTime;
    this.graphic.y = (((this.mouse.y - this._config.renderer.height / 2) * this.dim.r) * 0.01) * deltaTime;
  }

  _draw() {
    this.graphic.beginFill(this.color);
    this.graphic.drawCircle(this.pos.x, this.pos.y, this.dim.r);
    this.graphic.endFill();
    this._stage.addChild(this.graphic);
  }
}