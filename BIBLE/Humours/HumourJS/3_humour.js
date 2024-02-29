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

// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Que faut-il faire à la fois pour la barbe du père Noël et un arbre ?",
		options: ["Nécessite un entretien régulier.", 
				  "Implique un acte de coupe.", 
				  "Ils faut tailler les deux.", 
				  "Fait partie de l'entretien esthétique ou de croissance."],
		 correct: "Ils faut tailler les deux."
	},
	{
		id: "1",
		question: "Comment le boulanger organise-t-il ses pains au chocolat ?",
		options: ["Selon une méthode de tri spécifique.", 
				  "En utilisant un critère de taille.", 
				  "Par ordre croissant.", 
				  "De manière à faciliter le choix des clients."],
		 correct: "Par ordre croissant."
	},
	{
		id: "2",
		question: "Quelle est la boisson préférée de Teddy Riner ?",
		options: ["Une boisson très légère.", 
				  "Pas une boisson énergétique.", 
		          "Le jus d’eau.", 
		          "L'eau."],
		 correct: "Le jus d’eau."
	},
	{
		id: "3",
		question: "Quel est le comble pour un cycliste ?",
		options: ["Perdre les pédales.", 
			      "Roulée à roux libre.", 
			      "Crevée avant de partir.", 
			      "De faire un régime sans selle."],
		 correct: "De faire un régime sans selle."
	},
	{
		id: "4",
		question: "Qu’est-ce qui est orange et qui va très vite dans la rue ?",
		options: ["Un fruit en mouvement.", 
				  "Un agrume en déplacement.", 
				  "Un agrume pressé par le temps.", 
				  "Une orange pressée."],
		 correct: "Une orange pressée."
	},
	{
		id: "5",
		question: "Quel est le dessert préféré d’un cannibale ?",
		options: ["Un petit suisse.", 
				  "Un Camembert.", 
				  "Chèvre frais.", 
				  "Un parachute."],
		 correct: "Un petit suisse.",
	},
	{
		id: "6",
		question: "Qu'est-ce qui est jaune et qui attend ?",
		options: ["Une banane au repos.", 
				  "Un citron pas pressé.", 
				  "Un poussin immobile.", 
				  "Une étoile fixe."],
		correct:  "Un citron pas pressé."
	},
	{
		id: "7",
		question: "Quel plat est souvent associé à l'activité des pompiers en extérieur ?",
		options: ["La paëlla.", 
				  "Le barbecue.", 
		 		  "Les brochettes.", 
				  "Chantée, allumée le feu."],
		correct:  "Le barbecue."
	},
	{
		id: "8",
		question: "Pourquoi le livre de mathématiques était-il toujours aussi déprimé ?",
		options: ["Il avait trop de problèmes.", 
				  "Ses pages étaient vierges.", 
				  "Il y avait trop de lettres.", 
				  "Il manquait de figures."],
		correct:  "Il avait trop de problèmes."
	},
	{
		id: "9",
		question: "Quel est le moyen le plus simple de doubler votre argent ?",
		options: ["Investir en bourse.", 
				  "Jouer à la loterie.", 
				  "Le mettre devant un miroir.", 
				  "Ouvrir un compte d'épargne."],
		correct:  "Le mettre devant un miroir."
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



/*Boutton retour*/

document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "./3_humour.html";
});