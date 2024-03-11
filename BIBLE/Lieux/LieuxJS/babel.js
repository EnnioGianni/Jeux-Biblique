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
		question: "Qui était le fondateur de Babel et comment est-il décrit ? (Gn 10:9, 10) ",
		options: ["Un grand chasseur.", 
				  "Nimrod, le puissant chasseur en opposition avec Jéhovah.", 
				  "Un bâtisseur de ville.", 
				  "Nimrod."],
		correct: "Nimrod, le puissant chasseur en opposition avec Jéhovah."
	},
	{
		id: "1",
		question: "Dans quelle caractéristique géographique Babel a été construite ? (it-1 p. 250-251)",
		options: ["Sur une montagne.", 
				  "Dans une forêt dense.", 
				  "Dans une plaine formée par les alluvions.", 
				  "Dans une plaine où il y avait des pierres pour la bâtir."],
		correct: "Dans une plaine formée par les alluvions."
	},
	{
		id: "2",
		question: "Quelle était la matière première utilisée pour la construction de Babel en l'absence de pierres? (Gn 11:3)",
		options: ["Argile.", 
				  "Briques et du bitume.", 
		          "Bois.", 
		          "Pierre."],
		correct: "Briques et du bitume."
	},
	{
		id: "3",
		question: "D'où vient le nom Babel et que signifie-t-il ? (it-1 p. 250-251)",
		options: ["Du verbe signifiant construire.", 
			      "Du verbe signifiant élever.", 
			      "Du verbe balal qui signifie confondre.", 
			      "Du verbe signifiant diviser."],
		correct: "Du verbe balal qui signifie confondre."
	},
	{
		id: "4",
		question: "Comment les constructeurs considéraient leurs villes ? (it-1 p. 250-251)",
		options: ["Maison de Dieu.", 
				  "Porte de Dieu.", 
				  "La tour vers le cieux.", 
				  "Comme le siège du gouvernement de Dieu."],
		correct: "Comme le siège du gouvernement de Dieu."
	},
	{
		id: "5",
		question: "Quel était l'objectif des bâtisseurs de la tour de Babel ? (Gn 11:4)",
		options: ["Construire une ville impénétrable.", 
				  "Se faire un nom célèbre.", 
				  "Atteindre le ciel.", 
				  "Établir une nouvelle religion."],
		correct: "Se faire un nom célèbre.",
	},
	{
		id: "6",
		question: "Pourquoi le nom de Péleg est-il significatif dans le contexte de son époque ? (Gn 10:25)",
		options: ["Il symbolise la paix.", 
				  "Il représente la prospérité.", 
				  "Il signifie Division.", 
				  "Il évoque la construction."],
		correct:  "Il signifie Division."
	},
	{
		id: "7",
		question: "Quelle est l’époque approximative de la costruction de Babel ? (it-1 p. 250-251)",
		options: ["De 2500 à 2300 av. n. è.", 
				  "De 2269 à 2030 av. n. è.", 
		 		  "De 2400 à 2200 av. n. è.", 
				  "De 2100 à 1900 av. n. è."],
		correct: "De 2269 à 2030 av. n. è."
	},
	{
		id: "8",
		question: "Pourquoi ils ont utilisé le bitume pour assembler les briques ? (it-1 p. 250-251)",
		options: ["Par manque d'eau.", 
				  "Ils n'avait pas de sable.", 
				  "À défaut de chaux.", 
				  "Ou le bitume était plus approprié pour le cuir aux féaux."],
		correct: "À défaut de chaux."
	},
	{
		id: "9",
		question: "Quel été, la réalisation principale du programme de construction de Babel ? (it-1 p. 250-251)",
		options: ["Pour une ère de prospérité et d'abondance.", 
				  "Il indique une période de grandes découvertes.", 
				  "Pour symbolise l'unification des peuples .", 
				  "Pour défiait Dieu."],
		correct: "Pour défiait Dieu."
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