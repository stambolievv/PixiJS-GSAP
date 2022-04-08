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
    backgroundAlpha: false
  },
  crawl: {
    heading: {
      position: {
        x: 0.5,
        y: 0.5
      },
      ease: {
        size: 1,
        in: 2,
        delay: 100,
        out: 5,
      },
      style: {
        fontFamily: 'Courier New',
        fontSize: 60,
        fontWeight: 500,
        fill: 0x3333ff,
        align: 'center'
      }
    },
    main: {
      position: {
        x: 0.5,
        y: 1
      },
      scrolling: {
        speed: 2
      },
      style: {
        fontFamily: 'Courier New',
        fontSize: 70,
        fontWeight: 700,
        fill: 0xeebb00,
        align: 'center'
      }
    }
  }
};

export default config;