document.addEventListener('DOMContentLoaded', function () {

    const yearsData = {};
    const alcoholData = {
        Gin: 0,
        Vodka: 0,
        Tequila: 0,
        Rum: 0,
        Whiskey: 0,
    };
    cocktails.forEach(cocktail => {
        if (cocktail.dateModified && typeof cocktail.dateModified === 'string' && cocktail.dateModified.length >= 4) {
            const year = cocktail.dateModified.substring(0, 4);
            if (!yearsData[year]) {
                yearsData[year] = 1;
            } else {
                yearsData[year]++;
            }
        }

        const ingredients = [
            cocktail.strIngredient1,
            cocktail.strIngredient2,
            cocktail.strIngredient3,
            cocktail.strIngredient4,
            cocktail.strIngredient5,
            cocktail.strIngredient6,
            cocktail.strIngredient7,
            cocktail.strIngredient8,
            cocktail.strIngredient9,
            cocktail.strIngredient10,
            cocktail.strIngredient11,
            cocktail.strIngredient12,
            cocktail.strIngredient13,
            cocktail.strIngredient14,
            cocktail.strIngredient15,
        ];

        ingredients.forEach(ingredient => {
            if (alcoholData.hasOwnProperty(ingredient) && ingredient !== '') {
                alcoholData[ingredient]++;
            }
        });
    });


    // Línea
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: Object.keys(yearsData),
            datasets: [{
                label: 'Número de Cócteles',
                data: Object.values(yearsData),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Año',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Número de Cócteles',
                    },
                },
            },
        },
    });

    // Pie 
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(alcoholData),
            datasets: [{
                data: Object.values(alcoholData),
                backgroundColor: [
                    'rgba(9, 76, 246, 1)',
                    'rgba(9, 229, 246, 1)',
                    'rgba(246, 146, 9, 1)',
                    'rgba(203, 130, 51, 1)',
                    'rgba(234, 202, 55, 1)',
                ],
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                },
            },
        },
    });
});
