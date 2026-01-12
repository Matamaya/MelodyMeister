import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './assets/style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

//TODO: MEJORAR DISEÑO + MAS DETALLE A LAS PREGUNTAS DE LAS CANCIONES + GUARDAR JSON RANKING?? 