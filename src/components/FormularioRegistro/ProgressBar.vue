<template>
  <div
    class="progress mb-3"
    role="progressbar"
    aria-label="Progreso del formulario"
    aria-valuenow="25"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress-bar" :style="{ width: form.progress + '%' }"></div>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";

export default {
  name: "ProgressBar",
  setup() {
    const form = useProductFormStore();

    return { form };
  },
};
</script>
