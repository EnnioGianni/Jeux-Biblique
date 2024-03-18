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
		question: "Quel attribut de Jéhovah est souligné en relation avec sa parole ? (Ps. 18:30)",
		options: ["Son ambiguïté.", 
				  " Son imprévisibilité.", 
				  "Sa perfection.", 
				  "Sa complexité."],
		correct: "Sa perfection."
	},
	{
		id: "1",
		question: "Comment la lumière est-elle apportée dans la vie de David ? (Ps. 18:28) ",
		options: ["Par la recherche personnelle de la vérité.", 
				  "Par l'intervention directe de Jéhovah.", 
				  "Par l'aide des amis et de la famille.", 
				  "Par l'accumulation de richesses."],
		correct: "Par l'intervention directe de Jéhovah."
	},
	{
		id: "2",
		question: "Quelle méthode est mentionnée pour disperser les ennemis de David ? (Ps. 18:14)",
		options: ["Des négociations.", 
				  "Des flèches et des éclairs.", 
		          "Un fort discours.", 
		          "Un retrait stratégique."],
		correct: "Des flèches et des éclairs."
	},
	{
		id: "3",
		question: "Comment l'auteur envisage-t-il l'issue des conflits avec ses ennemis ? (Ps. 18:37)",
		options: ["Avec incertitude.", 
			      "Par une victoire écrasante.", 
			      "En évitant le conflit.", 
			      "Par une alliance."],
		correct: "Par une victoire écrasante."
	},
	{
		id: "4",
		question: "Quelle comparaison David fait-il pour décrire sa rapidité et sa stabilité ? (Ps. 18:33)",
		options: ["Comme une rivière rapide.", 
				  "Comme un arbre solidement enraciné.", 
				  "Comme les pieds des biches.", 
				  "Comme un oiseau volant."],
		correct: "Comme les pieds des biches."
	},
	{
		id: "5",
		question: "Comment David envisage-t-il sa relation avec les nations étrangères ?(Ps. 18:43)",
		options: ["Comme des ennemis à conquérir.", 
				  "Comme des alliés potentiels.", 
				  "Comme des sujets à gouverner.", 
				  "Comme des partenaires égaux."],
		correct: "Comme des sujets à gouverner.",
	},
	{
		id: "6",
		question: "Quel est le principe de récompense mentionné par David ? (Ps. 18:20)",
		options: ["La chance favorise les audacieux.", 
				  "La richesse vient à ceux qui attendent.", 
				  "La rétribution selon la justice et la pureté.", 
				  "La puissance résulte de la conquête."],
		correct:  "La rétribution selon la justice et la pureté."
	},
	{
		id: "7",
		question: "Quels éléments naturels sont mentionnés comme faisant partie de l'intervention de Jéhovah ? (Ps. 18:12-13)",
		options: ["Soleil et lune.", 
				  "Nuages et tempête.", 
		 		  "Grêle et braises ardentes.", 
				  "Tonnerres et éclaires."],
		correct:  "Grêle et braises ardentes."
	},
	{
		id: "8",
		question: "Quelle image est utilisée pour décrire l'intervention divine lors de la détresse de David ? (Ps. 18:7",
		options: ["Un calme apaisant.", 
				  "Un tremblement de terre.", 
				  "Une pluie bienveillante.", 
				  "Un arc-en-ciel de paix."],
		correct:  "Un tremblement de terre."
	},
	{
		id: "9",
		question: "Quelle métaphore est utilisée pour décrire l'approche de la mort ? (Ps. 18:4)",
		options: ["Une ombre sombre.", 
				  "Des cordes qui encerclent.", 
				  "Une bête féroce.", 
				  "Un mur infranchissable."],
		correct:  "Des cordes qui encerclent."
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
    window.location.href = "./18em_Psaumes.html";
});
document.getElementById("bac-button").addEventListener("click", function() {
    window.location.href = "./1_Psaumes.html";
});