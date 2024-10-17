<template>
  <div class="container">
    <div>
      <div class="user-list-container">
        <h4 class="titulo d-flex">Asignación Inspección</h4>
        <!-- Barra de búsqueda -->
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar"
          class="search-bar"
        />
      </div>
    </div>
    <!-- Manejo de estados de carga y error -->
    <div v-if="loading">
      <p>Cargando datos...</p>
    </div>
    <div v-else-if="error">
      <p>Error al cargar los datos: {{ error.message }}</p>
    </div>
    <!-- Tabla para visualizar las solicitudes -->
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Empresa</th>
            <th>Dirección</th>
            <th>Producto</th>
            <th>Fecha de Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="solicitud in filteredSolicitudes"
            :key="solicitud.fichaId"
          >
            <td>{{ solicitud.nombre }}</td>
            <td>{{ solicitud.correo }}</td>
            <td>{{ solicitud.entidadNombre }}</td>
            <td>{{ solicitud.direccion }}</td>
            <td>{{ solicitud.productoNombre }}</td>
            <td>{{ formatDate(solicitud.fechaSolicitud) }}</td>
            <td class="acciones-cell">
              <button
                class="btn btn-edit"
                @click="openAsignarInspectorModal(solicitud)"
              >
                Asignar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Componente PanelPrincipal -->
    <PanelPrincipal />

    <!-- Modal para asignar inspector -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Asignar Inspector</h3>
        <select v-model="selectedInspectorId">
          <option disabled value="">Seleccione un inspector</option>
          <option
            v-for="inspector in inspectores"
            :key="inspector.inspectorId"
            :value="inspector.inspectorId"
          >
            {{ inspector.inspector.correo }} - {{ inspector.inspector.estado }}
          </option>
        </select>
        <div class="modal-actions">
          <button @click="asignarInspector">Asignar</button>
          <button @click="closeModal">Cancelar</button>
        </div>
        <div v-if="mutationError" class="error">
          Error al asignar inspector: {{ mutationError.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelPrincipal from './panel-principal.vue';
import { ref, watch, computed, defineComponent } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

// Definir la consulta GraphQL para obtener fichas e inspectores
const GET_FICHAS_INSPECTORES = gql`
  query inspector {
    fichas(skip: null, take: null, where: { }, order: null) {
      items {
        fichaId
        solicitud {
          fechaCreacion
          producto {
            nombre
            usuario {
              nombre
              correo
              entidad {
                nombre
                direccion
              }
            }
          }
        }
        inspectorId
        inspector {
          correo
          estado
          rolId
          usuarioId
          nombre
        }
      }
    }
  }
`;

// Definir la mutación GraphQL para actualizar una ficha
const UPDATE_FICHA = gql`
  mutation updateFicha($input: UpdateFichaInput!) {
    updateFicha(input: $input) {
      ficha {
        estado
        fichaId
        inspectorId
        inspector {
          estado
          nombre
        }
      }
    }
  }
`;

export default defineComponent({
  components: {
    PanelPrincipal,
  },
  setup() {
    const searchTerm = ref('');
    const showModal = ref(false);
    const selectedSolicitud = ref(null);
    const selectedInspectorId = ref('');

    // Consulta para obtener fichas e inspectores
    const { result, loading, error, refetch } = useQuery(GET_FICHAS_INSPECTORES);
    const solicitudes = ref([]);
    const inspectores = ref([]);

    watch(
      () => result.value,
      (newValue) => {
        if (newValue && newValue.fichas && newValue.fichas.items) {
          solicitudes.value = newValue.fichas.items
            .map((ficha) => {
              const solicitud = ficha.solicitud;
              const usuario = solicitud.producto.usuario;
              const producto = solicitud.producto;
              if (usuario) {
                return {
                  fichaId: ficha.fichaId,
                  nombre: usuario.nombre,
                  correo: usuario.correo,
                  entidadNombre: usuario.entidad?.nombre || 'Sin entidad',
                  direccion: usuario.entidad?.direccion || 'Sin dirección',
                  fechaSolicitud: solicitud.fechaCreacion,
                  productoNombre: producto?.nombre || 'Sin producto',
                  inspectorId: ficha.inspectorId,
                  inspector: ficha.inspector,
                };
              } else {
                return null;
              }
            })
            .filter((item) => item !== null);

          // Extraer inspectores únicos
          const uniqueInspectors = {};
          solicitudes.value.forEach((solicitud) => {
            if (solicitud.inspector) {
              uniqueInspectors[solicitud.inspectorId] = solicitud.inspector;
            }
          });
          inspectores.value = Object.keys(uniqueInspectors).map((id) => ({
            inspectorId: parseInt(id),
            inspector: uniqueInspectors[id],
          }));
        }
      },
      { immediate: true }
    );

    // Definir la mutación para actualizar una ficha
    const {
      mutate: updateFicha,
      onDone: onUpdateDone,
      onError: onUpdateError,
      loading: mutationLoading,
      error: mutationError,
    } = useMutation(UPDATE_FICHA, {
      onCompleted: () => {
        // Refrescar la consulta después de la mutación
        refetch();
        closeModal();
      },
    });

    // Computed para filtrar las solicitudes
    const filteredSolicitudes = computed(() => {
      if (!searchTerm.value) {
        return solicitudes.value;
      }
      const term = searchTerm.value.toLowerCase();
      return solicitudes.value.filter((solicitud) => {
        return (
          solicitud.nombre.toLowerCase().includes(term) ||
          solicitud.correo.toLowerCase().includes(term) ||
          solicitud.entidadNombre.toLowerCase().includes(term) ||
          solicitud.direccion.toLowerCase().includes(term) ||
          solicitud.productoNombre.toLowerCase().includes(term)
        );
      });
    });

    // Función para formatear la fecha
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para abrir el modal de asignación de inspector
    const openAsignarInspectorModal = (solicitud) => {
      selectedSolicitud.value = solicitud;
      selectedInspectorId.value = solicitud.inspectorId || '';
      showModal.value = true;
    };

    // Función para cerrar el modal
    const closeModal = () => {
      showModal.value = false;
      selectedSolicitud.value = null;
      selectedInspectorId.value = '';
    };

    // Función para asignar el inspector seleccionado a la ficha
    const asignarInspector = () => {
      if (!selectedInspectorId.value) {
        alert('Por favor, seleccione un inspector.');
        return;
      }
      if (!selectedSolicitud.value) {
        alert('Solicitud no válida.');
        return;
      }

      const input = {
        inspectorId: parseInt(selectedInspectorId.value),
        aprobadorId: null,
        calificacion: null,
        evaluadorId: null,
        fechaAprobacion: null,
        fechaRevision: null,
        fichaId: selectedSolicitud.value.fichaId,
        matizRiesgo: null,
        revisorId: null,
      };

      updateFicha({ input });
    };

    return {
      searchTerm,
      solicitudes,
      filteredSolicitudes,
      loading,
      error,
      formatDate,
      openAsignarInspectorModal,
      showModal,
      inspectores,
      selectedInspectorId,
      asignarInspector,
      closeModal,
      mutationError,
      mutationLoading,
    };
  },
});
</script>

<style scoped>
.container {
  margin-left: 8%;
  margin-top: 10%;
}
.titulo {
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Estilos para la barra de búsqueda */
.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #d9e9f8;
  font-size: 16px;
  color: black;
}

.search-bar::placeholder {
  color: #888;
  opacity: 1; /* Asegura que el placeholder sea visible en todos los navegadores */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

thead {
  background-color: #0069d9;
}

th {
  padding: 12px;
  border: 1px solid #ddd;
  color: white;
  text-align: left;
}

td {
  padding: 12px;
  border: 1px solid #ddd;
  vertical-align: middle;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

p {
  text-align: center;
  font-size: 18px;
  color: #555;
}

/* Estilos para los botones */
.btn {
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.btn-edit {
  background-color: #0b5ed7;
  margin-right: 5px;
}

.btn-edit:hover {
  background-color: #0056b3;
}

/* Alineación de botones en la celda de acciones */
.acciones-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  th,
  td {
    padding: 8px;
  }

  h1 {
    font-size: 24px;
  }

  .btn {
    padding: 4px 8px;
    font-size: 12px;
  }

  .search-bar {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
