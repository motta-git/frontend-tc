// in src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification' // Import the library
import 'vue-toastification/dist/index.css' // Import the CSS

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast) // Tell Vue to use the toast plugin

app.mount('#app')