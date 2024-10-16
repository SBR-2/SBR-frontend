<template>
  <div class="container ">
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
    <!-- Tabla para visualizar las solicitudes -->
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
          <tr v-for="solicitud in filteredSolicitudes" :key="solicitud.correo">
            <td>{{ solicitud.nombre }}</td>
            <td>{{ solicitud.correo }}</td>
            <td>{{ solicitud.entidadNombre }}</td>
            <td>{{ solicitud.direccion }}</td>
            <td>{{ formatDate(solicitud.fechaSolicitud) }}</td>
            <td class="acciones-cell">
              <button class="btn btn-edit" @click="asignarInspector(solicitud)">
                Asignar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Cargando datos...</p>
    </div>
    <div v-if="error">
      <p>Error al cargar los datos: {{ error.message }}</p>
    </div>
    <!-- Componente PanelPrincipal -->
    <PanelPrincipal />
  </div>
</template>

<script>
import PanelPrincipal from './panel-principal.vue';
import { ref, watch, computed, defineComponent } from 'vue';
import { gql } from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export default defineComponent({
  components: {
    PanelPrincipal,
  },
  setup() {
    const searchTerm = ref('');

    // Definir la consulta GraphQL ajustada
    const GET_SOLICITUDES = gql`
  query getSolicitudes {
    fichas {
      items {
        solicitud {
          fechaCreacion
          usuario {
            usuarioId
            nombre
            correo
            entidad {
              nombre
              direccion
            }
          }
        }
        inspector {
          estado
          nombre
        }
      }
    }
  }
`;

    // Ejecutar la consulta con useQuery
    const { result, loading, error, onError } = useQuery(GET_SOLICITUDES);

    // Manejar errores en la consulta
    onError((e) => {
      console.error('Error en la consulta GraphQL:', e);
    });

    // Definir una variable reactiva para almacenar las solicitudes
    const solicitudes = ref([]);

    // Observar los cambios en 'result' para actualizar 'solicitudes'
    watch(
  () => result.value,
  (newValue) => {
    if (newValue && newValue.fichas && newValue.fichas.items) {
      solicitudes.value = newValue.fichas.items
        .map((ficha) => {
          const solicitud = ficha.solicitud;
          const usuario = solicitud.usuario;
          if (usuario) {
            return {
              nombre: usuario.nombre,
              correo: usuario.correo,
              entidadNombre: usuario.entidad?.nombre || 'Sin entidad',
              direccion: usuario.entidad?.direccion || 'Sin dirección',
              fechaSolicitud: solicitud.fechaCreacion,
            };
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
    }
  },
  { immediate: true }
)

    // Computed para filtrar las solicitudes
    const filteredSolicitudes = computed(() => {
      if (!searchTerm.value) {
        return solicitudes.value;
      }
      return solicitudes.value.filter((solicitud) => {
        const term = searchTerm.value.toLowerCase();
        return (
          solicitud.nombre.toLowerCase().includes(term) ||
          solicitud.correo.toLowerCase().includes(term) ||
          solicitud.entidadNombre.toLowerCase().includes(term) ||
          solicitud.direccion.toLowerCase().includes(term)
        );
      });
    });

    // Función para formatear la fecha
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para asignar inspector
    const asignarInspector = (solicitud) => {
      // Lógica para asignar un inspector a la solicitud
      console.log('Asignar inspector a:', solicitud.nombre);
      // Aquí puedes abrir un modal o desplegar un dropdown para seleccionar el inspector
    };

    return {
      searchTerm,
      solicitudes,
      filteredSolicitudes,
      loading,
      error,
      formatDate,
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
