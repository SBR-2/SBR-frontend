<template>
  <div class="app-container">
    <SidebarInspector />
    <div class="main-content">
      <HeaderInspector @toggle-sidebar="toggleSidebar" />

      <h2 class="mb-4 text-start title">
        <strong>Información del Solicitante del Producto</strong>
      </h2>

      <!-- Información del Solicitante -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Solicitante</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">
              {{ solicitanteData.nombre || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Correo</strong></h4>
            <p class="label-value">
              {{ solicitanteData.correo || "No disponible" }}
            </p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Teléfono</strong></h4>
            <p class="label-value">
              {{ solicitanteData.telefono || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">
              {{ solicitanteData.direccion || "No disponible" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Información del Titular del Producto -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Titular del Producto</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">
              {{ titularData.nombre || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Correo</strong></h4>
            <p class="label-value">
              {{ titularData.correo || "No disponible" }}
            </p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Teléfono</strong></h4>
            <p class="label-value">
              {{ titularData.telefono || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Dirección</strong></h4>
            <p class="label-value">
              {{ titularData.direccion || "No disponible" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Información del Representante Legal -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información del Representante Legal</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">
              {{ representanteData.nombre || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Cédula</strong></h4>
            <p class="label-value">
              {{ representanteData.cedula || "No disponible" }}
            </p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>RNC</strong></h4>
            <p class="label-value">
              {{ representanteData.rnc || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title">
              <strong
                >¿Requiere representación para comercializar en Rep.
                Dom.?</strong
              >
            </h4>
            <p class="label-value">
              {{ representanteData.requiereRepresentacion ? "Sí" : "No" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Poder de Representación -->
      <div class="mb-4 text-start section">
        <h3 class="section-title"><strong>Poder de Representación</strong></h3>
        <button
          class="btn btn-primary btn-download"
          @click="descargarDocumento('poderRepresentacion')"
        >
          <strong>Descargar</strong>
        </button>
      </div>

      <!-- Certificado de Registro Mercantil -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Certificado de Registro Mercantil</strong>
        </h3>
        <button
          class="btn btn-primary btn-download"
          @click="descargarDocumento('registroMercantil')"
        >
          <strong>Descargar</strong>
        </button>
      </div>

      <!-- Información de Persona de Contacto -->
      <div class="mb-4 text-start section">
        <h3 class="section-title">
          <strong>Información de Persona de Contacto</strong>
        </h3>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Nombre</strong></h4>
            <p class="label-value">
              {{ contactoData.nombre || "No disponible" }}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item">
            <h4 class="sub-title"><strong>Correo</strong></h4>
            <p class="label-value">
              {{ contactoData.correo || "No disponible" }}
            </p>
          </div>
          <div class="flex-item">
            <h4 class="sub-title"><strong>Teléfono</strong></h4>
            <p class="label-value">
              {{ contactoData.telefono || "No disponible" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Botón de Siguiente -->
      <div class="mt-4 text-right">
        <router-link
          :to="{
            path: `/evaluacion-registro-sanitariopart2/${solicitanteData.solicitudId}`,
          }"
          class="btn btn-primary btn-download"
        >
          Siguiente
        </router-link>
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
import { useQuery, useMutation } from "@vue/apollo-composable";

const solicitudId = ref(parseInt(window.location.pathname.split('/').pop(), 10) || 1); // ID de la solicitud seleccionada


const GET_SOLICITUD = gql`
  query solicitud($solicitudId: Int!) {
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
    const { result, loading, error } = useQuery(GET_SOLICITUD);

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

    return {
      solicitanteData,
      titularData,
      representanteData,
      contactoData,
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
  margin-left: 80px;
  /* Ancho del sidebar */
  padding-top: 60px;
  /* Altura del header */
}

.title {
  font-size: 2.5rem;
  /* Tamaño de fuente más grande para el título principal */
}

.section-title {
  font-size: 1.8rem;
  /* Tamaño de fuente para los títulos de sección */
  margin-top: 20px;
  /* Espaciado superior para separar secciones */
}

.flex-container {
  display: flex;
  margin-bottom: 20px;
  /* Espacio entre la sección y la siguiente */
}

.flex-item {
  flex: 1;
  /* Ocupa el mismo espacio disponible */
  margin-right: 20px;
  /* Espacio entre los items */
}

.flex-container .flex-item:last-child {
  margin-right: 0;
}

.sub-title {
  font-size: 1.5rem;
  /* Tamaño de fuente para los subtítulos */
}

.label-value {
  font-size: 1.2rem;
  /* Tamaño de fuente para los valores */
}

.btn-download {
  width: 200px;
  /* Establece un ancho fijo para todos los botones de descarga */
  font-size: 1.2rem;
  /* Tamaño de fuente para los botones de descarga */
  margin: 5px 0;
  /* Espacio vertical entre botones */
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
