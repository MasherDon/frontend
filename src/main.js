import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import GMaps from '@fawmi/vue-google-maps'

createApp(App).use(store).use(router)
    .use(GMaps, {
        load: {
            key: '***',
            language: 'ru'
        },
    }).mount('#app')

