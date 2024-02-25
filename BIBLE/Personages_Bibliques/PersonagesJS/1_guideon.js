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
		question: "Quel était le rang de Guidéon dans sa famille et sa tribu ? (Juges 6:15) ",
		options: ["Le chef respecté de la tribu de Manassé.", 
				  "le plus insignifiant de la maison de son père.", 
				  "Un guerrier éminent d'Ophra.", 
				  "Un prêtre d'Israël."],
		correct: "le plus insignifiant de la maison de son père."
	},
	{
		id: "1",
		question: "Où demeurait Guidéon ? (Juges 6:11)",
		options: ["À l'est du Jourdain.", 
				  "À Ophra, vraisemblablement à l'O. du Jourdain.", 
				  "Dans la capitale de Manassé.", 
				  "À Jérusalem, le cœur d'Israël."],
		correct: "À Ophra, vraisemblablement à l'O. du Jourdain."
	},
	{
		id: "2",
		question: "Pourquoi Guidéôn a-t-il accompli la tâche de détruire l'autel de Baal pendant la nuit ? (Juges 6:27)",
		options: ["Parce qu'il avait reçu des instructions spécifiques de le faire la nuit.", 
				  "Parce qu'il craignait la réaction de la communauté et des adorateurs de Baal.", 
		          "Parce que la nuit était le seul moment où Baal était considéré comme vulnérable.", 
		          "Parce que le rituel nécessitait que cela soit fait sous la couverture de l'obscurité."],
		correct: "Parce qu'il craignait la réaction de la communauté et des adorateurs de Baal."
	},
	{
		id: "3",
		question: "Comment Guidéôn a-t-il vérifié que le messager lui parlant était véritablement un ange de Jéhovah ? (Juges 6:19-21)",
		options: ["En demandant à l'ange de faire pleuvoir du feu du ciel.", 
			      "En plaçant une toison sur le sol et en demandant que seule la toison soit mouillée.", 
			      "En offrant une offrande que l'ange consume par le feu.", 
			      "En demandant un signe dans les étoiles."],
		correct: "En offrant une offrande que l'ange consume par le feu."
	},
	{
		id: "4",
		question: "Question: Comment Guidéôn a-t-il puni les hommes de Soukkoth pour avoir refusé de fournir de la nourriture à son armée ? (Juges 8:16)",
		options: ["En les bannissant de leur ville.", 
				  "En leur donnant une grande quantité d'or et d'argent comme amende.", 
				  "En utilisant des épines et des ronces pour leur donner une leçon.", 
				  "En imposant un jeûne de 40 jours."],
		correct: "En utilisant des épines et des ronces pour leur donner une leçon."
	},
	{
		id: "5",
		question: "Quelle était la réaction des Madianites à l'attaque surprise de Guidéôn et de ses hommes ? (Juges 7:21-22)",
		options: ["Ils se sont rendus immédiatement.", 
				  "Ils ont contre-attaqué avec une grande force.", 
				  "Ils ont crié et se sont enfuis dans la confusion.", 
				  "Ils ont négocié pour la paix."],
		correct: "Ils ont crié et se sont enfuis dans la confusion.",
	},
	{
		id: "6",
		question: "Quel traitement Guidéôn a-t-il réservé aux rois madianites Zébah et Tsalmounna ? (Juges 8:20-21)",
		options: ["Il les a fait prisonniers et les a amenés à Jérusalem.", 
				  "Il les a exécutés après que son fils a hésité à le faire.", 
				  "Il les a libérés en échange de trésors.", 
				  "Il les a contraints à travailler pour Israël."],
		correct:  "Il les a exécutés après que son fils a hésité à le faire."
	},
	{
		id: "7",
		question: "Pourquoi le fils de Guidéôn a-t-il refusé de tuer les deux rois madianites, Zébah et Tsalmounna ? (Juges 8:20)",
		options: ["Parce qu'il n'avait pas d'arme.", 
				  "Parce qu'il était en désaccord avec son père.", 
		 		  "Parce qu'il était encore jeune et avait peur.", 
				  "Parce qu'il croyait en la miséricorde envers les ennemis."],
		correct: "Parce qu'il était encore jeune et avait peur."
	},
	{
		id: "8",
		question: "Où Gédéon est-il passé en revenant de la guerre ? (Juges 13:1)",
		options: ["Par le passage qui monte vers Bethléem.", 
				  "Par le passage qui monte vers Hérès.", 
				  "Par le passage qui monte vers Jéricho.", 
				  "Par le passage qui monte vers Gilgal."],
		correct: "Par le passage qui monte vers Hérès."
	},
	{
		id: "9",
		question: "Question : Quelle fut la conséquence de l'exposition de l'éphod par Gédéon dans sa ville ? (Juges 8:27)",
		options: ["Cela a conduit à la paix dans tout Israël pendant de nombreuses années.", 
				  "Cela a renforcé la foi des Israélites en l'Éternel.", 
				  "Cela a provoqué la colère de l'Éternel contre Israël.", 
				  "Cela a entraîné la pratique de la prostitution spirituelle par tout Israël."],
		correct: "Cela a entraîné la pratique de la prostitution spirituelle par tout Israël."
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