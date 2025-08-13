// ===== AOS (scroll reveals) =====
AOS.init({ duration: 700, once: true });

// ===== Year =====
document.getElementById('y').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== Rotating tagline (typewriter) =====
const lines = [
  "Embedded Systems • Real-time thinking.",
  "Automotive Tech • Smarter mobility.",
  "Kalman • LSTM • Sensor Fusion.",
  "C / C++ • OOP • SQL."
];
const rotator = document.getElementById('rotator');
let li = 0, ci = 0, typing = true;
(function typeLoop(){
  if (!rotator) return;
  if (typing){ rotator.textContent = lines[li].slice(0, ci++); if (ci > lines[li].length + 8) typing = false; }
  else { rotator.textContent = lines[li].slice(0, ci--); if (ci === 0){ typing = true; li = (li + 1) % lines.length; } }
  setTimeout(typeLoop, typing ? 60 : 40);
})();

// ===== Background particles on canvas =====
const cvs = document.getElementById('bg-canvas');
const ctx = cvs.getContext('2d');
function fitCanvas(){ cvs.width = innerWidth; cvs.height = innerHeight; }
fitCanvas(); addEventListener('resize', fitCanvas);
const stars = Array.from({length: 120}, () => ({
  x: Math.random()*innerWidth,
  y: Math.random()*innerHeight,
  r: Math.random()*1.6 + 0.2,
  vx: (Math.random()-0.5)*0.15,
  vy: (Math.random()-0.5)*0.15
}));
function drawStars(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  stars.forEach(s=>{
    s.x+=s.vx; s.y+=s.vy;
    if(s.x<0||s.x>cvs.width) s.vx*=-1;
    if(s.y<0||s.y>cvs.height) s.vy*=-1;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== Project card glow (mouse parallax) =====
document.querySelectorAll('.proj').forEach(card=>{
  const glow = card.querySelector('.glow');
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glow.style.setProperty('--mx', x + '%');
    glow.style.setProperty('--my', y + '%');
  });
});

// ===== Modals =====
const openModal = id => document.getElementById(id).classList.add('show');
const closeModal = el => el.closest('.modal').classList.remove('show');

document.querySelectorAll('.proj').forEach(p=>{
  p.addEventListener('click', e=>{
    const id = p.getAttribute('data-modal');
    if (e.target.classList.contains('link') || e.currentTarget === p) openModal(id);
  });
});
document.querySelectorAll('.modal-close').forEach(btn=>btn.addEventListener('click', e=>closeModal(e.target)));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click', e=>{ if(e.target===m) m.classList.remove('show'); }));

// ===== Skills Constellation =====
const con = document.getElementById('constellation');
if (con){
  const k = con.getContext('2d');
  const DPR = Math.max(1, Math.floor(devicePixelRatio||1));
  function size(){ const r = con.getBoundingClientRect(); con.width=r.width*DPR; con.height=r.height*DPR; k.setTransform(DPR,0,0,DPR,0,0); }
  size(); addEventListener('resize', size);
  const N = 46;
  const pts = Array.from({length:N},()=>({x:Math.random()*con.clientWidth,y:Math.random()*con.clientHeight,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*1.2}));
  function step(){
    k.clearRect(0,0,con.clientWidth,con.clientHeight);
    pts.forEach(p=>{
      p.x+=p.vx*0.35; p.y+=p.vy*0.35;
      if(p.x<0||p.x>con.clientWidth) p.vx*=-1;
      if(p.y<0||p.y>con.clientHeight) p.vy*=-1;
      k.fillStyle='#cfe9ff'; k.beginPath(); k.arc(p.x,p.y,2,0,Math.PI*2); k.fill();
    });
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d2=dx*dx+dy*dy;
        if(d2<120*120){ const a=1-Math.sqrt(d2)/120; k.strokeStyle=`rgba(0,229,255,${0.22*a})`; k.beginPath(); k.moveTo(pts[i].x,pts[i].y); k.lineTo(pts[j].x,pts[j].y); k.stroke(); }
      }
    }
    requestAnimationFrame(step);
  }
  step();
}

// ===== Subtle hero entrance with GSAP =====
gsap.from('.avatar',{scale:0.9, opacity:0, duration:0.8, ease:'power2.out'});
gsap.from('.title',{y:20, opacity:0, duration:0.6, delay:0.1});
gsap.from('.subtitle',{y:18, opacity:0, duration:0.6, delay:0.2});
gsap.from('.tagline',{y:16, opacity:0, duration:0.6, delay:0.3});
