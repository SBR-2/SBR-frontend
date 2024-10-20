import { RouteRecordRaw } from 'vue-router';

const adminRoutes: Array<RouteRecordRaw> = [
    {
        path: '/panelPrincipal',
        name: 'PanelPrincipal',
        component: () => import('../../components/Admin/panel-principal.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../../components/Admin/dashboard.vue')
    },
    {
        path: '/listaUsuarios',
        name: 'listaUsuarios',
        component: () => import('../../components/Admin/listausuario.vue')
    },
    {
        path: '/inspeccion',
        name: 'inspeccion',
        component: () => import('../../components/Admin/inspeccion.vue')
    },
    {
        path: '/evaluacion',
        name: 'evaluacion',
        component: () => import('../../components/Admin/evaluacion.vue')
    },
    {
        path: '/editarUsuario/:userId',
        name: 'editarUsuario',
        component: () => import('../../components/Admin/editarUsuario.vue')
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('../../components/Admin/personal.vue')
    },
    {
        path: '/crearUsuario',
        name: 'crearUsuario',
        component: () => import('../../components/Admin/crearUsuario.vue')
    },
];

export default adminRoutes;