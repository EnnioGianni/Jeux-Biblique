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
		question: "Que faut-il mettre dans des outres neuves pour qu'elles se conservent? (Matthieu 9:17)",
		options: ["De l'eau.", 
				  "Du vin vieux.", 
				  "Du vin nouveau.", 
				  "De l'huile."],
		correct: "Du vin nouveau."
	},
	{
		id: "1",
		question: "Qui Jésus a-t-il guéri en disant; Selon votre foi qu’ainsi il vous soit fait ?(Matthieu 9:27-29)",
		options: ["Un paralytique.", 
				  "Une femme souffrant d’un flux de sang.", 
				  "Deux aveugles.", 
				  "Un homme muet."],
		correct: "Deux aveugles."
	},
	{
		id: "2",
		question: "Quelle est la réaction des foules quand le muet parla après l'expulsion du démon?(Matthieu 9:33)",
		options: ["Elles furent dans la stupeur.", 
				  "Elles glorifièrent Dieu.", 
		          "Elles eurent peur.", 
		          "Elles se mirent à suivre Jésus."],
		correct: "Elles furent dans la stupeur."
	},
	{
		id: "3",
		question: "À qui Jésus a-t-il dit: Prends courage, [mon] enfant ; tes péchés sont pardonnés?(Matthieu 9:2)",
		options: ["À un homme paralysé.", 
			      "À Matthieu.", 
			      "À une femme souffrant d’un flux de sang.", 
			      "À l'aveugles."],
		correct: "À un homme paralysé."
	},
	{
		id: "4",
		question: "Pourquoi Jésus mangeait-il avec des collecteurs d’impôts et des pécheurs?(Matthieu 9:12)",
		options: ["Parce qu'il appréciait leur compagnie.", 
				  "Parce qu'il n'avait nulle part ailleurs où manger.", 
				  "Parce que ce ne sont pas les gens bien portants qui ont besoin de médecin.", 
				  "Parce qu'il voulait collecter les convertir."],
		correct: "Parce que ce ne sont pas les gens bien portants qui ont besoin de médecin."
	},
	{
		id: "5",
		question: "Qui a demandé à Jésus de venir poser sa main sur sa fille pour qu'elle prenne vie?(Matthieu 9:18)",
		options: ["Un scribe.", 
				  "Un Pharisiens.", 
				  "Un certain chef.", 
				  "Un collecteur d'impôts."],
		correct: "Un certain chef.",
	},
	{
		id: "6",
		question: "Quelle comparaison Jésus utilise-t-il pour expliquer pourquoi ses disciples ne jeûnent pas?(Matthieu 9:15)",
		options: ["Comme des brebis sans berger.", 
				  "L'époux avec ses amis.", 
				  "Comme du vin nouveau dans des outres neuves.", 
				  "Comme un morceau d’étoffe non rétrécie sur un vieux vêtement."],
		correct:  "L'époux avec ses amis."
	},
	{
		id: "7",
		question: "Quelle instruction Jésus donne-t-il aux douze disciples concernant leur prédication ?(Matthieu 10:8)",
		options: ["Prêchez que le royaume des cieux est arrivée.", 
				  "Guérissez les malades et expulsez les démons gratuitement.", 
		 		  "Ne guérissez uniquement le croyant.", 
				  "Prêchez seulement dans les villages."],
		correct:  "Guérissez les malades et expulsez les démons gratuitement."
	},
	{
		id: "8",
		question: "Qui sont appelés les petits à qui donner une coupe d'eau froide n'est pas sans récompense?(Matthieu 10:42)",
		options: ["Les scribes.", 
				  "Les Pharisiens.", 
				  "Les disciples.", 
				  "Les collecteurs d'impôts."],
		correct:  "Les disciples."
	},
	{
		id: "9",
		question: "Devant qui un homme doit-il confesser qu'il est en union avec jesus?",
		options: ["Devant les disciples.", 
				  "Devant les scribes.", 
				  "Devant les Jehovah.", 
				  "Devant les hommes."],
		correct:  "Devant les hommes."
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
    window.location.href = "./Matthieu.html";
});