import Pinata from '../entities/Pinata.js';
import Candy from '../entities/Candy.js';

export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.pinata = null;
    this.candies = [];
    this.score = null;
    this.scorePoints = 0;
  }

  createPinata(resources) {
    
    const { pokenata, candies } = Object.entries(resources).reduce((a, [key, value]) => {
      if (key == 'pokenata') {
        Object.assign(a, { [key]: value.texture });
      } else {
        if (a.hasOwnProperty('candies')) {
          a['candies'].push(value.texture);
        } else {
          a['candies'] = [value.texture];
        }
      }
      return a;
    }, {});

    this.pinata = new Pinata(this.config, this.stage, pokenata);
    this._hitPinata(candies);
  }

  updateCandy(deltaTime) {
    this.candies.forEach((candy, index) => {
      candy.update(deltaTime);
      if (candy.isOutOfBounds) {
        this.candies.splice(index, 1);
        candy.texture.destroy();
        this._updateScore();
      }
    });
  }

  setScore() {
    this.score = new PIXI.Text('', this.config.score.style);
    this.score.anchor.set(this.config.score.position.x, this.config.score.position.y);
    this.score.position.set(this.config.score.position.x * this.config.renderer.width, this.config.score.position.y * this.config.renderer.height);

    this.stage.addChild(this.score);
    this._updateScore(true);
  }

  _updateScore(init = false) {
    if(!init){ this.scorePoints += 1; }
    this.score.text = 'SCORE: ' + this.scorePoints;
    this.score.updateText();
  }

  _hitPinata(candies) {
    this.pinata.texture.on('click', () => {
      if (this.pinata.texture.rotation == 0) {
        gsap.to(
          this.pinata.texture,
          this.config.pinata.wiggle.duration,
          { rotation: this.config.pinata.wiggle.rotation, yoyo: true, repeat: this.config.pinata.wiggle.repeat }
        );
        this._createCandy(candies);
      }
    }, { once: true });
  }


  _createCandy(sprites) {
    const randomIndex = Math.floor(Math.random() * sprites.length);

    const sprite = sprites[randomIndex];
    const spawnPoint = { x: this.pinata.texture.x, y: this.pinata.texture.position.y + (this.pinata.texture.height * (1 - this.pinata.texture.anchor.y)) };

    const candy = new Candy(this.config, this.stage, sprite, spawnPoint);
    this.candies.push(candy);
  }
}
