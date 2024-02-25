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
let count = 31;
let countdown;

//Tableau de questions et d’options
// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Qui est désigné comme celui qui prépare le chemin dans l'Évangile selon Luc?(Luc ch. 1) ",
		options: ["Zacharie.", 
				  "Jean.", 
				  "Pierre.", 
				  "Jacques."],
		correct: "Jean."
	},
	{
		id: "1",
		question: "Qui a demandé à Jésus: Seigneur, enseigne-nous à prier? (Luc 11:1)",
		options: ["Pierre.", 
				  "Jacques.", 
				  "Un de ses disciples.", 
				  "Thomas."],
		correct: "Un de ses disciples."
	},
	{
		id: "2",
		question: "Dans l'Évangile selon Luc, quel exemple Jésus utilise-t-il pour illustrer que les prophètes ne sont pas toujours acceptés dans leur propre patrie, en mentionnant la guérison d'un étranger par un prophète d'Israël? (Luc 4:27)",
		options: ["La guérison du serviteur du centurion.", 
				  "La multiplication des pains.", 
		          "La résurrection du fils de la veuve.", 
		          "La purification de Naamân le Syrien."],
		correct: "La purification de Naamân le Syrien."
	},
	{
		id: "3",
		question: "Qui est le premier personnage féminin mentionné comme annonçant la résurrection de Jésus aux apôtres? (Luc 24:10)",
		options: ["Marie Madeleine.", 
			      "Marie, mère de Jacques .", 
			      "Salomé .", 
			      "Joanna."],
		correct: "Marie Madeleine."
	},
	{
		id: "4",
		question: "Qu'a-t-il dit Jésus de Zachée après sa conversion? (Luc 19:9)",
		options: ["Fils d'Abraham.", 
				  "Grand prêtre.", 
				  "Serviteur fidèle.", 
				  "Berger des brebis."],
		correct: "Fils d'Abraham."
	},
	{
		id: "5",
		question: "Dans la parabole du riche et de Lazare, que demande le riche à Abraham depuis le lieu de tourment ? (Luc 16:23-24)",
		options: ["Qu'il permette de retourner parmi les vivants pour changer son destin.", 
				  "Qu'il envoie Lazare tremper le bout de son doigt dans l'eau pour rafraîchir sa langue.", 
				  "Qu'il envoie Lazare avec un peu de nourriture pour le soulager.", 
				  " Qu'Abraham envoie Lazare lui apporter du réconfort par ses paroles."],
		correct: "Qu'il envoie Lazare tremper le bout de son doigt dans l'eau pour rafraîchir sa langue.",
	},
	{
		id: "6",
		question: "Où Jésus passait-il ses nuits après avoir enseigné dans le Temple, selon l'Évangile selon Luc ? (Luc 21:37-38)",
		options: ["Sur le mont des Oliviers.", 
				  "Dans le jardin de Gethsémani.", 
				  "Dans la vallée du Cédron.", 
				  "À Béthanie avec ses amis."],
		correct:  "Sur le mont des Oliviers."
	},
	{
		id: "7",
		question: "Par où Jésus est-il passé en route vers Jérusalem, selon l'Évangile selon Luc ? (Luc 17:11)",
		options: ["Entre la Judée et la Galilée.", 
				  "À travers le désert de Judée.", 
		 		  "Entre la Samarie et la Galilée.", 
				  "Le long du Jourdai."],
		correct:  "Entre la Samarie et la Galilée."
	},
	{
		id: "8",
		question: "Combien de temps le ciel est-il resté fermé, entraînant une grande famine en Israël à l'époque d'Élie, selon ce que Jésus a révélé dans l'Évangile selon Luc ? (Luc 4:25) ",
		options: ["Un an et six mois.", 
				  "Deux ans.", 
				  "Trois ans et un mois.", 
				  "Trois ans et six mois."],
		correct:  "Trois ans et six mois."
	},
	{
		id: "9",
		question: "Dans quelle ville de Galilée Jésus a-t-il rencontré un homme possédé par un esprit impur dans la synagogue le jour du sabbat ? (Luc 4:33)",
		options: ["Nazareth.", 
				  "Béthsaïde.", 
				  "Capharnaüm.", 
				  "Tibériade."],
		correct:  "Capharnaüm."
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
        count = 31;
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
    count = 31;
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
