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

// if ($token.value) {
//     getBasket();
// }
// async  function getBasket () {
//     try {
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer " + $token.value);
//         const requestOptions = {
//             method: "GET",
//             headers: myHeaders,
//         };
//         const response = await fetch(
//             "http://spa-magaz/api/order/getBasket",
//             requestOptions
//         );
//         const res = await response.json();
//         if (response.status == 200) {
//             app.config.globalProperties.$basket = res.data.products;
//             alert($basket.value)
//         }
//         // alert(this.cash);
//     } catch (error) {
//         alert(error);
//     }
// }


app.use(router).mount('#app')

