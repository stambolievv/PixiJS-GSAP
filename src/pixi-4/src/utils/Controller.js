export default class Controller {
  constructor(config, stage) {
    this._config = config;
    this._stage = stage;

    this.slider = null;
    this.clipboard = null;
    this.sprites = [];
  }

  createSlider() {
    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.min = this._config.slider.min;
    this.slider.max = this._config.slider.max;
    this.slider.value = this._config.slider.value;
    this.slider.step = this._config.slider.step;
    document.body.appendChild(this.slider);
  }

  createMovieFrame(renderer, resources) {
    const { clipboard, assets } = Object.entries(resources).reduce((a, [key, value]) => {
      if (key === 'clipboard') {
        Object.assign(a, { [key]: value.texture });
      } else {
        if (a.hasOwnProperty('assets')) a['assets'].push(value.texture);
        else a['assets'] = [value.texture];
      }

      return a;
    }, {});

    this.clipboard = new PIXI.Sprite(clipboard);
    this.clipboard.anchor.set(0.5, 0.5);

    assets.forEach((texture, index) => {
      const textureContainer = new PIXI.Container();
      textureContainer.addChild(this.clipboard);

      const sprite = new PIXI.Sprite(texture);
      sprite.anchor.set(0.5, 0.5);
      textureContainer.addChild(sprite);

      const baseTexture = renderer.generateTexture(textureContainer);

      const combinedSprite = new PIXI.Sprite(baseTexture);
      combinedSprite.anchor.set(0.5, 0.5);
      combinedSprite.position.set(this._config.renderer.width, this._config.renderer.height / 3);
      combinedSprite.x = this.clipboard.width * index;

      this.sprites.push(combinedSprite);
      this._stage.addChild(combinedSprite);
    });
  }

  updateMovieFrame(deltaTime) {
    this.sprites.forEach(sprite => {
      sprite.x -= (this.slider.value * this._config.scrolling.multiplier) * deltaTime;

      if (sprite.x + sprite.width / 2 <= 0) sprite.x += this.clipboard.width * this.sprites.length;

      sprite.filters = this.slider.value >= this._config.scrolling.blur.applyAfter ? [new PIXI.filters.BlurFilterPass(this._config.scrolling.blur.horizontal, this.slider.value, 1)] : [];
    });
  }
}
