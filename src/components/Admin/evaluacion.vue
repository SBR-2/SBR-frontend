<template>
  <AdminSidebarLayout>
    <template v-slot:contents>
  <div class="container">
    <div>
      <div class="user-list-container">
        <h4 class="titulo d-flex">Asignación Evaluación</h4>
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar"
          class="search-bar"
        />
      </div>
    </div>
    <div v-if="!loading">
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
          <tr v-if="filteredSolicitudes.length === 0">
            <td colspan="7" class="text-center">No hay fichas sin asignar</td>
          </tr>
          <tr
            v-else
            v-for="solicitud in filteredSolicitudes"
            :key="solicitud.solicitudId"
          >
            <td>{{ solicitud.producto.usuario.nombre }}</td>
            <td>{{ solicitud.producto.usuario.correo }}</td>
            <td>{{ solicitud.producto.usuario.entidad.nombre }}</td>
            <td>{{ solicitud.producto.usuario.entidad.direccion }}</td>
            <td>{{ solicitud.producto.nombre }}</td>
            <td>{{ formatDate(solicitud.fechaCreacion) }}</td>
            <td class="acciones-cell">
              <select
                v-model="selectedEvaluador[solicitud.solicitudId]"
                @change="asignarEvaluador(solicitud)"
                :disabled="solicitud.isAssigning"
              >
                <option disabled value="">
                  {{
                    solicitud.evaluadorId
                      ? "Cambiar Evaluador"
                      : "Seleccionar Evaluador"
                  }}
                </option>
                <option
                  v-for="evaluador in evaluadores.filter((e) => e.estado === 'true')"
                  :key="evaluador.usuarioId"
                  :value="evaluador.usuarioId"
                >
                  {{ evaluador.nombre }}
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
import { ref, computed, watch } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import AdminSidebarLayout from "../ui/layouts/AdminSidebarLayout.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    AdminSidebarLayout,
  },
  setup() {
    const toast = useToast();
    const searchTerm = ref("");
    const selectedEvaluador = ref({});
    const isUpdating = ref(false);
    const localSolicitudes = ref([]); // Nueva ref para manejar las solicitudes localmente

    // Consulta para obtener solicitudes
    const SOLICITUDES_QUERY = gql`
     query evaluador {
  solicituds(
    where: {  and: { evaluador: { eq: null } } }
  ) {
    items {
      solicitudId
      producto {
        nombre
        usuario {
          correo
          nombre
          entidad {
            direccion
            nombre
          }
        }
      }
      fechaCreacion
      estado
      evaluador
    }
  }
}
    `;

    const { result: solicitudesResult, loading } = useQuery(SOLICITUDES_QUERY);

    // Actualizar localSolicitudes cuando se obtengan los resultados
    watch(solicitudesResult, (newResult) => {
      if (newResult?.solicituds?.items) {
        localSolicitudes.value = [...newResult.solicituds.items];
      }
    });

    // Consulta para obtener evaluadores
    const EVALUADORES_QUERY = gql`
      query verEvaluador {
        usuarios(where: { rolId: { eq: "4" } }) {
          items {
            usuarioId
            nombre
            estado
          }
        }
      }
    `;

    const { result: evaluadoresResult } = useQuery(EVALUADORES_QUERY);
    const evaluadores = computed(
      () => evaluadoresResult.value?.usuarios.items || []
    );

    // Mutación para asignar evaluador
    const UPDATE_SOLICITUD_MUTATION = gql`
      mutation asignarEvaluador($evaluadorId: Int!, $solicitudId: Int!) {
        asignarEvaluadorASolicitud(
          input: { solicitudInput: { evaluadorId: $evaluadorId, solicitudId: $solicitudId } }
        ) {
          solicitud {
            solicitudId
            evaluador
            estado
            fechaCreacion
            riesgoTotal
            observaciones
          }
        }
      }
    `;

    const { mutate: asignarEvaluadorASolicitud } = useMutation(
      UPDATE_SOLICITUD_MUTATION
    );

    // Función para actualizar solicitud con evaluador
    const updateSolicitud = async ({ evaluadorId, solicitudId }) => {
  isUpdating.value = true;
  try {
    const response = await asignarEvaluadorASolicitud({ evaluadorId, solicitudId });
    console.log("Respuesta de la mutación:", response);
    
    if (response?.data?.asignarEvaluadorASolicitud) {
      toast.success("Evaluador asignado correctamente!");
      localSolicitudes.value = localSolicitudes.value.filter(
        (s) => s.solicitudId !== solicitudId
      );
      return true;
    } else {
      throw new Error("No se pudo asignar el evaluador.");
    }
  } catch (error) {
    console.error("Error al asignar evaluador:", error);
    toast.error("Error al asignar evaluador.");
    return false;
  } finally {
    isUpdating.value = false;
  }
};

    // Filtro para las solicitudes
    const filteredSolicitudes = computed(() => {
      return localSolicitudes.value.filter(
        (solicitud) =>
          solicitud.producto.nombre
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          solicitud.producto.usuario.nombre
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          solicitud.producto.usuario.correo
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          solicitud.producto.usuario.entidad.nombre
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase())
      );
    });

    // Watch para manejar el estado de selección de evaluador
    watch(
      localSolicitudes,
      (newSolicitudes) => {
        newSolicitudes.forEach((solicitud) => {
          if (!(solicitud.solicitudId in selectedEvaluador.value)) {
            selectedEvaluador.value[solicitud.solicitudId] = "";
          }
        });
      },
      { immediate: true }
    );

    // Función que se ejecuta cuando se selecciona un evaluador
    const asignarEvaluador = async (solicitud) => {
  const evaluadorId = selectedEvaluador.value[solicitud.solicitudId];
  if (evaluadorId) {
    // Crear una copia de la solicitud para poder modificarla
    const solicitudModificada = { ...solicitud, isAssigning: true };
    
    const success = await updateSolicitud({
      evaluadorId,
      solicitudId: solicitud.solicitudId,
    });

    if (success) {
      solicitudModificada.isAssigning = false;
    } else {
      solicitudModificada.isAssigning = false;
    }
  }
};

    // Formatear la fecha para mostrar en el formato correcto
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    return {
      searchTerm,
      loading,
      filteredSolicitudes,
      evaluadores,
      selectedEvaluador,
      asignarEvaluador,
      formatDate,
      isUpdating,
    };
  },
};
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

.custom-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-button {
  background-color: #0069d9;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 14px;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100%;
}

.dropdown-item {
  color: #0069d9;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
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