<template>
  <div class="dashboardContainer d-flex">
    <SidebarUser />
    <div class="container">
      <h4>Resumen de registros</h4>

      <!-- Dynamic Header with Indicators -->
      <div class="row mb-4 text-start">
        <div class="col">
          <div class="card cardIndicator bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">{{ approvedCount }} <br /> aprobados</h5>
            </div>
          </div>
        </div>
        <!-- <div class="col">
          <div class="card cardIndicator bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">{{ expiredCount }} <br /> vencidos</h5>
            </div>
          </div>
        </div> -->
        <div class="col">
          <div class="card cardIndicator bg-danger text-white">
            <div class="card-body">
              <h5 class="card-title">{{ rejectedCount }} <br /> rechazados</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardIndicator bg-secondary text-white">
            <div class="card-body">
              <h5 class="card-title">{{ pendingCount }} <br /> pendientes</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Registros Section -->
      <div class="row">
        <div class="col-12">
          <h4>Registros:</h4>
          <router-link to="/user/registro">
            <button
              class="btn btn-primary mb-3 d-flex align-items-center justify-content-center"
            >
              <IconNew class="me-2" />Crear nuevo registro
            </button>
          </router-link>

          <!-- Filters Section
          <div class="filters">
            <div class="row">
              <div class="col-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="showExpired" />
                  <label class="form-check-label" for="showExpired">Mostrar solo vencidos</label>
                </div>
              </div>
              <div class="col-6 text-end">
                <input type="text" class="form-control" placeholder="Buscar por producto" />
              </div>
            </div>
          </div> -->

          <!-- Dynamic Product Cards Grid -->
          <div class="row">
            <div
              v-for="(producto, index) in productos"
              :key="producto.productoId"
              class="col-12 col-md-6 col-lg-4 mb-3"
            >
              <div class="card card-small">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title">{{ producto.nombre }}</h5>
                    <!-- <button class="btn btn-primary" v-if="producto.estado === 'Activo'">Renovar</button> -->
                  </div>
                  <div class="mt-3">
                    <div><strong>Riesgo </strong>{{ producto.riesgoSubcategoria.riesgo.riesgo1 }}</div>
                    <div><strong>Producto: </strong><span class="text-warning">&#9679;</span></div>
                    <div><strong>Establecimiento: </strong><span class="text-success">&#9679;</span></div>
                    <div><strong>General: </strong><span class="text-warning">&#9679;</span></div>
                  </div>
                  <div class="mt-3 text-end">
                    <p>Próxima inspección: 17/10/2023</p>
                    <p>Emisión: 17/10/2023</p>
                    <p>Vencimiento: 17/10/2024</p>
                  </div>
                  <div class="text-start">
                    <!-- <button class="btn btn-outline-secondary"><i class="bi bi-download"></i> Descargar</button> -->
                  </div>
                  <div class="mt-3">
                    <!-- Riesgo Total -->
                    <div>
                      <strong>Riesgo total: </strong>
                      <!-- Punto de color según el riesgo total -->
                      <span
                        class="riesgo-indicator"
                        :class="getRiesgoTotalClass(producto.solicituds[0].riesgoTotal)"
                      >
                        &#9679;
                      </span>
                      {{ getRiesgoTotalLabel(producto.solicituds[0].riesgoTotal) }}
                    </div>
                    
                    <!-- Riesgo Subcategoria -->
                    <div class="mt-2">
                      <strong>Riesgo del producto: </strong>
                      <!-- Punto de color según el riesgo de la subcategoría -->
                      <span
                        class="riesgo-indicator"
                        :class="getRiesgoSubcategoriaClass(producto.riesgoSubcategoria.riesgo.riesgo1)"
                      >
                        &#9679;
                      </span>
                      {{ getRiesgoSubcategoriaLabel(producto.riesgoSubcategoria.riesgo.riesgo1) }}
                    </div>

                    <!-- Mostrar estado solo si tiene solicitudes -->
                    <div v-if="producto.solicituds && producto.solicituds.length > 0" class="mt-2">
                      <strong>Estado de solicitud: </strong>
                      <span 
                        class="estado-indicator"
                        :class="getEstadoClass(producto.solicituds[0].estado)"
                      >
                        &#9679;
                      </span>
                      {{ producto.solicituds[0].estado.toUpperCase() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarUser from "./SidebarUser.vue";
import IconNew from "../icons/IconNew.vue";
import { useProductFormStore } from "../../stores/productFormLogic";

export default {
  name: "Dashboard",
  components: {
    IconNew,
    SidebarUser,
  },
  async setup() {
    const logic = useProductFormStore();
    const productos = await logic.getUserProducts();

    // Filtrar productos que tienen al menos una solicitud
    const productosConSolicitudes = productos.filter(
      (producto) => producto.solicituds && producto.solicituds.length > 0
    );

    // Dynamic counters for the indicators
    const approvedCount = productos.reduce(
      (count, product) => count + product.solicituds.filter(s => s.estado === 'aceptada').length,
      0
    );

    // const expiredCount = productos.reduce(
    //   (count, product) => count + product.solicituds.filter(s => s.estado === 'vencido').length,
    //   0
    // );

    const rejectedCount = productos.reduce(
      (count, product) => count + product.solicituds.filter(s => s.estado === 'rechazada').length,
      0
    );
    const pendingCount = productos.reduce(
      (count, product) => count + product.solicituds.filter(s => s.estado === 'en proceso').length,
      0
    );

    // Function to return the class based on the total risk
    const getRiesgoTotalClass = (riesgoTotal) => {
      if (riesgoTotal === 0) return 'text-secondary'; // Gray for "Por Evaluar"
      if (riesgoTotal > 0 && riesgoTotal <= 3.6) return 'text-success'; // Green for low risk
      if (riesgoTotal > 3.6 && riesgoTotal <= 6.3) return 'text-warning'; // Yellow for medium risk
      if (riesgoTotal > 6.3) return 'text-danger'; // Red for high risk
      return ''; // Default case (no color)
    };

    // Function to return the label based on the total risk
    const getRiesgoTotalLabel = (riesgoTotal) => {
      if (riesgoTotal === 0) return 'POR EVALUAR';
      if (riesgoTotal > 0 && riesgoTotal <= 3.6) return 'BAJO';
      if (riesgoTotal > 3.6 && riesgoTotal <= 6.3) return 'MEDIO';
      if (riesgoTotal > 6.3) return 'ALTO';
      return 'DESCONOCIDO';
    };

    // Function to return the class based on the subcategory risk
    const getRiesgoSubcategoriaClass = (riesgoSubcategoria) => {
      if (riesgoSubcategoria === 'BAJO') return 'text-success'; // Green
      if (riesgoSubcategoria === 'MEDIO') return 'text-warning'; // Yellow
      if (riesgoSubcategoria === 'ALTO') return 'text-danger'; // Red
      return 'text-secondary'; // Default for "Por Evaluar"
    };

    // Function to return the label based on the subcategory risk
    const getRiesgoSubcategoriaLabel = (riesgoSubcategoria) => {
      if (riesgoSubcategoria === 'BAJO') return 'BAJO';
      if (riesgoSubcategoria === 'MEDIO') return 'MEDIO';
      if (riesgoSubcategoria === 'ALTO') return 'ALTO';
      return 'POR EVALUAR';
    };

    // Function to return the class based on the status
    const getEstadoClass = (estado) => {
      if (estado === 'aceptada') return 'text-success'; // Green
      if (estado === 'en proceso') return 'text-warning'; // Yellow
      return 'text-danger'; // Default to red for other statuses
    };

    return { productosConSolicitudes, approvedCount, rejectedCount, pendingCount, getEstadoClass, getRiesgoTotalClass, getRiesgoTotalLabel, getRiesgoSubcategoriaClass, getRiesgoSubcategoriaLabel };
  },
};
</script>

<style scoped>
.dashboardContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
}
.container {
  max-width: 900px;
  margin-top: 50px;
  margin-left: 200px;
}
.card-small {
  max-width: 100%; 
  padding: 10px; 
  font-size: 0.8rem; 
}
.card-small .card-body {
  padding: 8px; 
}
.card-small h5 {
  font-size: 1.5rem; 
}
.card-small p {
  margin-bottom: 5px; 
}
.card-small .btn {
  padding: 4px 8px; 
  font-size: 0.8rem;
}
.cardIndicator {
  height: auto;
  padding: 10px;
}

.card-small h5 {
  font-size: 1.5rem;
  white-space: nowrap; /* Evita que el texto pase a otra línea */
  overflow: hidden;    /* Oculta el desbordamiento del texto */
  text-overflow: ellipsis; /* Añade puntos suspensivos (...) si el texto es muy largo */
}
.card-small h5 {
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.estado-indicator {
  font-size: 1.2rem;
  margin-right: 5px;
}
.riesgo-indicator {
  font-size: 1.2rem;
  margin-right: 5px;
}
.text-success {
  color: green;
}
.text-warning {
  color: yellow;
}
.text-danger {
  color: red;
}
.text-secondary {
  color: gray;
}
</style>
