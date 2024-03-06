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
		question: "Qui est l'homme que Jéhovah a envoyé pour délivrer Israël de la main de Madiân? (Juges 6:8)",
		options: ["Homme fort et vaillant.", 
				  "Prophète envoyé par Jéhovah.", 
				  "Fils de Yoash.", 
				  "Ange de Jéhovah."],
		correct: "Prophète envoyé par Jéhovah."
	},
	{
		id: "1",
		question: "Quel est le nom donné à l'autel que Guidéôn a construit après que l'ange de Jéhovah lui est apparu? (Juges 6:24)",
		options: ["Jéhovah-Yoash.", 
				  "Jéhovah-Shalom.", 
				  "Jéhovah-Madiân.", 
				  "Jéhovah-Amaleq."],
		correct: "Jéhovah-Shalom."
	},
	{
		id: "2",
		question: "Quel était le signe demandé par Guidéôn pour confirmer que c'était bien Jéhovah qui lui parlait? (Juges 6:21)",
		options: ["Faire apparaître une source d'eau.", 
				  " Faire tomber la pluie.", 
		          "Faire brûler la viande et les gâteaux sans levain.", 
		          "Faire pousser une vigne."],
		correct: "Faire brûler la viande et les gâteaux sans levain."
	},
	{
		id: "3",
		question: "Quel était le nom donné à Guidéôn après qu'il ait détruit l'autel de Baal? (Juges 6:32)",
		options: ["Yeroubbaal.", 
			      "Yoash.", 
			      "Madiân.", 
			      "Amaleq."],
		correct: "Yeroubbaal."
	},
	{
		id: "4",
		question: "Pourquoi Guidéôn a-t-il demandé à être assuré de la volonté de Dieu de cette manière? (Juges 6:27)",
		options: ["Par peur des hommes de la ville.", 
				  "Par curiosité.", 
				  "Pour tester la puissance de Dieu.", 
				  "Par manque de foi."],
		correct: "Par peur des hommes de la ville."
	},
	{
		id: "5",
		question: "Où Guidéôn a-t-il construit l'autel à Jéhovah? (Juges 6:26)",
		options: ["Dans la vallée de Yizréel.", 
				  "Au sommet de la forteresse.", 
				  "Sur l'aire de battage.", 
				  "Sous le grand arbre à Ophra."],
		correct: "Au sommet de la forteresse.",
	},
	{
		id: "6",
		question: "Comment les hommes de la ville ont-ils réagi après que l'autel de Baal a été abattu? (Juges 6:30)",
		options: ["Ils ont demandé à ce que Guidéôn soit sacrifié.", 
				  "Ils ont demandé à Yoash de les sauver.", 
				  "Ils ont fui la ville.", 
				  "Ils ont construit un nouvel autel."],
		correct:  "Ils ont demandé à ce que Guidéôn soit sacrifié."
	},
	{
		id: "7",
		question: "Quel était le nombre de serviteurs que Guidéôn a pris pour abattre l'autel de Baal? (Juges 6:27)",
		options: ["50.", 
				  "300.", 
		 		  "70.", 
				  "10."],
		correct:  "10."
	},
	{
		id: "8",
		question: "Quel lieu est mentionné comme point de rassemblement initial pour l'armée de Guidéôn avant la bataille contre Madiân? (Juges 7:1) ",
		options: ["La plaine de Yizréel.", 
				  "La vallée de Harod.", 
				  "La colline de Moré.", 
				  "La source de Harod."],
		correct:  "La source de Harod."
	},
	{
		id: "9",
		question: "Où les hommes d'Éphraïm ont-ils tuè Zéeb princes de Madian? (Juges 7:25)",
		options: ["Au pressoir de Zéeb.", 
				  "Au rocher d'Oreb.", 
				  "À Beth-Bara.", 
				  "Au Jourdain."],
		correct:  "Au pressoir de Zéeb."
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
    window.location.href = "./5_devinettes.html";
});