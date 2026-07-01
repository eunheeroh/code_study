/* ═══════════════════════════════════════════════════
   menu.js — 서브메뉴 / 푸터 링크 클릭 시 내용 모달 표시

   각 메뉴 항목을 클릭하면 관련된 중요한 내용이 모달로 뜹니다.
   · 사용법, 주제 목록, 템플릿, 예제 코드
   · 풀이 기록, 주간 리포트 (실데이터 기반)
   · 프로젝트 소개, 피드백, 개인정보처리방침
═══════════════════════════════════════════════════ */

// HTML 이스케이프 (코드 표시용)
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── 에디터로 넣을 시작 템플릿 ── */
const MENU_TEMPLATES = {
  card: {
    name: '프로필 카드',
    html: `<!DOCTYPE html>
<html>
<head><title>프로필 카드</title></head>
<body>
  <div class="card">
    <h1>홍길동</h1>
    <p>코딩을 배우는 중입니다 🌱</p>
    <button>팔로우</button>
  </div>
</body>
</html>`,
    css: `body { font-family: sans-serif; background: #f0f2f5; }
.card {
  max-width: 300px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}
button {
  background: #0066cc; color: white;
  border: none; padding: 10px 20px;
  border-radius: 20px; cursor: pointer;
}`,
    js: `document.querySelector('button').addEventListener('click', function () {
  this.textContent = '팔로잉 ✓';
  this.style.background = '#34c759';
});`
  },
  list: {
    name: '할 일 목록',
    html: `<!DOCTYPE html>
<html>
<head><title>할 일 목록</title></head>
<body>
  <h1>오늘 할 일</h1>
  <ul id="todo">
    <li>HTML 복습하기</li>
    <li>CSS 연습하기</li>
    <li>퀴즈 풀기</li>
  </ul>
</body>
</html>`,
    css: `body { font-family: sans-serif; padding: 24px; }
li {
  padding: 10px; margin: 6px 0;
  background: #eef4ff; border-radius: 8px;
  cursor: pointer; list-style: none;
}
li.done { text-decoration: line-through; opacity: 0.5; }`,
    js: `document.querySelectorAll('#todo li').forEach(function (li) {
  li.addEventListener('click', function () {
    li.classList.toggle('done');
  });
});`
  }
};

