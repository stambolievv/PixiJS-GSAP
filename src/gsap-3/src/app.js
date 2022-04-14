import config from './config.js';

const [gap, ...dots] = createElements();
const tweens = [];

startSineWave(gap);
function startSineWave(gap) {
  gsap.to(dots, { duration: 0, y: 0, backgroundColor: config.dots.color.from, onComplete: animate });

  function animate() {
    let count = 0;
    const checkForRestart = () => { if (++count == dots.length) { startSineWave(gap); } };

    tweens.forEach(tween => tween.kill());
    tweens.length = 0;

    dots.forEach((dot, index) => {
      const tween = gsap.to(dot, { delay: (index * gap) / 2, y: config.dots.jump, backgroundColor: config.dots.color.to, repeat: 1, yoyo: true, onComplete: checkForRestart });
      tweens.push(tween);
    });
  }
}

function createElements() {
  const dotsContainer = document.querySelector('.dots-container');
  const inputContainer = document.querySelector('.input-container');

  const dropDown = document.createElement('select');
  dropDown.addEventListener('change', (e) => startSineWave(e.target.value));
  inputContainer.appendChild(dropDown);

  config.selection.forEach(select => {
    const option = document.createElement('option');
    option.value = option.textContent = select;
    dropDown.appendChild(option);
  });
  Array.from({ length: config.dots.length }, () => {
    const div = document.createElement('div');
    div.classList.add('dot');
    dotsContainer.appendChild(div);
  });

  return [dropDown.value, ...dotsContainer.children];
}