/* ═══════════════════════════════════════════════════
   i18n.js — 한국어 / 영어 언어 전환

   · [data-i18n="key"]      → textContent 교체
   · [data-i18n-html="key"] → innerHTML 교체 (마크업 포함)
   · [data-i18n-ph="key"]   → placeholder 교체
   선택 언어는 localStorage에 저장됩니다.
═══════════════════════════════════════════════════ */

const I18N_KEY = 'codeggaebi-lang';

const I18N = {
  // ── 내비게이션 ──
  'nav.home':      { ko: '홈', en: 'Home' },
  'nav.tutor':     { ko: 'AI 튜터', en: 'AI Tutor' },
  'nav.editor':    { ko: '코드 실습', en: 'Code Lab' },
  'nav.quiz':      { ko: '복습 퀴즈', en: 'Quiz' },
  'nav.dashboard': { ko: '대시보드', en: 'Dashboard' },

  // ── 홈 히어로 ──
  'home.badge': { ko: '✨ AI 기반 코딩 학습 도우미', en: '✨ AI-powered coding companion' },
  'home.title': {
    ko: '코딩이 처음이어도<br><span class="home-title-accent">마법처럼 쉽게.</span>',
    en: 'New to coding?<br><span class="home-title-accent">Make it magically easy.</span>'
  },
  'home.sub': {
    ko: '일상의 비유로 설명하는 AI 튜터와 함께<br>HTML · CSS · JavaScript · 파이썬을 부담 없이 배워요.',
    en: 'Learn HTML · CSS · JavaScript · Python with an AI tutor<br>that explains everything using everyday analogies.'
  },
  'home.cta.start':   { ko: '무료로 시작하기 →', en: 'Get started free →' },
  'home.cta.pricing': { ko: '요금제 보기', en: 'See pricing' },
  'home.trust': {
    ko: '설치 없이 웹에서 바로 · 30~40대 성인 학습자를 위해 설계',
    en: 'No install, right in your browser · Designed for adult beginners'
  },

  // ── 홈 기능 ──
  'home.features.h2':   { ko: '배우고, 써보고, 확인하고, 성장을 눈으로.', en: 'Learn, build, check, and watch yourself grow.' },
  'home.features.lead': { ko: '학습에 필요한 모든 것을 한 곳에 담았어요.', en: 'Everything you need to learn, in one place.' },
  'feat.tutor.title':  { ko: 'AI 비유 튜터', en: 'AI Analogy Tutor' },
  'feat.tutor.desc':   { ko: '어려운 개념을 택배 상자·자판기 같은 일상 비유로 3단계로 설명해요.', en: 'Explains hard concepts in 3 steps with everyday analogies like parcels and vending machines.' },
  'feat.editor.title': { ko: '실시간 코드 실습', en: 'Live Code Lab' },
  'feat.editor.desc':  { ko: 'HTML·CSS·JS를 직접 쓰고 즉시 미리보기와 콘솔로 결과를 확인해요.', en: 'Write HTML·CSS·JS and see instant preview and console output.' },
  'feat.quiz.title':   { ko: '복습 퀴즈', en: 'Review Quiz' },
  'feat.quiz.desc':    { ko: '10개 주제 50문항으로 배운 내용을 점검하고, 틀리면 AI가 다시 설명해요.', en: 'Check your knowledge with 50 questions across 10 topics; the AI re-explains what you miss.' },
  'feat.dash.title':   { ko: '학습 대시보드', en: 'Learning Dashboard' },
  'feat.dash.desc':    { ko: '학습 시간·연속 기록·이해도·배지로 나의 성장을 한눈에 확인해요.', en: 'Track study time, streaks, mastery, and badges at a glance.' },

  // ── 홈 요금제 ──
  'home.pricing.h2':   { ko: '합리적인 요금제', en: 'Simple, fair pricing' },
  'home.pricing.lead': { ko: '부담 없이 시작하고, 필요할 때 업그레이드하세요.', en: 'Start free, upgrade whenever you need.' },
  'plan.free.name':  { ko: '무료', en: 'Free' },
  'plan.free.price': { ko: '₩0<span>/월</span>', en: '₩0<span>/mo</span>' },
  'plan.free.desc':  { ko: '가볍게 시작하는 분께', en: 'For a light start' },
  'plan.free.f1':    { ko: 'AI 비유 튜터 체험', en: 'Try the AI tutor' },
  'plan.free.f2':    { ko: '코드 실습 편집기', en: 'Code lab editor' },
  'plan.free.f3':    { ko: '기본 복습 퀴즈', en: 'Basic quizzes' },
  'plan.free.f4':    { ko: '학습 기록 저장', en: 'Saved progress' },
  'plan.free.btn':   { ko: '무료로 시작', en: 'Start free' },
  'plan.pro.tag':    { ko: '가장 인기', en: 'Most popular' },
  'plan.pro.name':   { ko: '프로', en: 'Pro' },
  'plan.pro.price':  { ko: '₩9,900<span>/월</span>', en: '₩9,900<span>/mo</span>' },
  'plan.pro.desc':   { ko: '제대로 배우고 싶은 분께', en: 'For serious learners' },
  'plan.pro.f1':     { ko: '<strong>전체 10개 주제</strong> 무제한 학습', en: '<strong>All 10 topics</strong>, unlimited' },
  'plan.pro.f2':     { ko: '무제한 퀴즈 &amp; 오답 복습', en: 'Unlimited quizzes &amp; mistake review' },
  'plan.pro.f3':     { ko: '주간 학습 리포트', en: 'Weekly learning report' },
  'plan.pro.f4':     { ko: '학습 기록 엑셀 내보내기', en: 'Export progress to Excel' },
  'plan.pro.f5':     { ko: '성취 배지 &amp; 우선 지원', en: 'Badges &amp; priority support' },
  'plan.pro.btn':    { ko: '프로 시작하기', en: 'Go Pro' },
  'home.pricing.note': { ko: '언제든 해지할 수 있어요 · 부가세 포함', en: 'Cancel anytime · VAT included' },

  // ── 홈 후기 ──
  'home.reviews.h2': { ko: '먼저 배운 분들의 이야기', en: 'What our learners say' },
  'rev1.q':   { ko: '"용어만 나오면 막막했는데, 비유로 들으니 머리에 쏙쏙 들어와요."', en: '"Jargon used to overwhelm me, but the analogies just click."' },
  'rev1.c':   { ko: '김○○ · 42세 · 직장인', en: 'Kim · 42 · Office worker' },
  'rev2.q':   { ko: '"직접 코드를 써보고 바로 결과를 보니 재미있어서 계속하게 돼요."', en: '"Writing code and seeing instant results keeps me going."' },
  'rev2.c':   { ko: '이○○ · 38세 · 자영업', en: 'Lee · 38 · Self-employed' },
  'rev3.q':   { ko: '"퀴즈로 확인하고 틀린 걸 다시 배우니 진짜로 남아요."', en: '"Quizzing and relearning mistakes makes it actually stick."' },
  'rev3.c':   { ko: '박○○ · 45세 · 주부', en: 'Park · 45 · Homemaker' },

  // ── 홈 최종 CTA ──
  'home.final.h2':  { ko: '오늘, 첫 줄의 코드를 써보세요.', en: 'Write your first line of code today.' },
  'home.final.p':   { ko: '지금 시작하면 오늘부터 학습 기록이 쌓입니다.', en: 'Start now and your progress begins today.' },
  'home.final.cta': { ko: '무료로 시작하기 →', en: 'Get started free →' },

  // ── 서브 내비 ──
  'sub.tutor.title':  { ko: 'AI 비유 튜터', en: 'AI Analogy Tutor' },
  'sub.tutor.help':   { ko: '사용법', en: 'How to use' },
  'sub.tutor.topics': { ko: '주제 목록', en: 'Topics' },
  'sub.editor.title':     { ko: '코드 실습', en: 'Code Lab' },
  'sub.editor.templates': { ko: '템플릿', en: 'Templates' },
  'sub.editor.examples':  { ko: '예제 코드', en: 'Examples' },
  'sub.quiz.title':   { ko: '복습 퀴즈', en: 'Review Quiz' },
  'sub.quiz.history': { ko: '풀이 기록', en: 'History' },
  'sub.dash.title':   { ko: '대시보드', en: 'Dashboard' },
  'sub.dash.weekly':  { ko: '주간 리포트', en: 'Weekly report' },

  // ── 퀴즈 / 대시보드 히어로 ──
  'quiz.hero.h2': { ko: '오늘 배운 개념,<br>퀴즈로 확인해 보세요.', en: "Today's concepts,<br>check them with a quiz." },
  'quiz.hero.p':  { ko: '틀린 문제는 AI 튜터가 다시 설명해 드려요.', en: 'The AI tutor re-explains anything you miss.' },
  'dash.hero.h2': { ko: '나의 학습 현황을<br>한눈에 확인하세요.', en: 'See your learning<br>at a glance.' },
  'dash.hero.p':  { ko: '꾸준히 하면 코딩이 마법처럼 쉬워져요.', en: 'Keep at it and coding becomes magically easy.' },

  // ── 튜터 주제 버튼 / 입력 ──
  'topic.html':   { ko: 'HTML 기초', en: 'HTML Basics' },
  'topic.css':    { ko: 'CSS 스타일링', en: 'CSS Styling' },
  'topic.js':     { ko: 'JavaScript', en: 'JavaScript' },
  'topic.layout': { ko: '레이아웃', en: 'Layout' },
  'topic.form':   { ko: '폼 & 입력', en: 'Forms & Input' },
  'tutor.input.ph': { ko: '궁금한 코딩 개념을 물어보세요...', en: 'Ask about any coding concept...' },
  'tutor.send':     { ko: '보내기', en: 'Send' },

  // ── 코드 실습 액션 ──
  'editor.run':   { ko: '▶ 실행', en: '▶ Run' },
  'editor.reset': { ko: '초기화', en: 'Reset' },
  'preview.label':{ ko: '미리보기', en: 'Preview' },

  // ── 대시보드 내보내기 ──
  'dash.export': { ko: '학습 기록 엑셀 다운로드', en: 'Download progress as Excel' },

  // ── 푸터 ──
  'footer.about':   { ko: '회사 안내', en: 'Company' },
  'footer.feedback':{ ko: '회사 위치', en: 'Location' },
  'footer.privacy': { ko: '개인정보처리방침', en: 'Privacy' },
  'footer.legal':   { ko: '© 2026 코드깨비 CodeGGaebi. 코딩이 마법처럼 쉬워지는 경험.', en: '© 2026 CodeGGaebi. Where coding becomes magically easy.' },

  // ── 회원 / 로그인 ──
  'auth.login':  { ko: '로그인', en: 'Log in' },
  'auth.logout': { ko: '로그아웃', en: 'Log out' },
  'auth.name':     { ko: '이름', en: 'Name' },
  'auth.email':    { ko: '이메일', en: 'Email' },
  'auth.password': { ko: '비밀번호', en: 'Password' },
  'auth.name.ph':     { ko: '홍길동', en: 'Your name' },
  'auth.email.ph':    { ko: 'you@example.com', en: 'you@example.com' },
  'auth.password.ph': { ko: '6자 이상', en: 'At least 6 characters' },
  'auth.submit.login':  { ko: '로그인', en: 'Log in' },
  'auth.submit.signup': { ko: '가입하고 시작하기', en: 'Create account' },
  'auth.title.login':  { ko: '로그인', en: 'Log in' },
  'auth.title.signup': { ko: '회원가입', en: 'Sign up' },
  'auth.switch.toSignup': { ko: '계정이 없으신가요?', en: "Don't have an account?" },
  'auth.switch.toLogin':  { ko: '이미 계정이 있으신가요?', en: 'Already have an account?' },
  'auth.switch.signup':   { ko: '회원가입', en: 'Sign up' },
  'auth.switch.login':    { ko: '로그인', en: 'Log in' },
  'auth.demoNote': { ko: '※ 데모용 로그인입니다. 정보는 이 브라우저에만 저장되며 서버로 전송되지 않아요.', en: '※ Demo login. Your info is stored only in this browser and never sent to a server.' },
  'auth.err.fields':  { ko: '모든 항목을 입력해 주세요.', en: 'Please fill in all fields.' },
  'auth.err.email':   { ko: '올바른 이메일을 입력해 주세요.', en: 'Please enter a valid email.' },
  'auth.err.pwlen':   { ko: '비밀번호는 6자 이상이어야 해요.', en: 'Password must be at least 6 characters.' },
  'auth.err.exists':  { ko: '이미 가입된 이메일이에요.', en: 'This email is already registered.' },
  'auth.err.nouser':  { ko: '가입되지 않은 이메일이에요.', en: 'No account found for this email.' },
  'auth.err.wrongpw': { ko: '비밀번호가 일치하지 않아요.', en: 'Incorrect password.' },

  // ── 회원가입 화면 ──
  'signup.title':    { ko: '회원가입', en: 'Create your account' },
  'signup.subtitle': { ko: '30초면 시작할 수 있어요.', en: 'Get started in 30 seconds.' },
  'auth.password2':    { ko: '비밀번호 확인', en: 'Confirm password' },
  'auth.password2.ph': { ko: '비밀번호 재입력', en: 'Re-enter password' },
  'auth.terms':        { ko: '개인정보처리방침에 동의합니다.', en: 'I agree to the Privacy Policy.' },
  'signup.submit':     { ko: '가입하고 시작하기', en: 'Create account' },
  'signup.haveAccount':{ ko: '이미 계정이 있으신가요?', en: 'Already have an account?' },
  'signup.loginLink':  { ko: '로그인', en: 'Log in' },
  'auth.err.pwmismatch': { ko: '비밀번호 확인이 일치하지 않아요.', en: 'Passwords do not match.' },
  'auth.err.terms':      { ko: '약관에 동의해 주세요.', en: 'Please agree to the terms.' }
};

let currentLang = 'ko';

function t(key) {
  const entry = I18N[key];
  if (!entry) return '';
  return entry[currentLang] != null ? entry[currentLang] : entry.ko;
}

function applyLang(lang) {
  currentLang = (lang === 'en') ? 'en' : 'ko';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[key]) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (I18N[key]) el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (I18N[key]) el.setAttribute('placeholder', t(key));
  });

  document.documentElement.setAttribute('lang', currentLang);

  // 토글 버튼: 전환될 언어를 표시
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = currentLang === 'ko' ? 'EN' : '한국어';
    btn.setAttribute('aria-label', currentLang === 'ko' ? 'Switch to English' : '한국어로 전환');
  }

  try { localStorage.setItem(I18N_KEY, currentLang); } catch (e) {}
}

function getLang() { return currentLang; }

function initI18n() {
  let saved = null;
  try { saved = localStorage.getItem(I18N_KEY); } catch (e) {}
  applyLang(saved === 'en' ? 'en' : 'ko');

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'ko' ? 'en' : 'ko');
    });
  }
}
