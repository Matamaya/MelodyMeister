<template>
  <div class="ranking">
    <div class="card">
      <h2>🏆 Ranking Top 10</h2>
      
      <div v-if="rankingStore.topScores.length === 0" class="empty-ranking">
        <div class="empty-icon">🎵</div>
        <h3>¡Aún no hay puntuaciones!</h3>
        <p>Sé el primero en entrar en el ranking</p>
        <router-link to="/game" class="btn btn-primary">
          Jugar Ahora
        </router-link>
      </div>

      <div v-else class="ranking-content">
        <div class="ranking-list">
          <div 
            v-for="(score, index) in rankingStore.topScores" 
            :key="index"
            :class="['ranking-item', getRankingClass(index)]"
          >
            <div class="rank-position">
              <span v-if="index === 0" class="crown">👑</span>
              <span v-else-if="index === 1" class="medal">🥈</span>
              <span v-else-if="index === 2" class="medal">🥉</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            
            <div class="player-info">
              <div class="player-name">{{ score.name }}</div>
              <div class="player-stats">
                {{ score.score }} puntos • {{ score.accuracy }}% precisión
              </div>
            </div>
            
            <div class="score-details">
              <div class="score-date">{{ formatDate(score.date) }}</div>
              <div class="score-time">{{ formatTime(score.listenTime) }}</div>
            </div>
          </div>
        </div>

        <div class="current-player-info">
          <div 
            v-if="currentPlayerPosition && currentPlayerPosition <= 10"
            class="current-player-highlight"
          >
            🎉 ¡Estás en el Top 10 en posición {{ currentPlayerPosition }}!
          </div>
          <div v-else class="current-player-message">
            🔥 Sigue practicando para entrar en el Top 10
          </div>
        </div>
      </div>

      <div class="ranking-actions">
        <button 
          v-if="rankingStore.topScores.length > 0" 
          @click="clearRanking" 
          class="btn btn-secondary"
        >
          Limpiar Ranking
        </button>
        <router-link to="/game" class="btn btn-primary">
          Jugar de Nuevo
        </router-link>
      </div>
    </div>

    <div class="card ranking-info">
      <h3>📊 Información del Ranking</h3>
      <ul class="info-list">
        <li>👑 Oro para el primer puesto</li>
        <li>🥈 Plata para el segundo puesto</li>
        <li>🥉 Bronce para el tercer puesto</li>
        <li>⚖️ En caso de empate, gana quien menos tiempo de escucha haya necesitado</li>
        <li>💾 Las puntuaciones se guardan localmente en tu navegador</li>
      </ul>
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
      if (index === 0) return 'first-place'
      if (index === 1) return 'second-place'
      if (index === 2) return 'third-place'
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

<style scoped>
.ranking {
  max-width: 800px;
  margin: 0 auto;
}

.empty-ranking {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.ranking-list {
  margin: 30px 0;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.ranking-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.ranking-item.first-place {
  background: linear-gradient(45deg, #FFD700, #FFF9C4);
  border: 2px solid #FFC107;
}

.ranking-item.second-place {
  background: linear-gradient(45deg, #C0C0C0, #E0E0E0);
  border: 2px solid #9E9E9E;
}

.ranking-item.third-place {
  background: linear-gradient(45deg, #CD7F32, #E8C6A3);
  border: 2px solid #795548;
}

.rank-position {
  font-size: 1.5rem;
  font-weight: bold;
  width: 60px;
  text-align: center;
}

.crown, .medal {
  font-size: 2rem;
}

.player-info {
  flex: 1;
}

.player-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.player-stats {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

.score-details {
  text-align: right;
}

.score-date {
  font-size: 0.9rem;
  color: #666;
}

.score-time {
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
}

.current-player-info {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  background: rgba(102, 126, 234, 0.1);
}

.current-player-highlight {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
}

.current-player-message {
  font-size: 1.1rem;
  color: #666;
}

.ranking-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .ranking-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .score-details {
    text-align: center;
  }
  
  .ranking-actions {
    flex-direction: column;
  }
}
</style>