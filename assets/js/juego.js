/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

const miModulo = (() => {
    'use strict';
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencia del Html
    const btnNuevoJuego = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        divCartasJugadores = document.querySelectorAll('.divCartas');
    // divCartasJugador = document.querySelector('#jugador-cartas'),
    // divCartasComputadora = document.querySelector('#computadora-cartas');

    const ptjs = document.querySelectorAll('small');

    // Crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let especial of especiales) {
            for (let tipo of tipos) {
                deck.push(especial + tipo)
            }
        }

        return _.shuffle(deck);
    }

    const inicializarJuego = (numJugadores = 1) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i <= numJugadores; i++) {
            puntosJugadores.push(0);
            ptjs[i].innerText = 0;
        }
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    // Tomar una nueva carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    //console.log(valorCarta(pedirCarta()));

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        ptjs[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Ganó la computadora');
            } else if (puntosComputadora > 21) {
                alert('Ganó el Jugador');
            } else {
                alert('Ganó la computadora');
            }
        }, 2000);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0
        do {
            const carta = pedirCarta();
            //console.log(carta);
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            // <img src="assets/cartas/2C.png" class="carta"></img>
            crearCarta(carta, puntosJugadores.length - 1);
            // if (puntosMinimos > 21) {
            //     break;
            // }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }

    //Pedir carta
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        //console.log(carta);
        const puntosJugador = acumularPuntos(carta, 0);
        // <img src="assets/cartas/2C.png" class="carta"></img>
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append(imgCarta);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('PERDISTE');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21 Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();

