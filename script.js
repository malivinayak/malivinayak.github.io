/* ═══════════════════════════════════════════════════════════
   THE GROVE — main script (data loading + orchestration)
   ═══════════════════════════════════════════════════════════ */

/* ╔════════ UTILITIES ════════╗ */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
window.$ = $; window.$$ = $$; window.rand = rand; window.randInt = randInt;

/* ╔════════ DATA LOADING ════════╗ */
// Fallback data (used if fetch fails, e.g. file:// or static host without CORS)
const FALLBACK_DATA = {
  profile: { name:"Vinayak Mali", badge:"M.Tech in AI · IIT Kharagpur", roles:["AI & Machine Learning","Systems Engineering","Full-Stack Development"], stats:[{value:"AIR 716",label:"GATE 2024 · 99.36%ile"},{value:"8.45/10",label:"CGPA · IIT KGP"},{value:"33+",label:"Open-source repos"},{value:"2024–26",label:"M.Tech AI"}] },
  skills: [{category:"Programming Languages",icon:"⌨",items:["Python","C++","C","Java","JavaScript","TypeScript","SQL"]},{category:"AI / ML & Core CS",icon:"⚘",items:["PyTorch","TensorFlow","Scikit-learn","MediaPipe","LangChain","Computer Vision","NLP","Graph ML","Reinforcement Learning","Deep Learning"]},{category:"Tools & Frameworks",icon:"✦",items:["React","Node.js","Express","Flask","Git","Docker","Firebase","Oracle DB","MySQL","MongoDB","Tailwind CSS","Linux"]}],
  projects: [],
  projectFilters: ["All"],
  experience: [], education: [], coursework: [], blogs: [], achievements: [],
  contact: { email:"malivinayak012@gmail.com", links:[] }
};

async function loadData() {
  try {
    const res = await fetch('data.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('status ' + res.status);
    const json = await res.json();
    return { ...FALLBACK_DATA, ...json };
  } catch (e) {
    console.warn('[grove] data.json fetch failed, using inline fallback:', e.message);
    // Second try: look for inline data script
    const inline = document.getElementById('inline-data');
    if (inline) {
      try { return { ...FALLBACK_DATA, ...JSON.parse(inline.textContent) }; } catch {}
    }
    return FALLBACK_DATA;
  }
}

/* ╔════════ THEME MANAGEMENT ════════╗ */
const theme = {
  init() {
    const saved = localStorage.getItem('grove-theme');
    const hour = new Date().getHours();
    const auto = (hour < 6 || hour > 19) ? 'night' : 'day';
    const current = saved || auto;
    this.apply(current);

    $('#themeToggle').addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'night' ? 'day' : 'night';
      this.apply(next);
      localStorage.setItem('grove-theme', next);
      localStorage.setItem('grove-theme-manual', '1');
    });
  },
  apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (window.__particleSystem) window.__particleSystem.reset();
  },
};

/* ╔════════ FIREFLY CURSOR ════════╗ */
function initFireflyCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  const cursor = $('.firefly-cursor');
  let x = 0, y = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    // also track in global for other systems
    window.__mouseX = e.clientX; window.__mouseY = e.clientY;
  });

  function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .plant, .leaf-card, .star-point, .legend-btn, .pword')) {
      cursor.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .plant, .leaf-card, .star-point, .legend-btn, .pword')) {
      cursor.classList.remove('hover');
    }
  });
}

