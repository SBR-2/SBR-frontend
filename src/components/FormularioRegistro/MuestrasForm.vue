<template>
  <div>
    <h5>Muestras biológicas: {{ form.riesgo }} requeridas</h5>

    <div v-for="n in form.riesgo" :key="n">
      <div class="mb-3">
        <label :for="'file' + n">Muestra biológica</label>
        <input class="form-control" type="file" :id="'file' + (n + 1)" />
      </div>
    </div>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionMuestras",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
