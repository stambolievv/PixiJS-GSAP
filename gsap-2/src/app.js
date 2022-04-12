import config from './config.js';

const ufo = document.getElementById('ufo');
const beam = document.getElementById('beam');
const cow = document.getElementById('cow');

const timeLine = gsap.timeline({ repeat: -1 });
timeLine
  .from(ufo, { duration: config.ufo.incoming, x: window.innerWidth + config.ufo.offset })
  .to(beam, { duration: config.beam.lightUp, opacity: 1 })
  .to(cow, { duration: config.cow.levitate, y: ufo._gsap.y })
  .to(beam, { duration: config.beam.wentOut, opacity: 0 })
  .to(cow, { opacity: 0 })
  .to(ufo, config.ufo.outgoing, { x: -config.ufo.offset });
