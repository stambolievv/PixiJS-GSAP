const { innerWidth, innerHeight, devicePixelRatio } = window;

const config = {
  renderer: {
    width: innerWidth,
    height: innerHeight,
    autoDensity: true,
    antialias: true,
    resolution: devicePixelRatio,
    resizeTo: window,
    backgroundColor: 0xffffff,
    backgroundAlpha: true
  },
  particle: {
    intensity: 10000,
    speed: 3,
    lifespan: {
      min: 150,
      max: 300
    }
  }
};

export default config;
