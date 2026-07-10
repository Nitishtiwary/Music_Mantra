/**
 * Muzic Mantra — Main JavaScript
 * Modular, vanilla ES6+ · No dependencies
 */

'use strict';

/* ==========================================================================
   Utility Module
   ========================================================================== */
const Utils = {
  /** Select a single DOM element */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  /** Select multiple DOM elements */
  $$(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  },

  /** Debounce function calls */
  debounce(fn, delay = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /** Validate email format */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /** Check if user prefers reduced motion */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};

/* ==========================================================================
   Loader Module
   ========================================================================== */
const Loader = {
  element: Utils.$('#loader'),

  init() {
    if (!this.element) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        this.element.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1600);
    });

    // Fallback: hide loader after 3s even if load event doesn't fire
    setTimeout(() => {
      this.element.classList.add('hidden');
    }, 3000);
  }
};

/* ==========================================================================
   Navigation Module
   ========================================================================== */
const Navigation = {
  header: Utils.$('#header'),
  toggle: Utils.$('#navToggle'),
  menu: Utils.$('#navMenu'),
  links: Utils.$$('.nav__link'),
  sections: Utils.$$('section[id]'),

  init() {
    this.bindToggle();
    this.bindSmoothScroll();
    this.bindScrollEffects();
    this.bindActiveSection();
  },

  bindToggle() {
    if (!this.toggle || !this.menu) return;

    this.toggle.addEventListener('click', () => {
      const isOpen = this.menu.classList.toggle('open');
      this.toggle.classList.toggle('active');
      this.toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.menu.classList.remove('open');
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.classList.contains('open')) {
        this.menu.classList.remove('open');
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  },

  bindSmoothScroll() {
    Utils.$$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = Utils.$(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  bindScrollEffects() {
    const onScroll = Utils.debounce(() => {
      const scrollY = window.scrollY;

      // Sticky header background
      if (this.header) {
        this.header.classList.toggle('scrolled', scrollY > 50);
      }

      // Scroll progress bar
      const progressBar = Utils.$('#scrollProgress');
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      }

      // Back to top button
      const backToTop = Utils.$('#backToTop');
      if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 500);
        backToTop.hidden = scrollY <= 500;
      }
    }, 10);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  bindActiveSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.links.forEach(link => {
              link.classList.toggle('active', link.dataset.section === id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    this.sections.forEach(section => observer.observe(section));
  }
};

/* ==========================================================================
   Scroll Reveal Module
   ========================================================================== */
const ScrollReveal = {
  elements: Utils.$$('.reveal'),

  init() {
    if (Utils.prefersReducedMotion()) {
      this.elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.elements.forEach(el => observer.observe(el));
  }
};

/* ==========================================================================
   Typing Animation Module
   ========================================================================== */
const TypingAnimation = {
  element: Utils.$('#typingText'),
  phrases: [
    'Alternative rock with a neon soul.',
    'Feel the frequency. Live the mantra.',
    'Midnight Frequencies — Out Now.',
    'Touring worldwide in 2026.'
  ],
  phraseIndex: 0,
  charIndex: 0,
  isDeleting: false,

  init() {
    if (!this.element || Utils.prefersReducedMotion()) {
      if (this.element) {
        this.element.textContent = this.phrases[0];
      }
      return;
    }
    this.type();
  },

  type() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }
};

/* ==========================================================================
   Gallery & Lightbox Module
   ========================================================================== */
const Gallery = {
  items: Utils.$$('.gallery__item'),
  lightbox: Utils.$('#lightbox'),
  lightboxImage: Utils.$('#lightboxImage'),
  lightboxCaption: Utils.$('#lightboxCaption'),
  closeBtn: Utils.$('#lightboxClose'),
  prevBtn: Utils.$('#lightboxPrev'),
  nextBtn: Utils.$('#lightboxNext'),
  currentIndex: 0,
  images: [],

  init() {
    if (!this.items.length || !this.lightbox) return;

    this.images = this.items.map(item => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt
    }));

    this.items.forEach((item, index) => {
      item.addEventListener('click', () => this.open(index));
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `View image: ${this.images[index].alt}`);

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.open(index);
        }
      });
    });

    this.closeBtn?.addEventListener('click', () => this.close());
    this.prevBtn?.addEventListener('click', () => this.navigate(-1));
    this.nextBtn?.addEventListener('click', () => this.navigate(1));

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  },

  open(index) {
    this.currentIndex = index;
    this.showImage();
    this.lightbox.classList.add('active');
    this.lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    this.closeBtn?.focus();
  },

  close() {
    this.lightbox.classList.remove('active');
    this.lightbox.hidden = true;
    document.body.style.overflow = '';
  },

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.showImage();
  },

  showImage() {
    const img = this.images[this.currentIndex];
    this.lightboxImage.src = img.src;
    this.lightboxImage.alt = img.alt;
    this.lightboxCaption.textContent = img.alt;
  }
};

