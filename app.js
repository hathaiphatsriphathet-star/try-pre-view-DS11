// ── Font Tester ──

const preview = document.getElementById('fontPreview');
const input   = document.getElementById('testerInput');
const slider  = document.getElementById('fontSizeSlider');
const chips   = document.querySelectorAll('.font-chip');

let currentFont = 'DSAlmond';
let currentSize = 36;

function updatePreview() {
  const text = input.value.trim();
  const display = text || 'ทดลองพิมพ์ฟอนต์...';
  preview.textContent = display;
  preview.setAttribute('data-text', display);
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
    var(--maroon-400) 0%, var(--maroon-400) ${pct}%,
    var(--maroon-200) ${pct}%, var(--maroon-200) 100%)`;
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

// ── Emoji Font Marquee ──
const emojiTrack = document.getElementById('emojiTrack');
const emojiChips = document.querySelectorAll('.emoji-chip');

const EMOJI_FONTS = {
  'DSEmoji01':  { label: 'อิโมจิEp.1', chars: '!#%0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' },
  'DSEmojiEp2': { label: 'อิโมจิEp.2', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'EmojiEp3':   { label: 'อิโมจิEp.3', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~฿๐๑๒๓๔๕๖๗๘๙' },
  'DSEmojiEp4': { label: 'อิโมจิEp.4', chars: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~฿“”' },
  'DSEmojiEp5': { label: 'อิโมจิEp.5', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'DSEmojiEp6':  { label: 'อิโมจิEp.6',  chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'TKEmojiEp7':  { label: 'อิโมจิEp.7',  chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'TKEmojiEp8':  { label: 'อิโมจิEp.8',  chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'DSEmojiEp9':  { label: 'อิโมจิEp.9',  chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}~' },
  'DSEmojiEp10': { label: 'อิโมจิEp.10', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'DSEmojiEp11': { label: 'อิโมจิEp.11', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  'DSEmojiEp12': { label: 'อิโมจิEp.12', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
};

let activeEmojiFont = 'DSEmoji01';

function escapeHTML(c) {
  return c.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function renderEmojiTrack(chars) {
  const html = [...chars].map(c => `<span>${escapeHTML(c)}</span>`).join('');
  emojiTrack.innerHTML = html + html;
  const seconds = Math.max(12, Math.min(60, chars.length * 0.45));
  emojiTrack.style.animationDuration = seconds + 's';
}

function applyEmojiFont(fontKey) {
  activeEmojiFont = fontKey;
  const data = EMOJI_FONTS[fontKey];
  if (!data) return;
  emojiTrack.style.fontFamily = `'${fontKey}', sans-serif`;
  renderEmojiTrack(data.chars);
}

if (emojiTrack) {
  applyEmojiFont(activeEmojiFont);
}

emojiChips.forEach(chip => {
  chip.addEventListener('click', () => {
    emojiChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    applyEmojiFont(chip.dataset.font);
  });
});

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
