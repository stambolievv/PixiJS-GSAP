import Pinata from '../entities/Pinata.js';
import Candy from '../entities/Candy.js';

export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.pinata = null;
    this.candies = [];
    this.score = null;
    this.scorePoints = 0;
  }

  createPinata(resources) {
    const { pokenata, candies } = Object.entries(resources).reduce((a, [key, value]) => {
      if (key === 'pokenata') {
        Object.assign(a, { [key]: value.texture });
      } else {
        if (a.hasOwnProperty('candies')) a['candies'].push(value.texture);
        else a['candies'] = [value.texture];
      }

      return a;
    }, {});

    this.pinata = new Pinata(this._config, this._stage, pokenata);
    this._hitPinata(candies);
  }

  updateCandy(deltaTime) {
    this.candies.forEach((candy, index) => {
      candy.update(deltaTime);

      if (candy.isOutOfBounds) {
        this.candies.splice(index, 1);
        candy.sprite.destroy();
        this._updateScore();
      }
    });
  }

  setScore() {
    this.score = new PIXI.Text('', this._config.score.style);
    this.score.anchor.set(this._config.score.position.x, this._config.score.position.y);
    this.score.position.set(this._config.score.position.x * this._config.renderer.width, this._config.score.position.y * this._config.renderer.height);

    this._stage.addChild(this.score);
    this._updateScore(true);
  }

  _updateScore(init = false) {
    if (!init) this.scorePoints += 1;
    this.score.text = 'SCORE: ' + this.scorePoints;
    this.score.updateText();
  }

  _hitPinata(candies) {
    this.pinata.sprite.on('click', () => {
      if (this.pinata.sprite.rotation === 0) {
        gsap.to(this.pinata.sprite, {
          duration: this._config.pinata.wiggle.duration,
          rotation: this._config.pinata.wiggle.rotation,
          yoyo: true,
          repeat: this._config.pinata.wiggle.repeat
        });
        this._createCandy(candies);
      }
    }, { once: true });
  }


  _createCandy(textures) {
    const randomIndex = Math.floor(Math.random() * textures.length);

    const texture = textures[randomIndex];
    const spawnPoint = { x: this.pinata.sprite.x, y: this.pinata.sprite.position.y + (this.pinata.sprite.height * (1 - this.pinata.sprite.anchor.y)) };

    const candy = new Candy(this._config, this._stage, texture, spawnPoint);
    this.candies.push(candy);
  }
}
