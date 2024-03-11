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
		question: "Touttes les lettres de l'alphabet sont en réunions sauf cinq, les quelles?",
		options: ["Les lettres A B C T O.", 
				  "Les lettres G T P L I.", 
				  "Les lettres G T U T L.", 
				  "Les lettres G T O Q P."],
		correct: "Les lettres G T O Q P."
	},
	{
		id: "1",
		question: "Quelle est la lettre la plus tranchante ?",
		options: ["B.", 
				  "S.", 
				  "M.", 
				  "H."],
		correct: "H."
	},
	{
		id: "2",
		question: "Je commence la nuit et je finis le matin. Qui suis-je ?",
		options: ["A.", 
				  "Z.", 
		          "M.", 
		          "N."],
		correct: "N."
	},
	{
		id: "3",
		question: "Que font deux plantes qui se rencontrent ?",
		options: ["Elles prennent racine.", 
			      "Elles photosynthétisent.", 
			      "Elles poussent ensemble.", 
			      "Elles vont prendre un pot."],
		correct: "Elles vont prendre un pot."
	},
	{
		id: "4",
		question: "Quelle heure est-il quand l'horloge sonne 13 coups ?",
		options: ["Minuit.", 
				  "La montre avance d'une heure.", 
				  "L’heure de faire réparer l’horloge.", 
				  "13 heures."],
		correct: "L’heure de faire réparer l’horloge."
	},
	{
		id: "5",
		question: "Quelle a été la réaction d'un Parisien après avoir entendu une blague ?",
		options: ["Il a ri.", 
				  "Il a Paris.", 
				  "Il est parti.", 
				  "Il n'a pas compris."],
		correct: "Il a Paris.",
	},
	{
		id: "6",
		question: "Quels sont les deux animaux les plus intelligents ?",
		options: ["Chien et le chat.", 
				  "L'aigle et l'éléphant.", 
				  "Dauphin et le singe.", 
				  "Cerf et le veau."],
		correct:  "Cerf et le veau."
	},
	{
		id: "7",
		question: "Qu’est-ce qu’une manifestation d’aveugles ?",
		options: ["Un concert silencieux.", 
				  "Une exposition dans le noir.", 
		 		  "Un marathon de nuit.", 
				  "Un festival de Cannes."],
		correct:  "Un festival de Cannes."
	},
	{
		id: "8",
		question: "Que fait Platon quand ça le démange ?",
		options: ["Il écrit.", 
				  "Il médite.", 
				  "Il Socrate.", 
				  "Il philosophe."],
		correct:  "Il Socrate."
	},
	{
		id: "9",
		question: "Quelle est la seule plante que l’on écrase tous les jours mais que l’on n’arrose jamais ?",
		options: ["La plante verte.", 
				  "La plante des pieds.", 
				  "Le pissenlit.", 
				  "La pelouse."],
		correct:  "La plante des pieds."
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
    window.location.href = "./5_devinettes.html";
});