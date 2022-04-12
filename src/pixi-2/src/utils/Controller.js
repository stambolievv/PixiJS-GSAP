import Circle from '../entities/Circle.js';

export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.circles = [];
  }

  createCircle(mouse) {
    this.circles.push(new Circle(this._config, this._stage, mouse));
  }

  updateCircles(deltaTime) {
    this.circles.forEach(circle => {
      circle.update(deltaTime);

      if (circle.isFaded) {
        this.circles.splice(this.circles.indexOf(circle), 1);
        circle.graphic.destroy();
      }
    });
  }
}