/* ── 각 메뉴 항목의 제목 · 내용 ── */
const MENU_CONTENT = {
  // ── AI 튜터 ──
  'subnav-tutor-help': () => ({
    title: '🧙 AI 튜터 사용법',
    html: `
      <p>궁금한 코딩 개념을 자연스러운 말로 물어보세요. 코드깨비가 <strong>일상의 비유</strong>로 쉽게 설명해 드려요.</p>
      <div class="modal-steps">
        <div class="modal-step"><span class="modal-step-no">1</span><div><strong>비유 힌트</strong><br>어려운 개념을 익숙한 사물에 빗대어 설명해요. (예: padding = 상자 속 뽁뽁이)</div></div>
        <div class="modal-step"><span class="modal-step-no">2</span><div><strong>코드 힌트</strong><br>실제 코드가 어떻게 생겼는지 살짝 보여줘요.</div></div>
        <div class="modal-step"><span class="modal-step-no">3</span><div><strong>정답 설명</strong><br>완성된 코드와 함께 자세히 정리해 줘요.</div></div>
      </div>
      <p class="modal-tip">💡 상단의 주제 버튼(HTML·CSS·JavaScript·레이아웃·폼)을 눌러 원하는 주제로 바꿀 수 있어요.</p>
    `
  }),
  'subnav-tutor-topics': () => ({
    title: '📚 학습 주제 목록',
    html: `
      <ul class="modal-list">
        <li><strong>HTML 기초</strong> — 웹페이지의 뼈대를 만드는 태그</li>
        <li><strong>CSS 스타일링</strong> — 색·글꼴·여백으로 꾸미기</li>
        <li><strong>JavaScript</strong> — 버튼 클릭 등 동작 넣기</li>
        <li><strong>레이아웃</strong> — Flexbox로 요소 배치하기</li>
        <li><strong>폼 &amp; 입력</strong> — 입력창·버튼으로 정보 받기</li>
      </ul>
      <p class="modal-tip">💡 각 주제는 <strong>복습 퀴즈</strong>와 연결돼 있어요. 배운 뒤 퀴즈로 확인해 보세요!</p>
    `
  }),

  // ── 코드 실습 ──
  'subnav-editor-templates': () => ({
    title: '🧩 시작 템플릿',
    html: `
      <p>아래 템플릿을 선택하면 코드 실습 편집기에 바로 불러와요.</p>
      <div class="modal-template-grid">
        ${Object.entries(MENU_TEMPLATES).map(([key, t]) => `
          <div class="modal-template-card">
            <div class="modal-template-name">${escHtml(t.name)}</div>
            <button class="modal-load-btn" data-template="${key}" type="button">에디터에 넣기 →</button>
          </div>`).join('')}
      </div>
    `
  }),
  'subnav-editor-examples': () => ({
    title: '💻 예제 코드',
    html: `
      <p>자주 쓰는 코드 패턴이에요. 따라 써 보면 금방 익숙해져요.</p>
      <div class="modal-example">
        <div class="modal-example-title">버튼 클릭에 반응하기 (JavaScript)</div>
        <pre>${escHtml(`const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('안녕하세요!');
});`)}</pre>
      </div>
      <div class="modal-example">
        <div class="modal-example-title">가운데 정렬 (CSS Flexbox)</div>
        <pre>${escHtml(`.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`)}</pre>
      </div>
      <p class="modal-tip">💡 더 많은 시작점은 <strong>템플릿</strong> 메뉴에서 편집기로 바로 불러올 수 있어요.</p>
    `
  }),

  // ── 복습 퀴즈 ──
  'subnav-quiz-history': () => ({
    title: '📝 퀴즈 풀이 기록',
    html: renderQuizHistory()
  }),

  // ── 대시보드 ──
  'subnav-dash-weekly': () => ({
    title: '📈 주간 리포트',
    html: renderWeeklyReport()
  }),

  // ── 푸터: 회사 안내 ──
  'footer-link-about': () => {
    const en = (typeof getLang === 'function' && getLang() === 'en');
    return {
      title: en ? '🏢 Company' : '🏢 회사 안내',
      html: en ? `
        <p><strong>CodeGGaebi</strong> builds AI-powered learning tools for adults starting to code.</p>
        <ul class="modal-list">
          <li>Company: CodeGGaebi</li>
          <li>Field: AI-based coding education</li>
          <li>Founded: 2026</li>
          <li>Contact: ehroh0@gmail.com</li>
        </ul>
        <p class="modal-tip">※ Sample company info — replace with your real details.</p>
      ` : `
        <p><strong>코드깨비 CodeGGaebi</strong>는 코딩을 처음 시작하는 성인 학습자를 위한 AI 학습 서비스를 만듭니다.</p>
        <ul class="modal-list">
          <li>상호: 코드깨비 (CodeGGaebi)</li>
          <li>사업 분야: AI 기반 코딩 교육</li>
          <li>설립: 2026년</li>
          <li>문의: ehroh0@gmail.com</li>
        </ul>
        <p class="modal-tip">※ 예시 정보입니다. 실제 회사 정보로 교체하세요.</p>
      `
    };
  },
  // ── 푸터: 회사 위치 (구글맵 연동) ──
  'footer-link-feedback': () => {
    const en = (typeof getLang === 'function' && getLang() === 'en');
    const address = '서울 강북구 덕릉로 108 현웅빌딩 3층';
    const addressEn = '3F Hyeonung Bldg, 108 Deongneung-ro, Gangbuk-gu, Seoul';
    const q = encodeURIComponent('서울 강북구 덕릉로 108');
    const embedSrc = `https://www.google.com/maps?q=${q}&z=16&hl=${en ? 'en' : 'ko'}&output=embed`;
    const openSrc  = `https://www.google.com/maps/search/?api=1&query=${q}`;
    return {
      title: en ? '📍 Location' : '📍 회사 위치',
      html: en ? `
        <p>Please contact us before visiting and we'll be happy to guide you.</p>
        <ul class="modal-list">
          <li>Address: ${escHtml(addressEn)}</li>
          <li>Email: ehroh0@gmail.com</li>
          <li>Hours: Weekdays 10:00–18:00</li>
        </ul>
        <iframe class="modal-map-frame" src="${embedSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Company location map" allowfullscreen></iframe>
        <a class="modal-map-link" href="${openSrc}" target="_blank" rel="noopener">Open in Google Maps →</a>
      ` : `
        <p>방문 전 연락 주시면 친절히 안내해 드리겠습니다.</p>
        <ul class="modal-list">
          <li>주소: ${escHtml(address)}</li>
          <li>이메일: ehroh0@gmail.com</li>
          <li>운영시간: 평일 10:00–18:00</li>
        </ul>
        <iframe class="modal-map-frame" src="${embedSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="회사 위치 지도" allowfullscreen></iframe>
        <a class="modal-map-link" href="${openSrc}" target="_blank" rel="noopener">구글맵에서 열기 →</a>
      `
    };
  },
  'footer-link-privacy': () => ({
    title: '🔒 개인정보처리방침',
    html: `
      <p>코드깨비는 <strong>개인정보를 수집·전송하지 않아요.</strong></p>
      <ul class="modal-list">
        <li>학습 기록·퀴즈 점수는 <strong>브라우저 localStorage</strong>에만 저장돼요.</li>
        <li>외부 서버로 어떤 정보도 보내지 않아요. (프론트엔드 전용)</li>
        <li>브라우저 데이터를 지우면 학습 기록도 함께 사라져요.</li>
      </ul>
    `
  })
};

