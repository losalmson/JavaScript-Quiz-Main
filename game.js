const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progresstext = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 100;
let questionCounter = 0;
let gameQuestions = [];
const maximalQuestions = 4;

let questions = [
  {
    question: "Vilken är Yasin's mest streamade låt ?",
    choice1: "John Snow",
    choice2: "Har Dig",
    choice3: "Trakten",
    choice4: "Chicago",
    answer: 2,
  },

  {
    question: "Vad hette Yasin's kollektiv?",
    choice1: "RMM",
    choice2: "RMH",
    choice3: "BBE",
    choice4: "Top Class Music",
    answer: 3,
  },

  {
    question: "Vad heter projektet som Yasin släppte vid jul?",
    choice1: "En paus från internet",
    choice2: "More To Life",
    choice3: "98.01.11",
    choice4: "Handen Under Mona Lisas Kjol",
    answer: 4,
  },

  {
    question: "Vilket år släpptes Yasin's Chicago?",
    choice1: "2016",
    choice2: "2019",
    choice3: "2018",
    choice4: "2014",
    answer: 3,
  },
];

const startgame = function () {
  questionCounter = 0;
  gameQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = function () {
  if (gameQuestions.length === 0 || questionCounter > maximalQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progresstext.innerText = `Question ${questionCounter} / ${maximalQuestions}`;
  progressBarFull.style.width = `${
    (questionCounter / maximalQuestions) * 100
  }%`;

  const questionsIndex = Math.floor(Math.random() * gameQuestions.length);
  currentQuestion = gameQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  gameQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      removepoints(10);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const removepoints = function (points) {
  score -= points;
  scoreText.innerHTML = score;
};

let count = 100;
let interval = setInterval(function () {
  document.getElementById("count").innerHTML = count;
  count--;
  removepoints(1);
  if (count === 0) {
    clearInterval(interval);

    alert("You're out of time! Please try again !");
  }
}, 1000);

startgame();
