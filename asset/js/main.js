/* ── Dropdown toggles ── */
document.querySelectorAll('.has-dropdown').forEach(li => {
  const btn = li.querySelector('button');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) li.classList.add('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ── Scroll reveal (funciona en todas las páginas) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.07) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Active nav: marca la página actual en el navbar ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.style.color = 'var(--amarillo)';
  }
});

/* ── Active nav link highlight on scroll (solo index) ── */
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        a.style.color = href === '#' + current ? 'var(--amarillo)' : '';
      }
    });
  });
}