/* ╔════════ PARALLAX BACKGROUND ════════╗ */
function initParallax() {
  const layers = [
    { el: $('.mountains.far'), factor: 0.04 },
    { el: $('.mountains.mid'), factor: 0.08 },
    { el: $('.trees.far'),     factor: 0.15 },
    { el: $('.trees.near'),    factor: 0.25 },
    { el: $('.plants-layer'),  factor: 0.2 },
  ];
  const celestial = $('.celestial');
  let scrollY = 0, target = 0;
  let mouseX = 0, mouseY = 0, mxT = 0, myT = 0;
  window.addEventListener('scroll', () => { target = window.scrollY; }, { passive: true });
  document.addEventListener('mousemove', e => {
    mxT = (e.clientX / window.innerWidth - 0.5) * 2;
    myT = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  function loop() {
    scrollY += (target - scrollY) * 0.1;
    mouseX += (mxT - mouseX) * 0.05;
    mouseY += (myT - mouseY) * 0.05;
    layers.forEach(({ el, factor }) => {
      if (!el) return;
      const mx = mouseX * Math.abs(factor) * 60;
      const my = mouseY * Math.abs(factor) * 30;
      el.style.transform = `translate(${mx}px, ${scrollY * factor + my}px)`;
    });
    // Celestial arc: bottom-left (sunrise) -> top-middle (noon) -> bottom-right (sunset)
    if (celestial) {
      const docH = document.body.scrollHeight - window.innerHeight || 1;
      const sp = Math.min(1, Math.max(0, target / docH));
      const vw = window.innerWidth, vh = window.innerHeight;
      // Arc: horizontal spans from ~8% to ~92% of viewport
      const x = vw * (0.08 + sp * 0.84);
      // Vertical: parabola — low at ends (0.82 of vh), peak at middle (0.18 of vh)
      const yRatio = 0.82 - Math.sin(sp * Math.PI) * 0.64;
      const y = vh * yRatio;
      celestial.style.transform = `translate3d(${x - 60 + mouseX * 10}px, ${y - 60 + mouseY * 6}px, 0)`;
      // When below first viewport, push behind content so it doesn't hide nav/logo
      celestial.classList.toggle('past-hero', target > vh * 0.3);
    }
    // Flood rises with scroll
    const flood = $('#flood');
    if (flood) {
      const maxH = Math.min(window.innerHeight * 0.25, 150);
      const sp = Math.min(1, target / (document.body.scrollHeight - window.innerHeight || 1));
      const rainBoost = document.documentElement.classList.contains('weather-rain') ? 1.4 :
                        document.documentElement.classList.contains('weather-storm') ? 1.6 : 1;
      flood.style.height = (sp * maxH * rainBoost) + 'px';
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ╔════════ SKILL TREE — each leaf = 1 skill ════════╗ */
function buildSkillTree(skills) {
  // Helper: scatter N leaf positions along a parametric branch path
  // Branch paths (approx, from the SVG trunk coords): left, up, right
  const branchCurves = [
    // left branch: from (400,380) curve to (110,280)
    (t) => {
      const p0=[400,380], p1=[280,335], p2=[180,305], p3=[110,280];
      return bezier(p0,p1,p2,p3,t);
    },
    // up branch: (400,280) to (460,70)
    (t) => {
      const p0=[400,280], p1=[422,210], p2=[440,130], p3=[460,70];
      return bezier(p0,p1,p2,p3,t);
    },
    // right branch: (400,360) to (710,290)
    (t) => {
      const p0=[400,360], p1=[520,325], p2=[630,305], p3=[710,290];
      return bezier(p0,p1,p2,p3,t);
    },
  ];
  function bezier(p0,p1,p2,p3,t) {
    const mt = 1-t;
    const x = mt*mt*mt*p0[0] + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t*t*t*p3[0];
    const y = mt*mt*mt*p0[1] + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t*t*t*p3[1];
    return [x, y];
  }

  const legendWrap = $('#branchLegend');
  legendWrap.innerHTML = '';

  skills.forEach((skill, i) => {
    const group = $(`.leaves-group[data-branch="${i}"]`);
    if (!group) return;
    const curve = branchCurves[i % 3];
    const n = skill.items.length;
    let leaves = '';
    for (let j = 0; j < n; j++) {
      const t = 0.18 + (j / Math.max(1, n - 1)) * 0.82;
      const [x0, y0] = curve(t);
      // perpendicular offset (alternate sides) + random jitter
      const side = j % 2 === 0 ? 1 : -1;
      const perp = 18 + (j % 3) * 6;
      const [x1, y1] = curve(Math.min(1, t + 0.02));
      const dx = x1 - x0, dy = y1 - y0;
      const mag = Math.hypot(dx, dy) || 1;
      const px = -dy / mag, py = dx / mag;
      const jx = rand(-6, 6), jy = rand(-6, 6);
      const x = x0 + px * perp * side + jx;
      const y = y0 + py * perp * side + jy;
      const rot = rand(-45, 45);
      leaves += `
        <g class="leaf-shape" data-idx="${j}" data-branch="${i}" data-skill="${encodeURIComponent(skill.items[j])}"
           transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(0)})">
          <path d="M0,-8 C4,-7 7,-4 7,0 C7,5 2,9 0,11 C-2,9 -7,5 -7,0 C-7,-4 -4,-7 0,-8 Z"/>
          <path d="M0,-6 L0,10" stroke="rgba(40,40,25,0.5)" stroke-width="0.6" fill="none"/>
          <title>${skill.items[j]}</title>
        </g>`;
    }
    group.innerHTML = leaves;

    const btn = document.createElement('button');
    btn.className = 'legend-btn';
    btn.dataset.branch = i;
    btn.innerHTML = `
      <div class="legend-header">
        <span class="legend-icon">${skill.icon}</span>
        <span class="legend-name">${skill.category}</span>
        <span class="legend-count" data-count-branch="${i}">${skill.items.length}</span>
      </div>
      <div class="legend-items" data-items-branch="${i}">
        ${skill.items.map((item, j) =>
          `<span class="legend-tag" data-branch="${i}" data-idx="${j}" data-skill="${encodeURIComponent(item)}">${item}</span>`
        ).join('')}
      </div>`;
    btn.addEventListener('click', () => activateBranch(i));
    btn.addEventListener('mouseenter', () => activateBranch(i));
    legendWrap.appendChild(btn);
  });
  setTimeout(() => activateBranch(1), 400);

  // Click on leaves or tags -> fall + vanish with random effect
  const EFFECTS = ['fire','smoke','metal','wind','water','leaf'];
  function randomEffect() { return EFFECTS[randInt(0, EFFECTS.length - 1)]; }

  function dropSkill(branchIdx, skillIdx) {
    const leafEl = document.querySelector(`.leaves-group[data-branch="${branchIdx}"] .leaf-shape[data-idx="${skillIdx}"]`);
    const tagEl = document.querySelector(`.legend-tag[data-branch="${branchIdx}"][data-idx="${skillIdx}"]`);
    if (!leafEl || leafEl.classList.contains('falling')) return;
    const effect = randomEffect();
    leafEl.classList.add('falling');
    leafEl.dataset.effect = effect;
    // Get leaf's screen position — trigger particle effect there
    const svg = leafEl.ownerSVGElement;
    if (svg && window.__spawnEffectAt) {
      const rect = svg.getBoundingClientRect();
      // parse transform translate() from leaf
      const t = leafEl.getAttribute('transform') || '';
      const m = t.match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
      if (m) {
        const lx = +m[1], ly = +m[2];
        // map viewBox 0..800 / 0..600 to rect
        const scaleX = rect.width / 800, scaleY = rect.height / 600;
        const sx = rect.left + lx * scaleX;
        const sy = rect.top + ly * scaleY;
        window.__spawnEffectAt(effect, sx, sy, 30);
      }
    }
    // Vanish the tag with fade + matching color
    if (tagEl) {
      tagEl.classList.add('vanishing');
      tagEl.dataset.effect = effect;
      setTimeout(() => { tagEl.style.display = 'none'; }, 900);
    }
    // Decrement count
    const countEl = document.querySelector(`[data-count-branch="${branchIdx}"]`);
    if (countEl) {
      const curr = parseInt(countEl.textContent, 10) || 0;
      countEl.textContent = Math.max(0, curr - 1);
    }
    // Animate leaf fall then remove
    leafEl.addEventListener('animationend', () => leafEl.remove(), { once: true });
  }

  document.addEventListener('click', (e) => {
    const leaf = e.target.closest('.leaf-shape');
    if (leaf) {
      e.stopPropagation();
      dropSkill(+leaf.dataset.branch, +leaf.dataset.idx);
      return;
    }
    const tag = e.target.closest('.legend-tag');
    if (tag) {
      dropSkill(+tag.dataset.branch, +tag.dataset.idx);
    }
  });
}
function activateBranch(index) {
  $$('.branch').forEach(b => b.classList.toggle('active', +b.dataset.branch === index));
  $$('.leaves-group').forEach(g => g.classList.toggle('active', +g.dataset.branch === index));
  $$('.legend-btn').forEach(b => b.classList.toggle('active', +b.dataset.branch === index));
}

/* ╔════════ GARDEN / PROJECTS ════════╗ */
function buildGarden(DATA) {
  const grid = $('#gardenGrid');
  const filtersWrap = $('#gardenFilters');
  if (!grid || !filtersWrap) return;
  const filters = DATA.projectFilters && DATA.projectFilters.length ? DATA.projectFilters : ['All'];
  filtersWrap.innerHTML = filters.map((f, i) =>
    `<button class="filter-chip${i === 0 ? ' active' : ''}" data-filter="${f}">${f}</button>`
  ).join('');

  const renderProjects = (filter) => {
    const list = filter === 'All'
      ? DATA.projects
      : DATA.projects.filter(p => (p.filters || []).includes(filter));
    grid.innerHTML = list.map(p => `
      <article class="plant" data-id="${p.id}">
        <div class="plant-top">
          <span class="plant-icon">${p.icon || '✦'}</span>
          <span class="plant-timeline">${p.timeline || ''}</span>
        </div>
        <h3 class="plant-title">${p.title}</h3>
        <p class="plant-hook">${p.hook || ''}</p>
        <div class="plant-tags">
          ${(p.tags || []).map(t => `<span class="plant-tag">${t}</span>`).join('')}
        </div>
        <span class="plant-cta">open ↗</span>
      </article>`).join('');

    $$('.plant').forEach(card => {
      card.addEventListener('click', () => openProjectModal(DATA, card.dataset.id));
    });
  };
  renderProjects('All');
  $$('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderProjects(chip.dataset.filter);
    });
  });
}

function openProjectModal(DATA, id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  const modal = $('#projectModal');
  const content = $('#modalContent');
  const actions = [];
  if (p.github) actions.push(`<a class="cta cta-primary" href="${p.github}" target="_blank" rel="noopener"><span>View on GitHub</span></a>`);
  if (p.demo)   actions.push(`<a class="cta cta-ghost" href="${p.demo}" target="_blank" rel="noopener"><span>See demo / paper</span></a>`);
  const m = p.modal || {};
  content.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${p.icon || ''} ${p.title}</h2>
    <div class="modal-timeline">${p.timeline || ''}</div>
    <div class="modal-hook">${p.hook || ''}</div>
    ${m.bullets ? `<h3 class="modal-h3">What it does</h3><ul class="modal-bullets">${m.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    ${m.architecture ? `<h3 class="modal-h3">Architecture</h3><div class="modal-arch">${m.architecture}</div>` : ''}
    ${m.stack ? `<h3 class="modal-h3">Stack</h3><div class="modal-stack">${m.stack.map(s => `<span class="modal-stack-tag">${s}</span>`).join('')}</div>` : ''}
    ${actions.length ? `<div class="modal-actions">${actions.join('')}</div>` : ''}
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initModal() {
  const modal = $('#projectModal');
  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ╔════════ SIMPLE CONTENT BUILDERS ════════╗ */
function buildRings(DATA) {
  $('#ringsList').innerHTML = (DATA.experience || []).map(exp => `
    <div class="ring-item">
      <div class="ring-item-head">
        <div class="ring-role">${exp.role}</div>
        <div class="ring-period">${exp.period}</div>
      </div>
      <div class="ring-company">${exp.company}</div>
      ${(exp.bullets || []).length ? `<ul class="ring-bullets">${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      ${exp.link ? `<a class="ring-link" href="${exp.link.url}" target="_blank" rel="noopener">${exp.link.label} →</a>` : ''}
    </div>`).join('');

  // LOTR interactions: hover a ring-item -> glow + show one-ring glyph
  const slice = $('#treeSlice');
  const oneRing = $('#oneRingGlyph');
  $$('.ring-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      slice?.classList.add('glowing');
      oneRing?.classList.add('visible');
      // metal sparks from item
      if (window.__spawnEffectAt) {
        const r = item.getBoundingClientRect();
        window.__spawnEffectAt('metal', r.left, r.top + r.height/2, 8);
      }
    });
    item.addEventListener('mouseleave', () => {
      slice?.classList.remove('glowing');
      oneRing?.classList.remove('visible');
    });
  });

  // Click tree slice -> fire burst + trigger glow
  slice?.addEventListener('click', () => {
    if (!window.__spawnEffectAt) return;
    const r = slice.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      setTimeout(() => {
        window.__spawnEffectAt('fire', cx + Math.cos(a) * 80, cy + Math.sin(a) * 80, 2);
      }, i * 30);
    }
    slice.classList.add('glowing');
    setTimeout(() => slice.classList.remove('glowing'), 2000);
  });
}
function buildEducation(DATA) {
  const stageIcons = ['🌱', '🌿', '🌳'];
  const plantSVGs = [
    // Seedling
    `<svg class="edu-plant" viewBox="0 0 80 120" aria-hidden="true">
      <path class="stem" d="M40 120 Q40 80 42 50"/>
      <path class="leaf" d="M42 60 Q20 52 24 40 Q40 48 42 60 Z"/>
      <path class="leaf" d="M42 55 Q62 46 58 34 Q44 44 42 55 Z"/>
    </svg>`,
    // Sapling
    `<svg class="edu-plant" viewBox="0 0 80 120" aria-hidden="true">
      <path class="stem" d="M40 120 Q40 80 40 40 Q40 20 42 10"/>
      <path class="leaf" d="M42 55 Q18 48 18 32 Q38 38 42 55 Z"/>
      <path class="leaf" d="M42 45 Q64 36 62 20 Q42 30 42 45 Z"/>
      <path class="leaf" d="M42 30 Q24 22 26 8 Q40 18 42 30 Z"/>
      <path class="leaf" d="M42 20 Q56 12 58 0 Q44 10 42 20 Z"/>
    </svg>`,
    // Young tree
    `<svg class="edu-plant" viewBox="0 0 80 120" aria-hidden="true">
      <path class="stem" d="M40 120 L40 70"/>
      <path class="stem" d="M40 70 Q28 55 18 40"/>
      <path class="stem" d="M40 70 Q52 55 62 40"/>
      <path class="stem" d="M40 80 Q40 50 42 25"/>
      <path class="leaf" d="M42 30 Q10 25 14 5 Q36 18 42 30 Z"/>
      <path class="leaf" d="M42 25 Q70 18 68 0 Q44 14 42 25 Z"/>
      <path class="leaf" d="M18 40 Q2 34 6 18 Q20 30 18 40 Z"/>
      <path class="leaf" d="M62 40 Q78 34 74 18 Q60 30 62 40 Z"/>
    </svg>`
  ];
  $('#educationFlow').innerHTML = (DATA.education || []).map((ed, i) => {
    const stage = Math.min(i, 2);
    return `
    <div class="edu-card">
      ${plantSVGs[stage]}
      <div class="edu-stage-icon">${stageIcons[stage]}</div>
      <div class="edu-year">${ed.year}</div>
      <div class="edu-degree">${ed.degree}</div>
      <div class="edu-institute">${ed.institute}</div>
      <div class="edu-score">${ed.score}</div>
    </div>`;
  }).join('');

  // Click an edu-card -> leaf burst effect
  $$('.edu-card').forEach(c => {
    c.addEventListener('click', () => {
      if (!window.__spawnEffectAt) return;
      const r = c.getBoundingClientRect();
      window.__spawnEffectAt('leaf', r.left + r.width/2, r.top, 12);
    });
  });
  $('#courseworkGrid').innerHTML = (DATA.coursework || []).map(group => `
    <div class="course-group">
      <h4>${group.group}</h4>
      <div class="course-list">${group.items.map(c => `<div class="course-item">${c}</div>`).join('')}</div>
    </div>`).join('');
}
function buildBlog(DATA) {
  $('#leavesGrid').innerHTML = (DATA.blogs || []).map(b => `
    <a class="leaf-card" href="${b.url}" target="_blank" rel="noopener">
      <div class="leaf-date">${b.date}</div>
      <h3 class="leaf-title">${b.title}</h3>
      <p class="leaf-teaser">${b.teaser}</p>
      <div class="leaf-tags">${(b.tags || []).map(t => `<span class="leaf-tag">#${t}</span>`).join('')}</div>
    </a>`).join('');
}
function buildHero(DATA) {
  const badge = $('#heroBadge'); if (badge) badge.textContent = DATA.profile.badge;
  const name = $('#heroName');
  if (name) {
    const parts = (DATA.profile.name || 'Vinayak Mali').split(' ');
    name.innerHTML = parts.map((w, i) => `<span class="word" style="--d:${i}">${w}</span>`).join(' ');
  }
  const rot = $('#rotatingRole');
  if (rot) rot.innerHTML = (DATA.profile.roles || []).map(r => `<span>${r}</span>`).join('');
  const stats = $('#heroStats');
  if (stats && DATA.profile.stats) {
    stats.innerHTML = DATA.profile.stats.map((s, i) => `
      ${i > 0 ? '<div class="stat-divider"></div>' : ''}
      <div class="stat"><span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span></div>
    `).join('');
  }
}

/* ╔════════ CONSTELLATION ════════╗ */
function buildConstellation(DATA) {
  const svg = $('#constellation');
  const caption = $('#constellationCaption');
  if (!svg) return;
  const achievements = DATA.achievements || [];
  const n = achievements.length || 1;

  // New theme: concentric orbit rings with stars placed on them
  // Three rings at different radii; distribute stars with golden-angle offsets
  const cx = 500, cy = 260;
  const rings = [
    { r: 160, count: Math.ceil(n / 3) },
    { r: 225, count: Math.ceil(n / 3) },
    { r: 290, count: n - 2 * Math.ceil(n / 3) },
  ];
  // Build list of positions on orbit rings
  const positions = [];
  let idx = 0;
  rings.forEach((ring, ri) => {
    if (ring.count <= 0) return;
    const offset = ri * 0.7;
    for (let k = 0; k < ring.count && idx < n; k++, idx++) {
      const angle = offset + (k / ring.count) * Math.PI * 2;
      const aspect = 0.55; // flatten into ellipse
      positions.push({
        x: cx + Math.cos(angle) * ring.r,
        y: cy + Math.sin(angle) * ring.r * aspect,
        ring: ri,
      });
    }
  });

  // Draw orbit rings
  const ringsSVG = rings.map(ring =>
    `<ellipse class="orbit-ring" cx="${cx}" cy="${cy}" rx="${ring.r}" ry="${(ring.r * 0.55).toFixed(1)}"/>`
  ).join('');

  // Sigil shapes — small geometric figure around each star (triangle, square, hex, pent)
  const sigilShapes = (i) => {
    const sides = 3 + (i % 4);
    const R = 16;
    let d = '';
    for (let k = 0; k < sides; k++) {
      const a = (k / sides) * Math.PI * 2 - Math.PI / 2;
      d += (k ? 'L' : 'M') + (Math.cos(a) * R).toFixed(1) + ',' + (Math.sin(a) * R).toFixed(1) + ' ';
    }
    return d + 'Z';
  };

  const pointsSVG = achievements.map((a, i) => {
    const pos = positions[i] || { x: cx, y: cy };
    return `<g class="star-point" data-idx="${i}" transform="translate(${pos.x.toFixed(1)},${pos.y.toFixed(1)})">
        <path class="sigil" d="${sigilShapes(i)}"/>
        <circle class="halo" r="14"/>
        <circle class="core" r="3.5"/>
        <text x="0" y="-22" text-anchor="middle">${a.icon}</text>
      </g>`;
  }).join('');

  // Shooting stars (decorative)
  const shooters = [0, 1, 2].map(i => {
    const sx = rand(100, 900), sy = rand(40, 100);
    return `<path class="shooting-star" d="M${sx},${sy} Q${sx - 40},${sy + 20} ${sx - 80},${sy + 10}" style="animation: shoot ${rand(6,10)}s ${i * 2.5}s ease-in infinite"/>`;
  }).join('');

  svg.innerHTML = `${ringsSVG}${shooters}${pointsSVG}`;

  const stars = $$('.star-point', svg);
  stars.forEach((star, i) => {
    const show = () => {
      stars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');
      const a = achievements[i];
      caption.innerHTML = `<strong>${a.icon}</strong> &nbsp; ${a.text}`;
    };
    star.addEventListener('mouseenter', show);
    star.addEventListener('click', show);
    star.addEventListener('focus', show);
    star.setAttribute('tabindex', '0');
    // Stash base position in data attrs
    star.dataset.bx = positions[i]?.x ?? cx;
    star.dataset.by = positions[i]?.y ?? cy;
  });
  if (stars[0] && achievements[0]) {
    stars[0].classList.add('active');
    caption.innerHTML = `<strong>${achievements[0].icon}</strong> &nbsp; ${achievements[0].text}`;
  }

  // Mouse-follow parallax — stars drift from their BASE pos (no jump-to-cursor)
  const wrap = $('.constellation-wrap');
  if (wrap) {
    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1..1
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      stars.forEach((star) => {
        const depth = (+star.dataset.ring || 0) + 1;  // farther rings drift more
        const bx = +star.dataset.bx, by = +star.dataset.by;
        star.setAttribute('transform', `translate(${(bx + mx * depth * 6).toFixed(1)},${(by + my * depth * 4).toFixed(1)})`);
      });
    });
    wrap.addEventListener('mouseleave', () => {
      stars.forEach(s => {
        s.setAttribute('transform', `translate(${s.dataset.bx},${s.dataset.by})`);
      });
    });
  }
}

/* ╔════════ CONTACT ════════╗ */
function buildContact(DATA) {
  // Bubbles
  const bubLayer = $('#bubblesLayer');
  if (bubLayer) {
    let bhtml = '';
    for (let i = 0; i < 24; i++) {
      const size = rand(6, 22);
      const left = rand(0, 100);
      const rise = rand(500, 1200);
      const drift = rand(-40, 40);
      const dur = rand(7, 14);
      const delay = rand(0, 14);
      bhtml += `<span class="bubble" style="left:${left}%; width:${size}px; height:${size}px; --rise:${rise}px; --drift:${drift}px; animation-duration:${dur}s; animation-delay:-${delay}s"></span>`;
    }
    bubLayer.innerHTML = bhtml;
  }

  const channels = $('#contactChannels');
  if (!channels) return;
  channels.innerHTML = (DATA.contact?.links || []).map(link => `
    <a class="channel" href="${link.url}" target="_blank" rel="noopener">
      <span class="channel-icon">${link.icon}</span>
      <span>${link.label}</span>
    </a>`).join('');
  const emailBtn = $('#emailBtn');
  if (emailBtn && DATA.contact?.email) {
    emailBtn.dataset.email = DATA.contact.email;
    emailBtn.querySelector('span').textContent = DATA.contact.email;
    emailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailBtn.dataset.email);
        emailBtn.classList.add('copied');
        const s = emailBtn.querySelector('span');
        const orig = s.textContent;
        s.textContent = 'copied to clipboard ✓';
        setTimeout(() => { emailBtn.classList.remove('copied'); s.textContent = orig; }, 1600);
      } catch {
        window.location.href = 'mailto:' + emailBtn.dataset.email;
      }
    });
  }
}

/* ╔════════ SCROLL REVEAL + NAV ════════╗ */
function initReveal() {
  const revealables = ['.roots-grid', '.pillar', '.canopy-wrap', '.plant', '.rings-layout', '.edu-card', '.coursework-box', '.leaf-card', '.pond'];
  revealables.forEach(sel => $$(sel).forEach(el => el.classList.add('reveal')));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), idx * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
}
function initNav() {
  const burger = $('#navBurger');
  const links = $('.nav-links');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  $$('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
  const sections = $$('section[id]');
  const linkEls = $$('.nav-links a');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        linkEls.forEach(l => {
          l.style.color = l.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));
}
function initFooter() { $('#year').textContent = new Date().getFullYear(); }

/* ╔════════ FOREST SILHOUETTES ════════╗ */
function buildForestSilhouettes() {
  const far = $('.trees.far .tree-cluster');
  let farPath = '';
  for (let i = 0; i < 22; i++) {
    const x = (i / 22) * 1600 + rand(-20, 20);
    const h = rand(80, 180); const w = rand(24, 48);
    farPath += `M${x - w/2},300 L${x},${300 - h} L${x + w/2},300 Z `;
  }
  far.innerHTML = `<path d="${farPath}"/>`;
  const near = $('.trees.near .tree-cluster');
  let nearPath = '';
  for (let i = 0; i < 30; i++) {
    const x = (i / 30) * 1600 + rand(-30, 30);
    const h = rand(130, 260); const w = rand(38, 70);
    const top = 400 - h, mid1 = 400 - h * 0.55, mid2 = 400 - h * 0.25;
    nearPath += `M${x - w/2},400 L${x - w*0.35},${mid2} L${x - w/2},${mid2} L${x - w*0.35},${mid1} L${x - w/2.5},${mid1} L${x},${top} L${x + w/2.5},${mid1} L${x + w/2},${mid1} L${x + w*0.35},${mid2} L${x + w/2},${mid2} L${x + w*0.35},400 Z `;
  }
  near.innerHTML = `<path d="${nearPath}"/>`;
  // Stars
  const starsLayer = $('.stars-layer');
  let stars = '';
  for (let i = 0; i < 55; i++) {
    const cx = rand(0, 1600), cy = rand(0, 500), r = rand(0.6, 1.8);
    stars += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(2)}" style="animation-delay:${rand(0,4).toFixed(1)}s"/>`;
  }
  starsLayer.innerHTML = stars;

  // Celestial rays
  const rays = $('.rays-group');
  if (rays) {
    let rpath = '';
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const r1 = 40, r2 = 95;
      const w = 0.08;
      const x1 = Math.cos(a - w) * r1, y1 = Math.sin(a - w) * r1;
      const x2 = Math.cos(a) * r2, y2 = Math.sin(a) * r2;
      const x3 = Math.cos(a + w) * r1, y3 = Math.sin(a + w) * r1;
      rpath += `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} Z `;
    }
    rays.innerHTML = `<path d="${rpath}"/>`;
  }
}

