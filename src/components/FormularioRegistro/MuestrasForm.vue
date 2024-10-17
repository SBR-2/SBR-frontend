<template>
  <div>
    <h5 class="mt-5">Muestras biológicas requeridas</h5>

    <!-- Primera muestra (siempre visible) -->
    <div class="mb-3">
      <label for="muestra1" class="form-label">Muestra biológica 1</label>
      <input 
        type="file" 
        class="form-control" 
        id="muestra1"
        @change="handleMuestra1"
        accept="application/pdf"
        required 
      />
    </div>

    <!-- Segunda muestra (MEDIA y ALTA) -->
    <div class="mb-3" v-if="form.riesgo === 2 || form.riesgo === 3 ">
      <label for="muestra2" class="form-label">Muestra biológica 2</label>
      <input 
        type="file" 
        class="form-control" 
        id="muestra2"
        @change="handleMuestra2"
        accept="application/pdf"
        required 
      />
    </div>

    <!-- Tercera muestra (solo ALTA) -->
    <div class="mb-3" v-if="form.riesgo === 3">
      <label for="muestra3" class="form-label">Muestra biológica 3</label>
      <input 
        type="file" 
        class="form-control" 
        id="muestra3"
        @change="handleMuestra3"
        accept="application/pdf"
        required 
      />
    </div>

    <!-- Select Factor Muestras -->
    <div class="mb-3">
      <label for="muestras" class="form-label">Muestras</label>
      <select
        id="muestras"
        v-model="form.factores.muestras"
        class="form-select"
        required
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option
          v-for="option in form.factoresMuestras"
          :key="option.opcionId"
          :value="option.opcionId"
        >
          {{ option.detalle }}
        </option>
      </select>
    </div>

    <!-- Select Factor Rechazos -->
    <div class="mb-3">
      <label for="rechazos" class="form-label">Rechazos</label>
      <select
        id="rechazos"
        v-model="form.factores.rechazos"
        class="form-select"
        required
      >
        <option value="" disabled selected>Seleccione una opción</option>
        <option
          v-for="option in form.factoresRechazos"
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
  name: "InformacionMuestras",
  setup() {
    const form = useProductFormStore();

    const handleMuestra1 = (event) => {
      const file = event.target.files[0];
      form.archivos.muestra1 = file;
    };

    const handleMuestra2 = (event) => {
      const file = event.target.files[0];
      form.archivos.muestra2 = file;

    };

    const handleMuestra3 = (event) => {
      const file = event.target.files[0];
        form.archivos.muestra3 = file;
    };

    return {
      form,
      handleMuestra1,
      handleMuestra2,
      handleMuestra3
    };
  },
};
</script>