<template>
  <div>
    <div class="container">
      <h5 class="m-5 d-flex dashboard-title">Dashboard</h5>

      <div class="row mb-4">
        <div class="col-md-6 border-end">
          <h6 class="mb-5 d-flex fw-bolder">Inspecciones</h6>
          <div class="row g-3">
            <div class="col-6">
              <div class="card small-card text-bg-success">
                <div class="card-body h-100 d-flex align-items-center">
                  <img :src="('/activo.svg')" alt="Activo Logo" class="me-5" style="width: 50px; height: 50px;" />
                  <div>
                    <span class="status-number fs-2">{{ completadosCount }}</span>
                    <span class="d-block">Completados</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="card small-card text-bg-danger">
                <div class="card-body h-100 d-flex align-items-center">
                  <img :src="('/Faltantes.svg')" alt="Inactivo Logo" class="me-5" style="width: 50px; height: 50px;" />
                  <div>
                    <span class="status-number fs-2">{{ faltanteCount }}</span>
                    <span class="d-block">Faltantes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="col-6">
            <div class="total card small-card text-bg-secondary">
              <div class="card-body h-100 d-flex align-items-center">
                <img :src="('/bookmark.svg')" alt="Espera Logo" class="me-5" style="width: 50px; height: 50px;" />
                <div>
                  <span class="status-number fs-2">{{ totalCount }}</span>
                  <span class="d-block">TOTAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-5" />

      <div v-if="!loading">
        <table>
          <thead>
            <tr>
              <th>Marca del Producto</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Dirección de la Fábrica</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inspeccion in notificaciones" :key="inspeccion.solicitudId">
              <td>{{ inspeccion.producto.marca }}</td>
              <td>{{ inspeccion.producto.nombre }}</td>
              <td>{{ inspeccion.producto.riesgoSubcategoria.riesgoCategoria.riesgoCategoria }}</td>
              <td>{{ inspeccion.producto.productoEntidads[0]?.entidad.direccion }}</td>
              <td class="acciones-cell">
                <button class="btn btn-completar" @click="irAFormulario(inspeccion)">Completar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="error">
        <p>Error al cargar los datos: {{ error.message }}</p>
      </div>
      <div v-else>
        <p>Cargando datos...</p>
      </div>
    </div>

    <inspectorpanelprincipal />
  </div>
</template>


<script>
import inspectorpanelprincipal from "./inspector-panelprincipal.vue";
import { ref } from "vue";
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";

const GET_INSPECCIONES = gql
  `query inspector {
    fichas {
      items {
        solicitud {
          producto {
            marca
            nombre
            riesgoSubcategoria {
              riesgoCategoriaId
              riesgoCategoria {
                riesgoCategoria
              }
            }
            productoEntidads {
              entidad {
                direccion
              }
              relacion {
                relacionId
                relacionTipo
              }
            }
          }
          solicitudId
        }
        estado
      }
    }
  }`
;

export default {
  components: {
    inspectorpanelprincipal,
  },
  setup() {
    const completadosCount = ref(0);
    const faltanteCount = ref(0);
    const totalCount = ref(0);
    const notificaciones = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

    // Ejecutamos el query usando useQuery de Apollo
    const { result, refetch, onResult, onError } = useQuery(GET_INSPECCIONES);

    // Procesa las inspecciones recibidas desde el query
    const processInspecciones = (inspecciones) => {
      console.log('Inspecciones para procesar:', inspecciones); // Debug

      if (!Array.isArray(inspecciones)) return;

      completadosCount.value = inspecciones.filter((i) => i.estado === false).length;
      faltanteCount.value = inspecciones.filter((i) => i.estado === true).length;
      totalCount.value = inspecciones.length;

      notificaciones.value = inspecciones;
    };

    // Maneja los resultados del query
    onResult((queryResult) => {
  console.log('Datos recibidos:', queryResult.data); // Debug

  if (queryResult.data && queryResult.data.fichas && queryResult.data.fichas.items) {
    const todasInspecciones = queryResult.data.fichas.items.map((item) => ({
      estado: item.estado,
      solicitudId: item.solicitud.solicitudId,
      producto: item.solicitud.producto,
    }));

    console.log('Todas las inspecciones:', todasInspecciones); // Debug para revisar todas las inspecciones

    // Procesamos el conteo de estados
    processInspecciones(todasInspecciones);

    // Filtramos solo las inspecciones con estado === true para la tabla
    notificaciones.value = todasInspecciones.filter((i) => i.estado === true);
  }

  loading.value = false; // Marcamos como cargado
});


    // Maneja errores en el query
    onError((err) => {
      console.error('Error al cargar las inspecciones:', err);
      error.value = err;
      loading.value = false;
    });

    // Navega al formulario cuando se hace clic en el botón
    const irAFormulario = (inspeccion) => {
      router.push({ name: 'Formulario', params: { solicitudId: inspeccion.solicitudId } });
    };

    return {
      completadosCount,
      faltanteCount,
      totalCount,
      notificaciones,
      loading,
      error,
      irAFormulario,
    };
  },
};
</script>

<style scoped>
.container {
  margin-left: 8%;
  margin-top: 1%;
}

.container-fluid {
  padding-right: 1px;
}

.dashboard-title {
  font-size: 1.75rem;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.status-number {
  font-size: 2rem;
  font-weight: bold;
}

.card-body {
  padding: 10px;
}

.total{
  margin-top: 23%;
}

.small-card {
  height: 120px;
  width: 100%;
}

.list-unstyled li {
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.acciones-cell {
  display: flex;
  justify-content: center;
  align-items: center;
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
.btn-completar {
  background-color: #007bff;  /* Color azul */
  color: white;  /* Texto en blanco */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-completar:hover {
  background-color: #0056b3;  /* Cambia de color al pasar el mouse */
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