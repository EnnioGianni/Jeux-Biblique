// Liste des questions à afficher
var questions = [
//1
    {
      enonce: "Où habitait l'homme riche et insensé, marié à Abigaïl?",
      reponse: "Maon",
      indice1: "Cette ville se trouve en bordure du désert de Juda.",
      indice2: "Cette ville se trouve à l'Ouest de la mer Morte.",
    },
//2
    {
      enonce: "Combien d'années le fils du roi Yotham de Juda, a-t-il régné sur Juda ?",
      reponse: "16 ans (2 Rois 16:2)",
      indice1: "Sa durée est une période qui marque l'adolescence.",
      indice2: "Son règne a duré suffisamment longtemps pour voir deux générations grandir.",
    },
//3    
    {
      enonce: "Quelle est l'origine familiale de Nabal ?",
      reponse: "Calébite c’est-à-dire descendant de Caleb (1 Samuel 25:3) ",
      indice1: "Il descend d'une figure biblique associée à la force et la fidélité.",
      indice2: "Son ascendance est liée à un nom qui commence par C. ",
    },
//4    
    {
      enonce: "Dans quelle région Nabal faisait-il paître et tondre ses troupeaux? ",
      reponse: "Karmel de Juda. (1 Samuel 25:2) ",
      indice1: "Cette région est mentionnée dans le contexte judéen.",
      indice2: "Le nom de cette région commence par la lettre K. ",
    },
//5    
    {
      enonce: "Quelle est la signification du nom, Nabal ?",
      reponse: "Insense, Stupide. (it2 Nabal p.363) ",
      indice1: "Ce nom est une traduction ou une interprétation de son comportement et de sa personnalité.",
      indice2: "Ce nom est synonyme de sottise ou de manque de sagesse. ",
    },
//6    
    {
      enonce: "Après la mort de quel roi et de ses fils Abner a-t-il emmené Ish-Bosheth de l’autre côté du Jourdain ?",
      reponse: "Saül. (2S 2:8-11; 4:7; 5:4,5.)",
      indice1: "Ce roi et ses fils sont morts sur le champ de bataille à Guilboa.",
      indice2: "Il est le prédécesseur de David.",
    },
//7    
    {
      enonce: "Où Abner a-t-il emmené Ish-Bosheth pour le faire roi ?",
      reponse: "Mahanaïm, où il fut fait roi. (2S 2:8.)",
      indice1: "Cet endroit se trouve de l’autre côté du Jourdain.",
      indice2: "Le nom de cet endroit commence par M.",
    },
//8   
    {
      enonce: "Sur combien de tribus Ish-Bosheth fut-il fait roi, à l'exception de laquelle ?",
      reponse: "Touttes saus la tribu de Juda. (2S 2:8-11.)",
      indice1: "Ce nombre inclut toutes les tribus sauf une.",
      indice2: "La tribu exclue est celle qui reconnaissait déjà un autre roi.",
    },
//9   
    {
      enonce: "De quels ancêtres David est-il directement descendu ?",
      reponse: "Rhut et Boaz. (Ru 4:18-22 ; Mt 1:3-6.)",
      indice1: "L'une des personnes mentionnées est une femme célèbre pour sa loyauté et son amour.",
      indice2: "L'autre est connu pour son rôle dans une histoire d'amour et de rédemption.",
    },
//10   
    {
      enonce: "DQuelle est la caractéristique principale du fleuve d'eau de la vie vu dans la vision par Jean ?",
      reponse: "Limpide comme du cristal (Révélation 22:1)",
      indice1: "Cette caractéristique le décrit comme étant extrêmement clair et pur.",
      indice2: "l est comparé à une pierre précieuse en termes de transparence.",
    }
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
    reponseElt
    reponseElt.textContent = el.reponse;
  reponseElt.style.display = "none";
  divElt.appendChild(reponseElt);

  function afficherModalReponseCorrecte() {
    var modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#76EB5E";
    modal.style.padding = "20px";
    modal.style.border = "1px solid #ccc";
    modal.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    modal.style.zIndex = "2000";
  
    var modalContent = document.createElement("p");
    modalContent.textContent = "C'est juste! Bravo!";
  
    var okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.onclick = function() {
      modal.parentNode.removeChild(modal);
    };
  
    modal.appendChild(modalContent);
    modal.appendChild(okButton);
  
    document.body.appendChild(modal);
  }

// Cette fonction retourne maintenant un objet contenant la réponse nettoyée et son type (phrase ou nombre)
function nettoyerReponse(reponse) {
  let reponseNettoyee = reponse.replace(/\(.*?\)/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
  // Détermine si la réponse nettoyée est un nombre
  let estNombre = !isNaN(parseFloat(reponseNettoyee)) && isFinite(reponseNettoyee);
  
  return {
    reponseNettoyee: reponseNettoyee,
    type: estNombre ? 'nombre' : 'phrase'
  };
}

// Ajustement de la vérification pour accepter les correspondances partielles pour les phrases
buttonElt.addEventListener("click", function () {
  // Vérifie si la réponse de l'utilisateur est vide
  if (inputReponse.value.trim() === '') {
    afficherModal("Répondez à la question avant de poursuivre.");
    return; // Stoppe l'exécution de la fonction ici pour ne pas procéder à la vérification
  }

  var nettoyageUtilisateur = nettoyerReponse(inputReponse.value);
  var nettoyageAttendu = nettoyerReponse(el.reponse);

  let estCorrect = false;
  if (nettoyageAttendu.type === 'nombre') {
    estCorrect = nettoyageUtilisateur.reponseNettoyee === nettoyageAttendu.reponseNettoyee;
  } else {
    estCorrect = nettoyageAttendu.reponseNettoyee.includes(nettoyageUtilisateur.reponseNettoyee);
  }

  if (estCorrect) {
    afficherModalReponseCorrecte();
    buttonElt.disabled = true;
    suivantBtnLocal.style.display = "inline-block";
  } else {
    tentatives--;
    if (tentatives === 2) {
      indice1.style.display = "block";
    } else if (tentatives === 1) {
      indice2.style.display = "block";
    }
    if (tentatives > 1) {
      afficherModal("Il vous reste " + tentatives + " tentatives. Regardez l'indice 1");
    } else if (tentatives > 0) {
      afficherModal("Il vous reste " + tentatives + " tentative. Regardez l'indice 2");
    } else {
      afficherModal("La bonne réponse est affichée.");
      reponseElt.style.display = "block";
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
    afficherModalFinJeu("C'était la dernière question !");
    suivantBtnLocal.style.display = "none";
  }
});

  contenu.appendChild(divElt);
}

function afficherModal(message) {
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
  modal.style.backgroundColor = "#76EB5E";
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

function afficherModalFinJeu(message) {
  var modalFin = document.createElement("div");
  modalFin.id = "modalFinJeu";
  modalFin.style.position = "fixed";
  modalFin.style.top = "50%";
  modalFin.style.left = "50%";
  modalFin.style.transform = "translate(-50%, -50%)";
  modalFin.style.backgroundColor = "#FFF";
  modalFin.style.padding = "20px";
  modalFin.style.border = "1px solid #ccc";
  modalFin.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  modalFin.style.zIndex = "2000";

  var messageFin = document.createElement("p");
  messageFin.textContent = message;
  modalFin.appendChild(messageFin);

  var recommencerBtn = document.createElement("button");
  recommencerBtn.textContent = "Recommencer";
  recommencerBtn.onclick = function() {
    indexQuestionActuelle = 0;
    tentatives = 3;
    afficherQuestion();
    modalFin.parentNode.removeChild(modalFin);
  };
}

afficherQuestion();

function styleButton(button) {
    button.style.padding = "10px 15px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.color = "white";
    button.style.backgroundColor = "#007BFF";
    button.style.cursor = "pointer";
    button.style.marginRight = "5px";
    button.style.textAlign = "center";
    button.style.display = "inline-block";
    button.style.fontSize = "16px";
    button.style.fontFamily = "Arial, sans-serif";
    // Ajoutez ici d'autres styles selon vos besoins
  }
  
  function afficherModalFinJeu(message) {
    var modalFin = document.createElement("div");
    // Styles pour modalFin ici, si nécessaire
    modalFin.style.position = "fixed";
    modalFin.style.top = "50%";
    modalFin.style.left = "50%";
    modalFin.style.transform = "translate(-50%, -50%)";
    modalFin.style.backgroundColor = "#FFF";
    modalFin.style.padding = "20px";
    modalFin.style.border = "1px solid #ccc";
    modalFin.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    modalFin.style.zIndex = "2000";
  
    var messageFin = document.createElement("p");
    messageFin.textContent = message;
    modalFin.appendChild(messageFin);
  
    var recommencerBtn = document.createElement("button");
    recommencerBtn.textContent = "Recommencer";
    styleButton(recommencerBtn); // Appliquer les styles au bouton
    recommencerBtn.onclick = function() {
      indexQuestionActuelle = 0;
      tentatives = 3;
      afficherQuestion();
      document.body.removeChild(modalFin);
    };
    modalFin.appendChild(recommencerBtn);
  
    var nouvellesQuestionsLink = document.createElement("a");
    nouvellesQuestionsLink.textContent = "Vers de nouvelles questions";
    nouvellesQuestionsLink.href = "../categories.html"; // Remplacer par l'URL réelle
    styleButton(nouvellesQuestionsLink); // Appliquer les styles au lien comme s'il s'agissait d'un bouton
    nouvellesQuestionsLink.style.textDecoration = "none";
    nouvellesQuestionsLink.style.color = "white"; // Assurer que le texte du lien est blanc
    modalFin.appendChild(nouvellesQuestionsLink);
  
    document.body.appendChild(modalFin);
  }
  

  function responsiveStyles() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      // Tablettes et en dessous
      divElt.style.width = '90%'; // Utilisez une largeur relative pour s'adapter à l'écran
      divElt.style.top = '50%';
      divElt.style.left = '50%';
      divElt.style.transform = 'translate(-50%, -50%)';
    } else if (window.matchMedia("(max-width: 480px)").matches) {
      // Smartphones
      divElt.style.width = '95%'; // Augmentez la largeur pour les petits écrans
      // Assurez-vous que le contenu est bien lisible sur de petits appareils
      divElt.style.fontSize = '14px'; // Diminuez la taille de police pour économiser de l'espace
    }
  }
  
  // Appliquez cette fonction à chaque élément lors de sa création ou modification pour assurer le responsive design
  responsiveStyles(); // Appeler cette fonction après la création/modification de chaque élément
  
  