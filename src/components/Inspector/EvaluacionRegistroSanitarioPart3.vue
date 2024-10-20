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
              <div
              v-if="
                filteredDocuments('Las 3 muestras del producto').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Muestras del producto.
            </div>
            <div
              v-for="document in filteredDocuments(
                'Certificado de exportación'
              )"
              :key="document.tipoDocumentoId"
              class="mb-3"
            >
              <label class="form-label"
                ><strong class="label-bold">{{
                  document.tipoDocumento.tipoDocumento1
                }}</strong></label
              >
              <a
                :href="document.ruta"
                class="btn btn-primary btn-sm btn-download"
                target="_blank"
                >Descargar</a
              >
            </div>
            </div>
          </div>
  
          <!-- Muestra #2 -->
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Muestra #2</strong></h4>

              <div
              v-if="
                filteredDocuments('Las 3 muestras del producto').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Muestras del producto.
            </div>
            <div
              v-for="document in filteredDocuments(
                'Certificado de exportación'
              )"
              :key="document.tipoDocumentoId"
              class="mb-3"
            >
              <label class="form-label"
                ><strong class="label-bold">{{
                  document.tipoDocumento.tipoDocumento1
                }}</strong></label
              >
              <a
                :href="document.ruta"
                class="btn btn-primary btn-sm btn-download"
                target="_blank"
                >Descargar</a
              >
            </div>
            </div>
          </div>
  
          <!-- Muestra #3 -->
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Muestra #3</strong></h4>
              <div
              v-if="
                filteredDocuments('Las 3 muestras del producto').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Muestras del producto.
            </div>
            <div
              v-for="document in filteredDocuments(
                'Certificado de exportación'
              )"
              :key="document.tipoDocumentoId"
              class="mb-3"
            >
              <label class="form-label"
                ><strong class="label-bold">{{
                  document.tipoDocumento.tipoDocumento1
                }}</strong></label
              >
              <a
                :href="document.ruta"
                class="btn btn-primary btn-sm btn-download"
                target="_blank"
                >Descargar</a
              >
            </div>
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
 import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderInspector from "./HeaderInspector.vue";
import SidebarInspector from "./SideBarInspector.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const solicitudId = ref(parseInt(window.location.pathname.split('/').pop(), 10) || 1); // ID de la solicitud seleccionada

  const GET_SOLICITUD = gql`
  query GET_SOLICITUD($solicitudId: Int!) {
    solicituds(where: { solicitudId: { eq: $solicitudId } }) {
      items {
        acondicionadorDistinto
        esExportado
        estado
        fechaCreacion
        fechaRechazo
        observaciones
        productoId
        riesgoTotal
        solicitudId
        titularFabricante
        titularRepresentacion
        opcions {
          estado
          detalle
          opcionId
        }
        documentos {
          documentoId
          estado
          ruta
          solicitudId
          tipoDocumentoId
          tipoDocumento {
            tipoDocumento1
          }
        }
        producto {
          envasePrimario
          estado
          estadoFisicoId
          marca
          materialEmpaque
          nacional
          nombre
          origen
          presentaciones
          productoId
          riesgoSubcategoriaId
          unIngrediente
          usuarioId
          estadoFisico {
            estadoFisico1
          }
          riesgoSubcategoria {
            riesgoSubcategoria
          }
          productoEntidads {
            entidad {
              cedula
              correo
              direccion
              entidadId
              nombre
              rnc
              telefono
            }
            relacionId
            relacion {
              relacionTipo
            }
          }
        }
      }
    }
  }
`;
export default {
  components: {
    SidebarInspector,
    HeaderInspector,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_SOLICITUD, {solicitudId});

    // Computed properties para acceder a los datos
    const solicitanteData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[0]
          ?.entidad || {}
    );
    const titularData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[2]
          ?.entidad || {}
    );
    const representanteData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[1]
          ?.entidad || {}
    );
    const contactoData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[3]
          ?.entidad || {}
    ); const fabricanteData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[6]
          ?.entidad || {}
    );
    const acondicionadorDataData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[5]
          ?.entidad || {}
    );
    const documentData = computed(() => solicitanteData.value?.documentos || []);

    const filteredDocuments = (...documentTypes) => {
      return documentData.value.filter(document => documentTypes.includes(document.tipoDocumento.tipoDocumento1));
    };
    


    return {
      solicitanteData,
      titularData,
      representanteData,
      contactoData,
      filteredDocuments,
      loading,
      error,
    };
  },
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
  