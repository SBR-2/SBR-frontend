<template>
  <h5 class="mt-2">Información General</h5>
  <!-- Marca -->
  <div class="mb-3">
    <label for="marca" class="form-label">Marca</label>
    <input
      type="text"
      id="marca"
      v-model="form.formData.marca"
      class="form-control"
      placeholder="Lays"
      required
    />
  </div>

  <!-- Nombre del producto -->
  <div class="mb-3">
    <label for="nombreProducto" class="form-label">Nombre del Producto</label>
    <input
      type="text"
      id="nombreProducto"
      v-model="form.formData.nombreProducto"
      class="form-control"
      placeholder="Platanitos"
      required
    />
  </div>

  <!-- Origen del producto -->
  <div class="mb-3">
    <label class="form-label">Origen del producto</label>
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="nacional"
          value="true"
          v-model="form.formData.origen"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="nacional">Nacional</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="extranjero"
          value="false"
          v-model="form.formData.origen"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="extranjero">Extranjero</label>
      </div>
    </div>
  </div>

  <!-- Archivos de marca -->
  <div class="mb-3">
    <label class="form-label" for="brandCertificate"
      >Certificado de Marca emitido por ONAPI</label
    >
    <input
      type="file"
      class="form-control"
      id="brandCertificate"
      accept=".pdf"
      @change="handleOnapi"
      required
    />
  </div>

  <div class="mb-3">
    <label class="form-label" for="salesCertificate"
      >Certificado de Venta Libre</label
    >
    <input
      type="file"
      class="form-control"
      id="salesCertificate"
      accept=".pdf"
      @change="handleSales"
      required
    />
  </div>
  <!-- Select INAIBE   -->
  <div class="mb-3">
    <label for="inaibe" class="form-label">INAIBE</label>
    <select
      id="inaibe"
      v-model="form.factores.poblacion"
      class="form-select"
      required
    >
      <option value="" disabled selected>Seleccione una opción</option>
      <option
        v-for="option in form.factoresPoblacion"
        :key="option.opcionId"
        :value="option.opcionId"
      >
        {{ option.detalle }}
      </option>
    </select>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useProductFormStore } from "../../stores/productFormLogic";

export default {
  name: "InformacionGeneral",
  setup() {
    const form = useProductFormStore();

    onMounted(() => {
      form.initFactores();
    });

    const handleOnapi = (event) => {
      form.archivos.onapi = event.target.files[0];
    };

    const handleSales = (event) => {
      form.archivos.certificadoVentas = event.target.files[0];
    };



    return { form, handleOnapi,handleSales };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
}
</style>
