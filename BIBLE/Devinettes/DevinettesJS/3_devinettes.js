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
		question: "Quel est le mois où Nehémia se trouvait à Suse le château ? (Nehémie 1:1)",
		options: ["Mois de Kislev.", 
				  "Mois de Nissan.", 
				  "Mois de Tishri.", 
				  "Mois d'Adar."],
		correct: "Mois de Kislev."
	},
	{
		id: "1",
		question: "Qui était l'un des frères de Nehémia qui entra avec d'autres hommes de Juda ? (Nehémie 1:2)",
		options: ["Hanani.", 
				  "Eliezer.", 
				  "Josué.", 
				  "Malachie."],
		correct: "Hanani."
	},
	{
		id: "2",
		question: "Pourquoi Nehémia était-il dans le deuil pendant des jours ? (Nehémie 1:3)",
		options: ["La muraille de Jérusalem était démolie.", 
				  "La ville de Jérusalem été brûlées.", 
		          "La situation des rescapés était très mauvaise.", 
		          "Tous les habitants étaient morts."],
		correct: "La muraille de Jérusalem était démolie."
	},
	{
		id: "3",
		question: "Quand Nehémia a-t-il commencé à pleurer après avoir entendu les nouvelles ? (Nehémie 1:4)",
		options: ["À l'annonce des nouvelles.", 
			      "Dès qu'il a entendu les paroles.", 
			      "Quand il a vu la situation à Jérusalem.", 
			      "Après avoir parlé à Hanani."],
		correct: "Dès qu'il a entendu les paroles."
	},
	{
		id: "4",
		question: "Que demande Nehémia à Dieu de se souvenir dans sa prière ? (Nehémie 1:8)",
		options: ["La parole donnée à Moïse.", 
				  "La parole donnée à David.", 
				  "La parole donnée à Salomon.", 
				  "La parole donnée à Samuel."],
		correct: "La parole donnée à Moïse."
	},
	{
		id: "5",
		question: "Qui était assis à côté du roi lorsque Nehémia a demandé à être envoyé vers Juda ? (Néhémie 2:6)",
		options: ["Son fils.", 
				  "Son épouse royale.", 
				  "Son conseiller.", 
				  "Son intendant."],
		correct: "Son épouse royale.",
	},
	{
		id: "6",
		question: "Que demande Nehémia au roi Artaxerxès pour la reconstruction de Jérusalem ? (Néhémie 2:8)",
		options: ["Des soldats.", 
				  "Des arbres.", 
				  "De l'argent.", 
				  "Des lettres de laisser passer."],
		correct:  "Des arbres."
	},
	{
		id: "7",
		question: "Comment Nehémia est-il retourné à Jérusalem après son examen des murailles ? (Néhémie 2:14)",
		options: ["Par la Porte de la Vallée.", 
				  "Par la Porte des Tas de Cendres.", 
		 		  "Par la Porte de la Source.", 
				  "Par la Porte de Jérusalem."],
		correct:  "Par la Porte de la Vallée."
	},
	{
		id: "8",
		question: "Qui n'était pas au courant des actions de Nehémia pendant son examen des murailles ? (Néhémie 2:16) ",
		options: ["Les Juifs", 
				  "Les prêtres.", 
				  "Les chefs adjoints.", 
				  "Les nobles."],
		correct:  "Les chefs adjoints."
	},
	{
		id: "9",
		question: "Que Nehémie affirme-t-il que Sânballat, Tobia, l'Ammonite et Guéshem n'ont pas dans Jérusalem ? (2 Rois 5:10-14)",
		options: ["Part, droit, ni mémorial.", 
				  "Argent, pouvoir, ni autorité.", 
				  "Héritage, bénédiction, ni gloire.", 
				  "Influence, respect, ni soutien."],
		correct:  "Part, droit, ni mémorial."
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
    window.location.href = "./3_devinettes.html";
});