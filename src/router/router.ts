import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Definición de las rutas
const routes: Array<RouteRecordRaw> = [
    {
        path: '/', // Ruta por defecto
        name: 'EjemploDeRuta',
        component: () => import('../views/ProductForm.vue')
    },
];

// Inicialización del router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;