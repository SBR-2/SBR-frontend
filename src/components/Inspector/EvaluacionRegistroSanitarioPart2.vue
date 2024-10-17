<template>
  <div class="app-container">
    <!-- Sidebar -->
    <SidebarInspector />

    <div class="main-content">
      <!-- Header -->
      <HeaderInspector @toggle-sidebar="toggleSidebar" />

      <h2 class="mb-4 text-start title"><strong>Evaluación de Registro Sanitario</strong></h2>

      <!-- Información del Almacenador -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Información del Almacenador</strong></h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{ 'Pedro Páramo' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ 'Av. Jimenez Moya #67, Santo Domingo' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Permiso Sanitario</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>
      </div>

      <!-- Información del Fabricante -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Información del Fabricante</strong></h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿Es el titular el fabricante del producto?</strong></h4>
            <p class="label-value">{{ 'Sí' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{ 'Pedro Páramo' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>País de origen</strong></h4>
            <p class="label-value">{{ 'Alemania' }}</p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ 'Av. Jimenez Moya #67, Santo Domingo' }}</p>
          </div>
        </div>

        <!-- Certificado de Buenas Prácticas de Manufactura -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Certificado de Buenas Prácticas de Manufactura</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>

        <!-- Certificado de Habilitación de Establecimiento -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Certificado de Habilitación de Establecimiento</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>

        <!-- Contrato de Fabricación -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Contrato de Fabricación</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿El producto es fabricado en el país, y es exportado?</strong></h4>
            <p class="label-value">{{ 'Sí' }}</p>
          </div>
        </div>

        <!-- Certificado de Exportación -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Certificado de Exportación</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>

      </div>

      <!-- Información del Acondicionador -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Información del Acondicionador</strong></h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿La empresa acondicionadora es distinta a la empresa que fabrica el producto?</strong></h4>
            <p class="label-value">{{ 'Sí' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{ 'Pedro Páramo' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>País de origen</strong></h4>
            <p class="label-value">{{ 'Alemania' }}</p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ 'Av. Jimenez Moya #67, Santo Domingo' }}</p>
          </div>
        </div>

        <!-- Contrato de Acondicionamiento -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Contrato de Acondicionamiento</strong></h4>
            <button class="btn btn-primary btn-download">Descargar</button>
          </div>
        </div>

      </div>

      <!-- Botón de Siguiente -->
      <div class="mt-4 ">
        <button class="btn btn-primary btn-download"><strong>Siguiente</strong></button>
      </div>

    </div>
  </div>
</template>

<script>
import HeaderInspector from './HeaderInspector.vue';
import SidebarInspector from './SideBarInspector.vue';

export default {
  components: {
    HeaderInspector,
    SidebarInspector
  },
  methods: {
    toggleSidebar() {
      // Implementar la lógica para alternar la visibilidad del sidebar
    }
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 80px;
  padding-top: 60px;
}

.title {
  font-size: 2.5rem;
}

.section-title {
  font-size: 1.8rem;
  margin-top: 20px;
}

.flex-container {
  display: flex;
  flex-direction: column; /* Coloca los elementos en una columna */
  margin-bottom: 20px;
}

.flex-item {
  margin-bottom: 10px; /* Espacio entre label y botón */
}

.sub-title {
  font-size: 1.5rem;
}

.label-value {
  font-size: 1.2rem;
}

.btn-download {
  width: 200px;
  font-size: 1.2rem;
  margin: 5px 0; /* Espacio vertical entre botones */
}

.text-end {
  text-align: right;
}
</style>
