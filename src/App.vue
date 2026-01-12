<template>
  <div id="app">
    <NavBar />
    <main class="p-5 mx-auto flex justify-center">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>