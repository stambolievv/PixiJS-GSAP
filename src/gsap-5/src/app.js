const container = document.getElementById('container');
const draggable = document.getElementById('draggable');

const distance = Math.sqrt((container.offsetWidth / 2) * (container.offsetHeight / 2));
const origin = { x: 0, y: 0 };

const drag = Draggable.create(draggable, {
  type: 'x,y',
  onDragStart: self => {
    origin.x = self.x;
    origin.y = self.y;
  },
  onDrag: self => {
    const dist = Math.sqrt(((origin.x - self.x) ** 2) + ((origin.y - self.y) ** 2));
    if (dist >= distance) drag[0].endDrag();
  },
  onDragEnd: () => {
    gsap.to(draggable, { x: 0, y: 0, ease: 'Elastic.easeOut' });
  }
});