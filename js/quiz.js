/* ═══════════════════════════════════════════════════
   quiz.js — 복습 퀴즈
   
   PRD 핵심: OX, 빈칸채우기, 4지선다
   오답 시 AI 튜터 연결 · 점수 기록
   
   📚 문제 출처: 실제 강의자료 기반
   - HTML5 구조와 시멘틱 태그 (집 짓기 비유)
   - CSS3 선택자·박스모델 (인테리어·택배상자 비유)
   - form 양식 태그 (카페 주문서)
   - JavaScript 기초 (자판기·초인종·기차칸 비유)
   - Flexbox 레이아웃 (냉장고 자석 비유)
═══════════════════════════════════════════════════ */


// ═══════════════════════════════════════════════════
// 문제 은행 — 강의자료 기반 7주제 × 5문항 = 35문항
// ═══════════════════════════════════════════════════
const QUIZ_BANK = {

  // ──────────────────────────────────────
  // 1. HTML5 기본 구조 (집 짓기 비유)
  // ──────────────────────────────────────
  'html-basics': {
    topic: 'html',
    name: 'HTML5 기본 구조',
    questions: [
      {
        type: '4지선다',
        text: '수업에서 HTML을 "집 짓기"에 비유했어요. HTML이 담당하는 역할은 무엇일까요?',
        options: [
          '집의 인테리어(디자인)',
          '집의 뼈대와 구조',
          '집의 전기·기계(동작)',
          '집의 주소(위치)'
        ],
        answer: 1,
        keyword: 'div'
      },
      {
        type: '4지선다',
        text: 'HTML 문서에서 실제 화면에 보이는 내용은 어디에 작성하나요?',
        options: [
          '&lt;head&gt; 안에',
          '&lt;body&gt; 안에',
          '&lt;title&gt; 안에',
          '&lt;meta&gt; 안에'
        ],
        answer: 1,
        keyword: 'div'
      },
      {
        type: 'OX',
        text: '&lt;img&gt; 태그에는 닫는 태그(&lt;/img&gt;)가 필요하다.',
        answer: false,
        keyword: 'img'
      },
      {
        type: '빈칸채우기',
        text: '다른 페이지로 이동하는 링크를 만드는 태그는 &lt;___&gt; 이고, 이동할 주소는 href 속성에 넣습니다.',
        answer: 'a',
        keyword: 'a'
      },
      {
        type: '4지선다',
        text: '문단(paragraph)을 나타내는 HTML 태그는 무엇일까요?',
        options: [
          '&lt;h1&gt;',
          '&lt;p&gt;',
          '&lt;div&gt;',
          '&lt;span&gt;'
        ],
        answer: 1,
        keyword: 'p'
      }
    ]
  },

  // ──────────────────────────────────────
  // 2. HTML5 시멘틱 태그 (건물 용도별 공간)
  // ──────────────────────────────────────
  'html-semantic': {
    topic: 'html',
    name: '시멘틱 태그',
    questions: [
      {
        type: '4지선다',
        text: '시멘틱 태그를 "건물의 용도별 공간"에 비유했어요. &lt;nav&gt; 태그는 건물의 어디에 해당할까요?',
        options: [
          '건물 간판, 현관',
          '복도의 안내판',
          '거실 (핵심 공간)',
          '1층 안내 데스크'
        ],
        answer: 1,
        keyword: 'div'
      },
      {
        type: '4지선다',
        text: '웹페이지의 주된 내용을 감싸는 시멘틱 태그로, 한 페이지에 하나만 사용해야 하는 것은?',
        options: [
          '&lt;section&gt;',
          '&lt;article&gt;',
          '&lt;main&gt;',
          '&lt;div&gt;'
        ],
        answer: 2,
        keyword: 'div'
      },
      {
        type: 'OX',
        text: '&lt;div&gt; 태그만으로도 시멘틱 태그와 똑같이 생긴 페이지를 만들 수 있다.',
        answer: true,
        keyword: 'div'
      },
      {
        type: '빈칸채우기',
        text: '웹페이지의 로고, 사이트 이름이 들어가는 시멘틱 태그는 &lt;___&gt; 입니다. 건물의 "간판"에 해당해요.',
        answer: 'header',
        keyword: 'div'
      },
      {
        type: '4지선다',
        text: '시멘틱 태그를 사용하면 좋은 이유가 아닌 것은?',
        options: [
          '검색엔진(구글)이 페이지 내용을 더 잘 이해할 수 있다',
          '화면 읽기 프로그램(스크린 리더)이 구조를 파악할 수 있다',
          '웹페이지 로딩 속도가 10배 빨라진다',
          '코드를 읽는 개발자가 구조를 빠르게 파악할 수 있다'
        ],
        answer: 2,
        keyword: 'div'
      }
    ]
  },

  // ──────────────────────────────────────
  // 3. CSS3 기초·선택자 (인테리어 비유)
  // ──────────────────────────────────────
  'css-selector': {
    topic: 'css',
    name: 'CSS 선택자',
    questions: [
      {
        type: '4지선다',
        text: '수업에서 CSS를 무엇에 비유했을까요?',
        options: [
          '집의 뼈대(구조)',
          '집의 인테리어(벽지, 페인트, 가구 배치)',
          '집의 전기·기계(동작)',
          '집의 설계도면'
        ],
        answer: 1,
        keyword: 'color'
      },
      {
        type: '4지선다',
        text: '강의에서 배운 CSS를 HTML에 연결하는 3가지 방법 중, 실무에서 가장 추천하는 방법은?',
        options: [
          '인라인(inline) — 태그 안에 직접',
          '내부(internal) — &lt;head&gt; 안에 &lt;style&gt;',
          '외부(external) — 별도 .css 파일로 분리',
          '자바스크립트로 동적 삽입'
        ],
        answer: 2,
        keyword: 'color'
      },
      {
        type: '빈칸채우기',
        text: 'CSS에서 클래스 선택자는 ___(점/마침표) 기호를 사용하고, 아이디 선택자는 #(샵) 기호를 사용합니다.',
        answer: '.',
        acceptAlso: ['점', '마침표', 'dot', '.'],
        keyword: 'color'
      },
      {
        type: 'OX',
        text: 'CSS 기본 문법은 "선택자 { 속성: 값; }" 형태이다.',
        answer: true,
        keyword: 'color'
      },
      {
        type: '4지선다',
        text: '다음 CSS 코드를 읽어보세요: <code>.intro { color: gray; }</code> — 이 코드의 의미는?',
        options: [
          'id가 intro인 요소의 글자색을 회색으로',
          'class가 intro인 요소의 글자색을 회색으로',
          '모든 intro 태그의 배경색을 회색으로',
          'intro라는 이름의 글꼴을 회색으로'
        ],
        answer: 1,
        keyword: 'color'
      }
    ]
  },

  // ──────────────────────────────────────
  // 4. CSS 박스 모델 (택배 상자 비유)
  // ──────────────────────────────────────
  'css-box': {
    topic: 'css',
    name: 'CSS 박스 모델',
    questions: [
      {
        type: '4지선다',
        text: '강의에서 CSS 박스 모델을 "택배 상자"에 비유했어요. padding에 해당하는 것은?',
        options: [
          '상자와 상자 사이 거리',
          '상자의 테두리(겉면)',
          '상자 안의 뽁뽁이(내부 여백)',
          '상자 안의 물건(내용물)'
        ],
        answer: 2,
        keyword: 'margin'
      },
      {
        type: '4지선다',
        text: '강의의 박스 모델 기억법에서 margin은 무엇에 비유되었나요?',
        options: [
          '울타리 안 마당',
          '내 울타리(테두리)',
          '나와 남의 거리(바깥 여백)',
          '집 안의 가구'
        ],
        answer: 2,
        keyword: 'margin'
      },
      {
        type: 'OX',
        text: 'margin은 요소의 안쪽 여백이다.',
        answer: false,
        keyword: 'margin'
      },
      {
        type: '빈칸채우기',
        text: '요소의 모서리를 둥글게 만드는 CSS 속성은 border-___입니다.',
        answer: 'radius',
        keyword: 'margin'
      },
      {
        type: '4지선다',
        text: 'box-sizing: border-box;를 설정하면 width에 무엇이 포함되나요?',
        options: [
          'margin까지 모두 포함',
          'padding과 border가 포함',
          'padding만 포함',
          '아무것도 포함하지 않음(기본값과 동일)'
        ],
        answer: 1,
        keyword: 'margin'
      }
    ]
  },

  // ──────────────────────────────────────
  // 5. form 양식 태그 (카페 주문서 비유)
  // ──────────────────────────────────────
  'html-form': {
    topic: 'html',
    name: 'form 양식 태그',
    questions: [
      {
        type: '4지선다',
        text: '카페 주문서 실습에서, 고객 이름을 입력받는 데 사용한 태그는?',
        options: [
          '&lt;select&gt;',
          '&lt;textarea&gt;',
          '&lt;input type="text"&gt;',
          '&lt;button&gt;'
        ],
        answer: 2,
        keyword: 'div'
      },
      {
        type: '4지선다',
        text: '카페 주문서에서 "S / M / L" 사이즈 중 하나만 선택해야 할 때 사용하는 입력 타입은?',
        options: [
          'checkbox (체크박스)',
          'radio (라디오 버튼)',
          'select (드롭다운)',
          'text (텍스트 입력)'
        ],
        answer: 1,
        keyword: 'div'
      },
      {
        type: 'OX',
        text: '체크박스(checkbox)는 여러 개를 동시에 선택할 수 있고, 라디오(radio) 버튼은 하나만 선택할 수 있다.',
        answer: true,
        keyword: 'div'
      },
      {
        type: '빈칸채우기',
        text: '사용자가 여러 줄의 긴 글을 입력할 수 있는 태그는 &lt;___&gt; 입니다. 카페 주문서의 "요청사항"에 사용했어요.',
        answer: 'textarea',
        keyword: 'div'
      },
      {
        type: '4지선다',
        text: '모든 input 요소에 &lt;label&gt;을 연결해야 하는 이유로 가장 적절한 것은?',
        options: [
          '페이지 로딩 속도를 빠르게 하기 위해',
          '배경색을 자동으로 바꾸기 위해',
          '입력칸이 어떤 정보를 넣는 곳인지 알려주고, 접근성을 높이기 위해',
          '비밀번호를 암호화하기 위해'
        ],
        answer: 2,
        keyword: 'div'
      }
    ]
  },

  // ──────────────────────────────────────
  // 6. JS 기초 (자판기·초인종·상자 비유)
  // ──────────────────────────────────────
  'js-variable': {
    topic: 'js',
    name: 'JS 변수·함수·이벤트',
    questions: [
      {
        type: '4지선다',
        text: '강의에서 변수를 무엇에 비유했나요?',
        options: [
          '자판기',
          '초인종',
          '이름표가 붙은 상자',
          '기차 칸'
        ],
        answer: 2,
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의에서 함수(function)를 비유한 것은 무엇일까요? "재료를 넣으면 결과가 나온다"는 비유였어요.',
        options: [
          '택배 상자',
          '자판기',
          '냉장고 자석',
          '빨래 개는 기계'
        ],
        answer: 1,
        keyword: '함수'
      },
      {
        type: 'OX',
        text: 'const로 선언한 변수는 나중에 값을 바꿀 수 있다.',
        answer: false,
        keyword: '변수'
      },
      {
        type: '빈칸채우기',
        text: '강의에서 이벤트를 "초인종"에 비유했어요. 버튼 클릭 이벤트를 연결하는 메서드는 addEventListener("___", 함수) 입니다.',
        answer: 'click',
        keyword: '이벤트'
      },
      {
        type: '4지선다',
        text: '카페 주문서 실습에서, 주문하기 버튼 클릭 시 이름이 비어있으면 "이름을 입력해주세요" 알림을 띄웠어요. 이때 사용한 것은?',
        options: [
          'console.log()',
          'alert()',
          'document.write()',
          'prompt()'
        ],
        answer: 1,
        keyword: '이벤트'
      }
    ]
  },

  // ──────────────────────────────────────
  // 7. Flexbox 레이아웃 (냉장고 자석 비유)
  // ──────────────────────────────────────
  'layout': {
    topic: 'css',
    name: 'Flexbox 레이아웃',
    questions: [
      {
        type: '4지선다',
        text: '강의에서 Flexbox를 무엇에 비유했나요? "가로로 나란히? 세로로 쭉? 방향을 정할 수 있다"고 설명했어요.',
        options: [
          '택배 상자 쌓기',
          '냉장고에 자석 메모 붙이기',
          '빨래 널기',
          '책꽂이 정리'
        ],
        answer: 1,
        keyword: 'flex'
      },
      {
        type: '4지선다',
        text: 'Flexbox를 사용하려면 부모 요소에 어떤 CSS 속성을 지정해야 하나요?',
        options: [
          'position: flex',
          'display: flex',
          'layout: flex',
          'flex: true'
        ],
        answer: 1,
        keyword: 'flex'
      },
      {
        type: 'OX',
        text: 'justify-content는 주축(기본: 가로) 방향의 정렬을 담당한다.',
        answer: true,
        keyword: 'flex'
      },
      {
        type: '빈칸채우기',
        text: 'Flex 아이템을 세로(교차축) 방향으로 가운데 정렬하는 속성은 ___: center; 입니다.',
        answer: 'align-items',
        keyword: 'flex'
      },
      {
        type: '4지선다',
        text: 'flex-direction: column;을 설정하면 아이템이 어떻게 배치되나요?',
        options: [
          '가로로 나란히',
          '세로로 쌓임',
          '겹쳐서 표시',
          '역순으로 나란히'
        ],
        answer: 1,
        keyword: 'flex'
      }
    ]
  },

  // ──────────────────────────────────────
  // 8. 파이썬 변수와 자료형 (강의자료 PDF)
  // ──────────────────────────────────────
  'py-variable': {
    topic: 'js',
    name: '파이썬 변수와 자료형',
    questions: [
      {
        type: '4지선다',
        text: '강의자료에서 변수를 "값을 기억하기 위한 저장소"라고 설명했어요. 다음 중 올바른 변수명은?',
        options: [
          '7number (숫자로 시작)',
          'my number (공백 포함)',
          '_number (언더바로 시작)',
          'False (예약어)'
        ],
        answer: 2,
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료의 실습코드에서 point = 300.0 의 자료형을 type()으로 확인하면 무엇이 나올까요?',
        options: [
          "&lt;class 'int'&gt;",
          "&lt;class 'float'&gt;",
          "&lt;class 'str'&gt;",
          "&lt;class 'list'&gt;"
        ],
        answer: 1,
        keyword: '변수'
      },
      {
        type: 'OX',
        text: '파이썬에서는 변수의 자료형을 별도로 선언할 필요가 없다. (강의자료 내용)',
        answer: true,
        keyword: '변수'
      },
      {
        type: '빈칸채우기',
        text: '파이썬에서 데이터 타입을 확인하는 함수는 ___() 입니다. (강의자료: "데이터 타입을 확인할 수 있는 함수")',
        answer: 'type',
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료에서 문자열(str)은 따옴표로 감싼다고 배웠어요. 다음 중 오류가 발생하는 것은?',
        options: [
          'name = "홍길동"',
          "name = '홍길동'",
          "name = \"홍길동'",
          'name = "코드깨비"'
        ],
        answer: 2,
        keyword: '변수'
      }
    ]
  },

  // ──────────────────────────────────────
  // 9. 파이썬 산술 연산자 (강의자료 PDF)
  // ──────────────────────────────────────
  'py-operator': {
    topic: 'js',
    name: '파이썬 산술 연산자',
    questions: [
      {
        type: '4지선다',
        text: '강의자료의 산술 연산자 표에서, 5 // 2 의 결과는 무엇일까요?',
        options: ['2.5', '2', '1', '3'],
        answer: 1,
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료에서 % 연산자는 "나머지"를 구한다고 배웠어요. 5 % 2 의 결과는?',
        options: ['2.5', '2', '1', '0'],
        answer: 2,
        keyword: '변수'
      },
      {
        type: 'OX',
        text: '강의자료에 따르면, 5 ** 2 는 거듭제곱으로 결과가 25이다.',
        answer: true,
        keyword: '변수'
      },
      {
        type: '빈칸채우기',
        text: '강의자료의 연산자 표에서, 나누기의 실수 몫을 구하는 연산기호는 ___ 입니다. (예: 5/2 = 2.5)',
        answer: '/',
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료의 실습코드(2-2.py)에서 c = "200", d = "300"일 때 print(c+d)의 결과는?',
        options: ['500', '200300', '"200300"', '오류 발생'],
        answer: 1,
        keyword: '변수'
      }
    ]
  },

  // ──────────────────────────────────────
  // 10. 파이썬 입력과 출력 (강의자료 PDF)
  // ──────────────────────────────────────
  'py-io': {
    topic: 'js',
    name: '파이썬 입력과 출력',
    questions: [
      {
        type: '4지선다',
        text: '강의자료에서 input() 함수로 입력받은 데이터는 어떤 자료형일까요?',
        options: [
          '정수형 (int)',
          '실수형 (float)',
          '문자열형 (str)',
          '입력한 값에 따라 자동 결정'
        ],
        answer: 2,
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료의 커피값 실습(2-3.py)에서, 사용자에게 정수를 입력받기 위해 사용한 코드는?',
        options: [
          'coffee = input("커피값 입력=>")',
          'coffee = int(input("커피값 입력=>"))',
          'coffee = float(input("커피값 입력=>"))',
          'coffee = str(input("커피값 입력=>"))'
        ],
        answer: 1,
        keyword: '변수'
      },
      {
        type: 'OX',
        text: '강의자료에 따르면, print()에서 연결연산자 (+)로 출력할 때는 문자열 데이터 형태만 연결 출력이 가능하다.',
        answer: true,
        keyword: '변수'
      },
      {
        type: '빈칸채우기',
        text: '강의자료의 f 문자열 포매팅에서, age = 20일 때 print(f"나이는 {age}살 입니다.")의 출력 결과에서 빈칸: 나이는 ___살 입니다.',
        answer: '20',
        keyword: '변수'
      },
      {
        type: '4지선다',
        text: '강의자료의 포매팅 코드에서 소수점 둘째 자리까지 표현하는 코드는?',
        options: ['%d', '%s', '%f', '%.2f'],
        answer: 3,
        keyword: '변수'
      }
    ]
  }
};

