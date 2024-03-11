function toggleMenu() {
    var menu = document.getElementById("sidebar-menu");
    menu.style.width = menu.style.width === '250px' ? '0' : '250px';
}

// Fermeture du menu en cliquant en dehors
document.addEventListener('click', function(event) {
    var menu = document.getElementById("sidebar-menu");
    var clickInsideMenu = document.getElementById("sidebar-menu").contains(event.target);
    var clickHamburgerIcon = document.getElementById("hamburger-icon").contains(event.target);

    if (!clickInsideMenu && !clickHamburgerIcon && menu.style.width === '250px') {
        menu.style.width = '0';
    }
});
