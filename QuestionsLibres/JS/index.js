// Liste des questions à afficher
var questions = [
  {
    enonce: "Combien de continents y a-t-il sur Terre ?",
    reponse: "7",
    indices: ["Plus de cinq, moins de dix.", "Chiffre chanceux pour beaucoup."]
  },
  {
    enonce: "Qui a écrit '1984' ?",
    reponse: "George Orwell",
    indices: ["Auteur britannique célèbre.", "Le livre a un grand frère qui vous surveille."]
  },
  {
    enonce: "De quel élément chimique 'O' est-il le symbole ?",
    reponse: "Oxygène",
    indices: ["Essentiel pour respirer.", "Le plus abondant dans la croûte terrestre."]
  },
  {
    enonce: "Quel est le plus long fleuve du monde ?",
    reponse: "Le Nil ou l'Amazone",
    indices: ["En Afrique ou en Amérique du Sud.", "Un débat existe sur le vrai gagnant."]
  },
  {
    enonce: "Quel est l'animal le plus rapide sur terre ?",
    reponse: "Guépard",
    indices: ["Peut atteindre jusqu'à 120 km/h.", "Un grand félin."]
  },
  {
    enonce: "Quelle planète est connue comme la Planète Rouge ?",
    reponse: "Mars",
    indices: ["Deuxième plus petite planète du système solaire.", "Son nom vient d'un dieu de la guerre."]
  },
  {
    enonce: "En quelle année a débuté la Première Guerre mondiale ?",
    reponse: "1914",
    indices: ["Début du XXe siècle.", "Quatre ans avant la grippe espagnole."]
  },
  {
    enonce: "Qui a inventé l'ampoule électrique ?",
    reponse: "Thomas Edison",
    indices: ["Inventeur américain.", "A également contribué au développement du cinéma."]
  },
  {
    enonce: "En quelle année Christophe Colomb a-t-il découvert l'Amérique ?",
    reponse: "1492",
    indices: ["C'est la fin du 15e siècle.", "Juste avant le 16e siècle."]
  },
  {
    enonce: "On me trouve 2 fois dans l'année, 1 fois dans la semaine, mais pas du tout dans le jour... Qui suis-je ?",
    reponse: "N",
    indices: ["Je suis une lettre.", "Je suis présente dans 'année' et 'semaine'."]
  }
];

var indexQuestionActuelle = 1; // Index pour suivre la question actuelle
var tentatives = 0; // Nombre de tentatives pour chaque question

var score = 0; // Pour suivre le nombre de réponses correctes

var contenu = document.getElementById("contenu");
// Utiliser le bouton "Question suivante" déjà présent dans le HTML
var suivantBtn = document.getElementById("suivantBtn");

function afficherQuestion() {
  contenu.innerHTML = ''; // Efface le contenu précédent
  if (indexQuestionActuelle < questions.length) {
    addLigne(questions[indexQuestionActuelle]);
  } else {
    contenu.innerHTML = '<p>Vous avez terminé toutes les questions!</p>';
    suivantBtn.style.display = "none"; // Cache le bouton si toutes les questions ont été répondues
  }
}

function addLigne(el) {
  var divElt = document.createElement("div");
  divElt.className = "cadre";

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

  var buttonElt = document.createElement("button");
  buttonElt.textContent = "Vérifier la réponse";
  buttonElt.setAttribute('data-repondu', 'non'); // Attribut pour suivre si la question a été répondue
  divElt.appendChild(buttonElt);

  var reponseElt = document.createElement("i");
  reponseElt.textContent = el.reponse;
  reponseElt.style.display = "none";
  divElt.appendChild(reponseElt);

  buttonElt.addEventListener("click", function () {
    if (inputReponse.value.trim() === el.reponse) {
      score++;
      reponseElt.style.display = "block";
      buttonElt.textContent = "Réponse correcte!";
      buttonElt.disabled = true;
      buttonElt.setAttribute('data-repondu', 'oui'); // Marquer comme répondue
    } else {
      tentatives--;
      if (tentatives > 0) {
        alert("Incorrect. Il vous reste " + tentatives + " tentatives.");
      } else {
        alert("Plus de tentative, affichée la bonne réponse");
        reponseElt.style.display = "block";
        buttonElt.disabled = true;
        buttonElt.setAttribute('data-repondu', 'oui'); // Marquer comme répondue même en cas d'échec
      }
    }
  });
  contenu.appendChild(divElt);
}

