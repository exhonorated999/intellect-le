// Intellect LE — interactions

// Nav: shrink/blur on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
// Close mobile menu after clicking a link
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = 'Please complete the required fields.';
    form.reportValidity();
    return;
  }
  const name = form.name.value.trim();
  note.textContent = `Thanks, ${name || 'officer'} — your message is queued. We'll be in touch.`;
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Make entire product cards with a data-href clickable (open in new window)
document.querySelectorAll('.product-card.is-linked').forEach(card => {
  const url = card.getAttribute('data-href');
  if (!url) return;
  card.addEventListener('click', (e) => {
    // If the inner text link was clicked, let it handle the navigation itself
    if (e.target.closest('a')) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
  // Keyboard accessibility
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  });
});
