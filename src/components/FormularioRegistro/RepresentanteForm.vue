<template>
  <h5 class="mt-5">Información del representante legal del producto</h5>

  <!-- Nombre representante -->
  <div class="mb-3">
    <label for="nombreRepresentante" class="form-label">Nombre</label>
    <input
      type="text"
      id="nombreRepresentante"
      v-model="form.formData.representanteLegal.nombre"
      class="form-control"
      placeholder="Pedro Pérez"
      required
    />
  </div>

  <!-- Direccion representante -->
  <div class="mb-3">
    <label for="direccionRepresentante" class="form-label">Dirección</label>
    <input
      type="text"
      id="direccionRepresentante"
      v-model="form.formData.representanteLegal.direccion"
      class="form-control"
      placeholder="Calle 1, Santo Domingo"
      required
    />
  </div>

  <!-- Correo electronico representante -->
  <div class="mb-3">
    <label for="correoRepresentante" class="form-label"
      >Correo electrónico</label
    >
    <input
      type="email"
      id="correoRepresentante"
      v-model="form.formData.representanteLegal.correo"
      class="form-control"
      placeholder="prueba@gmail.com"
      required
    />
  </div>

  <!-- Numero telefono representante -->
  <div class="mb-3">
    <label for="telefonoRepresentante" class="form-label">Teléfono</label>
    <input
      type="tel"
      id="telefonoRepresentante"
      v-model="form.formData.representanteLegal.telefono"
      class="form-control"
      placeholder="809-555-5555"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      required
    />
  </div>

  <!-- Cedula representante -->
  <div class="mb-3">
    <label for="cedulaRepresentante" class="form-label">Cédula</label>
    <input
      type="text"
      id="cedulaRepresentante"
      v-model="form.formData.representanteLegal.cedula"
      class="form-control"
      placeholder="001-0000000-0"
      pattern="[0-9]{3}-[0-9]{7}-[0-9]{1}"
      required
    />
  </div>

  <!-- RNC representante -->
  <div class="mb-3">
    <label for="rncRepresentante" class="form-label">RNC</label>
    <input
      type="text"
      id="rncRepresentante"
      v-model="form.formData.representanteLegal.rnc"
      class="form-control"
      placeholder="130-99999"
      pattern="[0-9]{3}-[0-9]{5}"
      required
    />
  </div>

  <!-- Requiere de representante -->
  <div class="mb-3">
    <label class="form-label"
      >¿Requiere de representante para comercializar?</label
    >
    <div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="si"
          value="true"
          v-model="form.formData.representanteLegal.requiereRepresentante"
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
          v-model="form.formData.representanteLegal.requiereRepresentante"
          class="form-check-input"
          required
        />
        <label class="form-check-label" for="no">No</label>
      </div>
    </div>
  </div>

  <div v-if="form.formData.representanteLegal.requiereRepresentante === 'true'">
    <!-- Poder de representacion -->
    <div class="mb-3">
      <label for="poderRepresentante" class="form-label"
        >Poder de representación</label
      >
      <input type="file" class="form-control" id="poderRepresentante" @change="handlePoder" required />
    </div>
  </div>

  <!-- Certificado de Registro Mercantil -->
  <div class="mb-3">
    <label for="certificadoRegistroMercantil" class="form-label"
      >Certificado de Registro Mercantil</label
    >
    <input type="file" class="form-control" id="certificadoRegistroMercantil" @change="handleCertificado" required/>
  </div>
</template>

<script>
import { useProductFormStore } from "../../stores/productFormLogic";
export default {
  name: "InformacionRepresentante",
  setup() {
    const form = useProductFormStore();

    const handlePoder = (event) => {
      form.archivos.poderRepresentante = event.target.files[0];
    };

    const handleCertificado = (event) => {
      form.archivos.certificadoRegistroMercantil = event.target.files[0];
    };

    return { form, handlePoder, handleCertificado };
  },
};
</script>
