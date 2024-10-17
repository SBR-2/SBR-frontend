<template>
  <h5 class="mt-5">Información de empaque</h5>

  <!-- Envase principal -->
  <div class="mb-3">
    <label for="envasePrimario" class="form-label">Envase Principal</label>
    <input
      type="text"
      id="envasePrimario"
      v-model="form.formData.envasePrimario"
      class="form-control"
      placeholder="Lata"
      required
    />
  </div>

  <!-- Especificaciones de envase primario -->
  <label>Especificaciones de envase primario</label>
  <div class="mb-3">
    <input
      type="file"
      class="form-control"
      id="especificacionesEnvasePrimario"
      @change="handleFileChange"
      accept="application/pdf"
      required
    />
  </div>

  <!-- Material de Empaque -->
  <div class="mb-3">
    <label for="materialEmpaque" class="form-label">Material de Empaque</label>
    <input
      type="text"
      id="materialEmpaque"
      v-model="form.formData.materialEmpaque"
      class="form-control"
      placeholder="Plástico"
      required
    />
  </div>

  <!-- Presentacion -->
  <div class="mb-3">
    <label for="presentacion" class="form-label">Presentación</label>
    <textarea
      type="text"
      id="presentacion"
      v-model="form.formData.presentacion"
      class="form-control"
      placeholder="Lata de 200g"
      required
    />
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";

export default {
  name: "InformacionEmpaque",
  setup() {
    const form = useProductFormStore();

    const handleFileChange = (event) => {
      form.archivos.especificacionesEnvase = event.target.files[0];
    };

    return { form, handleFileChange };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
}
</style>
