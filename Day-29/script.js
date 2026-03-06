
/* ═══════════════════════════════════════════════════
   script.js — Inkwell Blog Platform
   Handles: View routing, CRUD, editor, theme, search
═══════════════════════════════════════════════════ */

'use strict';

// ── Category Colors ───────────────────────────────
const CAT_COLORS = {
  technology: '#6b9fff',
  design:     '#c9a96e',
  business:   '#4caf8a',
  culture:    '#c97bb2',
  general:    '#888',
};

// ── Seed Data ─────────────────────────────────────
let posts = [
  {
    _id: 'p1', title: 'The Quiet Revolution of Serverless Architecture',
    category: 'technology', author: 'Elena Marsh', excerpt: 'How serverless changed the way we think about infrastructure — and why most teams still get it wrong.',
    content: `## The Shift Nobody Saw Coming\n\nWhen AWS Lambda launched in 2014, it seemed like a novelty — a way to run small scripts without a server. Few predicted it would reshape how entire applications are built.\n\n**Serverless isn't about the absence of servers.** It's about the absence of *server management*. The distinction matters enormously.\n\n> "The best infrastructure is the infrastructure you never have to think about."\n\nToday, platforms like Vercel take this philosophy to its logical extreme — shipping a Next.js app becomes as simple as a git push. Your API routes become Lambda functions, your static assets hit a CDN, and MongoDB Atlas handles your data layer without a single SSH session.\n\n## What This Means for Node.js Developers\n\nThe combination of Express + MongoDB Atlas + Vercel represents a genuinely new primitive. You write code. You push code. Your app scales.\n\n- Zero server provisioning\n- Automatic TLS/SSL\n- Global edge distribution\n- Pay-per-request pricing`,
    createdAt: new Date('2024-10-12'),
  },
  {
    _id: 'p2', title: 'Typography Is Not Decoration — It\'s Architecture',
    category: 'design', author: 'Sam Rivera', excerpt: 'Every typographic decision is a structural decision. Learn to read type the way an engineer reads load-bearing walls.',
    content: `## Type as Infrastructure\n\nA building without structural integrity collapses. A page without typographic integrity fragments. The parallel is more than metaphor.\n\nWhen you choose **Playfair Display** over Inter for a headline, you're not making an aesthetic choice — you're making an *argumentative* one. Serif faces carry connotations of permanence, authority, editorial weight. Sans-serifs signal clarity, modernity, function.\n\n> "Typography is the detail and the presentation of a story." — Cyrus Highsmith\n\n## The Scale Problem\n\nMost designers think about type at one size. Expert typographers think about type as a *system*. A typeface that works beautifully at 72px may disintegrate at 14px. Optical sizing exists precisely because our eyes perceive letterforms differently at different scales.\n\n- Display weight: Use for impact, not for reading\n- Text weight: Optimized for 14–18px ranges\n- Caption weight: Often needs increased tracking`,
    createdAt: new Date('2024-10-08'),
  },
  {
    _id: 'p3', title: 'MongoDB Atlas and the Death of the DBA',
    category: 'technology', author: 'Priya Nanda', excerpt: 'Cloud-native databases have automated away the operational layer. What does this mean for the future of database administration?',
    content: `## A Profession Under Pressure\n\nDatabase administrators once commanded salaries that reflected the irreplaceable nature of their craft. Backups, replication, failover, indexing strategy — these were dark arts practiced by specialists.\n\nMongoDB Atlas has automated most of it.\n\n**Auto-scaling**, **built-in backups**, **point-in-time recovery**, **performance advisor** — Atlas ships all of this out of the box. What once required years of Oracle certification now requires a credit card and a browser.\n\n> This isn't the death of expertise. It's the elevation of it.\n\n## What Remains\n\nSchema design still matters enormously. Query optimization is still a craft. Understanding indexes — when to create them, when they hurt as much as they help — remains genuinely complex.\n\nThe DBA isn't dead. The *operational* DBA is becoming rare. The *architectural* DBA is more important than ever.`,
    createdAt: new Date('2024-09-28'),
  },
  {
    _id: 'p4', title: 'The Economics of Open Source',
    category: 'business', author: 'James Okafor', excerpt: 'Free software powers trillion-dollar companies. The business models that make this sustainable — and the ones that don\'t.',
    content: `## Free at What Cost?\n\nLinux runs on 96.3% of the world's top one million web servers. It costs nothing to use. Red Hat, built on top of Linux, was acquired by IBM for **$34 billion**.\n\nThe paradox of open source economics is that the code is free, but everything *around* the code — support, certification, managed hosting, enterprise features — is extraordinarily valuable.\n\n> "Nobody ever got fired for buying Red Hat."\n\n## The Four Models That Work\n\n- **Open Core**: Free base, paid enterprise features (GitLab, Elastic)\n- **Managed Hosting**: Free to self-host, paid cloud (MongoDB Atlas, Supabase)\n- **Support Contracts**: Free software, expensive expertise (Red Hat, Canonical)\n- **Dual Licensing**: Free for OSS, commercial license for proprietary use`,
    createdAt: new Date('2024-09-15'),
  },
  {
    _id: 'p5', title: 'What Coffee Shops Know About Third Places',
    category: 'culture', author: 'Yui Tanaka', excerpt: 'Ray Oldenburg coined the term "third place" in 1989. Starbucks built a $100B empire on misunderstanding it.',
    content: `## The Three-Place Theory\n\nRay Oldenburg's 1989 book *The Great Good Place* described a sociology of gathering. First place: home. Second place: work. Third place: the informal public gathering space — the café, the pub, the barbershop — where community actually forms.\n\nThe third place has specific properties that make it work:\n\n- **Free or inexpensive** to access\n- Highly **accessible** (walkable, no reservations)\n- **Regulars** give it character\n- **Conversation** is the primary activity\n- The atmosphere is **playful** rather than anxious\n\n> "The character of a third place is determined above all by its regular clientele."\n\n## The Laptop Problem\n\nModern coffee shops face a contradiction. They want the third-place energy — the buzz, the community feel — but their revenue model depends on throughput. A customer nursing an americano for four hours while on Zoom calls is neither profitable nor communal.`,
    createdAt: new Date('2024-09-02'),
  },
  {
    _id: 'p6', title: 'Designing APIs Nobody Hates',
    category: 'design', author: 'Elena Marsh', excerpt: 'REST is not a specification — it\'s a religion with many denominations. Here\'s how to write HTTP APIs that developers actually enjoy.',
    content: `## The Principle of Least Surprise\n\nGood API design is boring. If a developer can predict what your endpoint returns before reading the documentation, you've done your job.\n\nThe HTTP verbs aren't suggestions:\n\n- **GET** should never mutate state\n- **POST** creates resources\n- **PATCH** partially updates\n- **DELETE** removes\n- **PUT** replaces entirely\n\n> "A well-designed API is one that you can use incorrectly only by ignoring the documentation entirely."\n\n## Error Messages Are UX\n\nMost APIs fail their users at the error layer. \`{"error": "Something went wrong"}\` is not a helpful error message. Include:\n\n- **Status code** that accurately reflects the failure type\n- **Machine-readable** error code for programmatic handling\n- **Human-readable** message for debugging\n- **Request ID** for tracing in logs`,
    createdAt: new Date('2024-08-20'),
  },
];

