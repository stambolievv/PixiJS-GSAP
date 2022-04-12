import { request } from '../api/api.js';
import { Rocket, Merlin } from '../entities/Rocket.js';

export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.rockets = [];
  }

  async createRockets(resources) {
    const assets = Object.entries(resources).reduce((a, [key, value]) => Object.assign(a, { [key]: value.texture }), {});

    const rocketsData = await request('https://api.spacexdata.com/v2/rockets');

    rocketsData.forEach((rocket, index, data) => {
      const texture = assets[rocket.type]

      const spawnPoint = { x: ((this._config.renderer.width - data.length * (texture.width / 2)) / data.length) * (index + 1), y: this._config.renderer.height - texture.height };
      const rocketData = { 'name': rocket.name, 'fuel': rocket.first_stage.fuel_amount_tons + rocket.second_stage.fuel_amount_tons };

      if (rocket.type == 'rocket') { return this.rockets.push(new Rocket(this._config, this._stage, texture, spawnPoint, rocketData)); }
      if (rocket.type == 'merlin') { return this.rockets.push(new Merlin(this._config, this._stage, texture, spawnPoint, rocketData)); }
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
