<template>
  <div class="d-flex flex-column align-items-start">
    <h1>Formulario de BPM</h1>
    <div class="d-flex text-left">
      <button class="btn my-3" @click="form.prevStep">
        <IconBack class="me-2" />
        Atras
      </button>
    </div>

    <form
      ref="form.form"
      class="requires-validation"
      @submit.prevent="form.nextStep"
    >
      <BpmTabla :detallesEstablecimiento="form.detallesEstablecimiento" />

      <div v-if="form.currentStep === 7" class="mb-4 text-center">
        <label for="observaciones" class="form-label">Observaciones</label>
        <textarea
          class="form-control mx-auto w-50"
          rows="2"
          cols="5"
          name=""
          id=""
        ></textarea>
      </div>

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
