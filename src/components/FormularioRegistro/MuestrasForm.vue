<template>
  <div>
    <h5>Muestras biológicas: {{ form.riesgo }} requeridas</h5>

    <div v-for="n in form.riesgo" :key="n">
      <div class="mb-3">
        <label :for="'file' + n">Muestra biológica</label>
        <input class="form-control" type="file" :id="'file' + (n + 1)" @change="handleFileChange(n, $event)"  required />
      </div>
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

    const handleFileChange = (index, event) => {
      // Agrega el archivo al array correspondiente
      const file = event.target.files[0];

      if (file) {
        // Asegúrate de que el índice es correcto para tu lógica
        form.archivos.certificado[index] = file;
      }
    };

    return { form };
  },
};
</script>
