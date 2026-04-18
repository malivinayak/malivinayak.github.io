/* ═══════════════════════════════════════════════════════════
   THE GROVE — effects engine
   Loader globe, weather cycle, pond shader, text particles,
   sky shader, nebula, plant growth
   ═══════════════════════════════════════════════════════════ */

/* ╔════════ PARTICLE SYSTEM (leaves / fireflies) ════════╗ */
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = -9999; this.mouseY = -9999;
    this.resize();
    this.reset();
    window.addEventListener('resize', () => { this.resize(); this.reset(); });
    window.addEventListener('mousemove', e => { this.mouseX = e.clientX; this.mouseY = e.clientY; });
    this.tick();
  }
  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width  = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width  = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = window.innerWidth; this.h = window.innerHeight;
  }
  reset() {
    this.particles = [];
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    const count = Math.min(Math.floor(this.w / 18), 60);
    for (let i = 0; i < count; i++) this.particles.push(this.spawn(night));
  }
  spawn(isNight) {
    if (isNight) {
      return { type:'firefly', x:rand(0,this.w), y:rand(0,this.h), vx:rand(-0.3,0.3), vy:rand(-0.4,0.2), r:rand(1,2.2), phase:rand(0,Math.PI*2), phaseSpeed:rand(0.015,0.04), color: Math.random()>0.7 ? '#fff3c4' : '#ffd166' };
    }
    return { type:'leaf', x:rand(0,this.w), y:rand(-30,this.h), vx:rand(-0.4,0.4), vy:rand(0.3,1.0), r:rand(2,4), rot:rand(0,Math.PI*2), rotSpeed:rand(-0.02,0.02), color: ['#7fb069','#a7c957','#f4a261','#8b6f47'][randInt(0,3)] };
  }
  tick() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    this.particles.forEach((p, idx) => {
      // Mouse repulsion
      const dx = p.x - this.mouseX, dy = p.y - this.mouseY;
      const d2 = dx*dx + dy*dy;
      if (d2 < 10000) {
        const d = Math.sqrt(d2) || 1;
        const f = (100 - d) / 100 * 0.6;
        p.vx += (dx / d) * f; p.vy += (dy / d) * f;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.type === 'firefly') {
        p.phase += p.phaseSpeed;
        p.vx += rand(-0.02, 0.02); p.vy += rand(-0.02, 0.02);
        p.vx *= 0.98; p.vy *= 0.98;
        p.vx = Math.max(-0.8, Math.min(0.8, p.vx));
        p.vy = Math.max(-0.8, Math.min(0.8, p.vy));
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const alpha = 0.4 + Math.sin(p.phase) * 0.4;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 14;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        p.rot += p.rotSpeed;
        p.vx += Math.sin(p.y * 0.01) * 0.01;
        p.vx *= 0.995;
        if (p.y > h + 20 || p.x < -20 || p.x > w + 20) {
          this.particles[idx] = this.spawn(night);
          this.particles[idx].y = -20;
          return;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });
    requestAnimationFrame(() => this.tick());
  }
}
window.ParticleSystem = ParticleSystem;