let currentFilter  = 'all';
let deleteTargetId = null;
let editingId      = null;
let previewMode    = false;

// ── View Routing ──────────────────────────────────
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`view-${name}`).classList.remove('hidden');

  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.nav-tab[data-view="${name}"]`);
  if (tab) tab.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'grid') renderGrid();
}

// ── Render Grid ───────────────────────────────────
function renderGrid(data) {
  const grid = document.getElementById('posts-grid');
  const empty = document.getElementById('empty-state');
  const list  = data || getFiltered();

  document.getElementById('stat-posts').textContent = posts.length;

  if (!list.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = list.map((p, i) => `
    <div class="post-card" style="animation-delay:${i * 0.05}s">
      <div class="card-color-bar" style="background:${CAT_COLORS[p.category] || '#888'}"></div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-cat" style="color:${CAT_COLORS[p.category]};border-color:${CAT_COLORS[p.category]}40">${p.category}</span>
          <span class="card-date">${formatDate(p.createdAt)}</span>
        </div>
        <h3 class="card-title" onclick="openPost('${p._id}')">${escHtml(p.title)}</h3>
        <p class="card-excerpt">${escHtml(p.excerpt || p.content.replace(/[#*>`-]/g, '').slice(0, 160) + '…')}</p>
        <div class="card-footer">
          <div class="card-author">
            <div class="author-avatar" style="background:${CAT_COLORS[p.category] || '#888'}">${p.author.charAt(0)}</div>
            <span class="author-name">${escHtml(p.author)}</span>
          </div>
          <div class="card-btns">
            <button class="card-btn edt" onclick="openEditor('${p._id}')" title="Edit">✎</button>
            <button class="card-btn del" onclick="openDeleteModal('${p._id}')" title="Delete">✕</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function getFiltered() {
  return posts.filter(p => currentFilter === 'all' || p.category === currentFilter);
}

// ── Filtering & Search ────────────────────────────
function filterPosts(btn, cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('search-input').value = '';
  renderGrid();
}

function searchPosts() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  if (!q) { renderGrid(); return; }
  const results = posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderGrid(results);
}

// ── Single Post View ──────────────────────────────
function openPost(id) {
  const p = posts.find(x => x._id === id);
  if (!p) return;

  const color = CAT_COLORS[p.category] || '#888';
  const html  = parseMarkdown(p.content);

  document.getElementById('post-full-content').innerHTML = `
    <div class="pf-kicker">
      <span style="color:${color}">${p.category}</span>
      <span>·</span>
      <span>${formatDate(p.createdAt)}</span>
    </div>
    <h1 class="pf-title">${escHtml(p.title)}</h1>
    <div class="pf-byline">
      <div class="pf-avatar" style="background:${color}">${p.author.charAt(0)}</div>
      <div>
        <div class="pf-author-name">${escHtml(p.author)}</div>
        <div class="pf-author-date">${formatDate(p.createdAt, true)}</div>
      </div>
    </div>
    <div class="pf-content">${html}</div>
  `;

  document.getElementById('post-actions-top').innerHTML = `
    <button class="back-btn" onclick="openEditor('${p._id}')">✎ Edit</button>
    <button class="back-btn" style="border-color:var(--delete);color:var(--delete)" onclick="openDeleteModal('${p._id}')">✕ Delete</button>
  `;

  showView('post');
}

// ── Editor ────────────────────────────────────────
function openEditor(id) {
  editingId = id || null;
  clearEditor();

  if (id) {
    const p = posts.find(x => x._id === id);
    if (!p) return;
    document.getElementById('editor-heading').textContent = 'Edit Post';
    document.getElementById('submit-btn').textContent     = 'Update Post';
    document.getElementById('f-title').value    = p.title;
    document.getElementById('f-category').value = p.category;
    document.getElementById('f-author').value   = p.author;
    document.getElementById('f-excerpt').value  = p.excerpt || '';
    document.getElementById('f-content').value  = p.content;
    updateCharCount();
  } else {
    document.getElementById('editor-heading').textContent = 'New Post';
    document.getElementById('submit-btn').textContent     = 'Publish Post';
  }

  showView('editor');
}

function clearEditor() {
  ['f-title','f-excerpt','f-content'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const cat = document.getElementById('f-category');
  if (cat) cat.value = 'technology';
  const auth = document.getElementById('f-author');
  if (auth) auth.value = 'Anonymous';
  updateCharCount();
  if (previewMode) togglePreview();
}

function submitPost(e) {
  e.preventDefault();

  const title    = document.getElementById('f-title').value.trim();
  const category = document.getElementById('f-category').value;
  const author   = document.getElementById('f-author').value.trim() || 'Anonymous';
  const excerpt  = document.getElementById('f-excerpt').value.trim();
  const content  = document.getElementById('f-content').value.trim();

  if (!title || !content) {
    showToast('Title and content are required.');
    return;
  }

  if (editingId) {
    // PATCH simulation
    const idx = posts.findIndex(p => p._id === editingId);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], title, category, author, excerpt, content };
      showToast('✔ Post updated — PATCH /api/posts/' + editingId);
    }
  } else {
    // POST simulation
    const newPost = {
      _id:       'p' + Date.now(),
      title, category, author, excerpt, content,
      createdAt: new Date(),
    };
    posts.unshift(newPost);
    showToast('✔ Post published — POST /api/posts');
  }

  editingId = null;
  showView('grid');
}

// ── Markdown Toolbar ──────────────────────────────
function insertMd(before, after) {
  const ta    = document.getElementById('f-content');
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const sel   = ta.value.substring(start, end);
  ta.value = ta.value.substring(0, start) + before + sel + after + ta.value.substring(end);
  ta.focus();
  ta.setSelectionRange(start + before.length, start + before.length + sel.length);
  updateCharCount();
  if (previewMode) updatePreview();
}

function togglePreview() {
  previewMode = !previewMode;
  const ta = document.getElementById('f-content');
  const pv = document.getElementById('f-preview');
  const btn = document.querySelector('.preview-toggle');
  if (previewMode) {
    updatePreview();
    ta.classList.add('hidden');
    pv.classList.remove('hidden');
    btn.style.background = 'rgba(201,169,110,0.15)';
    btn.textContent = 'Edit';
  } else {
    ta.classList.remove('hidden');
    pv.classList.add('hidden');
    btn.style.background = '';
    btn.textContent = 'Preview';
  }
}

function updatePreview() {
  const content = document.getElementById('f-content').value;
  document.getElementById('f-preview').innerHTML = parseMarkdown(content);
}

// Simple Markdown → HTML parser
function parseMarkdown(md) {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .split(/\n\n+/)
    .map(block => {
      if (/^<(h2|ul|blockquote)/.test(block.trim())) return block;
      return `<p>${block.trim()}</p>`;
    })
    .join('\n');
}

// ── Char Counter ──────────────────────────────────
document.addEventListener('input', e => {
  if (e.target.id === 'f-content') {
    updateCharCount();
    if (previewMode) updatePreview();
  }
});

function updateCharCount() {
  const val = document.getElementById('f-content')?.value || '';
  const words = val.trim() ? val.trim().split(/\s+/).length : 0;
  const chars = val.length;
  document.getElementById('char-count').textContent = `${chars} characters · ${words} words`;
}

// ── Delete Flow ───────────────────────────────────
function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById('delete-modal').classList.remove('hidden');
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('delete-modal').classList.add('hidden');
}

