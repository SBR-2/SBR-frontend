<template>
  <div class="app-container">
    <SidebarEvaluador />
    <div class="main-content">
      <HeaderEvaluador @toggle-sidebar="toggleSidebar" />
      <div class="evaluaciones-container">
        <div class="header">
          <h4 class="mb-3">Solicitudes Asignadas</h4>
          <div class="pendientes-box mb-4">
            <h3 class="pendientes-text">{{ solicitudes.length }} Pendientes</h3>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Evaluar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="5" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Cargando...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="error">
                <td colspan="5" class="text-center py-4 text-danger">
                  Error al cargar solicitudes: {{ error.message }}
                </td>
              </tr>
              <template v-else>
                <tr v-for="solicitud in solicitudes" :key="solicitud.solicitudId">
                  <td>{{ solicitud.producto.usuario.entidad.nombre }}</td>
                  <td>{{ solicitud.producto.nombre }}</td>
                  <td>{{ solicitud.producto.usuario.correo }}</td>
                  <td>{{ formatDate(solicitud.fechaCreacion) }}</td>
                  <td>
                    <router-link :to="{ path: `/evaluacion-producto/${solicitud.solicitudId}` }"
                      class="btn btn-primary">
                      Evaluar
                    </router-link>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import HeaderEvaluador from './HeaderEvaluador.vue';
import SidebarEvaluador from './SideBarEvaluador.vue';

export default defineComponent({
  components: {
    HeaderEvaluador,
    SidebarEvaluador
  },
  setup() {
    const sidebarVisible = ref(true);

    const GET_SOLICITUD = gql`
      query GET_EVALUACIONPRODUCTO {
        solicituds(where: { estado: { eq: "en proceso" } }) {
          items {
            solicitudId
            producto {
              nombre
              usuario {
                entidad {
                  nombre
                }
                correo
              }
            }
            fechaCreacion
            estado
          }
        }
      }
    `;

    const { result, loading, error } = useQuery(GET_SOLICITUD);

    const solicitudes = computed(() => result.value?.solicituds?.items || []);

    const evaluar = (id) => {
      console.log(`Evaluando solicitud con ID: ${id}`);
      // Implementar lógica de evaluación aquí
    };

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return {
      solicitudes,
      loading,
      error,
      evaluar,
      toggleSidebar,
      formatDate
    };
  }
});
</script>

<style scoped>
/* Estilos mantenidos */
.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 100px;
  /* Ancho del sidebar */
  padding-top: 60px;
  /* Altura del header */
}

.evaluaciones-container {
  padding: 20px;
  font-size: 16px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pendientes-box {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px 20px;
  display: inline-block;
}

.pendientes-text {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.table {
  margin-bottom: 0;
}

.table th {
  font-weight: bold;
  color: #292a2b;
  border-top: none;
  border-bottom: 3px solid #161617;
  padding: 12px 80px;
}

.table td {
  padding: 12px 8px;
  border-top: none;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 4px 12px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
