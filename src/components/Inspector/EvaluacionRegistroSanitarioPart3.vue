<template>
    <div class="app-container">
      <!-- Sidebar -->
      <SidebarInspector />
  
      <div class="main-content">
        <!-- Header -->
        <HeaderInspector @toggle-sidebar="toggleSidebar" />
  
        <h2 class="mb-4 text-start title"><strong>Evaluación de Registro Sanitario</strong></h2>
  
        <!-- Información de Muestras del Producto -->
        <div class="mb-4 text-start section">
          <h3 class="section-title"><strong>Información de Muestras del Producto</strong></h3>
  
          <!-- Muestra #1 -->
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Muestra #1</strong></h4>
              <button class="btn btn-primary btn-download">Descargar</button>
            </div>
          </div>
  
          <!-- Muestra #2 -->
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Muestra #2</strong></h4>
              <button class="btn btn-primary btn-download">Descargar</button>
            </div>
          </div>
  
          <!-- Muestra #3 -->
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Muestra #3</strong></h4>
              <button class="btn btn-primary btn-download">Descargar</button>
            </div>
          </div>
  
          <!-- Botones de Aceptar/Rechazar -->
          <div class="mt-4 text-start">
            <button class="btn btn-success btn-approval">Aceptar</button>
            <button class="btn btn-danger btn-approval">Rechazar</button>
          </div>
  
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
    margin-left: 80px; /* Ajuste del sidebar */
    padding-top: 60px; /* Espacio por el header */
  }
  
  .title {
    font-size: 2.5rem; /* Tamaño de fuente para el título principal */
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-top: 20px;
  }
  
  .flex-container {
    display: flex;
    flex-direction: column; /* Para alinear los labels y botones en columnas */
    margin-bottom: 20px;
  }
  
  .flex-item {
    margin-bottom: 10px; /* Espacio entre los items */
  }
  
  .sub-title {
    font-size: 1.5rem;
  }
  
  .btn-download {
    width: 200px;
    font-size: 1.2rem;
    margin: 5px 0; /* Espacio entre los botones de descarga */
  }
  
  .btn-approval {
    width: 250px; /* Aumenta el ancho de los botones */
    font-size: 1.25rem; /* Aumenta el tamaño de la fuente */
    margin-right: 10px; /* Separación entre Aceptar y Rechazar */
  }
  
  .mt-4 {
    margin-top: 20px; /* Espaciado extra para los botones */
  }
  
  .text-start {
    text-align: left;
  }
  </style>
  