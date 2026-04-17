/* ============================================================
   VINAYAK MALI — PORTFOLIO v2
   DATA object + rendering + Hyperplexed-style interactions
   ============================================================ */

// ─────────────────────────────────────────────
// DATA — EDIT HERE TO UPDATE THE SITE
// ─────────────────────────────────────────────
const DATA = {
  profile: {
    name: "Vinayak Mali",
    tagline: "Building intelligent systems at the intersection of AI, systems engineering, and software.",
    badge: "✦ M.Tech in AI @ IIT Kharagpur",
    roles: ["AI/ML Engineer", "Systems Engineer", "Full-Stack Developer"],
  },

  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Blog", href: "#blog" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ],

  /* Hero CTAs — contact button removed per request */
  ctas: [
    { label: "View Projects", href: "#projects", primary: true },
    { label: "Read Blog", href: "https://blog.malivinayak.com/", external: true },
  ],

  stats: [
    { label: "GATE 2024", value: "AIR 716", ribbon: "99.36 Percentile · CS/IT" },
    { label: "CGPA", value: "8.45/10", ribbon: "IIT Kharagpur · M.Tech AI" },
    { label: "Repos", value: "33+", ribbon: "Open source on GitHub" },
    { label: "IIT KGP", value: "M.Tech AI", ribbon: "2024–2026 Specialization" },
  ],

  about: {
    text: `M.Tech student at <strong>IIT Kharagpur</strong> specializing in Artificial Intelligence, with a strong foundation in computer science and hands-on experience across <strong>machine learning, computer vision, systems programming, and full-stack development</strong>. I build solutions that are technically rigorous and practically impactful — from cache simulators and traffic micro-simulation to AI-powered recommendation engines.`,
    highlights: [
      { icon: "🧠", title: "AI & ML Research", desc: "Deep learning, CV, graph ML, surrogate models" },
      { icon: "⚙️", title: "Systems Engineering", desc: "Cache simulation, OS internals, performance" },
      { icon: "🚀", title: "Full-Stack Dev", desc: "React, Node, databases, cloud deployment" },
      { icon: "🏆", title: "Competitive Achiever", desc: "GATE AIR 716, top hackathon finishes" },
    ],
  },

  skills: [
    { category: "Programming Languages", icon: "⌨️", items: ["Python", "C++", "C", "Java", "JavaScript", "TypeScript", "SQL"] },
    { category: "AI/ML & Computer Science", icon: "🤖", items: ["PyTorch", "TensorFlow", "Scikit-learn", "MediaPipe", "LangChain", "Computer Vision", "NLP", "Graph ML", "Reinforcement Learning", "Deep Learning"] },
    { category: "Tools & Software", icon: "🛠️", items: ["React", "Node.js", "Express", "Flask", "Git", "Docker", "Firebase", "Oracle DB", "MySQL", "MongoDB", "Tailwind CSS", "Linux", "VS Code"] },
  ],

  projects: [
    {
      id: "cachesim", title: "CacheSim", timeline: "2025",
      hook: "High-fidelity cache simulator modeling L1/L2 hierarchies with configurable policies and performance metrics.",
      tags: ["C++", "Systems", "Cache", "Architecture"], filters: ["Systems"],
      github: "https://github.com/malivinayak/CacheSim", demo: null, icon: "⚡",
      modal: {
        bullets: ["Simulates L1/L2 cache hierarchies with LRU, FIFO, and LFU replacement policies", "Configurable cache size, block size, and associativity parameters", "Detailed hit/miss rate analysis with cycle-accurate timing", "Benchmarked against standard memory traces for validation"],
        architecture: "Modular C++ design with templated cache levels, trace parser, and stats engine. Supports unified and split I/D cache.",
        stack: ["C++", "Make", "Memory Traces", "Computer Architecture"],
      },
    },
    {
      id: "smartrecall", title: "SmartRecall — Movie Recommender", timeline: "2023",
      hook: "Content-based movie recommendation engine analyzing 5,000+ films via NLP similarity.",
      tags: ["Python", "ML", "NLP", "Scikit-learn", "Streamlit"], filters: ["AI/ML"],
      github: null, demo: "https://www.youtube.com/watch?v=q1B7qrYaqpU", icon: "🎬",
      modal: {
        bullets: ["Content-based filtering using bag-of-words and cosine similarity on TMDB 5000 dataset", "Feature vectors from genres, cast, crew, and overview metadata", "Interactive Streamlit UI with poster display and instant recommendations", "Relevant top-5 suggestions across diverse genre preferences"],
        architecture: "Pandas preprocessing → Scikit-learn CountVectorizer → cosine similarity matrix → Streamlit + TMDB API.",
        stack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "TMDB API"],
      },
    },
    {
      id: "shadowprompt", title: "ShadowPrompt", timeline: "2024",
      hook: "Security research framework exploring prompt injection and adversarial attacks on LLM systems.",
      tags: ["Python", "LLM", "Security", "Prompt Eng."], filters: ["AI/ML", "Security"],
      github: "https://github.com/malivinayak/ShadowPrompt", demo: null, icon: "🛡️",
      modal: {
        bullets: ["Framework for testing LLM robustness against prompt injection vectors", "Classified common adversarial prompt patterns and attack surfaces", "Tested across multiple LLM providers to evaluate safety mechanisms", "Findings to inform safer AI system design"],
        architecture: "Python test harness with configurable attack templates, response analysis pipeline, and automated vulnerability scoring.",
        stack: ["Python", "LangChain", "OpenAI API", "AI Safety"],
      },
    },
    {
      id: "mtp-traffic", title: "ML Surrogates for Traffic Simulation", timeline: "2025 · M.Tech Thesis",
      hook: "Neural surrogates replacing expensive SUMO traffic micro-simulations with 50x+ speedup.",
      tags: ["Python", "PyTorch", "SUMO", "Surrogate"], filters: ["AI/ML", "Systems"],
      github: null, demo: null, icon: "🚦",
      modal: {
        bullets: ["Neural network surrogates approximating SUMO micro-simulation outputs", "50x+ speedup over traditional simulation with minimal accuracy loss", "Feature engineering from intersection geometry, signal timing, and flow data", "M.Tech thesis project at IIT Kharagpur"],
        architecture: "SUMO simulation → data pipeline → feature engineering → PyTorch neural surrogate → validation.",
        stack: ["Python", "PyTorch", "SUMO", "Pandas", "NumPy"],
      },
    },
    {
      id: "taxi-mgmt", title: "Trip & Taxi Management System", timeline: "2022",
      hook: "Full-stack web app with booking, wallet, rewards, and driver management on Oracle DB.",
      tags: ["Express.js", "Oracle DB", "Bootstrap", "Node.js"], filters: ["Web", "DB"],
      github: "https://github.com/malivinayak/Taxi-Management-System", demo: null, icon: "🚕",
      modal: {
        bullets: ["User and driver registration with role-based access", "Real-time trip booking with fare calculation and dynamic status", "Wallet system for payments and driver reward accumulation", "Oracle DB schema with triggers, procedures, and optimized queries"],
        architecture: "Express.js REST API → Oracle DB with PL/SQL → Bootstrap frontend with AJAX.",
        stack: ["Node.js", "Express.js", "Oracle DB", "PL/SQL", "Bootstrap"],
      },
    },
    {
      id: "fall-detection", title: "Pose-Based Fall Detection", timeline: "2023",
      hook: "Real-time fall detection using MediaPipe pose estimation — 91.5% accuracy on standard CPUs.",
      tags: ["Python", "MediaPipe", "CV", "ML"], filters: ["AI/ML"],
      github: null, demo: "https://arxiv.org/pdf/2503.19501", icon: "🏃",
      modal: {
        bullets: ["Real-time fall detection via MediaPipe pose landmark extraction", "Custom voting mechanism combining multiple classifiers", "91.54% accuracy without GPU on standard hardware", "Applicable to elderly care and workplace safety"],
        architecture: "Video → MediaPipe pose → feature engineering (angles, velocities) → ensemble classifier → alert system.",
        stack: ["Python", "MediaPipe", "Scikit-learn", "OpenCV"],
      },
    },
    {
      id: "nextsquare", title: "NextSquare Company Website", timeline: "2023",
      hook: "Production company website — React, 20% load time cut, 99.9% uptime on Hostinger VPS.",
      tags: ["React", "Tailwind CSS", "Node.js", "VPS"], filters: ["Web"],
      github: null, demo: "https://nextsquare.malivinayak.com/", icon: "🌐",
      modal: {
        bullets: ["Responsive, SEO-optimized company site during internship", "20% load time reduction via lazy loading and code splitting", "Deployed on Hostinger VPS + Nginx with 99.9% uptime", "Mobile-first design with smooth animations"],
        architecture: "React SPA → Tailwind CSS → Node.js backend → Nginx on Hostinger VPS.",
        stack: ["React", "Tailwind CSS", "Node.js", "Nginx"],
      },
    },
  ],

  projectFilters: ["All", "AI/ML", "Systems", "Web", "DB", "Security"],

  experience: [
    {
      role: "Teaching Assistant — Machine Learning",
      company: "IIT Kharagpur, Department of AI",
      period: "Jul 2025 – Present",
      bullets: [
      ],
      link: null,
    },
    {
      role: "Software Engineer Intern",
      company: "NextSquare Technologies, Pune",
      period: "Jan 2023 – Jul 2023",
      bullets: [
        "Built and deployed the company's responsive website using React and Tailwind CSS",
        "Optimized backend performance, reducing page load times by 20%",
        "Deployed on Hostinger VPS with Nginx, achieving 99.9% uptime",
        "Integrated real-time Firebase features and enhanced overall UX",
      ],
      link: { label: "View Live Work →", url: "https://nextsquare.malivinayak.com/" },
    },
  ],

  education: [
    { degree: "M.Tech in Artificial Intelligence", institute: "Indian Institute of Technology (IIT) Kharagpur", year: "2024 – 2026", score: "CGPA: 8.45 / 10" },
    { degree: "B.Tech in Computer Science & Engineering", institute: "Kolhapur Institute of Technology's College of Engineering", year: "2019 – 2023", score: "CGPA: 8.67 / 10" },
  ],

  blogs: [
    {
      title: "GenAI-1: What is a Language Model?",
      teaser: "We all heard about LLMs (Large Language Models) — but before understanding LLMs, what exactly is a language model?",
      tags: ["AI", "ML", "GenAI", "LLM", "ChatGPT"],
      date: "Sep 18, 2025",
      url: "https://blog.malivinayak.com/genai-1-what-is-a-language-model",
    },
    {
      title: "Adventures Journey of Question and Answer",
      teaser: "Lets start the learning journey with every post: one question, one answer — a simple way to grow consistently.",
      tags: ["AI", "ML", "GenAI"],
      date: "Sep 18, 2025",
      url: "https://blog.malivinayak.com/adventures-journey-of-question-and-answer",
    },
    {
      title: "How to install conda in Ubuntu",
      teaser: "Install Miniconda on Ubuntu and set up conda quickly (wget installer → bash install → initialize shell).",
      tags: ["Ubuntu", "CondaEnvironments", "Installation"],
      date: "Aug 18, 2025",
      url: "https://blog.malivinayak.com/how-to-install-conda-in-ubuntu",
    },
    {
      title: "Journey of Compiler",
      teaser: "A beginner-friendly tour of compiler design — why compilers exist, and how the compilation pipeline works end-to-end.",
      tags: ["CompilerDesign", "Compiler"],
      date: "Apr 16, 2024",
      url: "https://blog.malivinayak.com/journey-of-compiler",
    },
    {
      title: "Characteristics of C Programming",
      teaser: "Six core characteristics: keywords, operators, separators, constants, predefined functions, and syntax.",
      tags: [],
      date: "Oct 9, 2023",
      url: "https://blog.malivinayak.com/characteristics-of-c-programming",
    },
  ],


  achievements: [
    { icon: "🏅", text: "GATE 2024 — AIR 716, 99.36 Percentile (CS/IT)" },
    { icon: "🎓", text: "M.Tech Admission — IIT Kharagpur, AI Specialization" },
    { icon: "🥇", text: "Excellent (Top 15%) — CTB Design Verification Hackathon, IIT Madras" },
    { icon: "🥇", text: "Excellent (Top 15%) — Mixed Signal Marathon, IIT Bombay" },
    { icon: "💻", text: "200+ problems solved on LeetCode & coding platforms" },
    { icon: "🌟", text: "Shipped production website with 99.9% uptime at NextSquare" },
    { icon: "📝", text: "Published technical blog posts on programming & systems" },
    { icon: "🔓", text: "Open-source contributor — 33+ public GitHub repos" },
  ],

  coursework: [
    { group: "AI / Machine Learning", items: ["Machine Learning", "Deep Learning", "Visual Computing", "Graph Machine Learning", "Natural Language Processing", "Reinforcement Learning"] },
    { group: "Computer Science Core", items: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems", "Computer Architecture", "Software Engineering"] },
  ],

  contact: {
    email: "malivinayak012@gmail.com",
    links: [
      { icon: "📧", label: "malivinayak012@gmail.com", url: "mailto:malivinayak012@gmail.com", copyable: true },
      { icon: "🔗", label: "linkedin.com/in/malivinayak", url: "https://www.linkedin.com/in/malivinayak/" },
      { icon: "🐙", label: "github.com/malivinayak", url: "https://github.com/malivinayak" },
      { icon: "🌐", label: "malivinayak.com", url: "https://malivinayak.com/" },
      { icon: "✍️", label: "blog.malivinayak.com", url: "https://blog.malivinayak.com/" },
    ],
  },
};


