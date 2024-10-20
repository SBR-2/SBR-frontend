<template>
  <div class="app-container">
    <!-- Sidebar -->
    <SidebarEvaluador />

    <div class="main-content">
      <!-- Header -->
      <HeaderEvaluador @toggle-sidebar="toggleSidebar" />

      <h2 class="mb-4 text-start title">
        <strong>Evaluación de Registro Sanitario</strong>
      </h2>

      <!-- Información del Almacenador -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Almacenador</strong>
        </h3>
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

            <div
              v-if="
                filteredDocuments('Copia del Permiso Sanitario').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Permiso Sanitario disponibles.
            </div>
            <div
              v-for="document in filteredDocuments(
                'Copia del Permiso Sanitario'
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
      </div>

      <!-- Información del Fabricante -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Fabricante</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong>¿Es el titular el fabricante del producto?</strong>
            </h4>
            <p class="label-value">
              {{ titularData.esFabricante ? "Sí" : "No" }}
            </p>
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

        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong
                >¿El producto es fabricado en el país y es exportado?</strong
              >
            </h4>
            <p class="label-value">
              {{ solicitanteData.esExportado ? "Sí" : "No" }}
            </p>
          </div>
        </div>

        <!-- Certificado de Exportación -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong>Certificado de Exportación</strong>
            </h4>
            <div
              v-if="
                filteredDocuments('Certificado de exportación').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Certificado de exportación.
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
      </div>

      <!-- Información del Acondicionador -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Acondicionador</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong
                >¿La empresa acondicionadora es distinta a la empresa que
                fabrica el producto?</strong
              >
            </h4>
            <p class="label-value">
              {{ solicitanteData.acondicionadorDistinto ? "Sí" : "No" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">{{acondicionadorDataData.nombre||"No disponible"}}</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>País de origen</strong></h4>
            <p class="label-value">No disponible</p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">{{acondicionadorDataData.direccion||"No disponible"}}</p>
          </div>
        </div>

        <!-- Contrato de Acondicionamiento -->
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong>Contrato de Acondicionamiento</strong>
            </h4>
            <div
              v-if="
                filteredDocuments('Contrato de Acondicionamiento').length === 0
              "
              class="alert alert-warning"
            >
              No hay documentos de Contrato de Acondicionamiento.
            </div>
            <div
              v-for="document in filteredDocuments(
                'Contrato de Acondicionamiento'
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
      </div>

      <!-- Botón de Siguiente -->
      <div class="mt-4 text-end">
        <div class="mt-4 text-right">
        <router-link
          :to="{
            path: `/evaluacion-registro-sanitario-part3/${solicitudData.solicitudId}`,
          }"
          class="btn btn-primary btn-download"
        >
          Siguiente
        </router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderEvaluador from "./HeaderEvaluador.vue";
import SidebarEvaluador from "./SideBarEvaluador.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const solicitudId = ref(
  parseInt(window.location.pathname.split("/").pop(), 10) || 1
); // ID de la solicitud seleccionada

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
    SidebarEvaluador,
    HeaderEvaluador,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_SOLICITUD, { solicitudId });
    const solicitudData = computed(() => result.value?.solicituds.items[0] || null);

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
    );
    const fabricanteData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[6]
          ?.entidad || {}
    );
    const acondicionadorDataData = computed(
      () =>
        result.value?.solicituds.items[0]?.producto?.productoEntidads[5]
          ?.entidad || {}
    );
    const documentData = computed(
      () => solicitanteData.value?.documentos || []
    );

    const filteredDocuments = (...documentTypes) => {
      return documentData.value.filter((document) =>
        documentTypes.includes(document.tipoDocumento.tipoDocumento1)
      );
    };

    return {
      solicitanteData,
      titularData,
      solicitudData,
      representanteData,
      contactoData,
      acondicionadorDataData,
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
