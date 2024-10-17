<template>
  <div class="app-container">
    <SidebarInspector />
    <div class="main-content">
      <HeaderInspector @toggle-sidebar="toggleSidebar" />
      <h2 class="mb-4">Registro Sanitario</h2>
      <div class="search-container mb-4">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Buscar Producto" />
        <button @click="searchProducts" class="btn btn-primary">Buscar</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Empresa</th>
              <th>Correo</th>
              <th>Fecha</th>
              <th>Evaluar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center">Cargando...</td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="text-center text-danger">Error: {{ error.message }}</td>
            </tr>
            <template v-else>
              <tr v-for="solicitud in filteredSolicitudes" :key="solicitud.solicitudId">
                <td>{{ solicitud.producto.nombre }}</td>
                <td>{{ solicitud.producto.usuario.entidad.nombre }}</td>
                <td>{{ solicitud.producto.usuario.correo }}</td>
                <td>{{ formatDate(solicitud.fechaCreacion) }}</td>
                <td>
                  <button class="btn btn-primary" @click="evaluar(solicitud.solicitudId)">Evaluar</button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import HeaderInspector from './HeaderInspector.vue';
import SidebarInspector from './SideBarInspector.vue';

export default defineComponent({
  components: {
    HeaderInspector,
    SidebarInspector
  },
  setup() {
    const searchQuery = ref('');
    const sidebarVisible = ref(true);

    const GET_LISTA = gql`
      query GET_LISTA {
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
            solicitudId
          }
        }
      }
    `;

    const { result, loading, error } = useQuery(GET_LISTA);

    const solicitudes = computed(() => result.value?.solicituds?.items || []);

    const filteredSolicitudes = computed(() => {
      if (searchQuery.value) {
        return solicitudes.value.filter(item =>
          item.producto.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return solicitudes.value;
    });

    const evaluar = (id) => {
      console.log(`Evaluando solicitud con ID: ${id}`);
      // Implementar lógica de evaluación aquí
    };

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const searchProducts = () => {
      console.log('Realizando búsqueda:', searchQuery.value);
      // La búsqueda ya está implementada en el computed property filteredSolicitudes
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return {
      searchQuery,
      filteredSolicitudes,
      loading,
      error,
      evaluar,
      toggleSidebar,
      searchProducts,
      formatDate
    };
  }
});
</script>

<style scoped>
.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 80px; /* Ancho del sidebar */
  padding-top: 60px; /* Altura del header */
}

.search-container {
  display: flex;
  gap: 10px;
}

.search-container input {
  flex-grow: 1;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
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