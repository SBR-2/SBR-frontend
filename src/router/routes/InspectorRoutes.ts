import { RouteRecordRaw } from 'vue-router';

const InspectorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard-evaluador',
    name: 'Dashboard',
    component: () => import('../../components/Evaluador/DashboardEvaluador.vue')
  },
  {
    path: '/lista-productos-evaluador',
    name: 'ListaProductosEvaluador',
    component: () => import('../../components/Evaluador/ListaProductosEvaluador.vue')
  },
  {
    path: '/lista-registros-sanitarios-evaluador',
    name: 'ListaRegistroSanitarioEvaluador',
    component: () => import('../../components/Evaluador/ListaRegistroSanitarioEvaluador.vue')
  },
  {
    path: '/evaluacion-producto/:solicitudId',
    name: 'EvaluacionProductoInspector',
    component: () => import('../../components/Evaluador/EvaluacionProductoEvaluador.vue')
  },
  {
    path: '/evaluacion-registro-sanitario/:solicitudId',
    name: 'EvaluacionRegistroSanitarioEvaluador',
    component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart1.vue')
  },
  {
    path: '/evaluacion-registro-sanitario-part2/:solicitudId',
    name: 'EvaluacionRegistroSanitarioPart2',
    component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart2.vue')
  },
  {	
    path: '/evaluacion-registro-sanitario-part3/:solicitudId',
    name: 'EvaluacionRegistroSanitarioPart3',
    component: () => import('../../components/Evaluador/EvaluacionRegistroSanitarioPart3.vue')
  },

  
  // ...otras rutas
];
export default InspectorRoutes;