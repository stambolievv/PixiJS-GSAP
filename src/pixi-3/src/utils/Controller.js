import Circle from '../entities/Circle.js';

export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.circles = [];
  }

  createCircle(mouse) {
    if (this.circles.length >= this.config.circle.intensity) { return; }

    for (let i = 0; i < this.config.circle.intensity; i++) {
      this.circles.push(new Circle(this.config, this.stage, mouse));
    }
  }

  updateCircle(deltaTime) {
    this.circles.forEach(circle => circle.update(deltaTime));
  }
}
