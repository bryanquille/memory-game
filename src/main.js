// Importamos módulos externos
import JSConfetti from 'js-confetti';

// Importamos las imagenes de los animales
import cow from '../public/assets/images/animals/vaca.svg'
import dog from '../public/assets/images/animals/perro.svg'
import cat from '../public/assets/images/animals/gato.svg'
import chicken from '../public/assets/images/animals/pollo.svg'
import bee from '../public/assets/images/animals/abeja.svg'
import sheep from '../public/assets/images/animals/oveja.svg'
import horse from '../public/assets/images/animals/caballo.svg'
import pig from '../public/assets/images/animals/cerdo.svg'

// Creamos las instancias de audio con el objeto Audio
const cowAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_d4bdc04b80.mp3');
const dogAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_2a0a51193f.mp3');
const catAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_639f3fb4fe.mp3');
const chickenAudio = new Audio('https://cdn.pixabay.com/audio/2023/10/14/audio_47c67083c2.mp3');
const beeAudio = new Audio('https://cdn.pixabay.com/audio/2024/06/27/audio_19c01bd847.mp3');
const sheepAudio = new Audio('https://cdn.pixabay.com/audio/2022/10/09/audio_78a133db61.mp3');
const horseAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_c0c9512369.mp3');
const pigAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_1d0ef3b7be.mp3');
const winAudio = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3');

// Importamos la hoja de estilos CSS
import './style.css'

// Ordenamon las tarjetas aleatoriamente
let cardNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
cardNumbers = cardNumbers.sort(() => {return Math.random() - 0.5})

// Creamos un objeto con el nombre de los animales y los paths(src)
const animals = {
  1: {
    name: 'cow',
    src: cow,
    audio: cowAudio,
  },
  2: {
    name: 'dog',
    src: dog,
    audio: dogAudio,
  },
  3: {
    name: 'cat',
    src: cat,
    audio: catAudio,
  },
  4: {
    name: 'chicken',
    src: chicken,
    audio: chickenAudio,
  },
  5: {
    name: 'bee',
    src: bee,
    audio: beeAudio,
  },
  6: {
    name: 'sheep',
    src: sheep,
    audio: sheepAudio,
  },
  7: {
    name: 'horse',
    src: horse,
    audio: horseAudio,
  },
  8: {
    name: 'pig',
    src: pig,
    audio: pigAudio,
  },
}

// Insertamos el los componentes HTML al div con id=app
document.querySelector('#app').innerHTML = `
  <h1 class='title--1'>Juego de la Granja</h1>
  <p class='instructions'>Presiona "Empezar" para jugar</p>
  <button type='button' id='start-btn' class='start--btn'>Empezar</button>
  <div class='statistics'>
    <p>Aciertos: <span id='points'></span></p>
    <p>Movimientos: <span id='tries'></span></p>
  </div>
  <table class='cards-container'>
    <tr>
      <td><button type='button' id='0' class='card'></button></td>
      <td><button type='button' id='1' class='card'></button></td>
      <td><button type='button' id='2' class='card'></button></td>
      <td><button type='button' id='3' class='card'></button></td>
    </tr>
    <tr>
      <td><button type='button' id='4' class='card'></button></td>
      <td><button type='button' id='5' class='card'></button></td>
      <td><button type='button' id='6' class='card'></button></td>
      <td><button type='button' id='7' class='card'></button></td>
    </tr>
    <tr>
      <td><button type='button' id='8' class='card'></button></td>
      <td><button type='button' id='9' class='card'></button></td>
      <td><button type='button' id='10' class='card'></button></td>
      <td><button type='button' id='11' class='card'></button></td>
    </tr>
    <tr>
      <td><button type='button' id='12' class='card'></button></td>
      <td><button type='button' id='13' class='card'></button></td>
      <td><button type='button' id='14' class='card'></button></td>
      <td><button type='button' id='15' class='card'></button></td>
    </tr>
  </table>
`

