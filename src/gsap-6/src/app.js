import config from './config.js';

const circles = [...document.querySelectorAll('circle')];
circles.forEach((circle, index) => {
  gsap.set(circle, { fill: config.dots.color });
  gsap.from(circle, { duration: config.dots.duration, scale: config.dots.scale, opacity: config.dots.opacity, ease: config.dots.ease, delay: index * 0.1, repeat: -1, yoyo: true });
});

const swiper = document.getElementById('bounds');
gsap.set(swiper, { color: config.swiper.color });
const maxDist = swiper.scrollWidth - swiper.scrollHeight;

const button = document.getElementById('swipe-btn');
const drag = Draggable.create(button, {
  type: 'x',
  bounds: swiper,
  onDrag: () => unlocking(),
  onDragEnd: () => returning(),
  onClick: () => returning()
});

const message = document.querySelector('.unlock');
function unlocking() {
  if (drag[0].endX < maxDist - config.swiper.offsetSnap) return;

  gsap.set(message, { color: config.message.color });
  gsap.timeline()
    .to(button, { duration: 0, x: maxDist, onCompleat: () => drag[0].disable() })
    .to(message, { duration: 1, opacity: 1 })
    .then(() => returning(true));
}
function returning(bypass = false) {
  if (!bypass && drag[0].endX >= maxDist - config.swiper.offsetSnap) return;

  gsap.to(button, { duration: 2, x: 0, ease: 'power4.out' });
  gsap.to(message, { duration: 1, opacity: 0 });
  drag[0].enable();
}