/* ╔════════ BOOT ════════╗ */
(async function boot() {
  // Kick loader immediately (engine.js attaches it)
  const DATA = await loadData();
  window.__DATA = DATA;
  document.addEventListener('DOMContentLoaded', () => run(DATA));
  if (document.readyState !== 'loading') run(DATA);
})();

let _ran = false;
function run(DATA) {
  if (_ran) return; _ran = true;
  theme.init();
  buildForestSilhouettes();
  buildHero(DATA);
  window.__particleSystem = new ParticleSystem();
  initFireflyCursor();
  initParallax();
  buildSkillTree(DATA.skills || []);
  buildGarden(DATA);
  initModal();
  buildRings(DATA);
  buildEducation(DATA);
  buildBlog(DATA);
  buildConstellation(DATA);
  buildContact(DATA);
  initNav();
  initFooter();
  initReveal();
  // Start new effect engines
  if (window.initLoader) window.initLoader();
  if (window.initWeatherEngine) window.initWeatherEngine();
  if (window.initPondShader) window.initPondShader();
  if (window.initTextParticles) window.initTextParticles();
  if (window.initSkyShader) window.initSkyShader();
  if (window.initNebulaShader) window.initNebulaShader();
  if (window.initPlantGrowth) window.initPlantGrowth();
}
