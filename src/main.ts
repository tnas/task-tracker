import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'
import { appKey, store } from './store'

createApp(App)
    .use(router)
    .use(store, appKey)
    .mount('#app')
    