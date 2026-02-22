const playground = document.getElementById('playground');
const spawnBtn = document.getElementById('spawnBtn');
const clearBtn = document.getElementById('clearBtn');

function rand(min,max){return Math.random()*(max-min)+min}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}

const catEmojis=['😺','😸','😹','😻','😼','🙀'];
const colors=['#ff4d6d','#ffd93d','#5efc82','#6b9eff','#ff8af9'];

function spawnCat(x,y){
  const el = document.createElement('span');
  el.className='spawned';
  el.textContent = pick(catEmojis);
  el.style.left = (x||(50+rand(-40,40)))+'%';
  el.style.top = (y||(50+rand(-40,40)))+'%';
  el.style.fontSize = (rand(28,96))+'px';
  el.style.color = pick(colors);
  // random extra animation flavors
  if(Math.random() > 0.5) el.classList.add('wiggle');
  if(Math.random() > 0.7) el.classList.add('blink');
  // subtle glow
  el.style.textShadow = `0 6px 18px ${el.style.color}55`;
  playground.appendChild(el);
  requestAnimationFrame(()=> el.classList.add('pop'));
  setTimeout(()=>{
    try{el.remove()}catch(e){}
  }, 3500);
}

function spawnConfetti(){
  for(let i=0;i<18;i++){
    const c = document.createElement('div');
    c.className='confetti';
    c.style.background = pick(colors);
    c.style.left = rand(0,100)+'%';
    c.style.top = rand(-20,0)+'vh';
    c.style.animationDuration = (rand(2.2,4.2))+'s';
    c.style.transform = `rotate(${rand(0,360)}deg)`;
    playground.appendChild(c);
    setTimeout(()=>c.remove(),4500);
  }
}

function spawnBalloon(){
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.left = rand(5,95)+'%';
  b.style.background = pick(colors);
  b.textContent = pick(['🎈','🎉','✨']);
  playground.appendChild(b);
  // stagger sway duration a bit
  b.style.animationDuration = (rand(5.6,7.6))+'s';
  b.classList.add('sway');
  setTimeout(()=>{ try{ b.remove() }catch(e){} }, 7600);
}

spawnBtn.addEventListener('click', ()=>{ spawnCat(); spawnConfetti(); });
clearBtn.addEventListener('click', ()=>{ Array.from(playground.querySelectorAll('.spawned, .confetti')).forEach(n=>n.remove()) });

// spawn a friendly cat every few seconds
setInterval(()=>{ if(Math.random()>0.6) spawnCat(pick([20,40,60,80]), pick([20,40,60,80])) }, 2800);

// occasionally spawn balloons and sparkles
setInterval(()=>{ if(Math.random()>0.7) spawnBalloon() }, 2400);

// create a tiny sparkle at a point
function spawnSparkle(xPct,yPct){
  const s = document.createElement('div');
  s.className='sparkle';
  s.style.left = xPct+'%';
  s.style.top = yPct+'%';
  s.style.background = pick(colors);
  playground.appendChild(s);
  setTimeout(()=>s.remove(),1600);
}

// click on playground to spawn at point
playground.addEventListener('click', (e)=>{
  const rect = playground.getBoundingClientRect();
  const x = ((e.clientX - rect.left)/rect.width)*100;
  const y = ((e.clientY - rect.top)/rect.height)*100;
  spawnCat(x,y);
  spawnConfetti();
  if(Math.random()>0.4) spawnBalloon();
  spawnSparkle(x,y);
});