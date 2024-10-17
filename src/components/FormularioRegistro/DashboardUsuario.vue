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

    return { productos, approvedCount, rejectedCount, pendingCount };
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
</style>
