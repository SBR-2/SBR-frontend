import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Definición de las rutas
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'PanelPrincipal',
        component: () => import('../components/admin/panel-principal.vue')
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../components/admin/dashboard.vue')
    },
    {
        path: '/',
        name: 'listaUsuarios',
        component: () => import('../components/admin/listausuario.vue')
    },
   
   
];

// Inicialización del router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;