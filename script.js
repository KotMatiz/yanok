
function toggleVisibility(buttonId, textId, imgId, openSrc, closedSrc){
  const btn = document.getElementById(buttonId);
  if(!btn) return;
  btn.addEventListener('click', () => {
    const text = document.getElementById(textId);
    const img = imgId ? document.getElementById(imgId) : null;
    const isOpen = text.classList.toggle('visible');
    if(img && openSrc && closedSrc){ img.src = isOpen ? openSrc : closedSrc; }
  });
}

function initScrollReveals(){
  const revealSections = document.querySelectorAll('.page-hero, .section');
  const textItems = document.querySelectorAll(
    [
      '.hero-script',
      '.hero-title',
      '.hero-side',
      '.mona-script',
      '.mona-question',
      '.triangle-lead',
      '.triangle-terms',
      '.triangle-note',
      '.quick-task',
      '.painting-script',
      '.painting-caption',
      '.perspective-text',
      '.kicker',
      '.section-title',
      '.info-screen__script',
      '.info-screen__title',
      '.info-screen__paragraph',
      '.formula-lead',
      '.formula-rule',
      '.formula',
      '.highlight'
    ].join(',')
  );
  const imageItems = document.querySelectorAll(
    [
      '.main-arch',
      '.card-img',
      '.info-screen__image img',
      '.mona-img',
      '.task-triangle-img',
      '.elements-row img',
      '.blob-wrap img',
      '.element-card img',
      '.triangle-item img',
      '.perspective-head img'
    ].join(',')
  );

  revealSections.forEach(section => section.classList.add('section-reveal'));

  textItems.forEach((item, index) => {
    item.classList.add('reveal-up');
    item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
  });

  imageItems.forEach((item, index) => {
    item.classList.add('image-reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 120}ms`);
  });

  document.querySelectorAll('.section-reveal, .reveal-up, .image-reveal').forEach(item => {
    item.classList.add('is-visible');
  });
}

function initSoftParallax(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const parallaxItems = document.querySelectorAll(
    '.main-arch, .info-screen__image--big, .info-screen__image--harmony'
  );
  if(!parallaxItems.length) return;

  parallaxItems.forEach(item => item.classList.add('parallax-soft'));

  let ticking = false;

  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;

    parallaxItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = itemCenter - viewportCenter;
      const offset = Math.max(Math.min(distance * -0.035, 28), -28);
      item.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    });

    ticking = false;
  };

  const requestParallax = () => {
    if(!ticking){
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
});

toggleVisibility('mona-btn','mona-answer','mona-right','assets/mona_lisa_markup.jpg','assets/mona_lisa.jpg');

document.querySelectorAll('[data-correct]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-correct');
    const el = document.getElementById(id);
    if(el){
      el.classList.add('is-correct');
    }
  });
});

document.querySelectorAll('[data-toggle-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.toggleTarget);
    const swap = btn.dataset.swapImage ? document.getElementById(btn.dataset.swapImage) : null;
    const imgOpen = btn.dataset.openSrc;
    const imgClosed = btn.dataset.closedSrc;
    target.classList.toggle('visible');
    if(swap && imgOpen && imgClosed){ swap.src = target.classList.contains('visible') ? imgOpen : imgClosed; }
  });
});
