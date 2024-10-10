<template>
  <h5 class="mt-5">Información del almacenador</h5>

  <!-- Nombre representante -->
  <div class="mb-3">
    <label for="nombreAlmacenador" class="form-label">Nombre</label>
    <input
      type="text"
      id="nombreAlmacenador"
      v-model="form.formData.almacenador.nombre"
      class="form-control"
      placeholder="Pedro Pérez"
    />
  </div>

  <!-- Direccion representante -->
  <div class="mb-3">
    <label for="direccionAlmacenador" class="form-label">Dirección</label>
    <input
      type="text"
      id="direccionAlmacenador"
      v-model="form.formData.almacenador.direccion"
      class="form-control"
      placeholder="Calle 1, Santo Domingo"
    />
  </div>

  <!-- Certificado de Registro Mercantil -->
  <div class="mb-3">
    <label for="permisoSanitario" class="form-label"
      >Permiso Sanitario</label
    >
    <input type="file" class="form-control" id="permisoSanitario" />
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionAlmacenador",
  setup() {
    const form = useProductFormStore();
    return { form };
  },
};
</script>
