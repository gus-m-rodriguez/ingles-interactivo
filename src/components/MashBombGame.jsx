import React, { useRef, useEffect, useState } from 'react';
import mashImgSrc from '../assets/mashgame.png';
import bombImgSrc from '../assets/mashgamebomb.png';
import bombGoldImgSrc from '../assets/mashgamebombgold.png';
import bombDarkImgSrc from '../assets/mashgamebombdark.png';

// Preguntas ejemplo (puedes expandirlas)
const preguntas = [
  {
    pregunta: 'What color is "red"?',
    opciones: ['Rojo', 'Verde', 'Azul', 'Amarillo'],
    correcta: 0,
  },
  {
    pregunta: 'How do you say "ocho" in English?',
    opciones: ['Eight', 'Nine', 'Ten', 'Seven'],
    correcta: 0,
  },
  {
    pregunta: 'What is "cat" in Spanish?',
    opciones: ['Perro', 'Gato', 'Casa', 'Libro'],
    correcta: 1,
  },
  // 🎨 COLOURS
  { pregunta: 'What color is "green"?', opciones: ['Verde', 'Rojo', 'Negro', 'Blanco'], correcta: 0 },
  { pregunta: 'How do you say "amarillo" in English?', opciones: ['Purple', 'Brown', 'Yellow', 'Grey'], correcta: 2 },
  { pregunta: '"Black" en español es…', opciones: ['Blanco', 'Negro', 'Naranja', 'Gris'], correcta: 1 },
  { pregunta: "What color is Hermione's Time-Turner ribbon? (in the movies)", opciones: ['Gold', 'Pink', 'Blue', 'Silver'], correcta: 0 },
  { pregunta: '"Rosa" in English is…', opciones: ['Pink', 'Red', 'Orange', 'White'], correcta: 0 },
  { pregunta: 'El uniforme de Aoi es de color…', opciones: ['Blue', 'Yellow', 'Green', 'Brown'], correcta: 0 },
  { pregunta: 'How do you say "gris" in English?', opciones: ['Grey', 'Green', 'Brown', 'Black'], correcta: 0 },
  { pregunta: '"White" en español significa…', opciones: ['Rojo', 'Blanco', 'Verde', 'Marrón'], correcta: 1 },
  { pregunta: '¿Cuál es "purple" en español?', opciones: ['Violeta', 'Rosa', 'Azul', 'Gris'], correcta: 0 },
  { pregunta: '"Orange" es el color de la fruta y en español se dice…', opciones: ['Naranja', 'Amarillo', 'Rojo', 'Azul'], correcta: 0 },

  // 🔢 NUMBERS
  { pregunta: 'How do you say "cinco" in English?', opciones: ['Four', 'Five', 'Six', 'Nine'], correcta: 1 },
  { pregunta: 'What is "twelve" in Spanish?', opciones: ['Doce', 'Diez', 'Once', 'Trece'], correcta: 0 },
  { pregunta: '"Dieciocho" en inglés es…', opciones: ['Eighteen', 'Eighty', 'Eight', 'Nineteen'], correcta: 0 },
  { pregunta: 'How do you write the number 30 in English?', opciones: ['Thirteen', 'Thirty', 'Three', 'Thirty-three'], correcta: 1 },
  { pregunta: '"Forty-two" en español es…', opciones: ['Cuarenta y dos', 'Cincuenta y dos', 'Veintidós', 'Cuarenta'], correcta: 0 },
  { pregunta: 'What is 100 in English?', opciones: ['Hundred', 'One hundred', 'One thousand', 'Ten'], correcta: 1 },
  { pregunta: '"Setenta y siete" en inglés es…', opciones: ['Seventy-seven', 'Seventeen', 'Seven-seven', 'Sixty-seven'], correcta: 0 },
  { pregunta: 'How do you say "once" in English?', opciones: ['Eleven', 'Twelve', 'One', 'Nine'], correcta: 0 },
  { pregunta: 'El número 25 en inglés es…', opciones: ['Twenty-five', 'Twenty-four', 'Fifty-two', 'Thirty-five'], correcta: 0 },
  { pregunta: '"Ninety" en español significa…', opciones: ['Noventa', 'Diecinueve', 'Nueve', 'Noveno'], correcta: 0 },

  // 📅 DAYS OF THE WEEK
  { pregunta: 'What day comes after Monday?', opciones: ['Sunday', 'Tuesday', 'Friday', 'Thursday'], correcta: 1 },
  { pregunta: '"Miércoles" en inglés es…', opciones: ['Wednesday', 'Monday', 'Thursday', 'Friday'], correcta: 0 },
  { pregunta: 'How do you say "sábado" in English?', opciones: ['Saturday', 'Sunday', 'Thursday', 'Tuesday'], correcta: 0 },
  { pregunta: 'The first day of the week in English calendars is…', opciones: ['Sunday', 'Monday', 'Friday', 'Saturday'], correcta: 0 },
  { pregunta: '"Thursday" en español significa…', opciones: ['Martes', 'Jueves', 'Viernes', 'Domingo'], correcta: 1 },
  { pregunta: 'What day is before Friday?', opciones: ['Wednesday', 'Thursday', 'Saturday', 'Sunday'], correcta: 1 },
  { pregunta: '"Domingo" en inglés es…', opciones: ['Sunday', 'Saturday', 'Tuesday', 'Monday'], correcta: 0 },
  { pregunta: 'How do you say "martes" in English?', opciones: ['Thursday', 'Tuesday', 'Wednesday', 'Friday'], correcta: 1 },
  { pregunta: '¿Cuál es el día "Friday" en español?', opciones: ['Domingo', 'Viernes', 'Miércoles', 'Lunes'], correcta: 1 },
  { pregunta: 'The weekend days are…', opciones: ['Saturday & Sunday', 'Monday & Tuesday', 'Thursday & Friday', 'Wednesday & Thursday'], correcta: 0 },

  // 🌎 COUNTRIES & CITIES
  { pregunta: 'Harry Potter is from…', opciones: ['England', 'Brazil', 'Japan', 'Argentina'], correcta: 0 },
  { pregunta: '"Francia" en inglés es…', opciones: ['France', 'Frank', 'French', 'Francy'], correcta: 0 },
  { pregunta: 'Tokyo is a city in…', opciones: ['Brazil', 'Japan', 'Italy', 'USA'], correcta: 1 },
  { pregunta: '"Argentina" en inglés se escribe…', opciones: ['Argentine', 'Argentina', 'Argentinian', 'Arjentina'], correcta: 1 },
  { pregunta: 'Which country has the city "Rio de Janeiro"?', opciones: ['Brazil', 'Peru', 'Spain', 'Italy'], correcta: 0 },
  { pregunta: '"España" en inglés es…', opciones: ['Spain', 'Spine', 'Spanish', 'Spane'], correcta: 0 },
  { pregunta: 'Beijing is in…', opciones: ['China', 'Canada', 'Chile', 'France'], correcta: 0 },
  { pregunta: '"Reino Unido" en inglés se dice…', opciones: ['United Kingdom', 'United States', 'United City', 'United Empire'], correcta: 0 },
  { pregunta: 'Paris es la capital de…', opciones: ['France', 'Italy', 'England', 'Germany'], correcta: 0 },
  { pregunta: 'The Statue of Liberty is in…', opciones: ['New York', 'London', 'Tokyo', 'Rome'], correcta: 0 },

  // 🎓 NATIONALITIES
  { pregunta: 'Someone from Brazil is…', opciones: ['Brazilian', 'Brazilish', 'Braziler', 'Brazilite'], correcta: 0 },
  { pregunta: '"Argentinian" en español es…', opciones: ['Argentino', 'Brasileño', 'Chileno', 'Peruano'], correcta: 0 },
  { pregunta: 'People from Japan are…', opciones: ['Japanese', 'Japanish', 'Japanite', 'Japonic'], correcta: 0 },
  { pregunta: '"French" es la nacionalidad de…', opciones: ['Francia', 'Perú', 'Italia', 'Brasil'], correcta: 0 },
  { pregunta: 'Someone from England is…', opciones: ['English', 'Englander', 'Englandish', 'Britany'], correcta: 0 },
  { pregunta: '"Italian" en español significa…', opciones: ['Italiano', 'Inglés', 'Frances', 'Alemán'], correcta: 0 },
  { pregunta: 'Mash es __________ porque vive en Easton (Reino Unido ficticio).', opciones: ['English', 'Japanese', 'Brazilian', 'French'], correcta: 0 },
  { pregunta: 'A person from Peru is…', opciones: ['Peruvian', 'Peruan', 'Perunian', 'Perulian'], correcta: 0 },
  { pregunta: '"German" es nacionalidad de…', opciones: ['Alemania', 'Grecia', 'España', 'Egipto'], correcta: 0 },
  { pregunta: 'People from China are…', opciones: ['Chinese', 'Chinish', 'Chinist', 'Chinian'], correcta: 0 },

  // 👋 GREETINGS & INTRODUCTIONS
  { pregunta: 'How do you say "Hola" in English?', opciones: ['Hello', 'Bye', 'Thanks', 'Good'], correcta: 0 },
  { pregunta: '"Nice to meet you" significa…', opciones: ['Encantado de conocerte', 'Buenos días', 'Hasta luego', 'Por favor'], correcta: 0 },
  { pregunta: 'Complete: "_ _ _ _ _ your name?"', opciones: ['What\'s', 'Where', 'Who', 'How'], correcta: 0 },
  { pregunta: 'La respuesta correcta a "How are you?" es…', opciones: ['I\'m fine, thanks', 'Blue', 'England', 'Sunday'], correcta: 0 },
  { pregunta: 'Mash dice: "Hi! ____ Mash."', opciones: ['I\'m', 'Is', 'Are', 'Be'], correcta: 0 },
  { pregunta: '"Goodbye" en español es…', opciones: ['Adiós', 'Hola', 'Gracias', 'Perdón'], correcta: 0 },
  { pregunta: 'Complete: "Nice ____ meet you."', opciones: ['to', 'for', 'at', 'in'], correcta: 0 },
  { pregunta: 'What is the question for the answer "I\'m Gustavo"?', opciones: ['What\'s your name?', 'Where are you from?', 'How old are you?', 'What day is it?'], correcta: 0 },
  { pregunta: '"Good morning" se usa para saludar en…', opciones: ['la mañana', 'la noche', 'la tarde', 'todo el día'], correcta: 0 },
  { pregunta: 'La forma corta de "I am" es…', opciones: ['I\'m', 'I\'m not', 'Im', 'Iam'], correcta: 0 },

  // 🏠 PERSONAL INFORMATION
  { pregunta: '"I\'m 10 years old" significa…', opciones: ['Tengo 10 años', 'Tengo 10 días', 'Soy de 10', 'Vivo en 10'], correcta: 0 },
  { pregunta: 'Complete: "My birthday is ___ February 27th."', opciones: ['on', 'in', 'at', 'of'], correcta: 0 },
  { pregunta: '"I live in Kamome City" en español es…', opciones: ['Vivo en Kamome City', 'Soy de Kamome City', 'Kamome City vive en mí', 'Estoy viviendo Kamome'], correcta: 0 },
  { pregunta: 'Sofía dice: "I like ______."', opciones: ['pizza', 'Monday', 'yellow', 'England'], correcta: 0 },
  { pregunta: '¿Cómo se dice "Escuela" en inglés?', opciones: ['School', 'House', 'Class', 'Book'], correcta: 0 },
  { pregunta: 'Complete: "He is ____ years old."', opciones: ['fifteen', 'fifteenth', 'fifthteen', 'fiveteen'], correcta: 0 },
  { pregunta: '"My favourite subject is English" significa…', opciones: ['Mi materia favorita es inglés', 'Mi materia favorita es español', 'No me gusta inglés', 'Mi profesor favorito es inglés'], correcta: 0 },
  { pregunta: 'Choose the correct question: – "I\'m from Japan."', opciones: ['Where are you from?', 'What is your name?', 'How old are you?', 'What color is it?'], correcta: 0 },
  { pregunta: '"Vivo en Buenos Aires" en inglés es…', opciones: ['I live in Buenos Aires', 'I am from Buenos Aires', 'I name Buenos Aires', 'I lives Buenos Aires'], correcta: 0 },
  { pregunta: 'Complete: "She ____ 11 years old."', opciones: ['is', 'are', 'am', 'be'], correcta: 0 },

  // 💬 TO BE & PRONOUNS
  { pregunta: 'Pronoun for "Agustina y yo" is…', opciones: ['We', 'They', 'She', 'He'], correcta: 0 },
  { pregunta: '"He is" en forma corta es…', opciones: ['He\'s', 'Hes', 'H\'s', 'He is'], correcta: 0 },
  { pregunta: 'Choose the correct form: "They ___ friends."', opciones: ['are', 'is', 'am', 'be'], correcta: 0 },
  { pregunta: '"Yo" en inglés es…', opciones: ['I', 'You', 'He', 'She'], correcta: 0 },
  { pregunta: 'Negative form: "She is not" →', opciones: ['She isn\'t', 'She aren\'t', 'She amn\'t', 'She not'], correcta: 0 },
  { pregunta: '"It" se usa para…', opciones: ['Objetos o animales', 'Masculino plural', 'Femenino plural', 'Personas en plural'], correcta: 0 },
  { pregunta: 'Complete: "We ___ from France."', opciones: ['are', 'is', 'am', 'be'], correcta: 0 },
  { pregunta: 'Choose the pronoun for "Harry y Ron."', opciones: ['They', 'We', 'He', 'She'], correcta: 0 },
  { pregunta: 'Form the question: "_ _ _ Mash 15?"', opciones: ['Is', 'Are', 'Am', 'Be'], correcta: 0 },
  { pregunta: 'Short answer: "Are you ready?" – "___, I am."', opciones: ['Yes', 'No', 'Good', 'OK'], correcta: 0 },

  // 🔄 MIXED REVIEW & MICRO-STORY
  { pregunta: 'Fill the blank: "_ _ _ _ _ to meet you, I\'m Hanako."', opciones: ['Nice', 'Blue', 'France', 'Nine'], correcta: 0 },
  { pregunta: '"Blue and ______ are primary colours."', opciones: ['Red', 'Grey', 'Brown', 'Pink'], correcta: 0 },
  { pregunta: 'Which day is the fifth of the week?', opciones: ['Thursday', 'Tuesday', 'Sunday', 'Saturday'], correcta: 0 },
  { pregunta: 'Number "60" in English is…', opciones: ['Sixty', 'Sixteen', 'Six', 'Seventy'], correcta: 0 },
  { pregunta: 'Nationality of someone from Italy:', opciones: ['Italian', 'Italish', 'Italic', 'Italen'], correcta: 0 },
  { pregunta: 'Greeting for the evening:', opciones: ['Good evening', 'Good morning', 'Hello', 'See you'], correcta: 0 },
  { pregunta: 'Colour of Gryffindor scarf (one of them):', opciones: ['Red', 'Green', 'Blue', 'Black'], correcta: 0 },
  { pregunta: '"¿Cuántos años tienes?" en inglés es…', opciones: ['How old are you?', 'Where are you?', 'What are you?', 'Who are you?'], correcta: 0 },
  { pregunta: 'Capital city of France is…', opciones: ['Paris', 'Rome', 'London', 'Berlin'], correcta: 0 },
  { pregunta: 'Complete: "Hanako ____ from Japan."', opciones: ['is', 'are', 'am', 'be'], correcta: 0 }
];

