<template>
  <AdminSidebarLayout>
    <template v-slot:contents>
  <div class="container">
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

    <!-- Manejo de estados de carga y error para fichas e inspectores -->
    <div v-if="loadingFichas || loadingInspectores">
      <p>Cargando datos...</p>
    </div>
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
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredSolicitudes.length === 0">
            <td colspan="7" class="text-center">No hay fichas sin asignar</td>
          </tr>
          <tr
            v-else
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
              <select
                v-model="solicitud.selectedInspectorId"
                @change="asignarInspector(solicitud)"
                :disabled="solicitud.isAssigning"
              >
                <option disabled value="">
                  {{ solicitud.inspectorId ? 'Cambiar Inspector' : 'Asignar Inspector' }}
                </option>
                <option
                  v-for="inspector in inspectores.filter(i => i.estado === 'true')"
                  :key="inspector.usuarioId"
                  :value="inspector.usuarioId"
                >
                  {{ inspector.nombre }}
                </option>
              </select>
              <span v-if="solicitud.isAssigning" class="loading-text">
                Asignando...
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    </template>
  </AdminSidebarLayout>
</template>

<script>
import AdminSidebarLayout from '../ui/layouts/AdminSidebarLayout.vue';
import { ref, watch, computed, defineComponent } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';
import { GET_FICHAS_USUARIO, GET_ALL_INSPECTORES } from '../../controllers/graphql/queries/adminQueries';
import { UPDATE_FICHA } from '../../controllers/graphql/mutations/admin/adminMutations';

export default defineComponent({
  components: {
    AdminSidebarLayout,
  },
  setup() {
    const searchTerm = ref('');
    const toast = useToast();

    // Consulta para obtener fichas
    const {
      result: resultFichas,
      loading: loadingFichas,
      error: errorFichas,
      refetch: refetchFichas,
    } = useQuery(GET_FICHAS_USUARIO);

    // Consulta para obtener todos los inspectores
    const {
      result: resultInspectores,
      loading: loadingInspectores,
      error: errorInspectores,
    } = useQuery(GET_ALL_INSPECTORES);

    const solicitudes = ref([]);
    const inspectores = ref([]);

    // Definir la mutación para actualizar una ficha
    const { mutate: updateFicha } = useMutation(UPDATE_FICHA, {
      onCompleted: () => {
        // Refrescar la consulta después de la mutación
        refetchFichas();
        toast.success('Inspector asignado correctamente.');
      },
      onError: (mutationError) => {
        // Error se maneja en la función asignarInspector
        console.error(mutationError);
      },
    });

    // Manejar errores de fichas
    watch(
      () => errorFichas.value,
      (newError) => {
        if (newError) {
          toast.error(`Error al cargar fichas: ${newError.message}`);
        }
      }
    );

    // Manejar errores de inspectores
    watch(
      () => errorInspectores.value,
      (newError) => {
        if (newError) {
          toast.error(`Error al cargar inspectores: ${newError.message}`);
        }
      }
    );

    // Procesar los resultados de las consultas de fichas
    watch(
      () => resultFichas.value,
      (newValue) => {
        if (newValue && newValue.fichas && newValue.fichas.items) {
          console.log('Fichas recibidas:', newValue.fichas.items); // Log para depuración
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
                  inspectorId: ficha.inspectorId || null,
                  inspector: ficha.inspector || null,
                  selectedInspectorId: ficha.inspectorId || '',
                  isAssigning: false, // Inicializar el estado de asignación
                };
              } else {
                return null;
              }
            })
            .filter((item) => item !== null);
          console.log('Solicitudes procesadas:', solicitudes.value); // Log para depuración
        }
      },
      { immediate: true }
    );

    // Procesar los resultados de las consultas de inspectores
    watch(
      () => resultInspectores.value,
      (newValue) => {
        if (newValue && newValue.usuarios && newValue.usuarios.items) {
          inspectores.value = newValue.usuarios.items;
          console.log('Inspectores recibidos:', inspectores.value); // Log para depuración
        }
      },
      { immediate: true }
    );

    // Computed para filtrar las solicitudes
    const filteredSolicitudes = computed(() => {
      return solicitudes.value
        .filter(solicitud => !solicitud.inspectorId) // Exclude assigned requests
        .filter(solicitud => solicitudMatchesSearch(solicitud)); // Apply the search filter
    });

    const solicitudMatchesSearch = (solicitud) => {
      if (!searchTerm.value) {
        return true;
      }
      const term = searchTerm.value.toLowerCase();
      return (
        solicitud.nombre.toLowerCase().includes(term) ||
        solicitud.correo.toLowerCase().includes(term) ||
        solicitud.entidadNombre.toLowerCase().includes(term) ||
        solicitud.direccion.toLowerCase().includes(term) ||
        solicitud.productoNombre.toLowerCase().includes(term)
      );
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para asignar el inspector seleccionado a la ficha
    const asignarInspector = async (solicitud) => {
      if (!solicitud.selectedInspectorId) {
        toast.error('Por favor, seleccione un inspector.');
        return;
      }

      solicitud.isAssigning = true;

      const updateFichaInput = {
        fichaId: solicitud.fichaId,
        inspectorId: parseInt(solicitud.selectedInspectorId),
      };

      try {
        await updateFicha({
          input: updateFichaInput,
        });
      } catch (err) {
        toast.error(`Error al asignar inspector: ${err.message}`);
        console.error('Mutation error:', err);
      } finally {
        solicitud.isAssigning = false;
      }
    };

    return {
      searchTerm,
      solicitudes,
      filteredSolicitudes,
      loadingFichas,
      loadingInspectores,
      formatDate,
      inspectores,
      asignarInspector,
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
.acciones-cell select {
  background-color: #0069d9; /* Azul */
  color: white; /* Color del texto */
  border: none;
  padding: 5px;
  border-radius: 4px;
  appearance: none; /* Quitar el estilo por defecto para un mejor aspecto */
}

.acciones-cell select:focus {
  outline: none;
  box-shadow: 0 0 5px #0056b3; /* Añadir un efecto al seleccionar */
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