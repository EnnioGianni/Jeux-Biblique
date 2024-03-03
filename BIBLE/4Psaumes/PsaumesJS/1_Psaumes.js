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

// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
    {
		id: "0",
		question: "Qui est la portion de la part qui m’est échue et de ma coupe? (Psaume 16:5)",
		options: ["Les saints sur la terre.", 
				  "Jéhovah.", 
				  "La royauté.", 
				  "Dirigée Israël."],
		correct: "Jéhovah."
	},
	{
		id: "1",
		question: "Qu’est-ce que l’auteur refuse de verser? (Psaume 16:4)",
		options: ["Leurs libations de sang.", 
				  "Leurs prières.", 
				  "Leurs larmes.", 
				  "Leurs paroles de tromperie."],
		correct: "Leurs libations de sang."
	},
	{
		id: "2",
		question: "Où les cordeaux sont-ils tombés pour David? (Psaume 16:6)",
		options: ["En des lieux désolés.", 
				  "En des lieux agréables.", 
		          "Au shéol.", 
		          "Dans la fosse."],
		correct: "En des lieux agréables."
	},
	{
		id: "3",
		question: "Qui David a-t-il constamment placé devant lui? (Psaume 16:8)",
		options: ["Ses ennemis.", 
			      "Les saints.", 
			      "Jéhovah.", 
			      "Les méchants."],
		correct: "Jéhovah."
	},
	{
		id: "4",
		question: "Quelle partie du corps de David a été corrigée durant les nuits? (Psaume 16:7)",
		options: ["Ses reins.", 
				  "Son cœur.", 
				  "Son esprit.", 
				  "Ses pensées."],
		correct: "Ses reins."
	},
	{
		id: "5",
		question: "En quoi David souhaite-t-il être gardé? (Psaume 17:8)",
		options: ["Comme un roi.", 
				  "Comme la pupille de l’œil.", 
				  "Comme un lion.", 
				  "Au sommet de la forteresse."],
		correct: "Comme la pupille de l’œil.",
	},
	{
		id: "6",
		question: "Quelle est la demande de David concernant son jugement? (Psaume 17:2)",
		options: ["Qu’il vienne des hommes.", 
				  "Qu’il sorte de devant toi.", 
				  "Qu’il soit selon la richesse.", 
				  "Qu’il soit selon ta volonté."],
		correct:  "Qu’il sorte de devant toi."
	},
	{
		id: "7",
		question: "Quelle action David s'est-il gardé de faire avec sa bouche? (Psaume 17:3)",
		options: ["Louer les méchants.", 
				  "Transgresser.", 
		 		  "Dire des mensonges.", 
				  "Blasphème."],
		correct:  "Transgresser."
	},
	{
		id: "8",
		question: "Quelle comparaison est faite pour décrire les ennemis de David? (Psaume 17:12) ",
		options: ["Comme un jeune lion qui se tient dans des cachettes.", 
				  "Comme un jeune lion qui est prêt à dévorer.", 
				  "Comme un jeune lion qui rode.", 
				  "Comme un jeune lion qui est en embuscade."],
		correct:  "Comme un jeune lion qui se tient dans des cachettes."
	},
	{
		id: "9",
		question: "Quelle demande fait David concernant ses pas? (Psaume 17:5)",
		options: ["Qu'ils saisissent tes pistes.", 
				  "Qu'ils me mènent à la droiture.", 
				  "Qu'ils chancellent nullement.", 
				  "Qu'ils suivent les sentiers des justes."],
		correct:  "Qu'ils saisissent tes pistes."
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

        // Ajoutez des boutons pour les options et leurs écouteurs d'événements
        for (let j = 0; j < i.options.length; j++) {
            let optionBtn = document.createElement("button");
            optionBtn.classList.add("option-div");
            optionBtn.textContent = i.options[j];

            // Ajouter des écouteurs d'événements pour le survol de la souris
            optionBtn.addEventListener("mouseenter", function() {
                this.classList.add("hovered");
            });

            optionBtn.addEventListener("mouseleave", function() {
                this.classList.remove("hovered");
            });

            optionBtn.addEventListener("click", function() {
                checker(this);
            });

            div.appendChild(optionBtn);
        }

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



/*Boutton retour*/

document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "#";
});