// ═══════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Skeleton shimmer → render
  document.querySelectorAll("#about-content,#skills-content,#projects-grid,#experience-content,#education-timeline,#blog-grid,#achievements-grid,#coursework-grid,#contact-grid")
    .forEach(el => { el.innerHTML = '<div class="skeleton"></div>'; });

  const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400;
  setTimeout(() => { renderAll(); initAllEffects(); }, delay);
});

// ═══════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════
function renderAll() {
  renderNav(); renderHero(); renderAbout(); renderSkills();
  renderProjects(); renderExperience(); renderEducation();
  renderBlog(); renderAchievements(); renderCoursework();
  renderContact(); renderFooter();
}

function renderNav() {
  const d = document.getElementById("nav-links");
  const m = document.getElementById("mobile-nav-links");
  DATA.navLinks.forEach(l => {
    const li = `<li><a href="${l.href}" role="menuitem">${l.label}</a></li>`;
    d.innerHTML += li; m.innerHTML += li;
  });
}

function renderHero() {
  document.getElementById("hero-badge").textContent = DATA.profile.badge;
  document.getElementById("hero-title").textContent = DATA.profile.name;
  document.getElementById("hero-subtitle").textContent = DATA.profile.tagline;
  document.getElementById("hero-ctas").innerHTML = DATA.ctas.map(c => {
    const cls = c.primary ? "btn-primary" : "btn-secondary";
    const t = c.external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${c.href}" class="${cls} ripple-wrap magnetic-btn"${t}>${c.label}</a>`;
  }).join("");
  document.getElementById("hero-stats").innerHTML = DATA.stats.map(s => `
    <div class="stat-chip"><span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span><span class="stat-ribbon">${s.ribbon}</span></div>`).join("");
}

