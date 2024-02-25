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
		question: "Quel est le premier élément de la bénédiction que les fils d'Aaron doivent prononcer sur les fils d'Israël? (Ex. 6:24) ",
		options: ["Que Jéhovah te bénisse et te garde.", 
				  "Que Jéhovah fasse briller sa face vers toi.", 
				  "Que Jéhovah lève sa face vers toi.", 
				  "Que Jéhovah te donne la paix."],
		correct: "Que Jéhovah te bénisse et te garde."
	},
	{
		id: "1",
		question: "Quel est l'effet de mettre le nom de Jéhovah sur les fils d'Israël selon le texte ? (Ex. 6:27)",
		options: ["Ils seront bénis.", 
				  "Ils seront sanctifiés.", 
				  "Ils seront protégés.", 
				  "Ils recevront la paix."],
		correct: "Ils seront bénis."
	},
	{
		id: "2",
		question: "Qui doit prononcer la bénédiction sur les fils d'Israël pour que Jéhovah les bénisse ? (Ex. 6:23)",
		options: ["Moïse.", 
				  "Aaron et ses fils.", 
		          "Les prêtres.", 
		          "Les lévites."],
		correct: "Aaron et ses fils."
	},
	{
		id: "3",
		question: "Quel geste symbolique les prêtres doivent-ils accomplir pour bénir les fils d'Israël ? (Ex. 6:27)",
		options: ["Lever les mains.", 
			      "Dire la bénédiction.", 
			      "Mettre le nom de Jéhovah sur eux.", 
			      "Offrir un sacrifice."],
		correct: "Mettre le nom de Jéhovah sur eux."
	},
	{
		id: "4",
		question: "Quelle promesse est faite concernant l'action de bénir les fils d'Israël ? (Ex. 6:27)",
		options: ["Ils seront plus forts.", 
				  "Ils prospéreront.", 
				  "Jéhovah les bénira.", 
				  "Leurs ennemis seront vaincus."],
		correct: "Jéhovah les bénira."
	},
	{
		id: "5",
		question: "Quels animaux un naziréen doit-il apporter au prêtre le huitième jour après sa purification ? (Ex. 6:10)",
		options: ["Deux tourterelles.", 
				  "Deux jeunes pigeons.", 
				  "Un agneau.", 
				  "Une chèvre."],
		correct: "Deux tourterelles ou deux jeunes pigeons.",
	},
	{
		id: "6",
		question: "Qu'est-ce que le naziréen fait de sa chevelure après qu'il l'a rasée? (Ex. 6:18)",
		options: ["La brûle sous le sacrifice de communion.", 
				  "La donne en offrande.", 
				  "La garde comme souvenir.", 
				  "La jette."],
		correct:  "La brûle sous le sacrifice de communion."
	},
	{
		id: "7",
		question: "Quel sacrifice un naziréen doit-il apporter à la fin de son naziréat comme Holocauste ? (Ex. 6:14)",
		options: ["Un jeune bélier sans défaut.", 
				  "Une agnelle sans défaut.", 
		 		  "Un chevre sans défaut.", 
				  "Une corbeille de gâteaux sans levain."],
		correct: "Un jeune bélier sans défaut."
	},
	{
		id: "8",
		question: "À qui Moïse n'a-t-il pas donné de chariots ni de bovins, et pour quelle raison ? (Ex. 7:9)",
		options: ["Aux fils de Guershôn, car leur service était lié à la musique sacrée.", 
				  "Aux fils de Merari, car ils étaient chargés de la maintenance du tabernacle.", 
				  "Aux fils de Qehath, car le service du lieu saint leur incombait.", 
				  "Aux fils d'Aaron, car ils étaient prêtres et non chargés du transport."],
		correct: "Aux fils de Qehath, car le service du lieu saint leur incombait."
	},
	{
		id: "9",
		question: "Quelles étaient les étapes entreprises par Moïse pour sanctifier le tabernacle et ses accessoires ? (Ex. 7:1)",
		options: ["Il a chanté des psaumes sacrés.", 
				  "Il a réalisé une cérémonie de prière.", 
				  "Il a oint le tabernacle et son mobilier.", 
				  "Il a invoqué le nom de Jéhovah sur eux."],
		correct: "Il a oint le tabernacle et son mobilier."
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