// ── 퀴즈 상태 ──
let currentQuizId     = null;
let currentQuestions   = [];
let currentIndex       = 0;
let selectedAnswer     = null;
let correctCount       = 0;
let wrongQuestions     = [];

function initQuiz() {
  const topicCards  = document.querySelectorAll('.quiz-topic-card');
  const submitBtn   = document.getElementById('quiz-submit-btn');
  const nextBtn     = document.getElementById('quiz-next-btn');
  const tutorBtn    = document.getElementById('quiz-ask-tutor-btn');
  const retryBtn    = document.getElementById('result-retry-btn');
  const toTutorBtn  = document.getElementById('result-to-tutor-btn');

  // ── 주제 선택 ──
  topicCards.forEach(card => {
    card.addEventListener('click', () => {
      const quizId = card.id.replace('quiz-topic-', '');
      startQuiz(quizId);
    });
  });

  // ── 정답 확인 ──
  submitBtn.addEventListener('click', () => checkAnswer());

  // ── 다음 문제 ──
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // ── AI 튜터로 이동 ──
  tutorBtn.addEventListener('click', () => {
    const q = currentQuestions[currentIndex];
    const quizData = QUIZ_BANK[currentQuizId];
    switchSection('tutor-section');
    askTutor(quizData.topic, q.keyword);
  });

  // ── 다시 풀기 ──
  retryBtn.addEventListener('click', () => startQuiz(currentQuizId));

  // ── 틀린 문제 복습 ──
  toTutorBtn.addEventListener('click', () => {
    const quizData = QUIZ_BANK[currentQuizId];
    const firstWrong = wrongQuestions[0];
    switchSection('tutor-section');
    askTutor(quizData.topic, firstWrong ? firstWrong.keyword : '');
  });
}

