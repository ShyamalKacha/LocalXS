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
      <div class="file-card" data-path="${encodeURIComponent(pathArg)}" data-isdir="${item.is_dir}" data-type="${item.type}" data-has-sidecar="${item.has_sidecar ? 'true' : 'false'}">
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
      <div class="file-row" data-path="${encodeURIComponent(pathArg)}" data-isdir="${item.is_dir}" data-type="${item.type}" data-has-sidecar="${item.has_sidecar ? 'true' : 'false'}">
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

// ---- Sidecar / Track helper functions ----

// Fetch audio track list from the API
async function fetchAudioTracks(path) {
  var response = await fetch('/api/audio_tracks/' + encodeURIComponent(path));
  if (!response.ok) throw new Error('Failed to fetch audio tracks');
  var data = await response.json();
  return data.tracks || [];
}

// Remove sidecar sync event handlers from a video element
function removeSidecarHandlers(video) {
  if (video._sidecarHandlers) {
    var h = video._sidecarHandlers;
    video.removeEventListener('play', h.play);
    video.removeEventListener('pause', h.pause);
    video.removeEventListener('seeking', h.seeking);
    video.removeEventListener('seeked', h.seeked);
    video.removeEventListener('ratechange', h.ratechange);
    if (h.rafId) cancelAnimationFrame(h.rafId);
    delete video._sidecarHandlers;
  }
}

// Attach sync event listeners: video muted → hidden <audio> plays in lockstep
function setupSidecarSync(video, sidecarAudio, sidecarUrl) {
  removeSidecarHandlers(video);

  // CRITICAL FIX 1: Kill native audio completely to prevent phase interference (echo/jitter)
  video.muted = true;
  video.volume = 0;

  sidecarAudio.src = sidecarUrl;
  sidecarAudio.load();

  var playHandler = function() {
    sidecarAudio.currentTime = video.currentTime;
    sidecarAudio.playbackRate = video.playbackRate || 1.0;
    sidecarAudio.play().catch(function() {});

    // Start the 60FPS sync loop
    function syncLoop() {
      if (!video.paused && !video.ended) {
        var diff = video.currentTime - sidecarAudio.currentTime;
        var absDiff = Math.abs(diff);
        var baseRate = video.playbackRate || 1.0;

        // CRITICAL FIX 2: If drift is > 150ms, gently glide the audio speed
        // This prevents buffer flushing (which causes the clipping sound)
        if (absDiff > 0.15) {
          // Video is ahead -> speed up audio by 5%
          // Audio is ahead -> slow down audio by 5%
          var adjustment = diff > 0 ? 1.05 : 0.95;
          sidecarAudio.playbackRate = baseRate * adjustment;
        } else {
          // Perfectly in sync
          sidecarAudio.playbackRate = baseRate;
        }

        video._sidecarHandlers.rafId = requestAnimationFrame(syncLoop);
      }
    }
    video._sidecarHandlers.rafId = requestAnimationFrame(syncLoop);
  };

  var pauseHandler = function() {
    if (video._sidecarHandlers && video._sidecarHandlers.rafId) {
      cancelAnimationFrame(video._sidecarHandlers.rafId);
    }
    sidecarAudio.pause();
  };

  var seekingHandler = function() {
    if (video._sidecarHandlers && video._sidecarHandlers.rafId) {
      cancelAnimationFrame(video._sidecarHandlers.rafId);
    }
    sidecarAudio.pause();
  };

  var seekedHandler = function() {
    // Hard sync is OK here ONLY because the user manually dragged the progress bar
    sidecarAudio.currentTime = video.currentTime;
    if (!video.paused) {
      sidecarAudio.play().catch(function() {});
      playHandler(); // Restart the 60FPS loop
    }
  };

  var ratechangeHandler = function() {
    // Match audio speed if user changes video playback speed (e.g., 1.5x)
    sidecarAudio.playbackRate = video.playbackRate || 1.0;
  };

  video._sidecarHandlers = {
    play: playHandler,
    pause: pauseHandler,
    seeking: seekingHandler,
    seeked: seekedHandler,
    ratechange: ratechangeHandler,
    rafId: null
  };

  video.addEventListener('play', playHandler);
  video.addEventListener('pause', pauseHandler);
  video.addEventListener('seeking', seekingHandler);
  video.addEventListener('seeked', seekedHandler);
  video.addEventListener('ratechange', ratechangeHandler);

  video.play().catch(function() {});
}

