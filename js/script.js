/* ================================================
   JBC STUDIO — script.js
   ================================================ */

(function () {
  'use strict';

  /* ── HEADER: scroll opaco ─────────────────── */
  const header = document.getElementById('header');
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    toggleBackToTop();
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── MENU MOBILE ──────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const mainNav   = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fechar ao clicar em um link
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
    });
  });

  /* ── ANIMAÇÕES DE ENTRADA (AOS simples) ───── */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  aosElements.forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    aosObserver.observe(el);
  });

  /* ── CONTADORES ANIMADOS ──────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  let countersDone = false;

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersDone) {
        countersDone = true;
        counters.forEach(function (el) {
          animateCounter(el, parseInt(el.getAttribute('data-count'), 10));
        });
      }
    });
  }, { threshold: 0.5 });

  if (counters.length) {
    counterObserver.observe(document.getElementById('numeros'));
  }

  function animateCounter(el, target) {
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }

  /* ── VOLTAR AO TOPO ───────────────────────── */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── FORMULÁRIO DE CONTATO ────────────────── */
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validação básica
      const nome     = contactForm.querySelector('#nome');
      const email    = contactForm.querySelector('#email');
      const mensagem = contactForm.querySelector('#mensagem');
      let valid = true;

      [nome, email, mensagem].forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ff4d4d';
          valid = false;
        }
      });

      // Validação simples de e-mail
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#ff4d4d';
        valid = false;
      }

      if (!valid) return;

      // Simular envio (substituir por integração real ex: EmailJS / backend)
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      setTimeout(function () {
        contactForm.reset();
        formSuccess.classList.add('show');
        btn.innerHTML = 'Enviar Mensagem <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        btn.disabled = false;
        setTimeout(function () { formSuccess.classList.remove('show'); }, 6000);
      }, 1200);
    });

    // Remover borda vermelha ao digitar
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  }

  /* ── SMOOTH SCROLL para navegação interna ──── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72; // altura do header fixo
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── NAV: link ativo conforme scroll ─────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('#mainNav a[href^="#"]');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (section) { sectionObserver.observe(section); });

})();
