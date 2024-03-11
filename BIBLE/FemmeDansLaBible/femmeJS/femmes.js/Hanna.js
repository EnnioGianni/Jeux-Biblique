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
		question: "Comment Hanna a-t-elle exprimé son chagrin à Jéhovah à Shilo ? (1 Samuel 1:13) ",
		options: ["En offrant des sacrifices.", 
				  "En chantant des psaumes.", 
				  "En priant silencieusement.", 
				  "En jeûnant pendant plusieurs jours."],
		correct: "En priant silencieusement."
	},
	{
		id: "1",
		question: "Pourquoi Hanna n'est-elle pas montée à Shilo avec Elqana pour sacrifier après la naissance de Samuel ? (1 Samuel 1:22)",
		options: ["Parce qu'elle était malade.", 
				  "Jusqu'à ce que le garçon soit sevré.", 
				  "Parce qu'elle était en deuil.", 
				  "Parce qu'elle était interdite d'entrée."],
		correct: "Jusqu'à ce que le garçon soit sevré."
	},
	{
		id: "2",
		question: "Où vivait Hanna ? (1 Samuel 1:1)",
		options: ["À Jérusalem.", 
				  "À Shilo.", 
		          "À Jérusalem.", 
		          "À Ramathaïm-Tsophim."],
		correct: "À Ramathaïm-Tsophim."
	},
	{
		id: "3",
		question: "Comment Hanna a-t-elle répondu à Éli quand il la croyait ivre ? (1 Samuel 1:15-16)",
		options: ["Elle s'est excusée et est partie.", 
			      "Elle a expliqué qu'elle épanche son âme devant Jéhovah.", 
			      "Elle a offert un sacrifice pour son erreur.", 
			      "Elle a demandé à Éli de prier avec elle."],
		correct: "Elle a expliqué qu'elle épanche son âme devant Jéhovah."
	},
	{
		id: "4",
		question: "Qu'a fait Hanna après qu'Éli lui ait dit que sa requête serait accordée ? (1 Samuel 1:18)",
		options: ["Elle a continué à prier toute la nuit.", 
				  "Elle est rentrée chez elle immédiatement.", 
				  "Elle a mangé et son visage n'était plus triste.", 
				  "Elle a offert un sacrifice de remerciement."],
		correct: "Elle a mangé et son visage n'était plus triste."
	},
	{
		id: "5",
		question: "Dans quelle ville Hanna a-t-elle fait un vœu ? (it-1-p1071)",
		options: ["À Jérusalem.", 
				  "À Shilo.", 
				  "À Ramathaïm-Tsophim.", 
				  "À Bethléem."],
		correct: "À Shilo.",
	},
	{
		id: "6",
		question: "Quels sacrifices Hanna a-t-elle offert  (1 Samuel 1:24)",
		options: ["Un taureau un épha de farine et une grande jarre de vin.", 
				  "un épha de farine.", 
				  "Un veau.", 
				  "une grande jarre de vin."],
		correct:  "Un taureau un épha de farine et une grande jarre de vin."
	},
	{
		id: "7",
		question: "Que apportait chaque année Hanna à son fils Samuel ? (1 Samuel 2:19)",
		options: ["Une tunique sacerdotale.", 
				  "Un manteau avec manches.", 
		 		  "Un manteau sans manches.", 
				  "Un Manteau."],
		correct: "Un manteau sans manches."
	},
	{
		id: "8",
		question: "Combien d'enfants Hanna a-t-elle eu par la suite ? (1 Samuel 2:21)",
		options: ["Trois fils et deux filles.", 
				  "Cinq fils.", 
				  "Par Deux fils et trois filles.", 
				  "Deux fils et trois fille."],
		correct: "Trois fils et deux filles."
	},
	{
		id: "9",
		question: "Quelle est la signification du nom Hanna (it-1-p1071)",
		options: ["Lumière.", 
				  "Espoir.", 
				  "grâce.", 
				  "Faveur, Compassion."],
		correct: "Faveur, Compassion."
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