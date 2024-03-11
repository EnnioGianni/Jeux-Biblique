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
		question: "Selon Jean 2:6, combien de jarres en pierre, utilisées pour la purification selon les règles des Juifs, étaient présentes lors du premier miracle de Jésus ?",
		options: ["Quatre.", 
				  "Cinq.", 
				  "Six.", 
				  "Sept."],
		correct: "Six."
	},
	{
		id: "1",
		question: "Selon les paroles de Jésus en Jean 8:23-24 , pourquoi les gens mourront-ils dans leurs péchés ?",
		options: ["Parce qu'ils n'observent pas le sabbat.", 
				  "Parce qu'ils ne pratiquent pas les rites de purification.", 
				  "Parce qu'ils ne croient pas que Jésus est celui qu'il affirme être.", 
				  "Parce qu'ils ne respectent pas la loi de Moïse."],
		correct: "Parce qu'ils ne croient pas que Jésus est celui qu'il affirme être."
	},
	{
		id: "2",
		question: "Selon Jean 15:6-7, que devient le sarment qui ne reste pas en union avec Jésus ?",
		options: ["Il ne porte pas beaucoup de fruit.", 
				  "Il est planté dans un nouveau jardin.", 
		          "Ils reçoivent une nouvelle chance.", 
		          "Ils sont jetés au feu et brûlent."],
		correct: "Ils sont jetés au feu et brûlent."
	},
	{
		id: "3",
		question: "Qui est le Judas mentionné dans Jean 14:22, qui n'est pas Judas Iscariote, et qui pose une question à Jésus ?",
		options: ["Judas le Zélote.", 
			      "Judas fils de Jacques.", 
			      "Judas de Galilée.", 
			      "Judas qui est aussi appelé Thaddée."],
		correct: "Judas qui est aussi appelé Thaddée."
	},
	{
		id: "4",
		question: "Selon Jean 10: 39-40 Pourquoi Jésus est-il parti de l'autre côté du Jourdain et est resté à l'endroit où Jean baptisait au début ?",
		options: ["Pour enseigner dans le temple.", 
				  "Pour échapper aux Juif.", 
				  "Pour rencontrer Jean le baptiseur.", 
				  "Pour accomplir des miracles."],
		correct: "Pour échapper aux Juif."
	},
	{
		id: "5",
		question: "Dans Jean 15:20, quelle comparaison Jésus fait-il entre le serviteur et le maître,",
		options: ["Le serviteur recevra plus d'honneurs que son maître.", 
				  "Un serviteur n'est pas plus grand que son maître.", 
				  "Le serviteur sera exempté de toute persécution.", 
				  "Les disciples ne seront pas persécutés."],
		correct: "Un serviteur n'est pas plus grand que son maître.",
	},
	{
		id: "6",
		question: "Dans Jean 3:8, En parlant du vent, quelle analogie Jésus utilise-t-il pour expliquer le comportement de ceux qui sont nés de l'esprit? (Luc 21:37-38)",
		options: ["Comme la lumière brille dans l'obscurité.", 
				  "Comme le vent souffle où il veut.", 
				  "Comme l'eau coule dans un ruisseau.", 
				  "Comme une graine germe en terre."],
		correct:  "Comme le vent souffle où il veut."
	},
	{
		id: "7",
		question: "Dans Jean 20:8, selon la note, dans le récit de la découverte du tombeau vide, quel est le disciple qui est arrivé le premier au tombeau ?",
		options: ["Pierre.", 
				  "Thomas.", 
		 		  "Jean.", 
				  "Jacques."],
		correct:  "Jean."
	},
	{
		id: "8",
		question: "Dans Jean 20:15, À qui la femme, pensait-elle être en train de parler, près de la tombe ou on avait mis Jésus.?",
		options: ["Un ange.", 
				  "Le jardinier.", 
				  "Un des disciples.", 
				  "A Jésus."],
		correct:  "Le jardinier."
	},
	{
		id: "9",
		question: "Dans Jean 21:7-8, À quelle distance de la terre se trouvaient les disciples dans le petit bateau, traînant le filet plein de poissons? (Luc 4:33)",
		options: ["80 mètres.", 
				  "2200 mètres.", 
				  "130 mètres.", 
				  "90 mètres."],
		correct:  "90 mètres."
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
    window.location.href = "./jean.html";
});