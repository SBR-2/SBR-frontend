<template>
  <h5 class="mt-5">Información de persona de contacto</h5>

  <!-- Nombre representante -->
  <div class="mb-3">
    <label for="nombrePersona" class="form-label">Nombre</label>
    <input
      type="text"
      id="nombrePersona"
      v-model="form.formData.personaContacto.nombre"
      class="form-control"
      placeholder="Pedro Pérez"
    />
  </div>

  <!-- Correo electronico representante -->
  <div class="mb-3">
    <label for="correoPersona" class="form-label"
      >Correo electrónico</label
    >
    <input
      type="email"
      id="correoPersona"
      v-model="form.formData.personaContacto.correo"
      class="form-control"
      placeholder="prueba@gmail.com"
    />
  </div>

  <!-- Numero telefono representante -->
  <div class="mb-3">
    <label for="telefonoPersona" class="form-label">Teléfono</label>
    <input
      type="tel"
      id="telefonoPersona"
      v-model="form.formData.personaContacto.telefono"
      class="form-control"
      placeholder="809-555-5555"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    />
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionPersona",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
