export default class Circle {
  constructor(config, stage, mouse) {
    this.config = config;
    this.stage = stage;
    this.mouse = mouse;

    this.graphic = new PIXI.Graphics();

    this.pos = { x: (Math.random() * (this.config.renderer.width + 500)) - 250, y: (Math.random() * (this.config.renderer.height + 500)) - 250 };
    this.dim = { r: Math.random() * (this.config.circle.radius.max - this.config.circle.radius.min) + this.config.circle.radius.min };
    this.color = this.config.circle.color;

    this._draw();
  }

  update(deltaTime) {
    this.graphic.x = (((this.mouse.x - this.config.renderer.width / 2) * this.dim.r) * 0.01) * deltaTime;
    this.graphic.y = (((this.mouse.y - this.config.renderer.height / 2) * this.dim.r) * 0.01) * deltaTime;
  }

  _draw() {
    this.graphic.beginFill(this.color);
    this.graphic.drawCircle(this.pos.x, this.pos.y, this.dim.r);
    this.graphic.endFill();
    this.stage.addChild(this.graphic);
  }
}