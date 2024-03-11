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
		question: "Quel était l'objectif du nouveau roi d'Égypte en utilisant de l'astuce avec les fils d'Israël ? (Exode 1:10)",
		options: ["Construire des pyramides.", 
				  "Réduire leur nombre.", 
				  "Empêcher leur alliance avec des ennemis.", 
				  "Augmenter la prospérité de l'Égypte."],
		correct:  "Empêcher leur alliance avec des ennemis."
	},
	{
		id: "1",
		question: "Combien d'âmes des descendants de Jacob sont entrées en Égypte ? (Exode 1:5)",
		options: ["Soixante.", 
				  "Soixante-dix .", 
				  "Cinquante.", 
				  "Quatre-vingts."],
		correct: "Soixante-dix ."
	},
	{
		id: "2",
		question: "Quelles villes-entrepôts les Israélites ont-ils bâties pour Pharaon ? (Exode 1:11)",
		options: ["Goshen et On.", 
				  "Pithom et Raamsès.", 
				  "Memphis et Thèbes.", 
				  "Héliopolis et Pi-Ramsès."],
		correct: "Pithom et Raamsès."
	},
	{
		id: "3",
		question: "Comment les Égyptiens rendaient-ils la vie des Israélites amère ? (Exode 1:14)",
		options: ["Par des impôts lourds.", 
				  "Par un dur esclavage.", 
				  "En leur refusant l'éducation.", 
				  "En les privant de nourriture."],
		correct: "Par un dur esclavage."
	},
	{
		id: "4",
		question: "Quelle était l'instruction du roi d’Égypte aux accoucheuses hébreues concernant les nouveau-nés mâles ? (Exode 1:16)",
		options: ["Le noyer dans le Nil.", 
				  "Les étranglés.", 
				  "Les faire mourir.", 
				  "Les élever comme Égyptiens."],
		correct: "Les faire mourir."
	},
	{
		id: "5",
		question: "Pourquoi le roi d'Égypte a-t-il convoqué les accoucheuses après avoir donné son ordre ? (Exode 1:18)",
		options: ["Pour les récompenser.", 
				  "Pour leur donner de nouvelles instructions.", 
				  "Pour leur demander pourquoi elles ont gardé en vie les enfants mâles.", 
				  "Pour les punir."],
		correct: "Pour leur demander pourquoi elles ont gardé en vie les enfants mâles."
	},
	{
		id: "6",
		question: "Quelle était la réponse des accoucheuses au Pharaon concernant leur action ? (Exode 1:19)",
		options: ["Les enfants mâles étaient forts et s'enfuyaient.", 
				  "Les femmes hébreues accouchaient avant leur arrivée.", 
				  "Les femmes hébreues cachet les nouveaux né. ", 
				  "Les hébreux les menaçaient."],
		correct: "Les femmes hébreues accouchaient avant leur arrivée."
	},
	{
		id: "7",
		question: "Comment Dieu a-t-il récompensé les accoucheuses pour leur crainte de Lui ? (Exode 1:21)",
		options: ["En leur donnant de l'or.", 
				  "En leur accordant une longue vie.", 
				  "En leur faisant don de familles.", 
				  "En les protégeant des maladies."],
		correct: "En leur faisant don de familles."
	},
	{
		id: "8",
		question: "Quel ordre Pharaon a-t-il finalement donné à tout son peuple concernant les fils nouveau-nés hébreux ? (Exode 1:22)",
		options: ["Les élever comme égyptiens.", 
				  "De les tuer.", 
				  "Les jeter dans le Nil.", 
				  "Les envoyer dans le désert."],
		correct: "Les jeter dans le Nil."
	},
	{
		id: "9",
		question: "Quel effet l'oppression égyptienne a-t-elle eu sur la population israélite ? (Exode 1:12)",
		options: ["Ils devinrent plus faibles.", 
				  "Ils diminuèrent en nombre.", 
				  "Ils se multiplièrent et se répandirent.", 
				  "Ils demandèrent à retourner à Canaan."],
		correct: "Ils se multiplièrent et se répandirent."
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