/* ╔════════ LOADER — spinning monochrome globe ════════╗ */
window.initLoader = function() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const canvas = document.getElementById('loaderGlobe');
  const ctx = canvas.getContext('2d');
  const W = 400, H = 400;
  const cx = W/2, cy = H/2, R = 95 * 2; // work at 2x for crispness, displayed 200px

  // Minimal continent silhouettes (simple hand-drawn blobs in lat/lng)
  // points are [longitude (-180..180), latitude (-90..90)]
  const CONTINENTS = [
    // Africa-ish blob
    [[-15,35],[10,38],[28,32],[38,16],[48,10],[42,-5],[35,-25],[22,-34],[10,-32],[5,-15],[-8,0],[-16,15],[-15,35]],
    // Europe
    [[-10,50],[5,46],[18,48],[28,52],[38,55],[25,60],[12,58],[-5,55],[-10,50]],
    // Asia
    [[30,55],[60,65],[100,72],[130,55],[140,40],[125,22],[100,12],[75,18],[50,30],[30,45],[30,55]],
    // N America
    [[-165,60],[-130,65],[-100,50],[-80,45],[-78,25],[-95,18],[-110,25],[-125,38],[-145,55],[-165,60]],
    // S America
    [[-75,10],[-65,5],[-55,-10],[-52,-25],[-60,-45],[-72,-50],[-78,-35],[-80,-15],[-78,0],[-75,10]],
    // Australia
    [[115,-12],[140,-10],[155,-25],[150,-38],[130,-35],[115,-30],[115,-12]],
    // Greenland
    [[-45,75],[-30,80],[-20,72],[-40,65],[-55,70],[-45,75]],
  ];

  let rotation = 0;
  let targetRotSpeed = 0.01;
  let curRotSpeed = 0.01;
  let mouseInfluence = 0;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    targetRotSpeed = 0.01 + nx * 0.06;
    mouseInfluence = Math.min(1, mouseInfluence + 0.04);
  });
  canvas.addEventListener('mouseleave', () => {
    targetRotSpeed = 0.01;
  });

  function project(lon, lat, rot) {
    // Convert spherical to 3D then rotate on Y axis, orthographic projection.
    const lonR = (lon + rot) * Math.PI / 180;
    const latR = lat * Math.PI / 180;
    const x = Math.cos(latR) * Math.sin(lonR);
    const y = Math.sin(latR);
    const z = Math.cos(latR) * Math.cos(lonR);
    return { x: cx + x * R, y: cy - y * R, z };
  }

  function drawGlobe() {
    ctx.clearRect(0, 0, W, H);
    // Whirl/vortex ring around globe
    const tnow = performance.now() / 1000;
    const rings = 14;
    for (let i = 0; i < rings; i++) {
      const p = i / rings;
      const ang0 = tnow * (0.8 + p * 1.2) + p * Math.PI * 2;
      const rad = R + 15 + i * 4;
      ctx.beginPath();
      const segs = 80;
      for (let s = 0; s <= segs; s++) {
        const t = s / segs;
        const a = ang0 + t * Math.PI * 2;
        const wobble = Math.sin(t * Math.PI * 6 + tnow * 2 + i) * (3 + i * 0.8);
        const rr = rad + wobble;
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr * (0.95 + Math.sin(tnow + i)*0.02);
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const alpha = 0.06 + (1 - p) * 0.08;
      ctx.strokeStyle = `rgba(61, 40, 23, ${alpha.toFixed(3)})`;
      if (document.documentElement.getAttribute('data-theme') === 'night') {
        ctx.strokeStyle = `rgba(240, 230, 209, ${alpha.toFixed(3)})`;
      }
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Sphere base — subtle fill
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    const base = night ? '#152434' : '#faf6ec';
    const line = night ? '#f0e6d1' : '#3d2817';
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = base;
    ctx.fill();

    // Sphere shading via radial gradient
    const grad = ctx.createRadialGradient(cx - R*0.35, cy - R*0.35, R*0.2, cx, cy, R);
    grad.addColorStop(0, night ? 'rgba(240,230,209,0.08)' : 'rgba(61,40,23,0.04)');
    grad.addColorStop(1, night ? 'rgba(0,0,0,0.25)' : 'rgba(61,40,23,0.15)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Latitude / longitude grid
    ctx.strokeStyle = line + '22'; // low opacity
    ctx.lineWidth = 1;
    // Latitudes
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 6) {
        const p = project(lon, lat, rotation);
        if (p.z < 0) { ctx.moveTo(p.x, p.y); continue; }
        if (lon === -180) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    // Longitudes (meridians)
    for (let lon = -180; lon < 180; lon += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = project(lon, lat, rotation);
        if (p.z < 0) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    // Equator + prime
    ctx.strokeStyle = line + '55';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    let started = false;
    for (let lon = -180; lon <= 180; lon += 4) {
      const p = project(lon, 0, rotation);
      if (p.z < 0) { started = false; continue; }
      if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Continents
    ctx.lineWidth = 1.4;
    CONTINENTS.forEach(poly => {
      // Draw only the visible-front portion
      ctx.beginPath();
      let drew = false; let prevVisible = false;
      // Fill
      for (let i = 0; i < poly.length; i++) {
        const [lon, lat] = poly[i];
        const p = project(lon, lat, rotation);
        const vis = p.z >= 0;
        if (vis) {
          if (!prevVisible) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
          drew = true; prevVisible = true;
        } else {
          prevVisible = false;
        }
      }
      if (drew) {
        ctx.closePath();
        ctx.fillStyle = line + 'bb';
        ctx.fill();
        ctx.strokeStyle = line;
        ctx.stroke();
      }
    });

    // Sphere rim
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function loop() {
    curRotSpeed += (targetRotSpeed - curRotSpeed) * 0.05;
    rotation += curRotSpeed * 2; // degrees per frame (scaled)
    if (rotation > 360) rotation -= 360;
    mouseInfluence *= 0.98;
    drawGlobe();
    if (loader.classList.contains('hidden')) return; // stop when loader gone
    requestAnimationFrame(loop);
  }
  loop();

  // Hide loader after content ready
  const hide = () => { setTimeout(() => loader.classList.add('hidden'), 650); };
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
};

/* ╔════════ SKY SHADER — aurora / heat shimmer ════════╗ */
window.initSkyShader = function() {
  const c = document.getElementById('skyShader');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = Math.min(window.innerHeight * 0.8, 700);
    c.style.height = H + 'px';
  }
  resize();
  window.addEventListener('resize', resize);
  let mx = 0.5, my = 0.3;
  window.addEventListener('mousemove', e => {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
  });

  let t = 0;
  // Pre-generate noise-lite blobs
  function tick() {
    t += 0.006;
    ctx.clearRect(0, 0, W, H);
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    const bands = 5;
    for (let i = 0; i < bands; i++) {
      const phase = t + i * 0.8;
      const yCenter = H * (0.2 + i * 0.14) + Math.sin(phase) * 20 + my * 40 * (i % 2 ? 1 : -1);
      const amp = 40 + Math.sin(phase * 1.3) * 20;
      const hueShift = i * 35;
      const grad = ctx.createLinearGradient(0, yCenter - amp, 0, yCenter + amp);
      if (night) {
        grad.addColorStop(0, 'rgba(127,176,105,0)');
        grad.addColorStop(0.5, `hsla(${160 + hueShift}, 55%, 55%, ${0.12 + Math.sin(phase)*0.04})`);
        grad.addColorStop(1, 'rgba(100,180,255,0)');
      } else {
        grad.addColorStop(0, 'rgba(255,179,102,0)');
        grad.addColorStop(0.5, `hsla(${25 + hueShift}, 70%, 70%, ${0.08 + Math.sin(phase)*0.03})`);
        grad.addColorStop(1, 'rgba(245,236,213,0)');
      }
      ctx.fillStyle = grad;
      // Wavy band
      ctx.beginPath();
      ctx.moveTo(0, yCenter);
      const pts = 30;
      for (let x = 0; x <= pts; x++) {
        const px = (x / pts) * W;
        const wave = Math.sin(px * 0.008 + phase * 2 + mx * Math.PI) * amp * 0.7
                   + Math.sin(px * 0.003 - phase) * amp * 0.4;
        const py = yCenter + wave;
        ctx.lineTo(px, py);
      }
      for (let x = pts; x >= 0; x--) {
        const px = (x / pts) * W;
        const wave = Math.sin(px * 0.008 + phase * 2 + mx * Math.PI) * amp * 0.7
                   + Math.sin(px * 0.003 - phase) * amp * 0.4;
        ctx.lineTo(px, yCenter + wave + amp * 0.6);
      }
      ctx.closePath();
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
};

/* ╔════════ NEBULA SHADER (constellations bg) ════════╗ */
window.initNebulaShader = function() {
  const c = document.getElementById('nebulaShader');
  if (!c) return;
  const ctx = c.getContext('2d');
  const parent = c.parentElement;
  let W, H;
  function resize() {
    const r = parent.getBoundingClientRect();
    W = c.width = r.width;
    H = c.height = r.height;
  }
  resize();
  window.addEventListener('resize', resize);
  let mx = 0.5, my = 0.5;
  parent.addEventListener('mousemove', e => {
    const r = parent.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top) / r.height;
  });
  let t = 0;
  function tick() {
    t += 0.004;
    ctx.clearRect(0, 0, W, H);
    const blobs = 6;
    for (let i = 0; i < blobs; i++) {
      const phase = t + i * 1.2;
      const x = W * (0.2 + 0.6 * (0.5 + Math.sin(phase + i) * 0.4)) + (mx - 0.5) * 80;
      const y = H * (0.3 + 0.4 * (0.5 + Math.cos(phase * 0.8) * 0.4)) + (my - 0.5) * 60;
      const r = 180 + Math.sin(phase) * 60;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const hues = [280, 220, 200, 30, 320, 180];
      const h = hues[i % hues.length];
      g.addColorStop(0, `hsla(${h}, 65%, 60%, 0.22)`);
      g.addColorStop(0.5, `hsla(${h}, 60%, 40%, 0.08)`);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    requestAnimationFrame(tick);
  }
  tick();
};

/* ╔════════ WEATHER ENGINE — cycle clear → cloudy → rain → storm ════════╗ */
window.initWeatherEngine = function() {
  const root = document.documentElement;
  const clouds = document.getElementById('clouds');
  const rain = document.getElementById('rainCanvas');
  const flood = document.getElementById('flood');
  const badge = document.getElementById('weatherBadge');
  const icon = document.getElementById('weatherIcon');
  const label = document.getElementById('weatherLabel');
  const lightning = document.getElementById('lightning');

  // Build cloud elements
  const cloudCount = 5;
  for (let i = 0; i < cloudCount; i++) {
    const el = document.createElement('div');
    el.className = 'cloud';
    el.style.top = (5 + i * 10 + rand(-3, 3)) + '%';
    el.style.width = rand(220, 420) + 'px';
    el.style.height = rand(60, 110) + 'px';
    el.style.animationDuration = rand(60, 120) + 's';
    el.style.animationDelay = -rand(0, 80) + 's';
    el.style.opacity = rand(0.6, 1);
    clouds.appendChild(el);
  }

  // Rain canvas
  const rctx = rain.getContext('2d');
  let rW, rH;
  function rResize() {
    const dpr = window.devicePixelRatio || 1;
    rW = rain.width = window.innerWidth * dpr;
    rH = rain.height = window.innerHeight * dpr;
    rain.style.width = window.innerWidth + 'px';
    rain.style.height = window.innerHeight + 'px';
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  rResize(); window.addEventListener('resize', rResize);

  const drops = [];
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function seedDrops(n) {
    drops.length = 0;
    for (let i = 0; i < n; i++) {
      drops.push({ x: rand(0, window.innerWidth), y: rand(-window.innerHeight, window.innerHeight), len: rand(8, 18), speed: rand(6, 12) });
    }
  }
  seedDrops(0);

  function rainTick() {
    rctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const storm = root.classList.contains('weather-storm');
    rctx.strokeStyle = storm ? 'rgba(180,200,220,0.5)' : 'rgba(150,180,200,0.35)';
    rctx.lineWidth = 1;
    const windShift = (mouseX / window.innerWidth - 0.5) * 4;
    drops.forEach(d => {
      d.y += d.speed; d.x += windShift * 0.4;
      if (d.y > window.innerHeight) { d.y = -20; d.x = rand(0, window.innerWidth); }
      rctx.beginPath();
      rctx.moveTo(d.x, d.y);
      rctx.lineTo(d.x - windShift, d.y + d.len);
      rctx.stroke();
    });
    requestAnimationFrame(rainTick);
  }
  rainTick();

  // Flood wave animation
  let floodT = 0;
  function floodTick() {
    floodT += 0.02;
    const p1 = document.getElementById('floodWave');
    const p2 = document.getElementById('floodWave2');
    if (p1 && p2) {
      const mouseInf = (window.__mouseX || 0) / window.innerWidth - 0.5;
      const makeWave = (amp, phase, off) => {
        let d = `M0,120 L0,${60 - off}`;
        const pts = 20;
        for (let i = 0; i <= pts; i++) {
          const x = (i / pts) * 1600;
          const y = 60 - off + Math.sin(i * 0.4 + floodT * phase + mouseInf * 2) * amp + Math.sin(i * 0.9 - floodT) * (amp * 0.4);
          d += ` L${x.toFixed(0)},${y.toFixed(1)}`;
        }
        d += ' L1600,120 Z';
        return d;
      };
      p1.setAttribute('d', makeWave(8, 1, 0));
      p2.setAttribute('d', makeWave(6, 1.6, 8));
    }
    requestAnimationFrame(floodTick);
  }
  floodTick();

  // State machine
  const STATES = [
    { name:'clear',  icon:'☀', dropCount:0,   duration: 22000 },
    { name:'cloudy', icon:'☁', dropCount:0,   duration: 12000 },
    { name:'rain',   icon:'🌧', dropCount:140, duration: 18000 },
    { name:'storm',  icon:'⛈', dropCount:240, duration: 10000 },
    { name:'cloudy', icon:'☁', dropCount:0,   duration: 8000  },
  ];
  let stateIdx = 0;
  const nightIconMap = { clear:'🌙', cloudy:'☁', rain:'🌧', storm:'⛈' };

  function applyState(s) {
    root.classList.remove('weather-clear','weather-cloudy','weather-rain','weather-storm');
    root.classList.add('weather-' + s.name);
    seedDrops(s.dropCount);
    const night = root.getAttribute('data-theme') === 'night';
    icon.textContent = night && s.name === 'clear' ? nightIconMap.clear : s.icon;
    label.textContent = s.name;
    badge.style.borderColor = s.name === 'storm' ? '#b85c5c' :
                               s.name === 'rain' ? '#5c8cb8' :
                               s.name === 'cloudy' ? '#9c9c9c' : '';
  }
  applyState(STATES[0]);

  function toggleDayNight() {
    // Only auto-toggle if user hasn't manually chosen
    if (localStorage.getItem('grove-theme-manual') === '1') return;
    const curr = root.getAttribute('data-theme');
    root.setAttribute('data-theme', curr === 'night' ? 'day' : 'night');
    if (window.__particleSystem) window.__particleSystem.reset();
  }

  function next() {
    const prevIdx = stateIdx;
    stateIdx = (stateIdx + 1) % STATES.length;
    // After completing a full cycle (wrap around to 0) -> swap day/night
    if (stateIdx === 0 && prevIdx === STATES.length - 1) toggleDayNight();
    applyState(STATES[stateIdx]);
    setTimeout(next, STATES[stateIdx].duration);
  }
  setTimeout(next, STATES[0].duration);

  // Allow click on badge to skip to next weather
  badge.addEventListener('click', () => {
    const prevIdx = stateIdx;
    stateIdx = (stateIdx + 1) % STATES.length;
    if (stateIdx === 0 && prevIdx === STATES.length - 1) toggleDayNight();
    applyState(STATES[stateIdx]);
  });

  // Lightning random flashes during storm
  function stormTick() {
    if (root.classList.contains('weather-storm') && Math.random() < 0.008) {
      lightning.classList.remove('flash');
      // force reflow
      void lightning.offsetWidth;
      lightning.classList.add('flash');
    }
    setTimeout(stormTick, 200);
  }
  stormTick();
};

/* ╔════════ PLANT GROWTH — new plants appear at random ════════╗ */
window.initPlantGrowth = function() {
  const layer = document.getElementById('plantsLayer');
  if (!layer) return;
  const plants = [];
  function makePlant(x) {
    const h = rand(40, 90);
    const sway = rand(-6, 6);
    const stemX = x;
    const leafCount = randInt(2, 5);
    let leafPath = '';
    for (let i = 0; i < leafCount; i++) {
      const p = i / leafCount;
      const ly = 200 - h * p - 10;
      const side = i % 2 === 0 ? 1 : -1;
      const lw = rand(8, 16);
      leafPath += `M${stemX},${ly} Q${stemX + side * lw},${ly - 8} ${stemX + side * lw * 1.6},${ly - 2} Q${stemX + side * lw},${ly + 4} ${stemX},${ly + 2} Z `;
    }
    const stem = `M${stemX},200 Q${stemX + sway},${200 - h/2} ${stemX + sway * 0.6},${200 - h}`;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'plantlet');
    g.setAttribute('style', `transform-origin: ${stemX}px 200px`);
    g.innerHTML = `<path d="${stem}" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/><path d="${leafPath}"/>`;
    layer.appendChild(g);
    return g;
  }
  // Initial plants
  for (let i = 0; i < 8; i++) makePlant(rand(50, 1550));

  function randomGrow() {
    if (plants.length > 30) {
      const old = plants.shift(); if (old && old.remove) old.remove();
    }
    const g = makePlant(rand(50, 1550));
    plants.push(g);
    setTimeout(randomGrow, rand(6000, 14000));
  }
  setTimeout(randomGrow, 5000);

  // Storm kills plants — fade them
  setInterval(() => {
    if (document.documentElement.classList.contains('weather-storm')) {
      layer.style.opacity = '0.25';
      layer.style.transform = 'translateY(4px) rotate(1deg)';
      layer.style.transition = 'all 0.4s ease';
    } else {
      layer.style.opacity = '0.7';
      layer.style.transform = '';
    }
  }, 600);
};

/* ╔════════ POND SHADER — height-field water ════════╗ */
window.initPondShader = function() {
  const canvas = document.getElementById('pondCanvas');
  const pond = document.getElementById('pond');
  if (!canvas || !pond) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  // height-field water sim
  const GRID = 120;
  let grid = new Float32Array(GRID * GRID);
  let prev = new Float32Array(GRID * GRID);
  const damp = 0.985;

  function resize() {
    const rect = pond.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    W = rect.width; H = rect.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const idx = (x, y) => y * GRID + x;
  function addDrop(px, py, strength = 30) {
    const gx = Math.floor(px / W * GRID);
    const gy = Math.floor(py / H * GRID);
    const rad = 3;
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        const nx = gx + dx, ny = gy + dy;
        if (nx < 1 || ny < 1 || nx > GRID - 2 || ny > GRID - 2) continue;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d > rad) continue;
        grid[idx(nx, ny)] += strength * Math.cos(d / rad * Math.PI / 2);
      }
    }
  }

  // Step the height field (wave equation)
  function step() {
    const next = prev;
    for (let y = 1; y < GRID - 1; y++) {
      for (let x = 1; x < GRID - 1; x++) {
        const avg = (grid[idx(x-1,y)] + grid[idx(x+1,y)] + grid[idx(x,y-1)] + grid[idx(x,y+1)]) * 0.5;
        const v = avg - next[idx(x,y)];
        next[idx(x,y)] = v * damp;
      }
    }
    // swap
    const tmp = grid; grid = next; prev = tmp;
  }

  // Render: use normals from grid to shade
  let imageData;
  function ensureImage(w, h) {
    if (!imageData || imageData.width !== w || imageData.height !== h) {
      imageData = ctx.createImageData(w, h);
    }
  }
  function render() {
    ensureImage(GRID, GRID);
    const data = imageData.data;
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    // base pond color
    const base = night ? [24, 52, 72] : [90, 130, 140];
    const hi = night ? [160, 200, 220] : [210, 240, 240];
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const c = grid[idx(x, y)];
        const l = x > 0 ? grid[idx(x-1, y)] : c;
        const r = x < GRID-1 ? grid[idx(x+1, y)] : c;
        const u = y > 0 ? grid[idx(x, y-1)] : c;
        const d = y < GRID-1 ? grid[idx(x, y+1)] : c;
        const nx = (l - r) * 0.5;
        const ny = (u - d) * 0.5;
        const lightX = -0.4, lightY = -0.5;
        const dot = Math.max(-1, Math.min(1, nx * lightX + ny * lightY));
        const spec = Math.pow(Math.max(0, dot), 4);
        const diff = 0.5 + dot * 0.4;
        const mix = Math.max(0, Math.min(1, diff + spec));
        const i4 = (y * GRID + x) * 4;
        data[i4] = base[0] + (hi[0] - base[0]) * mix;
        data[i4+1] = base[1] + (hi[1] - base[1]) * mix;
        data[i4+2] = base[2] + (hi[2] - base[2]) * mix;
        data[i4+3] = 180; // semi-transparent so the pond bg tints through
      }
    }
    // draw the tiny image stretched to pond size
    const tmpCanvas = render._tmp || (render._tmp = document.createElement('canvas'));
    tmpCanvas.width = GRID; tmpCanvas.height = GRID;
    tmpCanvas.getContext('2d').putImageData(imageData, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tmpCanvas, 0, 0, W, H);

    // Add caustic ring highlights for the most recent drops (cheap shader feel)
    ctx.globalCompositeOperation = 'lighter';
    for (const r of recentRipples) {
      r.r += 1.6; r.a *= 0.96;
      if (r.a < 0.02) continue;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180,220,230,${r.a.toFixed(3)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  const recentRipples = [];
  function addRippleEmit(x, y) {
    recentRipples.push({ x, y, r: 4, a: 0.7 });
    if (recentRipples.length > 20) recentRipples.shift();
  }

  // Mouse + pointer interaction
  pond.addEventListener('pointermove', e => {
    const rect = pond.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if (Math.random() < 0.4) { addDrop(x, y, 6); }
  });
  pond.addEventListener('pointerdown', e => {
    const rect = pond.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    addDrop(x, y, 45);
    addRippleEmit(x, y);
    // burst
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addDrop(x + rand(-8,8), y + rand(-8,8), 20), i * 40);
    }
  });

  // Ambient drops
  setInterval(() => {
    addDrop(rand(W*0.2, W*0.8), rand(H*0.2, H*0.8), 10);
    addRippleEmit(rand(W*0.2, W*0.8), rand(H*0.2, H*0.8));
  }, 2800);

  // Rain drops into pond
  setInterval(() => {
    if (document.documentElement.classList.contains('weather-rain') ||
        document.documentElement.classList.contains('weather-storm')) {
      for (let i = 0; i < 4; i++) {
        addDrop(rand(0, W), rand(0, H), 8);
      }
    }
  }, 200);

  function loop() {
    step();
    render();
    requestAnimationFrame(loop);
  }
  loop();
};

/* ╔════════ TEXT PARTICLE EFFECTS ════════╗ */
window.initTextParticles = function() {
  const canvas = document.createElement('canvas');
  canvas.className = 'pword-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); window.addEventListener('resize', resize);

  const parts = [];
  const MAX = 400;
  function spawnFrom(el, type, count = 20) {
    const r = el.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const x = r.left + rand(0, r.width);
      const y = r.top + rand(0, r.height);
      parts.push(makeParticle(type, x, y));
      if (parts.length > MAX) parts.shift();
    }
  }
  function makeParticle(type, x, y) {
    switch (type) {
      case 'fire':
        return { type, x, y, vx: rand(-0.3, 0.3), vy: rand(-2.2, -0.8), life: 1, r: rand(3, 7), hue: rand(10, 45) };
      case 'smoke':
        return { type, x, y, vx: rand(-0.3, 0.3), vy: rand(-1.2, -0.3), life: 1, r: rand(6, 14) };
      case 'metal':
        return { type, x, y, vx: rand(-2, 2), vy: rand(-3, 0), life: 1, r: rand(1, 2.5), gravity: 0.12 };
      case 'wind':
        return { type, x, y, vx: rand(1, 4), vy: rand(-0.5, 0.5), life: 1, r: rand(1, 3) };
      case 'water':
        return { type, x, y, vx: rand(-1, 1), vy: rand(-1, 2), life: 1, r: rand(2, 4), gravity: 0.1 };
      case 'leaf':
        return { type, x, y, vx: rand(-1, 1), vy: rand(-0.2, 1.2), life: 1, r: rand(3, 6), rot: rand(0, Math.PI*2), rotSpeed: rand(-0.05,0.05) };
    }
  }

  // Public API — anyone can spawn effects anywhere
  window.__spawnEffectAt = function(type, x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      parts.push(makeParticle(type, x + rand(-4, 4), y + rand(-4, 4)));
      if (parts.length > MAX) parts.shift();
    }
  };

  document.querySelectorAll('.pword').forEach(el => {
    const effect = el.dataset.effect;
    el.addEventListener('pointermove', e => {
      if (Math.random() < 0.3) spawnFrom(el, effect, 1);
    });
    el.addEventListener('pointerenter', () => spawnFrom(el, effect, 12));
    el.addEventListener('click', () => spawnFrom(el, effect, 30));
  });

  // Wire effects to meaningful triggers site-wide
  // Hero name (Vinayak Mali) letters emit 'metal' on hover
  document.querySelectorAll('#heroName .word').forEach(w => {
    w.addEventListener('pointerenter', () => {
      const r = w.getBoundingClientRect();
      window.__spawnEffectAt('metal', r.left + r.width/2, r.top + r.height/2, 14);
    });
  });
  // CTAs — primary emits 'fire', ghost emits 'wind'
  document.querySelectorAll('.cta-primary').forEach(b => {
    b.addEventListener('pointerenter', () => {
      const r = b.getBoundingClientRect();
      window.__spawnEffectAt('fire', r.left + r.width/2, r.bottom - 4, 10);
    });
  });
  document.querySelectorAll('.cta-ghost').forEach(b => {
    b.addEventListener('pointerenter', () => {
      const r = b.getBoundingClientRect();
      window.__spawnEffectAt('wind', r.left, r.top + r.height/2, 8);
    });
  });
  // Pillar icons emit thematic effects
  document.querySelectorAll('.pillar').forEach((p, i) => {
    const effs = ['fire','metal','water','leaf'];
    p.addEventListener('pointerenter', () => {
      const r = p.querySelector('.pillar-icon').getBoundingClientRect();
      window.__spawnEffectAt(effs[i % 4], r.left + r.width/2, r.top + r.height/2, 12);
    });
  });
  // Constellation stars emit 'metal' (silver sparks)
  document.querySelectorAll('.star-point').forEach(s => {
    s.addEventListener('pointerenter', () => {
      const r = s.getBoundingClientRect();
      window.__spawnEffectAt('metal', r.left + r.width/2, r.top + r.height/2, 10);
    });
  });
  // Plant cards emit 'leaf' on hover
  document.addEventListener('pointerenter', (e) => {
    const plant = e.target.closest?.('.plant');
    if (plant && !plant.__fxBound) {
      plant.__fxBound = true;
      plant.addEventListener('pointerenter', () => {
        const r = plant.getBoundingClientRect();
        window.__spawnEffectAt('leaf', r.left + rand(0, r.width), r.top + 10, 6);
      });
    }
  }, true);
  // Leaf cards (blog) emit 'wind'
  document.addEventListener('pointerenter', (e) => {
    const l = e.target.closest?.('.leaf-card');
    if (l && !l.__fxBound) {
      l.__fxBound = true;
      l.addEventListener('pointerenter', () => {
        const r = l.getBoundingClientRect();
        window.__spawnEffectAt('wind', r.left, r.top + r.height/2, 10);
      });
    }
  }, true);
  // Email copy -> water burst
  document.getElementById('emailBtn')?.addEventListener('click', () => {
    const r = document.getElementById('emailBtn').getBoundingClientRect();
    window.__spawnEffectAt('water', r.left + r.width/2, r.top + r.height/2, 25);
  });

  // Mouse also spawns faint wind trail
  window.addEventListener('pointermove', e => {
    if (Math.random() < 0.05) {
      parts.push({ type:'wind-cursor', x:e.clientX, y:e.clientY, vx:rand(-0.3,0.3), vy:rand(-0.3,0.3), life:1, r:rand(1,2) });
      if (parts.length > MAX) parts.shift();
    }
  });

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.015;
      if (p.gravity) p.vy += p.gravity;
      if (p.rotSpeed) p.rot += p.rotSpeed;
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      ctx.save();
      switch (p.type) {
        case 'fire': {
          const a = Math.min(1, p.life) * 0.85;
          const rad = p.r * (1.2 - p.life * 0.2);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 2);
          g.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${a})`);
          g.addColorStop(0.5, `hsla(${p.hue - 10}, 100%, 50%, ${a * 0.6})`);
          g.addColorStop(1, `hsla(${p.hue - 20}, 100%, 30%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, rad * 2, 0, Math.PI * 2); ctx.fill();
          p.vx += rand(-0.1, 0.1); p.vy -= 0.03;
          break;
        }
        case 'smoke': {
          const a = p.life * 0.25;
          const rad = p.r * (1 + (1 - p.life));
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 2);
          g.addColorStop(0, `rgba(150,145,140,${a})`);
          g.addColorStop(1, 'rgba(150,145,140,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, rad * 2, 0, Math.PI * 2); ctx.fill();
          p.vx += rand(-0.05, 0.05); p.vy -= 0.015;
          break;
        }
        case 'metal': {
          const a = p.life;
          ctx.fillStyle = `rgba(230,230,235,${a})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(255,240,200,${a})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          break;
        }
        case 'wind':
        case 'wind-cursor': {
          const a = p.life * 0.4;
          ctx.strokeStyle = `rgba(200,210,215,${a})`;
          ctx.lineWidth = p.r * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          p.vx *= 0.99;
          break;
        }
        case 'water': {
          const a = p.life;
          ctx.fillStyle = `rgba(100,160,200,${a * 0.8})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(120,180,220,${a})`;
          ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r, p.r * 1.4, 0, 0, Math.PI*2); ctx.fill();
          break;
        }
        case 'leaf': {
          const a = p.life;
          ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(127,176,105,${a})`;
          ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.7, 0, 0, Math.PI * 2); ctx.fill();
          break;
        }
      }
      ctx.restore();
    }
    requestAnimationFrame(tick);
  }
  tick();
};