const MASH_WIDTH = 80;
const MASH_HEIGHT = 80;
const BOMB_RADIUS = 28;
const GAME_WIDTH = 480;
const GAME_HEIGHT = 520;
const BOMB_IMG = 'https://cdn.pixabay.com/photo/2013/07/13/12/46/cupcake-146749_1280.png'; // Cupcake
const MASH_IMG = 'https://static.wikia.nocookie.net/mashle/images/2/2e/Mash_Anime.png'; // Imagen de Mash (puedes cambiarla)

function getRandomX() {
  return Math.random() * (GAME_WIDTH - BOMB_RADIUS * 2) + BOMB_RADIUS;
}

function playCatchSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = 880;
  g.gain.value = 0.1;
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.12);
  setTimeout(() => ctx.close(), 200);
}

function playGoldenSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = 1320; // Nota más alta para bomba dorada
  g.gain.value = 0.15;
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.2);
  setTimeout(() => ctx.close(), 200);
}

function playPointsSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'square';
  o.frequency.value = 660; // Nota media para puntos
  g.gain.value = 0.12;
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.15);
  setTimeout(() => ctx.close(), 200);
}

function playBurnedSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sawtooth';
  o.frequency.value = 220; // Nota más baja para bomba quemada
  g.gain.value = 0.12;
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + 0.3);
  setTimeout(() => ctx.close(), 200);
}

