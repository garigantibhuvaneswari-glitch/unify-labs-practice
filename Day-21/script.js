// Day 21 Logic Practice
console.log('Lab Session 21 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const themeBtn = document.getElementById("themeBtn");
const languageSelect = document.getElementById("languageSelect");

const title = document.getElementById("title");
const themeLabel = document.getElementById("themeLabel");
const languageLabel = document.getElementById("languageLabel");

const translations = {
  en: {
    title: "Settings Manager",
    theme: "Theme",
    language: "Language",
    darkBtn: "Switch to Dark",
    lightBtn: "Switch to Light"
  },
  te: {
    title: "సెట్టింగ్స్ మేనేజర్",
    theme: "థీమ్",
    language: "భాష",
    darkBtn: "డార్క్ కి మార్చు",
    lightBtn: "లైట్ కి మార్చు"
  },
  hi: {
    title: "सेटिंग्स मैनेजर",
    theme: "थीम",
    language: "भाषा",
    darkBtn: "डार्क में बदलें",
    lightBtn: "लाइट में बदलें"
  }
};

let settings = {
  theme: "light",
  language: "en"
};

function applySettings() {
  document.body.classList.toggle("dark", settings.theme === "dark");

  const t = translations[settings.language];

  title.textContent = t.title;
  themeLabel.textContent = t.theme;
  languageLabel.textContent = t.language;

  themeBtn.textContent =
    settings.theme === "dark" ? t.lightBtn : t.darkBtn;

  languageSelect.value = settings.language;
}

applySettings();

themeBtn.addEventListener("click", () => {
  settings.theme = settings.theme === "light" ? "dark" : "light";
  applySettings();
});

languageSelect.addEventListener("change", (e) => {
  settings.language = e.target.value;
  applySettings();
});