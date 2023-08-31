import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseButton from '@/common/BaseButton.vue'
const app = createApp(App)

app.use(router)

app.component('v-button', BaseButton)

app.mount('#app')
