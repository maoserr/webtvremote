import {createApp} from 'vue'
import App from "../pages/Home.vue"
import PrimeVue from "primevue/config";
import Tooltip from 'primevue/tooltip';

const app = createApp(App)
app.use(PrimeVue)
app.directive('tooltip', Tooltip);
app.component('router-link', {})

app.mount("#app")
