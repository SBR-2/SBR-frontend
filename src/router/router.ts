import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authRoutes from './routes/authRoutes';

// Definición de las rutas
const routes: Array<RouteRecordRaw> = [
    ...authRoutes,
    {
        path: '/', // Ruta por defecto
        name: 'EjemploDeRuta',
        component: () => import('../views/VistaDeEjemplo.vue')
    },
];

// Inicialización del router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;