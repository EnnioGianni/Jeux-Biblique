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
		question: "Quel signe d'alliance Dieu a-t-il établi entre lui et Abram ? (Genèse 17:10)",
		options: ["Le bâton.", 
				  "L'arc-en-ciel.", 
				  "La circoncision.", 
				  "Le sacrifice."],
		correct: "La circoncision."
	},
	{
		id: "1",
		question: "Quelle promesse spécifique Dieu a-t-il faite concernant Yishmaël ? (Genèse 17:20)",
		options: ["Il serait un prophète.", 
				  "Il produira douze chefs.", 
				  "Il construirait un temple.", 
				  "Il deviendrait un roi."],
		correct: "Il produira douze chefs."
	},
	{
		id: "2",
		question: "Combien d'années Abram avait-il lorsque Yishmaël lui est né ? (Genèse 16:16) ",
		options: ["86 ans.", 
				  "99 ans.", 
		          "100 ans.", 
		          "90 ans."],
		correct: "86 ans."
	},
	{
		id: "3",
		question: "Pourquoi Saraï dit-elle que la violence qui lui est faite est sur Abram ? (Genèse 16:5)",
		options: ["Parce qu'Abram a refusé d'écouter sa demande.", 
			      "Parce qu'Agar méprise Saraï après être devenue enceinte.", 
			      "Parce qu'Abram a quitté le pays de Canaan.", 
			      "Parce qu'Abram n'a pas prié pour elle."],
		correct: "Parce qu'Agar méprise Saraï après être devenue enceinte."
	},
	{
		id: "4",
		question: "Quelle question Abram a-t-il posée à Dieu concernant l'héritage de sa maison ? (Genèse 15:2)",
		options: ["Qui dirigera ma maison après moi. ?", 
				  "Comment saurai-je que j'en prendrai possession. ?", 
				  "Quel sera le signe de votre promesse. ?", 
				  "Que me donneras-tu, puisque je m'en vais sans enfant. ?"],
		correct: "Que me donneras-tu, puisque je m'en vais sans enfant. ?"
	},
	{
		id: "5",
		question: "Qui était L'homme de Damas qui a hérité la maison de Abram. (Genèse 15:2)",
		options: ["Lot.", 
				  "Ismaël.", 
				  "Éliézer.", 
				  "Isaac."],
		correct: "Éliézer.",
	},
	{
		id: "6",
		question: "Quelle est la durée de l'affliction annoncée pour la descendance d'Abram ? (Genèse 15:13)",
		options: ["100 ans.", 
				  "300 ans.", 
				  "400 ans.", 
				  "200 ans."],
		correct:  "400 ans."
	},
	{
		id: "7",
		question: "Qui Abraham a-t-il vu près des grands arbres de Mamré ? (Genèse 18:2)",
		options: ["Un ange de Jéhovah.", 
				  "Trois hommes.", 
		 		  "Saraï.", 
				  "Jéhovah."],
		correct:  "Trois hommes."
	},
	{
		id: "8",
		question: "Quel acte a été demandé par Dieu à Abram pour sceller l'alliance entre eux concernant la possession du pays promis ? (Genèse 15:9)",
		options: ["Construire un autel.", 
				  "Sacrifier un animal.", 
				  "Planter un arbre.", 
				  "Prendre une génisse, une chèvre, un bélier, une tourterelle et un jeune pigeon."],
		correct:  "Prendre une génisse, une chèvre, un bélier, une tourterelle et un jeune pigeon."
	},
	{
		id: "9",
		question: "Comment Agar a-t-elle réagi après sa rencontre avec l'ange de Jéhovah dans le désert ? Genèse 16:14)",
		options: ["Elle a fui plus loin dans le désert.", 
				  "Elle a nommé le lieu Béer-Lahaï-Roï.", 
				  " Elle a retourné chez Saraï.", 
				  "Elle a construit un autel pour Jéhovah."],
		correct:  "Elle a nommé le lieu Béer-Lahaï-Roï."
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
    window.location.href = "./3_genese.html";
});