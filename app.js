// ============================================================
//  EduAI – App Logic
// ============================================================

/* ---- DATE DISPLAY ---- */
const dateEl = document.getElementById('dateDisplay');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

/* ---- SIDEBAR NAVIGATION ---- */
const navItems = document.querySelectorAll('.nav-item');
const panels   = document.querySelectorAll('.panel');
const pageTitle = document.getElementById('pageTitle');

const panelTitles = {
  teacher: 'Teacher Dashboard',
  student: 'Student Portal',
  admin:   'Admin Panel',
  ai:      'AI Insights'
};

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.dataset.panel;

    navItems.forEach(n => n.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    item.classList.add('active');
    document.getElementById('panel-' + target).classList.add('active');
    pageTitle.textContent = panelTitles[target] || target;

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

/* ---- MOBILE MENU TOGGLE ---- */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ---- HEATMAP GENERATION ---- */
const heatmapGrid = document.getElementById('heatmapGrid');
const names = ['S1','S2','S3','S4','S5','S6','S7','S8',
                'S9','S10','S11','S12','S13','S14','S15','S16',
                'S17','S18','S19','S20','S21','S22','S23','S24',
                'S25','S26','S27','S28','S29','S30','S31','S32'];

function makeHeatmap() {
  if (!heatmapGrid) return;
  heatmapGrid.innerHTML = '';
  names.forEach((name, i) => {
    const cell = document.createElement('div');
    const r = Math.random();
    const cls = r < 0.25 ? 'heat-low' : r < 0.55 ? 'heat-mid' : 'heat-high';
    cell.className = 'heat-cell ' + cls;
    cell.textContent = name;
    cell.title = name + ': ' + (cls === 'heat-high' ? 'High' : cls === 'heat-mid' ? 'Medium' : 'Low') + ' engagement';
    heatmapGrid.appendChild(cell);
  });
}
makeHeatmap();
// Auto-refresh heatmap every 5s to simulate live data
setInterval(makeHeatmap, 5000);

/* ---- WEEKLY BAR CHART ---- */
const barChart = document.getElementById('barChart');
const weekData = [72, 68, 80, 75, 82, 60, 55];

function makeBarChart() {
  if (!barChart) return;
  barChart.innerHTML = '';
  const max = Math.max(...weekData);
  weekData.forEach(val => {
    const bar = document.createElement('div');
    bar.className = 'bar-col';
    bar.style.height = (val / max * 100) + '%';
    bar.setAttribute('data-val', val + '%');
    barChart.appendChild(bar);
  });
}
makeBarChart();

/* ---- QUIZ ENGINE ---- */
const quizData = [
  {
    q: 'What are the roots of x² - 5x + 6 = 0?',
    options: ['x = 2, 3', 'x = -2, -3', 'x = 1, 6', 'x = -1, 6'],
    answer: 0,
    explanation: '✅ Correct! Factor as (x-2)(x-3)=0, giving x=2 and x=3.'
  },
  {
    q: 'The discriminant of a quadratic ax²+bx+c is:',
    options: ['b²+4ac', 'b²-4ac', '√(b²-4ac)', '2a'],
    answer: 1,
    explanation: '✅ Correct! Discriminant = b² - 4ac determines the nature of roots.'
  },
  {
    q: 'If the discriminant < 0, the roots are:',
    options: ['Real & equal', 'Real & distinct', 'Complex/imaginary', 'Rational'],
    answer: 2,
    explanation: '✅ Correct! Negative discriminant means no real roots — they are complex.'
  },
  {
    q: 'Solve: 2x² - 8 = 0',
    options: ['x = ±2', 'x = ±4', 'x = 2 only', 'x = 0'],
    answer: 0,
    explanation: '✅ Correct! 2x² = 8 → x² = 4 → x = ±2.'
  }
];

let currentQ = 0;
let answered  = false;

function renderQuestion() {
  const q = quizData[currentQ];
  document.getElementById('quizQuestion').textContent = (currentQ + 1) + '. ' + q.q;
  document.getElementById('quizCounter').textContent = 'Question ' + (currentQ + 1) + ' / ' + quizData.length;
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').style.color = '';
  document.getElementById('nextQuizBtn').style.display = 'none';
  answered = false;

  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(idx));
    optContainer.appendChild(btn);
  });
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = quizData[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQuizBtn');

  opts.forEach(o => o.classList.add('disabled'));
  opts[q.answer].classList.add('correct');

  if (idx === q.answer) {
    feedback.textContent = q.explanation;
    feedback.style.color = '#16a34a';
    showToast('🎉 Correct answer!');
  } else {
    opts[idx].classList.add('wrong');
    feedback.textContent = '❌ Not quite. ' + q.explanation.replace('✅ Correct! ', '');
    feedback.style.color = '#dc2626';
    showToast('💡 Keep practicing!');
  }

  if (currentQ < quizData.length - 1) {
    nextBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = '🔄 Restart';
  }
}

