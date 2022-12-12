const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffleQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setnextQuestion();
});


function startGame(){
    startButton.classList.add("hide");
    shuffleQuestions= questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setnextQuestion();
    quizScore = 0;
}

function setnextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText= question.question;
    question.answers.forEach((answer)=> {
        const button = document.createElement("button");
        button.innerText=answer.Text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton= e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct);
    })
    if(shuffleQuestions.lenght > currentQuestionIndex +1){
        nextButton.classList.remove("hide");
    }else {
        startButton.innerText = "Restartowanie";
        startButton.classList.remove("hide");
    }
    if(selectedButton.dataset = correct){
        quizScore++;
    }
    document.getElementById("right-answers").innerText=quizScore;
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("Dobrze");
    }else   {
        element.classList.add("Źle");
    }
}



function clearStatusClass(element){
    element.classList.remove("Dobrze");
    element.classList.remove("Źle");
}
const questions = [
    {
        question: "Które z tych to język programowania ?",
        answers :[
            {Text: "Żmija", correct: false},
            {Text: "X++", correct: false},
            {Text: "Java", correct: true},
            {Text: "Minecraft", correct: false},
        ]
    },
    {
        question: "Co będziemy robić we Wtorek ?",
        answers :[
            {Text: "Oglądać Filmy", correct: true},
            {Text: "Nico", correct: false},
        ]
    },
    {
        question: "Czy coś z tego ogarnę ?",
        answers :[
            {Text: "Trochę", correct: true},
            {Text: "Nico", correct: false},
        ],
    }
]
