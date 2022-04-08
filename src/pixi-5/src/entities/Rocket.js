class Rocket {
  constructor(config, stage, texture, position, data) {
    this.config = config;
    this.stage = stage;
    this.texture = texture;
    this.position = position;

    this.name = data.name;
    this.fuel = data.fuel;
    this.meters = 0;

    this.running = false;

    this._setup();
    this.stage.addChild(this.texture, this.name);
  }

  start() {
    this._startEngine();
  }

  update(deltaTime) {
    if (this.fuel <= 0) {
      if (this.running) { this.drawLine(); }
      return this._stopEngine();
    }

    if (this.running) {
      this.position.y = this.texture.position.y = this.name.position.y -= (this.config.rocket.flying.speed * deltaTime);
      this.fuel -= (this.config.rocket.flying.consumption * this.config.rocket.flying.speed) * deltaTime;
      this.meters += Math.floor(deltaTime);
    }
  }

  drawLine() {
    const randomColor = `0x${Math.floor(Math.random() * 16777215).toString(16)}`;

    const graphic = new PIXI.Graphics();
    graphic
      .lineStyle(1, randomColor)
      .moveTo(this.position.x, this.position.y)
      .lineTo(0, this.position.y);

    this.config.rocket.style.fill = randomColor;
    const text = new PIXI.Text(`Height: ${this.meters}m`, this.config.rocket.style);
    text.anchor.set(0.5, 0);
    text.position.set(this.position.x / 2, this.position.y);

    this.stage.addChild(graphic, text);
    return;
  }

  _setup() {
    this.texture.anchor.set(0.5, 0);
    this.texture.position.set(this.position.x, this.position.y);

    this.name = new PIXI.Text(this.name);
    this.name.anchor.set(0.5, 1);
    this.name.position.set(this.position.x, this.position.y);
  }

  _startEngine() {
    this.running = true;
  }
  _stopEngine() {
    this.running = false;
  }
  _addFuel(amount) {
    this.fuel += amount;
  }
  _removeFuel(amount) {
    this.fuel -= amount;
  }
}

class Merlin extends Rocket {
  constructor(config, stage, texture, position, data) {
    super(config, stage, texture, position, data);
  }
}

export {
  Rocket,
  Merlin
};