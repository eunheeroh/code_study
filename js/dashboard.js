/* ═══════════════════════════════════════════════════
   dashboard.js — 학습 대시보드
   
   PRD 핵심: 학습 시간, 퀴즈 점수, 주제별 이해도,
   연속 학습 일수, 성취 배지, 엑셀 내보내기
═══════════════════════════════════════════════════ */


function initDashboard() {
  const exportBtn = document.getElementById('export-xlsx-btn');

  // ── 엑셀 다운로드 ──
  exportBtn.addEventListener('click', () => {
    exportToCSV();
  });

  // ── 대시보드 데이터 초기 로드 ──
  updateDashboard();

  // 대시보드 섹션이 활성화될 때마다 데이터 갱신
  const observer = new MutationObserver(() => {
    const section = document.getElementById('dashboard-section');
    if (section && !section.classList.contains('section-hidden')) {
      updateDashboard();
    }
  });

  const dashSection = document.getElementById('dashboard-section');
  if (dashSection) {
    observer.observe(dashSection, { attributes: true, attributeFilter: ['class'] });
  }
}

function updateDashboard() {
  const records   = getQuizRecords();
  const loginData = getLoginData();

  updateStats(records, loginData);
  updateProgress(records);
  updateBadges(records, loginData);
}

// ═══════════════════════════════════════════════════
// 통계 카드 업데이트
// ═══════════════════════════════════════════════════
function updateStats(records, loginData) {
  // 총 학습 시간 (접속 기록 기반 추정)
  const totalMinutes = loginData.totalMinutes || 0;
  const hours = Math.floor(totalMinutes / 60);
  const mins  = totalMinutes % 60;
  const statTime = document.querySelector('#stat-total-time .stat-value');
  const statTimeSub = document.querySelector('#stat-total-time .stat-sub');
  if (statTime) {
    statTime.textContent = totalMinutes > 0 ? `${hours}h ${mins}m` : '0h';
  }
  if (statTimeSub) {
    statTimeSub.textContent = `오늘 접속 ${loginData.todayCount || 0}회`;
  }

  // 퀴즈 평균 점수
  const recentRecords = records.slice(-5);
  const avgScore = recentRecords.length > 0
    ? Math.round(recentRecords.reduce((sum, r) => sum + r.score, 0) / recentRecords.length)
    : 0;
  const statQuiz = document.querySelector('#stat-quiz-avg .stat-value');
  const statQuizSub = document.querySelector('#stat-quiz-avg .stat-sub');
  if (statQuiz) statQuiz.textContent = avgScore || '-';
  if (statQuizSub) statQuizSub.textContent = `최근 ${recentRecords.length}회 기준`;

  // 연속 학습 일수
  const streak = loginData.currentStreak || 0;
  const maxStreak = loginData.maxStreak || 0;
  const statStreak = document.querySelector('#stat-streak .stat-value');
  const statStreakSub = document.querySelector('#stat-streak .stat-sub');
  if (statStreak) statStreak.textContent = `${streak}일`;
  if (statStreakSub) statStreakSub.textContent = `최고 기록 ${maxStreak}일`;

  // 완료 주제
  const completedTopics = getCompletedTopics(records);
  const totalTopics = 10; // 현재 10개 주제
  const statCompleted = document.querySelector('#stat-completed .stat-value');
  if (statCompleted) statCompleted.textContent = `${completedTopics.size}/${totalTopics}`;
}

// ═══════════════════════════════════════════════════
// 주제별 이해도 업데이트
// ═══════════════════════════════════════════════════
function updateProgress(records) {
  const topicScores = {
    'html': { el: 'progress-html', scores: [] },
    'css':  { el: 'progress-css', scores: [] },
    'js':   { el: 'progress-js', scores: [] },
    'layout': { el: 'progress-layout', scores: [] }
  };

  // 주제별 퀴즈 기록 수집
  const topicMapping = {
    'html-basics': 'html',
    'html-semantic': 'html',
    'html-form': 'html',
    'css-selector': 'css',
    'css-box': 'css',
    'js-variable': 'js',
    'py-variable': 'js',
    'py-operator': 'js',
    'py-io': 'js',
    'layout': 'layout'
  };

  records.forEach(r => {
    const topic = topicMapping[r.quizId];
    if (topic && topicScores[topic]) {
      topicScores[topic].scores.push(r.score);
    }
  });

  // 프로그레스 바 업데이트
  Object.entries(topicScores).forEach(([topic, data]) => {
    const el = document.getElementById(data.el);
    if (!el) return;

    const avg = data.scores.length > 0
      ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
      : 0;

    const labelSpan = el.querySelector('.topic-progress-label span:last-child');
    const fillEl    = el.querySelector('.topic-progress-fill');

    if (labelSpan) labelSpan.textContent = `${avg}%`;

    if (fillEl) {
      fillEl.style.width = `${avg}%`;
      fillEl.className = 'topic-progress-fill';
      if (avg >= 80)      fillEl.classList.add('progress-high');
      else if (avg >= 50) fillEl.classList.add('progress-mid');
      else                fillEl.classList.add('progress-low');
    }
  });
}

