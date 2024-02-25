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
let count = 11;
let countdown;

//Tableau de questions et d’options
// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Quel acte a marqué la fin de la création des cieux et de la terre ? (Genèse 2:2)",
		options: ["Dieu a créé l'homme et le jardin d'Éden.", 
				  "Dieu a achevé son œuvre en six jours.", 
				  "Dieu s'est reposé le septième jour de toute son œuvre.", 
				  "Dieu a bénit le septième jour et l'a rendu sacré."],
		correct: "Dieu s'est reposé le septième jour de toute son œuvre."
	},
	{
		id: "1",
		question: "Pourquoi aucune plante des champs n'avait encore germé sur la terre ? (Genèse 2:5)",
		options: ["Car Jéhovah Dieu n'avait pas fait pleuvoir sur la terre.", 
				  "Il n'y avait pas d'homme pour cultiver le sol.", 
				  "Une brume montait de la terre et arrosait toute la surface du sol.", 
				  "Aucun buisson des champs n'était encore apparu."],
		correct: "Car Jéhovah Dieu n'avait pas fait pleuvoir sur la terre."
	},
	{
		id: "2",
		question: "Comment l'homme est-il devenu une âme vivante ? (Genèse 2:7)",
		options: ["Formé à partir de la poussière du sol.", 
				  "Jéhovah Dieu a soufflé dans ses narines le souffle de vie.", 
				  "Avant cela, l'homme n'était pas vivant.", 
				  "L'homme a été placé dans le jardin d'Éden après cela."],
		correct: "Jéhovah Dieu a soufflé dans ses narines le souffle de vie."
	},
	{
		id: "3",
		question: "Quels arbres spéciaux Dieu a-t-il fait pousser dans le jardin d'Éden ? (Genèse 2:9)",
		options: ["Ils étaient désirables à voir et bons à manger.", 
				  "Un arbre de conifère de la connaissance du bien et du mal.", 
				  "L'arbre de vie et l'arbre de la connaissance du bon et du mauvais.", 
				  "Ces arbres étaient au milieu du jardin"],
		correct: "L'arbre de vie et l'arbre de la connaissance du bon et du mauvais."
	},
	{
		id: "4",
		question: "5.	Quel commandement Dieu a-t-il donné concernant l'arbre de la connaissance du bon et du mauvais ? (Genèse 2:17)",
		options: ["L'homme pouvait manger de tous les arbres sauf un.", 
				  "Tu ne dois pas en manger, car le jour où tu en mangeras, tu mourras à coup sûr.", 
				  "La désobéissance entraînerait la mort.", 
				  "L'arbre interdit offrait la connaissance du bien et du mal."],
		correct: "Tu ne dois pas en manger, car le jour où tu en mangeras, tu mourras à coup sûr."
	},
	{
		id: "5",
		question: "Comment la femme a-t-été créée ? (Genèse 2:21-22)",
		options: ["À partir d'une partie du corps de l'homme.", 
				  "À partir d'une côte prise de l'homme, pendant son sommeil.", 
				  "L'homme dormait lors de sa création.", 
				  "La création a impliqué une chirurgie divine."],
		correct: "À partir d'une côte prise de l'homme, pendant son sommeil."
	},
	{
		id: "6",
		question: "Quelle déclaration l'homme a-t-il faite en voyant la femme ? (Genèse 2:23.)",
		options: ["Celle-ci est enfin l’os de mes os et la chair de ma chair.", 
				  "Reconnaissance de leur unité fondamentale.", 
				  "Expression de leur lien unique.", 
				  "Identification comme étant de la même essence."],
		correct: "Celle-ci est enfin l’os de mes os et la chair de ma chair."
	},
	{
		id: "7",
		question: "Quelle instruction Dieu a-t-il donnée à l'homme à propos du jardin ? (Genèse 2:16)",
		options: ["De tout arbre du jardin tu peux manger à satiété.", 
				  "L'homme était chargé de cultiver et de s'occuper du jardin", 
				  "Un arbre en particulier était interdit.", 
				  "Le jardin était situé en Éden."],
		correct: "De tout arbre du jardin tu peux manger à satiété."
	},
	{
		id: "8",
		question: "Pourquoi Dieu a-t-il jugé qu'il n'était pas bon que l'homme soit seul ? (Genèse 2:18.)",
		options: ["Il a noté l'absence d'une aide correspondante pour l'homme.", 
				  "Il n'est pas bon que l'homme reste seul.", 
				  "Toutes les créatures ont été nommées par l'homme, mais aucune ne lui correspondait.", 
				  "La solitude de l'homme nécessitait la création d'un compagnon."],
		correct: "Il n'est pas bon que l'homme reste seul."
	},
	{
		id: "9",
		question: "Quelle fut la réaction de l'homme à la création de la femme ? (Genèse 2:23.)",
		options: ["Il a exprimé une joie profonde à sa vue.", 
				  "Il a reconnu immédiatement un lien de parenté.", 
				  "Celle-ci est enfin l’os de mes os et la chair de ma chair.", 
				  "La femme a été présentée à l'homme par Dieu."],
		correct: "Celle-ci est enfin l’os de mes os et la chair de ma chair."
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