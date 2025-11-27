<template>
  <div class="game">
    <!-- Pantalla de inicio -->
    <div v-if="gameStore.gameStatus === 'idle'" class="card start-screen">
      <h2>Comenzar Concurso</h2>
      <p>Introduce tu nombre para empezar el desafío musical</p>

      <form @submit.prevent="startGame" class="player-form">
        <input v-model="playerName" type="text" placeholder="Tu nombre..." required class="name-input" maxlength="20">
        <button type="submit" class="btn btn-primary">
          ¡Comenzar!
        </button>
      </form>
    </div>

    <!-- Pantalla de juego -->
    <div v-else-if="gameStore.gameStatus === 'playing'" class="game-screen">
      <div class="game-header">
        <div class="player-info">
          <span class="player-name">Jugador: {{ gameStore.playerName }}</span>
          <span class="score">Puntos: {{ gameStore.currentScore }}</span>
        </div>
        <div class="progress">
          Pregunta {{ gameStore.currentQuestionIndex + 1 }} de {{ gameStore.selectedQuestions.length }}
        </div>
      </div>

      <div class="card question-card">
        <div class="question-header">
          <h3>{{ gameStore.currentQuestion.question }}</h3>
          <button @click="playCurrentSong" class="btn-play" :disabled="isPlaying">
            {{ isPlaying ? '🔊 Reproduciendo...' : '▶️ Reproducir' }}
          </button>
        </div>

        <div class="answers-grid">
          <button v-for="answer in gameStore.currentQuestion.answers" :key="answer.id" @click="selectAnswer(answer.id)"
            class="answer-btn" :disabled="answered">
            {{ answer.text }}
          </button>
        </div>
      </div>
    </div>

    <!-- Pantalla de resultados -->
    <div v-else-if="gameStore.gameStatus === 'finished'" class="card results-screen">
      <h2>🎊 ¡Juego Terminado!</h2>

      <div class="results-grid">
        <div class="result-item">
          <div class="result-value">{{ gameStore.currentScore }}</div>
          <div class="result-label">Puntos Totales</div>
        </div>

        <div class="result-item">
          <div class="result-value">{{ gameStore.correctAnswers }}/{{ gameStore.selectedQuestions.length }}</div>
          <div class="result-label">Aciertos</div>
        </div>

        <div class="result-item">
          <div class="result-value">{{ gameStore.accuracy }}%</div>
          <div class="result-label">Precisión</div>
        </div>
      </div>

      <div class="feedback-message">
        <p v-if="gameStore.accuracy >= 80">🎉 ¡Excelente! Eres un verdadero experto musical</p>
        <p v-else-if="gameStore.accuracy >= 60">👍 ¡Buen trabajo! Sigue practicando</p>
        <p v-else-if="gameStore.accuracy >= 40">😊 No está mal, pero puedes mejorar</p>
        <p v-else>💪 Sigue intentándolo, la práctica hace al maestro</p>
      </div>

      <div class="ranking-info">
        <p v-if="rankingStore.getPlayerPosition(gameStore.playerName) <= 10">
          🏅 ¡Felicidades! Has entrado en el Top 10 en posición {{ rankingStore.getPlayerPosition(gameStore.playerName)
          }}
        </p>
        <p v-else>
          🔥 Sigue practicando para entrar en el Top 10
        </p>
      </div>

      <div class="action-buttons">
        <button @click="playAgain" class="btn btn-primary">
          Jugar de Nuevo
        </button>
        <router-link to="/ranking" class="btn btn-secondary">
          Ver Ranking
        </router-link>
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

    // En el setup() de GameView.vue
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

    onUnmounted(() => {
      // Limpiar recursos de audio si es necesario
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

<style scoped>
.game {
  max-width: 800px;
  margin: 0 auto;
}

.start-screen {
  text-align: center;
}

.player-form {
  margin-top: 30px;
}

.name-input {
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 10px;
  width: 300px;
  max-width: 100%;
  margin-right: 15px;
  text-align: center;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.player-info {
  display: flex;
  gap: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-play {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.btn-play:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.answer-btn {
  padding: 20px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.answer-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.answer-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.result-item {
  text-align: center;
  padding: 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
}

.result-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.result-label {
  margin-top: 5px;
  color: #666;
}

.feedback-message {
  text-align: center;
  font-size: 1.2rem;
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 10px;
}

.ranking-info {
  text-align: center;
  margin: 20px 0;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .answers-grid {
    grid-template-columns: 1fr;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .game-header {
    flex-direction: column;
    gap: 10px;
  }

  .player-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .name-input {
    margin-right: 0;
    width: 100%;
  }
}
</style>