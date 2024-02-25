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
		question: "Quel rôle Abner jouait-il dans la vie de Saül ? (1 Samuel 14:50.) ",
		options: ["Abner était un membre de la famille de Saül.", 
				  "Abner était très proche du roi.", 
				  "Il n'était pas un de ses fils.", 
				  "Abner était le chef de l'armée israélite."],
		correct: "Abner était le chef de l'armée israélite."
	},
	{
		id: "1",
		question: "Quel était le signe prophétique donné à Saül pour prouver que Dieu était avec lui, qui s'est réalisé le jour même? (1 Samuel 9:22–10:16)",
		options: ["Samuel a donné à Saül trois signes prophétiques.", 
				  "Ces signes se sont tous réalisés le même jour.", 
				  "Ces signes étaient censés prouver l'accompagnement divin.", 
				  "L'un de ces signes impliquait une rencontre spécifique."],
		correct: "Ces signes se sont tous réalisés le même jour."
	},
	{
		id: "2",
		question: "Pourquoi le royaume de Saül ne devait-il pas durer, selon Samuel? (1 Samuel 13:1-14)",
		options: ["Saül a agi sans attendre Samuel.", 
				  "Il a offert l'holocauste lui-même.", 
		          "Saül a désobéi à un commandement de Dieu transmis par Samuel.", 
		          "Saül a péché en offrant l'holocauste et de n'avoir pas obéi au commandement de Dieu donné par l'intermédiaire de Samuel."],
		correct: "Saül a péché en offrant l'holocauste et de n'avoir pas obéi au commandement de Dieu donné par l'intermédiaire de Samuel."
	},
	{
		id: "3",
		question: "Quel fut l'effet immédiat sur Saül après que l'esprit de Jéhovah l'ait quitté ? (1S 16:14-23)",
		options: ["Il devint un grand guerrier.", 
			      "Un esprit mauvais de la part de Jéhovah le terrorisa.", 
			      "Il se repentit et chercha à réparer ses fautes.", 
			      "Il fut aimé et respecté par tout Israël."],
		correct: "Un esprit mauvais de la part de Jéhovah le terrorisa."
	},
	{
		id: "4",
		question: "Quelle fut la réaction de Saül face aux succès de David dans les batailles ? (1S 19:1)",
		options: ["Il le nomma son conseiller spécial.", 
				  "Il lui offrit sa fille Mikal en mariage sans conditions.", 
				  "Il le regarda avec méfiance et lui voua une haine jalouse.", 
				  "Saül révéla à son fils Jonathan et à tous ses serviteurs son intention de faire mourir David"],
		correct: "Saül révéla à son fils Jonathan et à tous ses serviteurs son intention de faire mourir David"
	},
	{
		id: "5",
		question: "Quelle raison Saül a-t-il donnée à Samuel pour avoir épargné le meilleur du bétail des Amaléqites ? (1S 15:21)",
		options: ["Pour l'utiliser comme butin de guerre pour enrichir le royaume.", 
				  "Que c'étaient les soldats qui avaient pris des moutons et des bovins, pour les sacrifier à Jéhovah.", 
				  "Parce que le peuple le craignait et le respectait trop pour désobéir.", 
				  "Pour négocier la paix avec les nations voisines."],
		correct: "Que c'étaient les soldats qui avaient pris des moutons et des bovins, pour les sacrifier à Jéhovah."
	},
	{
		id: "6",
		question: "Comment Saül a-t-il tenté de tuer David pour la première fois ? (1S 18:10-11.)",
		options: ["En envoyant des soldats pour l'attaquer chez lui.", 
				  "En l'envoyant dans des batailles jugées impossibles à gagner.", 
				  "En lui lançant une lance alors qu'il jouait de la harpe.", 
				  "En le défiant en duel devant tout Israël."],
		correct:  "En lui lançant une lance alors qu'il jouait de la harpe."
	},
	{
		id: "7",
		question: "Quel événement a marqué le changement de l'attitude de Saül envers David, passant de la méfiance à une intention de mort ? (1S 18:1–19:11)",
		options: ["Après que David a épousé Mikal, la fille de Saül.", 
				  "Lorsque David a apporté 200 prépuces de Philistins au lieu des 100 demandés.", 
		 		  "Quand les chants du peuple louaient David plus que Saül.", 
				  "Après que David a refusé le commandement de l'armée de Saül."],
		correct: "Lorsque David a apporté 200 prépuces de Philistins au lieu des 100 demandés."
	},
	{
		id: "8",
		question: "Comment s'appelait la femme de Saül ? (1 Samuel 14:49)",
		options: ["Michal.", 
				  "Ahinoam.", 
				  "Abigail.", 
				  "Bath-Schéba."],
		correct: "Ahinoam."
	},
	{
		id: "9",
		question: "Dans quelle ville Saül a-t-il été désigné comme roi ? (1 Samuel 10:17-27)",
		options: ["Hébron.", 
				  "Silo.", 
				  "Mitspa.", 
				  "Ramah."],
		correct: "Mitspa."
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