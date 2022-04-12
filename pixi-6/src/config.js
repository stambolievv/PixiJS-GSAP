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
  pinata: {
    position: {
      x: 0.5,
      y: 0.2
    },
    wiggle: {
      duration: 0.06,
      rotation: 0.3,
      repeat: 1
    }
  },
  candy: {
    fall: {
      min: 5,
      max: 20,
      offset: 100
    }
  },
  score: {
    position: {
      x: 0,
      y: 1
    },
    style: {
      fontFamily: 'Impact',
      fontSize: 40,
      fill: 'white',
      stroke: 'white',
      align: 'center'
    }
  }
};

export default config;
