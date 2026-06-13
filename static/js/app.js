// SVG icons
const ICON = {
  folder: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  video: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  audio: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  image: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  text: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  archive: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
  file: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  edit: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  xmark: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  info: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  alert: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  spinner: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke-dasharray="30 70"/></svg>'
};

// State management
let currentPath = '';
let filesList = [];
let viewMode = localStorage.getItem('viewMode') || 'grid';
let sortKey = 'name';
let sortOrder = 'asc';

// DOM Elements
const filesContainer = document.getElementById('files-container');
const breadcrumb = document.getElementById('breadcrumb');
const searchInput = document.getElementById('search-input');
const viewGridBtn = document.getElementById('view-grid-btn');
const viewListBtn = document.getElementById('view-list-btn');
const sortSelect = document.getElementById('sort-select');
const createFolderBtn = document.getElementById('create-folder-btn');
const uploadInput = document.getElementById('upload-input');
const uploadProgressContainer = document.getElementById('upload-progress-container');
const uploadProgressFill = document.getElementById('upload-progress-fill');
const uploadProgressPercent = document.getElementById('upload-progress-percent');
const storageText = document.getElementById('storage-text');
const storageBarFill = document.getElementById('storage-bar-fill');
const toastContainer = document.getElementById('toast-container');
const dropOverlay = document.getElementById('drop-overlay');

// Modals
const previewModal = document.getElementById('preview-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const actionModal = document.getElementById('action-modal');
const actionModalTitle = document.getElementById('action-modal-title');
const actionModalBody = document.getElementById('action-modal-body');

// CSRF token helper
function getCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : '';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const hashPath = window.location.hash.replace(/^#\/?/, '');
  currentPath = hashPath;
  
  loadFiles(currentPath);
  setupEventListeners();
  updateViewModeUI();
});

// Event Listeners setup
function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', filterAndRenderFiles);

  // Sorting
  sortSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'name-asc') { sortKey = 'name'; sortOrder = 'asc'; }
    else if (val === 'name-desc') { sortKey = 'name'; sortOrder = 'desc'; }
    else if (val === 'size-asc') { sortKey = 'size'; sortOrder = 'asc'; }
    else if (val === 'size-desc') { sortKey = 'size'; sortOrder = 'desc'; }
    else if (val === 'date-asc') { sortKey = 'mtime'; sortOrder = 'asc'; }
    else if (val === 'date-desc') { sortKey = 'mtime'; sortOrder = 'desc'; }
    sortAndRenderFiles();
  });

  // View toggle
  viewGridBtn.addEventListener('click', () => setViewMode('grid'));
  viewListBtn.addEventListener('click', () => setViewMode('list'));

  // Folder creation
  createFolderBtn.addEventListener('click', showCreateFolderModal);

  // Upload button triggers file picker
  document.getElementById('upload-btn').addEventListener('click', () => {
    uploadInput.click();
  });

  // File Input Upload
  uploadInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  });

  // Event delegation for file cards and action buttons
  filesContainer.addEventListener('click', (e) => {
    const renameBtn = e.target.closest('[data-action="rename"]');
    const deleteBtn = e.target.closest('[data-action="delete"]');
    const card = e.target.closest('.file-card, .file-row');

    if (renameBtn) {
      e.stopPropagation();
      showRenameModal(decodeURIComponent(renameBtn.dataset.path), decodeURIComponent(renameBtn.dataset.name));
      return;
    }

    if (deleteBtn) {
      e.stopPropagation();
      showDeleteModal(decodeURIComponent(deleteBtn.dataset.path), decodeURIComponent(deleteBtn.dataset.name), deleteBtn.dataset.isdir === 'true');
      return;
    }

    if (card) {
      handleItemClick(decodeURIComponent(card.dataset.path), card.dataset.isdir === 'true', card.dataset.type);
    }
  });

  // Event delegation for action modal (cancel, confirm-delete)
  actionModalBody.addEventListener('click', (e) => {
    const cancelBtn = e.target.closest('[data-action="cancel"]');
    const deleteBtn = e.target.closest('[data-action="confirm-delete"]');

    if (cancelBtn) {
      closeAllModals();
    }

    if (deleteBtn) {
      executeDelete(window.targetDeleteVal);
    }
  });

  // Event delegation for toast close buttons
  toastContainer.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.toast-close');
    if (closeBtn) {
      closeBtn.parentElement.remove();
    }
  });

  // Global Page-Wide Drag & Drop
  window.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropOverlay.style.display = 'flex';
  });

  window.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  window.addEventListener('dragleave', (e) => {
    e.preventDefault();
    // Verify cursor has left the window boundary
    if (e.relatedTarget === null) {
      dropOverlay.style.display = 'none';
    }
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.style.display = 'none';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFiles(files);
    }
  });

  // Hash change navigation
  window.addEventListener('hashchange', () => {
    const hashPath = window.location.hash.replace(/^#\/?/, '');
    currentPath = hashPath;
    loadFiles(currentPath);
  });

  // Close modals
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// Fetch files list from backend
async function loadFiles(path = '') {
  showLoader();
  try {
    const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = '/login';
        return;
      }
      throw new Error('Failed to load files');
    }
    const data = await response.json();
    filesList = data.items || [];
    renderBreadcrumbs(data.current_path);
    sortAndRenderFiles();
    updateStorageUI(data.stats);
  } catch (error) {
    showToast(`Error: ${error.message}`, 'error');
    filesContainer.innerHTML = `<div class="empty-state"><div class="empty-icon">${ICON.alert}</div><p>${escapeHtml(error.message)}</p></div>`;
  }
}