// Progresión de puntaje objetivo: nivel 1=50, nivel 2=150, nivel 3=300, ..., nivel 10=2750, nivel 20=10500
function objetivoPorNivel(nivel) {
  // Fórmula cuadrática más baja
  return Math.round(50 * nivel * nivel / 2);
}

// Límite de bombas caídas por nivel: nivel 1=5, nivel 2=6, nivel 3=7, ..., nivel 10=14, nivel 20=24
function limiteBombasCaidasPorNivel(nivel) {
  return Math.min(5 + (nivel - 1) * 1, 25); // Nivel 1=5, progresión de +1 por nivel, máximo 25
}

// Función para generar la representación visual de las vidas
function generarVidasVisuales(vidasActuales, vidasTotales = 4) {
  const corazonesLlenos = '❤️'.repeat(vidasActuales);
  const corazonesVacios = '🖤'.repeat(vidasTotales - vidasActuales);
  return corazonesLlenos + corazonesVacios;
}

export default function MashBombGame() {
  const canvasRef = useRef();
  const [mashX, setMashX] = useState(GAME_WIDTH / 2 - MASH_WIDTH / 2);
  const [bombs, setBombs] = useState([]);
  const [score, setScore] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [pregunta, setPregunta] = useState(null);
  const recordRef = useRef(Number(localStorage.getItem('mash_record') || 0));
  const [record, setRecord] = useState(recordRef.current);
  const [gameOver, setGameOver] = useState(false);
  const [objetivo, setObjetivo] = useState(objetivoPorNivel(1));
  const [velocidad, setVelocidad] = useState(2);
  const [mashImg, setMashImg] = useState(null);
  const [bombImg, setBombImg] = useState(null);
  const [bombGoldImg, setBombGoldImg] = useState(null);
  const [bombDarkImg, setBombDarkImg] = useState(null);
  const [iniciado, setIniciado] = useState(false);
  const [loading, setLoading] = useState(true);
  const scoreRef = useRef(0);
  const preguntaMostradaRef = useRef(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiShown, setConfettiShown] = useState(false);
  const [spawnDelay, setSpawnDelay] = useState(500);
  const [pausado, setPausado] = useState(false);
  const [hayGuardado, setHayGuardado] = useState(false);
  const [avanceGuardado, setAvanceGuardado] = useState(null);
  const [bombasCaidas, setBombasCaidas] = useState(0);
  const [razonDerrota, setRazonDerrota] = useState('');
  const [vidas, setVidas] = useState(4);
  const [mostrarRespuestaCorrecta, setMostrarRespuestaCorrecta] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
  const [umbralesVida, setUmbralesVida] = useState([]);

  // Cargar imágenes locales
  useEffect(() => {
    let loaded = 0;
    const img1 = new window.Image();
    img1.src = mashImgSrc;
    img1.onload = () => { setMashImg(img1); loaded++; if (loaded === 4) setLoading(false); };
    const img2 = new window.Image();
    img2.src = bombImgSrc;
    img2.onload = () => { setBombImg(img2); loaded++; if (loaded === 4) setLoading(false); };
    const img3 = new window.Image();
    img3.src = bombGoldImgSrc;
    img3.onload = () => { setBombGoldImg(img3); loaded++; if (loaded === 4) setLoading(false); };
    const img4 = new window.Image();
    img4.src = bombDarkImgSrc;
    img4.onload = () => { setBombDarkImg(img4); loaded++; if (loaded === 4) setLoading(false); };
  }, []);

  // Reiniciar refs al iniciar/reiniciar nivel
  useEffect(() => {
    if (!hayGuardado || !avanceGuardado) {
      scoreRef.current = 0;
      setScore(0);
    }
    preguntaMostradaRef.current = false;
  }, [iniciado]); // Solo al reiniciar el juego, no al cambiar de nivel

  // Ajustar velocidad y frecuencia de aparición de bombas al pasar de nivel
  useEffect(() => {
    setVelocidad(2 + nivel * 0.8); // velocidad crece más rápido
    setObjetivo(objetivoPorNivel(nivel));
    setSpawnDelay(Math.max(500 - nivel * 18, 120)); // menor delay a mayor nivel
    
    // Calcular umbrales de vida: solo 100% del límite
    const limite = limiteBombasCaidasPorNivel(nivel);
    setUmbralesVida([limite]); // Solo el 100% del límite
  }, [nivel]);

  // Spawner de bombas usa spawnDelay y respeta pausa
  useEffect(() => {
    if (!iniciado || pregunta || gameOver || pausado) return;
    let spawner;
    let bombasCreadas = bombs.length;
    function spawnBomb() {
      if (bombasCreadas < objetivo) {
        // Determinar si spawnear una bomba especial (15% de probabilidad)
        const esBombaEspecial = Math.random() < 0.15;
        let tipoBomba = 'normal';
        
        if (esBombaEspecial) {
          // Calcular probabilidad de bomba quemada basada en el nivel
          const probabilidadQuemada = Math.min(0.4 + (nivel - 1) * 0.05, 0.8); // 40% inicial, +5% por nivel, máximo 80%
          tipoBomba = Math.random() < probabilidadQuemada ? 'quemada' : 'dorada';
        }
        
        setBombs(prev => [
          ...prev,
          { 
            x: getRandomX(), 
            y: -Math.random() * 100, 
            atrapada: false,
            tipo: tipoBomba
          }
        ]);
        bombasCreadas++;
        spawner = setTimeout(spawnBomb, spawnDelay);
      }
    }
    if (bombs.length < objetivo) {
      spawner = setTimeout(spawnBomb, spawnDelay);
    }
    return () => clearTimeout(spawner);
  }, [iniciado, pregunta, gameOver, bombs.length, objetivo, nivel, spawnDelay, pausado]);

  // Movimiento Mash con mouse/touch
  useEffect(() => {
    if (!iniciado) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (e) => {
      let x;
      if (e.touches) {
        x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
      } else {
        x = e.clientX - canvas.getBoundingClientRect().left;
      }
      setMashX(Math.max(0, Math.min(x - MASH_WIDTH / 2, GAME_WIDTH - MASH_WIDTH)));
    };
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('touchmove', handleMove);
    return () => {
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
    };
  }, [iniciado]);

  // Lógica principal del juego y colisiones
  useEffect(() => {
    if (pausado) return;
    if (pregunta || gameOver || !mashImg || !bombImg || !bombGoldImg || !bombDarkImg) return;
    let anim;
    function loop() {
      setBombs((prev) => {
        let atrapadasEnEsteFrame = 0;
        let caidasEnEsteFrame = 0;
        const nuevos = [];
        for (const b of prev) {
          const nuevaY = b.y + velocidad;
          const atrapada = !b.atrapada &&
            nuevaY + BOMB_RADIUS > GAME_HEIGHT - MASH_HEIGHT - 10 &&
            b.x > mashX - BOMB_RADIUS &&
            b.x < mashX + MASH_WIDTH + BOMB_RADIUS;
          
          if (atrapada) {
            // Manejar bombas especiales
            if (b.tipo === 'dorada') {
              if (vidas >= 4) {
                const puntosPremio = Math.floor(objetivo * 0.1);
                scoreRef.current += puntosPremio;
                setScore(scoreRef.current);
              } else {
                setVidas(prev => Math.min(prev + 1, 4));
              }
            } else if (b.tipo === 'quemada') {
              const nuevasVidas = vidas - 1;
              setVidas(nuevasVidas);
              if (nuevasVidas <= 0) {
                setRazonDerrota('Sin vidas restantes');
                setGameOver(true);
              }
            } else {
              atrapadasEnEsteFrame++;
            }
            continue;
          }
          if (!b.atrapada && nuevaY > GAME_HEIGHT + 40) {
            if (b.tipo === 'normal') {
              caidasEnEsteFrame++;
            }
            continue;
          }
          nuevos.push({ ...b, y: nuevaY });
        }
        if (atrapadasEnEsteFrame > 0) {
          scoreRef.current += atrapadasEnEsteFrame;
          setScore(scoreRef.current);
          // ACTUALIZAR RECORD EN TIEMPO REAL
          if (scoreRef.current > recordRef.current) {
            recordRef.current = scoreRef.current;
            setRecord(scoreRef.current);
            localStorage.setItem('mash_record', scoreRef.current);
          }
        }
        if (caidasEnEsteFrame > 0) {
          setBombasCaidas(prev => {
            const nuevasCaidas = prev + caidasEnEsteFrame;
            
            // Verificar si se alcanzó el umbral de vida (100% del límite)
            const umbral = umbralesVida[0]; // Solo hay un umbral (100%)
            if (umbral && nuevasCaidas >= umbral) {
              // Calcular cuántas veces se ha alcanzado el umbral
              const vecesQueSeAlcanzo = Math.floor(nuevasCaidas / umbral);
              const vecesAnterior = Math.floor(prev / umbral);
              
              if (vecesQueSeAlcanzo > vecesAnterior) {
                // Se alcanzó el umbral una vez más
                const nuevasVidas = vidas - 1;
                setVidas(nuevasVidas);
                
                if (nuevasVidas <= 0) {
                  setRazonDerrota('Sin vidas restantes');
                  setGameOver(true);
                }
              }
            }
            
            return nuevasCaidas;
          });
        }
        if (
          !preguntaMostradaRef.current &&
          scoreRef.current >= objetivo &&
          objetivo > 0
        ) {
          preguntaMostradaRef.current = true;
          setTimeout(() => {
            setPregunta(preguntas[Math.floor(Math.random() * preguntas.length)]);
          }, 0);
        }
        return nuevos;
      });
      anim = requestAnimationFrame(loop);
    }
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [pregunta, gameOver, velocidad, mashImg, bombImg, bombGoldImg, bombDarkImg, mashX, objetivo, pausado, umbralesVida, vidas]);

  // Al pasar de nivel, resetear preguntaMostradaRef
  useEffect(() => {
    preguntaMostradaRef.current = false;
  }, [nivel]);

  // Game over y récord
  useEffect(() => {
    // Guardar récord en localStorage si el score lo supera
    const maxRecord = getMaxRecord();
    if (maxRecord > Number(localStorage.getItem('mash_record') || 0)) {
      localStorage.setItem('mash_record', maxRecord);
      setRecord(maxRecord);
    }
    // Confetti visual
    if (score > record && record > 0 && !confettiShown) {
      setShowConfetti(true);
      setConfettiShown(true);
      setTimeout(() => setShowConfetti(false), 1800);
    } else if (score > record && record === 0) {
      setConfettiShown(true);
    }
  }, [score, record, confettiShown]);

  // Resetear confettiShown al reiniciar el juego
  useEffect(() => {
    if (!iniciado) setConfettiShown(false);
  }, [iniciado]);

  // Cargar avance al iniciar (pero no iniciar el juego)
  useEffect(() => {
    const save = localStorage.getItem('mash_save');
    if (save) {
      const data = JSON.parse(save);
      setHayGuardado(true);
      setAvanceGuardado(data);
    }
  }, []);

  // Al iniciar juego, cargar avance si existe
  const handleIniciar = () => {
    if (hayGuardado && avanceGuardado) {
      setNivel(avanceGuardado.nivel);
      setScore(avanceGuardado.score);
      scoreRef.current = avanceGuardado.score;
      setObjetivo(avanceGuardado.objetivo);
      setBombasCaidas(avanceGuardado.bombasCaidas || 0);
      setVidas(avanceGuardado.vidas || 4);
      setUmbralesVida(avanceGuardado.umbralesVida || []);
    } else {
      setNivel(1);
      setScore(0);
      scoreRef.current = 0;
      setObjetivo(objetivoPorNivel(1));
      setBombasCaidas(0);
      setVidas(4);
    }
    setIniciado(true);
    setGameOver(false);
    setPregunta(null);
    setBombs([]);
    setMostrarRespuestaCorrecta(false);
    setRespuestaCorrecta('');
    preguntaMostradaRef.current = false;
  };

  // Guardar avance
  const handleGuardar = () => {
    localStorage.setItem('mash_save', JSON.stringify({
      nivel,
      score: scoreRef.current,
      objetivo,
      bombasCaidas,
      vidas,
      umbralesVida,
    }));
  };

  // Reiniciar partida
  const handleReiniciar = () => {
    localStorage.removeItem('mash_save');
    setNivel(1);
    setScore(0);
    scoreRef.current = 0;
    setObjetivo(objetivoPorNivel(1));
    setBombs([]);
    setGameOver(false);
    setPregunta(null);
    setPausado(false);
    setBombasCaidas(0);
    setVidas(4);
    setRazonDerrota('');
    setMostrarRespuestaCorrecta(false);
    setRespuestaCorrecta('');
    preguntaMostradaRef.current = false;
    setUmbralesVida([]);
  };

  // Siguiente nivel
  const handleRespuesta = (idx) => {
    if (idx === pregunta.correcta) {
      setNivel((n) => n + 1);
      setPregunta(null);
      preguntaMostradaRef.current = false;
      setBombasCaidas(0); // Resetear bombas caídas al pasar de nivel
      setMostrarRespuestaCorrecta(false);
      setRespuestaCorrecta('');
    } else {
      setRespuestaCorrecta(pregunta.opciones[pregunta.correcta]);
      setMostrarRespuestaCorrecta(true);
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      
      if (nuevasVidas <= 0) {
        setPregunta(null);
        setRazonDerrota('Sin vidas restantes');
        setGameOver(true);
        preguntaMostradaRef.current = false;
        setMostrarRespuestaCorrecta(false);
        setRespuestaCorrecta('');
      } else {
        // Continuar el juego con menos vidas
        setPregunta(null);
        preguntaMostradaRef.current = false;
        // No mostrar pregunta hasta que se alcance el objetivo nuevamente
      }
    }
  };

  // Dibujo en canvas
  useEffect(() => {
    if (!iniciado || !mashImg || !bombImg || !bombGoldImg || !bombDarkImg) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = '#fdf6f0';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (bombImg) {
      bombs.forEach((b) => {
        if (!b.atrapada) {
          if (b.tipo === 'dorada' && bombGoldImg) {
            // Usar imagen específica de bomba dorada
            ctx.drawImage(bombGoldImg, b.x - BOMB_RADIUS, b.y - BOMB_RADIUS, BOMB_RADIUS * 2, BOMB_RADIUS * 2);
          } else if (b.tipo === 'quemada' && bombDarkImg) {
            // Usar imagen específica de bomba quemada
            ctx.drawImage(bombDarkImg, b.x - BOMB_RADIUS, b.y - BOMB_RADIUS, BOMB_RADIUS * 2, BOMB_RADIUS * 2);
          } else {
            // Bomba normal
            ctx.drawImage(bombImg, b.x - BOMB_RADIUS, b.y - BOMB_RADIUS, BOMB_RADIUS * 2, BOMB_RADIUS * 2);
          }
        }
      });
    }
    if (mashImg) {
      ctx.drawImage(mashImg, mashX, GAME_HEIGHT - MASH_HEIGHT - 10, MASH_WIDTH, MASH_HEIGHT);
    }
    // Nivel
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#d946ef';
    ctx.fillText(`Nivel: ${nivel}`, 20, 32);
    // Récord
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#f59e42';
    ctx.fillText(`Récord: ${getMaxRecord()}`, 320, 32);
    // Puntaje / objetivo
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#0ea5e9';
    ctx.fillText(`Puntaje: ${score} / ${objetivo}`, 320, 58);
    // Vidas
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = vidas <= 1 ? '#ef4444' : '#22c55e';
    ctx.fillText(generarVidasVisuales(vidas), 20, 85);
    
    // Leyenda de bombas especiales
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('🌟 Dorada = +1 vida o +puntos', 20, 110);
    ctx.fillStyle = '#dc2626';
    ctx.fillText('🔥 Quemada = -1 vida', 20, 125);
  }, [bombs, mashX, mashImg, bombImg, bombGoldImg, bombDarkImg, nivel, score, record, objetivo, iniciado, vidas]);

  // Helper para obtener el récord real
  function getMaxRecord() {
    return Math.max(
      score,
      Number(localStorage.getItem('mash_record') || 0),
      record
    );
  }

  if (loading) {
    return <div className="text-pink-600 font-bold text-xl">Cargando imágenes...</div>;
  }

  if (!iniciado) {
    return (
      <div className="flex flex-col items-center gap-4">
        <button onClick={handleIniciar} className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold text-xl shadow hover:bg-pink-700">Iniciar juego</button>
        <div className="text-lg text-pink-700 font-bold">Nivel: {hayGuardado && avanceGuardado ? avanceGuardado.nivel : 1} &nbsp; | &nbsp; Récord: {getMaxRecord()}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative">
      {showConfetti && <ConfettiEffect />}
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="rounded-xl shadow-lg border-4 border-pink-200 bg-white touch-none"
        style={{ maxWidth: '100%', background: '#fdf6f0' }}
      />
      {pausado && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[260px]">
            <div className="mb-4 text-pink-700 font-bold text-lg">Juego en pausa</div>
            <button onClick={handleGuardar} className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition">Guardar avance</button>
            <button onClick={() => setPausado(false)} className="px-4 py-2 bg-pink-600 text-white rounded-lg font-bold shadow hover:bg-pink-700 transition">Reanudar</button>
          </div>
        </div>
      )}
      <div className="flex gap-4 mt-6">
        <button onClick={() => setPausado(true)} className="px-4 py-2 bg-pink-600 text-white rounded-lg font-bold shadow hover:bg-pink-700 transition">Pausar</button>
        <button onClick={handleReiniciar} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition">Reiniciar partida</button>
      </div>
      {pregunta && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[260px]">
            <div className="mb-2 text-pink-700 font-bold text-lg">{pregunta.pregunta}</div>
            <div className="flex flex-col gap-2 mb-2">
              {pregunta.opciones.map((op, idx) => (
                <button
                  key={op}
                  onClick={() => handleRespuesta(idx)}
                  className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-600 font-bold"
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {mostrarRespuestaCorrecta && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[260px]">
            <div className="mb-2 text-red-600 font-bold text-lg">❌ Respuesta incorrecta</div>
            <div className="mb-2 text-green-600 font-bold text-lg">✅ Respuesta correcta: {respuestaCorrecta}</div>
            <div className="mb-4 text-blue-600 font-bold">Vidas restantes: {generarVidasVisuales(vidas)}</div>
            <button 
              onClick={() => {
                setMostrarRespuestaCorrecta(false);
                setRespuestaCorrecta('');
              }} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-bold"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center min-w-[260px]">
            <div className="mb-2 text-pink-700 font-bold text-lg">¡Juego terminado!</div>
            <div className="mb-2 text-red-600 font-bold text-sm">{razonDerrota}</div>
            <div className="mb-2 text-blue-700 font-bold">Puntaje: {score}</div>
            <div className="mb-2 text-yellow-600 font-bold">Récord: {getMaxRecord()}</div>
            <div className="mb-2 text-purple-600 font-bold">Vidas restantes: {generarVidasVisuales(vidas)}</div>
            <button onClick={handleReiniciar} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-bold">Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente ConfettiEffect simple
function ConfettiEffect() {
  // Generar confetis aleatorios
  const confetis = Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 90 + '%',
    delay: Math.random() * 0.8,
    color: ['#f472b6', '#facc15', '#38bdf8', '#a3e635', '#f59e42'][i % 5],
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {confetis.map((c, i) => (
        <div
          key={i}
          style={{
            left: c.left,
            animationDelay: `${c.delay}s`,
            background: c.color,
          }}
          className="w-3 h-3 rounded-full absolute top-0 animate-confetti"
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(420px) scale(1.2); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 1.5s cubic-bezier(.4,1.4,.7,1) forwards;
        }
      `}</style>
    </div>
  );
} 