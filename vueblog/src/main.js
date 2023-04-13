import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyList from './router.js'

createApp(App).use(MyList).mount('#app')

// MyList 가져옴 use(MyList)