class Jugador {
    constructor(nombre, vidas, golpe) {
        this.nombre = nombre;
        this.vidas = vidas;
        this.golpe = golpe;
    }
}

class Guerrero extends Jugador {
    constructor(nombre) {
        super(nombre, 3, 1);
    }
}

class Mago extends Jugador {
    constructor(nombre) {
        super(nombre, 3, 2);
    }
}

class Equipo {
    constructor(nombre) {
        this.nombre = nombre;
        this.jugadores = [];
    }

    agregarJugador(jugador) {
        this.jugadores.push(jugador);
    }

    equipoPerdio() {
        return this.jugadores.every(jugador => jugador.vidas <= 0);
    }
}

class GuerraDeNieve {
    constructor(equipo1, equipo2) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.chart = null;

        this.inicializarGrafica();

        this.interval = setInterval(() => this.simularTurno(), this.obtenerIntervaloAleatorio());
    }

    obtenerIntervaloAleatorio() {
        return Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    }

    seleccionarJugadorAleatorio(equipo) {
        const jugadoresVivos = equipo.jugadores.filter(jugador => jugador.vidas > 0);
        if (jugadoresVivos.length === 0) {
            return null;
        }
        return jugadoresVivos[Math.floor(Math.random() * jugadoresVivos.length)];
    }

    simularTurno() {
        const jugadorAtacante1 = this.seleccionarJugadorAleatorio(this.equipo1);
        const jugadorAtacado2 = this.seleccionarJugadorAleatorio(this.equipo2);

        if (jugadorAtacante1 && jugadorAtacado2) {
            jugadorAtacado2.vidas -= jugadorAtacante1.golpe;
        }

        const jugadorAtacante2 = this.seleccionarJugadorAleatorio(this.equipo2);
        const jugadorAtacado1 = this.seleccionarJugadorAleatorio(this.equipo1);

        if (jugadorAtacante2 && jugadorAtacado1) {
            jugadorAtacado1.vidas -= jugadorAtacante2.golpe;
        }

        this.actualizarGrafica();

        if (this.equipo1.equipoPerdio() || this.equipo2.equipoPerdio()) {
            clearInterval(this.interval);
            this.mostrarMensajeEquipoGanador();
        }
    }

    inicializarGrafica() {
        const labels = this.equipo1.jugadores.map(jugador => jugador.nombre).concat(this.equipo2.jugadores.map(jugador => jugador.nombre));
        const data = this.equipo1.jugadores.map(jugador => jugador.vidas).concat(this.equipo2.jugadores.map(jugador => jugador.vidas));

        const ctx = document.getElementById('chart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vidas de Jugadores',
                    data: data,
                    backgroundColor: [
                        'rgba(240, 60, 20, 1)',
                        'rgba(240, 60, 20, 1)',
                        'rgba(250, 150, 9, 1)',
                        'rgba(250, 150, 9, 1)',
                    ],
                    borderColor: 'rgba(0, 0, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 3,
                        min: 0
                    }
                }
            }
        });

    }

    actualizarGrafica() {
        const data = this.equipo1.jugadores.map(jugador => jugador.vidas).concat(this.equipo2.jugadores.map(jugador => jugador.vidas));
        this.chart.data.datasets[0].data = data;
        this.chart.update();

    }

    mostrarMensajeEquipoGanador() {
        let mensaje = document.getElementById("mensaje");
        let nombreEquipoGanador = document.getElementById("nombreEquipoGanador");

        if (this.equipo1.equipoPerdio()) {
            nombreEquipoGanador.textContent = this.equipo2.nombre;
        } else {
            nombreEquipoGanador.textContent = this.equipo1.nombre;
        }

        mensaje.style.display = "block";

    }
}

//Jugadores Equipos
const guerrero1 = new Guerrero("Hagrid");
const mago1 = new Mago("Harry");
const guerrero2 = new Guerrero("Frodo");
const mago2 = new Mago("Gandalf");

const equipo1 = new Equipo("Equipo Hogwarts");
equipo1.agregarJugador(guerrero1);
equipo1.agregarJugador(mago1);

const equipo2 = new Equipo("Equipo de la Tierra Media");
equipo2.agregarJugador(guerrero2);
equipo2.agregarJugador(mago2);


const guerraDeNieve = new GuerraDeNieve(equipo1, equipo2);
