/* ═══════════════════════════════════════════════════
   editor.js — 코드 실습 환경 (전문 에디터)

   PRD 핵심: HTML/CSS/JS 코드를 작성하고
   실행 버튼 → iframe에 즉시 렌더링 (1초 이내)

   전문 기능:
   · 줄 번호(line number) 거터
   · 콘솔 출력 패널 (iframe의 console.log 캡처)
   · 커서 위치(Ln/Col) 상태 표시줄
═══════════════════════════════════════════════════ */

const DEFAULT_CODE = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>내 첫 페이지</title>
</head>
<body>
  <h1>안녕하세요!</h1>
  <p>코드깨비와 함께 코딩을 배워봐요.</p>
</body>
</html>`,
  css: `/* CSS 스타일을 작성하세요 */
h1 {
  color: #0066cc;
}
p {
  font-size: 18px;
}`,
  js: `// JavaScript 코드를 작성하세요
console.log("안녕하세요, 코드깨비!");`
};

// 현재 활성 언어 (html/css/js)
let currentLang = 'html';

function initEditor() {
  const tabBtns    = document.querySelectorAll('.editor-tab-bar button');
  const htmlInput  = document.getElementById('code-input-html');
  const cssInput   = document.getElementById('code-input-css');
  const jsInput    = document.getElementById('code-input-js');
  const runBtn     = document.getElementById('editor-run-btn');
  const resetBtn   = document.getElementById('editor-reset-btn');
  const preview    = document.getElementById('code-preview');

  const textareas = { html: htmlInput, css: cssInput, js: jsInput };

  // ── 탭 전환 ──
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.replace('tab-', '');
      switchTab(lang, tabBtns, textareas);
    });
  });

  // ── 실행 ──
  runBtn.addEventListener('click', () => {
    runCode(textareas, preview);
  });

  // ── 초기화 ──
  resetBtn.addEventListener('click', () => {
    if (confirm('코드를 초기 상태로 되돌릴까요?')) {
      resetCode(textareas, preview);
    }
  });

  // ── 각 textarea 이벤트: 들여쓰기 / 줄번호 / 커서 위치 ──
  Object.values(textareas).forEach(ta => {
    // Tab 키로 들여쓰기
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart;
        const end   = ta.selectionEnd;
        ta.value = ta.value.substring(0, start) + '  ' + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 2;
        updateGutter(ta);
      }
    });
    // 입력 시 줄번호 갱신
    ta.addEventListener('input', () => {
      updateGutter(ta);
      updateStatus(ta);
    });
    // 스크롤 시 거터 동기화
    ta.addEventListener('scroll', () => {
      const gutter = document.getElementById('editor-gutter');
      if (gutter) gutter.scrollTop = ta.scrollTop;
    });
    // 커서 위치(Ln/Col) 갱신
    ['click', 'keyup'].forEach(evt =>
      ta.addEventListener(evt, () => updateStatus(ta))
    );
  });

  // ── 콘솔 캡처 & 지우기 ──
  initConsole(preview);
  const clearBtn = document.getElementById('console-clear-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearConsole);

  // ── 초기 상태 ──
  currentLang = 'html';
  updateGutter(htmlInput);
  updateStatus(htmlInput);
  runCode(textareas, preview);
}

function switchTab(lang, tabBtns, textareas) {
  currentLang = lang;

  // 탭 활성화
  tabBtns.forEach(b => {
    b.classList.remove('tab-active');
    b.setAttribute('aria-selected', 'false');
  });
  const activeTab = document.getElementById('tab-' + lang);
  if (activeTab) {
    activeTab.classList.add('tab-active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  // textarea 전환
  Object.entries(textareas).forEach(([key, ta]) => {
    if (key === lang) {
      ta.classList.remove('section-hidden');
    } else {
      ta.classList.add('section-hidden');
    }
  });

  // 줄번호 · 상태 갱신
  updateGutter(textareas[lang]);
  updateStatus(textareas[lang]);
}

/* ── 줄 번호 거터 ── */
function updateGutter(ta) {
  const gutter = document.getElementById('editor-gutter');
  if (!gutter || !ta) return;
  const lines = ta.value.split('\n').length;
  let out = '';
  for (let i = 1; i <= lines; i++) out += i + '\n';
  gutter.textContent = out;
  gutter.scrollTop = ta.scrollTop;
}

/* ── 상태 표시줄 (언어 · 커서 위치) ── */
function updateStatus(ta) {
  const langEl = document.getElementById('editor-status-lang');
  const posEl  = document.getElementById('editor-status-pos');
  if (langEl) langEl.textContent = currentLang.toUpperCase();
  if (posEl && ta) {
    const upto = ta.value.substring(0, ta.selectionStart);
    const rows = upto.split('\n');
    const line = rows.length;
    const col  = rows[rows.length - 1].length + 1;
    posEl.textContent = `Ln ${line}, Col ${col}`;
  }
}

function runCode(textareas, preview) {
  const htmlCode = textareas.html.value;
  const cssCode  = textareas.css.value;
  const jsCode   = textareas.js.value;

  // 실행 시 콘솔 초기화
  clearConsole();

  // HTML에 CSS와 JS를 삽입하여 합성
  let combinedHtml = htmlCode;

  // 한글이 깨지지 않도록 UTF-8 charset 보장
  if (!/<meta[^>]+charset/i.test(combinedHtml)) {
    const metaTag = '<meta charset="UTF-8">';
    if (/<head[^>]*>/i.test(combinedHtml)) {
      combinedHtml = combinedHtml.replace(/(<head[^>]*>)/i, `$1\n  ${metaTag}`);
    } else {
      combinedHtml = metaTag + '\n' + combinedHtml;
    }
  }

  // 콘솔 캡처 스크립트를 문서 맨 앞에 주입 (사용자 코드보다 먼저 실행)
  const consoleHook = buildConsoleHook();
  if (/<head[^>]*>/i.test(combinedHtml)) {
    combinedHtml = combinedHtml.replace(/(<head[^>]*>)/i, `$1\n${consoleHook}`);
  } else {
    combinedHtml = consoleHook + '\n' + combinedHtml;
  }

  // </head> 앞에 <style> 삽입
  if (cssCode.trim()) {
    const styleTag = `<style>\n${cssCode}\n</style>`;
    if (combinedHtml.includes('</head>')) {
      combinedHtml = combinedHtml.replace('</head>', styleTag + '\n</head>');
    } else {
      combinedHtml = styleTag + '\n' + combinedHtml;
    }
  }

  // </body> 앞에 <script> 삽입
  if (jsCode.trim()) {
    const scriptTag = `<script>\n${jsCode}\n<\/script>`;
    if (combinedHtml.includes('</body>')) {
      combinedHtml = combinedHtml.replace('</body>', scriptTag + '\n</body>');
    } else {
      combinedHtml = combinedHtml + '\n' + scriptTag;
    }
  }

  // iframe에 렌더링
  const blob = new Blob([combinedHtml], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);

  // 이전 URL 해제
  if (preview.dataset.blobUrl) {
    URL.revokeObjectURL(preview.dataset.blobUrl);
  }

  preview.src = url;
  preview.dataset.blobUrl = url;
}

function resetCode(textareas, preview) {
  textareas.html.value = DEFAULT_CODE.html;
  textareas.css.value  = DEFAULT_CODE.css;
  textareas.js.value   = DEFAULT_CODE.js;

  updateGutter(textareas[currentLang]);
  updateStatus(textareas[currentLang]);
  runCode(textareas, preview);
}

/* ═══════════════════════════════════════════════════
   콘솔 패널 — iframe의 console 출력을 postMessage로 수신
═══════════════════════════════════════════════════ */

// iframe 문서에 주입할 console 후킹 스크립트
function buildConsoleHook() {
  return `<script>
