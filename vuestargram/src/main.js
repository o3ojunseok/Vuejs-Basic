import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
// mitt 라이브러리 셋팅 뿐만아니라 자주 쓰는 라이브러리 있으면 여기다가 등록하면 된다. 비슷한 규격으로!
let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter;

import store from './store.js'
import './registerServiceWorker'

app.use(store).mount('#app')
