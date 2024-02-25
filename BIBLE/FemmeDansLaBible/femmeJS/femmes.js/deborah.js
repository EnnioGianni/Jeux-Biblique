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
		question: "Quel rôle Déborah jouait-elle parmi le peuple d'Israël ? (uges 4:4-5) ",
		options: ["Elle était renne.", 
				  "Guidé le peuple.", 
				  "Prophétesse.", 
				  "Prêtresse."],
		correct: "Prophétesse."
	},
	{
		id: "1",
		question: "Quelle autre fonction Déborah exerçait-elle en plus d'être prophétesse ? (Juges 4:4-5)",
		options: ["Enseigne la loi.", 
				  "Guérisseuse.", 
				  "Juge.", 
				  "Pour écrire des lois."],
		correct: "Juge."
	},
	{
		id: "2",
		question: "Qui était le mari de Déborah, la prophétesse et juge en Israël ?(Juges 4:4)",
		options: ["Barak.", 
				  "Lappidoth.", 
		          "Ehud.", 
		          "Gédéon."],
		correct: "Lappidoth."
	},
	{
		id: "3",
		question: "Où habitait Déborah, la prophétesse. ?(Juges 4:5)",
		options: ["Sous un chêne, près de Jéricho.", 
			      "Sous un palmier entre Ramah et Béthel.", 
			      "Dans une tente, près du Jourdain.", 
			      "Dans une maison, à Jérusalem."],
		correct: "Sous un palmier entre Ramah et Béthel."
	},
	{
		id: "4",
		question: "Pourquoi Jéhovah a-t-il utilisé Déborah dans le cadre du conflit avec l'armée cananéenne du roi Jabin ?(Juges 4:6-10)",
		options: ["Pour négocier la paix avec le roi Jabin.", 
				  "Pour rassembler dix mille hommes afin de vaincre l'armée de Siséra.", 
				  "Pour enseigner aux Israélites les lois de Dieu.", 
				  "Pour construire un autel en l'honneur de Jéhovah."],
		correct: "Pour rassembler dix mille hommes afin de vaincre l'armée de Siséra."
	},
	{
		id: "5",
		question: "Quelle prophétie de Déborah s'est réalisée lors du conflit avec l'armée cananéenne ?(Juges 4:6-10; 17-22)",
		options: ["Barak deviendrait le roi d'Israël.", 
				  "Les armées d'Israël vaincraient sans combattre.", 
				  "La terre d'Israël connaîtrait 40 ans de paix.", 
				  "Qu’est la victoire reviendrait à une femme."],
		correct: "Qu’est la victoire reviendrait à une femme.",
	},
	{
		id: "6",
		question: "À quelle femme est revenue la chose embellissante qu’est la victoire, selon la prophétie de Déborah ?(Juges 4:6-10; 17-22)",
		options: ["Rachel.", 
				  "Esther.", 
				  "Jaël.", 
				  "Hanna."],
		correct:  "Jaël."
	},
	{
		id: "7",
		question: "Comment sait-on que Déborah a composé, en partie ou en totalité, le cantique célébrant la victoire sur Sisera. (Juges 5)",
		options: ["Parce que le cantique mentionne Barak par son nom.", 
				  "Parce qu'une partie du cantique est rédigée à la première personne.", 
		 		  "Parce que Samuel l'a attribué à Déborah.", 
				  "Un Manteau.Parce que les anciens d'Israël ont témoigné de sa composition"],
		correct: "Parce qu'une partie du cantique est rédigée à la première personne."
	},
	{
		id: "8",
		question: "Selon le cantique de Déborah et Barak, qui est décrite comme éprouvant une déception à cause de l'issue de la bataille ? (Juges 5)",
		options: ["Les guerriers de Canaan.", 
				  "La famille de Siséra.", 
				  "La mère de Siséra.", 
				  "Les habitants de Kédesch."],
		correct: "La mère de Siséra."
	},
	{
		id: "9",
		question: "Pourquoi Déborah a-t-elle accepté d'accompagner Barak au combat ?(Juges 4:8-9)",
		options: ["Pour montrer sa supériorité sur Barak.", 
				  "Parce qu'elle avait reçu un signe divin spécifique pour le faire.", 
				  "Parce que Barak refusait d'aller sans elle.", 
				  "Faveur, Compassion."],
		correct: "Pour mener elle-même les troupes à la victoire."
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