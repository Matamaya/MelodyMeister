<template>
  <div class="w-[70%] text-center mx-auto flex flex-col items-center justify-center min-h-screen">
    <div class="text-cyan-500 mb-10">
      <h1 class="text-[2.5rem] mb-[10px]">Melody Meister</h1>
      <p class="text-[1.2rem] opacity-90">Demuestra tu conocimiento musical</p>
    </div>

    <div class="card max-h-fit ">
      <h2 class="text-white-500 text-xl font-bold">Reglas del Concurso</h2>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 my-8">
        <div class="text-center p-5 bg-[rgba(53,71,151,0.44)] rounded-[10px]">
          <h3 class="text-[#63b4ff] mb-[10px] text-lg text-sky-200">Modo de Juego</h3>
          <p>10 preguntas aleatorias de un total de 20 canciones</p>
        </div>

        <div class="text-center p-5 bg-[rgba(53,71,151,0.44)] rounded-[10px]">
          <h3 class="text-[#63b4ff] mb-[10px] text-lg text-sky-200">Tiempo</h3>
          <p>Cada canción se reproduce durante 5 segundos aleatorios</p>
        </div>

        <div class="text-center p-5 bg-[rgba(53,71,151,0.44)] rounded-[10px]">
          <h3 class="text-[#63b4ff] mb-[10px] text-lg text-sky-200">Puntuación</h3>
          <p>+10 puntos por acierto, -5 puntos por error</p>
        </div>

        <div class="text-center p-5 bg-[rgba(53,71,151,0.44)] rounded-[10px]">
          <h3 class="text-[#63b4ff] mb-[10px] text-lg text-sky-200">Ranking</h3>
          <p>Compite por entrar en el Top 10 de mejores puntuaciones</p>
        </div>
      </div>

      <div class="text-center mt-[15px]">
        <router-link to="/game" class="btn btn-primary no-underline hover:bg-sky-600 ">
          ¡Comenzar!
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