(function () {
  function fmt(a) {
    if (typeof a === 'object' && a !== null) {
      try { return JSON.stringify(a); } catch (e) { return String(a); }
    }
    return String(a);
  }
  function send(level, args) {
    try {
      parent.postMessage({
        __ggConsole: true,
        level: level,
        text: Array.prototype.map.call(args, fmt).join(' ')
      }, '*');
    } catch (e) {}
  }
  ['log', 'info', 'warn', 'error'].forEach(function (m) {
    var orig = console[m] ? console[m].bind(console) : function () {};
    console[m] = function () { send(m, arguments); orig.apply(null, arguments); };
  });
  window.addEventListener('error', function (e) {
    send('error', [e.message + ' (' + (e.lineno || '?') + '행)']);
  });
})();
<\/script>`;
}

let consoleReady = false;

function initConsole(preview) {
  if (consoleReady) return;
  consoleReady = true;
  window.addEventListener('message', (e) => {
    // 우리 iframe에서 온 콘솔 메시지만 처리
    if (!preview || e.source !== preview.contentWindow) return;
    const d = e.data;
    if (!d || d.__ggConsole !== true) return;
    appendConsole(d.level, d.text);
  });
}

function appendConsole(level, text) {
  const body = document.getElementById('console-body');
  const dot  = document.getElementById('console-dot');
  if (!body) return;

  // 비어있음 안내 제거
  const empty = body.querySelector('.console-empty');
  if (empty) empty.remove();

  const line = document.createElement('div');
  line.className = 'console-line console-' + (level || 'log');
  line.textContent = text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;

  if (dot) dot.classList.add('has-output');
}

function clearConsole() {
  const body = document.getElementById('console-body');
  const dot  = document.getElementById('console-dot');
  if (body) {
    body.innerHTML = '<div class="console-empty">console.log() 출력이 여기에 표시됩니다.</div>';
  }
  if (dot) dot.classList.remove('has-output');
}

/**
 * 외부에서 코드 에디터에 템플릿을 로딩하는 함수
 * (AI 튜터 → "직접 해보기" 버튼 연결 시 사용)
 */
function loadTemplate(htmlCode, cssCode, jsCode) {
  const textareas = {
    html: document.getElementById('code-input-html'),
    css:  document.getElementById('code-input-css'),
    js:   document.getElementById('code-input-js')
  };

  if (htmlCode) textareas.html.value = htmlCode;
  if (cssCode)  textareas.css.value  = cssCode;
  if (jsCode)   textareas.js.value   = jsCode;

  updateGutter(textareas[currentLang]);
  const preview = document.getElementById('code-preview');
  runCode(textareas, preview);
}