// Trigger on-demand extraction for a track and apply sidecar when done
async function extractAndApplyTrack(path, trackIndex, streamUrl, video, sidecarAudio, statusBar, progWrap) {
  try {
    var response = await fetch('/api/extract_sidecar/' + encodeURIComponent(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ track_index: trackIndex })
    });
    var data = await response.json();
    var iconEl = statusBar.querySelector('.status-icon');
    var textEl = statusBar.querySelector('.status-text');
    if (data.extracted) {
      if (progWrap && progWrap.parentNode) progWrap.parentNode.removeChild(progWrap);
      iconEl.innerHTML = '\uD83D\uDD0A';
      textEl.textContent = 'Track ' + (trackIndex + 1) + ': high-quality sidecar';
      statusBar.className = 'player-status done';
      var suffix = trackIndex === 0 ? '.audio.m4a' : '.audio.' + trackIndex + '.m4a';
      video.src = streamUrl;
      setupSidecarSync(video, sidecarAudio, streamUrl + suffix);
    } else {
      if (progWrap && progWrap.parentNode) progWrap.parentNode.removeChild(progWrap);
      iconEl.innerHTML = '\u26A0\uFE0F';
      textEl.textContent = 'Audio conversion skipped ' + (data.reason || '');
      statusBar.className = 'player-status error';
      video.src = streamUrl;
      video.play().catch(function() {});
    }
  } catch (e) {
    if (progWrap && progWrap.parentNode) progWrap.parentNode.removeChild(progWrap);
    var iconEl = statusBar.querySelector('.status-icon');
    var textEl = statusBar.querySelector('.status-text');
    if (iconEl) iconEl.innerHTML = '\u26A0\uFE0F';
    if (textEl) textEl.textContent = 'Audio extraction failed';
    statusBar.className = 'player-status error';
    video.src = streamUrl;
    video.play().catch(function() {});
  }
}

