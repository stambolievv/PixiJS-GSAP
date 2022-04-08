import { request } from '../api/api.js';
import { Rocket, Merlin } from '../entities/Rocket.js';

export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.rockets = [];
  }

  async createRockets(resources) {
    const assets = Object.entries(resources).reduce((a, [key, value]) => Object.assign(a, { [key]: value.texture }), {});

    const rocketsData = await request('https://api.spacexdata.com/v2/rockets');

    rocketsData.forEach((rocket, index, data) => {
      const sprite = new PIXI.Sprite(assets[rocket.type]);

      const spawnPoint = { x: ((this.config.renderer.width - data.length * 100) / data.length) * (index + 1), y: this.config.renderer.height - sprite.height };
      const rocketData = { 'name': rocket.name, 'fuel': rocket.first_stage.fuel_amount_tons + rocket.second_stage.fuel_amount_tons };

      if (rocket.type == 'rocket') { return this.rockets.push(new Rocket(this.config, this.stage, sprite, spawnPoint, rocketData)); }
      if (rocket.type == 'merlin') { return this.rockets.push(new Merlin(this.config, this.stage, sprite, spawnPoint, rocketData)); }
    });

    return this._start();
  }

  updateRockets(deltaTime) {
    this.rockets.forEach(rocket => rocket.update(deltaTime));
  }

  _start() {
    this.rockets.forEach(rocket => rocket.start());
  }
}
