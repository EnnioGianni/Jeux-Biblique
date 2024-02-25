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
		question: "Pourquoi les moutons se brossent les dents ?",
		options: ["Pour manger plus d'herbe.", 
				  "Pour avoir un sourire éclatant.", 
				  "Parce qu'ils adorent le goût du dentifrice à la menthe.", 
				  "Pour garder la laine fraîche."],
		 correct: "Pour garder la laine fraîche."
	},
	{
		id: "1",
		question: "Que dit l'escargot après avoir participé à une course à pied ?",
		options: ["J'ai gagné haut la main !", 
				  "J'en ai bavé…", 
				  "C'était une promenade de santé !", 
				  "Je n'ai pas encore fini..."],
		 correct: "J'en ai bavé…"
	},
	{
		id: "2",
		question: "En tenant 3 pommes et 4 oranges dans une main, et 5 kiwis et 3 pamplemousses dans l'autre, qu'avez-vous au final ?",
		options: ["Un talent pour l'équilibrisme.", 
				  "Un besoin urgent d'un panie.", 
		          "Le potentiel pour devenir un excellent jongleur.", 
		          "De très grandes mains."],
		 correct: "De très grandes mains."
	},
	{
		id: "3",
		question: "Quelle lettre de l'alphabet peut être lancée dans tous les sens ?",
		options: ["La lettre S (comme serpent)", 
			      "La lettre O (comme orbite)", 
			      "La lettre D (comme dé)", 
			      "La lettre X (comme croix)"],
		correct: "La lettre D (comme dé)"
	},
	{
		id: "4",
		question: "Qu'est-ce qui est sale après le lavage ?",
		options: ["Le savon.", 
				  "La serviette.", 
				  " L'éponge.", 
				  "L'eau."],
		 correct: "L'eau."
	},
	{
		id: "5",
		question: "Qu'est-ce qui peut tomber de très haut et lourdement sans jamais se blesser ?",
		options: ["Une feuille.", 
				  "La pluie.", 
				  "Un oiseau.", 
				  "Un parachute."],
		 correct: "La pluie.",
	},
	{
		id: "6",
		question: "Pourquoi place-t-on la main au-dessus des yeux plutôt que devant lorsqu'on regarde au loin ?",
		options: ["Pour éviter les éblouissements.", 
				  "Pour voir plus loin.", 
				  "Parce que si on la mettait devant, on ne verrait rien.", 
				  "Pour faire semblant d'être un explorateur."],
		correct:  "Parce que si on la mettait devant, on ne verrait rien."
	},
	{
		id: "7",
		question: "Pourquoi un fou mettrait-il son journal dans le réfrigérateur ?",
		options: ["Pour empêcher l'encre de couler.", 
				  "Pour avoir des nouvelles fraîches.", 
		 		  "Pour le lire au petit déjeuner.", 
				  "Pour que les mots ne fondent pas."],
		correct:  "Pour avoir des nouvelles fraîches."
	},
	{
		id: "8",
		question: "Un fermier avait 17 vaches, mais toutes sont mortes sauf 9. Combien de vaches restent-il au fermier ?",
		options: ["8.", 
				  "9.", 
				  "7.", 
				  "10."],
		correct:  "9."
	},
	{
		id: "9",
		question: "Comment faire pour que 99 + 1 = 44 soit possible ?",
		options: ["En utilisant une calculatrice.", 
				  "En décortiquant les nombres.", 
				  "En inversant les chiffres.", 
				  "4+20+10+9+1=44."],
		correct:  "4+20+10+9+1=44."
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
