<template>
  <nav class="bg-cyan-500 backdrop-blur-md py-4 border-b border-white/20">
    <div class="max-w-[1200px] mx-auto flex justify-between items-center px-5">
      <h1 class="text-white text-2xl">Melody Meister</h1>
      <ul class="flex list-none gap-8">
        <li class="nav-item">
          <router-link to="/"
            class="text-white no-underline font-medium py-2 px-4 rounded-[20px] transition-all duration-300 hover:bg-white/20 [&.router-link-active]:bg-white/20">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/game"
            class="text-white no-underline font-medium py-2 px-4 rounded-[20px] transition-all duration-300 hover:bg-white/20 [&.router-link-active]:bg-white/20">Concurso</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ranking"
            class="text-white no-underline font-medium py-2 px-4 rounded-[20px] transition-all duration-300 hover:bg-white/20 [&.router-link-active]:bg-white/20">Ranking</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>