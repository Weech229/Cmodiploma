import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Chart from 'chart.js/auto'

// Создаем приложение
const app = createApp(App)

// Подключаем Pinia для управления состоянием
app.use(createPinia())

// Подключаем роутер
app.use(router)

// Монтируем приложение
app.mount('#app')