// Obtenemos los elementos del HTML
const startBtn = document.querySelector('#start-btn');
const pointsSpan = document.querySelector('#points');
const triesSpan = document.querySelector('#tries');
const cards = document.querySelectorAll('.card')

// Bloqueamos inicialmente todas las tarjetas
cards.forEach(card => {
  card.disabled = true;
})

// Configuramos valores iniciales
let openCardsCounter = 0
let card1 = null
let card2 = null
let firstResult = null
let secondResult = null
let points = 0
let tries = 0
const jsConfetti = new JSConfetti()

// Mostramos valores iniciales en pantalla
pointsSpan.textContent = points;
triesSpan.textContent = tries;

// Función para resetear juego
const resetGame = () => {
  openCardsCounter = 0
  card1 = null
  card2 = null
  firstResult = null
  secondResult = null
  points = 0
  tries = 0
  cardNumbers = cardNumbers.sort(() => {return Math.random() - 0.5})
  startBtn.textContent = 'Jugando';
  pointsSpan.textContent = points;
  triesSpan.textContent = tries;
  cards.forEach(card => {
    card.innerHTML = '';
    card.disabled = false;
  })
}

// Bloquear botón de Empezar
const lockBtn = () => {
  startBtn.disabled = true;
  startBtn.classList.add('disabled--btn');
  startBtn.textContent = 'Jugando';
}

// Desbloquear botón
const unlock = (text) => {
  startBtn.disabled = false;
  startBtn.classList.remove('disabled--btn');
  startBtn.textContent = text;
}

// Funcionalidad del botón "Empezar"
startBtn.addEventListener('click', () => {
  if (startBtn.textContent === 'Empezar') {
    // Desbloqueamos las tarjetas
    cards.forEach(card => {
      card.disabled = false;
    })
    
    // Bloquear el botón
    lockBtn();
  } else if (startBtn.textContent === 'Intentar nuevamente') {
    resetGame();
    lockBtn();
  }
});

// Destapamos las tarjetas
const openCard = (id) => {
  openCardsCounter++;
  if (openCardsCounter === 1) {
    // Mostrar primer animal
    card1 = document.getElementById(id);
    firstResult = animals[cardNumbers[id]].name;
    card1.innerHTML = `<img src='${animals[cardNumbers[id]].src}' alt='${firstResult} animal' class='animal--img' />`;

    // Deshabilitar primer botón
    card1.disabled = true;
  } else if (openCardsCounter === 2) {
      // Mostrar segundo animal
      card2 = document.getElementById(id);
      secondResult = animals[cardNumbers[id]].name;
      card2.innerHTML = `<img src='${animals[cardNumbers[id]].src}' alt='${secondResult} animal' class='animal--img' />`;

      // Deshabilitar segundo botón
      card2.disabled = true;

      // Incrementar movimientos
      tries++;
      triesSpan.textContent = tries;

      // Verificar si las tarjetas coiciden
      if (firstResult === secondResult) {
        // Reproducimos el sonido del animal
        animals[cardNumbers[id]].audio.play();

        // Incrementamos los aciertos
        points++;
        pointsSpan.textContent = points;

        // Reiniciamos el contador
        openCardsCounter = 0;
      } else {
        // Dejamos las tarjetas que se vean durante 1 segundo y despues las ocultamos
        setTimeout(() => {
          card1.innerHTML = '';
          card1.disabled = false;
          card1 = null;
          card2.innerHTML = '';
          card2.disabled = false;
          card2 = null;

          // Reiniciamos el contador
          openCardsCounter = 0;
        }, 1000);
      }
      // verificamos si se completo el juego
      if (points === 8) {
        // Esperamos un sengundo para lanzar confeti y reproducir el sonito de victoria
        setTimeout(()=>{
          jsConfetti.addConfetti();
          winAudio.play();
          unlock('Intentar nuevamente');
        }, 1000)
      }
  }
}

// Aplicamos la función para destapar las tarjetas
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    const cardId = e.target.id;
    openCard(cardId)
  })
})