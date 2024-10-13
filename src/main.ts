import './style.css'
import App from './App.vue'
import vSelect from 'vue-select'
import pinia from './stores/index'
import router from './router/router'
import Toast from "vue-toastification";
import 'vue-select/dist/vue-select.css'
import apolloClient from './apolloClient'
import "vue-toastification/dist/index.css";
import { createApp, provide, h } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { DefaultApolloClient } from '@vue/apollo-composable'

// Inicialización de la aplicación
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
})

// Agregar el router y el store a la aplicación
app.use(router);
app.use(pinia);

// Agregar el plugin de Toast a la aplicación
const options = {};
app.use(Toast, options);

// Componente Vue Select
app.component('v-select', vSelect);

// Montar la aplicación
app.mount('#app');