function confirmDelete() {
  if (!deleteTargetId) return;
  const id  = deleteTargetId;
  const idx = posts.findIndex(p => p._id === id);
  if (idx !== -1) posts.splice(idx, 1);
  closeDeleteModal();
  showToast('✔ Post deleted — DELETE /api/posts/' + id);
  showView('grid');
}

// Close modal on overlay click
document.getElementById('delete-modal').addEventListener('click', function(e) {
  if (e.target === this) closeDeleteModal();
});

// ── Theme Toggle ──────────────────────────────────
function toggleTheme() {
  const html  = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isDark ? '☀' : '☽';
  showToast(isDark ? '☀ Light mode' : '☽ Dark mode');
}

// ── Live API Tester ───────────────────────────────
function runApiTest() {
  const method = document.getElementById('tester-method').value;
  const url    = document.getElementById('tester-url').value;
  const body   = document.getElementById('tester-body').value;
  const output = document.getElementById('tr-output');
  const status = document.getElementById('tr-status');

  output.textContent = 'Simulating request…';
  status.textContent = '';
  status.className   = 'tr-status';

  setTimeout(() => {
    let code = 200;
    let data;

    if (method === 'GET') {
      data = posts.map(p => ({ _id: p._id, title: p.title, category: p.category, author: p.author, createdAt: p.createdAt }));
    } else if (method === 'POST') {
      try {
        const b = JSON.parse(body || '{}');
        if (!b.title || !b.content) { code = 400; data = { error: 'title and content are required' }; }
        else { code = 201; data = { _id: 'sim_' + Date.now(), ...b, createdAt: new Date() }; }
      } catch { code = 400; data = { error: 'Invalid JSON body' }; }
    } else if (method === 'PATCH') {
      try {
        const b = JSON.parse(body || '{}');
        code = 200; data = { ...posts[0], ...b, _id: posts[0]?._id || 'sim_id' };
      } catch { code = 400; data = { error: 'Invalid JSON body' }; }
    } else if (method === 'DELETE') {
      code = 200; data = { deleted: 'sim_' + Date.now() };
    }

    const isOk = code < 400;
    status.textContent = code + (isOk ? ' OK' : ' Error');
    status.classList.add(isOk ? 'ok' : 'err');
    output.textContent = JSON.stringify(data, null, 2);
  }, 600);
}

// ── Copy Code ─────────────────────────────────────
function copyCode(btn) {
  const pre = btn.closest('.api-code-card,.acc-header')?.parentElement?.querySelector('pre') ||
              btn.closest('.api-code-card')?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1800);
    showToast('Code copied to clipboard');
  }).catch(() => showToast('Copy failed'));
}

// ── Toast ─────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ── Helpers ───────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function formatDate(d, long = false) {
  const date = new Date(d);
  if (long) return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Navbar scroll effect ──────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.borderBottomColor = window.scrollY > 10 ? 'var(--border2)' : 'var(--border)';
});

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  console.log('%c✦ Inkwell Blog Platform', 'color:#c9a96e;font-family:serif;font-size:18px;font-weight:bold');
  console.log('%cFull-stack: Express + MongoDB Atlas + Vercel', 'color:#5c5550;font-size:12px');
});