function renderAbout() {
  document.getElementById("about-content").innerHTML = `
    <div class="about-text-card fade-in">${DATA.about.text}</div>
    ${DATA.about.highlights.map(h => `
      <div class="about-highlight-card fade-in">
        <span class="ahc-icon">${h.icon}</span>
        <div class="ahc-title">${h.title}</div>
        <div class="ahc-desc">${h.desc}</div>
      </div>`).join("")}`;
}

function renderSkills() {
  document.getElementById("skills-content").innerHTML = DATA.skills.map(cat => `
    <div class="skill-category glow-card fade-in">
      <div class="glow-card-inner">
        <div class="skill-category-title">${cat.icon} ${cat.category}</div>
        <div class="skill-chips">${cat.items.map(s => `<span class="skill-chip ripple-wrap">${s}</span>`).join("")}</div>
      </div>
    </div>`).join("");
}

function renderProjects() {
  const tb = document.getElementById("projects-toolbar");
  tb.innerHTML = DATA.projectFilters.map(f => `<button class="filter-btn ripple-wrap${f === "All" ? " active" : ""}" data-filter="${f}">${f}</button>`).join("") +
    `<input type="text" class="search-input" id="project-search" placeholder="Search projects…" aria-label="Search projects">`;
  renderProjectCards("All", "");
  tb.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    tb.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjectCards(btn.dataset.filter, document.getElementById("project-search").value);
  }));
  document.getElementById("project-search").addEventListener("input", e => {
    const active = tb.querySelector(".filter-btn.active");
    renderProjectCards(active ? active.dataset.filter : "All", e.target.value);
  });
}

