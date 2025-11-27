import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Howl } from "howler";
//import { useRankingStore } from "./ranking";

export const useGameStore = defineStore("game", () => {
  // Estado del juego
  const playerName = ref("");
  const currentScore = ref(0);
  const currentQuestionIndex = ref(0);
  const gameStatus = ref("idle"); // idle, playing, finished
  const questions = ref([]);
  const selectedQuestions = ref([]);
  const userAnswers = ref([]);
  const audioInstances = ref({});
  const startTime = ref(null);
  const totalListenTime = ref(0);

  // Preguntas del concurso
  const allQuestions = ref([
    {
      id: 1,
      song: "/audio/crazy-in-love.mp3",
      question: '¿Qué artista femenina canta "Crazy in Love"?',
      answers: [
        { id: 1, text: "Beyoncé", correct: true },
        { id: 2, text: "Rihanna", correct: false },
        { id: 3, text: "Alicia Keys", correct: false },
        { id: 4, text: "Jennifer Lopez", correct: false },
      ],
      artist: "Beyoncé",
      title: "Crazy in Love",
    },
    {
      id: 2,
      song: "/audio/leave-the-door-open.mp3",
      question: "¿Cómo se llama el dúo forman Bruno Mars y Anderson .Paak?",
      answers: [
        { id: 1, text: "Earth, Wind & Fire", correct: false },
        { id: 2, text: "The Weeknd", correct: false },
        { id: 3, text: "Silk Sonic", correct: true },
        { id: 4, text: "Daft Punk", correct: false },
      ],
      artist: "Silk Sonic",
      title: "Leave the Door Open",
    },
    {
      id: 3,
      song: "/audio/remember-the-time.mp3",
      question: '¿De qué artista es la canción "Remember the Time"?',
      answers: [
        { id: 1, text: "Prince", correct: false },
        { id: 2, text: "Michael Jackson", correct: true },
        { id: 3, text: "Stevie Wonder", correct: false },
        { id: 4, text: "Usher", correct: false },
      ],
      artist: "Michael Jackson",
      title: "Remember the Time",
    },
    {
      id: 4,
      song: "/audio/sweet-dreams.mp3",
      question: '¿Qué dúo británico canta "Sweet Dreams"?',
      answers: [
        { id: 1, text: "The Police", correct: false },
        { id: 2, text: "Wham!", correct: false },
        { id: 3, text: "Pet Shop Boys", correct: false },
        { id: 4, text: "Eurythmics", correct: true },
      ],
      artist: "Eurythmics",
      title: "Sweet Dreams (Are Made of This)",
    },
    {
      id: 5,
      song: "/audio/virtual-diva.mp3",
      question: '¿Quién canta "Virtual Diva"?',
      answers: [
        { id: 1, text: "Sean Paul", correct: false },
        { id: 2, text: "Ricky Martín", correct: false },
        { id: 3, text: "Daddy Yankee", correct: false },
        { id: 4, text: "Don Omar", correct: true },
      ],
      artist: "Don Omar",
      title: "Virtual Diva",
    },
    {
      id: 6,
      song: "/audio/la-flaca.mp3",
      question: '¿Qué grupo español canta "La Flaca"?',
      answers: [
        { id: 1, text: "Jarabe de Palo", correct: true },
        { id: 2, text: "Café Tacvba", correct: false },
        { id: 3, text: "Maná", correct: false },
        { id: 4, text: "Los Rodríguez", correct: false },
      ],
      artist: "Jarabe de Palo",
      title: "La Flaca",
    },
    {
      id: 7,
      song: "/audio/paint-it-black.mp3",
      question: '¿Qué banda de rock británica canta "Paint It Black"?',
      answers: [
        { id: 1, text: "The Beatles", correct: false },
        { id: 2, text: "The Rolling Stones", correct: true },
        { id: 3, text: "The Who", correct: false },
        { id: 4, text: "Led Zeppelin", correct: false },
      ],
      artist: "The Rolling Stones",
      title: "Paint It Black",
    },
    {
      id: 8,
      song: "/audio/waka-waka.mp3",
      question: '¿Para qué evento deportivo se hizo "Waka Waka"?',
      answers: [
        { id: 1, text: "Juegos Olímpicos 2012", correct: false },
        { id: 2, text: "Mundial de Fútbol 2010", correct: true },
        { id: 3, text: "Eurocopa 2008", correct: false },
        { id: 4, text: "Copa América 2011", correct: false },
      ],
      artist: "Shakira",
      title: "Waka Waka (This Time for Africa)",
    },
    {
      id: 9,
      song: "/audio/bon-bon.mp3",
      question: '¿Cuál artista latino canta "Bon Bon"?',
      answers: [
        { id: 1, text: "Daddy Yankee", correct: false },
        { id: 2, text: "Wisin & Yandel", correct: false },
        { id: 3, text: "Pitbull", correct: true },
        { id: 4, text: "Enrique Iglesias", correct: false },
      ],
      artist: "Pitbull",
      title: "Bon Bon",
    },
    {
      id: 10,
      song: "/audio/it-was-a-good-day.mp3",
      question: '¿Quién es el rapero que canta "It Was a Good Day"?',
      answers: [
        { id: 1, text: "Ice Cube", correct: true },
        { id: 2, text: "Snoop Dogg", correct: false },
        { id: 3, text: "Dr. Dre", correct: false },
        { id: 4, text: "Tupac Shakur", correct: false },
      ],
      artist: "Ice Cube",
      title: "It Was a Good Day",
    },
    {
      id: 11,
      song: "/audio/me-mareo.mp3",
      question: '¿Cuál artista español canta "Me Mareo"?',
      answers: [
        { id: 1, text: "Estopa", correct: false },
        { id: 2, text: "La Oreja de Van Gogh", correct: false },
        { id: 3, text: "Kid Voodoo", correct: true },
        { id: 4, text: "El Canto del Loco", correct: false },
      ],
      artist: "Kid Voodoo",
      title: "Me Mareo",
    },
  ]);

  // Computed
  const currentQuestion = computed(() => {
    return selectedQuestions.value[currentQuestionIndex.value];
  });

  const correctAnswers = computed(() => {
    return userAnswers.value.filter((answer) => answer.isCorrect).length;
  });

  const accuracy = computed(() => {
    if (userAnswers.value.length === 0) return 0;
    return Math.round((correctAnswers.value / userAnswers.value.length) * 100);
  });

  // Actions
  const setPlayerName = (name) => {
    playerName.value = name;
  };

  const startGame = () => {
    // Seleccionar 10 preguntas aleatorias de las 12 disponibles
    selectedQuestions.value = [...allQuestions.value]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((q) => ({
        ...q,
        answers: [...q.answers].sort(() => Math.random() - 0.5),
      }));

    currentScore.value = 0;
    currentQuestionIndex.value = 0;
    userAnswers.value = [];
    gameStatus.value = "playing";
    startTime.value = Date.now();
    totalListenTime.value = 0;

    // Precargar audios
    selectedQuestions.value.forEach((question) => {
      if (!audioInstances.value[question.id]) {
        audioInstances.value[question.id] = new Howl({
          src: [question.song],
          html5: true,
          onloaderror: (id, error) => {
            console.error("Error cargando audio:", question.song, error);
          },
          onplay: () => {
            // Iniciar temporizador de escucha
            if (!question.listenStartTime) {
              question.listenStartTime = Date.now();
            }
          },
          onend: () => {
            // Calcular tiempo de escucha
            if (question.listenStartTime) {
              const listenTime = Date.now() - question.listenStartTime;
              totalListenTime.value += listenTime;
              question.listenStartTime = null;
            }
          },
        });
      }
    });
  };

  const playCurrentSong = () => {
    if (
      currentQuestion.value &&
      audioInstances.value[currentQuestion.value.id]
    ) {
      const sound = audioInstances.value[currentQuestion.value.id];

      sound.once("load", () => {
        const duration = sound.duration() * 1000; // duración en ms
        const randomStart = Math.random() * Math.max(0, duration - 5000); // 5 segundos aleatorios

        sound.seek(randomStart / 1000);
        sound.play();

        // Detener automáticamente después de 5 segundos
        setTimeout(() => {
          if (sound.playing()) {
            sound.stop();
          }
        }, 5000);
      });

      sound.load();
    }
  };

  const answerQuestion = (answerId) => {
    const question = currentQuestion.value;
    const selectedAnswer = question.answers.find((a) => a.id === answerId);
    const isCorrect = selectedAnswer?.correct || false;

    // Calcular puntos
    if (isCorrect) {
      currentScore.value += 10;
    } else {
      currentScore.value = Math.max(0, currentScore.value - 5);
    }

    // Guardar respuesta
    userAnswers.value.push({
      questionId: question.id,
      answerId,
      isCorrect,
      timestamp: Date.now(),
    });

    // Detener audio actual
    if (audioInstances.value[question.id]) {
      audioInstances.value[question.id].stop();
    }

    return isCorrect;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < selectedQuestions.value.length - 1) {
      currentQuestionIndex.value++;
      return true;
    } else {
      finishGame();
      return false;
    }
  };

  const finishGame = () => {
    gameStatus.value = "finished";

    // Importación dinámica
    import("./ranking").then((module) => {
      const rankingStore = module.useRankingStore();
      rankingStore.addScore({
        name: playerName.value,
        score: currentScore.value,
        correctAnswers: correctAnswers.value,
        totalQuestions: selectedQuestions.value.length,
        accuracy: accuracy.value,
        date: new Date().toISOString(),
        listenTime: totalListenTime.value,
      });
    });
  };

  const resetGame = () => {
    playerName.value = "";
    currentScore.value = 0;
    currentQuestionIndex.value = 0;
    gameStatus.value = "idle";
    selectedQuestions.value = [];
    userAnswers.value = [];
    totalListenTime.value = 0;

    // Detener todos los sonidos
    Object.values(audioInstances.value).forEach((sound) => {
      if (sound && typeof sound.stop === "function") {
        sound.stop();
      }
    });
    audioInstances.value = {};
  };

  return {
    // State
    playerName,
    currentScore,
    currentQuestionIndex,
    gameStatus,
    questions,
    selectedQuestions,
    userAnswers,
    currentQuestion,
    correctAnswers,
    accuracy,
    totalListenTime,

    // Actions
    setPlayerName,
    startGame,
    playCurrentSong,
    answerQuestion,
    nextQuestion,
    finishGame,
    resetGame,
  };
});
