document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.querySelector('.button');
    var sideMenu = document.getElementById('sideMenu');
    // Vérifiez si l'élément overlay est présent dans votre HTML.
    // S'il n'est pas utilisé, cette partie peut être ajustée ou omise.
    var overlay = document.getElementById('overlay');
    var menuToggle = document.querySelector('.hamburger-menu');

    // Ajoute l'écouteur d'événements au bouton de démarrage
    if (startButton) {
        startButton.addEventListener('click', function () {
            console.log('Le jeu commence ou une autre action se produit');
        });
    }

    // Fonction pour basculer l'état du menu et de l'overlay
    function toggleMenu() {
        if (sideMenu.style.left === '-250px' || sideMenu.style.left === '') {
            sideMenu.style.left = '0px';
            if (overlay) overlay.style.display = 'block'; // Affiche l'overlay
        } else {
            sideMenu.style.left = '-250px';
            if (overlay) overlay.style.display = 'none'; // Masque l'overlay
        }
    }

    // Ajoute l'écouteur d'événements au menu hamburger pour basculer le menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Ferme le menu si l'utilisateur clique sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleMenu(); // Réutilise la fonction toggleMenu pour fermer
        });
    }

    // Empêche la fermeture du menu lors d'un clic à l'intérieur du menu ou du toggle
    document.addEventListener('click', function(event) {
        var isClickInsideMenu = sideMenu.contains(event.target) || menuToggle.contains(event.target);

        if (!isClickInsideMenu && sideMenu.style.left === '0px') {
            toggleMenu(); // Réutilise la fonction toggleMenu pour fermer
        }
    }, true); // L'utilisation de true pour la capture assure que l'événement est capturé avant de se propager.
});
document.addEventListener('DOMContentLoaded', function() {
    var sideMenu = document.getElementById('sideMenu'); // Récupération de l'élément du menu

    // Définition des liens du menu
    var menuLinks = [
        { href: "../index.html", text: "Accueil" },
        { href: "../choix.html", text: "Choix" },
        { href: "../BIBLE/bibleSommaire.html", text: "Sommaire Bible" },
        { href: "../categories.html", text: "Categories" },
        { href: "../score.html", text: "Score" },
        // Ajoutez d'autres liens ici selon vos besoins
    ];

    // Suppression des anciens liens (si nécessaire)
    // Cela dépend de si vous voulez garder l'image ou non dans le menu
    while(sideMenu.firstChild && sideMenu.firstChild.tagName !== 'IMG') {
        sideMenu.removeChild(sideMenu.firstChild);
    }

    // Création et ajout des nouveaux liens dans le menu
    menuLinks.forEach(function(link) {
        var a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.className = 'menu-link'; // Ajout de la classe pour le style
        sideMenu.appendChild(a); // Ajout du lien au menu
    });
});
