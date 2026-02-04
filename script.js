const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Number of dots
const numDots = 150;
// Colors for dots: white and red
const colors = ['#FFFFFF', '#FF0000'];

// Dot class
class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.targetX = 0;
    this.targetY = 0;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 3 + 2;
    this.speed = 0.02;
    this.inPlace = false;
  }

  setTarget(t) {
    const scale = 20;
    const x = scale * (16 * Math.pow(Math.sin(t), 3));
    const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    this.targetX = canvas.width / 2 + x;
    this.targetY = canvas.height / 2 - y;
  }

  setRandomTarget() {
    this.targetX = Math.random() * canvas.width;
    this.targetY = Math.random() * canvas.height;
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.x += dx * this.speed;
    this.y += dy * this.speed;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      this.inPlace = true;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const dots = [];
for (let i = 0; i < numDots; i++) {
  const dot = new Dot();
  const t = (i / numDots) * 2 * Math.PI;
  dot.setTarget(t);
  dots.push(dot);
}

let phase = 'forming';

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });

  if (phase === 'forming' && dots.every(dot => dot.inPlace)) {
    phase = 'displaying';
    setTimeout(() => {
      phase = 'scattering';
      dots.forEach(dot => {
        dot.inPlace = false;
        dot.setRandomTarget();
      });
    }, 2000);
  } else if (phase === 'scattering' && dots.every(dot => dot.inPlace)) {
    phase = 'forming';
    dots.forEach((dot, i) => {
      dot.inPlace = false;
      const t = (i / numDots) * 2 * Math.PI;
      dot.setTarget(t);
    });
  }

  if (phase === 'displaying') {
    ctx.font = 'italic bold 48px Arial';
    ctx.fillStyle = '#FF0000';
    ctx.textAlign = 'center';
    ctx.fillText('Will you be my valentine??', canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  dots.forEach((dot, i) => {
    if (phase === 'forming') {
      const t = (i / numDots) * 2 * Math.PI;
      dot.setTarget(t);
    } else {
      dot.setRandomTarget();
    }
  });
});