// Open File Previewer overlay modal
function openFilePreview(path, type) {
  const filename = path.split('/').pop();
  modalTitle.textContent = filename;
  modalBody.innerHTML = '';

  const streamUrl = `/api/stream/${encodeURIComponent(path)}`;
  const downloadUrl = `/api/download/${encodeURIComponent(path)}`;

  if (type === 'video') {
    // Clear any previous sidecar audio
    const sidecarAudio = document.getElementById('sidecarAudio');
    if (sidecarAudio) {
      sidecarAudio.pause();
      sidecarAudio.src = '';
      sidecarAudio.removeAttribute('src');
    }

    const container = document.createElement('div');
    container.className = 'media-container';
    modalBody.appendChild(container);

    // ---- Loading state ----
    container.innerHTML =
      '<div class="track-loading">' +
        '<div class="spinner-dots"><span></span><span></span><span></span></div>' +
        '<div class="track-load-label">Probing audio tracks\u2026</div>' +
      '</div>';

    fetchAudioTracks(path).then(function(tracks) {
      container.innerHTML = '';

      if (tracks.length === 0) {
        // No audio — plain player
        var fallbackVideo = document.createElement('video');
        fallbackVideo.src = streamUrl;
        fallbackVideo.className = 'modal-player';
        fallbackVideo.controls = true;
        fallbackVideo.autoplay = true;
        fallbackVideo.addEventListener('keydown', function(e) {
          if (!fallbackVideo.controls) return;
          var S = 5;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); fallbackVideo.currentTime = Math.min(fallbackVideo.currentTime + S, fallbackVideo.duration || 0); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); fallbackVideo.currentTime = Math.max(fallbackVideo.currentTime - S, 0); }
        });
        container.appendChild(fallbackVideo);
        return;
      }

      var singleTrack = tracks.length === 1;
      var defaultTrack = singleTrack ? tracks[0] : (tracks.find(function(t) { return t.has_sidecar; }) || tracks[0]);

      // ===== Phase 1: Track Picker =====

      var picker = document.createElement('div');
      picker.className = 'track-picker';

      // Icon
      var iconEl = document.createElement('div');
      iconEl.className = 'track-picker-icon';
      iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      picker.appendChild(iconEl);

      // Filename
      var fileName = decodeURIComponent((path || '').split('/').pop() || 'Video');
      var nameEl = document.createElement('div');
      nameEl.className = 'track-picker-filename';
      nameEl.textContent = fileName;
      nameEl.title = fileName;
      picker.appendChild(nameEl);

      // Subtitle
      var subtitleEl = document.createElement('div');
      subtitleEl.className = 'track-picker-subtitle';
      subtitleEl.textContent = tracks.length + ' audio track' + (tracks.length > 1 ? 's' : '') + ' detected';
      picker.appendChild(subtitleEl);

      // Divider
      var divider = document.createElement('div');
      divider.className = 'track-picker-divider';
      picker.appendChild(divider);

      // Selector row
      var rowEl = document.createElement('div');
      rowEl.className = 'track-picker-row';

      var labelEl = document.createElement('span');
      labelEl.className = 'track-picker-label';
      labelEl.textContent = 'Audio';
      rowEl.appendChild(labelEl);

      var selectEl = document.createElement('select');
      selectEl.className = 'track-picker-select';
      tracks.forEach(function(track) {
        var opt = document.createElement('option');
        opt.value = track.index;
        var lang = (track.language || 'und').toUpperCase();
        var ch = track.channels ? track.channels + 'ch' : '';
        var flag = track.supported ? '\u2713' : (track.has_sidecar ? 'sidecar' : '');
        var label = (track.index + 1) + '. ' + lang;
        if (ch) label += ' \u00B7 ' + ch;
        label += ' \u2014 ' + track.codec.toUpperCase();
        if (flag) label += ' (' + flag + ')';
        opt.textContent = label;
        selectEl.appendChild(opt);
      });
      selectEl.value = defaultTrack.index;
      rowEl.appendChild(selectEl);

      // Pill for single-track status
      if (singleTrack) {
        var pillEl = document.createElement('span');
        pillEl.className = 'track-picker-pill';
        var dot = document.createElement('span');
        dot.className = 'dot';
        var t = tracks[0];
        if (t.supported)       { dot.className += ' green'; pillEl.appendChild(dot); pillEl.appendChild(document.createTextNode(t.codec.toUpperCase() + ' \u2014 native')); }
        else if (t.has_sidecar) { dot.className += ' blue';  pillEl.appendChild(dot); pillEl.appendChild(document.createTextNode(t.codec.toUpperCase() + ' \u2014 sidecar')); }
        else                    { dot.className += ' amber'; pillEl.appendChild(dot); pillEl.appendChild(document.createTextNode(t.codec.toUpperCase() + ' \u2192 AAC')); }
        rowEl.appendChild(pillEl);
      }

      // Play button
      var playBtn = document.createElement('button');
      playBtn.className = 'track-picker-play';
      playBtn.textContent = '\u25B6 Play';
      rowEl.appendChild(playBtn);

      picker.appendChild(rowEl);

      // Prompt (multi-track only)
      if (!singleTrack) {
        var promptEl = document.createElement('div');
        promptEl.className = 'track-picker-prompt';
        promptEl.textContent = 'Select an audio track and click Play';
        picker.appendChild(promptEl);
      }

      container.appendChild(picker);

      // ===== Phase 2: Playback =====

      function startPlayback(trackIdx) {
        var track = tracks.find(function(t) { return t.index === trackIdx; });
        if (!track) return;

        container.innerHTML = '';

        var video = document.createElement('video');
        video.className = 'modal-player';
        video.controls = true;
        video.autoplay = true;
        video.addEventListener('keydown', function(e) {
          if (!video.controls) return;
          var S = 5;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); video.currentTime = Math.min(video.currentTime + S, video.duration || 0); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); video.currentTime = Math.max(video.currentTime - S, 0); }
        });
        container.appendChild(video);

        // Status bar
        var statusBar = document.createElement('div');
        statusBar.className = 'player-status';
        var statusIcon = document.createElement('span');
        statusIcon.className = 'status-icon';
        var statusText = document.createElement('span');
        statusText.className = 'status-text';
        statusBar.appendChild(statusIcon);
        statusBar.appendChild(statusText);
        container.appendChild(statusBar);

        if (track.supported) {
          // Native playback
          video.src = streamUrl;
          video.muted = false;
          statusBar.style.display = 'none';
          video.play().catch(function() {});
        } else if (track.has_sidecar) {
          // Sidecar exists
          video.src = streamUrl;
          video.muted = true;
          var sSuffix = track.index === 0 ? '.audio.m4a' : '.audio.' + track.index + '.m4a';
          statusIcon.innerHTML = '\uD83D\uDD0A';
          statusText.textContent = 'Track ' + (track.index + 1) + ' \u00B7 ' + (track.language || 'und').toUpperCase() + ' \u00B7 high-quality sidecar';
          statusBar.className = 'player-status info';
          setupSidecarSync(video, sidecarAudio, streamUrl + sSuffix);
        } else {
          // Need extraction
          video.muted = true;
          statusIcon.innerHTML = '\u2699\uFE0F';
          statusText.textContent = 'Converting track ' + (track.index + 1) + ' (' + (track.language || 'und').toUpperCase() + ')\u2026';
          statusBar.className = 'player-status working';

          var progWrap = document.createElement('div');
          progWrap.className = 'player-progress';
          var progBar = document.createElement('div');
          progBar.className = 'player-progress-bar indeterminate';
          progWrap.appendChild(progBar);
          container.insertBefore(progWrap, statusBar);

          extractAndApplyTrack(path, track.index, streamUrl, video, sidecarAudio, statusBar, progWrap);
        }
      }

      // Wire up
      playBtn.addEventListener('click', function() { startPlayback(parseInt(selectEl.value)); });
      selectEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') startPlayback(parseInt(selectEl.value));
      });

    }).catch(function(err) {
      container.innerHTML = '';
      var video = document.createElement('video');
      video.src = streamUrl;
      video.className = 'modal-player';
      video.controls = true;
      video.autoplay = true;
      video.addEventListener('keydown', function(e) {
        if (!video.controls) return;
        var S = 5;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); video.currentTime = Math.min(video.currentTime + S, video.duration || 0); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); video.currentTime = Math.max(video.currentTime - S, 0); }
      });
      container.appendChild(video);
    });
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

    removeSidecarHandlers(player);
  });

  // Clear sidecar audio element
  var sidecarAudio = document.getElementById('sidecarAudio');
  if (sidecarAudio) {
    sidecarAudio.pause();
    sidecarAudio.src = '';
    sidecarAudio.removeAttribute('src');
  }

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
