// ── Font Tester ──

const preview = document.getElementById('fontPreview');
const input   = document.getElementById('testerInput');
const slider  = document.getElementById('fontSizeSlider');
const chips   = document.querySelectorAll('.font-chip');

let currentFont = 'DSAlmond';
let currentSize = 36;

// Update preview text
function updatePreview() {
  const text = input.value.trim();
  preview.textContent = text || 'The art of writing is the soul of thinking.';
}

// Update font
function setFont(fontName) {
  currentFont = fontName;
  preview.style.fontFamily = `'${fontName}', cursive`;
}

// Update size + slider gradient
function setSize(size) {
  currentSize = size;
  preview.style.fontSize = size + 'px';
  const pct = ((size - 14) / (72 - 14)) * 100;
  slider.style.background = `linear-gradient(to right,
    var(--pink-400) 0%, var(--pink-400) ${pct}%,
    var(--pink-200) ${pct}%, var(--pink-200) 100%)`;
}

// Font chip clicks
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    setFont(chip.dataset.font);
  });
});

// Input listener
input.addEventListener('input', updatePreview);

// Slider listener
slider.addEventListener('input', () => {
  setSize(Number(slider.value));
});

// Init
setSize(currentSize);
setFont(currentFont);
updatePreview();

// ── Font Search ──
const fontSearch = document.getElementById('fontSearch');
const fontSearchCount = document.getElementById('fontSearchCount');

function updateCount(visible) {
  fontSearchCount.textContent = visible < chips.length ? `${visible} / ${chips.length}` : '';
}

fontSearch.addEventListener('input', () => {
  const q = fontSearch.value.trim().toLowerCase();
  let visible = 0;
  chips.forEach(chip => {
    const label = chip.textContent.toLowerCase();
    const font  = chip.dataset.font.toLowerCase();
    const show  = !q || label.includes(q) || font.includes(q);
    chip.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  updateCount(visible);
});

updateCount(chips.length);

// ── Gallery click → jump to tester ──
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const fontName = item.dataset.font;
    if (!fontName) return;
    const chip = [...chips].find(c => c.dataset.font === fontName);
    if (chip) {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    }
    setFont(fontName);
    document.querySelector('.font-tester').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
