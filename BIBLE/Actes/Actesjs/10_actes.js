// References
const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;

//Tableau de questions et d’options
// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Quel était le métier de Simon chez qui Pierre logeait à Joppé ? (Actes 10:6) ",
		options: ["Tanneur.", 
				  "Pêcheur.", 
				  "Soldat.", 
				  "Marchand."],
		correct: "Tanneur."
	},
	{
		id: "1",
		question: "À quelle heure Corneille a-t-il vu l'ange lui apparaître ? (Actes 10:3)",
		options: ["Sixième heure.", 
				  "Neuvième heure.", 
				  "Troisième heure.", 
				  "Minuit."],
		correct: "Neuvième heure."
	},
	{
		id: "2",
		question: "Quelle instruction l'ange a-t-il donnée à Corneille concernant Pierre ? (Actes 10:5)",
		options: ["Lui demander de prier.", 
				  "Lui offrir des dons.", 
		          "Faire venir Pierre de Joppé.", 
		          "Lui construire un autel."],
		correct: "Faire venir Pierre de Joppé."
	},
	{
		id: "3",
		question: "Quelle était la réaction de Pierre quand il a été instruit de manger des animaux qu'il considérait impurs ? (Actes 10:14)",
		options: ["Il a mangé immédiatement.", 
			      "Il a refusé.", 
			      "Il a prié.", 
			      "Il a pleuré."],
		correct: "Il a refusé."
	},
	{
		id: "4",
		question: "Comment Pierre a-t-il su que les hommes cherchaient sa demeure ? (Actes 10:19)",
		options: ["Par un songe.", 
				  "Par une vision.", 
				  "Par une vision l'esprit lui a dit.", 
				  "Corneille lui a envoyé un message."],
		correct: "Par une vision l'esprit lui a dit."
	},
	{
		id: "5",
		question: "Quelle était la nature du récipient que Pierre a vu descendre du ciel ? (Actes 10:11)",
		options: ["Une coupe en or.", 
				  "Un récipient comme une grande toile.", 
				  "Un vase en pierre.", 
				  "Un coffre scellé."],
		correct: "Un récipient comme une grande toile.",
	},
	{
		id: "6",
		question: "Quel événement s'est produit pendant que Pierre parlait encore ? (Actes 10:44)",
		options: ["Un tremblement de terre.", 
				  "L'esprit saint est tombé sur tous ceux qui écoutaient.", 
				  "Une interruption par des soldats.", 
				  "Une lumière aveuglante a rempli la pièce."],
		correct:  "L'esprit saint est tombé sur tous ceux qui écoutaient."
	},
	{
		id: "7",
		question: "Pourquoi Pierre a-t-il dit qu'il était illicite pour un Juif de se joindre ou d'approcher un homme d'une autre race ? (Actes 10:28)",
		options: ["Par tradition.", 
				  "Par ordre divin.", 
		 		  "Pour des raisons de pureté.", 
				  "C'etait Selon la loi juive."],
		correct: "C'etait Selon la loi juive."
	},
	{
		id: "8",
		question: "Quelle était la condition de Corneille avant de voir l'ange, selon ses propres mots ? (Actes 10:30)",
		options: ["Il jeûnait.", 
				  "Il priait.", 
				  "Il offrait des sacrifices.", 
				  "Il lisait les Écritures."],
		correct: "Il priait."
	},
	{
		id: "9",
		question: "Quelle a été la réaction des fidèles circoncis qui accompagnaient Pierre à la réception de l'Esprit Saint par les gentils ? (Actes 10:45)",
		options: ["Ils ont célébré avec joie.", 
				  "Ils ont été stupéfaits.", 
				  "Ils ont demandé des explications.", 
				  "Ils ont quitté la pièce."],
		correct: "Ils ont été stupéfaits."
	}
];
// Redémarrer le jeu
restart.addEventListener("click", () => {
    inital(); //Fonction initiale d’appel
    wrapper.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
    let question = document.getElementsByClassName("container_mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    let isSelected = Array.from(options).some(option => option.classList.contains("correct") || option.classList.contains("inCorrect"));

    if (!isSelected) {
        alert("Veuillez sélectionner une option avant de continuer.");
        return; // Empêche de passer à la question suivante sans sélection
    }

    questionCount += 1;
    if (questionCount == quizArray.length) {
        wrapper.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Votre score est de " + scoreCount + " sur " + questionCount;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        quizDisplay(questionCount);
        count = 21;
        clearInterval(countdown);
        timerDisplay();
    }
});

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;

        // Affiche un message lorsque le compteur atteint 5 secondes restantes
        if (count == 5) {
            alert("Dans 5 secondes, on revient à la première question !");
        }

        if (count == 0) {
            clearInterval(countdown);
            // Réinitialise le quiz pour revenir à la première question
            inital(); // Assurez-vous que cette fonction réinitialise correctement tout ce dont vous avez besoin
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container_mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container_mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
<button class="option-div" onclick="checker(this)">${i.options[3]}</button>
`;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container_mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("inCorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function inital() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    clearInterval(countdown);
    count = 21;
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    wrapper.classList.remove("hide");
    inital();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    wrapper.classList.add("hide");
};