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
let count = 40;
let countdown;

//Tableau de questions et d’options
// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
	{
		id: "0",
		question: "Qui a ordonné de ne pas s'écarter de la loi ? (Josué 1:7)",
		options: ["Moïse.", 
				  "Jéhovah.", 
				  "Les Hittites.", 
				  "Josué."],
		correct: "Moïse."
	},
	{
		id: "1",
		question: "À qui Josué a-t-il donné l'ordre concernant la préparation pour traverser le Jourdain ? (Josué 1:10) ",
		options: ["Les fils d’Israël.", 
				  "Les préposés du peuple.", 
				  "Les Rubénites.", 
				  "Les Gadites."],
		correct: "Les préposés du peuple."
	},
	{
		id: "2",
		question: "Comment était appelé le père de Josué ? (Josué 1:1)",
		options: ["Le serviteur de Jéhovah.", 
				  "Le patriarche.", 
		          "Le ministre.", 
		          "Le conducteur du peuple."],
		correct: "Le ministre."
	},
	{
		id: "3",
		question: "Jusqu'à quelle mer s'étendra le territoire donné à Josué par Jéhovah ? (Josué 1:4)",
		options: ["La mer Rouge.", 
			      "La mer Morte.", 
			      "La Grande Mer.", 
			      "Le fleuve Jourdain."],
		correct: "La Grande Mer."
	},
	{
		id: "4",
		question: "Quel ordre Josué a-t-il donné, avant leur départ  ? (Josué 1:11)",
		options: ["Offrir des holocaustes.", 
				  "Préparer des provisions.", 
				  "Célébrer une fête.", 
				  "Prier pour la victoire."],
		correct: "Préparer des provisions."
	},
	{
		id: "5",
		question: "À qui Josué rappelle-t-il l'ordre donné par Moïse concernant le repos et la possession du pays ? (Josué 1:12)",
		options: ["Aux Rubénites.", 
				  "Aux Gadites", 
				  "À la demi-tribu de Manassé", 
				  "À tous les trois."],
		correct: "À tous les trois.",
	},
	{
		id: "6",
		question: "Qui restera dans le pays donné par Moïse, tandis que les hommes forts et vaillants traverseront le Jourdain en formation de combat ? (Josué 1:14)",
		options: ["Vos femmes et vos petits.", 
				  "Les vieillards et votre bétail.", 
				  "Les hommes forts et vaillants.", 
				  "Vos femmes, vos petits, et votre bétail."],
		correct:  "Vos femmes, vos petits, et votre bétail."
	},
	{
		id: "7",
		question: "Quand les Rubénites, les Gadites et la demi-tribu de Manassé devront-ils retourner au pays de leur domaine ? (Josué 1:15)",
		options: ["Après avoir célébré une fête.", 
				  "Après avoir tué tous leurs ennemis.", 
		 		  "Après avoir conquis le pays.", 
				  "Lorsque Jéhovah procurera le repos à leurs frères et qu'ils auront pris possession du pays."],
		correct:  "Lorsque Jéhovah procurera le repos à leurs frères et qu'ils auront pris possession du pays."
	},
	{
		id: "8",
		question: "Où se trouve le pays de domaine donné par Moïse aux Rubénites, aux Gadites et à la demi-tribu de Manassé ? (Josué 1:15)",
		options: ["De ce côté-ci du Jourdain, vers le soleil couchant.", 
				  "De l'autre côté du Jourdain, vers le soleil levant.", 
				  "Près de la Grande Mer.", 
				  "À la frontière avec les Hittites."],
		correct:  "De l'autre côté du Jourdain, vers le soleil levant."
	},
	{
		id: "9",
		question: "Quelle promesse les tribus ont-elles faites à Josué concernant leur obéissance ? (Josué 1:17)",
		options: ["Comme nous avons écouté Moïse en tout, ainsi nous t’écouterons.", 
				  "De respecter les lois de Jéhovah comme transmises par Moise.", 
				  "D'obéir à Josué dans toutes ses commandes, tout comme ils l'ont fait pour Moïse.", 
				  "D'écouter Josué et d'appliquer ses enseignements comme ils l'ont fait avec Moïse."],
		correct:  "Comme nous avons écouté Moïse en tout, ainsi nous t’écouterons."
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
        showModal("Veuillez sélectionner une option avant de continuer."); // Utilise la fenêtre modale au lieu de l'alerte
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
        count = 40;
        clearInterval(countdown);
        timerDisplay();
    }
});








// Assurez-vous que cette fonction soit définie dans votre code
function showModal(message) {
    clearInterval(countdown); // Arrête le minuteur ici

    const modalExists = document.getElementById("myModal");
    const modal = modalExists || createModal();
    document.getElementById("modal-text").innerText = message;
    modal.style.display = "block";

    // Trouve le bouton "OK" dans la fenêtre modale et ajoute un écouteur d'événements
    const okButton = modal.querySelector("button");
    okButton.onclick = function() {
      modal.style.display = "none";
      timerDisplay(); // Redémarre le minuteur ici
    };
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
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    const modalContent = document.createElement("div");
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "30%";
    modalContent.style.backgroundColor = "white";
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";
    modalContent.style.alignItems = "center";
    modalContent.style.backgroundImage = "url('./Images/TerrePromise.jpg')"; // Ajout de l'image de fond
    modalContent.style.backgroundRepeat = "no-repeat";
    modalContent.style.backgroundPosition = "center";
    modalContent.style.backgroundSize = "cover";

    const modalText = document.createElement("p");
    modalText.setAttribute("id", "modal-text");
    modalText.style.color = "black";
    modalContent.appendChild(modalText);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "OK";
    closeBtn.style.marginTop = "20px"; // Ajoute un espace au-dessus du bouton
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
    modalContent.appendChild(closeBtn);

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
        showModal("Dans 10 secondes, on revient à la première question !"); // Utilise la fenêtre modale au lieu de l'alerte
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
    count = 40;
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
    window.location.href = "./1_josue.html";
});