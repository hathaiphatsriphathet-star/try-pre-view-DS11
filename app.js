const preview = document.getElementById('fontPreview');
const input = document.getElementById('testerInput');
const slider = document.getElementById('fontSizeSlider');
const fontSelector = document.querySelector('.font-selector');
const fontSearch = document.getElementById('fontSearch');
const fontSearchCount = document.getElementById('fontSearchCount');
const emojiTrack = document.getElementById('emojiTrack');
const emojiChips = document.querySelectorAll('.emoji-chip');

let currentFont = 'DSAlmond';
let currentSize = 36;

function getFontChips() {
  return [...document.querySelectorAll('.font-chip')];
}

function updatePreview() {
  const text = input.value.trim();
  const display = text || 'ทดลองพิมพ์ฟอนต์...';
  preview.textContent = display;
  preview.setAttribute('data-text', display);
}

function setFont(fontName) {
  currentFont = fontName;
  preview.style.fontFamily = `'${fontName}', cursive`;
}

function setSize(size) {
  currentSize = size;
  preview.style.fontSize = `${size}px`;
  const pct = ((size - 14) / (72 - 14)) * 100;
  slider.style.background = `linear-gradient(to right,
    var(--maroon-400) 0%, var(--maroon-400) ${pct}%,
    var(--maroon-200) ${pct}%, var(--maroon-200) 100%)`;
}

function updateCount(visible) {
  const total = getFontChips().length;
  fontSearchCount.textContent = visible < total ? `${visible} / ${total}` : '';
}

function filterFonts() {
  const q = fontSearch.value.trim().toLowerCase();
  let visible = 0;
  getFontChips().forEach(chip => {
    const label = chip.textContent.toLowerCase();
    const font = chip.dataset.font.toLowerCase();
    const show = !q || label.includes(q) || font.includes(q);
    chip.style.display = show ? '' : 'none';
    if (show) visible += 1;
  });
  updateCount(visible);
}

if (fontSelector) {
  fontSelector.addEventListener('click', event => {
    const chip = event.target.closest('.font-chip');
    if (!chip) return;
    getFontChips().forEach(node => node.classList.remove('active'));
    chip.classList.add('active');
    setFont(chip.dataset.font);
  });
}

input.addEventListener('input', updatePreview);
slider.addEventListener('input', () => setSize(Number(slider.value)));
fontSearch.addEventListener('input', filterFonts);

setSize(currentSize);
setFont(currentFont);
updatePreview();
updateCount(getFontChips().length);

const EMOJI_FONTS = {
  DSEmoji01: { label: 'อิโมจิEp.1', chars: '!#%0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' },
  DSEmojiEp2: { label: 'อิโมจิEp.2', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  EmojiEp3: { label: 'อิโมจิEp.3', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}~฿๐๑๒๓๔๕๖๗๘๙' },
  DSEmojiEp4: { label: 'อิโมจิEp.4', chars: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ฯ฿๐๑๒๓๔๕๖๗๘๙‘’“”' },
  DSEmojiEp5: { label: 'อิโมจิEp.5', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  DSEmojiEp6: { label: 'อิโมจิEp.6', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  TKEmojiEp7: { label: 'อิโมจิEp.7', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  TKEmojiEp8: { label: 'อิโมจิEp.8', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  DSEmojiEp9: { label: 'อิโมจิEp.9', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}~' },
  DSEmojiEp10: { label: 'อิโมจิEp.10', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  DSEmojiEp11: { label: 'อิโมจิEp.11', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
  DSEmojiEp12: { label: 'อิโมจิEp.12', chars: '!#$%&()*+-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_abcdefghijklmnopqrstuvwxyz{|}฿๐๑๒๓๔๕๖๗๘๙' },
};

let activeEmojiFont = 'DSEmoji01';

function escapeHTML(char) {
  return char.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[match]));
}

function renderEmojiTrack(chars) {
  const html = [...chars].map(char => `<span>${escapeHTML(char)}</span>`).join('');
  emojiTrack.innerHTML = html + html;
  const seconds = Math.max(12, Math.min(60, chars.length * 0.45));
  emojiTrack.style.animationDuration = `${seconds}s`;
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
    emojiChips.forEach(node => node.classList.remove('active'));
    chip.classList.add('active');
    applyEmojiFont(chip.dataset.font);
  });
});

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const fontName = item.dataset.font;
    if (!fontName) return;
    const chip = getFontChips().find(node => node.dataset.font === fontName);
    if (chip) {
      getFontChips().forEach(node => node.classList.remove('active'));
      chip.classList.add('active');
    }
    setFont(fontName);
    document.querySelector('.font-tester').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
