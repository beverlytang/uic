// ── Mobile menu toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Service card → detail panel toggle ──
const serviceCards = document.querySelectorAll('.service-card[data-panel]');
const detailPanels = document.querySelectorAll('.detail-panel');

function closeAllPanels() {
  detailPanels.forEach(p => p.classList.remove('open'));
  serviceCards.forEach(c => c.classList.remove('active'));
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const targetId = card.getAttribute('data-panel');
    const panel = document.getElementById(targetId);
    const isOpen = panel.classList.contains('open');

    closeAllPanels();

    if (!isOpen) {
      panel.classList.add('open');
      card.classList.add('active');
      // Scroll the panel into view after a brief delay for animation
      setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  });
});

// Close buttons inside panels
document.querySelectorAll('.panel-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllPanels();
  });
});

// ── Staff details toggle (hospital affiliations) ──
document.querySelectorAll('.staff-details-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-target');
    const details = document.getElementById(targetId);
    toggle.classList.toggle('open');
    details.classList.toggle('open');
  });
});

// ── Department directory toggle ──
const deptToggle = document.getElementById('deptToggle');
const deptDirectory = document.getElementById('deptDirectory');

if (deptToggle && deptDirectory) {
  deptToggle.addEventListener('click', () => {
    deptToggle.classList.toggle('open');
    deptDirectory.classList.toggle('open');
  });
}

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links li a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.fontWeight = link.getAttribute('href') === `#${id}` ? '700' : '500';
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// ── Close panels on Escape key ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllPanels();
});
