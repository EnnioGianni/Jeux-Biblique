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
		question: "Je suis le fleuve, qui coule du trône de Dieu et de l'Agneau. Quel fleuve suis-je?(Révélation 22:1) ",
		options: ["Le fleuve de la vie.", 
				  "Le Jourdain céleste.", 
				  "Le fleuve d'eau vive.", 
				  "Le Nil spirituel."],
		correct: "Le fleuve de la vie."
	},
	{
		id: "1",
		question: "Je suis la pierre précieuse qui symbolise la première fondation de la Nouvelle Jérusalem. Quelle pierre suis-je? (Révélation 21:19)",
		options: ["Jaspe.", 
				  "Saphir.", 
				  "Chalcédoine.", 
				  "Émeraude."],
		correct: "Jaspe."
	},
	{
		id: "2",
		question: "Je suis le lieu où Jésus a prononcé la parabole du semeur. Où suis-je? (Matthieu 13:1)",
		options: ["La mer de Galilée.", 
				  "Le mont des Oliviers.", 
		          "Le désert de Judée.", 
		          "Les rues de Jérusalem."],
		correct: "La mer de Galilée."
	},
	{
		id: "3",
		question: "Je suis la ville où Paul a été arrêté après qu'une foule se soit émue contre lui, l'accusant d'enseigner contre la Loi. Où suis-je? (Actes 21:17-33)",
		options: ["Jérusalem.", 
			      "Antioche.", 
			      "Éphèse.", 
			      "Philippes."],
		correct: "Jérusalem."
	},
	{
		id: "4",
		question: "Je suis le lieu où Pierre a eu la vision d'une grande nappe remplie de toutes sortes d'animaux, Où suis-je? (Actes 8:4-10)",
		options: ["Joppé.", 
				  "Jérusalem", 
				  "Antioche.", 
				  "Césarée."],
		correct: "Joppé."
	},
	{
		id: "5",
		question: "Je suis le roi qui a reçu un royaume après la mort de mon père, Salomon. Qui suis-je? (1 Rois 11:43)",
		options: ["Rehabam.", 
				  "Jéroboam.", 
				  "Achab.", 
				  "Josaphat."],
		correct: "Rehabam.",
	},
	{
		id: "6",
		question: "je suis le lieu où le peuple d'Israël a campé juste avant de traverser la Mer Rouge. Où suis-je? (Exode 14:2)",
		options: ["Pihaïroth.", 
				  "Mara.", 
				  "Elim.", 
				  "Sinaï."],
		correct:  "Pihaïroth."
	},
	{
		id: "7",
		question: "Je suis le livre biblique qui contient le verset 'La foi est la certitude absolue... (Hébreux 11:1)",
		options: ["Romains.", 
				  "Hébreux.", 
		 		  "Jacques.", 
				  "1 Corinthiens."],
		correct:  "Hébreux."
	},
	{
		id: "8",
		question: "Je suis un objet d'or pur, porté par le grand prêtre d'Israël, qui portait les noms des douze tribus d'Israël. Quel objet suis-je? (Exode 28:15-30) ",
		options: ["L'éphod", 
				  "Le pectoral.", 
				  "La couronne.", 
				  "Le sceptre."],
		correct:  "Le pectoral."
	},
	{
		id: "9",
		question: "Je suis le fleuve dans lequel Naaman s'est baigné sept fois pour être purifié de sa lèpre. Quel fleuve suis-je? (2 Rois 5:10-14)",
		options: ["Jourdain.", 
				  "Nil.", 
				  "Euphrate.", 
				  "Tigre."],
		correct:  "Jourdain."
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
    window.location.href = "./1_devinettes.html";
});