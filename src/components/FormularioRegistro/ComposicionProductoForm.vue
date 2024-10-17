<template>
  <h5 class="mt-5">Composición del Producto</h5>

  <!-- Estado Fisico -->
  <div class="mb-3">
    <label for="estadoFisico" class="form-label">Estado Físico</label>
    <select
      id="estadoFisico"
      v-model="form.formData.estadoFisico"
      class="form-select"
      required
    >
      <option disabled value="">Seleccione el estado físico</option>
      <option
        v-for="estado in form.estadoFisicos"
        :key="estado.estadoFisicoId"
        :value="estado.estadoFisicoId"
      >
        {{ estado.estadoFisico1 }}
      </option>
    </select>
  </div>

  <!-- Categoría -->
  <div class="mb-3">
    <label for="categoria" class="form-label">Categoría</label>
    <select
      id="categoria"
      v-model="form.formData.categoria"
      class="form-select"
      @change="form.changeSubcategoria"
      required
    >
      <option disabled value="">Seleccione la categoría</option>
      <option
        v-for="cats in form.categorias"
        :key="cats.riesgoCategoriaId"
        :value="cats.riesgoCategoriaId"
      >
        {{ cats.riesgoCategoria }}
      </option>
    </select>
  </div>

  <!-- Subcategoría -->
  <div class="mb-3">
    <label for="subcategoria" class="form-label">Subcategoría</label>
    <select
      id="subcategoria"
      v-model="form.formData.subcategoria"
      class="form-select"
      @change="form.calcularRiesgo"
      required
    >
      <option disabled value="">Seleccione la subcategoría</option>
      <option
        v-for="cats in form.subcategorias"
        :key="cats.subcategoriaId"
        :value="cats.subcategoriaId"
      >
        {{ cats.subcategoria }}
      </option>
    </select>
  </div>

  <!-- Indicador de riesgo -->
  <div class="mb-3 d-flex align-items-center gap-3">
    <label class="form-label">Riesgo:</label>
    <div>
      <span :class="['badge', form.riesgoClass]">{{ form.riesgoText }}</span>
    </div>
  </div>
  <!-- Ingredientes -->
  <div class="mb-3">
    <label class="form-label"
      >¿El producto solo tiene un (1) ingrediente?</label
    >
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="si"
          value="true"
          v-model="form.formData.unIngrediente"
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
          v-model="form.formData.unIngrediente"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="no">No</label>
      </div>
    </div>
  </div>

  <div v-if="form.formData.unIngrediente === 'false'">
    <label class="mt-4">Listado de Ingredientes</label>
    <div class="mb-3">
      <input type="file" class="form-control" id="ingredientsList" @change="handleLista" required />
    </div>
  </div>

  <label>Descripción de Elaboración</label>
  <div class="mb-3">
    <input
      type="file"
      class="form-control"
      id="elaborationDescription"
      @change="handleElaboracion"
      required
    />
  </div>

  <label>Arte de Etiqueta</label>
  <div class="mb-3">
    <input type="file" class="form-control" id="labelArt" @change="handleArte" required />
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
import { onMounted } from "vue";

export default {
  name: "ComposicionProducto",
  setup() {
    const form = useProductFormStore();

    onMounted(() => {
      form.fetchEstadoFisicos();
      form.fetchCategorias();
    });

    const handleLista = (event) => {
      form.archivos.listaIngredientes = event.target.files[0];
    };

    const handleElaboracion = (event) => {
      form.archivos.descripcionElaboracion = event.target.files[0];
    };

    const handleArte = (event) => {
      form.archivos.arteEtiqueta = event.target.files[0];
    };

    return { form, handleLista, handleElaboracion, handleArte };
  },
};
</script>

<style scoped>
.badge {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
</style>
