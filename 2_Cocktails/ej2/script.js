document.addEventListener('DOMContentLoaded', () => {
    const cocktailList = document.getElementById('cocktailList');
    const cocktailDetails = document.getElementById('cocktailDetails');



    cocktails.slice(-20).reverse().forEach(cocktail => {
        const listItem = document.createElement('li');
        listItem.textContent = cocktail.strDrink;
        listItem.addEventListener('click', () => showCocktailDetails(cocktail));
        cocktailList.appendChild(listItem);
    });



    function showCocktailDetails(cocktail) {
        const ingredients = getIngredients(cocktail);
        const instructions = cocktail.strInstructions;

        const detailsHTML = `
      <h2>${cocktail.strDrink}</h2>
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
      <h3>Ingredientes:</h3>
      <ul>${ingredients}</ul>
      <h3>Instrucciones:</h3>
      <p>${instructions}</p>
      <p><strong>Tipo de Vaso:</strong> ${cocktail.strGlass}</p>
      <p><strong>Tipo de Bebida Alcohólica:</strong> ${cocktail.strAlcoholic}</p>
    `;

        cocktailDetails.innerHTML = detailsHTML;
        cocktailDetails.style.display = 'block';
    }

    // lista ingredientes
    function getIngredients(cocktail) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
            }
        }
        return ingredients.map(item => `<li>${item}</li>`).join('');
    }
});
