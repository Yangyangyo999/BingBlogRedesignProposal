document.addEventListener('DOMContentLoaded', function () {
  const titleInput = document.getElementById('articleTitle');
  const descriptionInput = document.getElementById('articleDescription');
  const descriptionCount = document.getElementById('descriptionCount');
  const slugInput = document.getElementById('urlSlug');
  const toast = document.getElementById('toast');
  const faqList = document.getElementById('faqEditorList');
  const faqTemplate = document.getElementById('faqItemTemplate');
  const tagInput = document.getElementById('tagInput');
  const tagValues = document.getElementById('tagValues');
  const imageInput = document.getElementById('featuredImage');
  let tags = [];
  let toastTimer;
  let draggedFaq;

  function showToast(message, type) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = `toast show ${type || ''}`.trim();
    toastTimer = window.setTimeout(function () {
      toast.className = 'toast';
    }, 2800);
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  document.querySelectorAll('.editor-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.editor-tab').forEach(function (item) {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', isActive.toString());
      });
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        const isActive = panel.id === tab.dataset.tab;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });
    });
  });

  document.querySelectorAll('.content-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.content-tab').forEach(function (item) {
        const isActive = item === tab;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', isActive.toString());
      });
      document.querySelectorAll('.content-panel').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === tab.dataset.contentTab);
      });
      document.querySelector('.editor-toolbar').hidden = tab.dataset.contentTab !== 'rich-text';
    });
  });

  document.querySelectorAll('[data-toggle-target]').forEach(function (toggle) {
    toggle.addEventListener('change', function () {
      const target = document.getElementById(toggle.dataset.toggleTarget);
      target.classList.toggle('is-disabled', !toggle.checked);
      target.querySelectorAll('input, textarea, button').forEach(function (control) {
        control.disabled = !toggle.checked;
      });
    });
  });

  titleInput.addEventListener('input', function () {
    slugInput.value = slugify(titleInput.value);
  });

  descriptionInput.addEventListener('input', function () {
    descriptionCount.textContent = `${descriptionInput.value.length} / 180`;
  });

  function renderTags() {
    tagValues.innerHTML = '';
    tags.forEach(function (tag, index) {
      const chip = document.createElement('span');
      chip.className = 'tag-chip';
      chip.innerHTML = `${tag}<button type="button" aria-label="Remove ${tag}">×</button>`;
      chip.querySelector('button').addEventListener('click', function () {
        tags.splice(index, 1);
        renderTags();
      });
      tagValues.appendChild(chip);
    });
  }

  function addTag(value) {
    const tag = value.trim().replace(/,$/, '');
    if (tag && !tags.some(function (item) { return item.toLowerCase() === tag.toLowerCase(); })) {
      tags.push(tag);
      renderTags();
    }
    tagInput.value = '';
  }

  tagInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(tagInput.value);
    } else if (event.key === 'Backspace' && !tagInput.value && tags.length) {
      tags.pop();
      renderTags();
    }
  });
  document.getElementById('tagEditor').addEventListener('click', function () {
    tagInput.focus();
  });

  document.getElementById('uploadButton').addEventListener('click', function (event) {
    if (event.target !== imageInput) imageInput.click();
  });
  imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];
    if (!file) return;
    document.getElementById('uploadTitle').textContent = file.name;
    document.getElementById('uploadHelp').textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB · Click to replace`;
  });

  function updateFaqLabels() {
    faqList.querySelectorAll('.faq-editor-item').forEach(function (item, index) {
      item.querySelector('label').firstChild.textContent = `Question ${index + 1} `;
    });
  }

  function addFaq(question, answer) {
    const item = faqTemplate.content.firstElementChild.cloneNode(true);
    item.querySelector('[name="faqQuestion"]').value = question || '';
    item.querySelector('[name="faqAnswer"]').value = answer || '';
    item.querySelector('.remove-faq').addEventListener('click', function () {
      if (faqList.children.length === 1) {
        showToast('At least one FAQ item is required while this section is enabled.', 'error');
        return;
      }
      item.remove();
      updateFaqLabels();
    });
    item.addEventListener('dragstart', function () {
      draggedFaq = item;
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', function () {
      item.classList.remove('dragging');
      draggedFaq = null;
      updateFaqLabels();
    });
    item.addEventListener('dragover', function (event) {
      event.preventDefault();
      if (!draggedFaq || draggedFaq === item) return;
      const bounds = item.getBoundingClientRect();
      const insertAfter = event.clientY > bounds.top + bounds.height / 2;
      faqList.insertBefore(draggedFaq, insertAfter ? item.nextSibling : item);
    });
    faqList.appendChild(item);
    updateFaqLabels();
  }

  document.getElementById('addFaqButton').addEventListener('click', function () {
    addFaq();
    faqList.lastElementChild.querySelector('input').focus();
  });
  addFaq();
  addFaq();

  const authorFields = document.getElementById('authorFields');
  const authorList = document.getElementById('authorList');
  const authorSearch = document.getElementById('authorSearch');
  const seeAllAuthors = document.getElementById('seeAllAuthors');
  let showAllAuthors = false;
  const authorStorageKey = 'bingBlogsAdminAuthors';
  const defaultAuthors = [
    { name: 'Alex Morgan', introduction: 'Product storyteller exploring AI-powered search.' },
    { name: 'Bing Maps Team', introduction: 'Maps and Local Search Team' },
    { name: 'Bing Search Team', introduction: 'Search Experience Team' },
    { name: 'Jamie Chen', introduction: 'Engineer sharing ideas on search relevance and web technology.' },
    { name: 'Microsoft Webmaster Team', introduction: 'Webmaster Product Team' },
    { name: 'Priya Shah', introduction: 'Researcher focused on trustworthy AI and search quality.' },
    { name: 'Search Quality Insights', introduction: 'Search Quality Research Team' }
  ];

  function filterAuthors() {
    const query = authorSearch.value.trim().toLocaleLowerCase('en');
    const options = Array.from(authorList.querySelectorAll('.author-option'));
    let matches = 0;
    options.forEach(function (option) {
      const matchesQuery = option.querySelector('input').value.toLocaleLowerCase('en').includes(query);
      option.hidden = !matchesQuery || (!showAllAuthors && matches >= 5);
      if (matchesQuery) matches++;
    });
    seeAllAuthors.hidden = matches <= 5;
    seeAllAuthors.textContent = showAllAuthors ? 'Show less' : 'See all';
    seeAllAuthors.setAttribute('aria-expanded', showAllAuthors.toString());
    document.getElementById('authorResults').textContent = options.length === 0
      ? 'No authors yet. Add individual or team profiles in Author Management.'
      : matches === 0 ? 'No authors match your search.'
        : `Showing ${showAllAuthors ? matches : Math.min(matches, 5)} of ${matches} authors.`;
  }

  function renderAuthors() {
    const errorMessage = document.getElementById('authorLoadError');
    let authors;
    try {
      const stored = localStorage.getItem(authorStorageKey);
      authors = stored === null ? defaultAuthors : JSON.parse(stored);
      if (!Array.isArray(authors) || !authors.every(function (author) {
        return author && typeof author.name === 'string' && author.name.trim().length > 0 &&
          typeof author.introduction === 'string' &&
          (author.role === undefined || (typeof author.role === 'string' && author.role.length <= 100)) &&
          (author.highlightEnabled === undefined || typeof author.highlightEnabled === 'boolean') &&
          (author.image === undefined || author.image === '' ||
            (typeof author.image === 'string' && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+=*$/.test(author.image)));
      })) {
        throw new Error('Invalid saved author data');
      }
    } catch (error) {
      errorMessage.textContent = 'Authors could not be loaded. Check browser storage permissions or repair the saved data in Author Management, then reload.';
      errorMessage.hidden = false;
      return;
    }
    errorMessage.hidden = true;
    const selected = new Set(Array.from(authorFields.querySelectorAll(':checked')).map(function (item) { return item.value; }));
    const enabled = document.querySelector('[data-toggle-target="authorFields"]').checked;
    authorList.replaceChildren();
    authors.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    }).forEach(function (author) {
      const option = document.createElement('label');
      option.className = 'author-option';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'authors';
      checkbox.value = author.name;
      checkbox.checked = selected.has(author.name);
      checkbox.disabled = !enabled;
      const avatar = document.createElement(author.image ? 'img' : 'span');
      avatar.className = 'author-avatar avatar-blue';
      if (author.image) {
        avatar.src = author.image;
        avatar.alt = '';
      } else {
        avatar.textContent = getAuthorInitials(author.name);
        avatar.setAttribute('aria-hidden', 'true');
      }
      const details = document.createElement('span');
      const name = document.createElement('strong');
      name.textContent = author.name;
      const introduction = document.createElement('small');
      introduction.textContent = author.highlightEnabled === false ? '' : author.role || author.introduction;
      introduction.hidden = author.highlightEnabled === false;
      details.append(name, introduction);
      option.append(checkbox, avatar, details);
      authorList.appendChild(option);
    });
    filterAuthors();
  }

  authorSearch.addEventListener('input', function () {
    showAllAuthors = false;
    filterAuthors();
  });
  authorSearch.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') event.preventDefault();
  });
  seeAllAuthors.addEventListener('click', function () {
    showAllAuthors = !showAllAuthors;
    filterAuthors();
  });
  authorFields.addEventListener('change', function (event) {
    if (event.target.matches('[name="authors"]') && authorFields.querySelectorAll(':checked').length > 5) {
      event.target.checked = false;
      showToast('You can select up to five authors.', 'error');
    }
  });
  window.addEventListener('storage', function (event) {
    if (event.key === authorStorageKey || event.key === null) renderAuthors();
  });
  window.addEventListener('focus', renderAuthors);
  renderAuthors();

  function collectDraft() {
    return {
      title: titleInput.value.trim(),
      description: descriptionInput.disabled ? '' : descriptionInput.value.trim(),
      content: document.getElementById('rich-text').value,
      htmlContent: document.getElementById('html-content').value,
      slug: slugInput.value,
      categories: Array.from(document.querySelectorAll('[name="categories"]:checked')).map(function (item) { return item.value; }),
      tags: tags.slice(),
      takeaways: document.querySelector('[name="takeaways"]').disabled ? '' : document.querySelector('[name="takeaways"]').value,
      faqs: Array.from(faqList.children).map(function (item) {
        return {
          question: item.querySelector('[name="faqQuestion"]').value,
          answer: item.querySelector('[name="faqAnswer"]').value
        };
      }),
      authors: Array.from(document.querySelectorAll('[name="authors"]:checked:not(:disabled)')).map(function (item) { return item.value; })
    };
  }

  document.getElementById('saveButton').addEventListener('click', function () {
    localStorage.setItem('bingBlogsAdminDraft', JSON.stringify(collectDraft()));
    showToast('Draft saved in this browser.', 'success');
  });

  document.getElementById('publishButton').addEventListener('click', function () {
    const draft = collectDraft();
    if (!draft.title) {
      document.querySelector('[data-tab="main-body"]').click();
      titleInput.focus();
      showToast('Add a title before publishing.', 'error');
      return;
    }
    if (!draft.content.trim() && !draft.htmlContent.trim()) {
      document.querySelector('[data-tab="main-body"]').click();
      document.getElementById('rich-text').focus();
      showToast('Add article content before publishing.', 'error');
      return;
    }
    localStorage.setItem('bingBlogsAdminPublished', JSON.stringify({ ...draft, publishedAt: new Date().toISOString() }));
    showToast('Article published successfully.', 'success');
  });

  document.getElementById('previewButton').addEventListener('click', function () {
    const draft = collectDraft();
    const body = draft.htmlContent.trim() || `<p>${draft.content.replace(/\n+/g, '</p><p>')}</p>`;
    const preview = `<!doctype html><html><head><meta charset="utf-8"><title>${draft.title || 'Untitled article'} - Preview</title><style>body{max-width:860px;margin:60px auto;padding:0 24px;font:17px/1.75 Segoe UI,Arial;color:#26364d}h1{font-size:44px;line-height:1.1;color:#172033}.description{font-size:20px;color:#65748b}</style></head><body><h1>${draft.title || 'Untitled article'}</h1>${draft.description ? `<p class="description">${draft.description}</p>` : ''}<main>${body}</main></body></html>`;
    const previewUrl = URL.createObjectURL(new Blob([preview], { type: 'text/html' }));
    window.open(previewUrl, '_blank', 'noopener');
    window.setTimeout(function () { URL.revokeObjectURL(previewUrl); }, 60000);
  });

  document.getElementById('shareButton').addEventListener('click', async function () {
    const shareUrl = `${window.location.origin}${window.location.pathname}?preview=${slugInput.value || 'untitled'}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Preview link copied to clipboard.', 'success');
    } catch (error) {
      showToast('Copy failed. Save the draft and copy the page URL manually.', 'error');
    }
  });
});
