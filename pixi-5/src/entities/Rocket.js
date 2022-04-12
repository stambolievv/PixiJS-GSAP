class Rocket {
  constructor(config, stage, texture, position, data) {
    this._config = config;
    this._stage = stage;
    this.position = position;
    this.name = data.name;
    this.fuel = data.fuel;

    this.sprite = null;
    this.running = false;
    this.meters = 0;

    this._setup(texture);
    this._stage.addChild(this.sprite, this.name);
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
      this.position.y = this.sprite.position.y = this.name.position.y -= (this._config.rocket.flying.speed * deltaTime);
      this.fuel -= (this._config.rocket.flying.consumption * this._config.rocket.flying.speed) * deltaTime;
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

    this._config.rocket.style.fill = randomColor;
    const text = new PIXI.Text(`Height: ${this.meters}m`, this._config.rocket.style);
    text.anchor.set(0.5, 0);
    text.position.set(this.position.x / 2, this.position.y);

    this._stage.addChild(graphic, text);
    return;
  }

  _setup(texture) {
    this.sprite = new PIXI.Sprite(texture);

    this.sprite.anchor.set(0.5, 0);
    this.sprite.position.set(this.position.x, this.position.y);

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