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
  scrolling: {
    multiplier: 5,
    blur: {
      applyAfter: 5,
      horizontal: true
    }
  }
};

export default config;
