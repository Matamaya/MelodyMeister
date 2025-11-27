import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRankingStore = defineStore('ranking', () => {
  const scores = ref(JSON.parse(localStorage.getItem('quizRanking')) || [])

  const topScores = computed(() => {
    return scores.value
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return a.listenTime - b.listenTime
      })
      .slice(0, 10)
  })

  const addScore = (scoreData) => {
    scores.value.push(scoreData)
    scores.value.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.listenTime - b.listenTime
    })
    scores.value = scores.value.slice(0, 10)
    
    localStorage.setItem('quizRanking', JSON.stringify(scores.value))
  }

  const getPlayerPosition = (playerName) => {
    const position = topScores.value.findIndex(score => score.name === playerName)
    return position >= 0 ? position + 1 : null
  }

  const clearRanking = () => {
    scores.value = []
    localStorage.removeItem('quizRanking')
  }

  return {
    scores,
    topScores,
    addScore,
    getPlayerPosition,
    clearRanking
  }
})