suivantBtn.onclick = function() {
  var buttonReponseActuelle = document.querySelector('.cadre button[data-repondu="non"]');
  if (buttonReponseActuelle) {
    alert("Veuillez répondre à la question en cours avant de poursuivre.");
  } else {
    if (indexQuestionActuelle < questions.length - 1) {
      indexQuestionActuelle++;
      tentatives = 1; // Réinitialiser les tentatives pour la nouvelle question
      afficherQuestion();
    } else {
      // C'était la dernière question, demander confirmation pour afficher les boutons
      var confirmation = confirm("C'était la dernière question. Voulez-vous voir vos options ?");
      if (confirmation) {
        afficherFinQuiz();
      }
    }
  }
};

// Initialiser avec la première question
afficherQuestion();

// Fonction pour normaliser le texte : suppression des accents, de la ponctuation et passage en minuscules
function normaliserTexte(texte) {
  // Suppression des accents, de la ponctuation et passage en minuscules
  return texte.normalize("NFD").replace(/[\u0300-\u036f']/g, "").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
}

buttonElt.addEventListener("click", function () {
  var reponseUtilisateur = normaliserTexte(inputReponse.value); // Normalisation de la réponse de l'utilisateur

  // Obtenir la réponse attendue de l'objet question actuel
  var reponseAttendue = questions[indexQuestionActuelle].reponse;

  // Normalisation de la réponse attendue
  var reponseAttendueNormalisee = normaliserTexte(reponseAttendue);

  // Diviser la réponse attendue en mots individuels
  var motsReponseAttendue = reponseAttendueNormalisee.split(' ');

  // Vérifier si chaque mot de la réponse de l'utilisateur correspond à au moins un mot de la réponse attendue
  var reponseCorrecte = motsReponseAttendue.some(function(motReponseAttendue) {
      // Normaliser et vérifier chaque mot de la réponse attendue
      var motNormalise = normaliserTexte(motReponseAttendue);
      return reponseUtilisateur.includes(motNormalise);
  });

  // Traitement basé sur si la réponse est correcte ou non
  if (reponseCorrecte) {
      score++; // Augmenter le score si la réponse est correcte
      console.log("Réponse correcte!");
  } else {
      tentatives--; // Diminuer le nombre de tentatives restantes
      if (tentatives > 0) {
          alert("Incorrect. Il vous reste " + tentatives + " tentatives.");
      } else {
          alert("Plus de tentative, affichée la bonne réponse");
          var reponseElt = document.querySelector('.cadre i'); // Sélectionner l'élément de réponse
          reponseElt.style.display = "block"; // Afficher la réponse
          var buttonElt = document.querySelector('.cadre button'); // Sélectionner le bouton
          buttonElt.disabled = true; // Désactiver le bouton après avoir épuisé les tentatives
      }
      console.log("Réponse incorrecte.");
  }
});





function afficherFinQuiz() {
  contenu.innerHTML = ''; // Efface le contenu précédent pour ne pas afficher le message directement
  suivantBtn.style.display = "none"; // Cache le bouton suivant

  // Création du conteneur pour les boutons
  var conteneurBoutons = document.createElement("div");
  conteneurBoutons.style.display = "flex";
  conteneurBoutons.style.flexDirection = "column"; // Organise les boutons en colonne
  conteneurBoutons.style.justifyContent = "center"; // Centre verticalement
  conteneurBoutons.style.alignItems = "center"; // Centre horizontalement
  conteneurBoutons.style.height = "100vh"; // Utilise 100% de la hauteur de la fenêtre

  // Création du bouton pour recommencer
  var boutonRecommencer = creerBouton("Recommencer le quiz", function() {
    location.reload(); // Recharge la page pour recommencer le quiz
  });

  // Création d'un bouton pour montrer le message final avec le score
  var boutonMessageFinal = creerBouton("Votre score", function() {
    alert("Vous avez terminé toutes les questions! Votre score est de : " + score + " sur " + questions.length + ".");
  });

  // Création d'un bouton pour aller à "Autres Questions"
  var boutonAutresQuestions = creerBouton("Autres Questions", function() {
    window.location.href = "../categories.html"; // Redirige vers une autre page
  });

  // Ajout des boutons au conteneur
  conteneurBoutons.appendChild(boutonRecommencer);
  conteneurBoutons.appendChild(boutonMessageFinal);
  conteneurBoutons.appendChild(boutonAutresQuestions);

  // Ajout du conteneur de boutons au contenu
  contenu.appendChild(conteneurBoutons);
}

  



  
  // Masquer le bouton suivant
  suivantBtn.style.display = "none";

 // Création des boutons de fin
 var boutonRecommencer = creerBouton("Recommencer le quiz", function() {
  location.reload(); // Recharge la page pour recommencer
});

var boutonScore = creerBouton("Afficher le score", function() {
  alert("Votre score est de : " + score + " / " + questions.length);
});

  // Création et ajout des boutons au contenu
  var divFin = document.createElement("div");
  divFin.className = "fin-quiz";
  divFin.appendChild(boutonRecommencer);
  divFin.appendChild(boutonScore);

  contenu.appendChild(divFin);


// Fonction d'aide pour créer des boutons
function creerBouton(texte, onClickCallback) {
  var bouton = document.createElement("button");
  bouton.textContent = texte;
  bouton.onclick = onClickCallback;
  return bouton;
}


// Modifier la fonction afficherQuestion pour appeler afficherFinQuiz si toutes les questions ont été répondues
function afficherQuestion() {
  contenu.innerHTML = ''; // Efface le contenu précédent
  if (indexQuestionActuelle < questions.length) {
    addLigne(questions[indexQuestionActuelle]);
  } else {
    afficherFinQuiz(); // Appel de la fonction pour gérer la fin du quiz
  }
}





function appliquerStyleBoutons() {
  var boutons = document.querySelectorAll('.bouton-standard'); // Sélectionne tous les boutons avec la classe 'bouton-standard'

  boutons.forEach(function(bouton) {
    bouton.style.position = 'fixed';
    bouton.style.top = '20px';
    bouton.style.right = '20px';
    bouton.style.zIndex = '1001';
    bouton.style.cursor = 'pointer';
    bouton.style.padding = '10px 15px';
    bouton.style.backgroundColor = '#007bff;';
    bouton.style.color = 'white';
    bouton.style.border = '2px solid white';
    bouton.style.borderRadius = '5px';
    bouton.style.fontSize = '16px';
    bouton.style.boxShadow = '0 2px 5px #0003';
    bouton.style.transition = 'background-color 0.3s, box-shadow 0.3s';

    // Modifiez ici pour positionner différemment chaque bouton si nécessaire
    // Exemple : bouton.style.right = 'calc(20px + 100px * index)'; // pour décaler chaque bouton
  });
}

// Appelez cette fonction à la fin du jeu, ou au moment de l'affichage de la modale
appliquerStyleBoutons();

// Assurez-vous également de gérer l'événement de clic pour le bouton Recommencer
document.getElementById('recommencer').onclick = function() {
  location.reload(); // Recharge la page pour recommencer le quiz
};

document.getElementById("autres-questions").addEventListener("click", function() {
  window.location.href = "../categories.html"; // Adaptez l'URL selon vos besoins
});