function startQuiz(quizId) {
  const quizData = QUIZ_BANK[quizId];
  if (!quizData) return;

  currentQuizId   = quizId;
  currentQuestions = [...quizData.questions];
  currentIndex     = 0;
  selectedAnswer   = null;
  correctCount     = 0;
  wrongQuestions   = [];

  // UI 전환
  document.getElementById('quiz-topic-grid').classList.add('section-hidden');
  const hero = document.querySelector('.quiz-hero');
  if (hero) hero.classList.add('section-hidden');
  document.getElementById('quiz-active-area').classList.remove('section-hidden');
  document.getElementById('quiz-result-area').classList.add('section-hidden');

  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  const total = currentQuestions.length;

  // 진행률
  const progress = ((currentIndex) / total) * 100;
  document.getElementById('quiz-progress-fill').style.width = progress + '%';
  document.getElementById('quiz-progress-text').textContent = `${currentIndex + 1} / ${total}`;

  // 문제 유형 & 텍스트
  document.getElementById('quiz-question-type').textContent = q.type;
  document.getElementById('quiz-question-text').innerHTML = q.text;

  // 선택지 / 입력 영역 초기화
  const optionsEl   = document.getElementById('quiz-options');
  const blankInput  = document.getElementById('quiz-blank-input');
  selectedAnswer = null;
  hideFeedback();

  if (q.type === '4지선다') {
    optionsEl.classList.remove('section-hidden');
    blankInput.classList.add('section-hidden');
    renderOptions(q.options, optionsEl);
  } else if (q.type === 'OX') {
    optionsEl.classList.remove('section-hidden');
    blankInput.classList.add('section-hidden');
    renderOptions(['⭕ 맞다', '❌ 틀리다'], optionsEl);
  } else if (q.type === '빈칸채우기') {
    optionsEl.classList.add('section-hidden');
    blankInput.classList.remove('section-hidden');
    blankInput.value = '';
    blankInput.focus();
  }

  // 버튼 상태
  document.getElementById('quiz-submit-btn').classList.remove('section-hidden');
  document.getElementById('quiz-next-btn').classList.add('section-hidden');
}

