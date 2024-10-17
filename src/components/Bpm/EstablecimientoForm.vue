<template>
  <div class="formContainer">
    <div class="mt-2 ms-2">
      <button class="btn" @click="goBack">
        <IconBack class="me-2" />
        Atras
      </button>
    </div>

    <div class="container mt-1 ms-5">
      <div class="row">
        <div class="col-md-8">
          <!-- Título del formulario -->
          <h2>Datos del Establecimiento</h2>
          <h5 class="mt-2">Información General</h5>

          <!-- Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              class="form-control"
              placeholder="Fabrica Los Platanitos"
              required
            />
          </div>
        </div>
      </div>

      <!-- Calle -->
      <div class="mb-3">
        <label for="calle" class="form-label">Calle</label>
        <input
          type="text"
          id="calle"
          class="form-control"
          placeholder="Av. 27 de Febrero"
        />
      </div>

      <!-- Numero -->
      <div class="mb-3">
        <label for="nombreProducto" class="form-label">Numero</label>
        <input
          type="text"
          id="nombreProducto"
          class="form-control"
          placeholder="92"
        />
      </div>
      <!-- RNC -->
      <div class="mb-3">
        <label for="rncRepresentante" class="form-label">RNC</label>
        <input
          type="text"
          id="rncRepresentante"
          class="form-control"
          placeholder="130-99999"
          pattern="[0-9]{3}-[0-9]{5}"
        />
      </div>

      <!-- Select Provincia -->
      <div class="mb-3">
        <label for="provincia" class="form-label">Provincia</label>
        <select id="provincia" class="form-select">
          <option selected>Seleccionar</option>
          <option value="1">Santo Domingo</option>
          <option value="2">Santiago</option>
          <option value="3">La Vega</option>
          <option value="4">San Pedro de Macoris</option>
          <option value="5">La Romana</option>
          <option value="6">San Cristobal</option>
          <option value="7">Puerto Plata</option>
          <option value="8">La Altagracia</option>
          <option value="9">Azua</option>
          <option value="10">Duarte</option>
          <option value="11">Barahona</option>
          <option value="12">Monte Plata</option>
          <option value="13">Peravia</option>
          <option value="14">Valverde</option>
          <option value="15">Monseñor Nouel</option>
          <option value="16">San Juan</option>
        </select>
      </div>

      <!-- Select Municipio -->
      <div class="mb-3">
        <label for="municipio" class="form-label">Municipio</label>
        <select id="municipio" class="form-select">
          <option selected>Seleccionar</option>
          <option value="1">Santo Domingo</option>
          <option value="2">Santiago</option>
          <option value="3">La Vega</option>
          <option value="4">San Pedro de Macoris</option>
        </select>
      </div>

      <!-- Telefono celular -->
      <div class="mb-3">
        <label for="telefono" class="form-label">Telefono</label>
        <input
          type="text"
          id="telefono"
          class="form-control"
          placeholder="809-555-5555"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
      </div>

      <!-- Fecha inicio operaciones -->
      <div class="mb-3">
        <label for="fechaInicio" class="form-label"
          >Fecha de Inicio de Operaciones</label
        >
        <input type="date" id="fechaInicio" class="form-control" required />
      </div>

      <!-- Fecha vencimiento de Permiso Sanitario -->
      <div class="mb-3">
        <label for="fechaVencimiento" class="form-label"
          >Fecha de Vencimiento de Permiso Sanitario</label
        >
        <input
          type="date"
          id="fechaVencimiento"
          class="form-control"
          required
        />
      </div>

      <!-- Numero de productos elaborados -->
      <div class="mb-3">
        <label for="numeroProductos" class="form-label"
          >Numero de Productos Elaborados</label
        >
        <input
          type="number"
          id="numeroProductos"
          class="form-control"
          required
        />
      </div>

      <!-- Produccion anual -->
      <div class="mb-3">
        <label for="produccionAnual" class="form-label">Producción Anual</label>
        <input
          type="number"
          id="produccionAnual"
          class="form-control"
          required
        />
      </div>

      <!-- Numero de empleados -->
      <div class="mb-3">
        <label for="numeroEmpleados" class="form-label"
          >Numero de Empleados</label
        >
        <input
          type="number"
          id="numeroEmpleados"
          class="form-control"
          required
        />
      </div>
      <!-- Tipo de Comercializacion -->
      <div class="mb-3">
        <label for="tipoComercializacion" class="form-label"
          >Tipo de Comercialización</label
        >
        <select id="tipoComercializacion" class="form-select">
          <option selected>Seleccionar</option>
          <option value="1">Nacional</option>
          <option value="2">Internacional</option>
        </select>
      </div>

      <!-- Mercado Objetivo -->
      <div class="mb-3">
        <label for="mercadoObjetivo" class="form-label">Mercado Objetivo</label>
        <select id="mercadoObjetivo" class="form-select">
          <option selected>Seleccionar</option>
          <option value="1">Local</option>
          <option value="2">Regional</option>
          <option value="3">Nacional</option>
          <option value="4">Internacional</option>
        </select>
      </div>

      <h5 class="mt-2">Datos de Control Interno</h5>

      <!-- Fecha Ultima Inspeccion -->
      <div class="mb-3">
        <label for="fechaInspeccion" class="form-label"
          >Fecha de Ultima Inspección</label
        >
        <input type="date" id="fechaInspeccion" class="form-control" required />
      </div>

      <!-- Nombre Oficial DPS -->
      <div class="mb-3">
        <label for="nombreOficial" class="form-label">Nombre Oficial DPS</label>
        <input type="text" id="nombreOficial" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="calificacionUltimaInspeccion" class="form-label"
          >Calificación Última Inspección (%)</label
        >
        <input
          type="number"
          id="calificacionUltimaInspeccion"
          class="form-control"
          min="0"
          max="100"
          required
        />
      </div>
      <!-- Nombre Tecnico Digemaps -->
      <div class="mb-3">
        <label for="nombreTecnico" class="form-label"
          >Nombre Técnico Digemaps</label
        >
        <input type="text" id="nombreTecnico" class="form-control" required />
      </div>
    </div>
    <div class="mt-5 ms-5">
      <button class="btn btn-primary" @click="goNext">Siguiente</button>
    </div>
  </div>
</template>

<script>
import IconBack from "@/components/Icons/IconBack.vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.push("/user/dashboard");
    };

    const goNext = () => {
      router.push("/ins/bpm");
    };

    return {
      goBack,
      goNext,
    };
  },
  components: {
    IconBack,
  },
};
</script>

<style scoped>
.formContainer {
  text-align: left;
  flex-wrap: wrap;
  max-width: 800px;
  margin-left: 1dvh;
}
.container {
  margin-top: 30px;
  max-width: 1000px;
}
</style>
