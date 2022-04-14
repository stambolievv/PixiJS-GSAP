const list = document.querySelector('[data-anim=list]');
const listBg = document.querySelector('[data-anim=list-bg]');
const items = document.querySelectorAll('[data-anim=list-item]');
const ripple = document.querySelector('[data-anim=ripple]');
const btnBg = document.querySelector('[data-anim=btn-bg]');
const btnLabel = document.querySelector('[data-anim=btn-label]');
const btnShadow = document.querySelector('[data-anim=btn-shadow]');
const frontGroup = document.querySelector('[data-anim=front-group]');
const frontWheels = document.querySelectorAll('[data-anim=front-wheel]');
const frontWheelBack = document.querySelector('[data-anim=front-wheel-back]');
const backWheels = document.querySelectorAll('[data-anim=back-wheel]');
const backWheelsBack = document.querySelectorAll('[data-anim=back-wheel-back]');
const containerParts = document.querySelectorAll('[data-anim=container-part]');
const containerLip = document.querySelector('[data-anim=container-lip]');
const container = document.querySelector('[data-anim=container]');
const truckBtn = document.querySelector('[data-anim=truck-btn]');
const shippedBtn = document.querySelector('[data-anim=btn-shipped]');

const btnArea = document.querySelector('[data-click=btn]');
btnArea.addEventListener('click', () => {
  shipItTimeline.restart();
});

const btnPause = document.querySelector('.btn-pause');
btnPause.addEventListener('click', () => {
  if (shipItTimeline.paused()) {
    shipItTimeline.resume();
    btnPause.textContent = 'pause';
  } else {
    shipItTimeline.pause();
    btnPause.textContent = 'resume';
  }
});

const btnReverse = document.querySelector('.btn-reverse');
btnReverse.addEventListener('click', () => {
  btnPause.textContent = 'pause';
  shipItTimeline.reverse().then(reset);
});

const shipItTimeline = gsap.timeline({ paused: true, onComplete: reset });
const buttonTimeline = gsap.timeline({ paused: true });
const listTimeline = gsap.timeline({ defaults: { duration: 0.15 }, paused: true });
const truckTimeline = gsap.timeline({ defaults: { duration: 0.5 }, paused: true });

function reset() {
  const resetTimeline = gsap.timeline({ paused: true });
  resetTimeline
    .set(items, { y: 0 })
    .set(truckBtn, { x: 0 })
    .set(frontGroup, { x: -45, y: -6, scale: 0.84, transformOrigin: 'left,top', autoAlpha: 1 })
    .set([frontWheels, frontWheelBack], { y: -25, autoAlpha: 1 })
    .set(frontWheels[1], { autoAlpha: 0 })
    .set(container, { scale: 0.98, transformOrigin: 'right,top', autoAlpha: 1 })
    .set([containerParts, containerLip], { y: -15, autoAlpha: 1 })
    .set(containerParts[2], { autoAlpha: 0.5 })
    .set([backWheels, backWheelsBack], { y: -30, autoAlpha: 1 })
    .to(items, { duration: 0.5, autoAlpha: 1, y: 0, ease: 'power1.inOut' })
    .to(truckBtn, { duration: 0.5, autoAlpha: 1, ease: 'power1.inOut' });

  resetTimeline.restart();
}

shipItTimeline
  .add(buttonTimeline.play())
  .add(listTimeline.play())
  .add(truckTimeline.play());

buttonTimeline
  .fromTo(btnShadow, { duration: 0, autoAlpha: 1 }, { autoAlpha: 0 })
  .fromTo(ripple, { duration: 0.5, autoAlpha: 0.5, scale: 0 }, { autoAlpha: 0, scale: 20, transformOrigin: 'center', ease: 'power1.out' });

listTimeline
  .to(list, { duration: 0.3, ease: 'power1.inOut' })
  .to(list, { duration: 0.05, y: 0, ease: 'power1.in' })
  .fromTo(items[0], { y: 0 }, { y: 85 })
  .fromTo(items[1], { y: 0 }, { y: 138 })
  .fromTo(items[2], { y: 0 }, { y: 178 })
  .fromTo(items, { duration: 0, autoAlpha: 1 }, { autoAlpha: 0 })
  .to([btnBg, btnLabel], { scaleX: 1.05, transformOrigin: 'center', ease: 'power1.inOut', repeat: 1, yoyo: true })
  .to([btnBg, btnLabel], { scaleY: 0.95, ease: 'power1.inOut', repeat: 1, yoyo: true });

truckTimeline
  .set(frontGroup, { duration: 1, x: -45, scale: 0.84, transformOrigin: 'left top', autoAlpha: 1 })
  .set([frontWheels, frontWheelBack], { duration: 1, y: -25, autoAlpha: 1 })
  .set(frontWheels[1], { duration: 1, autoAlpha: 0 })
  .set(container, { duration: 1, scale: 0.98, transformOrigin: 'right top', autoAlpha: 1 })
  .set([containerParts, containerLip], { duration: 1, y: -15, autoAlpha: 1 })
  .set(containerParts[2], { duration: 1, autoAlpha: 0.5 })
  .set([backWheels, backWheelsBack], { duration: 1, y: -30, autoAlpha: 1 })
  .to(container, { scale: 1 })
  .to(containerParts, { y: 0, stagger: 0.2 }, -0.1)
  .to(containerLip, { y: 0 })
  .to(backWheelsBack, { y: 0, stagger: 0.55 }, -0.1)
  .to(backWheels, { y: 0, stagger: 0.6 }, 0.1)
  .to(frontGroup, { scale: 1, x: 0, ease: 'back.out(1.4)' })
  .to(frontWheelBack, { y: 0 })
  .to(frontWheels, { duration: 1, y: 0, ease: 'back.out(5.4)' })
  .to(frontWheels[1], { duration: 0, autoAlpha: 1 })
  .to(shippedBtn, { duration: 0, autoAlpha: 1 })
  .fromTo(truckBtn, { duration: 1, x: 0 }, { x: '+=1000', ease: 'back.in(0.5)' })
  .fromTo(truckBtn, { duration: 1, autoAlpha: 1 }, { autoAlpha: 0, ease: 'power1.in' });
