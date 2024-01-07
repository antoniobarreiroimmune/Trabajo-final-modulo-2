let myChart;

function searchPokemon() {
    const inputElement = document.getElementById('searchInput');
    const pokemonNumber = inputElement.value;


    document.getElementById('errorMessage').innerText = '';
    document.getElementById('pokemonName').innerText = '';
    document.getElementById('pokemonImage').src = '';


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado. Asegúrate de introducir un número válido.');
            }
            return response.json();
        })
        .then(data => {

            document.getElementById('pokemonName').innerText = data.name;
            document.getElementById('pokemonImage').src = data.sprites.front_default;


            updateOrCreateChart(data.stats);
        })
        .catch(error => {

            document.getElementById('errorMessage').innerText = error.message;
        });
}

function getRandomPokemon() {
    const randomPokemonNumber = Math.floor(Math.random() * 898) + 1;
    document.getElementById('searchInput').value = randomPokemonNumber;
    searchPokemon();
}

function updateOrCreateChart(stats) {
    const ctx = document.getElementById('statsChart').getContext('2d');


    if (myChart) {
        myChart.data.datasets[0].data = stats.map(stat => stat.base_stat);
        myChart.update();
    } else {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'],
                datasets: [{
                    label: 'Stats',
                    data: stats.map(stat => stat.base_stat),
                    backgroundColor: [
                        'rgba(246, 9, 9, 1)',
                        'rgba(9, 36, 246, 1)',
                        'rgba(43, 113, 7, 1)',
                        'rgba(237, 230, 20, 1)',
                        'rgba(20, 230, 237, 1)',
                        'rgba(221, 20, 237, 1)'
                    ],
                    borderColor: [
                        'rgba(246, 9, 9,1)',
                        'rgba(9, 36, 246, 1)',
                        'rgba(43, 113, 7, 1)',
                        'rgba(237, 230, 20, 1)',
                        'rgba(20, 230, 237, 1)',
                        'rgba(221, 20, 237, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}



