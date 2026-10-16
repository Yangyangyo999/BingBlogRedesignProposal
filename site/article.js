const secondaryArticleConfigs = {
  'hero-side-1.html': {
    author: 'Bing Search Team',
    role: 'Search Experience Team',
    bio: 'Building search controls that help publishers manage how their content appears across Bing results and AI-powered experiences.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Use data-nosnippet on specific content that should not appear in generated search previews.',
      'Keep essential page content available so search engines can still understand and rank the page.',
      'Monitor search performance after implementation and adjust excluded sections when needed.'
    ],
    faqs: [
      ['What does data-nosnippet control?', 'It prevents selected page content from being used in search result snippets and supported AI previews.'],
      ['Does data-nosnippet remove content from the index?', 'No. The page can still be crawled and indexed; the attribute controls how selected content is used in previews.'],
      ['Should the attribute be added to an entire page?', 'Use it selectively. Excluding too much content can reduce the useful context available for generating a relevant result.']
    ]
  },
  'hero-side-2.html': {
    author: 'Bing Places Team',
    role: 'Local Business Product Team',
    bio: 'Creating tools that help local businesses manage accurate listings and connect with customers across Bing Search and Maps.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Use the streamlined dashboard to create and maintain a complete business profile.',
      'Keep hours, contact details, categories, photos, and posts current for local customers.',
      'Review discovery trends to improve the listing based on real local search behavior.'
    ],
    faqs: [
      ['Who can use Bing Places for Business?', 'Business owners and authorized representatives can create, claim, verify, and manage local listings.'],
      ['Why should a business verify its listing?', 'Verification confirms ownership and helps customers trust that profile details are accurate and authoritative.'],
      ['How often should profile information be updated?', 'Review details whenever hours, services, contact information, or customer-facing offers change.']
    ]
  },
  'maps-1.html': {
    author: 'Bing Maps Team',
    role: 'Maps and Local Search Team',
    bio: 'Helping businesses build trusted local profiles and making accurate place information easier for customers to discover.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Claim the existing business listing before changing profile information.',
      'Choose the supported verification method that best matches the business.',
      'Maintain accurate details after verification to strengthen customer trust and local visibility.'
    ],
    faqs: [
      ['What is required to claim a business?', 'You need an existing listing or enough business information to create one, plus authority to manage the profile.'],
      ['Which verification methods are available?', 'Depending on eligibility, verification may be available by phone, email, mail, or an instant method.'],
      ['What happens after verification?', 'The profile becomes owner-managed and can appear with more complete, authoritative details in search and maps.']
    ]
  },
  'maps-2.html': {
    author: 'Bing Maps Team',
    role: 'Maps and Local Search Team',
    bio: 'Designing local discovery experiences that give businesses richer ways to share timely, useful information with nearby customers.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Use current storefront photos and offers to make the business easier to evaluate at a glance.',
      'Review hours, services, and contact details regularly to prevent missed customer visits.',
      'Combine accurate profile data with fresh content to improve local discoverability.'
    ],
    faqs: [
      ['What content can businesses add to their profiles?', 'Businesses can share profile details, photos, posts, offers, and other information supported by Bing Places.'],
      ['Why do current photos matter?', 'Recent images help customers recognize the location, understand the experience, and make informed decisions.'],
      ['How do accurate details support local search?', 'Reliable details help search systems match the business to relevant local needs and reduce customer confusion.']
    ]
  },
  'search-1.html': {
    author: 'Search Quality Insights',
    role: 'Search Quality Research Team',
    bio: 'Sharing practical guidance on relevance, structured information, and the signals that help search systems serve better results.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Choose schema types that accurately describe the page and its primary content.',
      'Use structured data to clarify entities and relationships, not to replace visible content.',
      'Validate markup and keep it aligned with what users can see on the page.'
    ],
    faqs: [
      ['Does structured data guarantee a rich result?', 'No. It helps Bing understand the page, but eligibility and presentation depend on quality, relevance, and supported experiences.'],
      ['Which schema type should a page use?', 'Use the most specific type that truthfully matches the main visible content, such as Article, Product, or Event.'],
      ['Can a page include more than one schema type?', 'Yes, when the types represent real visible entities and their relationships without misleading or duplicated markup.']
    ]
  },
  'search-2.html': {
    author: 'Search Quality Insights',
    role: 'Search Quality Research Team',
    bio: 'Explaining how content relevance, technical health, and user experience work together to support durable search performance.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Answer user questions directly with clear headings, useful examples, and focused content.',
      'Treat speed, mobile behavior, security, and crawl health as baseline requirements.',
      'Improve content and technical quality together instead of reacting to individual ranking signals.'
    ],
    faqs: [
      ['How should a site respond to a ranking update?', 'Review performance trends, identify meaningful quality gaps, and make changes that improve the user experience.'],
      ['Do technical fixes alone improve rankings?', 'Technical health supports discovery and usability, but strong results also depend on relevant, trustworthy content.'],
      ['How can content clarity be improved?', 'Use descriptive headings, concise explanations, concrete examples, and a structure that matches the reader’s intent.']
    ]
  },
  'search-3.html': {
    author: 'Bing Blog Team',
    role: 'Bing Blogs Team',
    bio: '<strong>Bing Blogs Team</strong> is responsible for building and evolving the Bing Blogs platform, creating a modern and reliable experience for publishing and discovering stories about Bing’s products, technology, and innovation. The team focuses on improving content experience, discoverability, and platform capabilities to better serve both readers and content creators.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=320&auto=format&fit=crop&crop=face',
    takeaways: [
      'Select the image model that best matches the prompt style and creative goal.',
      'Use specific subjects, moods, colors, settings, and artistic direction in advanced prompts.',
      'Experiment with multiple prompt variations and models to refine the final visual result.'
    ],
    faqs: [
      ['How should creators choose between the available models?', 'Compare how each model interprets the same idea and select the result that best fits the intended style and detail.'],
      ['What makes an effective image prompt?', 'A strong prompt clearly describes the subject, composition, setting, mood, color, and desired visual style.'],
      ['Can a prompt be refined after the first result?', 'Yes. Adjust specific details one at a time and compare variations to move the image closer to the intended outcome.']
    ]
  }
};

