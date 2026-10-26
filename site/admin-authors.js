document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const storageKey = 'bingBlogsAdminAuthors';
  const platforms = {
    linkedin: { label: 'LinkedIn', icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>' },
    instagram: { label: 'Instagram', icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>' },
    facebook: { label: 'Facebook', icon: '<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>' },
    x: { label: 'X', icon: '<path d="m4 3 16 18h-5L4 3h5l11 18M20 3 4 21"/>' },
    website: { label: 'Website', icon: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>' }
  };
  const form = document.getElementById('authorForm');
  const dialog = document.getElementById('authorDialog');
  const nameInput = document.getElementById('authorName');
  const roleInput = document.getElementById('authorRole');
  const introduction = document.getElementById('authorIntroduction');
  const imageInput = document.getElementById('authorImage');
  const imagePreview = document.getElementById('imagePreview');
  const enableHighlight = document.getElementById('enableHighlight');
  const enableLink = document.getElementById('enableLink');
  const platformInput = document.getElementById('linkPlatform');
  const linkInput = document.getElementById('authorLink');
  const saveButton = document.getElementById('saveAuthor');
  let authors = [];
  let editingId = null;
  let image = '';
  let uploadVersion = 0;
  let toastTimer;

  function message(id, text) {
    const target = document.getElementById(id);
    target.textContent = text;
    target.hidden = !text;
  }

  function showToast(text) {
    const toast = document.getElementById('toast');
    window.clearTimeout(toastTimer);
    toast.textContent = text;
    toast.className = 'toast show success';
    toastTimer = window.setTimeout(function () { toast.className = 'toast'; }, 3000);
  }

  function validUrl(value) {
    try {
      const url = new URL(value);
      return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password;
    } catch (error) {
      if (error instanceof TypeError) return false;
      throw error;
    }
  }

  function validAuthor(author) {
    return author && typeof author.id === 'string' && typeof author.name === 'string' &&
      author.name.trim().length > 0 && author.name.length <= 100 &&
      (author.role === undefined || (typeof author.role === 'string' && author.role.length <= 100)) &&
      (author.highlightEnabled === undefined || typeof author.highlightEnabled === 'boolean') &&
      typeof author.introduction === 'string' && author.introduction.length <= 300 &&
      typeof author.image === 'string' && (author.image === '' || /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+=*$/.test(author.image)) &&
      typeof author.linkEnabled === 'boolean' && Object.hasOwn(platforms, author.platform) &&
      typeof author.url === 'string' && (!author.linkEnabled || author.highlightEnabled === false || validUrl(author.url));
  }

  function socialLink(platform, url) {
    const link = document.createElement('a');
    link.className = 'social-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Open ${platforms[platform].label} profile (new tab)`);
    link.innerHTML = `<svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${platforms[platform].icon}</svg>`;
    link.appendChild(document.createTextNode(platforms[platform].label));
    return link;
  }

  function persist(next) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      const text = error.name === 'QuotaExceededError'
        ? 'Browser storage is full. Try a smaller image or remove an unused author. Your changes have not been saved.'
        : 'Unable to save authors. Allow browser storage and try again. Your changes have not been saved.';
      message(dialog.open ? 'formError' : 'storageError', text);
      return false;
    }
    authors = next;
    message('storageError', '');
    render();
    return true;
  }

  function render() {
    const rows = document.getElementById('authorRows');
    rows.replaceChildren();
    document.getElementById('authorCount').textContent = authors.length;
    document.getElementById('emptyState').hidden = authors.length > 0;
    document.getElementById('authorTable').hidden = authors.length === 0;
    authors.forEach(function (author) {
      const row = document.createElement('tr');
      const identityCell = row.insertCell();
      const identity = document.createElement('div');
      identity.className = 'author-identity';
      const avatar = document.createElement(author.image ? 'img' : 'span');
      avatar.className = 'profile-avatar';
      if (author.image) {
        avatar.src = author.image;
        avatar.alt = '';
      } else {
        avatar.textContent = getAuthorInitials(author.name);
        avatar.setAttribute('aria-hidden', 'true');
      }
      const name = document.createElement('strong');
      name.textContent = author.name;
      const details = document.createElement('div');
      details.appendChild(name);
      if (author.highlightEnabled !== false && author.role) {
        const role = document.createElement('small');
        role.className = 'author-role';
        role.textContent = author.role;
        details.appendChild(role);
      }
      identity.append(avatar, details);
      identityCell.appendChild(identity);
      const bio = row.insertCell();
      bio.className = 'author-bio';
      bio.textContent = author.highlightEnabled === false ? 'Not enabled' : author.introduction || 'No bio';
      const linkCell = row.insertCell();
      if (author.highlightEnabled !== false && author.linkEnabled) {
        linkCell.appendChild(socialLink(author.platform, author.url));
      } else {
        linkCell.className = 'muted';
        linkCell.textContent = 'Not enabled';
      }
      const actions = document.createElement('div');
      actions.className = 'row-actions';
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'text-button';
      edit.textContent = 'Edit';
      edit.setAttribute('aria-label', `Edit ${author.name}`);
      edit.addEventListener('click', function () { openEditor(author); });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'text-button delete-button';
      remove.textContent = 'Delete';
      remove.setAttribute('aria-label', `Delete ${author.name}`);
      remove.addEventListener('click', function () {
        if (window.confirm(`Delete "${author.name}"? This cannot be undone.`) &&
          persist(authors.filter(function (item) { return item.id !== author.id; }))) {
          showToast('Author deleted.');
        }
      });
      actions.append(edit, remove);
      row.insertCell().appendChild(actions);
      rows.appendChild(row);
    });
  }

  function loadSampleAuthors() {
    const samples = [
      { name: 'Alex Morgan', introduction: 'Demo individual author. Product storyteller exploring AI-powered search and helpful everyday discoveries.', platform: 'linkedin', initials: 'AM', color: '#1769aa' },
      { name: 'Jamie Chen', introduction: 'Demo individual author. Engineer sharing ideas on search relevance, web technology, and developer experiences.', platform: 'instagram', initials: 'JC', color: '#7658a8' },
      { name: 'Priya Shah', introduction: 'Demo individual author. Researcher focused on trustworthy AI, search quality, and making information more accessible.', platform: 'facebook', initials: 'PS', color: '#bd7042' },
      { name: 'Bing Search Team', introduction: 'Demo team author. News and perspectives from the people building useful, intuitive search experiences.', platform: 'x', initials: 'BS', color: '#16766b' },
      { name: 'Bing Maps Team', introduction: 'Demo team author. Updates on maps, local discovery, location intelligence, and exploring the world.', platform: 'website', initials: 'BM', color: '#3679ab' },
      { name: 'Microsoft Webmaster Team', introduction: 'Demo team author. Practical guidance for site owners on crawling, indexing, and understanding search performance.', platform: 'linkedin', initials: 'MW', color: '#5d6c83', linkEnabled: false }
    ];
    const next = authors.slice();
    for (const sample of samples) {
      const slug = sample.name.toLowerCase().replace(/\s+/g, '-');
      const id = `demo-${slug}`;
      if (next.some(function (author) {
        return author.id === id || author.name.toLowerCase() === sample.name.toLowerCase();
      })) continue;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 160;
      const context = canvas.getContext('2d');
      if (!context) {
        message('storageError', 'Sample avatars could not be generated. Enable canvas support and try again. No authors have been changed.');
        return false;
      }
      context.fillStyle = sample.color;
      context.fillRect(0, 0, 160, 160);
      context.fillStyle = '#ffffff';
      context.font = '600 52px Segoe UI, Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(sample.initials, 80, 80);
      const linkEnabled = sample.linkEnabled !== false;
      next.push({
        id: id,
        name: sample.name,
        highlightEnabled: true,
        introduction: sample.introduction,
        image: canvas.toDataURL('image/png'),
        linkEnabled: linkEnabled,
        platform: sample.platform,
        url: linkEnabled ? `https://example.com/demo/${slug}` : ''
      });
    }
    const added = next.length - authors.length;
    if (!persist(next)) return false;
    showToast(added ? `${added} sample authors added in this browser.` : 'Sample authors are already in your list. Existing profiles were kept.');
    return true;
  }

  function updateImage() {
    imagePreview.hidden = !image;
    if (image) imagePreview.src = image;
    else imagePreview.removeAttribute('src');
    const placeholder = document.getElementById('imagePlaceholder');
    placeholder.textContent = getAuthorInitials(nameInput.value);
    placeholder.hidden = !!image;
    document.getElementById('uploadImage').textContent = image ? 'Replace image' : 'Upload image';
    document.getElementById('removeImage').hidden = !image;
  }

  function updateHighlight() {
    const fields = document.getElementById('highlightFields');
    fields.hidden = !enableHighlight.checked;
    fields.disabled = !enableHighlight.checked;
    enableHighlight.setAttribute('aria-expanded', enableHighlight.checked.toString());
    updateLink();
  }

  function updateLink() {
    const fields = document.getElementById('linkFields');
    fields.hidden = !enableLink.checked;
    fields.disabled = !enableLink.checked;
    linkInput.setCustomValidity(enableHighlight.checked && enableLink.checked && linkInput.value && !validUrl(linkInput.value)
      ? 'Enter a valid http:// or https:// address without login credentials.' : '');
    const preview = document.getElementById('linkPreview');
    preview.replaceChildren();
    if (enableLink.checked && validUrl(linkInput.value)) {
      preview.appendChild(socialLink(platformInput.value, linkInput.value));
    } else {
      preview.textContent = `${platforms[platformInput.value].label} icon will appear with a valid link.`;
    }
  }

  function updateCount() {
    document.getElementById('introductionCount').textContent = `${introduction.value.length} / 300`;
  }

  function openEditor(author) {
    form.reset();
    editingId = author ? author.id : null;
    image = author ? author.image : '';
    uploadVersion++;
    saveButton.disabled = false;
    document.getElementById('dialogTitle').textContent = author ? 'Edit author' : 'Add author';
    nameInput.value = author ? author.name : '';
    roleInput.value = author ? author.role || '' : '';
    introduction.value = author ? author.introduction : '';
    enableHighlight.checked = author ? author.highlightEnabled !== false : false;
    enableLink.checked = author ? author.linkEnabled : false;
    platformInput.value = author ? author.platform : 'linkedin';
    linkInput.value = author ? author.url : '';
    message('formError', '');
    message('imageError', '');
    updateImage();
    updateCount();
    updateHighlight();
    dialog.showModal();
    nameInput.focus();
  }

  document.getElementById('uploadImage').addEventListener('click', function () { imageInput.click(); });
  imageInput.addEventListener('change', function () {
    const version = ++uploadVersion;
    const file = imageInput.files[0];
    saveButton.disabled = false;
    message('imageError', '');
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      message('imageError', 'Choose a PNG, JPG, WebP, or GIF image no larger than 2 MB.');
      imageInput.value = '';
      return;
    }
    saveButton.disabled = true;
    const reader = new FileReader();
    function fail() {
      if (version !== uploadVersion) return;
      saveButton.disabled = false;
      imageInput.value = '';
      message('imageError', 'This image could not be read. Choose a valid image and try again.');
    }
    reader.onerror = fail;
    reader.onload = function () {
      const decoded = new Image();
      decoded.onerror = fail;
      decoded.onload = function () {
        if (version !== uploadVersion) return;
        image = reader.result;
        imageInput.value = '';
        saveButton.disabled = false;
        updateImage();
      };
      decoded.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('removeImage').addEventListener('click', function () {
    uploadVersion++;
    image = '';
    imageInput.value = '';
    saveButton.disabled = false;
    message('imageError', '');
    updateImage();
  });
  document.getElementById('addAuthor').addEventListener('click', function () { openEditor(); });
  document.getElementById('addFirstAuthor').addEventListener('click', function () { openEditor(); });
  document.getElementById('loadSampleAuthors').addEventListener('click', loadSampleAuthors);
  ['cancelAuthor', 'closeDialog'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function () { dialog.close(); });
  });
  dialog.addEventListener('close', function () { uploadVersion++; });
  enableHighlight.addEventListener('change', updateHighlight);
  enableLink.addEventListener('change', updateLink);
  platformInput.addEventListener('change', updateLink);
  linkInput.addEventListener('input', updateLink);
  introduction.addEventListener('input', updateCount);
  nameInput.addEventListener('input', function () {
    nameInput.setCustomValidity('');
    updateImage();
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (saveButton.disabled) return;
    nameInput.setCustomValidity(nameInput.value.trim() ? '' : 'Enter an author name.');
    updateLink();
    if (!form.reportValidity()) return;
    const author = {
      id: editingId || crypto.randomUUID(),
      name: nameInput.value.trim(),
      role: roleInput.value.trim(),
      highlightEnabled: enableHighlight.checked,
      introduction: introduction.value.trim(),
      image: image,
      linkEnabled: enableLink.checked && linkInput.value.trim().length > 0,
      platform: platformInput.value,
      url: linkInput.value.trim()
    };
    const next = editingId
      ? authors.map(function (item) { return item.id === editingId ? author : item; })
      : authors.concat(author);
    if (persist(next)) {
      dialog.close();
      showToast(editingId ? 'Author updated in this browser.' : 'Author added in this browser.');
    }
  });

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || !parsed.every(validAuthor) ||
        new Set(parsed.map(function (author) { return author.id; })).size !== parsed.length) {
        throw new Error('Invalid saved author data');
      }
      authors = parsed;
    }
  } catch (error) {
    message('storageError', 'Saved authors could not be loaded. Check browser storage permissions or repair the saved data, then reload. Adding authors is disabled to protect existing data.');
    document.getElementById('addAuthor').disabled = true;
    document.getElementById('addFirstAuthor').disabled = true;
    document.getElementById('loadSampleAuthors').disabled = true;
  }
  render();
  const previewUrl = new URL(window.location.href);
  if (previewUrl.searchParams.get('demo') === 'authors' &&
    !document.getElementById('loadSampleAuthors').disabled && loadSampleAuthors()) {
    previewUrl.searchParams.delete('demo');
    window.history.replaceState(null, '', previewUrl);
  }
});