/* ── 동적 내용: 퀴즈 풀이 기록 ── */
function renderQuizHistory() {
  let records = [];
  try {
    if (typeof getQuizRecords === 'function') records = getQuizRecords();
  } catch (e) {}

  if (!records || records.length === 0) {
    return `<div class="modal-empty">아직 푼 퀴즈가 없어요.<br>복습 퀴즈에서 첫 문제를 풀어 보세요! 🎯</div>`;
  }

  const rows = records.slice().reverse().map(r => {
    const d = r.date ? new Date(r.date) : null;
    const dateStr = d ? `${d.getMonth() + 1}/${d.getDate()}` : '-';
    const score = (typeof r.score === 'number') ? r.score : '-';
    return `<tr>
      <td>${escHtml(r.quizName || r.quizId || '퀴즈')}</td>
      <td class="modal-num">${escHtml(r.correct)}/${escHtml(r.total)}</td>
      <td class="modal-num"><strong>${escHtml(score)}점</strong></td>
      <td class="modal-num">${dateStr}</td>
    </tr>`;
  }).join('');

  const avg = Math.round(
    records.reduce((s, r) => s + (r.score || 0), 0) / records.length
  );

  return `
    <p>총 <strong>${records.length}회</strong> 풀었고, 평균 <strong>${avg}점</strong>이에요.</p>
    <table class="modal-table">
      <thead><tr><th>주제</th><th>정답</th><th>점수</th><th>날짜</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

/* ── 동적 내용: 주간 리포트 ── */
function renderWeeklyReport() {
  let login = {};
  try { login = JSON.parse(localStorage.getItem('codegaebi_login') || '{}'); } catch (e) {}

  let records = [];
  try {
    if (typeof getQuizRecords === 'function') records = getQuizRecords();
  } catch (e) {}

  // 최근 7일 퀴즈
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekRecords = records.filter(r => r.date && new Date(r.date).getTime() >= weekAgo);
  const weekAvg = weekRecords.length
    ? Math.round(weekRecords.reduce((s, r) => s + (r.score || 0), 0) / weekRecords.length)
    : null;

  const hours = ((login.totalMinutes || 0) / 60).toFixed(1);

  return `
    <p>최근 나의 학습 흐름을 한눈에 정리했어요.</p>
    <div class="modal-report-grid">
      <div class="modal-report-card"><div class="modal-report-num">${hours}h</div><div class="modal-report-lbl">총 학습 시간</div></div>
      <div class="modal-report-card"><div class="modal-report-num">${login.currentStreak || 0}일</div><div class="modal-report-lbl">연속 학습</div></div>
      <div class="modal-report-card"><div class="modal-report-num">${weekRecords.length}회</div><div class="modal-report-lbl">이번 주 퀴즈</div></div>
      <div class="modal-report-card"><div class="modal-report-num">${weekAvg === null ? '-' : weekAvg + '점'}</div><div class="modal-report-lbl">주간 평균</div></div>
    </div>
    <p class="modal-tip">${
      weekRecords.length
        ? '꾸준히 하고 있어요. 이 페이스를 유지해 보세요! 🔥'
        : '이번 주엔 아직 퀴즈를 안 풀었어요. 오늘 하나 도전해 볼까요? 💪'
    }</p>
  `;
}

/* ── 모달 열기 / 닫기 ── */
function openModal(title, html) {
  const overlay = document.getElementById('app-modal');
  const titleEl = document.getElementById('modal-title');
  const bodyEl  = document.getElementById('modal-body');
  if (!overlay || !titleEl || !bodyEl) return;

  titleEl.textContent = title;
  bodyEl.innerHTML = html;
  overlay.classList.remove('section-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('app-modal');
  if (!overlay) return;
  overlay.classList.add('section-hidden');
  document.body.style.overflow = '';
}

function initMenu() {
  // 각 메뉴 링크에 클릭 핸들러 연결
  Object.keys(MENU_CONTENT).forEach(id => {
    const link = document.getElementById(id);
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const data = MENU_CONTENT[id]();
      openModal(data.title, data.html);
    });
  });

  // 닫기 버튼 · 배경 클릭 · ESC
  const overlay  = document.getElementById('app-modal');
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 템플릿 "에디터에 넣기" 버튼 (모달 내부 위임)
  const bodyEl = document.getElementById('modal-body');
  if (bodyEl) {
    bodyEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal-load-btn');
      if (!btn) return;
      const key = btn.dataset.template;
      const tpl = MENU_TEMPLATES[key];
      if (!tpl) return;
      if (typeof loadTemplate === 'function') {
        loadTemplate(tpl.html, tpl.css, tpl.js);
      }
      if (typeof switchSection === 'function') {
        switchSection('editor-section');
      }
      closeModal();
    });
  }
}
