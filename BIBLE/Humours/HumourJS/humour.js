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
		question: "Quel animal utilise Internet sans jamais payer d'abonnement ?",
		options: ["Le chat.", 
				  "L'escargot.", 
				  "Le pigeon voyageur.", 
				  "La souris."],
		 correct: "La souris."
	},
	{
		id: "1",
		question: "Quel est le comble pour un électricien ?",
		options: ["De ne pas être au courant.", 
				  "De prendre un choc électrique.", 
				  "De travailler sous tension.", 
				  "De perdre le fil."],
		 correct: "De ne pas être au courant."
	},
	{
		id: "2",
		question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
		options: ["Parce que sinon, ils tombent encore dans le bateau.", 
				  "Pour mieux voir le ciel.", 
		          "Par tradition.", 
		          "Pour impressionner les poissons."],
		 correct: "Parce que sinon, ils tombent encore dans le bateau."
	},
	{
		id: "3",
		question: "Pourquoi les vampires suivent-ils des cours du soir ?",
		options: ["Ils ne supportent pas la lumière du jour.", 
			      "Ils veulent apprendre à compter.", 
			      "Ils préparent un master en hémoglobine.", 
			      "Ils veulent rester à la mode."],
		correct: "Ils ne supportent pas la lumière du jour."
	},
	{
		id: "4",
		question: "Pourquoi les cyclones travaillent-ils gratuitement ?",
		options: ["Ils sont dans le vent.", 
				  "Ils suivent juste leur passion.", 
				  "Ils tournent autour du pot.", 
				  "Ils ont un tourbillon d'idées."],
		 correct: "Ils sont dans le vent."
	},
	{
		id: "5",
		question: "Pourquoi les abeilles ont-elles un bon sens de l'organisation ?",
		options: ["Elles ont un bon leader.", 
				  "Elles travaillent toujours en buzz-iness.", 
				  "Elles aiment faire des listes.", 
				  "Elles suivent toujours le plan."],
		 correct: "Elles travaillent toujours en buzz-iness.",
	},
	{
		id: "6",
		question: "Pourquoi les plantes détestent-elles les mathématiques ?",
		options: ["Elles trouvent ça trop complexe.", 
				  "Elles ont du mal avec les racines carrées.", 
				  "Elles n'aiment pas compter.", 
				  " Elles préfèrent la biologie."],
		correct:  "Elles ont du mal avec les racines carrées."
	},
	{
		id: "7",
		question: "Pourquoi les plantes détestent-elles les blagues ?",
		options: ["Parce qu'elles ont peur de se fendre la tige.", 
				  "Elles prennent tout au sérieux.", 
		 		  "Elles n'ont pas de sens de l'humus.", 
				  "Les blagues sont trop arrosées."],
		correct:  "Elles n'ont pas de sens de l'humus."
	},
	{
		id: "8",
		question: "Pourquoi les ordinateurs sont-ils toujours fatigués le matin ?",
		options: ["Ils doivent démarrer.", 
				  "Ils ont trop d'onglets ouverts la nuit.", 
				  "Ils rêvent de codes.", 
				  "ls restent connectés 24/7."],
		correct:  "Ils doivent démarrer."
	},
	{
		id: "9",
		question: "Pourquoi les chauves-souris dorment-elles la tête en bas ?",
		options: ["Pour voir le monde sous un autre angle.", 
				  "Elles imitent les acrobates.", 
				  "C'est plus confortable pour leurs ailes.", 
				  "Elles aiment les sensations fortes."],
		correct:  "Pour voir le monde sous un autre angle."
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
