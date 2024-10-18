import { RouteRecordRaw } from 'vue-router';

const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../../components/Auth/LogIn.vue')
    },
    {
        path: '/request-account',
        name: 'RequestAccount',
        component: () => import('../../components/Auth/RequestAccount.vue')
    }
];

export default authRoutes;