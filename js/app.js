/* ═══════════════════════════════════════════════════
   app.js — 코드깨비 메인 진입점
   
   모든 모듈을 초기화하고 앱을 부트스트랩합니다.
═══════════════════════════════════════════════════ */


document.addEventListener('DOMContentLoaded', () => {
  console.log('🧙 코드깨비 CodeGGaebi — 시작!');

  // ── 접속 기록 ──
  recordLogin();

  // ── 모듈 초기화 ──
  initTheme();
  initI18n();
  initNav();
  initTutor();
  initEditor();
  initQuiz();
  initDashboard();
  initMenu();
  initHome();

  console.log('✅ 모든 모듈 초기화 완료');
});
