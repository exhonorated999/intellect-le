// Intellect LE — interactions (shared across pages, null-safe)

// Nav: shrink/blur on scroll
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form (front-end demo handler)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      if (note) note.textContent = 'Please complete the required fields.';
      form.reportValidity();
      return;
    }
    const name = form.name.value.trim();
    if (note) note.textContent = `Thanks, ${name || 'officer'} — your message is queued. We'll be in touch.`;
    form.reset();
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Clickable product cards.
// External links (http/https) open in a new tab; internal (relative) links
// navigate within the same tab.
document.querySelectorAll('.product-card.is-linked').forEach(card => {
  const url = card.getAttribute('data-href');
  if (!url) return;
  const isExternal = /^https?:\/\//i.test(url);
  const go = () => {
    if (isExternal) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  };
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // let inner links handle themselves
    go();
  });
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
  });
});
