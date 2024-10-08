import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import pinia from './stores/index'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Inicialización de la aplicación
const app = createApp(App);

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
