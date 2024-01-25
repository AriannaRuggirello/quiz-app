let questions = [
    {
        question: "Qual è il linguaggio di programmazione più utilizzato per lo sviluppo web?",
        answers:[
            {text: "Java" , correct : false},
            {text: "Python" , correct : true},
            {text: "C++" , correct : false},
            {text: "Ruby" , correct : false}
        ]
    },

    {
        question: "Quali sono i principali vantaggi di utilizzare un framework per lo sviluppo software?",
        answers:[
            {text: "Riduzione della complessità del codice" , correct : true},
            {text: " Aumento delle vulnerabilità di sicurezza" , correct : false},
            {text: "Maggiore overhead di memoria" , correct : false},
            {text: "Minore scalabilità del progetto" , correct : false}
        ]
    },

    {
        question: "Qual è lo scopo principale della programmazione orientata agli oggetti (OOP)?",
        answers:[
            {text: " Ridurre l'efficienza del codice" , correct : false},
            {text: "Organizzare il codice in funzioni indipendenti" , correct : false},
            {text: " Incapsulare dati e comportamenti all'interno degli oggetti" , correct : true},
            {text: "Sostituire la programmazione procedurale" , correct : false}
        ]
    },

    {
        question: "Cosa rappresenta l'acronimo 'API' nel contesto della programmazione?",
        answers:[
            {text: "Application Protocol Interface" , correct : false},
            {text: "Advanced Programming Instruction" , correct : false},
            {text: "Automated Program Interface" , correct : false},
            {text: "Application Programming Interface" , correct : true}
        ]
    }
];

// Ottenimento dei riferimenti agli elementi HTML
let questionElement = document.getElementById("question");
let answerButton = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

// Variabili di stato
let currentQuestionIndex = 0;
let score = 0;

// Funzione per avviare il quiz
function startQuiz(){
    // Inizializzazione delle variabili di stato
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Funzione per mostrare la domanda corrente
function showQuestion(){
    // Reset dello stato dell'interfaccia
    resetState();
    // Ottenimento della domanda corrente
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    // Mostrare la domanda
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Aggiungere i pulsanti per le risposte
    currentQuestion.answers.forEach(answer =>{
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Funzione per ripristinare lo stato dell'interfaccia
function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// Funzione per gestire la selezione di una risposta
function selectAnswer(e){
    let selectBtn = e.target;
    let isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct"); 
        score ++;   
    }else{
        selectBtn.classList.add("incorrect");
    }

    // Disabilitare tutti i pulsanti di risposta
    Array.from(answerButton.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Funzione per mostrare il punteggio finale
function showCore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display="block";
}

// Funzione per gestire il click sul pulsante "Next" o "Play again"
function handleNexButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length) {
        showQuestion();
    }else{
        showCore();
    }
}

// Aggiunta dell'evento click al pulsante "Next" o "Play again"
nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNexButton();
    }else{
        startQuiz();
    }
})

// Avviare il quiz quando la pagina si carica
startQuiz();