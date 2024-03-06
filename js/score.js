document.addEventListener('DOMContentLoaded', function() {
    const tableau = document.getElementById('tableau');
    let html = '<table>';

    // En-tête avec des cellules éditables
    html += '<tr>';
    for (let j = 0; j < 10; j++) {
        if (j === 0) {
            html += `<th></th>`; // Première cellule vide
        } else {
            // Cellules éditables
            html += `<th contenteditable="true" spellcheck="true">Partie ${j}</th>`;
        }
    }
    html += '</tr>';

    // Corps du tableau
    for (let i = 0; i < 10; i++) {
        html += '<tr>';
        for (let j = 0; j < 10; j++) {
            if (j === 0) {
                // Première cellule de chaque ligne éditable pour les noms
                html += `<td contenteditable="true" spellcheck="true" class="name-cell color-${i + 1}"></td>`;
            } else if (j === 9) {
                // La dernière cellule pour afficher la somme
                html += `<td class="sum">0</td>`;
            } else {
                // Autres cellules éditables
                html += `<td contenteditable="true" spellcheck="true" class="editable-cell"></td>`;
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    tableau.innerHTML = html;

    // Fonction pour calculer, afficher la somme, et sauvegarder dans LocalStorage
    function updateSumAndNames() {
        document.querySelectorAll('table tr').forEach((row, rowIndex) => {
            const nameCell = row.querySelector('td.name-cell');
            if (nameCell) {
                // Sauvegarde le nom dans LocalStorage
                localStorage.setItem(`name-${rowIndex}`, nameCell.innerText);
            }
            const editableCells = row.querySelectorAll('td[contenteditable="true"].editable-cell');
            let sum = 0;
            editableCells.forEach((cell, cellIndex) => {
                let value = parseInt(cell.innerText) || 0;
                sum += value;
                // Sauvegarde chaque cellule individuellement
                localStorage.setItem(`cell-${rowIndex}-${cellIndex}`, cell.innerText);
            });
            const sumCell = row.querySelector('td.sum');
            if (sumCell) {
                sumCell.innerText = sum; // Affiche la somme
                // Sauvegarde la somme de la ligne
                localStorage.setItem(`sum-${rowIndex}`, sum);
            }
        });
    }

    // Charge les données depuis LocalStorage
    function loadData() {
        document.querySelectorAll('table tr').forEach((row, rowIndex) => {
            const nameCell = row.querySelector('td.name-cell');
            if (nameCell) {
                // Charge le nom depuis LocalStorage
                const savedName = localStorage.getItem(`name-${rowIndex}`);
                if (savedName) {
                    nameCell.innerText = savedName;
                }
            }
            row.querySelectorAll('td[contenteditable="true"], td.sum').forEach((cell, cellIndex) => {
                const savedValue = localStorage.getItem(`cell-${rowIndex}-${cellIndex}`);
                if (savedValue) {
                    cell.innerText = savedValue;
                }
            });
            // Met à jour la somme depuis le LocalStorage si disponible
            const sumCell = row.querySelector('td.sum');
            const savedSum = localStorage.getItem(`sum-${rowIndex}`);
            if (sumCell && savedSum) {
                sumCell.innerText = savedSum;
            }
        });
    }


    // Ajoute l'écouteur d'événements pour les cellules éditables
    tableau.addEventListener('input', function(event) {
        if (event.target.classList.contains('editable-cell') || event.target.classList.contains('name-cell')) {
            updateSumAndNames();
        }
    });

    // Charge les données au démarrage
    loadData();
});
