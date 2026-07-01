/* ═══════════════════════════════════════════════════
   theme.js — 밝은 모드 / 어두운 모드 전환
═══════════════════════════════════════════════════ */

const THEME_KEY = 'codeggaebi-theme';

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateToggleIcon(theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

function updateToggleIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  // 어두운 모드일 때는 해(밝게 전환), 밝은 모드일 때는 달(어둡게 전환)
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
}

function initTheme() {
  const btn = document.getElementById('theme-toggle');

  // 저장값이 없으면 OS 설정을 따름
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (saved !== 'dark' && saved !== 'light') {
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    saved = prefersDark ? 'dark' : 'light';
  }
  applyTheme(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }
}