// ═══════════════════════════════════════════════════
// 성취 배지 업데이트
// ═══════════════════════════════════════════════════
function updateBadges(records, loginData) {
  const badges = {
    'badge-first-login':   loginData.totalVisits > 0,
    'badge-3day-streak':   (loginData.maxStreak || 0) >= 3,
    'badge-quiz-perfect':  records.some(r => r.score === 100),
    'badge-7day-streak':   (loginData.maxStreak || 0) >= 7,
    'badge-all-topics':    getCompletedTopics(records).size >= 10
  };

  Object.entries(badges).forEach(([id, unlocked]) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (unlocked) {
      el.classList.remove('badge-locked');
    } else {
      el.classList.add('badge-locked');
    }
  });
}

// ═══════════════════════════════════════════════════
// 접속 기록 관리
// ═══════════════════════════════════════════════════
function getLoginData() {
  try {
    const data = JSON.parse(localStorage.getItem('codegaebi_login') || '{}');
    return data;
  } catch (e) {
    return {};
  }
}

function recordLogin() {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const data = getLoginData();

    // 총 방문 수
    data.totalVisits = (data.totalVisits || 0) + 1;

    // 오늘 접속 횟수
    if (data.lastDate === today) {
      data.todayCount = (data.todayCount || 0) + 1;
    } else {
      data.todayCount = 1;
    }

    // 총 학습 시간 (접속당 약 5분으로 추정)
    data.totalMinutes = (data.totalMinutes || 0) + 5;

    // 연속 학습 일수 계산
    if (data.lastDate) {
      const lastDate = new Date(data.lastDate);
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // 어제 접속했으면 연속 +1
        data.currentStreak = (data.currentStreak || 1) + 1;
      } else if (diffDays === 0) {
        // 같은 날 재접속 → 유지
      } else {
        // 하루 이상 빠졌으면 리셋
        data.currentStreak = 1;
      }
    } else {
      data.currentStreak = 1;
    }

    data.maxStreak = Math.max(data.maxStreak || 0, data.currentStreak || 1);
    data.lastDate = today;

    localStorage.setItem('codegaebi_login', JSON.stringify(data));
    return data;
  } catch (e) {
    return {};
  }
}

// ═══════════════════════════════════════════════════
// 완료 주제 계산
// ═══════════════════════════════════════════════════
function getCompletedTopics(records) {
  const completed = new Set();
  // 특정 주제에서 70% 이상이면 완료로 간주
  records.forEach(r => {
    if (r.score >= 70) {
      completed.add(r.quizId);
    }
  });
  return completed;
}

// ═══════════════════════════════════════════════════
// 엑셀(CSV) 내보내기
// ═══════════════════════════════════════════════════
function exportToCSV() {
  const records = getQuizRecords();

  if (records.length === 0) {
    alert('아직 퀴즈 기록이 없어요! 퀴즈를 먼저 풀어보세요.');
    return;
  }

  // CSV 헤더
  const headers = ['날짜', '퀴즈 주제', '점수', '정답 수', '총 문항', '틀린 키워드'];

  // CSV 행
  const rows = records.map(r => {
    const date = new Date(r.date).toLocaleDateString('ko-KR');
    const wrong = r.wrong ? r.wrong.join(', ') : '';
    return [date, r.quizName, r.score, r.correct, r.total, wrong];
  });

  // CSV 문자열 생성 (BOM 포함 → 엑셀에서 한국어 정상 표시)
  const BOM = '\uFEFF';
  const csvContent = BOM + [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // 파일 다운로드
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `코드깨비_학습기록_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
