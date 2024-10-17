<template>
  <div class="app-container">
    <SidebarInspector />
    <div class="main-content">
      <HeaderInspector @toggle-sidebar="toggleSidebar" />
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
                <th>Correo</th>
                <th>Fecha</th>
                <th>Evaluar</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr>
                  <td colspan="4" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Cargando...</span>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="solicitud in solicitudes" :key="solicitud.solicitudId">
                  <td>{{ solicitud.producto.usuario.entidad.nombre }}</td>
                  <td>{{ solicitud.producto.usuario.nombre }}</td>
                  <td>{{ solicitud.producto.usuario.correo }}</td>
                  <td>{{ solicitud.fechaCreacion }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm" @click="evaluar(solicitud.solicitudId)">Evaluar</button>
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
import HeaderInspector from './HeaderInspector.vue';
import SidebarInspector from './SideBarInspector.vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export default {
  components: {
    HeaderInspector,
    SidebarInspector
  },
  setup() {
    // Definir el query GraphQL
    const GET_SOLICITUD = gql`
      query GET_EVALUACIONPRODUCTO {
      solicituds(where: { estado: { eq: "en proceso" } }) {
        items {
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
    }   `;

    // Usar el hook de Apollo para hacer la query
    const { result, loading, error } = useQuery(GET_SOLICITUD);

    return {
      solicitudes: result?.value?.solicituds?.items || [],
      loading,
      error
    };
  },
  methods: {
    evaluar(id) {
      console.log(`Evaluando solicitud con ID: ${id}`);
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
}
</script>

<style scoped>
/* Estilos mantenidos */
.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 100px; /* Ancho del sidebar */
  padding-top: 60px; /* Altura del header */
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