function renderProjectCards(filter, search) {
  const grid = document.getElementById("projects-grid");
  const term = search.toLowerCase().trim();
  const filtered = DATA.projects.filter(p => {
    const mf = filter === "All" || p.filters.includes(filter);
    const ms = !term || p.title.toLowerCase().includes(term) || p.tags.some(t => t.toLowerCase().includes(term)) || p.hook.toLowerCase().includes(term);
    return mf && ms;
  });
  grid.innerHTML = filtered.map(p => `
    <div class="project-card glow-card fade-in" data-id="${p.id}">
      <div class="glow-card-inner">
        <div class="pc-top">
          <div class="pc-icon">${p.icon}</div>
          <div class="pc-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="pc-link ripple-wrap">Code ↗</a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="pc-link ripple-wrap">Demo ↗</a>` : ""}
          </div>
        </div>
        <div class="pc-title">${p.title}</div>
        <div class="pc-timeline">${p.timeline}</div>
        <div class="pc-hook">${p.hook}</div>
        <div class="pc-tags">${p.tags.map(t => `<span class="pc-tag">${t}</span>`).join("")}</div>
        <button class="pc-readmore ripple-wrap" data-id="${p.id}" type="button">Read More →</button>
      </div>
    </div>`).join("");
  requestAnimationFrame(() => {
    initFadeIn(); initGlowCards(); initRipple();
    grid.querySelectorAll(".pc-readmore").forEach(b => b.addEventListener("click", () => openModal(b.dataset.id)));
  });
}

function renderExperience() {
  document.getElementById("experience-content").innerHTML = DATA.experience.map(e => `
    <div class="exp-card fade-in">
      <div class="exp-header">
        <div><div class="exp-role">${e.role}</div><div class="exp-company">${e.company}</div></div>
        <div class="exp-period">${e.period}</div>
      </div>
      <ul class="exp-bullets">${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      ${e.link ? `<a href="${e.link.url}" target="_blank" rel="noopener noreferrer" class="exp-link ripple-wrap">${e.link.label}</a>` : ""}
    </div>`).join("");
}

function renderEducation() {
  document.getElementById("education-timeline").innerHTML = DATA.education.map(e => `
    <div class="edu-card fade-in">
      <div class="edu-year">${e.year}</div>
      <div class="edu-details">
        <div class="edu-degree">${e.degree}</div>
        <div class="edu-institute">${e.institute}</div>
        <div class="edu-score">${e.score}</div>
      </div>
    </div>`).join("");
}

function renderBlog() {
  document.getElementById("blog-grid").innerHTML = DATA.blogs.map(b => `
    <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="blog-card fade-in">
      <div class="bc-date">${b.date}</div>
      <div class="bc-title">${b.title}</div>
      <div class="bc-teaser">${b.teaser}</div>
      <div class="bc-tags">${b.tags.map(t => `<span class="bc-tag">${t}</span>`).join("")}</div>
    </a>`).join("");
  document.getElementById("blog-cta").innerHTML = `<a href="https://blog.malivinayak.com/" target="_blank" rel="noopener noreferrer" class="btn-secondary ripple-wrap">Visit Full Blog →</a>`;
}

function renderAchievements() {
  const el = document.getElementById("achievements-grid");
  const SHOW = 5;
  el.innerHTML = DATA.achievements.map((a, i) => `
    <div class="achievement-badge fade-in${i >= SHOW ? " hidden-ach" : ""}">
      <span class="ab-icon">${a.icon}</span><span>${a.text}</span>
    </div>`).join("");
  const btn = document.getElementById("achievements-toggle");
  if (DATA.achievements.length > SHOW) {
    btn.style.display = "block";
    let open = false;
    btn.addEventListener("click", () => {
      open = !open;
      el.querySelectorAll(".hidden-ach").forEach(b => b.style.display = open ? "inline-flex" : "none");
      btn.textContent = open ? "Show Less" : "Show More";
    });
  }
}

function renderCoursework() {
  document.getElementById("coursework-grid").innerHTML = DATA.coursework.map(cw => `
    <div class="cw-group fade-in">
      <div class="cw-group-title">${cw.group}</div>
      <div class="cw-list">${cw.items.map(c => `<div class="cw-item">${c}</div>`).join("")}</div>
    </div>`).join("");
}

function renderContact() {
  document.getElementById("contact-grid").innerHTML = `
    <div class="contact-card fade-in">
      <h3>Contact Info</h3>
      <div class="contact-links">${DATA.contact.links.map(l => `
        <a href="${l.url}" target="${l.url.startsWith("mailto") ? "_self" : "_blank"}" rel="noopener noreferrer" class="contact-link-item ripple-wrap">
          <span class="cli-icon">${l.icon}</span><span>${l.label}</span>
          ${l.copyable ? `<button class="copy-email-btn" type="button" data-copy="${DATA.contact.email}" onclick="event.preventDefault();event.stopPropagation();copyEmail();">Copy</button>` : ""}
        </a>`).join("")}
      </div>
    </div>
    <div class="contact-form fade-in">
      <h3>Send a Message</h3>
      <form id="contact-form" novalidate>
        <div class="form-field" id="field-name"><label for="cf-name">Name</label><input type="text" id="cf-name" required placeholder="Your name"><span class="field-error">Please enter your name.</span></div>
        <div class="form-field" id="field-email"><label for="cf-email">Email</label><input type="email" id="cf-email" required placeholder="you@example.com"><span class="field-error">Please enter a valid email.</span></div>
        <div class="form-field" id="field-message"><label for="cf-message">Message</label><textarea id="cf-message" required placeholder="Your message…"></textarea><span class="field-error">Please enter a message.</span></div>
        <button type="submit" class="btn-primary ripple-wrap" style="justify-self:start;">Send Message</button>
      </form>
    </div>`;
  document.getElementById("contact-form").addEventListener("submit", handleSubmit);
}

function renderFooter() {
  document.getElementById("footer").innerHTML = `<div class="container">Built by <a href="https://github.com/malivinayak" target="_blank">Vinayak Mali</a> & claude.ai · ${new Date().getFullYear()}</div>`;
}


// ═══════════════════════════════════════════
// ALL EFFECTS
// ═══════════════════════════════════════════
function initAllEffects() {
  initTheme(); initMobile(); initStickyNav(); initActiveNav();
  initFadeIn(); initCustomCursor(); initGlowCards(); initMagnetic();
  initRipple(); initEasterEgg(); initHeroCanvas(); initSectionCanvases();
  initTextScramble(); initModalHandlers();
}

// ── Theme ──
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const set = t => { document.documentElement.setAttribute("data-theme", t); icon.textContent = t === "dark" ? "☀️" : "🌙"; localStorage.setItem("vm-theme", t); };
  const saved = localStorage.getItem("vm-theme");
  set(saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  btn.addEventListener("click", () => set(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));
}

// ── Mobile menu ──
function initMobile() {
  const hb = document.getElementById("hamburger"), m = document.getElementById("mobile-menu");
  hb.addEventListener("click", () => { const o = m.classList.toggle("open"); hb.classList.toggle("open"); hb.setAttribute("aria-expanded", o); m.setAttribute("aria-hidden", !o); });
  m.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { m.classList.remove("open"); hb.classList.remove("open"); hb.setAttribute("aria-expanded", "false"); m.setAttribute("aria-hidden", "true"); }));
}

// ── Sticky nav ──
function initStickyNav() {
  const n = document.getElementById("navbar");
  window.addEventListener("scroll", () => n.classList.toggle("scrolled", window.scrollY > 50), { passive: true });
}

// ── Active nav highlight ──
function initActiveNav() {
  const secs = document.querySelectorAll("section[id]"), links = document.querySelectorAll(".nav-links a, .mobile-nav-links a");
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { const id = e.target.id; links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`)); } }), { rootMargin: "-30% 0px -60% 0px" });
  secs.forEach(s => obs.observe(s));
}