function renderOptions(options, container) {
  const markers = ['①', '②', '③', '④'];
  container.innerHTML = options.map((opt, i) => `
    <div class="quiz-option" id="quiz-option-${i + 1}" data-index="${i}">
      <span class="quiz-option-marker">${markers[i]}</span>
      <span>${opt}</span>
    </div>
  `).join('');

  container.querySelectorAll('.quiz-option').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.quiz-option').forEach(o => {
        o.style.borderColor = '';
        o.style.backgroundColor = '';
      });
      el.style.borderColor = 'var(--quiz-accent)';
      el.style.backgroundColor = 'rgba(198, 122, 52, 0.08)';
      selectedAnswer = parseInt(el.dataset.index);
    });
  });
}

function checkAnswer() {
  const q = currentQuestions[currentIndex];
  let isCorrect = false;

  if (q.type === '4지선다') {
    if (selectedAnswer === null) { alert('선택지를 골라주세요!'); return; }
    isCorrect = selectedAnswer === q.answer;
  } else if (q.type === 'OX') {
    if (selectedAnswer === null) { alert('⭕ 또는 ❌를 선택해주세요!'); return; }
    const userAnswer = selectedAnswer === 0;
    isCorrect = userAnswer === q.answer;
  } else if (q.type === '빈칸채우기') {
    const blankInput = document.getElementById('quiz-blank-input');
    const userAnswer = blankInput.value.trim().toLowerCase();
    if (!userAnswer) { alert('정답을 입력해주세요!'); return; }
    const correctAnswer = q.answer.toLowerCase();
    const alsoAccept = q.acceptAlso ? q.acceptAlso.map(a => a.toLowerCase()) : [];
    isCorrect = userAnswer === correctAnswer || alsoAccept.includes(userAnswer);
  }

  if (isCorrect) {
    correctCount++;
    showFeedbackCorrect();
  } else {
    wrongQuestions.push(q);
    showFeedbackWrong(q);
  }

  document.getElementById('quiz-submit-btn').classList.add('section-hidden');
  document.getElementById('quiz-next-btn').classList.remove('section-hidden');
  document.getElementById('quiz-next-btn').textContent =
    currentIndex < currentQuestions.length - 1 ? '다음 문제' : '결과 보기';

  saveQuizRecord();
}

