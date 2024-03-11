document.addEventListener('DOMContentLoaded', () => {
    const categories = [
    //Bible
        {
            name: "Bible",
            subcategories: [
              {
                name: "Genèse",
                subSubcategories: [
                    { name: "1 - Genèse", url: "./BIBLE/1Genese/1_genese.html" },
                    { name: "2 - Genèse", url: "./BIBLE/1Genese/2_genese.html" },
                    { name: "3 - Genèse", url: "./BIBLE/1Genese/3_genese.html" },  
                    // Ajouter d'autres sous-sous-catégories ici
                ]
            },
                { name: "Exode", url: "./BIBLE/2Exode/1_exode.html" }, // Exemple de lien correctement mis
                { name: "Levitique", url: "./BIBLE/3Levitique/1_levitique.html" }, // Exemple de lien correctement mis
                { name: "Nombres", url: "./BIBLE/Nombres/6_Nombres.html" }, // Exemple de lien correctement mis
                { name: "Actes", url: "./BIBLE/Actes/10_Actes.html" }, // Exemple de lien correctement mis
                { name: "Psaumes", url: "./BIBLE/4Psaumes/1_Psaumes.html" } // Exemple de lien correctement mis
            ]
        },
  //Personages Bibliques
  {
    name: "Personnages Bibliques",
    subcategories: [
      {
        name: "Guidéon",
        subSubcategories: [
          { name: "Guidéon", url: "./BIBLE/Personages_Bibliques/Guideon.html" },
        //   { name: "Leçons de vie", url: "./BIBLE/Personages_Bibliques/Guideon/lecons.html" },
        ]
      },
      {
        name: "Saül",
        subSubcategories: [
          { name: "Saül", url: "./BIBLE/Personages_Bibliques/Saul.html" },
        //   { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
        ]
      },
      {
        name: "Manoah",
        subSubcategories: [
          { name: "Manoah", url: "./BIBLE/Personages_Bibliques/manoah.html" },
        //   { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
        ]
      },
    ]
  },
  //Lieux
  {
    name: "Lieux",
    subcategories: [
      {
        name: "Lieux",
        subSubcategories: [
          { name: "Babel", url: "./BIBLE/Lieux/babel.html" },,
          { name: "Our", url: "./BIBLE/Lieux/our.html" },
          { name: "Jéricho", url: "./BIBLE/Lieux/jericho.html" }
        ]
      },
      // {
      //   name: "Monts",
      //   subSubcategories: [
      //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
      //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
      //   ]
      // },
      // {
      //   name: "Jardins",
      //   subSubcategories: [
      //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
      //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
      //   ]
      // },
    ]
  },
  //Les Femmes dans la Bible
    {
      name: "Les Femmes dans la Bible",
        subcategories: [
          {
            name: "Les Femmes dans la Bible",
            subSubcategories: [
              { name: "Hanna", url: "./BIBLE/FemmeDansLaBible/Hanna.html" },
              { name: "Déborah", url: "./BIBLE/FemmeDansLaBible/deborah.html" }
        ]
      },
      // {
      //   name: "Monts",
      //   subSubcategories: [
      //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
      //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
      //   ]
      // },
      // {
      //   name: "Jardins",
      //   subSubcategories: [
      //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
      //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
      //   ]
      // },
    ]
  },
  //Vrai ou Faux      
  {
    name: "Vrai ou Faux",
      subcategories: [
        {
          name: "Vrai ou Faux",
          subSubcategories: [
            { name: "Juges Chapitre 1", url: "./BIBLE/VraiFaux/1_VraiFaux.html" },
      ]
    },
    // {
    //   name: "Monts",
    //   subSubcategories: [
    //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
    //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
    //   ]
    // },
    // {
    //   name: "Jardins",
    //   subSubcategories: [
    //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
    //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
    //   ]
    // },
  ]
  },
  //Énigmes      
  {
    name: "Énigmes",
      subcategories: [
        {
          name: "Énigmes",
          subSubcategories: [
            { name: "1 - Énigmes", url: "./BIBLE/Enigmes/1_enigmes.html" },
            { name: "2 - Énigmes", url: "./BIBLE/Enigmes/2_enigmes.html" },
            { name: "3 - Énigmes", url: "./BIBLE/Enigmes/3_enigmes.html" },
      ]
    },
    // {
    //   name: "Monts",
    //   subSubcategories: [
    //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
    //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
    //   ]
    // },
    // {
    //   name: "Jardins",
    //   subSubcategories: [
    //     { name: "Règne de Saül", url: "./BIBLE/Personages_Bibliques/Saul/regne.html" },
    //     { name: "Saül et David", url: "./BIBLE/Personages_Bibliques/Saul/et_david.html" },
    //   ]
    // },
  ]
  },
  //Quiz
  {
    name: "Quiz",
    subcategories: [
      {
        name: "Quiz",
        subSubcategories: [
          { name: "Quiz", url: "./BIBLE/Quiz/1_quiz.html" },
          // { name: "2 Humours", url: "./BIBLE/Humours/2_humour.html" },
          // { name: "3 Humours", url: "./BIBLE/Humours/3_humour.html" },
        ]
      },
  // {
  ]
  },
  //Humours
    {
        name: "Un peu D'humours",
        subcategories: [
          {
            name: "D'humours",
            subSubcategories: [
              { name: "1 Humours", url: "./BIBLE/Humours/1_humour.html" },
              { name: "2 Humours", url: "./BIBLE/Humours/2_humour.html" },
              { name: "3 Humours", url: "./BIBLE/Humours/3_humour.html" },
            ]
          },
      // {
      //   name: "2 Devinettes",
      //   subSubcategories: [
      //     { name: "Facile", url: "./BIBLE/Devinettes/2_devinettes_facile.html" },
      //     { name: "Moyen", url: "./BIBLE/Devinettes/2_devinettes_moyen.html" },
      //     { name: "Difficile", url: "./BIBLE/Devinettes/2_devinettes_difficile.html" },
      //   ]
      // },
      // Vous pouvez continuer à ajouter des sous-sous-catégories aux autres sous-catégories selon le même modèle, si nécessaire.
      ]
    },
  //Devinettes      
        {
          name: "Devinettes",
          subcategories: [
            {
              name: "1 Devinettes",
              subSubcategories: [
                { name: "1 Devinettes", url: "./BIBLE/Devinettes/1_devinettes.html" },
                { name: "2 Devinettes", url: "./BIBLE/Devinettes/2_devinettes.html" },
                { name: "3 Devinettes", url: "./BIBLE/Devinettes/3_devinettes.html" },
                { name: "4 Devinettes", url: "./BIBLE/Devinettes/4_devinettes.html" },
                { name: "5 Devinettes", url: "./BIBLE/Devinettes/5_devinettes.html" },            ]
            },
            // {
            //   name: "2 Devinettes",
            //   subSubcategories: [
            //     { name: "Facile", url: "./BIBLE/Devinettes/2_devinettes_facile.html" },
            //     { name: "Moyen", url: "./BIBLE/Devinettes/2_devinettes_moyen.html" },
            //     { name: "Difficile", url: "./BIBLE/Devinettes/2_devinettes_difficile.html" },
            //   ]
            // },
            // Vous pouvez continuer à ajouter des sous-sous-catégories aux autres sous-catégories selon le même modèle, si nécessaire.
          ]
        },
  //Devinettes      
  {
    name: "Correspondances",
    subcategories: [
      {
        name: "Correspondances",
        subSubcategories: [
          { name: "Correspondances", url: "./BIBLE/Correspondances/1_correspondaces.html" },
          // { name: "2 Devinettes", url: "./BIBLE/Devinettes/2_devinettes.html" },
          // { name: "3 Devinettes", url: "./BIBLE/Devinettes/3_devinettes.html" },
          // { name: "4 Devinettes", url: "./BIBLE/Devinettes/4_devinettes.html" },
          // { name: "5 Devinettes", url: "./BIBLE/Devinettes/5_devinettes.html" },            
        ]
      },
      // {
      //   name: "2 Devinettes",
      //   subSubcategories: [
      //     { name: "Facile", url: "./BIBLE/Devinettes/2_devinettes_facile.html" },
      //     { name: "Moyen", url: "./BIBLE/Devinettes/2_devinettes_moyen.html" },
      //     { name: "Difficile", url: "./BIBLE/Devinettes/2_devinettes_difficile.html" },
      //   ]
      // },
      // Vous pouvez continuer à ajouter des sous-sous-catégories aux autres sous-catégories selon le même modèle, si nécessaire.
    ]
  },
  
  //Évangiles
        {
          name: "Évangiles",
          subcategories: [
            { 
              name: "Luc", 
              subSubcategories: [
                { name: "Luc", url: "./BIBLE/Evangiles/luc.html" },
                // { name: "Paraboles de Luc", url: "./BIBLE/Evangiles/Luc/paraboles.html" },
                // Ajouter d'autres sous-sous-catégories spécifiques à Luc ici
              ]
            },
            { 
              name: "Jean", 
              subSubcategories: [
                { name: "Jean", url: "./BIBLE/Evangiles/jean.html" },
                // { name: "Miracles de Jean", url: "./BIBLE/Evangiles/Jean/miracles.html" },
                // Ajouter d'autres sous-sous-catégories spécifiques à Jean ici
              ]
            },
            { 
              name: "Matthieu", 
              subSubcategories: [
                { name: "Matthieu", url: "./BIBLE/Evangiles/matthieu.html"},
                // { name: "Généalogie de Jésus", url: "./BIBLE/Evangiles/Matthieu/genealogie.html" },
                // Ajouter d'autres sous-sous-catégories spécifiques à Matthieu ici
              ]
            },
            { 
              name: "Marc", 
              subSubcategories: [
                { name: "Matthieu", url: "./BIBLE/Evangiles/matthieu.html"},
                // { name: "Généalogie de Jésus", url: "./BIBLE/Evangiles/Matthieu/genealogie.html" },
                // Ajouter d'autres sous-sous-catégories spécifiques à Matthieu ici
              ]
            },
            // Vous pouvez ajouter Marc de la même manière
          ]
        }
        
        // Les autres catégories, comme précédemment
    ];
  
    const container = document.getElementById('container');

    function closeAllDropdowns(exceptCategory) {
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown.parentElement.querySelector('.category').textContent.replace(' ▲', ' ▼') !== exceptCategory) {
          dropdown.style.display = 'none';
          dropdown.previousElementSibling.textContent = dropdown.previousElementSibling.textContent.replace(' ▲', ' ▼');
        }
      });
    }
  
    function createSubSubcategory(subSubcategory) {
      const element = document.createElement('a');
      element.href = subSubcategory.url;
      element.textContent = subSubcategory.name;
      element.className = 'sub-subcategory';
      return element;
    }
  
    function createSubcategory(subcategory) {
      const subcategoryElement = document.createElement('div');
      subcategoryElement.className = 'subcategory';
  
      const title = document.createElement('a');
      title.href = subcategory.url || '#';
      title.textContent = subcategory.name;
      title.className = 'subcategory-title';
      subcategoryElement.appendChild(title);
  
      if (subcategory.subSubcategories) {
        const subDropdown = document.createElement('div');
        subDropdown.className = 'sub-dropdown-content';
        subDropdown.style.display = 'none';
  
        subcategory.subSubcategories.forEach(subSubcategory => {
          const subSubcategoryElement = createSubSubcategory(subSubcategory);
          subDropdown.appendChild(subSubcategoryElement);
        });
  
        subcategoryElement.appendChild(subDropdown);
        title.addEventListener('click', (e) => {
          e.preventDefault(); // Empêche la navigation par défaut
          const isVisible = subDropdown.style.display === 'block';
          subDropdown.style.display = isVisible ? 'none' : 'block';
        });
      }
  
      return subcategoryElement;
    }
  
    function createCategory(category) {
      const column = document.createElement('div');
      column.className = 'column';
  
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category';
      categoryElement.textContent = category.name + ' ▼';
      categoryElement.style.cursor = 'pointer';
  
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown-content';
      dropdown.style.display = 'none';
  
      category.subcategories.forEach(subcategory => {
        const subcategoryElement = createSubcategory(subcategory);
        dropdown.appendChild(subcategoryElement);
      });
  
      column.appendChild(categoryElement);
      column.appendChild(dropdown);
      container.appendChild(column);
  
      categoryElement.addEventListener('click', () => {
        const isVisible = dropdown.style.display === 'block';
        closeAllDropdowns(category.name);
        dropdown.style.display = isVisible ? 'none' : 'block';
        categoryElement.textContent = category.name + (isVisible ? ' ▼' : ' ▲');
      });
    }
  
    categories.forEach(createCategory);
  });