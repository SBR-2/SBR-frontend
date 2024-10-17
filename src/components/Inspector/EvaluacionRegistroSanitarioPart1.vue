<template>
    <div class="app-container">
      <SidebarInspector />
      <div class="main-content">
        <HeaderInspector @toggle-sidebar="toggleSidebar" />
  
        <h2 class="mb-4 text-start title"><strong>Información del Solicitante del Producto</strong></h2>
  
        <!-- Información del Solicitante -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Información del Solicitante</strong></h3>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Nombre</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Correo</strong></h4>
              <p class="label-value">{{ 'pedropar@gmail.com' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>Teléfono</strong></h4>
              <p class="label-value">{{ '809-974-9432' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Dirección</strong></h4>
              <p class="label-value">{{ 'Av.  Jimenez Moya #67, Santo Domingo' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Información del Titular del Producto -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Información del Titular del Producto</strong></h3>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Nombre</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Correo</strong></h4>
              <p class="label-value">{{ 'pedropar@gmail.com' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>Teléfono</strong></h4>
              <p class="label-value">{{ '809-974-9432' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Dirección</strong></h4>
              <p class="label-value">{{ 'Av.  Jimenez Moya #67, Santo Domingo' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Información del Representante Legal -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Información del Representante Legal</strong></h3>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Nombre</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Cédula</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>RNC</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>¿Requiere representación para comercializar en Rep. Dom.?</strong></h4>
              <p class="label-value">{{ 'Sí' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Poder de Representación -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Poder de Representación</strong></h3>
          <button class="btn btn-primary btn-download"><strong>Descargar</strong></button>
        </div>
  
        <!-- Certificado de Registro Mercantil -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Certificado de Registro Mercantil</strong></h3>
          <button class="btn btn-primary btn-download"><strong>Descargar</strong></button>
        </div>
  
        <!-- Información de Persona de Contacto -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Información de Persona de Contacto</strong></h3>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Nombre</strong></h4>
              <p class="label-value">{{ 'Pedro Páramo' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Correo</strong></h4>
              <p class="label-value">{{ 'pedropar@gmail.com' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>Teléfono</strong></h4>
              <p class="label-value">{{ '809-974-9432' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Botones de Aprobar/Rechazar -->
        
        <!-- Botón de Siguiente -->
        <div class="mt-4 text-right">
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
    margin-left: 80px; /* Ancho del sidebar */
    padding-top: 60px; /* Altura del header */
  }
  
  .title {
    font-size: 2.5rem; /* Tamaño de fuente más grande para el título principal */
  }
  
  .section-title {
    font-size: 1.8rem; /* Tamaño de fuente para los títulos de sección */
    margin-top: 20px; /* Espaciado superior para separar secciones */
  }
  
  .flex-container {
    display: flex;
    margin-bottom: 20px; /* Espacio entre la sección y la siguiente */
  }
  
  .flex-item {
    flex: 1; /* Ocupa el mismo espacio disponible */
    margin-right: 20px; /* Espacio entre los items */
  }
  
  /* Elimina el margen derecho del último flex-item para que no haya espacio adicional */
  .flex-container .flex-item:last-child {
    margin-right: 0; 
  }
  
  .sub-title {
    font-size: 1.5rem; /* Tamaño de fuente para los subtítulos (ajustado) */
  }
  
  .label-bold {
    font-size: 1.3rem; /* Tamaño de fuente para las letras en negrita (ajustado) */
  }
  
  .label-value {
    font-size: 1.2rem; /* Tamaño de fuente para los valores */
  }
  
  .btn-approval {
    flex: 1; /* Ocupa el mismo espacio disponible */
    margin-right: 10px; /* Espacio entre los botones */
    font-size: 1.2rem; /* Aumenta el tamaño de fuente */
  }
  
  /* Estilo específico para el botón "Siguiente" y "Descargar" */
  .btn-download {
    width: 200px; /* Establece un ancho fijo para todos los botones de descarga */
    font-size: 1.2rem; /* Tamaño de fuente para los botones de descarga */
    margin: 5px 0; /* Espacio vertical entre botones */
  }
  
  
  </style>
  