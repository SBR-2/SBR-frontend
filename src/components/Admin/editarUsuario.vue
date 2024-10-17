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
    <!-- Manejo de estados de carga y error para fichas e inspectores -->
    <div v-if="loadingFichas || loadingInspectores">
      <p>Cargando datos...</p>
    </div>
    <div v-else-if="errorFichas || errorInspectores">
      <p>
        Error al cargar los datos:
        {{ errorFichas?.message || errorInspectores?.message }}
      </p>
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
              <select
                v-model="solicitud.selectedInspectorId"
                @change="asignarInspector(solicitud)"
                :disabled="solicitud.isAssigning"
              >
                <option disabled value="">
                  {{ solicitud.inspectorId ? 'Cambiar Inspector' : 'Asignar Inspector' }}
                </option>
                <option
                  v-for="inspector in inspectores"
                  :key="inspector.inspectorId"
                  :value="inspector.inspectorId"
                >
                  {{ inspector.correo }} - {{ inspector.estado }}
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
    <!-- Componente PanelPrincipal -->
    <PanelPrincipal />
  </div>
</template>

<script>
import PanelPrincipal from './panel-principal.vue';
import { ref, watch, computed, defineComponent } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';

// Consulta para obtener fichas
const GET_FICHAS_INSPECTORES = gql`
  query inspector {
    fichas(skip: null, take: null, where: {}, order: null) {
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

// Consulta para obtener todos los inspectores
const GET_ALL_INSPECTORES = gql`
  query getAllInspectores {
    inspectores {
      inspectorId
      correo
      estado
      rolId
      usuarioId
      nombre
    }
  }
`;

// Mutación para actualizar una ficha
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
    const toast = useToast();

    // Consulta para obtener fichas
    const {
      result: resultFichas,
      loading: loadingFichas,
      error: errorFichas,
      refetch: refetchFichas,
    } = useQuery(GET_FICHAS_INSPECTORES);

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
        // Manejar errores globalmente si es necesario
        console.error(mutationError);
      },
    });

    // Procesar los resultados de las consultas
    watch(
      () => resultFichas.value,
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
                  selectedInspectorId: ficha.inspectorId || '',
                  isAssigning: false,
                };
              } else {
                return null;
              }
            })
            .filter((item) => item !== null);
        }
      },
      { immediate: true }
    );

    watch(
      () => resultInspectores.value,
      (newValue) => {
        if (newValue && newValue.inspectores) {
          inspectores.value = newValue.inspectores;
        }
      },
      { immediate: true }
    );

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

    // Función para asignar el inspector seleccionado a la ficha
    const asignarInspector = async (solicitud) => {
      if (!solicitud.selectedInspectorId) {
        toast.error('Por favor, seleccione un inspector.');
        return;
      }

      solicitud.isAssigning = true;

      const input = {
        inspectorId: parseInt(solicitud.selectedInspectorId),
        aprobadorId: null,
        calificacion: null,
        evaluadorId: null,
        fechaAprobacion: null,
        fechaRevision: null,
        fichaId: solicitud.fichaId,
        matizRiesgo: null,
        revisorId: null,
      };

      try {
        await updateFicha({ variables: { input } });
        // La notificación de éxito ya se maneja en onCompleted
      } catch (err) {
        // Mostrar error usando Toast
        toast.error(`Error al asignar inspector: ${err.message}`);
        console.error(err);
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
      errorFichas,
      errorInspectores,
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
h2 {
  font-weight: 500;
  margin-bottom: 20px;
}
.form-label {
  font-weight: 500;
  color: #333;
}
input,
select {
  background-color: #f1f1f1;
}
input::placeholder {
  color: #bbb;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
}
</style>