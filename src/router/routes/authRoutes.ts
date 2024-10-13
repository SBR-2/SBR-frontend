import { RouteRecordRaw } from 'vue-router';

const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../../views/auth/LogIn.vue')
    },
];

export default authRoutes;