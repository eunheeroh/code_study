/* ═══════════════════════════════════════════════════
   nav.js — 섹션 전환 & 모바일 메뉴
═══════════════════════════════════════════════════ */

function initNav() {
  // data-target 이 있는 버튼만 섹션 전환 대상 (로그인/로그아웃 버튼 제외)
  const navButtons = document.querySelectorAll('#main-nav button[data-target]');
  const sections   = document.querySelectorAll('main#app-main > section');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav      = document.getElementById('main-nav');

  // ── 섹션 전환 ──
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      switchSection(targetId, navButtons, sections);

      // 모바일 메뉴 닫기
      mainNav.classList.remove('nav-open');
    });
  });

  // ── 모바일 메뉴 토글 ──
  mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
  });

  // 외부 클릭 시 모바일 메뉴 닫기
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && e.target !== mobileToggle) {
      mainNav.classList.remove('nav-open');
    }
  });
}

/**
 * 외부에서 호출 가능한 섹션 전환 함수
 * (퀴즈 → AI 튜터 이동 등에 사용)
 */
function switchSection(targetId, navButtons, sections) {
  // 인자 없으면 DOM에서 직접 조회
  if (!navButtons) navButtons = document.querySelectorAll('#main-nav button[data-target]');
  if (!sections)   sections   = document.querySelectorAll('main#app-main > section');

  // 네비게이션 활성 상태 변경
  navButtons.forEach(b => b.classList.remove('nav-active'));
  const activeBtn = document.querySelector(`#main-nav button[data-target="${targetId}"]`);
  if (activeBtn) activeBtn.classList.add('nav-active');

  // 섹션 표시/숨김
  sections.forEach(sec => {
    if (sec.id === targetId) {
      sec.classList.remove('section-hidden');
      sec.classList.add('section-active');
    } else {
      sec.classList.add('section-hidden');
      sec.classList.remove('section-active');
    }
  });

  // 스크롤 최상단으로
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
