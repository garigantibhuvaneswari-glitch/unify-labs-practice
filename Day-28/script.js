// ─────────────────────────────────────────────────
//   script.js — Atlas Migrate Interactive Features
// ─────────────────────────────────────────────────

// ── Password Toggle ───────────────────────────────
const FAKE_PW = 'xK9#mP2$vQnL';
let pwVisible = false;

function togglePassword() {
  pwVisible = !pwVisible;
  const display = document.getElementById('pw-display');
  const btn = document.querySelector('.toggle-pw');
  if (pwVisible) {
    display.textContent = FAKE_PW;
    btn.textContent = 'Hide';
    display.style.color = '#00d68f';
  } else {
    display.textContent = '••••••••••••';
    btn.textContent = 'Show';
    display.style.color = '';
  }
}

// ── SRV String Builder ────────────────────────────
function buildSRV() {
  const user = document.getElementById('b-user').value.trim() || '<em>username</em>';
  const pass = document.getElementById('b-pass').value.trim() || '<em>password</em>';
  const host = document.getElementById('b-host').value.trim() || '<em>cluster</em>';
  const db   = document.getElementById('b-db').value.trim()   || '<em>database</em>';

  const isPlaceholder = (v) => v.startsWith('<em>');

  const encodedPass = !isPlaceholder(pass) ? encodeURIComponent(pass) : pass;
  const encodedUser = !isPlaceholder(user) ? encodeURIComponent(user) : user;

  const srv = `mongodb+srv://${encodedUser}:${encodedPass}@${host}/${db}?retryWrites=true&amp;w=majority`;
  document.getElementById('srv-string').innerHTML = srv;
}

// ── Copy SRV String ───────────────────────────────
function copySRV() {
  const el = document.getElementById('srv-string');
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => showToast('SRV string copied!')).catch(() => {
    fallbackCopy(text);
  });
}

// ── Copy .env block ───────────────────────────────
function copyEnv() {
  const el = document.getElementById('env-code');
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => showToast('.env copied!')).catch(() => {
    fallbackCopy(text);
  });
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Copied!');
}

// ── Toast Notification ────────────────────────────
let toastTimer = null;
function showToast(msg = 'Copied to clipboard!') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── Terminal Simulator ────────────────────────────
const termLines = [
  { text: '$ node server.js', delay: 0,    color: '#00d68f' },
  { text: '',                  delay: 300,  color: '#7fff8c' },
  { text: '  Connecting to MongoDB Atlas...', delay: 600,  color: '#4a5578' },
  { text: '',                  delay: 900,  color: '' },
  { text: '  ✔ Connected to MongoDB Atlas', delay: 1400, color: '#00d68f' },
  { text: '  ✔ Server running on port 3000', delay: 1700, color: '#00d68f' },
  { text: '',                  delay: 2100, color: '' },
  { text: '  GET /products → 200 OK  [ 42ms ]', delay: 2500, color: '#82aaff' },
  { text: '  ↳ Fetched 3 documents from Atlas', delay: 2800, color: '#4a5578' },
];

let simRunning = false;

function simulateRun() {
  if (simRunning) return;
  simRunning = true;
  const output = document.getElementById('term-output');
  const btn    = document.querySelector('.run-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Running...';
  output.innerHTML = '';

  termLines.forEach(({ text, delay, color }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.textContent = text;
      line.style.color = color || '#7fff8c';
      line.style.opacity = '0';
      line.style.transition = 'opacity 0.3s';
      output.appendChild(line);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { line.style.opacity = '1'; });
      });
      output.scrollTop = output.scrollHeight;
    }, delay);
  });

  const lastDelay = termLines[termLines.length - 1].delay + 600;
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = '▶ Simulate';
    simRunning = false;
  }, lastDelay);
}

// ── Checklist ─────────────────────────────────────
const TOTAL_ITEMS = 8;

function toggleCheck(el) {
  el.classList.toggle('checked');
  const box = el.querySelector('.cl-box');

  if (el.classList.contains('checked')) {
    box.textContent = '✔';
    box.style.color = '#00d68f';
  } else {
    box.textContent = '□';
    box.style.color = '';
  }

  updateProgress();
}

function updateProgress() {
  const checked = document.querySelectorAll('.cl-item.checked').length;
  const pct = (checked / TOTAL_ITEMS) * 100;
  document.getElementById('cl-fill').style.width = pct + '%';
  document.getElementById('cl-count').textContent = `${checked} / ${TOTAL_ITEMS} completed`;

  if (checked === TOTAL_ITEMS) {
    showToast('🎉 Migration complete!');
  }
}

// ── Scroll Reveal ─────────────────────────────────
const cards = document.querySelectorAll('.step-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.2s`;
  revealObserver.observe(card);
});

// ── Init ──────────────────────────────────────────
console.log('%c◈ AtlasMigrate Loaded', 'color:#00d68f;font-weight:bold;font-size:14px;');
console.log('%cMongoDB Atlas · M0 Free Tier · Node.js Driver', 'color:#4a5578;');