// ── Fade-in on scroll ──
function initFadeIn() {
  const items = document.querySelectorAll(".fade-in:not(.visible)");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 70); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  items.forEach(el => obs.observe(el));
}

// ── CUSTOM CURSOR (Hyperplexed) ──
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const dot = document.getElementById("cursor-dot"), ring = document.getElementById("cursor-ring");
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; });
  (function loop() { rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(loop); })();

  // Hover detection for interactive elements
  const interactives = "a, button, .skill-chip, .stat-chip, .filter-btn, .achievement-badge, .blog-card, .pc-readmore, .pc-link, input, textarea";
  document.addEventListener("mouseover", e => { if (e.target.closest(interactives)) document.body.classList.add("cursor-hover"); });
  document.addEventListener("mouseout", e => { if (e.target.closest(interactives)) document.body.classList.remove("cursor-hover"); });
  document.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
  document.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));
}

// ── GLOW CARDS — mouse-follow gradient border (Hyperplexed) ──
function initGlowCards() {
  document.querySelectorAll(".glow-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - r.left) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - r.top) + "px");
    });
  });
}

// ── MAGNETIC BUTTONS ──
function initMagnetic() {
  document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

// ── RIPPLE on click ──
function initRipple() {
  document.addEventListener("click", e => {
    const c = e.target.closest(".ripple-wrap");
    if (!c) return;
    const r = c.getBoundingClientRect(), sp = document.createElement("span");
    sp.className = "ripple-span";
    const sz = Math.max(r.width, r.height);
    sp.style.width = sp.style.height = sz + "px";
    sp.style.left = (e.clientX - r.left - sz / 2) + "px";
    sp.style.top = (e.clientY - r.top - sz / 2) + "px";
    c.appendChild(sp);
    sp.addEventListener("animationend", () => sp.remove());
  });
}

// ── EASTER EGG — logo click ──
function initEasterEgg() {
  const logo = document.getElementById("nav-logo");
  logo.addEventListener("click", () => {
    if (logo.classList.contains("easter-egg")) return;
    logo.classList.add("easter-egg");
    setTimeout(() => logo.classList.remove("easter-egg"), 900);
  });
}

// ── TEXT SCRAMBLE on hero title (Hyperplexed) ──
function initTextScramble() {
  const el = document.getElementById("hero-title");
  if (!el) return;
  const original = el.textContent;
  const chars = "!@#$%^&*()_+-={}[]|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let iteration = 0;
  const interval = setInterval(() => {
    el.textContent = original.split("").map((c, i) => {
      if (i < iteration) return original[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iteration >= original.length) clearInterval(interval);
    iteration += 1 / 2;
  }, 30);
}


// ═══════════════════════════════════════════
// HERO CANVAS — Interactive asteroid/particle field
// ═══════════════════════════════════════════
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, mouse = { x: -999, y: -999 };
  const particles = [];
  const PARTICLE_COUNT = 120;
  const CONNECTION_DIST = 140;
  const MOUSE_RADIUS = 200;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener("resize", resize);

  // Mouse interaction on entire hero
  const heroEl = document.getElementById("hero");
  heroEl.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  heroEl.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });

  // Create particles (asteroids)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const baseColor = isDark ? "56,189,248" : "37,99,235";

    particles.forEach(p => {
      // Mouse repulsion/attraction
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.vx -= (dx / dist) * force * 0.3;
        p.vy -= (dy / dist) * force * 0.3;
      }

      // Damping
      p.vx *= 0.99; p.vy *= 0.99;
      // Random drift
      p.vx += (Math.random() - 0.5) * 0.02;
      p.vy += (Math.random() - 0.5) * 0.02;

      p.x += p.vx; p.y += p.vy;
      // Wrap
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor},${p.opacity})`;
      ctx.fill();
    });

    // Connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECTION_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${baseColor},${0.08 * (1 - d / CONNECTION_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
      grad.addColorStop(0, `rgba(${baseColor},0.08)`);
      grad.addColorStop(1, `rgba(${baseColor},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    requestAnimationFrame(draw);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
}


