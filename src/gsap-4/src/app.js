import config from './config.js';

const wrapper = document.getElementById('wrapper');
const fidget = document.getElementById('fidget-spinner');

gsap.set(fidget, { scale: config.fidget.scale });
Draggable.create(wrapper, {
  trigger: fidget,
  type: 'rotation',
  inertia: true,
  cursor: config.fidget.cursor
});