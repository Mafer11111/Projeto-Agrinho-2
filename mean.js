const questions = [
  {
    question: "Qual material demora mais para se decompor?",
    answers: [
      { text: "Papel", correct: false },
      { text: "Vidro", correct: true },
      { text: "Casca de banana", correct: false },
      { text: "Madeira", correct: false }
    ]
  },
  {
    question: "Qual energia é renovável?",
    answers: [
      { text: "Carvão", correct: false },
      { text: "Petróleo", correct: false },
      { text: "Solar", correct: true },
      { text: "Gás natural", correct: false }
    ]
  },
  {
    question: "Qual atitude economiza água?",
    answers: [
      { text: "Banho longo", correct: false },
      { text: "Escovar dentes com torneira aberta", correct: false },
      { text: "Reutilizar água", correct: true },
      { text: "Lavar calçada com mangueira", correct: false }
    ]
  },
  {
    question: "O que significa reciclar?",
    answers: [
      { text: "Jogar lixo na rua", correct: false },
      { text: "Transformar resíduos em novos produtos", correct: true },
      { text: "Queimar lixo", correct: false },
      { text: "Enterrar resíduos", correct: false }
    ]
  },
  {
    question: "Qual gás contribui para o aquecimento global?",
    answers: [
      { text: "Oxigênio", correct: false },
      { text: "Nitrogênio", correct: false },
      { text: "Gás carbônico", correct: true },
      { text: "Hidrogênio", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progressElement = document.querySelector(".progress");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();

  let current = questions[currentQuestion];

  document.getElementById("progress").innerText =
    `Pergunta ${currentQuestion + 1}/${questions.length}`;

  questionElement.innerText = current.question;

  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answersElement.appendChild(button);
  });

  updateProgressBar();
}

function resetState() {
  nextButton.style.display = "none";
  answersElement.innerHTML = "";
}

function selectAnswer(button, correct) {

  clearInterval(timer);

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answersElement.children).forEach(btn => {
    btn.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    timeLeft = 15;
    showQuestion();
    startTimer();
  } else {
    showResult();
  }
});

function startTimer() {

  timerElement.innerText = `⏳ ${timeLeft}`;

  timer = setInterval(() => {

    timeLeft--;

    timerElement.innerText = `⏳ ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";

      Array.from(answersElement.children).forEach(btn => {
        btn.disabled = true;
      });
    }

  }, 1000);
}

function updateProgressBar() {
  let progress = ((currentQuestion + 1) / questions.length) * 100;
  progressElement.style.width = `${progress}%`;
}

function showResult() {

  document.querySelector(".quiz-box").classList.add("hidden");
  document.querySelector(".result-box").classList.remove("hidden");

  document.getElementById("score").innerText =
    `Você acertou ${score} de ${questions.length}`;
}

document.getElementById("save-btn").addEventListener("click", () => {

  const name = document.getElementById("player-name").value;

  if (!name) return;

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({
    name,
    score
  });

  ranking.sort((a, b) => b.score - a.score);

  localStorage.setItem("ranking", JSON.stringify(ranking));

  renderRanking();
});

function renderRanking() {

  const rankingList = document.getElementById("ranking");

  rankingList.innerHTML = "";

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.slice(0, 5).forEach(player => {

    const li = document.createElement("li");

    li.innerText = `${player.name} - ${player.score} pontos`;

    rankingList.appendChild(li);
  });
}

renderRanking();
startQuiz();