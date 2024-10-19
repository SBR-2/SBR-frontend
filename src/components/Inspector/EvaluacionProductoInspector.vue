<template>
  <div class="app-container">
    <SidebarInspector />
    <div class="main-content">
      <HeaderInspector @toggle-sidebar="toggleSidebar" />

      <h2 class="mb-4 text-start title"><strong>Evaluación de Producto</strong></h2>

      <!-- Información General -->
      <div class="mb-4 text-start">
        <h4 class="sub-title"><strong>Información General</strong></h4>
        <div class="mb-2">
          <label class="form-label"><strong class="label-bold">Empresa</strong></label>
          <p class="label-value">{{ productData?.productoEntidads[0]?.entidad?.nombre || 'No disponible' }}</p>
        </div>
        <div class="mb-3">
          <label for="marca" class="form-label"><strong class="label-bold">Marca</strong></label>
          <label id="marca" class="form-control-plaintext label-value">{{ productData?.marca || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label for="nombreProducto" class="form-label"><strong class="label-bold">Nombre del Producto</strong></label>
          <label id="nombreProducto" class="form-control-plaintext label-value">{{ productData?.nombre || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Origen del Producto</strong></label>
          <div class="form-check">
            <input type="radio" id="nacional" name="origen" class="form-check-input" :checked="productData?.nacional" disabled />
            <label for="nacional" class="form-check-label">Nacional</label>
          </div>
          <div class="form-check">
            <input type="radio" id="extranjero" name="origen" class="form-check-input" :checked="!productData?.nacional" disabled />
            <label for="extranjero" class="form-check-label">Extranjero</label>
          </div>
        </div>
        <!-- Documentos para Información General -->
        <div v-for="document in filteredDocuments('Certificado de Marca', 'Certificado de venta libre')" :key="document.tipoDocumentoId" class="mb-3">
          <label class="form-label"><strong class="label-bold">{{ document.tipoDocumento.tipoDocumento1 }}</strong></label>
          <a :href="document.ruta" class="btn btn-primary btn-sm btn-download" target="_blank">Descargar</a>
        </div>
      </div>

      <!-- Composición del Producto -->
      <div class="mb-4 text-start">
        <h4 class="sub-title"><strong>Composición del Producto</strong></h4>
        <div class="mb-3">
          <label for="estadoFisico" class="form-label"><strong class="label-bold">Estado Físico</strong></label>
          <label id="estadoFisico" class="form-control-plaintext label-value">{{ productData?.estadoFisico?.estadoFisico1 || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label for="categoria" class="form-label"><strong class="label-bold">Categoría</strong></label>
          <label id="categoria" class="form-control-plaintext label-value">{{ productData?.riesgoSubcategoria?.riesgoCategoria?.riesgoCategoria || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label for="subcategoria" class="form-label"><strong class="label-bold">Subcategoría</strong></label>
          <label id="subcategoria" class="form-control-plaintext label-value">{{ productData?.riesgoSubcategoria?.riesgoSubcategoria || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">¿El producto solo tiene un (1) ingrediente?</strong></label>
          <div class="form-check">
            <input type="radio" id="si" name="ingrediente" class="form-check-input" :checked="productData?.unIngrediente" disabled />
            <label for="si" class="form-check-label">Sí</label>
          </div>
          <div class="form-check">
            <input type="radio" id="no" name="ingrediente" class="form-check-input" :checked="!productData?.unIngrediente" disabled />
            <label for="no" class="form-check-label">No</label>
          </div>
        </div>
        <!-- Documentos para Composición del Producto -->
        <div v-for="document in filteredDocuments('Listado de Ingredientes', 'Descripción de la elaboración')" :key="document.tipoDocumentoId" class="mb-3">
          <label class="form-label"><strong class="label-bold">{{ document.tipoDocumento.tipoDocumento1 }}</strong></label>
          <a :href="document.ruta" class="btn btn-primary btn-sm btn-download" target="_blank">Descargar</a>
        </div>
      </div>

      <!-- Información Empaque -->
      <div class="mb-4 text-start">
        <h4 class="sub-title"><strong>Información Empaque</strong></h4>
        <div class="mb-3">
          <label for="envase" class="form-label"><strong class="label-bold">Envase Principal</strong></label>
          <label id="envase" class="form-control-plaintext label-value">{{ productData?.envasePrimario || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label for="materialEmpaque" class="form-label"><strong class="label-bold">Material de Empaque Principal</strong></label>
          <label id="materialEmpaque" class="form-control-plaintext label-value">{{ productData?.materialEmpaque || 'No disponible' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Presentaciones</strong></label>
          <p class="label-value">{{ productData?.presentaciones || 'No disponible' }}</p>
          <img :src="productImage" class="img-fluid" alt="Presentación del producto" />
        </div>
        <!-- Documentos para Información Empaque -->
        <div v-for="document in filteredDocuments('Esquema y especificaciones de empaque primario', 'Arte de etiqueta')" :key="document.tipoDocumentoId" class="mb-3">
          <label class="form-label"><strong class="label-bold">{{ document.tipoDocumento.tipoDocumento1 }}</strong></label>
          <a :href="document.ruta" class="btn btn-primary btn-sm btn-download" target="_blank">Descargar</a>
        </div>
      </div>

      <!-- Botones de Aprobar/Rechazar -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-success btn-approval" @click="approveProduct"><strong>Aprobar</strong></button>
        <button class="btn btn-danger btn-approval" @click="rejectProduct"><strong>Rechazar</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderInspector from './HeaderInspector.vue';
import SidebarInspector from './SideBarInspector.vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export default {
  components: {
    HeaderInspector,
    SidebarInspector
  },
  data() {
    return {
      productData: null,
      documentData: [],
      solicitudId: 2, // ID de la solicitud seleccionada
      productImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/03fe2b14d1a20b5a7848e1247477fa6130e4dbabfcca7f69ec9d8de6daf02087' // Ejemplo de imagen del producto
    };
  },
  setup() {
    const { result, loading, error } = useQuery(gql`
      query GET_EVALUACIONREGISTROPRODUCTO {
        solicituds {
          items {
            solicitudId
            producto {
              envasePrimario
              estadoFisico {
                estadoFisico1
              }
              marca
              materialEmpaque
              nacional
              nombre
              origen
              presentaciones
              unIngrediente
              riesgoSubcategoria {
                riesgoCategoria {
                  riesgoCategoria
                }
                riesgoSubcategoria
              }
              productoEntidads {
                entidad {
                  nombre
                }
              }
            }
            documentos {
              ruta
              tipoDocumentoId
              tipoDocumento {
                tipoDocumento1
              }
            }
          }
        }
      }
    `);

    return { result, loading, error };
  },
  watch: {
    result(newVal) {
      if (newVal) {
        const solicitud = newVal.solicituds.items.find(item => item.solicitudId === this.solicitudId);
        this.productData = solicitud?.producto;
        this.documentData = solicitud?.documentos || [];
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    filteredDocuments(...documentTypes) {
      return this.documentData.filter(document => documentTypes.includes(document.tipoDocumento.tipoDocumento1));
    },
    approveProduct() {
      // Lógica de aprobación
    },
    rejectProduct() {
      // Lógica de rechazo
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
  font-size: 2.5rem; /* Tamaño de fuente más grande para el título */
}

.sub-title {
  font-size: 2rem; /* Tamaño de fuente más grande para los subtítulos */
}

.label-bold {
  font-size: 1.5rem; /* Tamaño de fuente más grande para las letras en negrita */
}

.label-value {
  font-size: 1.2rem; /* Tamaño de fuente para las etiquetas */
}

.btn-download {
  display: block; 
  margin-top: 15px; /* Espacio arriba del botón */
  width: 100%;
  max-width: 300px; /* Ancho máximo para los botones */
  font-size: 1rem; /* Tamaño de fuente más grande para los botones de descarga */
  text-align: center; /* Centrar texto en los botones */
}
.btn-approval {
  flex: 1; /* Ocupa el mismo espacio disponible */
  margin-right: 10px; /* Espacio entre los botones */
  font-size: 1.2rem; /* Aumenta el tamaño de fuente */
}

</style>