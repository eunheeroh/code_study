/* ═══════════════════════════════════════════════════
   home.js — 랜딩(홈) 화면 상호작용

   · CTA / 기능 카드 클릭 → 해당 앱 섹션으로 이동
   · "요금제 보기" → 요금제로 부드럽게 스크롤
   · "프로 시작하기" → 프로 플랜 안내 모달
═══════════════════════════════════════════════════ */

function initHome() {
  const home = document.getElementById('home-section');
  if (!home) return;

  // 스크롤 리빌 애니메이션
  initReveal(home);

  // 코드 레인 배경 애니메이션
  if (typeof initCodeRain === 'function') initCodeRain();

  // 섹션 이동 · 스크롤 (이벤트 위임)
  home.addEventListener('click', (e) => {
    const gotoBtn = e.target.closest('[data-goto]');
    if (gotoBtn) {
      const target = gotoBtn.dataset.goto;
      if (typeof switchSection === 'function') switchSection(target);
      return;
    }
    const scrollBtn = e.target.closest('[data-scroll]');
    if (scrollBtn) {
      const el = document.getElementById(scrollBtn.dataset.scroll);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ── 이하: 프로 구독 버튼 ──
  wireProButton();
}

/* ── 스크롤 리빌 (IntersectionObserver) ── */
function initReveal(home) {
  const targets = home.querySelectorAll(
    '.home-feature, .home-plan, .home-review, .home-final-cta'
  );
  if (!targets.length) return;

  // JS가 살아있을 때만 숨김 상태 적용 (실패 시 콘텐츠 항상 노출)
  home.classList.add('anim-ready');

  // IntersectionObserver 미지원 시 즉시 노출
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('reveal-in'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => io.observe(el));
}

function wireProButton() {
  // 프로 구독 버튼 → 안내 모달
  const proBtn = document.getElementById('subscribe-pro-btn');
  if (proBtn && typeof openModal === 'function') {
    proBtn.addEventListener('click', () => {
      openModal('⭐ 코드깨비 프로', `
        <p><strong>프로 플랜</strong>으로 코드깨비의 모든 기능을 제한 없이 사용하세요.</p>
        <div class="modal-report-grid">
          <div class="modal-report-card"><div class="modal-report-num">₩9,900</div><div class="modal-report-lbl">월 구독</div></div>
          <div class="modal-report-card"><div class="modal-report-num">10개</div><div class="modal-report-lbl">전체 학습 주제</div></div>
        </div>
        <ul class="modal-list">
          <li>전체 주제 무제한 학습 &amp; 퀴즈</li>
          <li>주간 학습 리포트 · 엑셀 내보내기</li>
          <li>성취 배지 &amp; 우선 고객 지원</li>
        </ul>
        <p class="modal-tip">지금은 <strong>무료 체험</strong>으로 핵심 기능을 먼저 경험해 보세요. 결제 연동은 정식 출시 시 제공됩니다.</p>
        <button class="modal-load-btn" data-goto="tutor-section" type="button" style="margin-top:8px;">무료 체험 시작하기 →</button>
      `);

      // 모달 내부 "무료 체험 시작" 버튼
      const body = document.getElementById('modal-body');
      if (body) {
        const startBtn = body.querySelector('[data-goto]');
        if (startBtn) {
          startBtn.addEventListener('click', () => {
            if (typeof switchSection === 'function') switchSection('tutor-section');
            if (typeof closeModal === 'function') closeModal();
          });
        }
      }
    });
  }
}
