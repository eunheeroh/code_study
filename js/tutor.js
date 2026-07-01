/* ═══════════════════════════════════════════════════
   tutor.js — AI 비유 튜터
   
   PRD 핵심: 답을 바로 주지 않고,
   3단계 힌트(비유 → 코드 → 정답)를 순차 제공
═══════════════════════════════════════════════════ */

// ── 내장 비유 데이터 (MVP: 외부 AI API 없이 동작) ──
const TUTOR_DATA = {
  'html': {
    greeting: 'HTML은 웹페이지의 뼈대예요! 궁금한 태그가 있으면 물어보세요.',
    responses: {
      'p': {
        hints: [
          '📖 책에서 한 문단을 떠올려 보세요. 제목 아래 내용이 쭉 이어지는 구간이요.',
          '💡 <code>&lt;p&gt;여기에 글을 씁니다&lt;/p&gt;</code> 이렇게 사용해요.',
          '✅ <strong>&lt;p&gt;</strong>는 <strong>paragraph(문단)</strong>의 약자예요. 하나의 문단을 감쌀 때 사용합니다.'
        ]
      },
      'h1': {
        hints: [
          '📰 신문의 큰 제목을 떠올려 보세요. 가장 눈에 띄는 글씨요!',
          '💡 <code>&lt;h1&gt;가장 큰 제목&lt;/h1&gt;</code>, h1~h6까지 크기가 달라요.',
          '✅ <strong>&lt;h1&gt;</strong>은 <strong>heading 1</strong>이에요. 페이지에서 가장 중요한 제목에 사용합니다.'
        ]
      },
      'a': {
        hints: [
          '🚪 문에 붙어있는 안내 표지판을 떠올려 보세요. 누르면 다른 곳으로 이동하죠!',
          '💡 <code>&lt;a href="url"&gt;클릭!&lt;/a&gt;</code> href에 이동할 주소를 넣어요.',
          '✅ <strong>&lt;a&gt;</strong>는 <strong>anchor(닻)</strong>의 약자예요. 다른 페이지나 위치로 연결하는 링크를 만듭니다.'
        ]
      },
      'img': {
        hints: [
          '🖼️ 액자에 사진을 걸듯, 웹페이지에 이미지를 넣는 거예요.',
          '💡 <code>&lt;img src="사진주소" alt="설명"&gt;</code> 닫는 태그가 없어요!',
          '✅ <strong>&lt;img&gt;</strong>는 <strong>image</strong>예요. src에 경로, alt에 설명을 넣습니다. 셀프 클로징 태그예요.'
        ]
      },
      'div': {
        hints: [
          '📦 큰 택배 상자 안에 작은 상자들을 넣듯, 요소들을 묶는 그릇이에요.',
          '💡 <code>&lt;div class="box"&gt;내용물&lt;/div&gt;</code> class로 구분해요.',
          '✅ <strong>&lt;div&gt;</strong>는 <strong>division(구획)</strong>이에요. 여러 요소를 하나로 묶어 레이아웃을 잡을 때 사용합니다.'
        ]
      }
    }
  },
  'css': {
    greeting: 'CSS는 웹페이지에 옷을 입히는 거예요! 어떤 스타일이 궁금한가요?',
    responses: {
      'margin|padding': {
        hints: [
          '📦 택배 상자를 떠올려 보세요. <strong>padding</strong>은 상자 안의 뽁뽁이(내부 여백), <strong>margin</strong>은 상자와 상자 사이 거리(외부 여백)예요. 그러면 border는 뭘까요?',
          '💡 <code>padding: 20px;</code> → 안쪽 여백, <code>margin: 20px;</code> → 바깥쪽 여백',
          '✅ <strong>margin</strong>은 요소 바깥 여백, <strong>padding</strong>은 요소 안쪽 여백, <strong>border</strong>는 테두리입니다. 이 세 가지를 합쳐 <strong>박스 모델</strong>이라고 해요!'
        ]
      },
      'color|색상|색깔': {
        hints: [
          '🎨 물감 팔레트를 떠올려 보세요. CSS도 색을 골라서 글자나 배경에 칠하는 거예요!',
          '💡 <code>color: red;</code> 글자색, <code>background-color: blue;</code> 배경색',
          '✅ <strong>color</strong>는 글자 색상, <strong>background-color</strong>는 배경 색상이에요. 색상은 이름(red), HEX(#ff0000), RGB(rgb(255,0,0))로 지정할 수 있어요.'
        ]
      },
      'flex|flexbox|레이아웃': {
        hints: [
          '🧲 냉장고에 자석 메모를 붙이는 걸 떠올려 보세요. 가로로 나란히? 세로로 쭉? 방향을 정할 수 있어요!',
          '💡 <code>display: flex;</code>를 부모에 넣으면 자식들이 나란히 정렬돼요.',
          '✅ <strong>Flexbox</strong>는 요소를 유연하게 배치하는 레이아웃이에요. <code>justify-content</code>는 가로 정렬, <code>align-items</code>는 세로 정렬을 담당합니다.'
        ]
      },
      'font|글꼴|폰트': {
        hints: [
          '✏️ 손글씨, 인쇄체, 붓글씨… 글꼴을 바꾸면 분위기가 확 달라지죠!',
          '💡 <code>font-family: "맑은 고딕", sans-serif;</code> 이렇게 지정해요.',
          '✅ <strong>font-family</strong>로 글꼴, <strong>font-size</strong>로 크기, <strong>font-weight</strong>로 굵기를 조절합니다.'
        ]
      }
    }
  },
  'js': {
    greeting: 'JavaScript는 웹페이지에 생명을 불어넣는 거예요! 어떤 개념이 궁금한가요?',
    responses: {
      '변수|variable|let|const': {
        hints: [
          '🏷️ 이름표가 붙은 상자를 떠올려 보세요. 상자에 이름을 붙이고 물건을 넣는 거예요!',
          '💡 <code>let 이름 = "코드깨비";</code> 이름이라는 상자에 "코드깨비"를 넣은 거예요.',
          '✅ <strong>변수</strong>는 데이터를 저장하는 이름 붙은 공간이에요. <code>let</code>은 바꿀 수 있고, <code>const</code>는 한번 정하면 못 바꿔요!'
        ]
      },
      '함수|function': {
        hints: [
          '🎰 자판기를 떠올려 보세요. 동전을 넣으면(입력) 음료가 나오죠(출력). 함수도 같아요!',
          '💡 <code>function 인사() { alert("안녕!"); }</code> 이렇게 만들고 <code>인사();</code>로 실행해요.',
          '✅ <strong>함수</strong>는 특정 작업을 묶어놓은 코드 묶음이에요. 만들어두면 이름만 불러서 반복 사용할 수 있어요!'
        ]
      },
      '이벤트|event|click|클릭': {
        hints: [
          '🔔 초인종을 떠올려 보세요. 누르면(이벤트) 벨이 울리죠(반응). 웹에서도 클릭하면 무언가 일어나요!',
          '💡 <code>btn.addEventListener("click", 함수);</code> 클릭하면 함수가 실행돼요.',
          '✅ <strong>이벤트</strong>는 사용자의 행동(클릭, 입력, 스크롤 등)이에요. <code>addEventListener</code>로 이벤트가 발생하면 실행할 함수를 연결합니다.'
        ]
      }
    }
  },
  'layout': {
    greeting: '레이아웃은 요소들을 어떻게 배치할지 정하는 거예요! Flexbox나 Grid에 대해 물어보세요.',
    responses: {
      'flex|flexbox|플렉스': {
        hints: [
          '🧲 냉장고에 자석 메모를 붙이는 걸 떠올려 보세요. 가로로 나란히? 세로로 쭉? 방향을 정할 수 있어요!',
          '💡 부모에 <code>display: flex;</code>를 넣으면 자식들이 나란히 정렬돼요. <code>justify-content: center;</code>로 가운데 정렬!',
          '✅ <strong>Flexbox</strong>는 1차원 레이아웃이에요. <code>justify-content</code>는 주축(가로), <code>align-items</code>는 교차축(세로) 정렬입니다.'
        ]
      }
    }
  },
  'form': {
    greeting: '폼 태그는 사용자로부터 정보를 입력받는 양식이에요! 궁금한 입력 요소가 있으면 물어보세요.',
    responses: {
      'input|인풋|입력': {
        hints: [
          '📝 종이 신청서의 빈칸을 떠올려 보세요. 이름 적는 칸, 전화번호 적는 칸… 웹에서도 같아요!',
          '💡 <code>&lt;input type="text"&gt;</code>는 한 줄 입력, <code>&lt;textarea&gt;</code>는 여러 줄 입력이에요.',
          '✅ <strong>input</strong>은 type 속성으로 종류를 바꿀 수 있어요. text, password, email, number, checkbox, radio 등 다양해요!'
        ]
      }
    }
  }
};

