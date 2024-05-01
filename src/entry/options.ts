import { createApp } from 'vue'
import MyApp from "../pages/Options.vue";
import PrimeVue from 'primevue/config';

const app = createApp(MyApp);
app.use(PrimeVue);

app.mount('#app')
