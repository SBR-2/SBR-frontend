import { RouteRecordRaw } from 'vue-router';

const userRoutes: Array<RouteRecordRaw> = [
    {
        path: '/user/dashboard',
        name: 'UserDashboard',
        component: () => import('../../views/ProductForm.vue')
    },
    {
        path: '/user/registro',
        name: 'UserRegistro',
        component: () => import('../../components/FormularioRegistro/RegisterProductForm.vue')
    },
    {
        path: '/ins/bpm',
        name: 'Bpm',
        component: () => import('../../components/Bpm/BpmForm.vue')
    },
];

export default userRoutes;