// ═══════════════════════════════════════════
// SECTION CANVASES — Unique background per section
// ═══════════════════════════════════════════
function initSectionCanvases() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".section-canvas").forEach(canvas => {
    const effect = canvas.dataset.effect;
    const ctx = canvas.getContext("2d");
    let W, H, animId;

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    resize();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas.parentElement);

    // Lazy: only animate when section is visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!animId) loop(); }
      else { cancelAnimationFrame(animId); animId = null; }
    }, { threshold: 0.05 });
    observer.observe(canvas.parentElement);

    // Effect-specific state
    let state = {};

    if (effect === "grid") {
      // Moving dot grid
      state.dots = [];
      state.spacing = 50;
      state.time = 0;
    } else if (effect === "wave") {
      state.time = 0;
    } else if (effect === "constellation") {
      state.stars = Array.from({ length: 60 }, () => ({
        x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.5, phase: Math.random() * Math.PI * 2
      }));
      state.time = 0;
    } else if (effect === "matrix") {
      state.columns = [];
      state.fontSize = 12;
      state.time = 0;
    } else if (effect === "particles") {
      state.ps = Array.from({ length: 40 }, () => ({
        x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.001, vy: (Math.random() - 0.5) * 0.001, r: Math.random() * 2 + 1
      }));
    } else if (effect === "aurora") {
      state.time = 0;
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const c = isDark ? "56,189,248" : "37,99,235";
      const c2 = isDark ? "129,140,248" : "99,102,241";

      if (effect === "grid") {
        state.time += 0.01;
        const s = state.spacing;
        for (let x = 0; x < W; x += s) {
          for (let y = 0; y < H; y += s) {
            const wave = Math.sin(x * 0.01 + state.time) * Math.cos(y * 0.01 + state.time * 0.7);
            const r = 1 + wave * 0.8;
            const a = 0.08 + wave * 0.04;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(r, 0.3), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c},${a})`;
            ctx.fill();
          }
        }
      } else if (effect === "wave") {
        state.time += 0.015;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const y = H * 0.5 + Math.sin(x * 0.005 + state.time) * 40 + Math.sin(x * 0.01 + state.time * 1.5) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.closePath();
        const grad = ctx.createLinearGradient(0, H * 0.3, 0, H);
        grad.addColorStop(0, `rgba(${c},0.04)`);
        grad.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
        // Second wave
        ctx.beginPath(); ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const y = H * 0.6 + Math.sin(x * 0.007 - state.time * 0.8) * 30 + Math.cos(x * 0.003 + state.time) * 25;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.closePath();
        const grad2 = ctx.createLinearGradient(0, H * 0.4, 0, H);
        grad2.addColorStop(0, `rgba(${c2},0.03)`);
        grad2.addColorStop(1, `rgba(${c2},0)`);
        ctx.fillStyle = grad2;
        ctx.fill();
      } else if (effect === "constellation") {
        state.time += 0.005;
        const stars = state.stars;
        stars.forEach(s => {
          const sx = s.x * W, sy = s.y * H;
          const twinkle = 0.3 + 0.3 * Math.sin(state.time * 3 + s.phase);
          ctx.beginPath();
          ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c},${twinkle})`;
          ctx.fill();
        });
        // Connect nearby stars
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = (stars[i].x - stars[j].x) * W;
            const dy = (stars[i].y - stars[j].y) * H;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(stars[i].x * W, stars[i].y * H);
              ctx.lineTo(stars[j].x * W, stars[j].y * H);
              ctx.strokeStyle = `rgba(${c},${0.06 * (1 - d / 120)})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      } else if (effect === "matrix") {
        state.time += 1;
        if (state.columns.length === 0 || state.columns.length !== Math.floor(W / state.fontSize)) {
          state.columns = Array.from({ length: Math.floor(W / state.fontSize) }, () => Math.random() * H / state.fontSize);
        }
        ctx.fillStyle = isDark ? "rgba(5,8,22,0.08)" : "rgba(240,244,250,0.08)";
        ctx.fillRect(0, 0, W, H);
        ctx.font = state.fontSize + "px JetBrains Mono";
        state.columns.forEach((y, i) => {
          const char = String.fromCharCode(0x30A0 + Math.random() * 96);
          ctx.fillStyle = `rgba(${c},${0.15 + Math.random() * 0.1})`;
          ctx.fillText(char, i * state.fontSize, y * state.fontSize);
          if (y * state.fontSize > H && Math.random() > 0.975) state.columns[i] = 0;
          state.columns[i] += 0.5;
        });
      } else if (effect === "particles") {
        state.ps.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c},0.15)`;
          ctx.fill();
        });
      } else if (effect === "aurora") {
        state.time += 0.008;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(0, H);
          for (let x = 0; x <= W; x += 4) {
            const y = H * (0.3 + i * 0.15) + Math.sin(x * 0.003 + state.time + i) * 60 + Math.cos(x * 0.006 - state.time * 0.5 + i * 2) * 40;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(W, H); ctx.closePath();
          const colors = [c, c2, "52,211,153"];
          const grad = ctx.createLinearGradient(0, 0, W, 0);
          grad.addColorStop(0, `rgba(${colors[i]},0.03)`);
          grad.addColorStop(0.5, `rgba(${colors[i]},0.06)`);
          grad.addColorStop(1, `rgba(${colors[i]},0.02)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(loop);
    }
  });
}


// ═══════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════
function initModalHandlers() {
  const ov = document.getElementById("project-modal");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  ov.addEventListener("click", e => { if (e.target === ov) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && ov.classList.contains("open")) closeModal(); });
}
function openModal(id) {
  const p = DATA.projects.find(x => x.id === id);
  if (!p || !p.modal) return;
  const m = p.modal;
  document.getElementById("modal-body").innerHTML = `
    <div class="modal-title">${p.title}</div>
    <div class="modal-subtitle">${p.timeline}</div>
    <div class="modal-section-label">Key Highlights</div>
    <ul class="modal-bullets">${m.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    <div class="modal-section-label">Architecture</div>
    <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7">${m.architecture}</p>
    <div class="modal-section-label">Tech Stack</div>
    <div class="modal-tags">${m.stack.map(t => `<span class="modal-tag">${t}</span>`).join("")}</div>`;
  const ov = document.getElementById("project-modal");
  ov.classList.add("open"); ov.setAttribute("aria-hidden", "false"); ov.focus();
  document.body.style.overflow = "hidden";
}
function closeModal() {
  const ov = document.getElementById("project-modal");
  ov.classList.remove("open"); ov.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ═══════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════
function copyEmail() {
  navigator.clipboard.writeText(DATA.contact.email).then(() => showToast("Email copied!")).catch(() => {
    const t = document.createElement("textarea"); t.value = DATA.contact.email;
    document.body.appendChild(t); t.select(); document.execCommand("copy"); document.body.removeChild(t);
    showToast("Email copied!");
  });
}
window.copyEmail = copyEmail;

function showToast(msg) {
  const c = document.getElementById("toast-container"), t = document.createElement("div");
  t.className = "toast"; t.textContent = msg; c.appendChild(t);
  setTimeout(() => { t.classList.add("toast-out"); t.addEventListener("animationend", () => t.remove()); }, 2500);
}

function handleSubmit(e) {
  e.preventDefault();
  const n = document.getElementById("cf-name"), em = document.getElementById("cf-email"), m = document.getElementById("cf-message");
  let ok = true;
  ["field-name", "field-email", "field-message"].forEach(id => document.getElementById(id).classList.remove("error"));
  if (!n.value.trim()) { document.getElementById("field-name").classList.add("error"); ok = false; }
  if (!em.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { document.getElementById("field-email").classList.add("error"); ok = false; }
  if (!m.value.trim()) { document.getElementById("field-message").classList.add("error"); ok = false; }
  if (!ok) return;
  const subj = encodeURIComponent(`Portfolio Contact from ${n.value.trim()}`);
  const body = encodeURIComponent(`Name: ${n.value.trim()}\nEmail: ${em.value.trim()}\n\n${m.value.trim()}`);
  window.location.href = `mailto:${DATA.contact.email}?subject=${subj}&body=${body}`;
  showToast("Opening email client…");
}
