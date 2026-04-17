/* ═══════════════════════════════════════════════════════════
   THE GROVE — script.js
   Particle systems, interactive tree, constellations,
   pond ripples, parallax, and theme management.
   ═══════════════════════════════════════════════════════════ */

/* ╔════════ DATA ════════╗ */
const DATA = {
  profile: {
    name: "Vinayak Mali",
    tagline: "Building intelligent systems at the intersection of AI, systems engineering, and software.",
    badge: "M.Tech in AI @ IIT Kharagpur",
    roles: ["AI/ML Engineer", "Systems Engineer", "Full-Stack Developer"],
  },
  skills: [
    { category: "Programming Languages", icon: "⌨", items: ["Python","C++","C","Java","JavaScript","TypeScript","SQL"] },
    { category: "AI / ML & Core CS",     icon: "⚘", items: ["PyTorch","TensorFlow","Scikit-learn","MediaPipe","LangChain","Computer Vision","NLP","Graph ML","Reinforcement Learning","Deep Learning"] },
    { category: "Tools & Frameworks",    icon: "✦", items: ["React","Node.js","Express","Flask","Git","Docker","Firebase","Oracle DB","MySQL","MongoDB","Tailwind CSS","Linux"] },
  ],
  projects: [
    { id:"cachesim", title:"CacheSim", timeline:"2025", hook:"High-fidelity cache simulator modeling L1/L2 hierarchies with configurable policies and performance metrics.", tags:["C++","Systems","Cache","Architecture"], filters:["Systems"], github:"https://github.com/malivinayak/CacheSim", demo:null, icon:"⚡",
      modal:{bullets:["Simulates L1/L2 cache hierarchies with LRU, FIFO, and LFU replacement policies","Configurable cache size, block size, and associativity parameters","Detailed hit/miss rate analysis with cycle-accurate timing","Benchmarked against standard memory traces for validation"],architecture:"Modular C++ design with templated cache levels, trace parser, and stats engine. Supports unified and split I/D cache.",stack:["C++","Make","Memory Traces","Computer Architecture"]}},
    { id:"smartrecall", title:"SmartRecall — Movie Recommender", timeline:"2023", hook:"Content-based movie recommendation engine analyzing 5,000+ films via NLP similarity.", tags:["Python","ML","NLP","Streamlit"], filters:["AI/ML"], github:null, demo:"https://www.youtube.com/watch?v=q1B7qrYaqpU", icon:"🎬",
      modal:{bullets:["Content-based filtering using bag-of-words and cosine similarity on TMDB 5000 dataset","Feature vectors from genres, cast, crew, and overview metadata","Interactive Streamlit UI with poster display and instant recommendations","Relevant top-5 suggestions across diverse genre preferences"],architecture:"Pandas preprocessing → Scikit-learn CountVectorizer → cosine similarity matrix → Streamlit + TMDB API.",stack:["Python","Scikit-learn","Pandas","Streamlit","TMDB API"]}},
    { id:"shadowprompt", title:"ShadowPrompt", timeline:"2024", hook:"Security research framework exploring prompt injection and adversarial attacks on LLM systems.", tags:["Python","LLM","Security","Prompt Eng."], filters:["AI/ML","Security"], github:"https://github.com/malivinayak/ShadowPrompt", demo:null, icon:"🛡",
      modal:{bullets:["Framework for testing LLM robustness against prompt injection vectors","Classified common adversarial prompt patterns and attack surfaces","Tested across multiple LLM providers to evaluate safety mechanisms","Findings to inform safer AI system design"],architecture:"Python test harness with configurable attack templates, response analysis pipeline, and automated vulnerability scoring.",stack:["Python","LangChain","OpenAI API","AI Safety"]}},
    { id:"mtp-traffic", title:"ML Surrogates for Traffic Simulation", timeline:"2025 · M.Tech Thesis", hook:"Neural surrogates replacing expensive SUMO traffic micro-simulations with 50x+ speedup.", tags:["Python","PyTorch","SUMO","Surrogate"], filters:["AI/ML","Systems"], github:null, demo:null, icon:"🚦",
      modal:{bullets:["Neural network surrogates approximating SUMO micro-simulation outputs","50x+ speedup over traditional simulation with minimal accuracy loss","Feature engineering from intersection geometry, signal timing, and flow data","M.Tech thesis project at IIT Kharagpur"],architecture:"SUMO simulation → data pipeline → feature engineering → PyTorch neural surrogate → validation.",stack:["Python","PyTorch","SUMO","Pandas","NumPy"]}},
    { id:"taxi-mgmt", title:"Trip & Taxi Management System", timeline:"2022", hook:"Full-stack web app with booking, wallet, rewards, and driver management on Oracle DB.", tags:["Express.js","Oracle DB","Node.js"], filters:["Web","DB"], github:"https://github.com/malivinayak/Taxi-Management-System", demo:null, icon:"🚕",
      modal:{bullets:["User and driver registration with role-based access","Real-time trip booking with fare calculation and dynamic status","Wallet system for payments and driver reward accumulation","Oracle DB schema with triggers, procedures, and optimized queries"],architecture:"Express.js REST API → Oracle DB with PL/SQL → Bootstrap frontend with AJAX.",stack:["Node.js","Express.js","Oracle DB","PL/SQL","Bootstrap"]}},
    { id:"fall-detection", title:"Pose-Based Fall Detection", timeline:"2023", hook:"Real-time fall detection using MediaPipe pose estimation — 91.5% accuracy on standard CPUs.", tags:["Python","MediaPipe","CV","ML"], filters:["AI/ML"], github:null, demo:"https://arxiv.org/pdf/2503.19501", icon:"🏃",
      modal:{bullets:["Real-time fall detection via MediaPipe pose landmark extraction","Custom voting mechanism combining multiple classifiers","91.54% accuracy without GPU on standard hardware","Applicable to elderly care and workplace safety"],architecture:"Video → MediaPipe pose → feature engineering (angles, velocities) → ensemble classifier → alert system.",stack:["Python","MediaPipe","Scikit-learn","OpenCV"]}},
    { id:"nextsquare", title:"NextSquare Company Website", timeline:"2023", hook:"Production company website — React, 20% load time cut, 99.9% uptime on Hostinger VPS.", tags:["React","Tailwind","Node.js","VPS"], filters:["Web"], github:null, demo:"https://nextsquare.malivinayak.com/", icon:"🌐",
      modal:{bullets:["Responsive, SEO-optimized company site during internship","20% load time reduction via lazy loading and code splitting","Deployed on Hostinger VPS + Nginx with 99.9% uptime","Mobile-first design with smooth animations"],architecture:"React SPA → Tailwind CSS → Node.js backend → Nginx on Hostinger VPS.",stack:["React","Tailwind CSS","Node.js","Nginx"]}},
  ],
  projectFilters: ["All", "AI/ML", "Systems", "Web", "DB", "Security"],
  experience: [
    { role:"Teaching Assistant — Machine Learning", company:"IIT Kharagpur, Department of AI", period:"Jul 2025 – Present",
      bullets:["Assisted with coursework and labs for graduate Machine Learning","Mentored students on assignments, projects, and doubt sessions"], link:null },
    { role:"Software Engineer Intern", company:"NextSquare Technologies, Pune", period:"Jan 2023 – Jul 2023",
      bullets:["Built and deployed the company's responsive website using React and Tailwind CSS","Optimized backend performance, reducing page load times by 20%","Deployed on Hostinger VPS with Nginx, achieving 99.9% uptime","Integrated real-time Firebase features and enhanced overall UX"],
      link:{label:"View live work",url:"https://nextsquare.malivinayak.com/"} },
  ],
  education: [
    { degree:"M.Tech in Artificial Intelligence", institute:"Indian Institute of Technology (IIT) Kharagpur", year:"2024 – 2026", score:"CGPA · 8.45 / 10" },
    { degree:"B.Tech in Computer Science & Engineering", institute:"Kolhapur Institute of Technology's College of Engineering", year:"2019 – 2023", score:"CGPA · 8.67 / 10" },
  ],
  coursework: [
    { group:"AI / Machine Learning", items:["Machine Learning","Deep Learning","Visual Computing","Graph Machine Learning","Natural Language Processing","Reinforcement Learning"] },
    { group:"Computer Science Core", items:["Data Structures & Algorithms","Operating Systems","Computer Networks","Database Management Systems","Computer Architecture","Software Engineering"] },
  ],
  blogs: [
    { title:"GenAI-1: What is a Language Model?", teaser:"We all heard about LLMs (Large Language Models) — but before understanding LLMs, what exactly is a language model?", tags:["AI","GenAI","LLM"], date:"Sep 18, 2025", url:"https://blog.malivinayak.com/genai-1-what-is-a-language-model" },
    { title:"Adventures Journey of Question and Answer", teaser:"Lets start the learning journey with every post: one question, one answer — a simple way to grow consistently.", tags:["AI","ML","GenAI"], date:"Sep 18, 2025", url:"https://blog.malivinayak.com/adventures-journey-of-question-and-answer" },
    { title:"How to install conda in Ubuntu", teaser:"Install Miniconda on Ubuntu and set up conda quickly (wget installer → bash install → initialize shell).", tags:["Ubuntu","Conda","Setup"], date:"Aug 18, 2025", url:"https://blog.malivinayak.com/how-to-install-conda-in-ubuntu" },
    { title:"Journey of Compiler", teaser:"A beginner-friendly tour of compiler design — why compilers exist, and how the compilation pipeline works end-to-end.", tags:["Compilers","CS"], date:"Apr 16, 2024", url:"https://blog.malivinayak.com/journey-of-compiler" },
    { title:"Characteristics of C Programming", teaser:"Six core characteristics: keywords, operators, separators, constants, predefined functions, and syntax.", tags:["C","Programming"], date:"Oct 9, 2023", url:"https://blog.malivinayak.com/characteristics-of-c-programming" },
  ],
  achievements: [
    { icon:"🏅", text:"GATE 2024 — AIR 716, 99.36 Percentile (CS/IT)" },
    { icon:"🎓", text:"M.Tech Admission — IIT Kharagpur, AI Specialization" },
    { icon:"🥇", text:"Excellent (Top 15%) — CTB Design Verification Hackathon, IIT Madras" },
    { icon:"🥇", text:"Excellent (Top 15%) — Mixed Signal Marathon, IIT Bombay" },
    { icon:"💻", text:"200+ problems solved on LeetCode and coding platforms" },
    { icon:"🌟", text:"Shipped production website with 99.9% uptime at NextSquare" },
    { icon:"📝", text:"Published technical blog posts on programming and systems" },
    { icon:"🔓", text:"Open-source contributor — 33+ public GitHub repos" },
  ],
  contact: {
    email: "malivinayak012@gmail.com",
    links: [
      { icon:"✉", label:"Email",    url:"mailto:malivinayak012@gmail.com" },
      { icon:"in", label:"LinkedIn", url:"https://www.linkedin.com/in/malivinayak/" },
      { icon:"gh", label:"GitHub",   url:"https://github.com/malivinayak" },
      { icon:"◉", label:"Website",  url:"https://malivinayak.com/" },
      { icon:"✎", label:"Blog",     url:"https://blog.malivinayak.com/" },
    ],
  },
};

