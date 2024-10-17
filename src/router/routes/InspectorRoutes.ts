import { RouteRecordRaw } from 'vue-router';

const InspectorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../../components/Inspector/DashboardInspector.vue')
  },
  {
    path: '/lista-productos',
    name: 'ListaProductosInspector',
    component: () => import('../../components/Inspector/ListaProductosInspector.vue')
  },
  {
    path: '/lista-registros-sanitarios',
    name: 'ListaRegistroSanitarioInspector',
    component: () => import('../../components/Inspector/ListaRegistroSanitarioInspector.vue')
  },
  {
    path: '/evaluacion-producto/:solicitudId',
    name: 'EvaluacionProductoInspector',
    component: () => import('../../components/Inspector/EvaluacionProductoInspector.vue')
  },
  {
    path: '/evaluacion-registro-sanitario',
    name: 'EvaluacionRegistroSanitarioInspector',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart1.vue')
  },
  {
    path: '/evaluacion-registro-sanitario-part2',
    name: 'EvaluacionRegistroSanitarioPart2',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart2.vue')
  },
  {	
    path: '/evaluacion-registro-sanitario-part3',
    name: 'EvaluacionRegistroSanitarioPart3',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart3.vue')
  },
  
  // ...otras rutas
];
export default InspectorRoutes;