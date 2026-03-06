/* ══════════════════════════════════════════════════
   script.js — VAULT Storefront
   Features: Cart (localStorage), Search, Filter,
             Sort, Checkout, Order History, Fly-anim
══════════════════════════════════════════════════ */

'use strict';

// ── Product Catalog Data ─────────────────────────
const PRODUCTS = [
  { _id:'pr01', name:'Wireless ANC Headphones',  price:2499, stock:45, category:'electronics',  rating:4.8, reviews:312, emoji:'🎧' },
  { _id:'pr02', name:'Mechanical Keyboard TKL',  price:3299, stock:28, category:'electronics',  rating:4.6, reviews:189, emoji:'⌨️' },
  { _id:'pr03', name:'Ultra-Wide Monitor 34"',   price:28999,stock:12, category:'electronics',  rating:4.9, reviews:87,  emoji:'🖥️' },
  { _id:'pr04', name:'Smart Watch Pro S',        price:8499, stock:60, category:'electronics',  rating:4.5, reviews:440, emoji:'⌚' },
  { _id:'pr05', name:'USB-C Hub 7-in-1',         price:1299, stock:100,category:'electronics',  rating:4.3, reviews:620, emoji:'🔌' },
  { _id:'pr06', name:'Minimal Linen Tee',        price:899,  stock:200,category:'apparel',      rating:4.4, reviews:230, emoji:'👕' },
  { _id:'pr07', name:'Relaxed Cargo Pants',      price:1799, stock:80, category:'apparel',      rating:4.6, reviews:155, emoji:'👖' },
  { _id:'pr08', name:'Merino Wool Sweater',      price:2999, stock:35, category:'apparel',      rating:4.7, reviews:98,  emoji:'🧥' },
  { _id:'pr09', name:'Canvas Tote Bag',          price:499,  stock:300,category:'apparel',      rating:4.2, reviews:870, emoji:'👜' },
  { _id:'pr10', name:'Leather Bifold Wallet',    price:1499, stock:90, category:'accessories',  rating:4.5, reviews:310, emoji:'👛' },
  { _id:'pr11', name:'Titanium Sunglasses',      price:3999, stock:25, category:'accessories',  rating:4.8, reviews:67,  emoji:'🕶️' },
  { _id:'pr12', name:'Ceramic Desk Lamp',        price:2199, stock:40, category:'home',         rating:4.6, reviews:143, emoji:'💡' },
  { _id:'pr13', name:'Bamboo Cutting Board Set', price:899,  stock:120,category:'home',         rating:4.4, reviews:289, emoji:'🍳' },
  { _id:'pr14', name:'Linen Throw Pillow Cover', price:649,  stock:150,category:'home',         rating:4.3, reviews:412, emoji:'🛋️' },
  { _id:'pr15', name:'Pour-Over Coffee Kit',     price:1899, stock:55, category:'home',         rating:4.9, reviews:220, emoji:'☕' },
  { _id:'pr16', name:'Marble Coaster Set (4)',   price:1199, stock:70, category:'home',         rating:4.5, reviews:178, emoji:'🪨' },
  { _id:'pr17', name:'Braided Leather Bracelet', price:799,  stock:200,category:'accessories',  rating:4.1, reviews:390, emoji:'💎' },
  { _id:'pr18', name:'Minimalist Watch Strap',   price:599,  stock:180,category:'accessories',  rating:4.4, reviews:510, emoji:'⌚' },
  { _id:'pr19', name:'Noise-Cancel Earbuds',     price:4999, stock:32, category:'electronics',  rating:4.7, reviews:281, emoji:'🎵' },
  { _id:'pr20', name:'Portable SSD 1TB',         price:5499, stock:18, category:'electronics',  rating:4.8, reviews:167, emoji:'💾' },
  { _id:'pr21', name:'Scented Soy Candle',       price:699,  stock:250,category:'home',         rating:4.6, reviews:930, emoji:'🕯️' },
  { _id:'pr22', name:'Linen Button-Up Shirt',    price:1499, stock:65, category:'apparel',      rating:4.5, reviews:204, emoji:'👔' },
  { _id:'pr23', name:'Pebble Grain Card Case',   price:1099, stock:110,category:'accessories',  rating:4.3, reviews:345, emoji:'🃏' },
  { _id:'pr24', name:'Standing Desk Organiser',  price:2499, stock:45, category:'home',         rating:4.7, reviews:123, emoji:'🗂️' },
];

// ── State ────────────────────────────────────────
let cart = loadCart();
let filteredProducts = [...PRODUCTS];
let activeCategory = 'all';
let searchQuery = '';
let activeSort = 'default';
let pendingOrderData = null;

