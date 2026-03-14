//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const screens = document.querySelectorAll(".screen");
const scoreSpan = document.getElementById("score");
const currentQuestionSpan = document.getElementById("question");
const totalQuestionsSpan = document.getElementById("total-questions");
const answersContainer =  document.getElementById("answers");
const progressBar = document.getElementById("progress");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const message = document.getElementById("message");

const questions = [
    {
        question: "what is the capital of algeria",
        answers:[
            {text : "berlin", correct : false},
            {text : "algeirs", correct : true},
            {text : "moscow", correct : false},
            {text : "pékin", correct : false},
        ],
    },
    {
        question: "what's the scientif abrv of water",
        answers:[
            {text: "HCl", correct: false},
            {text: "CH8", correct: false},
            {text: "H2O", correct: true},
            {text: "Fe", correct: false},
        ],
    },
    {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let score = 0;
let currentQuestionIndex = 0;
let answersDisabled = false;
const totalQuestions = questions.length;
maxScore.textContent = totalQuestions;
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
  score = 0;
  currentQuestionIndex = 0;
  screens[0].classList.remove("active");
  screens[1].classList.add("active");
  showQuestion();
}
function showQuestion(){
  answersDisabled = false;
  const currentQuestion = questions[currentQuestionIndex];
  //set span values :
  totalQuestionsSpan.textContent = totalQuestions;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  scoreSpan.textContent = score;

  //progress bar:
  const progressPercent = (currentQuestionIndex/ totalQuestions) *100;
  progressBar.style.width = progressPercent + "%";

  //show question:
  questionText.textContent = currentQuestion.question;

  //clear HTML
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}
function selectAnswer(event){
  if(answersDisabled) return;
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }else if(button === selectedButton){
      selectedButton.classList.add("incorrect");
    }
  })
  if(isCorrect){
    score++;

  }

  setTimeout(() => {
    currentQuestionIndex++;
    //check if there is still more questions
    if(currentQuestionIndex < totalQuestions){
      showQuestion();
    }else{
      screens[1].classList.remove("active");
      screens[2].classList.add("active");
      finalScore.textContent = score;
      const scorePercent = (score/totalQuestions) * 100
      if(scorePercent === 100){
        message.textContent = "WOW, you're a genius";
      }else if(scorePercent >= 80){
        message.textContent = "You're smart, keep learning";
      }else if(scorePercent >= 50){
        message.textContent = "That's good, keep learning";
      }else if(scorePercent >= 20){
        message.textContent = "Not bad, you should work harder";
      }else{
        message.textContent = "Work harder and you'll improve";
      }
    }
  }, 500);
}

function restartQuiz(){
  screens[2].classList.remove("active");
  startQuiz();
}
