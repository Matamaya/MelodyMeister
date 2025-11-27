<template>
  <div class="home">
    <div class="hero-section">
      <h1>Melody Meister</h1>
      <p class="subtitle">Demuestra tu conocimiento musical</p>
    </div>

    <div class="card">
      <h2>Reglas del Concurso</h2>
      
      <div class="rules-grid">
        <div class="rule-item">
          <h3>Modo de Juego</h3>
          <p>10 preguntas aleatorias de un total de 20 canciones</p>
        </div>
        
        <div class="rule-item">
          <h3>Tiempo</h3>
          <p>Cada canción se reproduce durante 5 segundos aleatorios</p>
        </div>
        
        <div class="rule-item">
          <h3>Puntuación</h3>
          <p>+10 puntos por acierto, -5 puntos por error</p>
        </div>
        
        <div class="rule-item">
          <h3>Ranking</h3>
          <p>Compite por entrar en el Top 10 de mejores puntuaciones</p>
        </div>
      </div>

      <div class="action-section">
        <router-link to="/game" class="btn btn-primary">
          ¡Comenzar Concurso!
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.rule-item {
  text-align: center;
  padding: 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
}

.rule-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.rule-item h3 {
  color: #667eea;
  margin-bottom: 10px;
}

.action-section {
  text-align: center;
  padding: 30px;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(255, 142, 83, 0.1));
  border-radius: 15px;
  margin-top: 30px;
}

.action-section h3 {
  margin-bottom: 20px;
  color: #333;
}

.features-list {
  list-style: none;
  font-size: 1.1rem;
}

.features-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.features-list li:last-child {
  border-bottom: none;
}
</style>