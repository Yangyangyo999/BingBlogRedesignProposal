document.addEventListener('DOMContentLoaded', function () {
  const articlePage = document.querySelector('.article-page');
  const progress = document.querySelector('.reading-progress');
  const progressBar = document.querySelector('.reading-progress-bar');
  const sectionLinks = Array.from(document.querySelectorAll('.article-section-nav a'));
  const sections = sectionLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  function updateReadingState() {
    if (!articlePage || !progress || !progressBar) return;

    const articleTop = articlePage.offsetTop;
    const readableDistance = Math.max(articlePage.offsetHeight - window.innerHeight, 1);
    const percent = Math.min(Math.max(((window.scrollY - articleTop) / readableDistance) * 100, 0), 100);
    progressBar.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', Math.round(percent).toString());

    let activeSection = sections.reduce(function (current, section) {
      return section.getBoundingClientRect().top <= 140 ? section : current;
    }, sections[0]);
    if (percent >= 99) {
      activeSection = sections[sections.length - 1];
    }

    sectionLinks.forEach(function (link) {
      const isActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateReadingState, { passive: true });
  window.addEventListener('resize', updateReadingState);
  sectionLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      window.setTimeout(updateReadingState, 100);
    });
  });
  updateReadingState();

  const carousel = document.querySelector('.author-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.author-carousel-track');
  const cards = Array.from(carousel.querySelectorAll('.author-card'));
  const previousButton = document.querySelector('.author-carousel-prev');
  const nextButton = document.querySelector('.author-carousel-next');
  const status = document.querySelector('.author-carousel-status');
  let currentIndex = 0;
  let autoplayTimer;

  function showAuthor(index) {
    currentIndex = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    status.textContent = `${currentIndex + 1} / ${cards.length}`;
  }

  function startAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(function () {
      showAuthor(currentIndex + 1);
    }, 5000);
  }

  previousButton.addEventListener('click', function () {
    showAuthor(currentIndex - 1);
    startAutoplay();
  });

  nextButton.addEventListener('click', function () {
    showAuthor(currentIndex + 1);
    startAutoplay();
  });

  document.querySelectorAll('.article-authors a').forEach(function (link, index) {
    link.addEventListener('click', function () {
      showAuthor(index);
      startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', function () {
    window.clearInterval(autoplayTimer);
  });

  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', function () {
    window.clearInterval(autoplayTimer);
  });
  carousel.addEventListener('focusout', startAutoplay);

  startAutoplay();
});
