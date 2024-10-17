<template>
  <h5 class="mt-5">Información del titular del producto</h5>

  <!-- Nombre representante -->
  <div class="mb-3">
    <label for="nombreTitular" class="form-label">Nombre</label>
    <input
      type="text"
      id="nombreTitular"
      v-model="form.formData.titular.nombre"
      class="form-control"
      placeholder="Pedro Pérez"
      required
    />
  </div>

  <!-- Direccion representante -->
  <div class="mb-3">
    <label for="direccionTitular" class="form-label">Dirección</label>
    <input
      type="text"
      id="direccionTitular"
      v-model="form.formData.titular.direccion"
      class="form-control"
      placeholder="Calle 1, Santo Domingo"
      required
    />
  </div>

  <!-- Correo electronico representante -->
  <div class="mb-3">
    <label for="correoTitular" class="form-label"
      >Correo electrónico</label
    >
    <input
      type="email"
      id="correoTitular"
      v-model="form.formData.titular.correo"
      class="form-control"
      placeholder="prueba@gmail.com"
      required
    />
  </div>

  <!-- Numero telefono representante -->
  <div class="mb-3">
    <label for="telefonoTitular" class="form-label">Teléfono</label>
    <input
      type="tel"
      id="telefonoTitular"
      v-model="form.formData.titular.telefono"
      class="form-control"
      placeholder="809-555-5555"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      required
    />
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionTitular",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
