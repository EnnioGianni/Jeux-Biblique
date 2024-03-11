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
		question: "Quelle action a faitLe roi Cyrus de Perse? (Esdras 5:2) ",
		options: ["Emporté les ustensiles en or et en argent à Jérusalem.", 
				  "Chargé de construire une maison à Jérusalem.", 
				  "Pris les ustensiles du temple de Jéhovah à Jérusalem.", 
				  "Dirigé la restitution des ustensiles du temple."],
		correct: "Chargé de construire une maison à Jérusalem."
	},
	{
		id: "1",
		question: "Quel action a fait Nabuchodonosor ? (Esdras 5:12)",
		options: ["Chargé de construire une maison à Jérusalem.", 
				  "Dirigé la restitution des ustensiles du temple.", 
				  "Avait pris les ustensiles du temple de Jéhovah à Jérusalem.", 
				  "Detruit les ustensiles en or et en argent à Jérusalem."],
		correct: "Avait pris les ustensiles du temple de Jéhovah à Jérusalem."
	},
	{
		id: "2",
		question: "Quel action a fait Mithridate. (Esdras 1:8)",
		options: ["Chargé de construire un Temple.", 
				  "Emporté les ustensiles en or et en argent à Jérusalem.", 
		          "Il saccagea le temple de Jéhovah.", 
		          "Il fit un inventaire des ustensiles, rapporté ou temples."],
		correct: "Il fit un inventaire des ustensiles, rapporté ou temples."
	},
	{
		id: "3",
		question: "Quel action a ete fait pour les prêtre et les lévites à Jérusalem. (Esdras 1:6)",
		options: ["Chargé de construire une maison à Jérusalem.", 
			      "Apportèrent leur soutien en donnant des ustensiles en argent et en or, des biens, du bétail, et des objets précieux.", 
			      "Dirigé la restitution des ustensiles du temple.", 
			      "Emporté les ustensiles en or et en argent à Jérusalem."],
		correct: "Apportèrent leur soutien en donnant des ustensiles en argent et en or, des biens, du bétail, et des objets précieux."
	},
	{
		id: "4",
		question: "Quel action ont fait les chefs des groupes de familles de Juda et de Benjamin. (Esdras 1:5)",
		options: ["Se préparèrent à partir à Jérusalem pour y reconstruire le temple de Jéhovah.", 
				  "Pris les ustensiles du temple de Jéhovah à Jérusalem", 
				  "Chargé de construire une maison à Jérusalem.", 
				  "Apportèrent leur soutien en donnant des ustensiles en argent et en or."],
		correct: "Se préparèrent à partir à Jérusalem pour y reconstruire le temple de Jéhovah."
	},
	{
		id: "5",
		question: "Quel action ont fait Les prêtres et les Lévites. (1 Rois 3:16-28)",
		options: ["Dirigé la restitution des ustensiles du temple.", 
				  "Chargé de construire une maison à Jérusalem.", 
				  "Se préparèrent à partir à Jérusalem pour y reconstruire le temple de Jéhovah.", 
				  "Apportèrent leur soutien en chargeant les chariots avant de partir."],
		correct: "Se préparèrent à partir à Jérusalem pour y reconstruire le temple de Jéhovah.",
	},
	{
		id: "6",
		question: "Qui : a) Appelle le feu du ciel, b) Loyauté envers Naomi, c) Conduit Israël à la terre promise. Il y a un intrus parmi ces réponses.",
		options: ["b) Élie", 
				  "a) Ruth.", 
				  "d) Josué.", 
				  "c) Moise.,"],
		correct:  "c) Moise.,"
	},
	{
		id: "7",
		question: "Qui : a) Sauve son peuple, b) Défait les Madianites, c) Lutte avec l'ange de Dieu. Il y a un intrus parmi ces réponses.",
		options: ["a) Jacob", 
				  "b) Esther.", 
		 		  "d) Gédéon.", 
				  "c) Myriam."],
		correct:  "c) Myriam."
	},
	{
		id: "8",
		question: "Qui a : a) Oint le roi David, b) Juge et prophétesse, c) Premier meurtrier. Il y a un intrus parmi ces réponses.",
		options: ["b) Samuel.", 
				  "d) Achaz.", 
				  "a) Caïn.", 
				  "c) Débora."],
		correct:  "d) Achaz."
	},
	{
		id: "9",
		question: "Qui : a) Renversé les tables dans le temple, b) Traversé la mer Rouge, c) Prêché contre les faux prophètes de Baal sur le mont Carmel.Il y a un intrus parmi ces réponses.",
		options: ["a) Eli.", 
				  "b) Jésus.", 
				  "c) Saül.", 
				  "d) Moise."],
		correct:  "c) Saül."
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