/* ╔════════ UTILITIES ════════╗ */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));

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
    });
  },
  apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    // Regenerate particles appropriate to theme
    if (window.__particleSystem) window.__particleSystem.reset();
  },
};

/* ╔════════ BACKGROUND SCENE GENERATORS ════════╗ */
function buildForestSilhouettes() {
  // Far trees
  const far = $('.trees.far .tree-cluster');
  let farPath = '';
  const farCount = 22;
  for (let i = 0; i < farCount; i++) {
    const x = (i / farCount) * 1600 + rand(-20, 20);
    const h = rand(80, 180);
    const w = rand(24, 48);
    farPath += triangleTree(x, 300, h, w);
  }
  far.innerHTML = `<path d="${farPath} M0,300 L1600,300 L1600,300 Z"/>`;

  // Near trees (taller, denser)
  const near = $('.trees.near .tree-cluster');
  let nearPath = '';
  const nearCount = 30;
  for (let i = 0; i < nearCount; i++) {
    const x = (i / nearCount) * 1600 + rand(-30, 30);
    const h = rand(130, 260);
    const w = rand(38, 70);
    nearPath += pineTree(x, 400, h, w);
  }
  near.innerHTML = `<path d="${nearPath} M0,400 L1600,400 L1600,400 Z"/>`;

  // Stars (night)
  const starsLayer = $('.stars-layer');
  let stars = '';
  for (let i = 0; i < 55; i++) {
    const cx = rand(0, 1600);
    const cy = rand(0, 500);
    const r  = rand(0.6, 1.8);
    const delay = rand(0, 4);
    stars += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(2)}" style="animation-delay:${delay.toFixed(1)}s"/>`;
  }
  starsLayer.innerHTML = stars;
}

