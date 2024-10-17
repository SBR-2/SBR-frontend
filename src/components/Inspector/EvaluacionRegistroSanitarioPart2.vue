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
            <p class="label-value">{{ contactoData.nombre }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ contactoData.direccion }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Permiso Sanitario</strong></h4>
            <button class="btn btn-primary btn-download" @click="descargarDocumento('permisoSanitario')">Descargar</button>
          </div>
        </div>
      </div>

      <!-- Información del Fabricante -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Información del Fabricante</strong></h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿Es el titular el fabricante del producto?</strong></h4>
            <p class="label-value">{{ titularData.esFabricante ? 'Sí' : 'No' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{ titularData.nombre }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>País de origen</strong></h4>
            <p class="label-value">{{ titularData.paisOrigen }}</p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ titularData.direccion }}</p>
          </div>
        </div>

        <!-- Certificados -->
        <div class="flex-container" v-for="certificado in certificadosFabricante" :key="certificado.nombre">
          <div class="flex-item">
            <h4 class="sub-title"><strong>{{ certificado.nombre }}</strong></h4>
            <button class="btn btn-primary btn-download" @click="descargarDocumento(certificado.tipo)">Descargar</button>
          </div>
        </div>
        
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿El producto es fabricado en el país y es exportado?</strong></h4>
            <p class="label-value">{{ titularData.esExportado ? 'Sí' : 'No' }}</p>
          </div>
        </div>

        <!-- Certificado de Exportación -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Certificado de Exportación</strong></h4>
            <button class="btn btn-primary btn-download" @click="descargarDocumento('certificadoExportacion')">Descargar</button>
          </div>
        </div>

      </div>

      <!-- Información del Acondicionador -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Información del Acondicionador</strong></h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>¿La empresa acondicionadora es distinta a la empresa que fabrica el producto?</strong></h4>
            <p class="label-value">{{ acondicionadorData.esDistinta ? 'Sí' : 'No' }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{ acondicionadorData.nombre }}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>País de origen</strong></h4>
            <p class="label-value">{{ acondicionadorData.paisOrigen }}</p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{ acondicionadorData.direccion }}</p>
          </div>
        </div>

        <!-- Contrato de Acondicionamiento -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Contrato de Acondicionamiento</strong></h4>
            <button class="btn btn-primary btn-download" @click="descargarDocumento('contratoAcondicionamiento')">Descargar</button>
          </div>
        </div>

      </div>

      <!-- Botón de Siguiente -->
      <div class="mt-4 text-end">
        <button class="btn btn-primary btn-download" @click="irASiguiente"><strong>Siguiente</strong></button>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'; // Importar useRouter
import HeaderInspector from './HeaderInspector.vue';
import SidebarInspector from './SideBarInspector.vue';

export default defineComponent({
  components: {
    HeaderInspector,
    SidebarInspector
  },
  setup() {
    const router = useRouter(); // Crear una instancia del enrutador
    const solicitudId = ref('123'); // Ejemplo de ID
    const contactoData = ref({
      nombre: 'Pedro Páramo',
      direccion: 'Av. Jimenez Moya #67, Santo Domingo'
    });

    const titularData = ref({
      nombre: 'Pedro Páramo',
      paisOrigen: 'Alemania',
      direccion: 'Av. Jimenez Moya #67, Santo Domingo',
      esFabricante: true,
      esExportado: true
    });

    const acondicionadorData = ref({
      nombre: 'Pedro Páramo',
      paisOrigen: 'Alemania',
      direccion: 'Av. Jimenez Moya #67, Santo Domingo',
      esDistinta: true
    });

    const certificadosFabricante = ref([
      { nombre: 'Certificado de Buenas Prácticas de Manufactura', tipo: 'buenasPracticas' },
      { nombre: 'Certificado de Habilitación de Establecimiento', tipo: 'habilitacion' },
      { nombre: 'Contrato de Fabricación', tipo: 'contratoFabricacion' }
    ]);

    const toggleSidebar = () => {
      // Implementar la lógica para alternar la visibilidad del sidebar
    };

    const descargarDocumento = (tipo) => {
      console.log(`Descargando documento: ${tipo}`);
      // Implementar la lógica de descarga aquí
    };

    const irASiguiente = () => {
      router.push(`/evaluacion-registro-sanitario-part3`); // Navegar a la siguiente página
    };

    return {
      contactoData,
      titularData,
      acondicionadorData,
      certificadosFabricante,
      toggleSidebar,
      descargarDocumento,
      irASiguiente
    };
  }
});
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
  flex-direction: column; /* Coloca los elementos en una columna */
  margin-bottom: 20px; /* Espacio entre la sección y la siguiente */
}

.flex-item {
  margin-bottom: 10px; /* Espacio entre label y botón */
}

.sub-title {
  font-size: 1.5rem; /* Tamaño de fuente para los subtítulos */
}

.label-value {
  font-size: 1.2rem; /* Tamaño de fuente para los valores */
}

.btn-download {
  width: 200px; /* Establece un ancho fijo para todos los botones de descarga */
  font-size: 1.2rem; /* Tamaño de fuente para los botones de descarga */
  margin: 5px 0; /* Espaciado entre botones de descarga */
}
</style>
