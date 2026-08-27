const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const captions = Array.from(carousel.querySelectorAll('.carousel-caption'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let timer;

  if (slides.length < 2) {
    return;
  }

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === current);
    });

    captions.forEach((caption, captionIndex) => {
      caption.classList.toggle('active', captionIndex === current);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === current;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const stopAuto = () => {
    window.clearInterval(timer);
  };

  const startAuto = () => {
    stopAuto();
    timer = window.setInterval(() => {
      showSlide(current + 1);
    }, 4200);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAuto();
    });
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  showSlide(current);
  startAuto();
});
