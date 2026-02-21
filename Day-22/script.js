// Day 22 Logic Practice
console.log('Lab Session 22 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20";

/* ================= SAFE STORAGE ================= */

function safeGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.log("Storage blocked - Using temporary memory");
    return [];
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Storage blocked - Cannot save permanently");
  }
}

/* ================= STATE ================= */

const State = {
  coins: [],
  favorites: safeGet("favorites")
};

/* ================= FETCH DATA ================= */

async function fetchCoins() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    State.coins = data;
    render(data);
  } catch (error) {
    document.getElementById("cards").innerHTML =
      "<h3>⚠ Network Error</h3>";
  }
}

/* ================= RENDER ================= */

function render(data) {
  const container = document.getElementById("cards");

  container.innerHTML = data.map(coin => `
    <div class="card">
      <h3>${coin.name}</h3>
      <p>$${coin.current_price}</p>
      <button onclick="toggleFav('${coin.id}')">
        ${State.favorites.includes(coin.id) ? "★ Favorite" : "+ Add Favorite"}
      </button>
    </div>
  `).join("");
}

/* ================= FAVORITES ================= */

function toggleFav(id) {
  if (State.favorites.includes(id)) {
    State.favorites = State.favorites.filter(f => f !== id);
  } else {
    State.favorites.push(id);
  }

  safeSet("favorites", State.favorites);
  render(State.coins);
}

/* ================= SEARCH ================= */

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = State.coins.filter(c =>
    c.name.toLowerCase().includes(value)
  );
  render(filtered);
});

/* ================= SORT ================= */

document.getElementById("sort").addEventListener("change", e => {
  let sorted = [...State.coins];

  if (e.target.value === "asc") {
    sorted.sort((a,b)=>a.current_price - b.current_price);
  }
  else if (e.target.value === "desc") {
    sorted.sort((a,b)=>b.current_price - a.current_price);
  }

  render(sorted);
});

/* ================= INIT ================= */

fetchCoins();
