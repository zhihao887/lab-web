import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadPublishedContent } from './services/contentStore'
import './styles/main.css'

loadPublishedContent()

createApp(App).use(router).mount('#app')
