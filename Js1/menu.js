// Accordion
$("li.accordion span").click(function () {
    if ($(this).parent().hasClass("open")) {
      $("li.accordion").removeClass("open");
      $("li.accordion ul").slideUp();
    } else {
      $("li.accordion ul").slideUp();
      $(this).parent().children("ul").slideDown();
      $("li.accordion").removeClass("open");
      $(this).parent().addClass("open");
    }
  });

/*Categories*/
    var categories = [
      {
        id: "Index",
        text: "Accueil",
        href: "./index.html"
      },
      {
        id: "Categories",
        text: "Choisissez une catégorie pour commencer à jouer.",
        href: "./categories.html",
        nombreArticles: 7

      },
      {
        id: "Genese",
        text: "Genèse",
        href: "../../BIBLE/1Genese/1_genese.html",
        nombreArticles: 3
      },
      {
        id: "Exode",
        text: "Exode",
        href: "../../BIBLE/2Exode/1_exode.html",
        nombreArticles: 1
      },
      {
        id: "Nombres",
        text: "Nombres",
        href: "../../BIBLE/Nombres/6_Nombres.html",
        nombreArticles: 1
      },
      {
        id: "Levitique",
        text: "Levitique",
        href: "../../BIBLE/3Levitique/1_levitique.html",
        nombreArticles: 1
      },
      {
        id: "Actes",
        text: "Actes",
        href: "../../BIBLE/Actes/10_Actes.html",
        nombreArticles: 1
      },
      {
        id: "Femmes dans la Bible",
        text: "Les Femmes dans la Bible",
        href: "../../BIBLE/FemmeDansLaBible/FemmeSommaire.html",
        nombreArticles: 2
      },
      {
        id: "Lieux Bibliques",
        text: "Lieux Bibliques",
        href: "../../BIBLE/Lieux/sommaireLieux.html",
        nombreArticles: 3
      },
     
      {
        id: "Enigmes",
        text: "Énigmes",
        href: "../../BIBLE/Enigmes/1_enigmes.html",
        nombreArticles: 3
      },
      {
        id: "Quiz",
        text: "Quiz",
        href: "../../BIBLE/Quiz/1_Quiz.html",
        nombreArticles: 2
      },
      {
        id: "Correspondances",
        text: "Correspondances",
        href: "../../BIBLE/Correspondances/1_correspondaces.html",
        nombreArticles: 2
      },
      {
        id: "Humours",
        text: "Un peu D'humour",
        href: "../../BIBLE/Humours/1_humour.html",
        nombreArticles: 3
      },
      {
        id: "Devinettes",
        text: "Devinettes",
        href: "../../BIBLE/Devinettes/1_devinettes.html",
        nombreArticles: 5
      },
      {
        id: "Evangiles",
        text: "Evangiles",
        href: "../categories.html",
        nombreArticles: 3
      },
     
     
      // Ajoutez d'autres catégories ici...
    ];
  
    function creerLiens() {
      var ul = document.getElementById("listeCategories");
      if (!ul) return;
  
      var urlActuelle = window.location.pathname.split('/').pop();
  
      categories.forEach(function(categorie) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.textContent = categorie.text;
        a.href = '../' + categorie.href;
        a.id = categorie.id;
  
        var span = document.createElement("span");
        span.classList.add("nombreArticles");
        span.textContent = categorie.nombreArticles;
        a.appendChild(span);
  
        if (urlActuelle === categorie.href.split('/').pop()) {
          a.classList.add("active");
        }
  
        li.appendChild(a);
        ul.appendChild(li);
      });
    }
  
    window.addEventListener('load', creerLiens);

// Données pour les archives
var archives = [
  {
    annee: "0",
    lien: "#", // Mettez ici le lien vers l'archive de l'année
    // nombre: 0, // Nombre total d'articles pour l'année
    mois:[
      { nom: "0", nombre: 0, lien: "../../archives2024/sommaire2024.html" },
      // Autres mois pour 2024...
      { nom: "0", nombre: 0, lien: "../../archives2024/sommaire2024.html" },
      // Autres mois pour 2024...
    ]
  },
  {
    annee: "0",
    lien: "#2025",
    nombre: 0,
    mois: [
      { nom: "0", nombre: 0, lien: "#janvier2025" },
      // Autres mois pour 2025...
    ]
  },
  // Autres années...
];

function creerLiensArchives() {
  var container = document.getElementById("listeArchives");
  if (!container) return;

  archives.forEach(function(archive) {
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var aAnnee = document.createElement("a");
    aAnnee.textContent = archive.annee;
    aAnnee.href = archive.lien;

    if (window.location.href.includes(archive.lien)) {
      aAnnee.classList.add("active");
    }

    var spanAnnee = document.createElement("span");
    spanAnnee.classList.add("nombreArticles");
    spanAnnee.textContent = archive.nombre;
    aAnnee.appendChild(spanAnnee);

    h2.appendChild(aAnnee);
    div.appendChild(h2);

    var ul = document.createElement("ul");
    archive.mois.forEach(function(mois) {
      var li = document.createElement("li");
      var aMois = document.createElement("a");
      aMois.textContent = mois.nom;
      aMois.href = mois.lien;

      if (window.location.href.includes(mois.lien)) {
        aMois.classList.add("active");
      }

      var spanMois = document.createElement("span");
      spanMois.classList.add("nombreArticles");
      spanMois.textContent = mois.nombre;
      aMois.appendChild(spanMois);

      li.appendChild(aMois);
      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}

window.addEventListener('load', creerLiensArchives);