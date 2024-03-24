// Liste des questions à afficher
var questions = [
  {
    enonce: "Combien font 2+2 ?",
    reponse: "4",
    indice1: "C'est un résultat arithmétique simple.",
    indice2: "C'est le double de 2.",
  },
  // {
  //   enonce: "En quelle année Christophe Colomb a-t-il découvert l'Amérique ?",
  //   reponse: "1492",
  //   indice1: "C'est la fin du XVème siècle.",
  //   indice2: "C'est avant 1500.",
  // },
  // {
  //   enonce: "On me trouve 2 fois dans l'année, 1 fois dans la semaine, mais pas du tout dans le jour... Qui suis-je ?",
  //   reponse: "La lettre N",
  //   indice1: "Je suis utilisé dans les mots 'année' et 'semaine'.",
  //   indice2: "Je suis souvent la dernière lettre dans un mot.",
  // }
];

var indexQuestionActuelle = 0; // Index pour suivre la question actuelle
var tentatives = 3; // Nombre de tentatives pour chaque question

var contenu = document.getElementById("contenu");

function afficherQuestion() {
  contenu.innerHTML = ''; // Efface le contenu précédent
  if (indexQuestionActuelle < questions.length) {
    addLigne(questions[indexQuestionActuelle]);
  } else {
    contenu.innerHTML = '<p>Vous avez terminé toutes les questions!</p>';
  }
}

function addLigne(el) {
  var divElt = document.createElement("div");
  divElt.className = "cadre responsive"; // Ajoutez une classe pour appliquer des styles responsives
  divElt.className = "cadre";

  divElt.style.position = "fixed";
  divElt.style.top = "50%";
  divElt.style.left = "50%";
  divElt.style.transform = "translate(-50%, -50%)";
  divElt.style.boxSizing = "border-box";
  divElt.style.backgroundColor = "#FFF";
  divElt.style.padding = "20px";
  divElt.style.border = "1px solid #ccc";
  divElt.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  divElt.style.maxWidth = "600px";
  divElt.style.width = '80%';
  divElt.style.zIndex = "1000";
  divElt.style.backgroundColor = "#F5E3A5";

  var strongElt = document.createElement("strong");
  strongElt.textContent = "Question " + (indexQuestionActuelle + 1) + " : ";
  divElt.appendChild(strongElt);

  var enonceElt = document.createElement("p");
  enonceElt.textContent = el.enonce;
  divElt.appendChild(enonceElt);

  var inputReponse = document.createElement("input");
  inputReponse.type = "text";
  inputReponse.placeholder = "Votre réponse";
  divElt.appendChild(inputReponse);

  var indice1 = document.createElement("p");
  indice1.textContent = "Indice 1: " + el.indice1;
  indice1.style.display = "none";
  divElt.appendChild(indice1);

  var indice2 = document.createElement("p");
  indice2.textContent = "Indice 2: " + el.indice2;
  indice2.style.display = "none";
  divElt.appendChild(indice2);

  var buttonsContainer = document.createElement("div");
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.alignItems = "center";
  buttonsContainer.style.justifyContent = "center";
  divElt.appendChild(buttonsContainer);

  var buttonElt = document.createElement("button");
  buttonElt.className = "responsive-button"; // Utilisez des classes pour définir des styles responsives
  buttonElt.textContent = "Vérifier la réponse";
  buttonsContainer.appendChild(buttonElt);

  var suivantBtnLocal = document.createElement("button");
  suivantBtnLocal.textContent = "Question suivante";
  suivantBtnLocal.style.display = "none";
  suivantBtnLocal.style.marginLeft = "10px";
  buttonsContainer.appendChild(suivantBtnLocal);

  var reponseElt = document.createElement("i");
  reponseElt.textContent = el.reponse;
  reponseElt.style.display = "none";
  divElt.appendChild(reponseElt);

  buttonElt.addEventListener("click", function () {
    if (inputReponse.value.trim() === el.reponse) {
      reponseElt.style.display = "block";
      reponseElt.style.textAlign = "center";
      reponseElt.style.width = "100%";
      buttonElt.textContent = "Réponse correcte!";
      buttonElt.disabled = true;
      suivantBtnLocal.style.display = "inline-block";
    } else {
      tentatives--;
      if (tentatives === 2) {
        indice1.style.display = "block";
      } else if (tentatives === 1) {
        indice2.style.display = "block";
      }
      if (tentatives > 0) {
        afficherModal("Incorrect. Il vous reste " + tentatives + " tentatives.");
      } else {
        afficherModal("Plus de tentatives. La bonne réponse était : " + el.reponse);
        reponseElt.style.display = "block";
        reponseElt.style.textAlign = "center";
        reponseElt.style.width = "100%";
        buttonElt.disabled = true;
        suivantBtnLocal.style.display = "inline-block";
      }
    }
  });

  suivantBtnLocal.addEventListener("click", function() {
    if (indexQuestionActuelle < questions.length - 1) {
      indexQuestionActuelle++;
      tentatives = 3;
      afficherQuestion();
    } else {
      // Modification ici pour afficher le bouton Recommencer
      afficherModalFinJeu("C'était la dernière question !");
      suivantBtnLocal.style.display = "none";
    }
  });

  contenu.appendChild(divElt);
}

function afficherModal(message) {
  // Supprime une modal existante si elle existe
  var modalExistante = document.getElementById("modalMessage");
  if (modalExistante) {
    modalExistante.parentNode.removeChild(modalExistante);
  }

  var modal = document.createElement("div");
  modal.id = "modalMessage";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "#FFF";
  modal.style.padding = "20px";
  modal.style.border = "1px solid #ccc";
  modal.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  modal.style.zIndex = "2000";

  var modalContent = document.createElement("p");
  modalContent.textContent = message;

  var closeButton = document.createElement("button");
  closeButton.textContent = "Fermé";
  closeButton.onclick = function() {
    modal.parentNode.removeChild(modal);
  };

  modal.appendChild(modalContent);
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

afficherQuestion();


function demarrerMinuteur(duree, elementParent) {
  var tempsRestant = duree;
  var minuteurElt = document.createElement("div");
  minuteurElt.style.position = "absolute";
  minuteurElt.style.top = "10px";
  minuteurElt.style.right = "10px";
  minuteurElt.style.padding = "5px 10px";
  minuteurElt.style.backgroundColor = "lightgray";
  minuteurElt.style.borderRadius = "5px";

  // Mise à jour initiale de l'affichage du minuteur
  minuteurElt.textContent = tempsRestant + "s";
  elementParent.appendChild(minuteurElt);

  // Décompte du minuteur
  var intervalId = setInterval(function() {
    tempsRestant--;
    minuteurElt.textContent = tempsRestant + "s";

    if (tempsRestant <= 0) {
      clearInterval(intervalId);
      minuteurElt.textContent = "Temps écoulé!";
    }
  }, 1000);
}

function afficherQuestion() {
  contenu.innerHTML = ''; // Efface le contenu précédent
  if (indexQuestionActuelle < questions.length) {
    var divElt = addLigne(questions[indexQuestionActuelle]);
    demarrerMinuteur(30, divElt); // Démarrer le minuteur pour une durée de 30 secondes
  } else {
    contenu.innerHTML = '<p>Vous avez terminé toutes les questions!</p>';
  }
}