function showFeedbackCorrect() {
  document.getElementById('quiz-feedback-correct').classList.remove('section-hidden');
  document.getElementById('quiz-feedback-wrong').classList.add('section-hidden');
}

function showFeedbackWrong(q) {
  document.getElementById('quiz-feedback-correct').classList.add('section-hidden');
  const wrongEl = document.getElementById('quiz-feedback-wrong');
  wrongEl.classList.remove('section-hidden');

  let correctText = '';
  if (q.type === '4지선다') {
    const markers = ['①', '②', '③', '④'];
    correctText = markers[q.answer] + ' ' + q.options[q.answer];
  } else if (q.type === 'OX') {
    correctText = q.answer ? '⭕ 맞다' : '❌ 틀리다';
  } else if (q.type === '빈칸채우기') {
    correctText = q.answer;
  }
  document.getElementById('quiz-correct-answer').textContent = correctText;
}

function hideFeedback() {
  document.getElementById('quiz-feedback-correct').classList.add('section-hidden');
  document.getElementById('quiz-feedback-wrong').classList.add('section-hidden');
}

function showResult() {
  const total = currentQuestions.length;
  const score = Math.round((correctCount / total) * 100);

  document.getElementById('quiz-active-area').classList.add('section-hidden');
  document.getElementById('quiz-result-area').classList.remove('section-hidden');
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-detail').textContent =
    `${total}문항 중 ${correctCount}문항 정답 · 정답률 ${score}%`;

  saveQuizComplete(score);
}

// ── localStorage 기록 ──
function saveQuizRecord() {
  try {
    const records = JSON.parse(localStorage.getItem('codegaebi_quiz_records') || '[]');
    localStorage.setItem('codegaebi_quiz_records', JSON.stringify(records));
  } catch (e) { /* 무시 */ }
}

function saveQuizComplete(score) {
  try {
    const records = JSON.parse(localStorage.getItem('codegaebi_quiz_records') || '[]');
    records.push({
      quizId: currentQuizId,
      quizName: QUIZ_BANK[currentQuizId].name,
      score, correct: correctCount,
      total: currentQuestions.length,
      wrong: wrongQuestions.map(q => q.keyword),
      date: new Date().toISOString()
    });
    localStorage.setItem('codegaebi_quiz_records', JSON.stringify(records));
  } catch (e) { /* 무시 */ }
}

function getQuizRecords() {
  try {
    return JSON.parse(localStorage.getItem('codegaebi_quiz_records') || '[]');
  } catch (e) {
    return [];
  }
}
