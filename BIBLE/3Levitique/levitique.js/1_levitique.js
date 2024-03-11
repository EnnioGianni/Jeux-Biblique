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
		question: "Quel type d'animal un homme doit-il présenter comme holocauste s'il choisit de le prendre dans le gros bétail ? (Lévitique 1:3) ",
		options: ["Une femelle sans défaut.", 
				  "Un mâle sans défaut.", 
				  "Une brebis sans défaut.", 
				  "N'importe quel animal du petit bétail."],
		correct: "Un mâle sans défaut."
	},
	{
		id: "1",
		question: "Qui sont responsables de présenter le sang du jeune taureau et de faire l’aspersion du sang autour de l'autel ? (Lévitique 1:5)",
		options: ["Les fils d'Israël.", 
				  "Les prêtres des fils d'Aaron.", 
				  "Les offrants des sacrifices.", 
				  "Les gardiens de la tente de réunion."],
		correct: "Les prêtres des fils d'Aaron."
	},
	{
		id: "2",
		question: "Quelle partie de l'holocauste doit être lavée avec de l'eau avant d'être offerte sur l'autel ? (Lévitique 1:9)",
		options: ["La tête et le suif.", 
				  "Les morceaux et les parties découpées.", 
		          "Les intestins et les jambes.", 
		          "Le bois et le feu."],
		correct: "Les intestins et les jambes."
	},
	{
		id: "3",
		question: "Où Jéhovah parla-t-il à Moïse lorsqu'Il l'appela? (Lévitique 1:1)",
		options: ["Sur le mont Sinaï.", 
			      "Dans la tente de réunion.", 
			      "Au bord du fleuve.", 
			      "Dans le désert."],
		correct: "Dans la tente de réunion."
	},
	{
		id: "4",
		question: "Où doit-on tuer l'animal offert pour l'holocauste dans le petit bétail ? (Lévitique 1:11)",
		options: ["Sur le côté de l'autel, à l'ouest.", 
				  "Sur le côté de l'autel, au nord.", 
				  "Devant l'autel, au sud.", 
				  "À l'est de l'autel, près des cendres grasses."],
		correct: "Sur le côté de l'autel, au nord."
	},
	{
		id: "5",
		question: "Comment doit-on présenter l'oiseau à l'autel avant de le faire fumer ? (Lévitique 1:16)",
		options: ["En le séparant complètement.", 
				  "En lui pincant la tête.", 
				  "En le laissant entier sans le fendre.", 
				  "En le plongeant dans l'eaul."],
		correct: "En lui pincant la tête.",
	},
	{
		id: "6",
		question: "Comment doit-on préparer l'oiseau avant de le faire fumer sur l'autel ? (Lévitique 1:17)",
		options: [" En le fendant sans séparer les ailes.", 
				  "En le coupant en ses parties.", 
				  "En retirant uniquement les plumes.", 
				  "En lavant ses intestins avec de l'eau."],
		correct:  "En le fendant sans séparer les ailes."
	},
	{
		id: "7",
		question: "Comment doit être la disposition des parties de l'animal sur le bois qui est sur le feu qui est sur l'autel ? (Lévitique 1:12)",
		options: ["Empilées sans ordre.", 
				  "Séparées et alignées.", 
		 		  "Disposées par-dessus le bois.", 
				  "Placées autour de l'autel."],
		correct: "Disposées par-dessus le bois."
	},
	{
		id: "8",
		question: "Quelle est la caractéristique de l'odeur du sacrifice par le feu pour Jéhovah ? (Lévitique 1:13 et 17)",
		options: ["Incommodante.", 
				  "Neutre.", 
				  "Repoussante.", 
				  "Reposante."],
		correct: "Reposante."
	},
	{
		id: "9",
		question: "Parmi les oiseaux, quels types sont acceptables pour l'offrande en holocauste à Jéhovah ? (Lévitique 1:14)",
		options: ["Les corbeaux et les hiboux.", 
				  "Les tourterelles ou les jeunes pigeons.", 
				  "Les aigles et les faucons.", 
				  "Les canards et les cygnes."],
		correct: "Les tourterelles ou les jeunes pigeons."
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