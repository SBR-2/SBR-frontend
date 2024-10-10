<template>
  <div class="dashboardContainer">
    <div class="container mt-3">
      <h4>Resumen de registros</h4>
      <!-- Header con los indicadores -->
      <div class="row mb-4 text-start">
        <div class="col">
          <div class="card cardIndicator bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">2 <br />aprobados</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardIndicator bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">2 <br />vencidos</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardIndicator bg-danger text-white">
            <div class="card-body">
              <h5 class="card-title">2 <br />rechazados</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardIndicator bg-secondary text-white">
            <div class="card-body">
              <h5 class="card-title">2 <br />pendientes</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de registros -->
      <div class="row">
        <div class="col-12">
          <h4>Registros:</h4>
          <button class="btn btn-primary mb-3 d-flex align-items-center justify-content-center"> <IconNew class="me-2" />Crear nuevo registro</button>

          <!-- Filtro y búsqueda -->
           <div class="filters">

          <div class="row">
            <div class="col-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="showExpired"
                />
                <label class="form-check-label" for="showExpired"
                  >Mostrar solo vencidos</label
                >
              </div>
            </div>
            <div class="col-6 text-end">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar por producto"
              />
            </div>
          </div>
        </div>

          <!-- Tarjeta de registro -->
          <div class="card card-small mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Platanitos</h5>
                <button class="btn btn-primary">Renovar</button>
              </div>
              <div class="mt-3">
                <div>
                  <strong>Riesgo </strong>
                </div>
                <div>
                  <strong>Producto: </strong>
                  <span class="text-warning">&#9679;</span>
                </div>
                <div>
                  <strong>Establecimiento: </strong>
                  <span class="text-success">&#9679;</span>
                </div>
                <div>
                  <strong>General: </strong>
                  <span class="text-warning">&#9679;</span>
                </div>
              </div>
              <div class="mt-3 text-end">
                <p>Próxima inspección: 17/10/2023</p>
                <p>Emisión: 17/10/2023</p>
                <p>Vencimiento: 17/10/2024</p>
              </div>
              <div class="text-start">
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-download"></i> Descargar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconNew from "../icons/IconNew.vue";
export default {
  name: "Dashboard",
  components:{
    IconNew
  }
};
</script>

<style scoped>

.card-info{
    display: flex;
    flex-direction: column;
    text-align: right;
}

.filters{
    display: flex;
    justify-content: right;
}

.card-small {
  max-width: 300px; /* Ajusta el ancho de la tarjeta */
  padding: 10px; /* Reduce el padding general */
  font-size: 0.8rem; /* Reduce el tamaño de fuente */
}

.card-small .card-body {
  padding: 8px; /* Reduce el padding interno del cuerpo de la tarjeta */
}

.card-small h5 {
  font-size: 1.5rem; /* Reduce el tamaño de los títulos */
}

.card-small p {
  margin-bottom: 5px; /* Reduce los márgenes inferiores de los párrafos */
}

.card-small .btn {
  padding: 4px 8px; /* Reduce el tamaño de los botones */
  font-size: 0.8rem; /* Ajusta el tamaño de la fuente en los botones */
}

.cardIndicator {
  height: auto;
  padding: 10px;
}

.dashboardContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
}
.container {
  max-width: 900px;
}
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
