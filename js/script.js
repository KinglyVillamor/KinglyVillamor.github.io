// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
if(localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  if(isLight) themeIcon.classList.replace('fa-moon', 'fa-sun');
  else themeIcon.classList.replace('fa-sun', 'fa-moon');
});

// ========== skills loop ==========
const skillsSet = [
  { name: "React.js", icon: "fab fa-react", level: "", desc: " " },
  { name: "JavaScript", icon: "fab fa-js", level: "", desc: " " },
  { name: "Tailwind CSS", icon: "fab fa-css3-alt", level: "", desc: " " },
  { name: "Vue.js", icon: "fab fa-vuejs", level: "", desc: " " },
  { name: "Node.js", icon: "fab fa-node-js", level: "", desc: " " },
  { name: "TypeScript", icon: "fab fa-js", level: "", desc: " " },
  { name: "MongoDB", icon: "fas fa-database", level: "", desc: " " },
  { name: "Git/GitHub", icon: "fab fa-git-alt", level: "", desc: " " },
  { name: "C#", icon: "fas fa-terminal", level: "", desc: "" },
  { name: "Python", icon: "fab fa-python", level: "", desc: "" },
    { name: "Unity", icon: "fab fa-unity", level: "", desc: "" },
{ name: "Blender", icon: "fas fa-dice-d6", level: "", desc: "" }   

];

const track = document.getElementById('skillsTrainTrack');

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
  track.innerHTML = '';
  const totalCopies = 3;
  for (let i = 0; i < totalCopies; i++) {
    skillsSet.forEach(skill => {
      track.appendChild(createSkillCard(skill));
    });
  }
}

buildInfiniteTrain();

function adjustAnimationSpeed() {
  const trackEl = document.querySelector('.skills-track');
  if (!trackEl) return;
  const trackWidth = trackEl.scrollWidth;
  const speed = 110;
  let duration = trackWidth / speed;
  duration = Math.min(Math.max(duration, 18), 42);
  trackEl.style.animationDuration = `${duration}s`;
}

window.addEventListener('load', () => {
  adjustAnimationSpeed();
});
window.addEventListener('resize', () => {
  adjustAnimationSpeed();
});

const projectsData = [
  { 
    
  title: "The Finding of Isabel: A Desktop Horror Game", 
  desc: "A 3D single-player horror game built with Unity and C# as a capstone project (2024–2025)<br><br>Featuring a 3D model of the University of Rizal System (Binangonan Campus), exploration, puzzles, and immersive storytelling.", 
  tech: ["Unity", "C#", "Blender", "Mixamo"],
  image: "../image/FindingIsabel.png",
  URL: ""

   
  },
  { 
    title: "Not Yet", 
    desc: "whehehhe", 
    tech: ["whehe", "heeheh", "wheheh"],
    icon: "⚡"
  },
  { 
    title: "Portfolio ni Kingly", 
    desc: "Immersive personal space with auto-rotating skills.", 
    tech: ["HTML", "CSS", "JS"],
    icon: "🌀"
  }
];

// Create Modal for Popup
const modal = document.createElement('div');
modal.id = 'mediaModal';
modal.className = 'media-modal';
modal.innerHTML = `
  <div class="media-modal-content">
    <span class="media-modal-close">&times;</span>
    <div id="modalMediaContainer"></div>
  </div>
`;
document.body.appendChild(modal);

const modalContainer = document.getElementById('modalMediaContainer');
const closeBtn = document.querySelector('.media-modal-close');

closeBtn.onclick = () => {
  modal.style.display = 'none';
  // Stop video if playing
  const modalVideo = modalContainer.querySelector('video');
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.src = '';
  }
  modalContainer.innerHTML = '';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    const modalVideo = modalContainer.querySelector('video');
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    modalContainer.innerHTML = '';
  }
};

// Function to open modal with content
function openModal(content, isVideo = false) {
  modalContainer.innerHTML = content;
  modal.style.display = 'flex';
  
  if (isVideo) {
    const video = modalContainer.querySelector('video');
    if (video) {
      video.play();
    }
  }
}

