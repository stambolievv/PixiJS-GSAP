import config from './config.js';

const [gap, ...dots] = createElements();
startSineWave(gap);

function startSineWave(gap) {
  // initial state
  gsap.to(dots, { duration: 0, y: 0, backgroundColor: '#a7ce01', onComplete: animate });

  function animate() {
    let count = 0;
    const checkForRestart = () => { if (++count == dots.length) { startSineWave(gap); } };

    dots.forEach((dot, index) => {
      if (dot._gsap) { gsap.killTweensOf(dot); }
      gsap.to(dot, { delay: (index * gap) / 2, y: 50, backgroundColor: 'orange', repeat: 1, yoyo: true, onComplete: checkForRestart });
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
  Array.from({ length: config.dots }, () => {
    const div = document.createElement('div');
    div.classList.add('dot');
    dotsContainer.appendChild(div);
  });

  return [dropDown.value, ...dotsContainer.children];
}