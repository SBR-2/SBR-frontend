<template>
  <h5 class="mt-5">Composición del Producto</h5>

<!-- Estado Fisico -->
<div class="mb-3">
  <label for="estadoFisico" class="form-label"
    >Estado Físico</label
  >
  <select
    id="estadoFisico"
    v-model="form.formData.estadoFisico"
    class="form-select"
  >
    <option disabled value="">Seleccione el estado físico</option>
    <option value="solido">Sólido</option>
    <option value="liquido">Líquido</option>
    <option value="gaseoso">Gaseoso</option>
  </select>
</div>

<!-- Categoría -->
<div class="mb-3">
  <label for="categoria" class="form-label">Categoría</label>
  <select
    id="categoria"
    v-model="form.formData.categoria"
    class="form-select"
  >
    <option disabled value="">Seleccione la categoría</option>
    <option value="snacks">Snacks</option>
    <option value="bebidas">Bebidas</option>
    <option value="lacteos">Lácteos</option>
  </select>
</div>

<!-- Subcategoría -->
<div class="mb-3">
  <label for="subcategoria" class="form-label"
    >Subcategoría</label
  >
  <select
    id="subcategoria"
    v-model="form.formData.subcategoria"
    class="form-select"
    @change="form.calcularRiesgo"
  >
    <option disabled value="">Seleccione la subcategoría</option>
    <option value="papas">Papas</option>
    <option value="gaseosas">Gaseosas</option>
    <option value="yogurt">Yogurt</option>
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
      />
      <label class="form-check-label" for="si">Si</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        type="radio"
        id="no"
        value="false"
        v-model="form.formData.unIngrediente"
        onclick="form.debug"
        class="form-check-input"
      />
      <label class="form-check-label" for="no">No</label>
    </div>
  </div>
</div>

<div v-if="form.formData.unIngrediente === 'false'">
  <label class="mt-4">Listado de Ingredientes</label>
  <div class="mb-3">
    <input
      type="file"
      class="form-control"
      id="ingredientsList"
    />
  </div>
</div>

<label>Descripción de Elaboración</label>
<div class="mb-3">
  <input
    type="file"
    class="form-control"
    id="elaborationDescription"
  />
</div>

<label>Arte de Etiqueta</label>
<div class="mb-3">
  <input type="file" class="form-control" id="labelArt" />
</div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";

export default {
  name: "ComposicionProducto",
  setup() {
    const form = useProductFormStore();

    return { form };
  },
};
</script>

<style scoped>
.badge {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
</style>
