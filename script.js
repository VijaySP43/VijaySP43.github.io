// Mobile nav toggle
const btn = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
btn.addEventListener('click', () => menu.classList.toggle('open'));

// Year
document.getElementById('y')?.textContent = new Date().getFullYear();

// Rotating tagline (typewriter-style)
const lines = [
  "Embedded Systems • Real-time thinking.",
  "Automotive Tech • Smarter mobility.",
  "Kalman • LSTM • Sensor Fusion.",
  "C / C++ • OOP • SQL."
];
const rotator = document.getElementById('rotator');
const cursor = document.querySelector('.cursor');
let li = 0, ci = 0, typing = true;

function typeLoop() {
  if (!rotator) return;
  if (typing) {
    rotator.textContent = lines[li].slice(0, ci++);
    if (ci > lines[li].length + 8) typing = false; // pause at end
  } else {
    rotator.textContent = lines[li].slice(0, ci--);
    if (ci === 0) { typing = true; li = (li + 1) % lines.length; }
  }
  setTimeout(typeLoop, typing ? 60 : 40);
}
typeLoop();

// IntersectionObserver for reveal animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Projects: mouse glow parallax
document.querySelectorAll('.proj').forEach(card => {
  const glow = card.querySelector('.glow');
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glow.style.setProperty('--mx', x + '%');
    glow.style.setProperty('--my', y + '%');
  });
});

// Subtle parallax on hero layers
const stars = document.querySelector('.stars');
const nebula = document.querySelector('.nebula');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (stars) stars.style.transform = `translateY(${y * 0.08}px)`;
  if (nebula) nebula.style.transform = `translateY(${y * 0.14}px)`;
});

// Skills Constellation (lightweight canvas animation)
const c = document.getElementById('constellation');
if (c) {
  const ctx = c.getContext('2d');
  const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
  function fitCanvas() {
    const rect = c.getBoundingClientRect();
    c.width = rect.width * DPR; c.height = rect.height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  fitCanvas(); addEventListener('resize', fitCanvas);

  const N = 42;
  const pts = Array.from({length:N}, () => ({
    x: Math.random()*c.clientWidth,
    y: Math.random()*c.clientHeight,
    vx: (Math.random()*1.2-0.6), vy: (Math.random()*1.2-0.6)
  }));
  function draw() {
    ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
    // points
    pts.forEach(p => {
      p.x += p.vx*0.25; p.y += p.vy*0.25;
      if (p.x<0||p.x>c.clientWidth) p.vx*=-1;
      if (p.y<0||p.y>c.clientHeight) p.vy*=-1;
      ctx.fillStyle = '#cfe9ff';
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.1, 0, Math.PI*2); ctx.fill();
    });
    // links
    for (let i=0;i<N;i++){
      for (let j=i+1;j<N;j++){
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
        const d2 = dx*dx+dy*dy;
        if (d2 < 120*120){
          const a = 1 - Math.sqrt(d2)/120;
          ctx.strokeStyle = `rgba(0,229,255,${0.22*a})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
