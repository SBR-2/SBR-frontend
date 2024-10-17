<template>
  <div class="d-flex">
  <div class="formContainer">
    <div class="mt-2 ms-2">
      <button class="btn" @click="form.goBack">
        <IconBack class="me-2" />
        Atras
      </button>
    </div>

    <div class="container mt-1 ms-5">
      <div class="row">
        <div class="col-md-8">
          <!-- Título del formulario -->
          <h2>
            Registro {{ form.currentStep > 1 ? "Sanitario" : "de Producto" }}
          </h2>
          <ProgressBar />
          <!-- Paso 1 -->
          <div v-show="form.currentStep === 1">
            <form
              ref="form1"
              class="requires-validation"
              @submit.prevent="validateAndSubmit"
              novalidate
            >
              <InformacionGeneral />
              <ComposicionProducto />
              <InformacionEmpaque />
              <!-- Botón de envío -->
              <button class="btn btn-primary mb-4" type="submit">Enviar</button>
            </form>
          </div>

          <!-- Registro Sanitario -->
          <!-- Paso 2 -->
          <div v-show="form.currentStep === 2">
            <form ref="form2" @submit.prevent="validateAndSubmit" novalidate>
              <InformacionTitular />
              <InformacionRepresentante />
              <InformacionPersona />
              <button class="btn btn-primary mb-4" type="submit">Enviar</button>
            </form>
          </div>

          <!-- Registro Sanitario -->
          <!-- Paso 3 -->
          <div v-show="form.currentStep === 3">
            <form ref="form3" @submit.prevent="form.submitForm">
              <InformacionAlmacenador />
              <InformacionFabricante />
              <InformacionAcondicionador />
              <button class="btn btn-primary mb-4" click="">
                {{ form.currentStep === 4 ? "Enviar" : "Siguiente" }}
              </button>
            </form>
          </div>

          <div v-show="form.currentStep === 4">
            <InformacionMuestras />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="image-side">
  <img
    src="../../../public/pexels.png"
    alt="Registro de producto"
    class="img-fluid full-height-image"/>
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
import { ref, onMounted } from "vue";

export default {
  setup() {
    const form = useProductFormStore();
    const form1 = ref(null);
    const form2 = ref(null);
    const form3 = ref(null);

    const validateAndSubmit = () => {
      switch (form.currentStep) {
        case 1:
          form.currentForm = form1.value;
          break;
        case 2:
          form.currentForm = form2.value;
          break;
        case 3:
          form.currentForm = form3.value;
          break;
        default:
          return;
      }
      form.submitForm();
    };

    return { form, form1, form2, form3, validateAndSubmit };
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
  max-width: 800px;
  margin-left: 1dvh;
}
.container {
  margin-top: 30px;
  max-width: 1000px;
}
.full-height-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-side {
  width: 45%;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
  }

  .formContainer {
    max-width: 100%;
    margin-left: 0;
  }

  .image-side {
    display: none;
  }
}
</style>
