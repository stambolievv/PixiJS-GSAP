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
  rocket: {
    flying: {
      speed: 1,
      consumption: 6
    },
    style: {
      fontFamily: 'Arial',
      fontSize: 24,
      align: 'center'
    }
  }
};

export default config;