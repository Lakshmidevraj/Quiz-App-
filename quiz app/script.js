const questions = [
    {
        question: "Which of the following option leads to the portability and security of Java?",
        answers: [
            { text:"Bytecode is executed by JVM", correct: true},
            { text:"The applet makes the Java code secure and portable", correct: false},
            { text:"Use of exception handling", correct: false},
            { text:"Dynamic binding between objects", correct: false},
        ]
    },
    {
        question: "Which of the following is not a Java features?",
        answers: [
            { text:"Dynamic", correct: false},
            { text:"Architecture Neutral", correct: false},
            { text:"Use of pointers", correct: true},
            { text:"Object-oriented", correct: false},
        ]
    },
    {
        question: "What is the return type of the hashCode() method in the Object class?",
        answers: [
            { text:"Object", correct: false},
            { text:"int", correct: true},
            { text:"long", correct: false},
            { text:"void", correct: false},
        ]
    },
    {
        question: " _____ is used to find and fix bugs in the Java programs.",
        answers: [
            { text:"JVM", correct: false},
            { text:"JRE", correct: false},
            { text:"JDK", correct: false},
            { text:"JDB", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    //display answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;//true are false
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();