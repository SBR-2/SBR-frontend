import { RouteRecordRaw } from 'vue-router';

const adminRoutes: Array<RouteRecordRaw> = [
    {
        path: '/panelPrincipal',
        name: 'PanelPrincipal',
        component: () => import('../../components/Admin/panel-principal.vue')
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('../../components/Admin/dashboard.vue')
    },
    {
        path: '/admin/listaUsuarios',
        name: 'listaUsuarios',
        component: () => import('../../components/Admin/listausuario.vue')
    },
    {
        path: '/admin/inspeccion',
        name: 'inspeccion',
        component: () => import('../../components/Admin/inspeccion.vue')
    },
    {
        path: '/admin/evaluacion',
        name: 'evaluacion',
        component: () => import('../../components/Admin/evaluacion.vue')
    },
    {
        path: '/admin/editarUsuario/:userId',
        name: 'editarUsuario',
        component: () => import('../../components/Admin/editarUsuario.vue')
    },
    {
        path: '/admin/personal',
        name: 'personal',
        component: () => import('../../components/Admin/personal.vue')
    },
    {
        path: '/admin/crearUsuario',
        name: 'crearUsuario',
        component: () => import('../../components/Admin/crearUsuario.vue')
    },
];

export default adminRoutes;