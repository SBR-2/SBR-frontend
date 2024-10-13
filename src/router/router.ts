import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import authRoutes from './routes/authRoutes';
import { useAuthStore } from '../stores/authStore';
import { useToast } from 'vue-toastification';

// Definición de las rutas
const routes: Array<RouteRecordRaw> = [
    ...authRoutes,
    {
        path: '/', // Ruta por defecto
        name: 'EjemploDeRuta',
        component: () => import('../views/VistaDeEjemplo.vue'),
        meta: { requiresAuth: true },
    },
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

// Redirigir a la página de login si el usuario no está autenticado
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = await authStore.isAuthenticated;

    // Verificar si la ruta requiere autenticación y si el usuario está autenticado
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            useToast().error('Debes autenticarte antes de ver esta página...')
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;