// 현재 튜터 상태
let currentTopic = 'html';
let conversationHintMap = {}; // { 키워드: 현재 힌트 단계 }

function initTutor() {
  const sendBtn   = document.getElementById('tutor-send-btn');
  const input     = document.getElementById('tutor-input');
  const chatArea  = document.getElementById('tutor-chat-area');
  const topicBtns = document.querySelectorAll('.tutor-topic-bar button');

  // ── 주제 전환 ──
  topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      topicBtns.forEach(b => b.classList.remove('topic-active'));
      btn.classList.add('topic-active');

      const topicId = btn.id.replace('topic-', '');
      currentTopic = topicId;
      conversationHintMap = {};

      // 주제 변경 인사 메시지
      const topicData = TUTOR_DATA[topicId];
      if (topicData) {
        addAiMessage(chatArea, topicData.greeting);
      }
    });
  });

  // ── 메시지 전송 ──
  sendBtn.addEventListener('click', () => handleSend(input, chatArea));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input, chatArea);
    }
  });

  // ── textarea 자동 높이 조절 ──
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
}

function handleSend(input, chatArea) {
  const text = input.value.trim();
  if (!text) return;

  // 사용자 메시지 추가
  addUserMessage(chatArea, text);
  input.value = '';
  input.style.height = 'auto';

  // AI 응답 생성 (약간의 딜레이로 자연스럽게)
  setTimeout(() => {
    const response = generateResponse(text);
    addAiMessage(chatArea, response.message, response.hintStep);
  }, 500);
}