function triangleTree(x, baseY, h, w) {
  // Simple stylized triangular tree path
  return `M${x - w/2},${baseY} L${x},${baseY - h} L${x + w/2},${baseY} Z `;
}

function pineTree(x, baseY, h, w) {
  // Layered pine — three tiers
  const top = baseY - h;
  const mid1 = baseY - h * 0.55;
  const mid2 = baseY - h * 0.25;
  return `M${x - w/2},${baseY} L${x - w*0.35},${mid2} L${x - w/2},${mid2} L${x - w*0.35},${mid1} L${x - w/2.5},${mid1} L${x},${top} L${x + w/2.5},${mid1} L${x + w/2},${mid1} L${x + w*0.35},${mid2} L${x + w/2},${mid2} L${x + w*0.35},${baseY} Z `;
}

/* ╔════════ PARTICLE SYSTEM ════════╗ */
class ParticleSystem {
  constructor() {
    this.canvas = $('#particles');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.reset();
    window.addEventListener('resize', () => { this.resize(); this.reset(); });
    this.tick();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width  = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width  = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }

  reset() {
    this.particles = [];
    const night = document.documentElement.getAttribute('data-theme') === 'night';
    const count = Math.min(Math.floor(this.w / 18), 60);
    for (let i = 0; i < count; i++) {
      this.particles.push(this.spawn(night));
    }
  }

