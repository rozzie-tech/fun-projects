const giftBox = document.getElementById('giftBox');
const questionBox = document.getElementById('questionBox');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

let yesSize = 1;
let noSize = 1;

/* Gift Box Opening */
giftBox.addEventListener('click', () => {
  giftBox.classList.add('open');
  setTimeout(() => {
    questionBox.classList.add('show');
  }, 1200);
});

/* NO Button Behavior */
noBtn.addEventListener('click', () => {
  yesSize += 0.2;
  noSize -= 0.2;
  yesBtn.style.transform = `scale(${yesSize})`;
  noBtn.style.transform = `scale(${Math.max(noSize, 0.1)})`;
  if (noSize <= 0.2) {
    noBtn.style.display = 'none';
  }
});

/* YES Button Behavior */
yesBtn.addEventListener('click', () => {
  launchConfetti();
});

/* Fireworks/Confetti Effect */
function launchConfetti() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 300; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 80%, 30%)` // Darker colors
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
