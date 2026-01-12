<template>
  <div class="w-[70%] text-center mx-auto pt-10 flex flex-row items-center h-fit">
    <div class="card w-[60%]">
      <h2 class="font-bold text-2xl">🏆 Ranking Top 10</h2>

      <div v-if="rankingStore.topScores.length === 0" class="text-center p-5 flex flex-col gap-[10px]">
        <div class="text-[4rem] mb-5">🎵</div>
        <h3>¡Aún no hay puntuaciones!</h3>
        <p>Sé el primero en entrar en el ranking</p>
        <router-link to="/game" class="btn btn-primary">
          Jugar Ahora
        </router-link>
      </div>

      <div v-else class="my-[30px]">
        <div class="ranking-list">
          <div v-for="(score, index) in rankingStore.topScores" :key="index"
            :class="['flex items-center mb-[10px] rounded-[10px] bg-[#f8f9fa] transition-all duration-300 hover:translate-x-[5px] hover:shadow-lg md:flex-col md:text-center md:gap-[5px]', getRankingClass(index)]">
            <div class="text-[1.5rem] font-medium text-center">
              <span v-if="index === 0" class="text-[2rem]">1º puesto: {{ score.name }}</span>
              <span v-else-if="index === 1" class="text-[2rem]">2º puesto: {{ score.name }}</span>
              <span v-else-if="index === 2" class="text-[2rem]">3º puesto: {{ score.name }}</span>
              <span v-else>{{ index + 1 }}º puesto: {{ score.name }}</span>
            </div>

            <div class="flex-1">
              <div class="text-[0.9rem] text-[#666] mt-[5px]">
                {{ score.score }} puntos • {{ score.accuracy }}% precisión
              </div>
            </div>

            <div class="text-right md:text-center">
              <div class="text-[0.9rem] text-[#666]">{{ formatDate(score.date) }}</div>
              <div class="text-[0.8rem] text-[#999] mt-[5px]">{{ formatTime(score.listenTime) }}</div>
            </div>
          </div>
        </div>

        <div class="text-center p-5 my-5 rounded-[10px]">
          <div v-if="currentPlayerPosition && currentPlayerPosition <= 10"
            class="text-[1.2rem] font-bold text-[#667eea]">
            ¡Estás en el Top 10 en posición {{ currentPlayerPosition }}!
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-center items-center gap-[15px]">
        <button v-if="rankingStore.topScores.length > 0" @click="clearRanking" class="btn btn-secondary w-[80%]">
          Limpiar Ranking
        </button>
        <button class="btn btn-secondary w-[80%]">
          <router-link to="/game">
            Jugar de Nuevo
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useRankingStore } from '../stores/ranking'

export default {
  name: 'RankingView',
  setup() {
    const gameStore = useGameStore()
    const rankingStore = useRankingStore()

    const currentPlayerPosition = computed(() => {
      if (!gameStore.playerName) return null
      return rankingStore.getPlayerPosition(gameStore.playerName)
    })

    const getRankingClass = (index) => {
      if (index === 0) return 'bg-gradient-to-r from-[#FFD700] to-[#FFF9C4] border-2 border-[#FFC107]'
      if (index === 1) return 'bg-gradient-to-r from-[#C0C0C0] to-[#E0E0E0] border-2 border-[#9E9E9E]'
      if (index === 2) return 'bg-gradient-to-r from-[#CD7F32] to-[#E8C6A3] border-2 border-[#795548]'
      return ''
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES')
    }

    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000)
      return `${seconds}s`
    }

    const clearRanking = () => {
      if (confirm('¿Estás seguro de que quieres limpiar el ranking? Esta acción no se puede deshacer.')) {
        rankingStore.clearRanking()
      }
    }

    return {
      rankingStore,
      gameStore,
      currentPlayerPosition,
      getRankingClass,
      formatDate,
      formatTime,
      clearRanking
    }
  }
}
</script>