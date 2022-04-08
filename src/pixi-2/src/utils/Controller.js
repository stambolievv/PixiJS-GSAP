import Circle from '../entities/Circle.js';

export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.circles = [];
  }

  createCircle(mouse) {
    this.circles.push(new Circle(this.config, this.stage, mouse));
  }

  updateCircle(deltaTime) {
    this.circles.forEach(circle => {
      circle.update(deltaTime);

      if (circle.isFaded) {
        this.circles.splice(this.circles.indexOf(circle), 1);
        circle.graphic.destroy();
      }
    });
  }
}