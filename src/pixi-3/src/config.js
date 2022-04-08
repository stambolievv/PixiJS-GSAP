const { innerWidth, innerHeight, devicePixelRatio } = window;

const config = {
  renderer: {
    width: innerWidth,
    height: innerHeight,
    autoDensity: true,
    antialias: true,
    resolution: devicePixelRatio,
    resizeTo: window,
    backgroundColor: 0x111131,
    backgroundAlpha: true
  },
  circle: {
    radius: {
      min: 2,
      max: 20
    },
    color: '0xd35400',
    intensity: 500
  }
};

export default config;
