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
		question: "J'ai quelque chose dans ma poche, mais ma poche est vide. Qu'est-ce que cela pourrait bien être ?",
		options: ["Un trou.", 
				  "Un fil.", 
				  "Un bouton.", 
				  "De la poussière."],
		correct: "Un trou."
	},
	{
		id: "1",
		question: "Je suis indispensable pour les Français et inutile pour la France. Qui suis je ?",
		options: ["Le pain.", 
				  "L'argent.", 
				  "La tour Eiffe.", 
				  "La cédille."],
		correct: "La cédille."
	},
	{
		id: "2",
		question: "Je suis d'eau, je suis d'air, et je suis d'électricité. Qui suis-je ?",
		options: ["Un arc-en-ciel.", 
				  "Le vent.", 
		          "Le courant.", 
		          "Un orage."],
		correct: "Le courant."
	},
	{
		id: "3",
		question: "Je vous vois vieillir, sans jamais rien vous dire. Qui suis-je ?",
		options: ["Le temps.", 
			      "Un journal.", 
			      "Un miroir.", 
			      "Une horloge."],
		correct: "Un miroir."
	},
	{
		id: "4",
		question: "Je suis entre 188 et 190, mais je ne suis pas 189. Qui suis-je ?",
		options: ["Le nombre 188,5.", 
				  "Le mot et.", 
				  "Le chiffre 9.", 
				  "Une virgule."],
		correct: "Le mot et."
	},
	{
		id: "5",
		question: "Tout le monde connaît ma couleur. Je suis onctueuse. Ma peau est souvent un gag. Enfin, à la taille je m'attache. Qui suis-je ?",
		options: ["Un citron.", 
				  "Un avocat.", 
				  "Une banane.", 
				  "Une ceinture."],
		correct: "Une banane.",
	},
	{
		id: "6",
		question: "De rose, je suis exotique. Au pluriel, je joue de la musique. On me touche pour conjurer un sort. Qui suis-je ?",
		options: ["Une fleur.", 
				  "Un bois.", 
				  "Une guitare.", 
				  "Un trèfle."],
		correct:  "Un bois."
	},
	{
		id: "7",
		question: "Je possède des ailes, mais je n’ai jamais volé. Je suis rouge pour danser. Certains m’utilisent encore pour le café. Qui suis-je ?",
		options: ["Un papillon.", 
				  "Un avion.", 
		 		  "Un moulin.", 
				  "Une tasse."],
		correct: "Un moulin."
	},
	{
		id: "8",
		question: "Du patriarche, je suis sucrée. Bleue, je suis un conte. Je suis symbole de virilité. Qui suis-je ?",
		options: ["Une canne.", 
				  "Un chapeau.", 
				  "La barbe.", 
				  "Un lion."],
		correct: "La barbe."
	},
	{
		id: "9",
		question: "Je suis l’objet de superstitions.Pour les enfants, je porte des chaussures.Enfin, mes vidéos font des milliards de vues sur YouTube.Qui suis-je ?",
		options: ["Un lapin.", 
				  "Un chat.", 
				  "Un chien.", 
				  "Une souris."],
		correct: "Un chat."
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