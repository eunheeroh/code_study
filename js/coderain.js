/* ═══════════════════════════════════════════════════
   coderain.js — 코드가 떠다니는 애니메이션 (랜덤 · 느리게)

   홈 히어로 배경에 코드 조각들이 각자 무작위 방향으로
   아주 천천히 떠다닙니다. 텍스트 뒤에 은은하게 깔립니다.
═══════════════════════════════════════════════════ */

function initCodeRain() {
  const canvas = document.getElementById('code-rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 움직임 최소화 선호 시 실행 안 함
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // 떠다닐 코드 조각들
  const SNIPPETS = [
    'const x = 10;', 'function() {}', 'if (a > b) {', 'return true;',
    'let sum = 0;', 'for (i=0; i<n)', 'console.log()', 'arr.map(fn)',
    '<div></div>', '</html>', '=> { }', 'margin: 0;', 'flex: 1;',
    '#0066cc', 'color: #fff', 'padding: 8px', 'addEventListener',
    'querySelector', 'className', 'true || false', 'x === y',
    'import { } ', 'export default', 'async ()', 'await fetch()'
  ];

  const FONT = 16;
  const COLORS = [
    'rgba(0, 120, 220, ',   // 브랜드 블루
    'rgba(130, 205, 255, ', // 밝은 시안
    'rgba(124, 92, 231, '   // 퍼플
  ];

  let W = 0, H = 0, dpr = 1;
  let particles = [];

  function makeParticle() {
    const speed = 0.12 + Math.random() * 0.35;   // 아주 느리게
    const angle = Math.random() * Math.PI * 2;    // 무작위 방향
    const text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      text: text,
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      a: 0.22 + Math.random() * 0.4,   // 투명도
      color: color,
      w: ctx.measureText(text).width
    };
  }

  function setup() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return false;
    W = w; H = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = FONT + "px 'SF Mono', 'Consolas', monospace";

    const count = Math.max(12, Math.min(48, Math.round((w * h) / 22000)));
    particles = [];
    for (let i = 0; i < count; i++) particles.push(makeParticle());
    return true;
  }

  let ready = setup();
  let last = 0;

  function frame(ts) {
    requestAnimationFrame(frame);

    // 홈이 화면에 없으면(다른 탭) 그리지 않음
    if (canvas.offsetParent === null) return;

    // 크기 변화 감지 or 최초 준비
    if (!ready || canvas.clientWidth !== W || canvas.clientHeight !== H) {
      ready = setup();
      if (!ready) return;
    }

    // 약 30fps로 제한
    if (ts - last < 33) return;
    last = ts;

    ctx.clearRect(0, 0, W, H);
    ctx.font = FONT + "px 'SF Mono', 'Consolas', monospace";
    ctx.textBaseline = 'middle';

    const M = 40; // 화면 밖 여유 (부드러운 랩어라운드)
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // 가장자리를 벗어나면 반대편에서 다시 등장
      if (p.x > W + M) p.x = -p.w - M;
      else if (p.x + p.w < -M) p.x = W + M;
      if (p.y > H + M) p.y = -M;
      else if (p.y < -M) p.y = H + M;

      ctx.fillStyle = p.color + p.a.toFixed(3) + ')';
      ctx.fillText(p.text, p.x, p.y);
    }
  }

  requestAnimationFrame(frame);
  window.addEventListener('resize', () => { ready = setup(); });
}
