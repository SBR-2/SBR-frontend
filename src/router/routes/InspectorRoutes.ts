import { RouteRecordRaw } from 'vue-router';

const InspectorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard-inspector',
    name: 'Dashboard',
    component: () => import('../../components/Inspector/DashboardInspector.vue')
  },
  {
    path: '/lista-productos-inspector',
    name: 'ListaProductosInspector',
    component: () => import('../../components/Inspector/ListaProductosInspector.vue')
  },
  {
    path: '/lista-registros-sanitarios-inspector',
    name: 'ListaRegistroSanitarioInspector',
    component: () => import('../../components/Inspector/ListaRegistroSanitarioInspector.vue')
  },
  {
    path: '/evaluacion-producto/:solicitudId',
    name: 'EvaluacionProductoInspector',
    component: () => import('../../components/Inspector/EvaluacionProductoInspector.vue')
  },
  {
    path: '/evaluacion-registro-sanitario/:solicitudId',
    name: 'EvaluacionRegistroSanitarioInspector',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart1.vue')
  },
  {
    path: '/evaluacion-registro-sanitario-part2/:solicitudId',
    name: 'EvaluacionRegistroSanitarioPart2',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart2.vue')
  },
  {	
    path: '/evaluacion-registro-sanitario-part3/:solicitudId',
    name: 'EvaluacionRegistroSanitarioPart3',
    component: () => import('../../components/Inspector/EvaluacionRegistroSanitarioPart3.vue')
  },
  {
    path:'/prueba',
    name: 'Prueba',
    component: () => import('../../components/Inspector/Prueba.vue')
  }
  
  // ...otras rutas
];
export default InspectorRoutes;