// ── Init ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  updateCartUI();
  console.log('%c▲ VAULT Storefront', 'color:#e8ff00;font-family:monospace;font-size:16px;font-weight:bold');
  console.log('%cMongoDB Atlas + Vercel · Mobile-First', 'color:#444;font-size:12px');
});

// ══════════════════════════════════════════════════
// VIEW ROUTING
// ══════════════════════════════════════════════════
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById(`view-${name}`).classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-btn[data-view="${name}"]`);
  if (btn) btn.classList.add('active');
  closeMobileNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'orders') renderOrderHistory();
}

function scrollToCatalog() {
  document.getElementById('catalog-anchor').scrollIntoView({ behavior: 'smooth' });
}

// ══════════════════════════════════════════════════
// MOBILE NAV
// ══════════════════════════════════════════════════
function toggleMobileNav() {
  const links = document.getElementById('nav-links');
  const ham   = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ══════════════════════════════════════════════════
// PRODUCT GRID
// ══════════════════════════════════════════════════
function renderGrid() {
  const grid  = document.getElementById('product-grid');
  const empty = document.getElementById('empty-results');
  const count = document.getElementById('catalog-count');

  applyFiltersAndSort();

  count.textContent = `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''}`;

  if (!filteredProducts.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = filteredProducts.map((p, i) => `
    <div class="product-card" id="card-${p._id}" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
      <div class="pc-image">
        <span class="pc-cat-badge">${p.category}</span>
        ${p.emoji}
      </div>
      <div class="pc-body">
        <div class="pc-name">${escHtml(p.name)}</div>
        <div>
          <span class="pc-stars">${renderStars(p.rating)}</span>
          <span class="pc-rating-count">(${p.reviews})</span>
        </div>
        <div class="pc-footer">
          <div>
            <div class="pc-price">₹${p.price.toLocaleString('en-IN')}</div>
            <div class="pc-stock">${p.stock > 20 ? 'In Stock' : p.stock > 0 ? `Only ${p.stock} left` : 'Out of Stock'}</div>
          </div>
          <button
            class="btn-add"
            onclick="addToCart('${p._id}', event)"
            ${p.stock === 0 ? 'disabled' : ''}
          >${p.stock === 0 ? 'Sold Out' : 'Add'}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ── Filtering & Sorting ───────────────────────────
function applyFiltersAndSort() {
  filteredProducts = PRODUCTS.filter(p => {
    const catOk   = activeCategory === 'all' || p.category === activeCategory;
    const searchOk = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.category.includes(searchQuery);
    return catOk && searchOk;
  });

  switch (activeSort) {
    case 'price-asc':  filteredProducts.sort((a,b) => a.price - b.price);           break;
    case 'price-desc': filteredProducts.sort((a,b) => b.price - a.price);           break;
    case 'name':       filteredProducts.sort((a,b) => a.name.localeCompare(b.name)); break;
  }
}

function filterCat(btn, cat) {
  activeCategory = cat;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

function onSearch(val) {
  searchQuery = val.toLowerCase().trim();
  renderGrid();
}

function sortProducts() {
  activeSort = document.getElementById('sort-select').value;
  renderGrid();
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery    = '';
  activeSort     = 'default';
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-chip[data-cat="all"]').classList.add('active');
  document.getElementById('sort-select').value = 'default';
  const ns = document.getElementById('nav-search');
  if (ns) ns.value = '';
  renderGrid();
}

// ══════════════════════════════════════════════════
// CART
// ══════════════════════════════════════════════════
function addToCart(productId, event) {
  const product = PRODUCTS.find(p => p._id === productId);
  if (!product || product.stock === 0) return;

  const existing = cart.find(i => i._id === productId);
  if (existing) {
    existing.qty = Math.min(existing.qty + 1, product.stock);
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  flyToCart(event);

  // Card pulse animation
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    card.classList.add('adding');
    setTimeout(() => card.classList.remove('adding'), 500);
  }

  showToast(`${product.emoji} ${product.name.split(' ').slice(0,2).join(' ')} added to bag`);
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = total;
  if (total > 0) { badge.classList.add('pop'); setTimeout(() => badge.classList.remove('pop'), 400); }
  document.getElementById('cart-count-label').textContent = `(${total})`;
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const footer    = document.getElementById('cart-footer');

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="ce-icon">◻</div>
        <p>Your bag is empty.<br/>Start adding products!</p>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="ci-${item._id}">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${escHtml(item.name)}</div>
        <div class="ci-price">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="ci-controls">
          <button class="ci-qty-btn" onclick="changeQty('${item._id}', -1)">−</button>
          <span class="ci-qty">${item.qty}</span>
          <button class="ci-qty-btn" onclick="changeQty('${item._id}', 1)">+</button>
          <button class="ci-remove" onclick="removeFromCart('${item._id}')">✕</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= 2499 ? 0 : 99;
  const total     = subtotal + shipping;

  footer.innerHTML = `
    <div class="cf-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
    <div class="cf-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--green)">Free</span>' : '₹' + shipping}</span></div>
    <div class="cf-total"><span>TOTAL</span><span class="cf-total-price">₹${total.toLocaleString('en-IN')}</span></div>
    <button class="btn-checkout" onclick="goToCheckout()" ${!cart.length ? 'disabled' : ''}>CHECKOUT →</button>
  `;
}

function changeQty(id, delta) {
  const item    = cart.find(i => i._id === id);
  const product = PRODUCTS.find(p => p._id === id);
  if (!item) return;

  item.qty = Math.max(1, Math.min(item.qty + delta, product?.stock || 99));
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  const el = document.getElementById(`ci-${id}`);
  if (el) {
    el.style.transition = 'opacity 0.2s, transform 0.2s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => {
      cart = cart.filter(i => i._id !== id);
      saveCart();
      updateCartUI();
    }, 200);
  } else {
    cart = cart.filter(i => i._id !== id);
    saveCart();
    updateCartUI();
  }
}

function toggleCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const isOpen  = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

// ── LocalStorage ──────────────────────────────────
function saveCart() {
  try { localStorage.setItem('vault_cart', JSON.stringify(cart)); } catch(e) {}
}
function loadCart() {
  try {
    const raw = localStorage.getItem('vault_cart');
    return raw ? JSON.parse(raw) : [];
  } catch(e) { return []; }
}

// ── Fly-to-cart animation ─────────────────────────
function flyToCart(event) {
  if (!event) return;
  const dot      = document.getElementById('fly-dot');
  const cartBtn  = document.querySelector('.cart-btn');
  const cartRect = cartBtn.getBoundingClientRect();

  const startX = event.clientX;
  const startY = event.clientY;
  const endX   = cartRect.left + cartRect.width / 2;
  const endY   = cartRect.top  + cartRect.height / 2;

  dot.style.transition = 'none';
  dot.style.left       = startX + 'px';
  dot.style.top        = startY + 'px';
  dot.style.opacity    = '1';
  dot.style.transform  = 'scale(1)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dot.style.transition = 'left 0.55s cubic-bezier(0.4,0,0.2,1), top 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.2s 0.4s, transform 0.55s ease';
      dot.style.left       = endX + 'px';
      dot.style.top        = endY + 'px';
      dot.style.opacity    = '0';
      dot.style.transform  = 'scale(0.3)';
    });
  });

  setTimeout(() => {
    dot.style.transition = 'none';
    dot.style.opacity    = '0';
  }, 650);
}

// ══════════════════════════════════════════════════
// CHECKOUT
// ══════════════════════════════════════════════════
function goToCheckout() {
  if (!cart.length) return;
  closeCart();
  renderCheckoutSummary();
  showView('checkout');
}