// Function to generate project media (VIDEO > IMAGE > ICON)
function getProjectMedia(project) {
  if (project.video && project.video.trim() !== '') {
    return `
      <div class="media-container video-container" data-type="video" data-src="${project.video}" data-thumb="${project.thumbnail || ''}" data-title="${project.title}">
        <video 
          class="project-video-media" 
          poster="${project.thumbnail || ''}"
          muted 
          loop 
          playsinline
          preload="metadata"
          onmouseenter="this.play()"
          onmouseleave="this.pause(); this.currentTime=0;">
          <source src="${project.video}" type="${project.videoType || 'video/mp4'}">
        </video>
        <div class="media-overlay-hint">
          <i class="fas fa-expand"></i>
          <span>Click to open with sound</span>
        </div>
        <div class="media-badge"><i class="fas fa-video"></i> Video</div>
      </div>
    `;
  }
  
  else if (project.image && project.image.trim() !== '') {
    return `
      <div class="media-container image-container" data-type="image" data-src="${project.image}" data-title="${project.title}">
        <img src="${project.image}" alt="${project.title}" class="project-img-media" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\'project-icon-media\'>🖼️</span>';">
        <div class="media-overlay-hint">
          <i class="fas fa-search-plus"></i>
          <span>Click to view</span>
        </div>
        <div class="media-badge"><i class=""></i> </div>
      </div>
    `;
  }
  
// ICON
  else if (project.icon && project.icon.trim() !== '') {
    return `
      <div class="media-container icon-container" data-type="icon" data-icon="${project.icon}" data-title="${project.title}">
        <span class="project-icon-media">${project.icon}</span>
        <div class="media-overlay-hint">
          <i class="fas fa-expand"></i>
          <span>Click to view</span>
        </div>
      </div>
    `;
  }
  
  // DEFAULT
  else {
    return `
      <div class="media-container icon-container" data-type="icon" data-icon="📁" data-title="Default">
        <span class="project-icon-media">📁</span>
        <div class="media-overlay-hint">
          <i class="fas fa-info"></i>
          <span>No media</span>
        </div>
      </div>
    `;
  }
}

const grid = document.getElementById('projectsGrid');
projectsData.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card reveal';
  
  card.innerHTML = `
    <div class="project-img">
      ${getProjectMedia(p)}
    </div>
    <div class="project-info">
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.desc.substring(0, 300)}${p.desc.length > 300 ? '...' : ''}</p>
      <div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
      ${p.URL ? `<a href="${p.URL}" target="_blank" class="project-link-btn"> Game Trailer <i class="fab fa-youtube"></i></a>` : ''}
    </div>
  `;
  grid.appendChild(card);
});

// Add click handlers to all media containers
setTimeout(() => {
  document.querySelectorAll('.media-container').forEach(container => {
    container.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = container.dataset.type;
      const title = container.dataset.title || 'Media';
      
      if (type === 'video') {
        const videoSrc = container.dataset.src;
        const thumb = container.dataset.thumb || '';
        modalContainer.innerHTML = `
          <div class="modal-video-wrapper">
            <h3 class="modal-title">${title}</h3>
            <video id="modalVideo" controls class="modal-video">
              <source src="${videoSrc}" type="video/mp4">
              Your browser does not support video.
            </video>
            <p class="modal-hint"><i class="fas fa-volume-up"></i> Use controls for sound</p>
          </div>
        `;
        modal.style.display = 'flex';
        const modalVideo = document.getElementById('modalVideo');
        if (modalVideo) modalVideo.play();
      } 
      else if (type === 'image') {
        const imgSrc = container.dataset.src;
        modalContainer.innerHTML = `
          <div class="modal-image-wrapper">
            <h3 class="modal-title">${title}</h3>
            <img src="${imgSrc}" alt="${title}" class="modal-image">
          </div>
        `;
        modal.style.display = 'flex';
      }
      else if (type === 'icon') {
        const icon = container.dataset.icon;
        modalContainer.innerHTML = `
          <div class="modal-icon-wrapper">
            <span class="modal-icon">${icon}</span>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-hint">Icon preview</p>
          </div>
        `;
        modal.style.display = 'flex';
      }
    });
  });
}, 100);

// Active nav & smooth scroll
const sections = document.querySelectorAll('section');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let currentId = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    if(scrollPos >= top && scrollPos < bottom) currentId = sec.getAttribute('id');
  });
  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

document.querySelectorAll('.nav-link, .btn-primary, .btn-outline').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if(href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('navLinks')?.classList.remove('active');
    }
  });
});

// Mobile menu
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("✨ Thanks! Kingly will reply soon. One step at a time ✨");
  e.target.reset();
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// small fix: preload animation
window.dispatchEvent(new Event('resize'));