document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            name: "Bible",
            subcategories: [
                { name: "Genèse", url: "./BIBLE/1Genese/1_genese.html" },
                { name: "Exode", url: "./BIBLE/2Exode/1_exode.html" }, // Exemple de lien correctement mis
                { name: "Levitique", url: "./BIBLE/3Levitique/1_levitique.html" }, // Exemple de lien correctement mis
                { name: "Nombres", url: "./BIBLE/Nombres/6_Nombres.html" }, // Exemple de lien correctement mis
                { name: "Actes", url: "./BIBLE/Actes/10_Actes.html" }, // Exemple de lien correctement mis
                { name: "Psaumes", url: "./BIBLE/4Psaumes/1_Psaumes.html" } // Exemple de lien correctement mis
            ]
        },
        {
            name: "Personages Bibliques",
            subcategories: [{ name: "Guidéon", url: "./BIBLE/Personages_Bibliques/Guideon.html" },
                            { name: "Saül", url: "./BIBLE/Personages_Bibliques/saul.html" }, // Exemple de lien correctement mis
                            { name: "Manoah", url: "./BIBLE/Personages_Bibliques/Manoah.html" } // Exemple de lien correctement mis
        ]
        },
        {
            name: "Lieux",
            subcategories: [{ name: "Babel", url: "./BIBLE/Lieux/babel.html" },
                            { name: "Our", url: "./BIBLE/Lieux/our.html" }, // Exemple de lien correctement mis
                            { name: "Jéricho", url: "./BIBLE/Lieux/jericho.html" } // Exemple de lien correctement mis
        ]
        },
        {
            name: "Les Femmes dans la Bible",
            subcategories: [{ name: "Sommaire", url: "./BIBLE/FemmeDansLaBible/Femmesommaire.html" },
                            { name: "Hanna", url: "./BIBLE/FemmeDansLaBible/Hanna.html" },
                            { name: "Déborah", url: "./BIBLE/FemmeDansLaBible/deborah.html" }
        ]
        },
        {
            name: "Vrai ou Faux",
            subcategories: [{ name: "Juges Chapitre 1", url: "./BIBLE/VraiFaux/1_VraiFaux.html" },
        ]
        },
        {
            name: "Énigmes",
            subcategories: [{ name: "1 - Énigmes", url: "./BIBLE/Enigmes/1_enigmes.html" },
                            { name: "2 - Énigmes", url: "./BIBLE/Enigmes/2_enigmes.html" },
                            { name: "3 - Énigmes", url: "./BIBLE/Enigmes/3_enigmes.html" },
        ]
        },
        {
            name: "Quiz",
            subcategories: [{ name: "Quiz", url: "./BIBLE/Quiz/1_quiz.html" },
        ]
        },
        {
            name: "Correspondances",
            subcategories: [{ name: "Correspondances", url: "./BIBLE/Correspondances/1_correspondaces.html" },
        ]
        },
        {
            name: "Un peu D'humours",
            subcategories: [
                { name: "1 Humours", url: "./BIBLE/Humours/1_humour.html" },
                { name: "2 Humours", url: "./BIBLE/Humours/2_humour.html" },
                { name: "3 Humours", url: "./BIBLE/Humours/3_humour.html" },
        ]
        },
        {
            name: "Devinettes",
            subcategories: [
                { name: "1 Devinettes", url: "./BIBLE/Devinettes/1_devinettes.html" },
                { name: "2 Devinettes", url: "./BIBLE/Devinettes/2_devinettes.html" },
                { name: "3 Devinettes", url: "./BIBLE/Devinettes/3_devinettes.html" },
                { name: "4 Devinettes", url: "./BIBLE/Devinettes/4_devinettes.html" },
        ]
        },
        {
            name: "Evangiles",
            subcategories: [{ name: "Luc", url: "./BIBLE/Evangiles/luc.html" },
                            { name: "Jean", url: "./BIBLE/Evangiles/jean.html" },
        ]
        },
        // Les autres catégories, comme précédemment
    ];

    const container = document.getElementById('container');

    categories.forEach((category, index) => {
        const column = document.createElement('div');
        column.className = 'column';

        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = category.name + ' ▼'; // Icône pour déplier
        categoryElement.style.cursor = 'pointer'; // Style pour indiquer qu'on peut cliquer

        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-content';
        dropdown.id = `dropdown${index}`;
        dropdown.style.display = 'none'; // Initialiser comme caché

        category.subcategories.forEach(subcategory => {
            const subcategoryElement = document.createElement('a');
            // Utiliser 'url' si défini, sinon '#'
            subcategoryElement.href = subcategory.url || '#';
            subcategoryElement.textContent = subcategory.name || subcategory;
            dropdown.appendChild(subcategoryElement);
        });

        column.appendChild(categoryElement);
        column.appendChild(dropdown);
        container.appendChild(column);

        categoryElement.addEventListener('click', () => {
            // Fermer tous les dropdowns sauf celui cliqué
            document.querySelectorAll('.dropdown-content').forEach((el, elIndex) => {
                if (elIndex !== index) el.style.display = 'none';
            });
            // Bascule l'état de cette catégorie spécifique
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
            categoryElement.textContent = category.name + (isVisible ? ' ▼' : ' ▲'); // Mise à jour de l'icône
        });
    });
});




