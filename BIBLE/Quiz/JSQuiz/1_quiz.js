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
		question: "De quelle ville  Melchisédek ete roi ? (Genèse 14:18) ",
		options: ["Jérusalem.", 
				  "Salem.", 
				  "Béthel.", 
				  "Hébron."],
		correct: "Salem."
	},
	{
		id: "1",
		question: "Combien de versets comporte le Psaume 119, le plus long des psaumes? (Psaume 119)",
		options: ["150.", 
				  "176.", 
				  "200.", 
				  "222."],
		correct: "176."
	},
	{
		id: "2",
		question: "Qui a été le roi d'Israël qui a assassiné son frère Amasa. (1 Rois 2:5-6)",
		options: ["Joas.", 
				  "Joab.", 
		          "Jotham.", 
		          "Joram."],
		correct: "Joab."
	},
	{
		id: "3",
		question: "Qui a prophétisé la naissance de Jean-Baptiste et la venue de Jésus ? (Luc 1:67-79)",
		options: ["Zacharie.", 
			      "Zachée.", 
			      "Jérémie.", 
			      "Malachie."],
		correct: "Zacharie."
	},
	{
		id: "4",
		question: "Dans quel livre de la Bible trouve-t-on le récit de la guérison de Naaman, le commandant syrien, de la lèpre ? (2 Rois 5:1-14)",
		options: ["2 Rois.", 
				  "1 Rois.", 
				  "1 Samuel.", 
				  "2 Samuel."],
		correct: "2 Rois."
	},
	{
		id: "5",
		question: "Qui n'a pas été choisi pour remplacer Judas Iscariote après sa trahison ? (1 Rois 3:16-28)",
		options: ["Paul.", 
				  "Timothée.", 
				  "Barsabas.", 
				  "Matthias."],
		correct: "Barsabas.",
	},
	{
		id: "6",
		question: "Qui était le grand-père de David, le célèbre roi d'Israël ? (Ruth 4:21-22))",
		options: ["Josias", 
				  "Salomon.", 
				  "Boaz.", 
				  "Obed."],
		correct:  "Obed."
	},
	{
		id: "7",
		question: "Quel est le nom de la femme qui a été la mère de Moïse ? (Exode 6:20)",
		options: ["Sara.", 
				  "Rébecca.", 
		 		  "Jochebed.", 
				  "Myriam."],
		correct: "Jochebed."
	},
	{
		id: "8",
		question: "Qui a été le roi d'Israël qui a construit un temple dédié à Baal et a encouragé le culte de ce dieu païen ? (1 Rois 16:30-33)",
		options: ["Manassé.", 
				  "Achaz.", 
				  "Achab.", 
				  "Joram."],
		correct: "Achab."
	},
	{
		id: "9",
		question: "Qui était le roi d'Israël qui a consulté une sorcière pour contacter le prophète Samuel décédé avant une bataille ? (1 Samuel 28:3-25)",
		options: ["Achaz.", 
				  "Josias.", 
				  "Saül.", 
				  "Manassé."],
		correct: "Saül."
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
