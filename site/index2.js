const searchForm = document.querySelector('.search');
const searchInput = document.getElementById('blog-search');
const categorySelect = document.getElementById('category');
const layoutSelect = document.getElementById('layout');
const storySections = Array.from(document.querySelectorAll('.stories'));
const articles = Array.from(document.querySelectorAll('.story'));
const emptyState = document.getElementById('empty-state');
const resultsStatus = document.getElementById('results-status');
const carousels = Array.from(document.querySelectorAll('.topic-carousel'));

function updateCarouselControls() {
  for (const carousel of carousels) {
    const controls = carousel.closest('.topic-section').querySelector('.carousel-controls');
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    controls.hidden = maxScroll <= 1 || carousel.closest('.stories').classList.contains('is-list');
    controls.querySelector('.carousel-previous').disabled = carousel.scrollLeft <= 1;
    controls.querySelector('.carousel-next').disabled = carousel.scrollLeft >= maxScroll - 1;
  }
}

function filterStories() {
  const query = searchInput.value.trim().toLocaleLowerCase('en');
  const category = categorySelect.value;
  let visibleCount = 0;

  for (const article of articles) {
    const matchesCategory = category === 'all' || article.dataset.category === category;
    const matchesQuery = article.textContent.toLocaleLowerCase('en').includes(query);
    article.hidden = !matchesCategory || !matchesQuery;
    if (!article.hidden) visibleCount += 1;
  }

  emptyState.hidden = visibleCount > 0;
  for (const section of storySections) {
    section.hidden = !section.querySelector('.story:not([hidden])');
  }
  for (const carousel of carousels) carousel.scrollLeft = 0;
  updateCarouselControls();
  resultsStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'story' : 'stories'} found`;
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterStories();
});
searchInput.addEventListener('input', filterStories);
categorySelect.addEventListener('change', filterStories);
layoutSelect.addEventListener('change', () => {
  for (const section of storySections) {
    section.classList.toggle('is-list', layoutSelect.value === 'list');
  }
  updateCarouselControls();
});
document.getElementById('reset-filters').addEventListener('click', () => {
  searchInput.value = '';
  categorySelect.value = 'all';
  filterStories();
  searchInput.focus();
});

const carouselObserver = new ResizeObserver(updateCarouselControls);
for (const carousel of carousels) {
  const controls = carousel.closest('.topic-section').querySelector('.carousel-controls');
  for (const button of controls.querySelectorAll('button')) {
    button.addEventListener('click', () => {
      const card = carousel.querySelector('.story:not([hidden])');
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).columnGap);
      carousel.scrollBy({
        left: button.classList.contains('carousel-next') ? step : -step,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
  }
  carousel.addEventListener('scroll', updateCarouselControls, { passive: true });
  carouselObserver.observe(carousel);
}
updateCarouselControls();
