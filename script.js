/* ============================================================
   HEMANG JOSHI — New Portfolio Scripts
   ============================================================ */

/* ── Custom Cursor ── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
function animateTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top  = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

/* ── Navbar scroll state ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── Hamburger ── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Active nav on scroll ── */
const allSections = document.querySelectorAll('section[id]');
const navAs       = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
allSections.forEach(s => navObs.observe(s));

/* ── Scroll Reveal ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Stagger children in grids
document.querySelectorAll('.cert-grid, .proj-list').forEach(parent => {
  [...parent.children].forEach((child, i) => {
    child.dataset.delay = i * 100;
  });
});
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── Counter animation ── */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.cnt').forEach(el => {
        const target = parseInt(el.dataset.t);
        let n = 0;
        const step = target / 55;
        const t = setInterval(() => {
          n += step;
          if (n >= target) { el.textContent = target; clearInterval(t); }
          else el.textContent = Math.floor(n);
        }, 22);
      });
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) cntObs.observe(statsEl);

/* ── Skill bar animation ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fg').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 130);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sk-bars').forEach(el => barObs.observe(el));
