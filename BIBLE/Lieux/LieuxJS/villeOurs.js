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
		question: "Quelle ville de Mésopotamie est identifiée comme le lieu de naissance d'Harân frére d'Abraham ? (Genèse 11:28) ",
		options: ["Babylone.", 
				  "Our.", 
				  "Mouqaiyir.", 
				  "Harran."],
		correct: "Our."
	},
	{
		id: "1",
		question: "Qui était le chef de famille qui prit la décision de quitter Our pour Harran ? (Genèse 11:31)",
		options: ["Abraham.", 
				  "Sara.", 
				  "Lot.", 
				  "Térah."],
		correct: "Térah."
	},
	{
		id: "2",
		question: "Qu'été à l'origine Ur ? (bf chap. 2 p. 24 § 35 Babylone se lève)",
		options: ["Une Ile.", 
				  "Une Capitale.", 
		          "Un port maritime.", 
		          "Ou tout simplement une ville."],
		correct: "Un port maritime."
	},
	{
		id: "3",
		question: "Quelle était la principale divinité adorée à Our, où se trouvait une ziggourat dédiée à son culte ? (it-2 p. 464)",
		options: ["Ashur.", 
			      "Baal.", 
			      "Nanna (ou Sîn).", 
			      "Marduk."],
		correct: "Nanna (ou Sîn)."
	},
	{
		id: "4",
		question: "Quel fleuve passait juste à l'Ouest d'Our dans l'Antiquité, selon Henri Gaubert ? (it-1 p. 250-251)",
		options: ["Tigre.", 
				  "Choapsès.", 
				  "Euphrate.", 
				  "Nil."],
		correct: "Euphrate."
	},
	{
		id: "5",
		question: "Ur etait située Ur en rapport avec Babylone ?  (bf chap. 4 p. 46 § 2 Une famille quitte la Chaldée)",
		options: ["Au Nord.", 
				  "Au Sud.", 
				  "A l'Est.", 
				  "A l'ouest"],
		correct: "Au Sud.",
	},
	{
		id: "6",
		question: "De quelle région Ur était la capitale ? (bf chap. 4 p. 46 § 2)",
		options: ["Sumer.", 
				  "De Juda.", 
				  "Horeb.", 
				  "Des Amorites."],
		correct:  "Sumer."
	},
	{
		id: "7",
		question: "Quels éléments ont été trouvés dans les tombes royales d'Our ? (it-2 p. 464 Our)",
		options: ["Des objets en or.", 
				  "Des objets en argent.", 
		 		  "Des objets en lapis-lazuli.", 
				  "Tous les éléments mentionnés."],
		correct: "Tous les éléments mentionnés."
	},
	{
		id: "8",
		question: "Quelle coutume funéraire caractérisait l'enterrement des rois et reines sumériens à Our ? (it-2 p. 464 Our)",
		options: ["Seuls avec des trésors.", 
				  "Avec leur suite de serviteurs et servantes.", 
				  "Avec des représentations en argile de serviteurs.", 
				  "Entourés de pierres précieuses."],
		correct: "Avec leur suite de serviteurs et servantes."
	},
	{
		id: "9",
		question: "Quelle perspective avait d'Abraham Ur ? (Hébreux 11:10)",
		options: ["Une terre pleine de richesses.", 
				  "La recherche d'une vie nomade.", 
				  "L'attente d'une ville eternelle.", 
				  "L'espérance d'une ville dont Dieu est le bâtisseur."],
		correct: "L'espérance d'une ville dont Dieu est le bâtisseur."
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