  spawn(isNight) {
    if (isNight) {
      return {
        type: 'firefly',
        x: rand(0, this.w),
        y: rand(0, this.h),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.4, 0.2),
        r: rand(1, 2.2),
        phase: rand(0, Math.PI * 2),
        phaseSpeed: rand(0.015, 0.04),
        color: Math.random() > 0.7 ? '#fff3c4' : '#ffd166',
      };
    } else {
      return {
        type: 'leaf',
        x: rand(0, this.w),
        y: rand(-30, this.h),
        vx: rand(-0.4, 0.4),
        vy: rand(0.3, 1.0),
        r: rand(2, 4),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.02, 0.02),
        color: ['#7fb069','#a7c957','#f4a261','#8b6f47'][randInt(0,3)],
      };
    }
  }

  tick() {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const night = document.documentElement.getAttribute('data-theme') === 'night';

    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.type === 'firefly') {
        p.phase += p.phaseSpeed;
        // gentle wander
        p.vx += rand(-0.02, 0.02);
        p.vy += rand(-0.02, 0.02);
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
        // wrap
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
        // leaf
        p.rot += p.rotSpeed;
        p.vx += Math.sin(p.y * 0.01) * 0.01;
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

/* ╔════════ FIREFLY CURSOR ════════╗ */
function initFireflyCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  const cursor = $('.firefly-cursor');
  let x = 0, y = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  // Hover state on interactive elements
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .plant, .leaf-card, .star-point, .legend-btn')) {
      cursor.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .plant, .leaf-card, .star-point, .legend-btn')) {
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
    { el: $('.celestial'),     factor: -0.1 },
  ];

  let scrollY = 0;
  let target = 0;

  window.addEventListener('scroll', () => {
    target = window.scrollY;
  }, { passive: true });

  function loop() {
    scrollY += (target - scrollY) * 0.1;
    layers.forEach(({ el, factor }) => {
      if (!el) return;
      el.style.transform = `translateY(${scrollY * factor}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ╔════════ SKILL TREE ════════╗ */
function buildSkillTree() {
  // Leaf positions roughly along each branch (normalized)
  const branchLeafPositions = [
    // Languages branch — along curve from trunk (400,380) leftward to (110,280)
    [[370,350],[330,335],[290,325],[250,315],[210,305],[170,295],[140,285],[115,275]],
    // AI/ML branch — up from (400,280) to top-right (460,70)
    [[405,240],[410,210],[420,180],[428,150],[435,120],[445,95],[455,75],[465,55],[470,35],[460,20]],
    // Tools branch — right from (400,360) to (710,290)
    [[430,355],[470,345],[510,335],[550,325],[590,320],[630,315],[660,305],[690,300],[720,285],[700,275],[750,300],[625,290]],
  ];

  const leafShape = (x, y, rotation, idx) =>
    `<g class="leaf-shape" transform="translate(${x},${y}) rotate(${rotation})" data-idx="${idx}">
       <path d="M0,-8 C4,-7 7,-4 7,0 C7,5 2,9 0,11 C-2,9 -7,5 -7,0 C-7,-4 -4,-7 0,-8 Z"/>
       <path d="M0,-6 L0,10" stroke="rgba(40,40,25,0.5)" stroke-width="0.6" fill="none"/>
     </g>`;

  const legendWrap = $('#branchLegend');
  legendWrap.innerHTML = '';

  DATA.skills.forEach((skill, i) => {
    const group = $(`.leaves-group[data-branch="${i}"]`);
    const positions = branchLeafPositions[i];
    const count = Math.min(skill.items.length, positions.length);
    let leaves = '';
    for (let j = 0; j < count; j++) {
      const [x, y] = positions[j];
      const rot = rand(-40, 40);
      leaves += leafShape(x, y, rot, j);
    }
    // Add a few extra decorative leaves if items > positions
    if (skill.items.length > positions.length) {
      for (let j = positions.length; j < skill.items.length; j++) {
        const [x, y] = positions[(j * 3) % positions.length];
        const rot = rand(-40, 40);
        leaves += leafShape(x + rand(-15, 15), y + rand(-15, 15), rot, j);
      }
    }
    group.innerHTML = leaves;

    // Legend button
    const btn = document.createElement('button');
    btn.className = 'legend-btn';
    btn.dataset.branch = i;
    btn.innerHTML = `
      <div class="legend-header">
        <span class="legend-icon">${skill.icon}</span>
        <span class="legend-name">${skill.category}</span>
        <span class="legend-count">${skill.items.length}</span>
      </div>
      <div class="legend-items">
        ${skill.items.map(item => `<span class="legend-tag">${item}</span>`).join('')}
      </div>`;
    btn.addEventListener('click', () => activateBranch(i));
    btn.addEventListener('mouseenter', () => activateBranch(i));
    legendWrap.appendChild(btn);
  });

  // Activate first by default
  setTimeout(() => activateBranch(1), 400);
}

function activateBranch(index) {
  $$('.branch').forEach(b => b.classList.toggle('active', +b.dataset.branch === index));
  $$('.leaves-group').forEach(g => g.classList.toggle('active', +g.dataset.branch === index));
  $$('.legend-btn').forEach(b => b.classList.toggle('active', +b.dataset.branch === index));
}

/* ╔════════ GARDEN / PROJECTS ════════╗ */
function buildGarden() {
  const grid = $('#gardenGrid');
  const filtersWrap = $('#gardenFilters');

  filtersWrap.innerHTML = DATA.projectFilters.map((f, i) =>
    `<button class="filter-chip${i === 0 ? ' active' : ''}" data-filter="${f}">${f}</button>`
  ).join('');

  const renderProjects = (filter) => {
    const list = filter === 'All'
      ? DATA.projects
      : DATA.projects.filter(p => p.filters.includes(filter));

    grid.innerHTML = list.map(p => `
      <article class="plant" data-id="${p.id}">
        <div class="plant-top">
          <span class="plant-icon">${p.icon}</span>
          <span class="plant-timeline">${p.timeline}</span>
        </div>
        <h3 class="plant-title">${p.title}</h3>
        <p class="plant-hook">${p.hook}</p>
        <div class="plant-tags">
          ${p.tags.map(t => `<span class="plant-tag">${t}</span>`).join('')}
        </div>
        <span class="plant-cta">open ↗</span>
      </article>`).join('');

    $$('.plant').forEach(card => {
      card.addEventListener('click', () => openProjectModal(card.dataset.id));
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

function openProjectModal(id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p) return;
  const modal = $('#projectModal');
  const content = $('#modalContent');

  const actions = [];
  if (p.github) actions.push(`<a class="cta cta-primary" href="${p.github}" target="_blank" rel="noopener"><span>View on GitHub</span></a>`);
  if (p.demo)   actions.push(`<a class="cta cta-ghost" href="${p.demo}" target="_blank" rel="noopener"><span>See demo / paper</span></a>`);

  content.innerHTML = `
    <h2 class="modal-title" id="modalTitle">${p.icon} ${p.title}</h2>
    <div class="modal-timeline">${p.timeline}</div>
    <div class="modal-hook">${p.hook}</div>

    <h3 class="modal-h3">What it does</h3>
    <ul class="modal-bullets">
      ${p.modal.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>

    <h3 class="modal-h3">Architecture</h3>
    <div class="modal-arch">${p.modal.architecture}</div>

    <h3 class="modal-h3">Stack</h3>
    <div class="modal-stack">
      ${p.modal.stack.map(s => `<span class="modal-stack-tag">${s}</span>`).join('')}
    </div>

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

/* ╔════════ EXPERIENCE / RINGS ════════╗ */
function buildRings() {
  const list = $('#ringsList');
  list.innerHTML = DATA.experience.map(exp => `
    <div class="ring-item">
      <div class="ring-item-head">
        <div class="ring-role">${exp.role}</div>
        <div class="ring-period">${exp.period}</div>
      </div>
      <div class="ring-company">${exp.company}</div>
      ${exp.bullets.length ? `
        <ul class="ring-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>` : ''}
      ${exp.link ? `<a class="ring-link" href="${exp.link.url}" target="_blank" rel="noopener">${exp.link.label} →</a>` : ''}
    </div>`).join('');
}

/* ╔════════ EDUCATION / SAPLING ════════╗ */
function buildEducation() {
  $('#educationFlow').innerHTML = DATA.education.map(ed => `
    <div class="edu-card">
      <div class="edu-year">${ed.year}</div>
      <div class="edu-degree">${ed.degree}</div>
      <div class="edu-institute">${ed.institute}</div>
      <div class="edu-score">${ed.score}</div>
    </div>`).join('');

  $('#courseworkGrid').innerHTML = DATA.coursework.map(group => `
    <div class="course-group">
      <h4>${group.group}</h4>
      <div class="course-list">
        ${group.items.map(c => `<div class="course-item">${c}</div>`).join('')}
      </div>
    </div>`).join('');
}

/* ╔════════ BLOG / LEAVES ════════╗ */
function buildBlog() {
  $('#leavesGrid').innerHTML = DATA.blogs.map(b => `
    <a class="leaf-card" href="${b.url}" target="_blank" rel="noopener">
      <div class="leaf-date">${b.date}</div>
      <h3 class="leaf-title">${b.title}</h3>
      <p class="leaf-teaser">${b.teaser}</p>
      <div class="leaf-tags">
        ${b.tags.map(t => `<span class="leaf-tag">#${t}</span>`).join('')}
      </div>
    </a>`).join('');
}

/* ╔════════ CONSTELLATION / ACHIEVEMENTS ════════╗ */
function buildConstellation() {
  const svg = $('#constellation');
  const caption = $('#constellationCaption');
  const achievements = DATA.achievements;

  // Hand-tuned positions for the constellation (8 points roughly along a meaningful shape)
  const positions = [
    { x: 100, y: 380 },
    { x: 220, y: 280 },
    { x: 340, y: 200 },
    { x: 470, y: 130 },
    { x: 600, y: 190 },
    { x: 720, y: 270 },
    { x: 830, y: 350 },
    { x: 900, y: 220 },
  ];

  // Lines connecting stars in sequence
  let linePath = '';
  for (let i = 0; i < positions.length - 1; i++) {
    linePath += `${i === 0 ? 'M' : 'L'}${positions[i].x},${positions[i].y} `;
  }
  linePath += `L${positions[positions.length - 1].x},${positions[positions.length - 1].y}`;

  let pointsSVG = achievements.map((a, i) => {
    const pos = positions[i % positions.length];
    return `
      <g class="star-point" data-idx="${i}" transform="translate(${pos.x},${pos.y})">
        <circle class="halo" r="18"/>
        <circle class="halo" r="12"/>
        <circle class="core" r="4"/>
        <text x="0" y="-20" text-anchor="middle">${a.icon}</text>
      </g>`;
  }).join('');

  svg.innerHTML = `
    <path class="constellation-line" d="${linePath}"/>
    ${pointsSVG}
  `;

  const stars = $$('.star-point', svg);
  stars.forEach(star => {
    const idx = +star.dataset.idx;
    const show = () => {
      stars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');
      const a = achievements[idx];
      caption.innerHTML = `<strong>${a.icon}</strong> &nbsp; ${a.text}`;
    };
    star.addEventListener('mouseenter', show);
    star.addEventListener('click', show);
    star.addEventListener('focus', show);
    star.setAttribute('tabindex', '0');
  });

  // Start with first
  if (stars[0]) {
    stars[0].classList.add('active');
    caption.innerHTML = `<strong>${achievements[0].icon}</strong> &nbsp; ${achievements[0].text}`;
  }
}

/* ╔════════ POND / CONTACT ════════╗ */
function buildPond() {
  // Channels
  const channels = $('#contactChannels');
  channels.innerHTML = DATA.contact.links.map(link => `
    <a class="channel" href="${link.url}" target="_blank" rel="noopener">
      <span class="channel-icon">${link.icon}</span>
      <span>${link.label}</span>
    </a>`).join('');

  // Email copy
  const emailBtn = $('#emailBtn');
  emailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailBtn.dataset.email);
      emailBtn.classList.add('copied');
      const original = emailBtn.querySelector('span').textContent;
      emailBtn.querySelector('span').textContent = 'copied to clipboard ✓';
      setTimeout(() => {
        emailBtn.classList.remove('copied');
        emailBtn.querySelector('span').textContent = original;
      }, 1600);
    } catch {
      window.location.href = 'mailto:' + emailBtn.dataset.email;
    }
  });

  // Pond ripple canvas
  initPondRipples();
}

function initPondRipples() {
  const canvas = $('#pondCanvas');
  const pond = $('#pond');
  const ctx = canvas.getContext('2d');
  let ripples = [];
  let W = 0, H = 0;

  const resize = () => {
    const rect = pond.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    W = rect.width;
    H = rect.height;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const addRipple = (x, y) => {
    ripples.push({ x, y, r: 0, alpha: 0.6, maxR: Math.max(W, H) * 0.6 });
    if (ripples.length > 18) ripples.shift();
  };

  pond.addEventListener('pointermove', e => {
    const rect = pond.getBoundingClientRect();
    // throttle via small probability
    if (Math.random() < 0.04) {
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    }
  });

  pond.addEventListener('click', e => {
    const rect = pond.getBoundingClientRect();
    for (let i = 0; i < 2; i++) {
      addRipple(e.clientX - rect.left + rand(-3, 3), e.clientY - rect.top + rand(-3, 3));
    }
  });

  // Ambient ripples
  setInterval(() => {
    addRipple(rand(W * 0.2, W * 0.8), rand(H * 0.2, H * 0.8));
  }, 2200);

  function tick() {
    ctx.clearRect(0, 0, W, H);
    ripples = ripples.filter(r => r.alpha > 0.01);
    ripples.forEach(r => {
      r.r += 1.3;
      r.alpha *= 0.985;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(125, 180, 120, ${r.alpha.toFixed(3)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* ╔════════ SCROLL REVEAL ════════╗ */
function initReveal() {
  const revealables = [
    '.roots-grid', '.pillar', '.canopy-wrap', '.plant',
    '.rings-layout', '.edu-card', '.coursework-box',
    '.leaf-card', '.pond'
  ];
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

/* ╔════════ NAV MOBILE BURGER ════════╗ */
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

  // Active section highlight
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

/* ╔════════ FOOTER ════════╗ */
function initFooter() {
  $('#year').textContent = new Date().getFullYear();
}

/* ╔════════ BOOT ════════╗ */
document.addEventListener('DOMContentLoaded', () => {
  theme.init();
  buildForestSilhouettes();
  window.__particleSystem = new ParticleSystem();
  initFireflyCursor();
  initParallax();
  buildSkillTree();
  buildGarden();
  initModal();
  buildRings();
  buildEducation();
  buildBlog();
  buildConstellation();
  buildPond();
  initNav();
  initFooter();
  initReveal();
});
