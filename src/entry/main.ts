import {createApp} from 'vue'
import App from "../pages/Main.vue"
import PrimeVue from "primevue/config";

const app = createApp(App)
app.use(PrimeVue)

app.mount("#app")
