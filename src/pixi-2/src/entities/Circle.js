export default class Circle {
  constructor(config, stage, mouse) {
    this.config = config;
    this.stage = stage;
    this.mouse = mouse;

    this.graphic = new PIXI.Graphics();

    this.pos = this._setPosition();
    this.dim = { r: this.config.circle.radius };
    this.color = `0x${Math.floor(Math.random() * 16777215).toString(16)}`;

    this._draw();
  }

  get isFaded() {
    return this.graphic.scale.x <= 0;
  }

  update(deltaTime) {
    this.graphic.scale.x = this.graphic.scale.y -= (this.config.circle.scaling * 0.01) * deltaTime;
  }

  _setPosition() {
    const max = {
      x: this.mouse.x + this.config.circle.offset,
      y: this.mouse.y + this.config.circle.offset
    };
    const min = {
      x: this.mouse.x - this.config.circle.offset,
      y: this.mouse.y - this.config.circle.offset
    };

    return {
      x: Math.random() * (max.x - min.x) + min.x,
      y: Math.random() * (max.y - min.y) + min.y
    };
  }

  _draw() {
    this.graphic.beginFill(this.color);
    this.graphic.alpha = this.config.circle.alpha;
    this.graphic.drawCircle(this.pos.x, this.pos.y, this.dim.r);
    this.graphic.endFill();
    
    this.graphic.pivot.set(this.pos.x, this.pos.y);
    this.graphic.position.set(this.pos.x, this.pos.y);
    
    this.stage.addChild(this.graphic);
  }
}
