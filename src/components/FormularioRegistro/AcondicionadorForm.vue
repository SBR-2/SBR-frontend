<template>
  <h5 class="mt-5">Información de Acondicionamiento</h5>

  <!-- Titularidad -->
  <div class="mb-3">
    <label class="form-label"
      >¿La empresa acondicionadora es distinta a la empresa que fabrica el
      producto?</label
    >
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="si"
          value="true"
          v-model="form.formData.acondicionador.esFabricante"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="si">Si</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="no"
          value="false"
          v-model="form.formData.acondicionador.esFabricante"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="no">No</label>
      </div>
    </div>
  </div>

  <div v-if="!form.formData.acondicionador.esFabricante">
    <!-- Nombre fabricante -->
    <div class="mb-3">
      <label for="nombreAcondicionador" class="form-label">Nombre</label>
      <input
        type="text"
        id="nombreAcondicionador"
        v-model="form.formData.acondicionador.nombre"
        class="form-control"
        placeholder="pepe"
        required
      />
    </div>

    <!-- Direccion representante -->
    <div class="mb-3">
      <label for="direccionAcondicionador" class="form-label">Dirección</label>
      <input
        type="text"
        id="direccionAcondicionador"
        v-model="form.formData.acondicionador.direccion"
        class="form-control"
        placeholder="Calle 1, Santo Domingo"
        required
      />
    </div>

    <div class="mb-3">
      <label for="contratoAcondicionador" class="form-label"
        >Contrato de Acondicionamiento</label
      >
      <input type="file" class="form-control" id="contratoAcondicionador" required />
    </div>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionAcondicionador",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
