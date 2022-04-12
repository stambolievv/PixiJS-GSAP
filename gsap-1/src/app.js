import config from './config.js';

const children = document.querySelectorAll('.child');

children.forEach(child => {
  child.addEventListener('mouseout', (e) => mouseOut());
  child.addEventListener('mouseover', (e) => mouseOver(child));
});

gsap.to(children, { width: `${100 / children.length}%` });

function mouseOver(child) {
  gsap.to(child, { duration: config.duration, width: `${config.stretch}%` });

  const siblings = [...children].filter(element => element != child);
  gsap.to(siblings, { duration: config.duration, width: `${(100 - config.stretch) / (children.length - 1)}%` });
}

function mouseOut() {
  gsap.to(children, { duration: config.duration, width: `${100 / children.length}%`, ease: config.ease });
}