<template>
  <div>
    <h1>Formulario de BPM</h1>
    <button class="btn" @click="form.prevStep">
      <IconBack class="me-2" />
      Atras
    </button>
    <form
      ref="form.form"
      class="requires-validation"
      @submit.prevent="form.nextStep"
    >
      <BpmTabla :detallesEstablecimiento="form.detallesEstablecimiento" />
      <button class="btn btn-primary" type="submit">
        {{ form.currentStep === 7 ? "Guardar" : "Siguiente" }}
      </button>
    </form>
  </div>
</template>

<script>
import { useBpmStore } from "../../stores/bpmStore";
import IconBack from "../icons/IconBack.vue";
import BpmTabla from "./BpmTabla.vue";

export default {
  name: "BpmForm",
  setup() {
    const form = useBpmStore();
    return { form };
  },
  components: {
    BpmTabla,
    IconBack,
  },
};
</script>
