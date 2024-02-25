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
		question: "Je suis le roi qui a construit le premier temple de Jérusalem. Qui suis-je ? (1 Rois 6:1) ",
		options: ["David.", 
				  "Salomon.", 
				  "Roboam.", 
				  "Jéroboam."],
		correct: "Salomon."
	},
	{
		id: "1",
		question: "Je suis le fleuve où Jean a baptisé Jésus. Où suis-je ? (Matthieu 3:13-17)",
		options: ["Le Nil.", 
				  "Le Jourdain.", 
				  "La mer de Galilée.", 
				  "Le lac de Tibériade."],
		correct: "Le Jourdain."
	},
	{
		id: "2",
		question: "Qui suis-je ? Quel est un des rêve du roi Nebucadnetsar que Daniel a interprété. (Daniel 2:31)",
		options: ["Une grande montagne.", 
				  "Un puissant fleuve.", 
		          "Une immense statue.", 
		          "À Ramathaïm-Tsophim."],
		correct: "Une immense statue."
	},
	{
		id: "3",
		question: "Qui suis-je ? Je marché sur l'eau vers Jésus, mais je commencé à couler en doutant. (Matthieu 14:29)",
		options: ["Jean.", 
			      "Jacques.", 
			      "Pierre.", 
			      "Thomas."],
		correct: "Pierre."
	},
	{
		id: "4",
		question: "Visionnaire d'une échelle céleste avec des anges, qui suis-je ? (Genèse 28:10-12)",
		options: ["Abraham.", 
				  "Isaac.", 
				  "Jacob.", 
				  "Joseph."],
		correct: "Jacob."
	},
	{
		id: "5",
		question: "Qui, par sa sagesse, a résolu l'énigme des deux femmes se disputant le même enfant ? (1 Rois 3:16-28)",
		options: ["David.", 
				  "Salomon.", 
				  "Élie.", 
				  "Josué."],
		correct: "Salomon.",
	},
	{
		id: "6",
		question: "Dans quel livre de la Bible trouve-t-on la vision des ossements secs revenant à la vie ?(Ézéchiel 37:1-14)",
		options: ["Ézéchiel.", 
				  "Daniel.", 
				  "Jérémie.", 
				  "Isaïe."],
		correct:  "Ézéchiel."
	},
	{
		id: "7",
		question: "Qui a défié et vaincu 450 prophètes de Baal sur le mont Carmel ? (1 Rois 18:21-40)",
		options: ["Samuel.", 
				  "Élie.", 
		 		  "Élisée.", 
				  "Nathan."],
		correct: "Élie."
	},
	{
		id: "8",
		question: "Quelle prophétesse a jugé Israël et a orchestré la victoire sur les Cananéens avec l'aide du général Barak ? (Juges 4:4-9)",
		options: ["Houlda.", 
				  "Débora.", 
				  "Miriam.", 
				  "Anne."],
		correct: "Débora."
	},
	{
		id: "9",
		question: "Quelle femme a tué Sisera, le commandant de l'armée cananéenne, en lui enfonçant un piquet dans la tête ? (Juges 4:21)",
		options: ["Rahab.", 
				  "Jaël.", 
				  "Débora.", 
				  "Ruth."],
		correct: "Jaël."
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