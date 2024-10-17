<template>
  <h5 class="mt-5">Información del fabricante</h5>

  <!-- Titularidad -->
  <div class="mb-3">
    <label class="form-label">¿Es el fabricante el titular del producto?</label>
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="si"
          value="true"
          v-model="form.formData.fabricante.esTitular"
          class="form-check-input"
        />
        <label class="form-check-label" for="si">Si</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="no"
          value="false"
          v-model="form.formData.fabricante.esTitular"
          class="form-check-input"
        />
        <label class="form-check-label" for="no">No</label>
      </div>
    </div>
  </div>

  <!-- Nombre fabricante -->
  <div class="mb-3">
    <label for="nombreFabricante" class="form-label">Nombre</label>
    <input
      type="text"
      id="nombreFabricante"
      v-model="form.formData.fabricante.nombre"
      class="form-control"
      placeholder="Pedro Pérez"
    />
  </div>

  <!-- Direccion representante -->
  <div class="mb-3">
    <label for="direccionFabricante" class="form-label">Dirección</label>
    <input
      type="text"
      id="direccionFabricante"
      v-model="form.formData.fabricante.direccion"
      class="form-control"
      placeholder="Calle 1, Santo Domingo"
    />
  </div>

  <!-- Certificado de Registro Mercantil -->
  <div class="mb-3">
    <label for="certificadoBuenasPracticas" class="form-label"
      >Certificado de Buenas Prácticas</label
    >
    <input type="file" class="form-control" id="certificadoBuenasPracticas" />
  </div>

  <div v-if="form.formData.subcategoria === 'yogurt' || 'papas'">
    <!-- Certificado de Registro Mercantil -->
    <div class="mb-3">
      <label for="certificadoHabilitacion" class="form-label"
        >Certificado de Habilitación de Establecimiento</label
      >
      <input type="file" class="form-control" id="certificadoHabilitacion" />
    </div>
  </div>

  <div v-if="!form.formData.fabricante.esTitular">
    <!-- Certificado de Registro Mercantil -->
    <div class="mb-3">
      <label for="contratoFabricante" class="form-label"
        >Contrato de Fabricación</label
      >
      <input type="file" class="form-control" id="contratoFabricante" />
    </div>
  </div>

  <!-- Es Exportado -->
  <div class="mb-3">
    <label class="form-label"
      >¿El producto es fabricado en el país, y, es exportado?</label
    >
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="si"
          value="true"
          v-model="form.formData.fabricante.esExportado"
          class="form-check-input"
        />
        <label class="form-check-label" for="si">Si</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="no"
          value="false"
          v-model="form.formData.fabricante.esExportado"
          class="form-check-input"
        />
        <label class="form-check-label" for="no">No</label>
      </div>
    </div>
  </div>

  <div v-if="form.formData.fabricante.esExportado">
    <!-- Certificado de Exportacion -->
    <div class="mb-3">
      <label for="certificadoExportacion" class="form-label"
        >Certificado de Exportación</label
      >
      <input type="file" class="form-control" id="certificadoExportacion" />
    </div>

    <!-- Select HACCP -->
    <div class="mb-3">
      <label for="haccp" class="form-label">HACCP</label>
      <select
        id="haccp"
        v-model="form.factores.haccp"
        class="form-select"
        required
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option
          v-for="option in form.factoresHACCP"
          :key="option.opcionId"
          :value="option.opcionId"
        >
          {{ option.nombre }}
        </option>
      </select>
    </div>

    <!-- Select Produccion   -->
    <div class="mb-3">
      <label for="produccion" class="form-label">Producción</label>
      <select
        id="produccion"
        v-model="form.factores.produccion"
        class="form-select"
        required
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option
          v-for="option in form.factoresProduccion"
          :key="option.opcionId"
          :value="option.opcionId"
        >
          {{ option.detalle }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionFabricante",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
