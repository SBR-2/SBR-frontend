<template>
  <div class="formContainer">
    <div class="mt-2 ms-2">
      <button class="btn" @click="form.goBack">
        <IconBack class="me-2"/>
        Atras
      </button>
    </div>

    <div class="container mt-1 ms-5">
      <div class="row">
        <div class="col-md-8">
          <form @submit.prevent="form.submitForm">
            <!-- Título del formulario -->
            <h2>
              Registro {{ form.currentStep > 1 ? "Sanitario" : "de Producto" }}
            </h2>
            <ProgressBar />
            <!-- Paso 1 -->
            <div v-show="form.currentStep === 1">
              <InformacionGeneral />
              <ComposicionProducto />
              <InformacionEmpaque />
            </div>

            <!-- Registro Sanitario -->
            <!-- Paso 2 -->
             <div v-show="form.currentStep === 2">
              <InformacionTitular />
              <InformacionRepresentante />
              <InformacionPersona />
             </div>

            <!-- Registro Sanitario -->
            <!-- Paso 3 -->
            <div v-show="form.currentStep === 3">
              <InformacionAlmacenador />
              <InformacionFabricante />
              <InformacionAcondicionador />
             </div>

             <div v-show="form.currentStep === 4">
              <InformacionMuestras />
             </div>

            <!-- Botón de envío -->
            <button type="submit" class="btn btn-primary mb-4">
              {{ form.currentStep === 4 ? "Enviar" : "Siguiente" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
import InformacionGeneral from "./InformacionGeneralForm.vue";
import ComposicionProducto from "./ComposicionProductoForm.vue";
import InformacionEmpaque from "./EmpaqueForm.vue";
import ProgressBar from "./ProgressBar.vue";
import IconBack from "../icons/IconBack.vue";
import InformacionRepresentante from "./RepresentanteForm.vue";
import InformacionTitular from "./TitularForm.vue";
import InformacionPersona from "./PersonaForm.vue";
import InformacionAlmacenador from "./AlmacenadorForm.vue";
import InformacionFabricante from "./FabricanteForm.vue";
import InformacionAcondicionador from "./AcondicionadorForm.vue";
import InformacionMuestras from "./MuestrasForm.vue";

export default {
  setup() {
    const form = useProductFormStore();

    return { form };
  },
  components: {
    InformacionGeneral,
    ComposicionProducto,
    InformacionEmpaque,
    ProgressBar,
    InformacionRepresentante,
    InformacionTitular,
    InformacionPersona,
    InformacionAlmacenador,
    InformacionFabricante,
    InformacionAcondicionador,
    InformacionMuestras,
    IconBack,
  },
};
</script>

<style scoped>
.formContainer {
  display: flex;
  text-align: left;
  flex-wrap: wrap;
  max-width: 600px;
  margin-left: 5dvh;
}
.container {
  margin-top: 30px;
  max-width: 600px;
}
</style>