function generateResponse(userText) {
  const topicData = TUTOR_DATA[currentTopic];
  if (!topicData) {
    return {
      message: '이 주제에 대한 학습 내용을 준비 중이에요! 다른 주제를 선택해 보세요.',
      hintStep: null
    };
  }

  const lowerText = userText.toLowerCase();

  // 매칭되는 응답 찾기
  for (const [keywords, data] of Object.entries(topicData.responses)) {
    const keywordList = keywords.split('|');
    const matched = keywordList.some(kw => lowerText.includes(kw.toLowerCase()));

    if (matched) {
      // 힌트 단계 관리
      if (!conversationHintMap[keywords]) {
        conversationHintMap[keywords] = 0;
      }

      const step = conversationHintMap[keywords];
      const hint = data.hints[step];
      const totalSteps = data.hints.length;

      // 다음 단계로 진행
      if (step < totalSteps - 1) {
        conversationHintMap[keywords] = step + 1;
      }

      return {
        message: hint,
        hintStep: { current: step + 1, total: totalSteps }
      };
    }
  }

  // 매칭 안 되면 안내 메시지
  return {
    message: `"${userText}"에 대해 생각해 볼게요! 🤔<br><br>조금 더 구체적으로 질문해 주시면 비유로 쉽게 설명해 드릴 수 있어요.<br>예를 들어 "margin이 뭐야?", "변수가 뭐야?" 처럼요!`,
    hintStep: null
  };
}

function addUserMessage(chatArea, text) {
  const msgId = 'msg-user-' + Date.now();
  const article = document.createElement('article');
  article.className = 'chat-message-user';
  article.id = msgId;
  article.innerHTML = `<div class="chat-bubble-user">${escapeHtml(text)}</div>`;
  chatArea.appendChild(article);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addAiMessage(chatArea, html, hintStep) {
  const msgId = 'msg-ai-' + Date.now();
  const article = document.createElement('article');
  article.className = 'chat-message-ai';
  article.id = msgId;

  let hintHtml = '';
  if (hintStep) {
    const steps = [];
    for (let i = 1; i <= hintStep.total; i++) {
      const labels = ['비유 힌트', '코드 힌트', '정답 설명'];
      const isCurrent = i === hintStep.current;
      steps.push(
        `<span class="hint-step ${isCurrent ? 'hint-current' : ''}">${i}단계 · ${labels[i - 1]}</span>`
      );
    }
    hintHtml = `<div class="hint-steps">${steps.join('')}</div>`;
  }

  article.innerHTML = `
    <div class="chat-avatar">🧙</div>
    <div class="chat-bubble-ai">
      ${html}
      ${hintHtml}
    </div>
  `;

  chatArea.appendChild(article);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 외부에서 특정 주제로 튜터 질문을 보내는 함수
 * (퀴즈 오답 → AI 튜터 연결 시 사용)
 */
function askTutor(topic, question) {
  const chatArea = document.getElementById('tutor-chat-area');

  // 주제 전환
  currentTopic = topic;
  const topicBtns = document.querySelectorAll('.tutor-topic-bar button');
  topicBtns.forEach(b => b.classList.remove('topic-active'));
  const targetBtn = document.getElementById('topic-' + topic);
  if (targetBtn) targetBtn.classList.add('topic-active');

  // 자동 질문
  if (question) {
    addUserMessage(chatArea, question);
    setTimeout(() => {
      const response = generateResponse(question);
      addAiMessage(chatArea, response.message, response.hintStep);
    }, 500);
  }
}
