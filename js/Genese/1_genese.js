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
		question: "Quel est le premier acte de création de Dieu selon la Genèse ? ",
		options: ["Création des animaux", 
				  "Création de la lumière", 
				  "Création de l'homme", 
				  "Création d'Eve"],
		correct: "Création de la lumière"
	},
	{
		id: "1",
		question: "Qu'a fait Dieu le troisième jour de la création ?",
		options: ["Création des étoiles", 
				  "Création des animaux", 
				  "Création de la végétation", 
				  "Création du soleil"],
		correct: "Création de la végétation"
	},
	{
		id: "2",
		question: "Quel fut le destin des luminaires créés le quatrième jour selon leur fonction spécifiée ? (Genèse 1:14)",
		options: ["Éclairer la terre et séparer la lumière des ténèbres", 
				  "Servir de signes pour les époques, les jours et les années.", 
		          "Pulluler d’un pullulement d’âmes vivantes dans les eaux.", 
		          "Faire pousser de l’herbe et de la végétation portant semence sur la terre."],
		correct: "Servir de signes pour les époques, les jours et les années."
	},
	{
		id: "3",
		question: "Que fait Dieu le deuxième jour de la création ?",
		options: ["Il crée le ciel et la terre", 
			      "Il sépare les eaux", 
			      "Il crée les animaux", 
			      "Il a créé la lune"],
		correct: "Il sépare les eaux"
	},
	{
		id: "4",
		question: "Quelle est la première chose que Dieu nomme dans sa création ?",
		options: ["La mer", 
				  "La lumière", 
				  "La végétations", 
				  "Les animaux"],
		correct: "La lumière"
	},
	{
		id: "5",
		question: "Quels corps célestes Dieu a-t-il créés pour marquer les saisons, les jours et les années ?",
		options: ["Les étoiles et la lune", 
				  "Le soleil et la lune", 
				  "Les comètes et les étoiles", 
				  "Le ciel et la terre"],
		correct: "Le soleil et la lune",
	},
	{
		id: "6",
		question: "En quoi le septième jour est-il différent des autres jours de la création ?",
		options: ["Il a marqué la création des étoiles", 
				  "C'était un jour de célébration et de fête", 
				  "Il a été sanctifié et déclaré jour de repos par Dieu", 
				  "Il a vu la création des anges"],
		correct:  "Il a été sanctifié et déclaré jour de repos par Dieu"
	},
	{
		id: "7",
		question: "Quelle action spécifique Dieu a-t-il prise le septième jour après avoir terminé sa création ?",
		options: ["Il a commencé un nouveau projet de création", 
				  "Il a sanctifié et béni le septième jour", 
		 		  "Il a planté plus d'arbres dans le jardin d'Éden", 
				  "Il a commencé a planté des arbres"],
		correct: "Il a sanctifié et béni le septième jour"
	},
	{
		id: "8",
		question: "Quelle est la particularité de l'or du pays de Havila, mentionné dans le passage sur le fleuve Pishôn ?",
		options: ["Il était un or de qualité", 
				  "Il était considéré comme le plus pur de tous", 
				  "Il était magique et avait des propriétés curatives", 
				  "Il était abondant et facilement accessible"],
		correct: "Il était un or de qualité"
	},
	{
		id: "9",
		question: "Quelle est la signification du nom d'Eve donne par Adam ?",
		options: ["Adam l’appela homme femelle ?", 
				  "Première femme ?", 
				  "Mer de toutes les femmes ?", 
				  "Ou os de mes os ?"],
		correct: "Adam l’appela homme femelle ?"
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