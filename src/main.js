import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './styles/main.css'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')
