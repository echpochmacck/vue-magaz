import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.config.globalProperties.$foo = 'sdsd'
const token = ref(localStorage.getItem('token') || null)
const isAdmin = ref(localStorage.getItem('isAdmin') || null)

app.config.globalProperties.$token = token;
app.config.globalProperties.$isAdmin = isAdmin;
app.config.globalProperties.$url = 'http://spa-magaz';



app.use(router).mount('#app')

