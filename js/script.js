 // ======================== AUTHENTIC SKILLS WITH REAL LOGOS ========================
    const skillsSet = [
      { name: "React.js", icon: "fab fa-react", level: "Advanced", desc: "Hooks, Context, Router" },
      { name: "JavaScript", icon: "fab fa-js", level: "Expert", desc: "ES6+, async patterns" },
      { name: "Tailwind CSS", icon: "fab fa-css3-alt", level: "Advanced", desc: "Utility-first design" },
      { name: "Vue.js", icon: "fab fa-vuejs", level: "Intermediate", desc: "Composition API" },
      { name: "Node.js", icon: "fab fa-node-js", level: "Advanced", desc: "Express, REST APIs" },
      { name: "TypeScript", icon: "fab fa-js", level: "Advanced", desc: "Type safety" },
      { name: "MongoDB", icon: "fas fa-database", level: "Intermediate", desc: "NoSQL, Atlas" },
      { name: "Git/GitHub", icon: "fab fa-git-alt", level: "Expert", desc: "CI/CD workflows" },
      { name: "C#", icon: "fas fa-terminal", level: "Advanced", desc: "Unity scripting, .NET" },
      { name: "Python", icon: "fab fa-python", level: "Intermediate", desc: "Automation, scripts" },
      { name: "Unity", icon: "fab fa-unity", level: "Advanced", desc: "Game dev, 3D mechanics" },
      { name: "Blender", icon: "fas fa-dice-d6", level: "Intermediate", desc: "3D modeling, assets" },
      { name: "PHP", icon: "fab fa-php", level: "Intermediate", desc: "Backend logic" }
    ];

    const trackContainer = document.getElementById('skillsTrainTrack');
    function createSkillCard(skill) {
      const card = document.createElement('div');
      card.className = 'skill-train-card';
      card.innerHTML = `
        <div class="skill-icon-train"><i class="${skill.icon}"></i></div>
        <h3>${skill.name}</h3>
        <div class="skill-level-badge">${skill.level}</div>
        <p>${skill.desc}</p>
      `;
      return card;
    }

    function buildInfiniteTrain() {
      trackContainer.innerHTML = '';
      const copies = 3;
      for (let i = 0; i < copies; i++) {
        skillsSet.forEach(skill => trackContainer.appendChild(createSkillCard(skill)));
      }
    }
    buildInfiniteTrain();

    function adjustSpeed() {
      const trackEl = document.querySelector('.skills-track');
      if (!trackEl) return;
      const w = trackEl.scrollWidth;
      let duration = w / 110;
      duration = Math.min(Math.max(duration, 18), 42);
      trackEl.style.animationDuration = `${duration}s`;
    }
    window.addEventListener('load', adjustSpeed);
    window.addEventListener('resize', adjustSpeed);

    // ======================== PROJECTS DATA ========================
    const projectsData = [
      { 
        title: "The Finding of Isabel: A Desktop Horror Game", 
        desc: "A 3D single-player horror game built with Unity and C# as a capstone project (2024–2025). Featuring a 3D model of the University of Rizal System (Binangonan Campus), exploration, puzzles, and immersive storytelling.", 
        tech: ["Unity", "C#", "Blender", "Mixamo"],
        image: "../image/FindingIsabel.png",
        URL: ""
      },
      { 
        title: "Dev-Portfolio", 
        desc: "A personal web portfolio built using modern web technologies, highlighting my projects, technical skills, and growth as an IT professional and aspiring full-stack developer.", 
        tech: ["HTML", "CSS", "JS"],
        image: "../image/portfolioTemplate.jpg"
      }
    ];

    // Modal System
    const modal = document.createElement('div');
    modal.id = 'mediaModal';
    modal.className = 'media-modal';
    modal.innerHTML = `<div class="media-modal-content"><span class="media-modal-close">&times;</span><div id="modalMediaContainer"></div></div>`;
    document.body.appendChild(modal);
    const modalContainer = document.getElementById('modalMediaContainer');
    const closeModal = document.querySelector('.media-modal-close');
    closeModal.onclick = () => { modal.style.display = 'none'; modalContainer.innerHTML = ''; };
    window.onclick = (e) => { if (e.target === modal) { modal.style.display = 'none'; modalContainer.innerHTML = ''; } };

    function getProjectMedia(project) {
      if (project.image && project.image.trim()) {
        return `<div class="media-container image-container" data-type="image" data-src="${project.image}" data-title="${project.title}">
                  <img src="${project.image}" alt="${project.title}" class="project-img-media" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\'project-icon-media\'>🎮</span>'">
                  <div class="media-overlay-hint"><i class="fas fa-search-plus"></i><span>View</span></div>
                  <div class="media-badge"><i class="fas fa-"></i> </div>
                </div>`;
      } else {
        return `<div class="media-container icon-container" data-type="icon" data-icon="🎮" data-title="${project.title}">
                  <span class="project-icon-media">🎮</span>
                  <div class="media-overlay-hint"><i class="fas fa-expand"></i><span>Preview</span></div>
                </div>`;
      }
    }

    const grid = document.getElementById('projectsGrid');
    projectsData.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.innerHTML = `
        <div class="project-img">${getProjectMedia(p)}</div>
        <div class="project-info">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc.substring(0, 280)}${p.desc.length > 280 ? '...' : ''}</p>
          <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
          ${p.URL ? `<a href="${p.URL}" target="_blank" class="project-link-btn">Game Trailer <i class="fab fa-youtube"></i></a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

    setTimeout(() => {
      document.querySelectorAll('.media-container').forEach(container => {
        container.addEventListener('click', (e) => {
          e.stopPropagation();
          const type = container.dataset.type;
          const title = container.dataset.title || 'Media';
          if (type === 'image') {
            const src = container.dataset.src;
            modalContainer.innerHTML = `<div><h3 class="modal-title">${title}</h3><img src="${src}" class="modal-image"></div>`;
            modal.style.display = 'flex';
          } else if (type === 'icon') {
            const icon = container.dataset.icon || '📁';
            modalContainer.innerHTML = `<div style="text-align:center"><span style="font-size:5rem">${icon}</span><h3 class="modal-title">${title}</h3></div>`;
            modal.style.display = 'flex';
          }
        });
      });
    }, 150);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      if (isLight) themeIcon.classList.replace('fa-moon', 'fa-sun');
      else themeIcon.classList.replace('fa-sun', 'fa-moon');
    });

    // Active Nav & Smooth Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActive() {
      let current = '';
      const scrollPos = window.scrollY + 120;
      sections.forEach(sec => {
        const top = sec.offsetTop, bottom = top + sec.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) current = sec.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActive);
    updateActive();
    document.querySelectorAll('.nav-link, .btn-primary, .btn-outline').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('navLinks')?.classList.remove('active');
        }
      });
    });
    document.getElementById('menuToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('active');
    });
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert("✨ Thanks! Kingly will reply soon. One step at a time ✨");
      e.target.reset();
    });
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
    window.dispatchEvent(new Event('resize'));