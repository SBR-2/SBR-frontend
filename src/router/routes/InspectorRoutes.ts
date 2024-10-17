import { RouteRecordRaw } from 'vue-router';

const InspectorRoutes: Array<RouteRecordRaw> = [

    {
        path: '/inspectorpanelprincipal',
        name: 'inspectorpanelprincipal',
        component: () => import('../../components/Inspector/inspector-panelprincipal.vue')
    },
    {
        path: '/inspectordashboard',
        name: 'inspectordashboard',
        component: () => import('../../components/Inspector/inspector-dashboard.vue')
    },


];




export default InspectorRoutes;