const { innerWidth, innerHeight, devicePixelRatio } = window;

const config = {
  renderer: {
    width: innerWidth,
    height: innerHeight,
    autoDensity: true,
    antialias: true,
    resolution: devicePixelRatio,
    resizeTo: window,
    backgroundColor: 0x000000,
    backgroundAlpha: true
  },
  circle: {
    radius: 20,
    offset: 30,
    alpha: 0.5,
    scaling: 2
  }
};

export default config;