/* ==========================================================================
   Lazy Loading Module (native + fallback)
   ========================================================================== */
const LazyLoad = {
  init() {
    const images = Utils.$$('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '200px' }
      );

      images.forEach(img => {
        if (img.dataset.src) observer.observe(img);
      });
    }
  }
};

/* ==========================================================================
   Form Validation Module
   ========================================================================== */
const Forms = {
  init() {
    this.initNewsletter();
    this.initContact();
  },

  initNewsletter() {
    const form = Utils.$('#newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = Utils.$('#newsletterEmail');
      const errorEl = Utils.$('#newsletterError');
      const successEl = Utils.$('#newsletterSuccess');

      this.clearMessages(errorEl, successEl);
      emailInput.classList.remove('error');

      const email = emailInput.value.trim();

      if (!email) {
        this.showError(errorEl, 'Please enter your email address.');
        emailInput.classList.add('error');
        emailInput.focus();
        return;
      }

      if (!Utils.isValidEmail(email)) {
        this.showError(errorEl, 'Please enter a valid email address.');
        emailInput.classList.add('error');
        emailInput.focus();
        return;
      }

      // Simulate successful subscription
      this.showSuccess(successEl, 'Welcome to the Mantra! Check your inbox for confirmation.');
      form.reset();
    });
  },

  initContact() {
    const form = Utils.$('#contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = Utils.$('#contactName');
      const email = Utils.$('#contactEmail');
      const subject = Utils.$('#contactSubject');
      const message = Utils.$('#contactMessage');
      const errorEl = Utils.$('#contactError');
      const successEl = Utils.$('#contactSuccess');

      this.clearMessages(errorEl, successEl);
      Utils.$$('.form-input.error', form).forEach(el => el.classList.remove('error'));

      const fields = [
        { el: name, label: 'Name' },
        { el: email, label: 'Email', validate: Utils.isValidEmail },
        { el: subject, label: 'Subject' },
        { el: message, label: 'Message' }
      ];

      for (const field of fields) {
        const value = field.el.value.trim();
        if (!value) {
          this.showError(errorEl, `${field.label} is required.`);
          field.el.classList.add('error');
          field.el.focus();
          return;
        }
        if (field.validate && !field.validate(value)) {
          this.showError(errorEl, `Please enter a valid ${field.label.toLowerCase()}.`);
          field.el.classList.add('error');
          field.el.focus();
          return;
        }
      }

      this.showSuccess(successEl, 'Message sent! We\'ll get back to you within 48 hours.');
      form.reset();
    });
  },

  showError(el, message) {
    if (el) {
      el.textContent = message;
      el.hidden = false;
    }
  },

  showSuccess(el, message) {
    if (el) {
      el.textContent = message;
      el.hidden = false;
    }
  },

  clearMessages(...elements) {
    elements.forEach(el => {
      if (el) {
        el.textContent = '';
        el.hidden = true;
      }
    });
  }
};

/* ==========================================================================
   Back to Top Module
   ========================================================================== */
const BackToTop = {
  button: Utils.$('#backToTop'),

  init() {
    if (!this.button) return;

    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ==========================================================================
   App Initialization
   ========================================================================== */
const App = {
  init() {
    Loader.init();
    Navigation.init();
    ScrollReveal.init();
    TypingAnimation.init();
    Gallery.init();
    LazyLoad.init();
    Forms.init();
    BackToTop.init();
  }
};

// DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
