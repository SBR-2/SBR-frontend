import { RouteRecordRaw } from 'vue-router';

const InspectorRoutes: Array<RouteRecordRaw> = [
    {
        path: '/inspectorpanelprincipal',
        name: 'inspectorpanelprincipal',
        component: () => import('../../components/Evaluador/inspector-panelprincipal.vue')
    },
    {
        path: '/inspectordashboard',
        name: 'inspectordashboard',
        component: () => import('../../components/Evaluador/inspector-dashboard.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../../components/Evaluador/DashboardEvaluador.vue')
    },
    {
      path: '/lista-productos',
      name: 'ListaProductosInspector',
      component: () => import('../../components/Evaluador/ListaProductosEvaluador.vue')
    },
    {
      path: '/lista-registros-sanitarios',
      name: 'ListaRegistroSanitarioInspector',
      component: () => import('../../components/Evaluador/ListaRegistroSanitarioEvaluador.vue')
    },
    {
      path: '/evaluacion-producto',
      name: 'EvaluacionProductoInspector',
      component: () => import('../../components/Evaluador/EvaluacionProductoEvaluador.vue')
    },
    {
      path: '/evaluacion-registro-sanitario',
      name: 'EvaluacionRegistroSanitarioInspector',
      component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart1.vue')
    },
    {
      path: '/evaluacion-registro-sanitario-part2',
      name: 'EvaluacionRegistroSanitarioPart2',
      component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart2.vue')
    },
    {	
      path: '/evaluacion-registro-sanitario-part3',
      name: 'EvaluacionRegistroSanitarioPart3',
      component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart3.vue')
    },
];

export default InspectorRoutes;