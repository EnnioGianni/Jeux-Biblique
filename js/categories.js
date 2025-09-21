document.addEventListener('DOMContentLoaded', () => {
  const categories = [
    // Exemples de catégories avec sous-catégories et sous-sous-catégories (comme avant)
    {
      name: "Bible",
      subcategories: [
        {
          name: "Genèse",
          subSubcategories: [
            { name: "1 - Genèse", url: "./BIBLE/1Genese/1_genese.html" },
            { name: "2 - Genèse", url: "./BIBLE/1Genese/2_genese.html" },
            { name: "3 - Genèse", url: "./BIBLE/1Genese/3_genese.html" }
          ]
        },
        {
          name: "Josué",
          subSubcategories: [
            { name: "Josué ch. 1", url: "./BIBLE/5Josue/1_josue.html" }
          ]
        },
        {
          name: "Psaumes",
          subSubcategories: [
            { name: "Psaumes", url: "./BIBLE/4Psaumes/1_Psaumes.html" },
            { name: "Psaume 18", url: "./BIBLE/4Psaumes/18em_Psaumes.html" }
          ]
        }
      ]
    },
    // Ajouter les autres catégories ici
  ];

  const container = document.getElementById('container');

  // Fonction pour fermer tous les menus ouverts sauf celui de la catégorie actuelle
  function closeAllDropdowns(exceptCategory) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
      if (dropdown.parentElement.querySelector('.category').textContent.replace(' ▲', ' ▼') !== exceptCategory) {
        dropdown.style.display = 'none';
        dropdown.previousElementSibling.textContent = dropdown.previousElementSibling.textContent.replace(' ▲', ' ▼');
      }
    });
  }

  // Créer un lien pour chaque sous-sous-catégorie
  function createSubSubcategory(subSubcategory) {
    const element = document.createElement('a');
    element.href = subSubcategory.url;
    element.textContent = subSubcategory.name;
    element.className = 'sub-subcategory';
    return element;
  }

  // Créer une sous-catégorie et afficher ses sous-sous-catégories si elles existent
  function createSubcategory(subcategory) {
    const subcategoryElement = document.createElement('div');
    subcategoryElement.className = 'subcategory';

    const title = document.createElement('a');
    title.href = subcategory.url || '#';
    title.textContent = subcategory.name;
    title.className = 'subcategory-title';
    subcategoryElement.appendChild(title);

    // Si des sous-sous-catégories existent
    if (subcategory.subSubcategories) {
      const subDropdown = document.createElement('div');
      subDropdown.className = 'sub-dropdown-content';
      subDropdown.style.display = 'none';

      subcategory.subSubcategories.forEach(subSubcategory => {
        const subSubcategoryElement = createSubSubcategory(subSubcategory);
        subDropdown.appendChild(subSubcategoryElement);
      });

      subcategoryElement.appendChild(subDropdown);

      // Ajout de l'événement de clic pour afficher/masquer la liste des sous-sous-catégories
      title.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche la navigation par défaut
        const isVisible = subDropdown.style.display === 'block';
        subDropdown.style.display = isVisible ? 'none' : 'block';
      });
    }

    return subcategoryElement;
  }

  // Créer une catégorie avec ses sous-catégories
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

    // Ajout de l'événement de clic pour afficher/masquer les sous-catégories
    categoryElement.addEventListener('click', () => {
      const isVisible = dropdown.style.display === 'block';
      closeAllDropdowns(category.name); // Fermer tous les autres menus
      dropdown.style.display = isVisible ? 'none' : 'block';
      categoryElement.textContent = category.name + (isVisible ? ' ▼' : ' ▲');
    });

    // Ajout du support mobile (touchstart pour les appareils tactiles)
    categoryElement.addEventListener('touchstart', () => {
      const isVisible = dropdown.style.display === 'block';
      closeAllDropdowns(category.name);
      dropdown.style.display = isVisible ? 'none' : 'block';
      categoryElement.textContent = category.name + (isVisible ? ' ▼' : ' ▲');
    });
  }

  // Créer toutes les catégories à partir de l'array "categories"
  categories.forEach(createCategory);
});
