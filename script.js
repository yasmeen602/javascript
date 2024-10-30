const questions = [
    {
        question: "What is the size of int in Java?",
        answers: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
        correct: "4 bytes"
    },
    {
        question: "Which method is used to start a thread?",
        answers: ["run", "start", "execute", "init"],
        correct: "start"
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        answers: ["implements", "extends", "inherits", "super"],
        correct: "extends"
    },
    {
        question: "What is the default value of a boolean in Java?",
        answers: ["0", "true", "null", "false"],
        correct: "false"
    },
    {
        question: "Which package is imported by default in every Java program?",
        answers: ["java.util", "java.io", "java.lang", "java.net"],
        correct: "java.lang"
    },
    {
        question: "What is the range of byte data type in Java?",
        answers: ["0 to 255", "-128 to 127", "-32768 to 32767", "-2147483648 to 2147483647"],
        correct: "-128 to 127"
    },
    {
        question: "Which operator is used to compare two values in Java?",
        answers: ["=", "==", "equals", "==="],
        correct: "=="
    },
    {
        question: "How do you declare a constant in Java?",
        answers: ["const", "let", "define", "final"],
        correct: "final"
    },
    {
        question: "Which method is used to find the length of a string?",
        answers: ["size", "length", "count", "getSize"],
        correct: "length"
    },
    {
        question: "What does JVM stand for?",
        answers: ["Java Variable Machine", "Java Virtual Machine", "Java Versioning Model", "Java Visible Memory"],
        correct: "Java Virtual Machine"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionObj.question;
    const answerButtons = document.querySelectorAll('.answer-btn');
    questionObj.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer;
        answerButtons[index].dataset.correct = answer === questionObj.correct;
    });

    resetTimer();
    startTimer();
}

function checkAnswer(button) {
    clearInterval(timer);
    const isCorrect = button.dataset.correct === "true";
    if (isCorrect) score++;
    currentQuestionIndex++;
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            loadQuestion();
        } else {
            document.getElementById('time').innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById('time').innerText = timeLeft;
}

function endQuiz() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('score').innerText = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    loadQuestion();
}

// Start the quiz for the first time
loadQuestion();
