import Circle from '../entities/Circle.js';

export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.circles = [];
  }

  createCircle(mouse) {
    if (this.circles.length >= this._config.circle.intensity) { return; }

    for (let i = 0; i < this._config.circle.intensity; i++) {
      this.circles.push(new Circle(this._config, this._stage, mouse));
    }
  }

  updateCircle(deltaTime) {
    this.circles.forEach(circle => circle.update(deltaTime));
  }
}