function nextQuestion() {
  if (currentQ < quizData.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    currentQ = 0;
    document.getElementById('nextQuizBtn').textContent = 'Next →';
    renderQuestion();
    showToast('✅ Quiz complete! Starting over.');
  }
}

renderQuestion();

/* ---- CHATBOT ---- */
const botResponses = {
  default: [
    "That's a great question! Let me help you understand it better.",
    "I'd recommend reviewing the concept from the beginning. Would you like a short summary?",
    "This is a common doubt. The key idea here is to break the problem into smaller steps.",
    "Try working through a simpler example first. That usually helps!",
    "Check out the recommended videos in your portal — they cover this topic clearly."
  ],
  quadratic: [
    "For quadratic equations, always check the discriminant first: b²-4ac tells you the nature of roots.",
    "Remember the quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
    "Factoring is often faster than the formula when the roots are integers."
  ],
  algebra: [
    "In algebra, isolate the variable step by step. What's the equation you're working on?",
    "Remember that whatever you do to one side, you must do to the other!"
  ],
  formula: [
    "Which formula are you looking for? Type the topic (e.g. 'quadratic formula', 'area of circle').",
    "Here's a tip: keep a formula sheet and review it before every quiz."
  ]
};

function getChatResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('quadratic') || m.includes('discriminant')) return pick(botResponses.quadratic);
  if (m.includes('algebra') || m.includes('equation'))       return pick(botResponses.algebra);
  if (m.includes('formula'))                                  return pick(botResponses.formula);
  return pick(botResponses.default);
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function sendChat() {
  const input = document.getElementById('chatInput');
  const win   = document.getElementById('chatWindow');
  const text  = input.value.trim();
  if (!text) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = text;
  win.appendChild(userMsg);

  input.value = '';
  win.scrollTop = win.scrollHeight;

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.textContent = 'Thinking…';
  win.appendChild(typing);
  win.scrollTop = win.scrollHeight;

  setTimeout(() => {
    typing.textContent = getChatResponse(text);
    win.scrollTop = win.scrollHeight;
  }, 800);
}

function chatKeydown(e) {
  if (e.key === 'Enter') sendChat();
}

/* ---- ADMIN CHARTS ---- */
const resources = [
  { label: 'Smart Boards', val: 85 },
  { label: 'Lab Computers', val: 70 },
  { label: 'Library Books', val: 50 },
  { label: 'AI Licenses', val: 90 },
  { label: 'Projectors', val: 60 }
];

function makeResourceBars() {
  const el = document.getElementById('resourceBars');
  if (!el) return;
  el.innerHTML = resources.map(r => `
    <div class="res-item">
      <span class="res-label">${r.label}</span>
      <div class="res-bar-wrap">
        <div class="res-bar" style="width:${r.val}%"></div>
      </div>
      <span class="res-val">${r.val}%</span>
    </div>
  `).join('');
}

const attendData = [
  { label: 'Grade 8', val: 88 },
  { label: 'Grade 9', val: 79 },
  { label: 'Grade 10', val: 94 },
  { label: 'Grade 11', val: 97 },
  { label: 'Grade 12', val: 91 }
];

function makeAttendanceBars() {
  const el = document.getElementById('attendanceBars');
  if (!el) return;
  el.innerHTML = attendData.map(a => `
    <div class="att-item">
      <span class="att-label">${a.label}</span>
      <div class="att-bar-wrap">
        <div class="att-bar" style="width:${a.val}%; background:${a.val >= 90 ? '#22c55e' : a.val >= 80 ? '#eab308' : '#ef4444'};"></div>
      </div>
      <span class="att-val">${a.val}%</span>
    </div>
  `).join('');
}

makeResourceBars();
makeAttendanceBars();

/* ---- NUDGE ACTION ---- */
function sendNudge(btn) {
  const item = btn.closest('.alert-item');
  const name = item.querySelector('.alert-name').textContent;
  btn.textContent = '✅ Sent';
  btn.disabled = true;
  btn.style.background = '#dcfce7';
  btn.style.color = '#16a34a';
  showToast('📨 Nudge sent to ' + name);
}

/* ---- ALERT REFRESH ---- */
function refreshAlerts() {
  showToast('🔄 Alerts refreshed');
  // In a real app, this would fetch from the server
}

/* ---- EXPORT REPORT ---- */
function exportReport() {
  showToast('📥 Report exported as PDF');
}

/* ---- TOAST NOTIFICATION ---- */
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity .4s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
