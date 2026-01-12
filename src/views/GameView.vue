<template>
  <div class="w-[70%] text-center mx-auto pt-40 flex flex-row items-center justify-center h-[60vh] text-sky-50">
    <!-- Pantalla de inicio -->
    <div v-if="gameStore.gameStatus === 'idle'" class="card gap-[10px] justify-center text-center">
      <h2 class="text-[2rem] font-bold text-cyan-600">Comenzar Concurso</h2>
      <p class="text-[1.2rem] opacity-90">Introduce tu nombre para empezar el desafío musical</p>

      <form @submit.prevent="startGame" class="mt-[30px] md:flex md:flex-col md:gap-[15px] items-center">
        <input v-model="playerName" type="text" placeholder="Tu nombre..." required
          class="p-[15px] text-[18px] w-[300px] max-w-[500px]  mr-[15px] text-center md:mr-0 md:w-full bg-white/10 border-2 border-white/20 rounded-[10px] text-white focus:outline-none focus:border-white/40 focus:bg-white/20 placeholder:text-white/70"
          maxlength="20">
        <button type="submit" class="btn btn-primary hover:bg-sky-600">
          ¡Comenzar!
        </button>
      </form>
    </div>

    <!-- Pantalla de juego -->
    <div v-else-if="gameStore.gameStatus === 'playing'" class="w-full">
      <div
        class="flex justify-between items-center mb-5 text-cyan-600 p-4 bg-white/10 rounded-[10px] md:flex-col md:gap-[10px]">
        <div class="flex gap-5">
          <span class="player-name">Jugador: {{ gameStore.playerName }}</span>
          <span class="score">Puntos: {{ gameStore.currentScore }}</span>
        </div>
        <div class="progress">
          Pregunta {{ gameStore.currentQuestionIndex + 1 }} de {{ gameStore.selectedQuestions.length }}
        </div>
      </div>

      <div class="card">
        <div class="flex justify-evenly items-center mb-[30px]">
          <h3 class="text-[1.5rem] font-medium text-lg text-white">{{ gameStore.currentQuestion.question }}</h3>
          <button @click="playCurrentSong" class="p-3 w-[50px] h-[50px] relative bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-300 ease-in-out
            items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="isPlaying">
            {{ isPlaying ? '⏸' : '▶' }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-[15px] md:grid-cols-1">
          <button v-for="answer in gameStore.currentQuestion.answers" :key="answer.id" @click="selectAnswer(answer.id)"
            class="p-5 border-2 border-[#667eea] bg-white text-[#667eea] rounded-[10px] text-[16px] cursor-pointer transition-all duration-300 hover:bg-[#667eea] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="answered">
            {{ answer.text }}
          </button>
        </div>
      </div>
    </div>

    <!-- Pantalla de resultados -->
    <div v-else-if="gameStore.gameStatus === 'finished'" class="card max-h-[70vh] w-[80%]">
      <h2 class="text-[2rem] font-bold text-cyan-600">¡Juego Terminado!</h2>

      <div class="grid grid-cols-3 gap-5 my-[30px] md:grid-cols-1">
        <div class="text-center p-5 bg-[#667eea]/10 rounded-[10px]">
          <div class="text-[2rem] font-bold text-[#667eea]">{{ gameStore.currentScore }}</div>
          <div class="mt-[5px] text-[#666]">Puntos Totales</div>
        </div>

        <div class="text-center p-5 bg-[#667eea]/10 rounded-[10px]">
          <div class="text-[2rem] font-bold text-[#667eea]">{{ gameStore.correctAnswers }}/{{
            gameStore.selectedQuestions.length }}</div>
          <div class="mt-[5px] text-[#666]">Aciertos</div>
        </div>

        <div class="text-center p-5 bg-[#667eea]/10 rounded-[10px]">
          <div class="text-[2rem] font-bold text-[#667eea]">{{ gameStore.accuracy }}%</div>
          <div class="mt-[5px] text-[#666]">Precisión</div>
        </div>
      </div>

      <div class="text-center font-medium text-[1.2rem]">
        <p v-if="gameStore.accuracy >= 80"> ¡Excelente! Eres un verdadero experto musical</p>
        <p v-else-if="gameStore.accuracy >= 60"> ¡Buen trabajo! Sigue practicando</p>
        <p v-else-if="gameStore.accuracy >= 40"> No está mal, pero puedes mejorar</p>
        <p v-else> Sigue intentándolo, la práctica hace al maestro</p>
      </div>

      <div class="text-center my-5 text-[1.1rem]">
        <p v-if="rankingStore.getPlayerPosition(gameStore.playerName) <= 10">
          🏅 ¡Felicidades! Has entrado en el Top 10 en posición {{ rankingStore.getPlayerPosition(gameStore.playerName)
          }}
        </p>
        <p v-else>
          Sigue practicando para entrar en el Top 10!!!
        </p>
      </div>

      <div class="mt-[30px] flex gap-7">
        <button @click="playAgain" class="btn btn-secondary w-[40%]">
          Jugar de Nuevo
        </button>
        <button class="btn btn-secondary w-[40%]">
          <router-link to="/ranking">
            Ver Ranking
          </router-link>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useRankingStore } from '../stores/ranking'

export default {
  name: 'GameView',
  setup() {
    const gameStore = useGameStore()
    const rankingStore = useRankingStore()
    const playerName = ref('')
    const isPlaying = ref(false)
    const answered = ref(false)

    const startGame = () => {
      gameStore.setPlayerName(playerName.value)
      gameStore.startGame()
    }

    const playCurrentSong = () => {
      isPlaying.value = true
      gameStore.playCurrentSong()
      setTimeout(() => {
        isPlaying.value = false
      }, 5000)
    }

    const currentPlayerPosition = computed(() => {
      if (!gameStore.playerName) return null
      return rankingStore.getPlayerPosition(gameStore.playerName)
    })

    const selectAnswer = (answerId) => {
      if (answered.value) return

      answered.value = true
      const isCorrect = gameStore.answerQuestion(answerId)

      setTimeout(() => {
        answered.value = false
        const hasNext = gameStore.nextQuestion()
        if (hasNext) {
          isPlaying.value = false
        }
      }, 2000)
    }

    const playAgain = () => {
      gameStore.resetGame()
      playerName.value = ''
    }

    onMounted(() => {
      // Precargar store
      gameStore.resetGame()
    })


    return {
      gameStore,
      rankingStore,
      playerName,
      isPlaying,
      answered,
      currentPlayerPosition,
      startGame,
      playCurrentSong,
      selectAnswer,
      playAgain
    }
  }
}
</script>