function renderCheckoutSummary() {
  const itemsEl  = document.getElementById('order-summary-items');
  const totalsEl = document.getElementById('order-summary-totals');

  itemsEl.innerHTML = cart.map(item => `
    <div class="os-item">
      <span class="os-name">${item.emoji} ${escHtml(item.name)}</span>
      <span class="os-qty">×${item.qty}</span>
      <span class="os-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 2499 ? 0 : 99;
  const total    = subtotal + shipping;

  document.getElementById('order-total-inline').textContent = `₹${total.toLocaleString('en-IN')}`;

  totalsEl.innerHTML = `
    <div class="os-totals">
      <div class="os-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
      <div class="os-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '₹' + shipping}</span></div>
      <div class="os-grand"><span>TOTAL</span><span class="os-grand-price">₹${total.toLocaleString('en-IN')}</span></div>
    </div>
  `;
}

function selectPayment(radio) {
  document.querySelectorAll('.payment-opt').forEach(el => el.classList.remove('active'));
  radio.closest('.payment-opt').classList.add('active');

  const cardFields = document.getElementById('card-fields');
  if (radio.value === 'card') cardFields.classList.remove('hidden');
  else cardFields.classList.add('hidden');
}

// ── Card input formatters ─────────────────────────
function formatCard(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  input.value = v;
}

// ── Form Validation & Submit ──────────────────────
function submitOrder(e) {
  e.preventDefault();
  if (!validateCheckout()) return;

  const fname   = document.getElementById('f-fname').value.trim();
  const lname   = document.getElementById('f-lname').value.trim();
  const email   = document.getElementById('f-email').value.trim().toLowerCase();
  const phone   = document.getElementById('f-phone').value.trim();
  const street  = document.getElementById('f-street').value.trim();
  const apt     = document.getElementById('f-apt').value.trim();
  const city    = document.getElementById('f-city').value.trim();
  const state   = document.getElementById('f-state').value.trim();
  const pin     = document.getElementById('f-pin').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 2499 ? 0 : 99;
  const total    = subtotal + shipping;

  const address = [street, apt, city, state, pin].filter(Boolean).join(', ');

  // Sanitize — strip $ and . prefixed keys (NoSQL injection prevention, mirrors server-side)
  const sanitize = (str) => String(str).replace(/[${}]/g, '');

  const orderPayload = {
    customer: {
      name:    sanitize(`${fname} ${lname}`),
      email:   sanitize(email),
      phone:   sanitize(phone),
      address: sanitize(address),
    },
    items: cart.map(item => ({
      productId: item._id,
      name:      item.name,
      price:     item.price,
      qty:       item.qty,
    })),
    total,
    payment,
    status:    'pending',
    createdAt: new Date().toISOString(),
  };

  // Simulate POST /api/orders
  const btn = document.getElementById('order-btn');
  btn.textContent = 'Placing Order…';
  btn.disabled = true;

  setTimeout(() => {
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    orderPayload._id = orderId;

    // Save to localStorage order history
    saveOrderToHistory(orderPayload);

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();

    // Show confirmation
    showConfirmation(orderPayload);

    btn.innerHTML = '<span id="order-btn-text">Place Order</span><span class="order-total-inline" id="order-total-inline"></span>';
    btn.disabled = false;
  }, 1200);
}

function validateCheckout() {
  let valid = true;
  const rules = [
    { id:'f-fname',  err:'err-fname',  msg:'First name required' },
    { id:'f-lname',  err:'err-lname',  msg:'Last name required' },
    { id:'f-email',  err:'err-email',  msg:'Valid email required', extra: v => !v.includes('@') },
    { id:'f-street', err:'err-street', msg:'Street address required' },
    { id:'f-city',   err:'err-city',   msg:'City required' },
    { id:'f-pin',    err:'err-pin',    msg:'PIN code required', extra: v => !/^\d{6}$/.test(v) },
  ];

  rules.forEach(rule => {
    const input = document.getElementById(rule.id);
    const errEl = document.getElementById(rule.err);
    const val   = input.value.trim();
    const failed = !val || (rule.extra && rule.extra(val));
    input.classList.toggle('error', failed);
    errEl.textContent = failed ? rule.msg : '';
    if (failed) valid = false;
  });

  return valid;
}

// ── Confirmation View ─────────────────────────────
function showConfirmation(order) {
  document.getElementById('confirm-email').textContent = order.customer.email;
  document.getElementById('confirm-id').textContent    = order._id;

  document.getElementById('confirm-items').innerHTML = order.items.map(item => {
    const p = PRODUCTS.find(x => x._id === item.productId);
    return `<div class="os-item">
      <span class="os-name">${p ? p.emoji : '📦'} ${escHtml(item.name)}</span>
      <span class="os-qty">×${item.qty}</span>
      <span class="os-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
    </div>`;
  }).join('');

  document.getElementById('confirm-payload').textContent =
    JSON.stringify({
      endpoint: 'POST /api/orders',
      status:   '201 Created',
      payload:  order,
    }, null, 2);

  showView('confirmation');
}

function continueShopping() {
  showView('shop');
  renderGrid();
}

// ── Order History ─────────────────────────────────
function saveOrderToHistory(order) {
  try {
    const history = JSON.parse(localStorage.getItem('vault_orders') || '[]');
    history.unshift(order);
    localStorage.setItem('vault_orders', JSON.stringify(history.slice(0, 20)));
  } catch(e) {}
}

function renderOrderHistory() {
  const container = document.getElementById('orders-list');
  let history = [];
  try { history = JSON.parse(localStorage.getItem('vault_orders') || '[]'); } catch(e) {}

  if (!history.length) {
    container.innerHTML = '<div class="no-orders">No orders yet. Start shopping!</div>';
    return;
  }

  container.innerHTML = history.map(order => `
    <div class="order-history-card">
      <div class="ohc-head">
        <div>
          <div class="ohc-id">Order #${order._id}</div>
          <div class="ohc-date">${new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div>
        </div>
        <span class="ohc-status">${order.status}</span>
      </div>
      <div class="ohc-customer">${escHtml(order.customer.name)}</div>
      <div class="ohc-email">${escHtml(order.customer.email)}</div>
      <div class="ohc-items">${order.items.map(i => `${i.name} ×${i.qty}`).join(' · ')}</div>
      <div class="ohc-total">₹${order.total.toLocaleString('en-IN')}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════
function copyCode(btn) {
  const pre = btn.closest('.code-card,.cc-head')?.parentElement?.querySelector('pre') ||
              btn.closest('.code-card')?.querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText)
    .then(() => { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 1800); })
    .catch(() => showToast('Copy failed'));
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 10 ? 'rgba(10,10,10,0.95)' : '';
  nav.style.backdropFilter = window.scrollY > 10 ? 'blur(10px)' : '';
});
