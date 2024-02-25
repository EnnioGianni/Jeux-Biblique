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
let count = 31;
let countdown;

//Tableau de questions et d’options
// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Quel mont Moïse a-t-il gravi pour contempler la Terre Promise et remarquer Jéricho, la ville des palmiers ? (Deutéronome 32:49) ",
		options: ["Mont Sinaï.", 
				  "Mont Carmel.", 
				  "Mont Nébo.", 
				  "Mont Horeb."],
		correct: "Mont Nébo."
	},
	{
		id: "1",
		question: "Combien de jours les espions envoyés à Jéricho se sont-ils cachés avant de retourner au camp d'Israël ? (Josué 2:1-23.)",
		options: ["Un jour.", 
				  "Deux jours.", 
				  "Trois jours.", 
				  "20 jour."],
		correct: "Trois jours."
	},
	{
		id: "2",
		question: "De quel côté du Jourdain Jéricho, la ville cananéenne conquise par les Israélites, est-elle située ?",
		options: ["À l'est.", 
				  "Au nord.", 
		          "À l'ouest.", 
		          "Au sud."],
		correct: "À l'ouest."
	},
	{
		id: "3",
		question: "Dans quel livre de la Bible Jéricho est-elle mentionnée pour la première fois ?(Nombres 22:1)",
		options: ["Genèse.", 
			      "Exode.", 
			      "Lévitique.", 
			      "Nombres."],
		correct: "Nombres."
	},
	{
		id: "4",
		question: "Qu'a expliqué le prince angélique qui est apparut à Josué près de Jéricho (Jos 5:13–6:20.)",
		options: ["La manière de traverser le Jourdain à sec.", 
				  "Les prières spécifiques à réciter pour la victoire", 
				  "La stratégie pour s'emparer de Jéricho.", 
				  "Envoyer des espions pour évaluer les défenses de la ville.."],
		correct: "La stratégie pour s'emparer de Jéricho."
	},
	{
		id: "5",
		question: "Qui, parmi les Israélites, a volé un lingot d'or, de l'argent et un beau vêtement, causant ainsi sa mort et celle de sa famille ? (Jos 7:20-26.)",
		options: ["Josué.", 
				  "Caleb.", 
				  "Akân.", 
				  "Eléazar"],
		correct: "Akân.",
	},
	{
		id: "6",
		question: "Quel roi a pris possession du village qui s'est constitué après la destruction de Jéricho ? (it-1 p. 1270-1272)",
		options: ["Le roi Saül.", 
				  "Le roi David.", 
				  "Églôn, roi de Moab.", 
				  "Le roi Salomon."],
		correct:  "Églôn, roi de Moab."
	},
	{
		id: "7",
		question: "Quelle prophétie s'est réalisée lors de la reconstruction de Jéricho par Hiel le Béthélite ? (Jos. 6:26)",
		options: ["La ville serait indestructible une fois reconstruite.", 
				  "La ville deviendrait un centre de culte pour Israël.", 
		 		  "Celui qui posera les portes le fera au prix de la vie de son plus jeune fil.", 
				  "La ville connaîtrait une prospérité sans précédent après sa reconstruction."],
		correct: "Celui qui posera les portes le fera au prix de la vie de son plus jeune fil."
	},
	{
		id: "8",
		question: "Qu'a fait Élisha à Jéricho après l'enlèvement d'Éliya ? (2 Roi 2:19)",
		options: ["Il a construit un nouveau temple.", 
				  "Il a guéri la réserve d'eau de la ville.", 
				  "Il a renforcé les murailles de la ville.", 
				  "Il a convoqué une assemblée des prophètes."],
		correct: "Il a guéri la réserve d'eau de la ville."
	},
	{
		id: "9",
		question: "Combien de fils de Jéricho sont revenus de la captivité à Babylone avec Zorobabel ?(Ne. 7:36)",
		options: ["100.", 
				  "346.", 
				  "350.", 
				  "345."],
		correct: "345."
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
        count = 31;
        clearInterval(countdown);
        timerDisplay();
    }
});

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
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
    count = 31;
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