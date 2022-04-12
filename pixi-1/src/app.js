import config from './config.js';

const app = new PIXI.Application(config.renderer);
document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

app.loader
  .add('text', './assets/data/text.json')
  .load(({ resources }) => {
    const { heading, main } = resources['text'].data;
    setHeadingText(heading, main);
  });

function setHeadingText(headingData, mainData) {
  const headingText = new PIXI.Text(headingData, config.crawl.heading.style);

  headingText.anchor.set(0.5, 0.5);
  headingText.position.set(config.crawl.heading.position.x * config.renderer.width, config.crawl.heading.position.y * config.renderer.height);
  headingText.scale.set(0);
  headingText.alpha = 0;

  stage.addChild(headingText);

  const interval = setInterval(() => {
    if (headingText.scale.x >= config.crawl.heading.ease.size) {
      if (config.crawl.heading.ease.delay <= 0) {
        if (headingText.alpha <= 0) {
          stage.removeChild(headingText);
          setCanvasPerspective(2, 0.2);
          setMainText(mainData);
          return clearInterval(interval);
        }

        return headingText.alpha -= (config.crawl.heading.ease.out / config.crawl.heading.ease.size) * 0.001;
      }

      return config.crawl.heading.ease.delay -= 0.1;
    }
    headingText.y -= config.crawl.heading.ease.in * 0.001;
    headingText.scale.x = headingText.scale.y += config.crawl.heading.ease.in * 0.001;
    headingText.alpha += (config.crawl.heading.ease.in / config.crawl.heading.ease.size) * 0.001;
  });
}

function setMainText(mainData) {
  const mainText = new PIXI.Text(mainData, config.crawl.main.style);

  mainText.anchor.set(0.5, 0);
  mainText.position.set(config.crawl.main.position.x * config.renderer.width, config.crawl.main.position.y * config.renderer.height * 5);

  stage.addChild(mainText);

  app.ticker.add((deltaTime) => {
    if (mainText.y < -config.renderer.height * 2) { mainText.y = config.renderer.height * 5; }
    mainText.y -= config.crawl.main.scrolling.speed * deltaTime;
  });
}

function setCanvasPerspective(px, deg) {
  app.renderer.resize(config.renderer.width, config.renderer.height * 10);

  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.top = `-${400}%`;

  const perspective = `perspective(${px}px) rotateX(${deg}deg)`;
  app.renderer.view.style.transform = perspective;
  app.renderer.view.style.webkitTransform = perspective;
  app.renderer.view.style.MozTransform = perspective;
  app.renderer.view.style.msTransform = perspective;
  app.renderer.view.style.OTransform = perspective;
  app.renderer.view.style.transform = perspective;
}