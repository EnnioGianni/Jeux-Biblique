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
let count = 41;
let countdown;

// Ajoutez des questions, des options et corrigez l’option dans le format ci-dessous
const quizArray = [
    {
		id: "0",
		question: "Qui était le père de Jérémie ? (Jr 1:1)",
		options: ["Éléazar.", 
				  "Abiathar.", 
				  "Hilqia.", 
				  "Yoshiya."],
		correct: "Hilqia."
	},
	{
		id: "1",
		question: "De quelle ville était originaire Jérémie ?(Jr 1:1)",
		options: ["Capitale du royaume de Juda.", 
				  "Ville où le grand prêtre issu de la lignée d'Éléazar officiait.", 
				  "Ville de prêtres située à moins de 5 km du mont du Temple à Jérusalem..", 
				  "Anathoth, ville de prêtres située sur le territoire de Benjamin."],
		correct: "Anathoth, ville de prêtres située sur le territoire de Benjamin."
	},
	{
		id: "2",
		question: "De quelle lignée était issu Hilqia, le père de Jérémie ?(it-jérémie p. 1267)",
		options: ["Lignée d'Ithamar.", 
				  "Lignée d'Éléazar.", 
		          "Lignée de Benjamin.", 
		          "Descendants d'Abiathar."],
		correct: "Lignée d'Éléazar."
	},
	{
		id: "3",
		question: "En quelle année Jérémie fut-il appelé à être prophète ?(Jr 1:2-5)",
		options: ["647 av. n. è., dans la 13e année de règne de Yoshiya.", 
			      "659 av. n. è., dans la 22e du règne de Yoshiya.", 
			      "629 av. n. è., début du règne de Yoshiya.", 
			      "859 av. n. è., apres le règne de Yoshiya."],
		correct: "647 av. n. è., dans la 13e année de règne de Yoshiya."
	},
	{
		id: "4",
		question: "À quel âge Jérémie fut-il appelé pour être prophète ? (it-jérémie p. 1267)",
		options: ["À sa naissance", 
				  "En tant que jeune homme.", 
				  "Avant sa naissance.", 
				  "À l'âge de 30 ans."],
		correct: "En tant que jeune homme."
	},
	{
		id: "5",
		question: "Quel attribut unique Jéhovah a-t-il conféré à Jérémie avant sa naissance ?(Jr 1:2-5)",
		options: ["Force physique.", 
				  "Sagesse infinie.", 
				  "Sanctification.", 
				  "Royauté."],
		correct: "Sanctification.",
	},
	{
		id: "6",
		question: "Quelle spécificité partage Jérémie avec Isaac, Samson, et Samuel selon leur appel divin ? (Matthieu 9:15)",
		options: ["Être missionnaire.", 
				  "Construire des temples.", 
				  "Être des pionniers auxiliaires..", 
				  "Être des serviteurs spéciaux."],
		correct:  "Être des serviteurs spéciaux."
	},
	{
		id: "7",
		question: "Quand Jéhovah a-t-il commencé à connaître Jérémie ? (Jr 1:2-5)",
		options: ["Après sa sanctification.", 
				  "Lorsqu'il a commencé son ministère.", 
		 		  "Avant qu'il soit formé dans le ventre.", 
				  "À sa naissance."],
		correct:  "Avant qu'il soit formé dans le ventre."
	},
	{
		id: "8",
		question: "Avec quoi Jéhovah a-t-il comparé Jérémie pour illustrer sa force et sa résistance ?(Jr 1:18-19)",
		options: ["Une épée tranchante.", 
				  "Une ville fortifiée.", 
				  "Un palais imprenable.", 
				  "Un mur inébranlable."],
		correct:  "Une ville fortifiée."
	},
	{
		id: "9",
		question: "Quel effet la personnalité de Jérémie a-t-elle eu sur la perception de Jésus par le peuple ? (Mt 16:13, 14) ",
		options: ["Ils le considéraient comme un enseignant.", 
				  "Ils le percevaient comme un prophète, tel que Jérémie.", 
				  "Ils le voyaient comme un rebelle.", 
				  "Ils le reconnaissaient comme un guérisseur."],
		correct:  "Ils le percevaient comme un prophète, tel que Jérémie."
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
        count = 41;
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
    count = 41;
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
    window.location.href = "./1_jeremie.html";
});