function enhanceSecondaryArticle() {
  const fileName = window.location.pathname.split('/').pop();
  const config = secondaryArticleConfigs[fileName];
  const articlePage = document.querySelector('.article-page');
  if (!config || !articlePage || articlePage.querySelector('.key-takeaways')) return;

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="reading-progress" role="progressbar" aria-label="Article reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <span class="reading-progress-bar"></span>
    </div>
  `);

  const backLink = articlePage.querySelector('.back-link');
  backLink.insertAdjacentHTML('afterend', `
    <nav class="article-section-nav" aria-label="Article sections">
      <p>On this page</p>
      <ul>
        <li><a class="active" href="#overview">Overview</a></li>
        <li><a href="#key-takeaways">Key Takeaways</a></li>
        <li><a href="#article-body">Article Body</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#authors">Author</a></li>
        <li><a href="#related-articles">Related Articles</a></li>
      </ul>
    </nav>
  `);

  const titleGroup = articlePage.querySelector('.article-title-group');
  titleGroup.id = 'overview';
  const authorMeta = titleGroup.querySelector('.article-meta span:first-child');
  authorMeta.className = 'article-authors';
  authorMeta.innerHTML = `
    <span class="article-author-prefix">By</span>
    <a href="#author-primary">${config.author}</a>
  `;
  titleGroup.querySelector('.article-tags')?.remove();
  titleGroup.insertAdjacentHTML('afterend', `
    <section class="key-takeaways" id="key-takeaways" aria-labelledby="key-takeaways-title">
      <h2 id="key-takeaways-title">Key Takeaways</h2>
      <ul>${config.takeaways.map(function (item) { return `<li>${item}</li>`; }).join('')}</ul>
    </section>
  `);

  const articleContent = articlePage.querySelector('.article-content');
  articleContent.id = 'article-body';
  const relatedArticles = articlePage.querySelector('.related-articles');
  relatedArticles.id = 'related-articles';
  relatedArticles.insertAdjacentHTML('beforebegin', `
    <section class="article-faq" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequent Asked Questions</h2>
      <div class="faq-list">
        ${config.faqs.map(function (item) {
          return `<details><summary>${item[0]}</summary><p>${item[1]}</p></details>`;
        }).join('')}
      </div>
    </section>
    <section class="article-author-section" id="authors" aria-label="Author">
      <div class="author-carousel">
        <div class="author-carousel-track">
          <article class="author-card" id="author-primary">
            <img src="${config.image}" alt="${config.author}">
            <div class="author-card-content">
              <div class="author-card-heading">
                <div>
                  <h3>${config.author}</h3>
                  <p class="author-role">${config.role}</p>
                </div>
              </div>
              <p>${config.bio}</p>
              <a class="linkedin-link" href="https://www.linkedin.com/company/microsoft/" target="_blank" rel="noopener noreferrer" aria-label="${config.author} on LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.25H3.25V18.7H6.5V8.25Zm.2-3.23A1.88 1.88 0 1 0 2.94 5a1.88 1.88 0 0 0 3.76.02ZM18.7 12.7c0-3.15-1.68-4.62-3.93-4.62a3.4 3.4 0 0 0-3.08 1.7V8.25H8.44V18.7h3.25v-5.17c0-1.36.26-2.68 1.95-2.68 1.66 0 1.68 1.56 1.68 2.77v5.08h3.25l.13-6Z"/></svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `);
}

document.addEventListener('DOMContentLoaded', function () {
  enhanceSecondaryArticle();

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
    if (status) status.textContent = `${currentIndex + 1} / ${cards.length}`;
  }

  function startAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(function () {
      showAuthor(currentIndex + 1);
    }, 5000);
  }

  if (previousButton && nextButton && cards.length > 1) {
    previousButton.addEventListener('click', function () {
      showAuthor(currentIndex - 1);
      startAutoplay();
    });

    nextButton.addEventListener('click', function () {
      showAuthor(currentIndex + 1);
      startAutoplay();
    });
  }

  document.querySelectorAll('.article-authors a').forEach(function (link, index) {
    link.addEventListener('click', function () {
      showAuthor(index);
      if (cards.length > 1) startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', function () {
    window.clearInterval(autoplayTimer);
  });

  carousel.addEventListener('mouseleave', function () {
    if (cards.length > 1) startAutoplay();
  });
  carousel.addEventListener('focusin', function () {
    window.clearInterval(autoplayTimer);
  });
  carousel.addEventListener('focusout', function () {
    if (cards.length > 1) startAutoplay();
  });

  if (cards.length > 1) startAutoplay();
});
