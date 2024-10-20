import { RouteRecordRaw } from 'vue-router';

const aplicantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/solicitante/lista-productos',
        name: 'ListaProductos',
        component: () => import('../../components/Solicitante/ListaProductos.vue')
    },
    {
        path: '/solicitante/agregar-producto',
        name: 'AddProducto',
        component: () => import('../../components/Solicitante/AddProducto.vue')
    }
];

export default aplicantRoutes;