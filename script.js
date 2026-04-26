// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close menu when a link is clicked (mobile UX)
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Scroll reveal with IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Stagger reveal delays for children inside grids
document.querySelectorAll('[data-stagger]').forEach((parent) => {
  const children = parent.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// Contact form — sends to WhatsApp +91 99911 35395
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (contactForm.querySelector('#name')?.value || '').trim();
    const email = (contactForm.querySelector('#email')?.value || '').trim();
    const phone = (contactForm.querySelector('#phone')?.value || '').trim();
    const projectMsg = (contactForm.querySelector('#message')?.value || '').trim();

    if (!name || !email || !projectMsg) {
      contactForm.reportValidity();
      return;
    }

    const lines = [
      'Hi Zeptrix Labs! 👋',
      '',
      "I'd like to discuss a project.",
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
    ];
    if (phone) lines.push(`*Phone:* ${phone}`);
    lines.push('', '*About the project:*', projectMsg, '', '— Sent via zeptrixlabs.com');

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/919991135395?text=${text}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Opening WhatsApp <span class="arrow">→</span>';
    btn.disabled = true;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener');

    setTimeout(() => {
      btn.innerHTML = '✓ Sent to WhatsApp';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2400);
    }, 600);
  });
}

// Nav shrink on scroll
const nav = document.querySelector('.nav');
if (nav) {
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) nav.style.padding = '0.85rem 0';
    else nav.style.padding = '1.25rem 0';
    lastY = y;
  });
}

// =============================================
// CAREERS FORM — sends to WhatsApp
// =============================================
const careersForm = document.querySelector('#careersForm');
if (careersForm) {
  careersForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const get = (id) => (careersForm.querySelector('#' + id)?.value || '').trim();
    const name = get('cname');
    const email = get('cemail');
    const phone = get('cphone');
    const location = get('clocation');
    const portfolio = get('cportfolio');
    const messageText = get('cmessage');
    const role = (careersForm.querySelector('input[name="role"]:checked')?.value || '').trim();
    const experience = (careersForm.querySelector('input[name="experience"]:checked')?.value || '').trim();

    if (!name || !email || !phone || !location || !role || !experience || !messageText) {
      careersForm.reportValidity();
      return;
    }

    const lines = [
      'Hi Zeptrix Labs! 👋',
      '',
      "I'd like to apply to join the team.",
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*WhatsApp:* ${phone}`,
      `*Location:* ${location}`,
      '',
      `*Role:* ${role}`,
      `*Experience:* ${experience}`,
    ];
    if (portfolio) lines.push(`*Portfolio / Profile:* ${portfolio}`);
    lines.push('', '*About me:*', messageText, '', '— Sent via zeptrixlabs.com/join');

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/919991135395?text=${text}`;

    const btn = careersForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Opening WhatsApp <span class="arrow">→</span>';
    btn.disabled = true;
    window.open(waUrl, '_blank', 'noopener');
    setTimeout(() => {
      btn.innerHTML = '✓ Sent to WhatsApp';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        careersForm.reset();
      }, 2400);
    }, 600);
  });

  // Pre-select role chip when "Apply for this role" is clicked on a role card
  document.querySelectorAll('.role-apply[data-role]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.role;
      const radios = careersForm.querySelectorAll('input[name="role"]');
      let matched = false;
      radios.forEach((r) => {
        if (r.value === target) { r.checked = true; matched = true; }
      });
      if (!matched) {
        // Internship card uses 'Internship' which matches the radio value directly
        const internRadio = careersForm.querySelector('#role-intern');
        if (target.toLowerCase().includes('intern') && internRadio) internRadio.checked = true;
      }
    });
  });
}
