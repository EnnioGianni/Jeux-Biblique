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
		question: "Vrai ou faux : Les fils de Juda ont pris possession de Jérusalem sans la livrer au feu. (Juges 1:8) ",
		options: ["Ils ont livré la ville au feu.", 
				  "Ils ont laissé la ville intacte.", 
				  "Ils ont construit des fortifications.", 
				  "Ils ont pris la ville sans combat."],
		correct: "Ils ont livré la ville au feu."
	},
	{
		id: "1",
		question: "Vrai ou faux : Les habitants de la basse plaine ont été dépossédés grâce aux chars armés de faux. (Juges 1:19)",
		options: ["Juda a dépossédé les habitants de la montagne.", 
				  "Les chars armés de faux ont empêché Juda de déposséder les habitants de la basse plaine.", 
				  "Les habitants de la basse plaine ont été facilement vaincus.", 
				  "Les chars de fer étaient l'avantage des habitants de la plaine."],
		correct: "Les chars armés de faux ont empêché Juda de déposséder les habitants de la basse plaine."
	},
	{
		id: "2",
		question: "Vrai ou faux : Caleb a donné sa fille Aksa en mariage pour la capture de Qiriath-Sépher. (Juges 1:12-13)",
		options: ["Caleb a promis Aksa à celui qui capturerait Qiriath-Sépher.", 
				  "Othniel a capturé Louz et a reçu Aksa.", 
		          "Aksa a été donnée en mariage pour la capture de Bethel.", 
		          "Le mariage a été une récompense pour la prise de la ville."],
		correct: "Caleb a promis Aksa à celui qui capturerait Qiriath-Sépher."
	},
	{
		id: "3",
		question: "Vrai ou faux : Les fils de Benjamin ont chassé les Yebousites de Jérusalem. (Juges 1:21)",
		options: ["Les Yebousites ont été chassés par les fils de Benjamin.", 
			      "Les Yebousites continuent d'habiter avec les fils de Benjamin à Jérusalem.", 
			      "Jérusalem a été entièrement prise par les fils de Benjamin.", 
			      "Les Yebousites ont été totalement expulsés de la ville."],
		correct: "Les Yebousites continuent d'habiter avec les fils de Benjamin à Jérusalem."
	},
	{
		id: "4",
		question: "Vrai ou faux : Manassé a réussi à chasser les habitants de Meguiddo. (Juges 1:27)",
		options: ["Manassé a pris possession de toutes les localités mentionnées.", 
				  "Manassé a chassé tous les Cananéens sans exception.", 
				  "Manassé ne prit pas possession des habitants de Meguiddo.", 
				  "Les efforts de Manassé ont abouti à une expulsion complète."],
		correct:  "Manassé ne prit pas possession des habitants de Meguiddo."
	},
	{
		id: "5",
		question: "Vrai ou faux : Asher a chassé les habitants de Rehob, Sidon d’Ahlab, d’Akzib, de Helba, d’Aphiq. (Juges 1:31)",
		options: ["Ils ont contnuer a habité au milieu des Cananéens sans etre les chasser.", 
				  "Les habitants de Rehob ont été complètement chassés.", 
				  "Ils ont établi des alliances avec les habitants.", 
				  "Ils ont négocié pour la paix."],
		correct: "Ils ont contnuer a habité au milieu des Cananéens sans etre les chasser.",
	},
	{
		id: "6",
		question: "Vrai ou faux : Naphtali a chassé les habitants de Beth-Shémesh et de Beth-Anath, les assujettissant au travail forcé. (Juges 1:33)",
		options: ["Les habitants de ces villes sont devenus propriété pour le travail forcé.", 
				  "Naphtali a habité au milieu des Cananéens.", 
				  "Les habitants de Beth-Shémesh et de Beth-Anath ont été chassés.", 
				  "Naphtali a intégré les villes sans opposition."],
		correct:  "Les habitants de ces villes sont devenus propriété pour le travail forcé."
	},
	{
		id: "7",
		question: "Vrai ou faux : Les Amorites ont permis aux fils de Dân de descendre dans la basse plaine. (Juges 1:34)",
		options: ["Les Amorites ont refoulé les fils de Dân dans la région montagneuse.", 
				  "Les fils de Dân ont habité paisiblement dans la basse plaine.", 
		 		  "Les Amorites et les fils de Dân ont cohabité sans conflits.", 
				  "Les Amorites ont encouragé les Dânites à utiliser la plaine pour l'agriculture."],
		correct: "Les Amorites ont refoulé les fils de Dân dans la région montagneuse."
	},
	{
		id: "8",
		question: "Vrai ou faux : Les fils de Juda ont complètement chassé les Cananéens du territoire.(Juges 1:28)",
		options: ["Israël a réduit les Cananéens au travail forcé sans les chasser complètement.", 
				  "Les Cananéens ont été entièrement éliminés par les fils de Juda.", 
				  "Les fils de Juda ont laissé certains Cananéens vivre parmi eux.", 
				  "La victoire sur les Cananéens a été totale et sans exception."],
		correct: "Israël a réduit les Cananéens au travail forcé sans les chasser complètement."
	},
	{
		id: "9",
		question: "Vrai ou faux : Les Yebousites ont continué d'habiter à Jérusalem avec les fils de Joseph. (Juges 1:21)",
		options: ["Les Yebousites ont habité avec les fils de Benjamin à Jérusalem.", 
				  "Les fils de Joseph ont chassé tous les Yebousites de Jérusalem.", 
				  "Les Yebousites et les fils de Joseph ont formé une alliance.", 
				  "Joseph a établi une paix durable avec les Yebousites."],
		correct: "Les Yebousites ont habité avec les fils de Benjamin à Jérusalem."
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