// Render Breadcrumbs
function renderBreadcrumbs(path) {
  breadcrumb.innerHTML = '';
  
  const rootLink = document.createElement('a');
  rootLink.href = '#';
  rootLink.className = 'breadcrumb-item';
  rootLink.textContent = 'Root';
  breadcrumb.appendChild(rootLink);

  if (!path) {
    rootLink.classList.add('active');
    return;
  }

  const parts = path.split('/').filter(p => p);
  let cumPath = '';
  
  parts.forEach((part, index) => {
    const sep = document.createElement('span');
    sep.className = 'breadcrumb-separator';
    sep.textContent = '/';
    breadcrumb.appendChild(sep);

    cumPath += (index === 0 ? '' : '/') + part;

    const item = document.createElement('a');
    item.href = `#/${cumPath}`;
    item.className = 'breadcrumb-item';
    item.textContent = part;

    if (index === parts.length - 1) {
      item.classList.add('active');
    }
    breadcrumb.appendChild(item);
  });
}

// Sort & Render
function sortAndRenderFiles() {
  filesList.sort((a, b) => {
    if (a.is_dir && !b.is_dir) return -1;
    if (!a.is_dir && b.is_dir) return 1;

    let valA = a[sortKey];
    let valB = b[sortKey];

    if (typeof valA === 'string') {
      const result = valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
      return sortOrder === 'asc' ? result : -result;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  filterAndRenderFiles();
}

// Filter and Render
function filterAndRenderFiles() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = filesList.filter(item => item.name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    filesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${ICON.folder}</div>
        <p>${query ? 'No matching files found' : 'This folder is empty'}</p>
      </div>
    `;
    return;
  }

  if (viewMode === 'grid') {
    renderGrid(filtered);
  } else {
    renderList(filtered);
  }
}

// Render Grid View
function renderGrid(items) {
  let html = '<div class="files-grid">';
  
  items.forEach(item => {
    const icon = getFileIcon(item);
    const pathArg = currentPath ? `${currentPath}/${item.name}` : item.name;
    
    html += `
      <div class="file-card" data-path="${encodeURIComponent(pathArg)}" data-isdir="${item.is_dir}" data-type="${item.type}">
        <div class="file-actions">
          <button class="action-btn" data-action="rename" data-path="${encodeURIComponent(pathArg)}" data-name="${encodeURIComponent(item.name)}" title="Rename">${ICON.edit}</button>
          <button class="action-btn delete-btn" data-action="delete" data-path="${encodeURIComponent(pathArg)}" data-name="${encodeURIComponent(item.name)}" data-isdir="${item.is_dir}" title="Delete">${ICON.trash}</button>
        </div>
        <div class="file-icon-wrapper">${icon}</div>
        <div class="file-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
        <div class="file-meta">${item.is_dir ? 'Folder' : item.size_str}</div>
      </div>
    `;
  });
  
  html += '</div>';
  filesContainer.innerHTML = html;
}

// Render List View
function renderList(items) {
  let html = '<div class="files-list">';
  
  items.forEach(item => {
    const icon = getFileIcon(item);
    const pathArg = currentPath ? `${currentPath}/${item.name}` : item.name;
    
    html += `
      <div class="file-row" data-path="${encodeURIComponent(pathArg)}" data-isdir="${item.is_dir}" data-type="${item.type}">
        <div class="file-row-icon">${icon}</div>
        <div class="file-row-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
        <div class="file-row-meta">${item.is_dir ? 'Folder' : item.size_str}</div>
        <div class="file-row-meta">${item.mtime_str || ''}</div>
        <div class="file-row-actions">
          <button class="action-btn" data-action="rename" data-path="${encodeURIComponent(pathArg)}" data-name="${encodeURIComponent(item.name)}" title="Rename">${ICON.edit}</button>
          <button class="action-btn delete-btn" data-action="delete" data-path="${encodeURIComponent(pathArg)}" data-name="${encodeURIComponent(item.name)}" data-isdir="${item.is_dir}" title="Delete">${ICON.trash}</button>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  filesContainer.innerHTML = html;
}

// Helper to resolve icon
function getFileIcon(item) {
  if (item.is_dir) return ICON.folder;
  switch(item.type) {
    case 'video': return ICON.video;
    case 'audio': return ICON.audio;
    case 'image': return ICON.image;
    case 'text': return ICON.text;
    case 'archive': return ICON.archive;
    default: return ICON.file;
  }
}

// Set View Mode
function setViewMode(mode) {
  viewMode = mode;
  localStorage.setItem('viewMode', mode);
  updateViewModeUI();
  filterAndRenderFiles();
}

function updateViewModeUI() {
  if (viewMode === 'grid') {
    viewGridBtn.classList.add('active');
    viewListBtn.classList.remove('active');
  } else {
    viewListBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
  }
}

// Update Storage Stats UI
function updateStorageUI(stats) {
  if (!stats) return;
  if (storageBarFill) storageBarFill.style.width = `${stats.percent}%`;
  storageText.textContent = `Used: ${stats.used_str} / ${stats.total_str} (${stats.percent}% used) • Free: ${stats.free_str}`;
}

// Handle File/Directory Click
function handleItemClick(path, isDir, fileType) {
  if (isDir) {
    window.location.hash = `#/${path}`;
  } else {
    openFilePreview(path, fileType);
  }
}

// Show loader
function showLoader() {
  filesContainer.innerHTML = `
    <div class="empty-state">
      <div class="spinner">${ICON.spinner}</div>
      <p>Loading files...</p>
    </div>
  `;
}

// Trigger file download by opening in new tab (user gesture bypasses popup blockers)
function triggerDownload(url) {
  window.open(url, '_blank');
}

// Open File Previewer overlay modal
function openFilePreview(path, type) {
  const filename = path.split('/').pop();
  modalTitle.textContent = filename;
  modalBody.innerHTML = '';
  
  const streamUrl = `/api/stream/${encodeURIComponent(path)}`;
  const downloadUrl = `/api/download/${encodeURIComponent(path)}`;
  
  if (type === 'video') {
    const video = document.createElement('video');
    video.src = streamUrl;
    video.className = 'modal-player';
    video.controls = true;
    video.autoplay = true;
    
    const container = document.createElement('div');
    container.className = 'media-container';
    container.appendChild(video);
    modalBody.appendChild(container);
  } 
  else if (type === 'audio') {
    const audio = document.createElement('audio');
    audio.src = streamUrl;
    audio.className = 'modal-player';
    audio.controls = true;
    audio.autoplay = true;
    modalBody.appendChild(audio);
  } 
  else if (type === 'image') {
    const img = document.createElement('img');
    img.src = streamUrl;
    img.className = 'image-preview';
    modalBody.appendChild(img);
  } 
  else if (type === 'text') {
    const pre = document.createElement('pre');
    pre.className = 'text-preview';
    pre.textContent = 'Reading text file...';
    modalBody.appendChild(pre);
    
    fetch(streamUrl)
      .then(r => {
        if (!r.ok) throw new Error('Could not read text file');
        return r.text();
      })
      .then(text => {
        pre.textContent = text;
      })
      .catch(err => {
        pre.textContent = `Error loading content: ${err.message}`;
      });
  } 
  else {
    const container = document.createElement('div');
    container.style.cssText = 'text-align: center; padding: 30px 10px;';
    container.innerHTML = `
      <div class="preview-file-icon">${ICON.file}</div>
      <p style="margin-bottom: 20px; color: var(--text-secondary); font-size:0.9rem;">Preview not supported for this file.</p>
    `;
    const dlButton = document.createElement('button');
    dlButton.className = 'btn btn-primary';
    dlButton.type = 'button';
    dlButton.innerHTML = `${ICON.download} Download File`;
    dlButton.addEventListener('click', function () { triggerDownload(downloadUrl); });
    container.appendChild(dlButton);
    modalBody.appendChild(container);
  }
  
  if (['video', 'audio', 'image', 'text'].includes(type)) {
    const dlBtn = document.createElement('div');
    dlBtn.className = 'download-section';
    const dlButton = document.createElement('button');
    dlButton.className = 'btn btn-secondary';
    dlButton.type = 'button';
    dlButton.innerHTML = `${ICON.download} Download File`;
    dlButton.addEventListener('click', function () { triggerDownload(downloadUrl); });
    dlBtn.appendChild(dlButton);
    modalBody.appendChild(dlBtn);
  }
  
  previewModal.classList.add('active');
}

// Upload Files
function uploadFiles(files) {
  if (files.length === 0) return;
  
  const file = files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', currentPath);
  
  uploadProgressContainer.style.display = 'flex';
  uploadProgressFill.style.width = '0%';
  uploadProgressPercent.textContent = '0%';
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/upload', true);
  xhr.setRequestHeader('X-CSRF-Token', getCsrfToken());
  
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      uploadProgressFill.style.width = `${percent}%`;
      uploadProgressPercent.textContent = `${percent}%`;
    }
  };
  
  xhr.onload = () => {
    uploadProgressContainer.style.display = 'none';
    if (xhr.status === 200) {
      showToast('File uploaded successfully!', 'success');
      loadFiles(currentPath);
    } else {
      let errorMsg = 'Upload failed';
      try {
        const res = JSON.parse(xhr.responseText);
        errorMsg = res.error || errorMsg;
      } catch(e) {}
      showToast(errorMsg, 'error');
    }
  };
  
  xhr.onerror = () => {
    uploadProgressContainer.style.display = 'none';
    showToast('Network error during upload', 'error');
  };
  
  xhr.send(formData);
}

// Show Create Folder Dialog
function showCreateFolderModal() {
  actionModalTitle.textContent = 'Create New Folder';
  actionModalBody.innerHTML = `
    <form id="folder-form" class="modal-form">
      <div class="form-group">
        <label class="form-label" for="folder-name">Folder Name</label>
        <input class="form-control" type="text" id="folder-name" required placeholder="Enter folder name" autocomplete="off">
      </div>
      <div class="modal-actions">
        <button class="btn btn-secondary" type="button" data-action="cancel">Cancel</button>
        <button class="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
  `;
  actionModal.classList.add('active');
  document.getElementById('folder-name').focus();
  document.getElementById('folder-form').addEventListener('submit', handleCreateFolderSubmit);
}

async function handleCreateFolderSubmit(e) {
  e.preventDefault();
  const folderName = document.getElementById('folder-name').value.trim();
  if (!folderName) return;
  
  closeAllModals();
  
  try {
    const response = await fetch('/api/create_folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken() },
      body: JSON.stringify({ path: currentPath, name: folderName })
    });
    
    const res = await response.json();
    if (!response.ok) throw new Error(res.error || 'Failed to create folder');
    
    showToast('Folder created!', 'success');
    loadFiles(currentPath);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Show Rename Dialog
function showRenameModal(fullPath, currentName) {
  actionModalTitle.textContent = 'Rename Item';
  actionModalBody.innerHTML = `
    <form id="rename-form" class="modal-form">
      <div class="form-group">
        <label class="form-label" for="new-name">New Name</label>
        <input class="form-control" type="text" id="new-name" value="${escapeHtml(currentName)}" required placeholder="Enter new name" autocomplete="off">
      </div>
      <div class="modal-actions">
        <button class="btn btn-secondary" type="button" data-action="cancel">Cancel</button>
        <button class="btn btn-primary" type="submit">Rename</button>
      </div>
    </form>
  `;
  window.oldPathVal = fullPath;
  
  actionModal.classList.add('active');
  const input = document.getElementById('new-name');
  input.focus();
  document.getElementById('rename-form').addEventListener('submit', (e) => handleRenameSubmit(e, fullPath));
  
  const dotIndex = currentName.lastIndexOf('.');
  if (dotIndex > 0) {
    input.setSelectionRange(0, dotIndex);
  } else {
    input.select();
  }
}

async function handleRenameSubmit(e, oldPath) {
  e.preventDefault();
  const newName = document.getElementById('new-name').value.trim();
  if (!newName) return;
  
  closeAllModals();
  
  try {
    const response = await fetch('/api/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken() },
      body: JSON.stringify({ old_path: oldPath, new_name: newName })
    });
    
    const res = await response.json();
    if (!response.ok) throw new Error(res.error || 'Failed to rename item');
    
    showToast('Renamed successfully!', 'success');
    loadFiles(currentPath);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Show Delete Dialog
function showDeleteModal(fullPath, filename, isDir) {
  actionModalTitle.textContent = 'Delete Item';
  actionModalBody.innerHTML = `
    <div style="margin-bottom: 20px; font-size: 0.9rem; line-height: 1.4;">
      Delete <strong style="color: var(--danger-color);">${escapeHtml(filename)}</strong> permanently?<br>
      This cannot be undone.
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" type="button" data-action="cancel">Cancel</button>
      <button class="btn btn-danger" type="button" data-action="confirm-delete">Yes, Delete</button>
    </div>
  `;
  window.targetDeleteVal = fullPath;
  actionModal.classList.add('active');
}

async function executeDelete(targetPath) {
  closeAllModals();
  
  try {
    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': getCsrfToken() },
      body: JSON.stringify({ path: targetPath })
    });
    
    const res = await response.json();
    if (!response.ok) throw new Error(res.error || 'Failed to delete item');
    
    showToast('Deleted item!', 'success');
    loadFiles(currentPath);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Close Modals
function closeAllModals() {
  const players = modalBody.querySelectorAll('.modal-player');
  players.forEach(player => {
    player.pause();
    player.src = '';
    player.load();
  });
  
  previewModal.classList.remove('active');
  actionModal.classList.remove('active');
}

// Escape HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let svgIcon = ICON.info;
  if (type === 'success') svgIcon = ICON.check;
  if (type === 'error') svgIcon = ICON.xmark;
  
  toast.innerHTML = `
    <div style="display:flex; align-items:center; gap:6px; font-size:0.85rem;">
      <span class="toast-icon">${svgIcon}</span>
      <span>${escapeHtml(message)}</span>
    </div>
    <button class="toast-close">${ICON.xmark}</button>
  `;
  
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
