export default class Controller {
  constructor(config, stage) {
    this.config = config;
    this.stage = stage;

    this.clipboard = null;
    this.sprites = [];
  }

  createMovieFrame(renderer, resources) {
    const { clipboard, assets } = Object.entries(resources).reduce((a, [key, value]) => {
      if (key == 'clipboard') {
        Object.assign(a, { [key]: value.texture });
      } else {
        if (a.hasOwnProperty('assets')) {
          a['assets'].push(value.texture);
        } else {
          a['assets'] = [value.texture];
        }
      }
      return a;
    }, {});

    this.clipboard = new PIXI.Sprite(clipboard);
    this.clipboard.anchor.set(0.5, 0.5);

    assets.forEach((asset, index) => {
      const textureContainer = new PIXI.Container();
      textureContainer.addChild(this.clipboard);

      const sprite = new PIXI.Sprite(asset);
      sprite.anchor.set(0.5, 0.5);
      textureContainer.addChild(sprite);

      const texture = renderer.generateTexture(textureContainer);

      const combinedSprite = new PIXI.Sprite(texture);
      combinedSprite.anchor.set(0.5, 0.5);
      combinedSprite.position.set(this.config.renderer.width, this.config.renderer.height / 3);
      combinedSprite.x = this.clipboard.width * index;

      this.sprites.push(combinedSprite);
      this.stage.addChild(combinedSprite);
    });
  }

  updateMovieFrame(deltaTime, sliderValue) {
    this.sprites.forEach(sprite => {
      sprite.x -= (sliderValue * this.config.scrolling.multiplier) * deltaTime;

      if (sprite.x + sprite.width / 2 <= 0) { sprite.x += this.clipboard.width * this.sprites.length; }

      sprite.filters = sliderValue >= this.config.scrolling.blur.applyAfter ? [new PIXI.filters.BlurFilterPass(this.config.scrolling.blur.horizontal, sliderValue, 1)] : [];
    });
  }
}
