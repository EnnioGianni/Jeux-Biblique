document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;

    // Création du bouton hamburger
    var hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburgerBtn';
    hamburgerBtn.innerHTML = '&#9776; Menu';
    body.appendChild(hamburgerBtn);

    // Création du menu
    var menuHamburger = document.createElement('div');
    menuHamburger.id = 'menuHamburger';
    menuHamburger.classList.add('hidden'); // Assurez-vous que le menu est initialement caché
    body.appendChild(menuHamburger);

    // Ajout des liens au menu
    var liens = [
        { href: '../categories.html', text: 'Categories' },
        { href: '../index.html', text: 'Accueil' },
        { href: '../../BIBLE/BibleSommaire.html', text: 'BIBLE' },
        { href: '../../BIBLE/Personages_Bibliques/sommaire.html', text: 'Personages Bibliques' }
    ];

    liens.forEach(function(lien) {
        var a = document.createElement('a');
        a.href = lien.href;
        a.textContent = lien.text;
        menuHamburger.appendChild(a);
    });

    // Ouvre ou ferme le menu hamburger
    hamburgerBtn.addEventListener('click', function() {
        menuHamburger.classList.toggle('hidden');
    });

    // Ferme le menu si on clique en dehors de celui-ci
    document.addEventListener('click', function(event) {
        var isClickInsideMenu = menuHamburger.contains(event.target);
        var isClickButton = hamburgerBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickButton && !menuHamburger.classList.contains('hidden')) {
            menuHamburger.classList.add('hidden');
        }
    });
});
