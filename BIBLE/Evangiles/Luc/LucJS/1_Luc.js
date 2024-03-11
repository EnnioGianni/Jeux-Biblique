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
		question: "Qui est désigné comme celui qui prépare le chemin dans l'Évangile selon Luc?(Luc ch. 1) ",
		options: ["Zacharie.", 
				  "Jean.", 
				  "Pierre.", 
				  "Jacques."],
		correct: "Jean."
	},
	{
		id: "1",
		question: "Qui a demandé à Jésus: Seigneur, enseigne-nous à prier? (Luc 11:1)",
		options: ["Pierre.", 
				  "Jacques.", 
				  "Un de ses disciples.", 
				  "Thomas."],
		correct: "Un de ses disciples."
	},
	{
		id: "2",
		question: "Dans l'Évangile selon Luc, quel exemple Jésus utilise-t-il pour illustrer que les prophètes ne sont pas toujours acceptés dans leur propre patrie, en mentionnant la guérison d'un étranger par un prophète d'Israël? (Luc 4:27)",
		options: ["La guérison du serviteur du centurion.", 
				  "La multiplication des pains.", 
		          "La résurrection du fils de la veuve.", 
		          "La purification de Naamân le Syrien."],
		correct: "La purification de Naamân le Syrien."
	},
	{
		id: "3",
		question: "Qui est le premier personnage féminin mentionné comme annonçant la résurrection de Jésus aux apôtres? (Luc 24:10)",
		options: ["Marie Madeleine.", 
			      "Marie, mère de Jacques .", 
			      "Salomé .", 
			      "Joanna."],
		correct: "Marie Madeleine."
	},
	{
		id: "4",
		question: "Qu'a-t-il dit Jésus de Zachée après sa conversion? (Luc 19:9)",
		options: ["Fils d'Abraham.", 
				  "Grand prêtre.", 
				  "Serviteur fidèle.", 
				  "Berger des brebis."],
		correct: "Fils d'Abraham."
	},
	{
		id: "5",
		question: "Dans la parabole du riche et de Lazare, que demande le riche à Abraham depuis le lieu de tourment ? (Luc 16:23-24)",
		options: ["Qu'il permette de retourner parmi les vivants pour changer son destin.", 
				  "Qu'il envoie Lazare tremper le bout de son doigt dans l'eau pour rafraîchir sa langue.", 
				  "Qu'il envoie Lazare avec un peu de nourriture pour le soulager.", 
				  " Qu'Abraham envoie Lazare lui apporter du réconfort par ses paroles."],
		correct: "Qu'il envoie Lazare tremper le bout de son doigt dans l'eau pour rafraîchir sa langue.",
	},
	{
		id: "6",
		question: "Où Jésus passait-il ses nuits après avoir enseigné dans le Temple, selon l'Évangile selon Luc ? (Luc 21:37-38)",
		options: ["Sur le mont des Oliviers.", 
				  "Dans le jardin de Gethsémani.", 
				  "Dans la vallée du Cédron.", 
				  "À Béthanie avec ses amis."],
		correct:  "Sur le mont des Oliviers."
	},
	{
		id: "7",
		question: "Par où Jésus est-il passé en route vers Jérusalem, selon l'Évangile selon Luc ? (Luc 17:11)",
		options: ["Entre la Judée et la Galilée.", 
				  "À travers le désert de Judée.", 
		 		  "Entre la Samarie et la Galilée.", 
				  "Le long du Jourdai."],
		correct:  "Entre la Samarie et la Galilée."
	},
	{
		id: "8",
		question: "Combien de temps le ciel est-il resté fermé, entraînant une grande famine en Israël à l'époque d'Élie, selon ce que Jésus a révélé dans l'Évangile selon Luc ? (Luc 4:25) ",
		options: ["Un an et six mois.", 
				  "Deux ans.", 
				  "Trois ans et un mois.", 
				  "Trois ans et six mois."],
		correct:  "Trois ans et six mois."
	},
	{
		id: "9",
		question: "Dans quelle ville de Galilée Jésus a-t-il rencontré un homme possédé par un esprit impur dans la synagogue le jour du sabbat ? (Luc 4:33)",
		options: ["Nazareth.", 
				  "Béthsaïde.", 
				  "Capharnaüm.", 
				  "Tibériade."],
		correct:  "Capharnaüm."
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
    window.location.href = "./luc.html";
});