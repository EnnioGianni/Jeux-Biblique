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
		question: "Quelle était la condition de la femme de Manoah avant l'apparition de l'ange ? (Juges 13:2.) ",
		options: ["Fertile.", 
				  "Sans enfant.", 
				  "Stérile.", 
				  "Enceinte."],
		correct: "Stérile."
	},
	{
		id: "1",
		question: "Qui était le fils de Manoah ? (Juges 13:24)",
		options: ["David.", 
				  "Goliath.", 
				  "Samson.", 
				  "Jonathan."],
		correct: "Samson."
	},
	{
		id: "2",
		question: "Quelle était la ville d'origine de Manoah? (Juges 13:2)",
		options: ["Lévite de Bethléem.", 
				  "Danite de Tsora.", 
		          "Jéricho.", 
		          "Jude."],
		correct: "Danite de Tsora."
	},
	{
		id: "3",
		question: "Quelle fut la réaction de la femme de Manoah à la crainte de mourir? (Juges 13:23)",
		options: ["Elle pleura.", 
			      "Elle rassura Manoah.", 
			      "Elle pria Jéhovah.", 
			      "Elle offrit un autre holocauste."],
		correct: "Elle rassura Manoah."
	},
	{
		id: "4",
		question: "Où Manoah fut-il enterré ? (Juges 13:31)",
		options: ["Entre Tsora et Eshtaol.", 
				  "À Timna.", 
				  "Dans la vallée de Sorek.", 
				  "À Jérusalem."],
		correct: "Entre Tsora et Eshtaol."
	},
	{
		id: "5",
		question: "Quel acte Samson a-t-il accompli avec ses parents en route pour Timna ? (Juges 14:9)",
		options: ["Il a raconté une parabole.", 
				  "Il a chanté une chanson.", 
				  "Il leur a offert du miel.", 
				  "Il a tué un lion."],
		correct: "Il leur a offert du miel."
	},
	{
		id: "6",
		question: "Quel était le désir de Samson que ses parents désapprouvaient ? (Juges 14:3)",
		options: ["De devenir roi.", 
				  "D'épouser une Philistine.", 
				  "De quitter sa maison.", 
				  "De devenir naziréen."],
		correct:  "D'épouser une Philistine."
	},
	{
		id: "7",
		question: "Ou il à prit le miel que Samson a offert à ces parents ? (Juges 14:8)",
		options: ["Dans une ruche.", 
				  "Il fait fuir un essaim d'abeilles.", 
		 		  "Dans le corps d'un lion.", 
				  "Sur un arbre."],
		correct: "Dans le corps d'un lion."
	},
	{
		id: "8",
		question: "Pourquoi Manoah et sa femme pensèrent-ils qu'ils allaient mourir ? (Juges 13:22)",
		options: ["Pour avoir mangé du miel.", 
				  "Pour avoir vu l'ange.", 
				  "Pour avoir offert un mauvais holocauste.", 
				  "Pour avoir désobéi."],
		correct: "Pour avoir vu l'ange."
	},
	{
		id: "9",
		question: "Quelle fut la réaction de Manoah quand le messager monta dans la flamme ? (Juges 13:20)",
		options: ["Il le loua.", 
				  "Il a eu très peur.", 
				  "Se mirent à genoux.", 
				  "Ils se cachèrent."],
		correct: "Se mirent à genoux."
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