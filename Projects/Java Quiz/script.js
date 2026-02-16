// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which keyword is used to create an object in Java?",
    answers: [
      { text: "make", correct: false },
      { text: "new", correct: true },
      { text: "create", correct: false },
      { text: "object", correct: false },
    ],
  },
  {
    question: "Which data type is used to store decimal values in Java?",
    answers: [
      { text: "int", correct: false },
      { text: "float", correct: true },
      { text: "char", correct: false },
      { text: "boolean", correct: false },
    ],
  },
  {
    question: "What is the default value of a boolean variable in Java?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "0", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a Java access modifier?",
    answers: [
      { text: "public", correct: false },
      { text: "private", correct: false },
      { text: "protected", correct: false },
      { text: "friendly", correct: true },
    ],
  },
  {
    question: "Which method is the entry point of a Java program?",
    answers: [
      { text: "start()", correct: false },
      { text: "main()", correct: true },
      { text: "run()", correct: false },
      { text: "init()", correct: false },
    ],
  },
  {
    question: "Which OOP concept refers to the ability of a variable to take multiple forms?",
    answers: [
      { text: "Encapsulation", correct: false },
      { text: "Inheritance", correct: false },
      { text: "Polymorphism", correct: true },
      { text: "Abstraction", correct: false },
    ],
  },
  {
    question: "Which of these is used to handle exceptions in Java?",
    answers: [
      { text: "catch", correct: false },
      { text: "try-catch", correct: true },
      { text: "throw", correct: false },
      { text: "final", correct: false },
    ],
  },
  {
    question: "Which package is imported by default in every Java program?",
    answers: [
      { text: "java.util", correct: false },
      { text: "java.io", correct: false },
      { text: "java.lang", correct: true },
      { text: "java.net", correct: false },
    ],
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    answers: [
      { text: "inherits", correct: false },
      { text: "extends", correct: true },
      { text: "implements", correct: false },
      { text: "using", correct: false },
    ],
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    answers: [
      { text: "for loop", correct: false },
      { text: "while loop", correct: false },
      { text: "do-while loop", correct: true },
      { text: "foreach loop", correct: false },
    ],
  },
  {
    question: "What is the size of an int in Java?",
    answers: [
      { text: "8 bits", correct: false },
      { text: "16 bits", correct: false },
      { text: "32 bits", correct: true },
      { text: "64 bits", correct: false },
    ],
  },
  {
    question: "Which keyword prevents a class from being inherited?",
    answers: [
      { text: "final", correct: true },
      { text: "static", correct: false },
      { text: "super", correct: false },
      { text: "abstract", correct: false },
    ],
  },
  {
    question: "Which operator is used for logical AND in Java?",
    answers: [
      { text: "&", correct: false },
      { text: "&&", correct: true },
      { text: "|", correct: false },
      { text: "||", correct: false },
    ],
  },
  {
    question: "Which collection class does NOT allow duplicate elements?",
    answers: [
      { text: "ArrayList", correct: false },
      { text: "LinkedList", correct: false },
      { text: "HashSet", correct: true },
      { text: "Vector", correct: false },
    ],
  },
  {
    question: "Which of the following is not a primitive data type?",
    answers: [
      { text: "byte", correct: false },
      { text: "short", correct: false },
      { text: "String", correct: true },
      { text: "double", correct: false },
    ],
  },
  {
    question: "Which operator is used to compare two values?",
    answers: [
      { text: "=", correct: false },
      { text: "==", correct: true },
      { text: "===", correct: false },
      { text: "!=", correct: false },
    ],
  },
  {
    question: "Which concept wraps data and functions into a single unit?",
    answers: [
      { text: "Polymorphism", correct: false },
      { text: "Encapsulation", correct: true },
      { text: "Inheritance", correct: false },
      { text: "Abstraction", correct: false },
    ],
  },
  {
    question: "What is used to define an interface in Java?",
    answers: [
      { text: "class", correct: false },
      { text: "interface", correct: true },
      { text: "extends", correct: false },
      { text: "implements", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a loop in Java?",
    answers: [
      { text: "for", correct: false },
      { text: "repeat", correct: true },
      { text: "while", correct: false },
      { text: "do-while", correct: false },
    ],
  },
  {
    question: "Which operator is used to allocate memory for an object?",
    answers: [
      { text: "alloc", correct: false },
      { text: "malloc", correct: false },
      { text: "new", correct: true },
      { text: "init", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}