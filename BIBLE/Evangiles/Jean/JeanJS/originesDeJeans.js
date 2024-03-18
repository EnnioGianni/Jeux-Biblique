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
		question: "Qui est le frère de l'apôtre Jean ? (Mt 10:2)",
		options: ["Salomé.", 
				  "Zébédée.", 
				  "Jacques.", 
				  "André."],
		correct: "Jacques."
	},
	{
		id: "1",
		question: "Question de qui ete fils jean? (Mt. 10:2) ",
		options: ["Marie.", 
				  "Jacques.", 
				  "David.", 
				  "Zébédée."],
		correct: "Zébédée."
	},
	{
		id: "2",
		question: "Lequel des deux frères, Jean et Jacques était probablement le plus jeune (it-1Jean p.1241)",
		options: ["Jacques.", 
				  "Jean.", 
		          "Il avait le même âge.", 
		          "Été des faux jumeaux."],
		correct: "Jean."
	},
	{
		id: "3",
		question: "Qui est l'epouse de Zebede pere de jean? (it-1Jean p.1241)",
		options: ["Marie.", 
			      "Salomé.", 
			      "Elisabeth.", 
			      "Anne."],
		correct: "Salomé."
	},
	{
		id: "4",
		question: "Quelle était la profession de Zébédée, le père de Jean ?(Lc 5:9, 10)",
		options: ["Charpentier.", 
				  "Berger.", 
				  "Pêcheur.", 
				  "Marchand."],
		correct: "Pêcheur."
	},
	{
		id: "5",
		question: "Qui était associé à l'entreprise de pêche de Zébédée ?(Lc 5:9, 10)",
		options: ["Judas.", 
				  "Simon.", 
				  "Matthieu.", 
				  "Thomas."],
		correct: "Simon.",
	},
	{
		id: "6",
		question: " Qui était avec Jean le disciple lorsque Jean le baptiseur a fait l'annonce concernant Jésus ? (Jn 1:35, 36, 40-42)",
		options: ["Pierre.", 
				  "Jacques.", 
				  "André.", 
				  "Thomas."],
		correct:  "André."
	},
	{
		id: "7",
		question: "Où habiter Jean ? (Jn 19:26, 27)",
		options: ["Dans une maison louée.", 
				  "Dans sa propre maison.", 
		 		  "Dans une maison partagée avec d'autres disciples.", 
				  "Chez ses parents."],
		correct:  "Dans sa propre maison."
	},
	{
		id: "8",
		question: "Sur quelle base les chefs juifs ont-ils reconnu Jean et Pierre ? (Ac 4:13)",
		options: ["Leur tenue vestimentaire.", 
				  "Leur discours.", 
				  "Leur association avec Jésus.", 
				  "Leur origine géographique."],
		correct:  "Leur association avec Jésus."
	},
	{
		id: "9",
		question: "Quelle fut la réaction des chefs juifs face au franc-parler de Pierre et Jean ? (Actes 4:13)",
		options: ["Ils les admirèrent pour leur éducation.", 
				  "Ils s'étonnèrent malgré leur manque d'instruction formelle.", 
				  "Ils les ignorèrent complètement.", 
				  "Ils les condamnèrent immédiatement."],
		correct:  "Ils s'étonnèrent malgré leur manque d'instruction formelle."
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








// Assurez-vous que cette fonction soit définie dans votre code
function showModal(message) {
    const modalExists = document.getElementById("myModal");
    const modal = modalExists || createModal();
    document.getElementById("modal-text").innerText = message;
    modal.style.display = "block";
  }
  
  // Fonction pour créer une fenêtre modale
  function createModal() {
    const modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.style.position = "fixed";
    modal.style.zIndex = 1;
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";
    
    const modalContent = document.createElement("div");
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "30%";
    modalContent.style.backgroundColor = "white";
  
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "OK";
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
    modalContent.appendChild(closeBtn);
  
    const modalText = document.createElement("p");
    modalText.setAttribute("id", "modal-text");
    modalText.style.color = "black"; // Définit la couleur du texte à noir
modalContent.insertBefore(modalText, closeBtn);
  
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    return modal;
    
  }
  const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;

        // Affiche un message lorsque le compteur atteint 5 secondes restantes
        if (count == 10) {
            alert("Dans 10 secondes, on revient à la première question !");
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
    window.location.href = "./originesDeJeans.html";
});