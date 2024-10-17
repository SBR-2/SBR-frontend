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
          <p class="label-value">La Sirena</p>
        </div>
        <div class="mb-3">
          <label for="marca" class="form-label"><strong class="label-bold">Marca</strong></label>
          <label id="marca" class="form-control-plaintext label-value">{{ 'Lays' }}</label>
        </div>
        <div class="mb-3">
          <label for="nombreProducto" class="form-label"><strong class="label-bold">Nombre del Producto</strong></label>
          <label id="nombreProducto" class="form-control-plaintext label-value">{{ 'Platanitos' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Origen del Producto</strong></label>
          <div class="form-check">
            <input type="radio" id="nacional" name="origen" class="form-check-input" checked disabled />
            <label for="nacional" class="form-check-label">Nacional</label>
          </div>
          <div class="form-check">
            <input type="radio" id="extranjero" name="origen" class="form-check-input" disabled />
            <label for="extranjero" class="form-check-label">Extranjero</label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Certificado de Marca emitido por ONAPI</strong></label>
          <a href="/descargar/certificadoDeMarca" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Certificado de Venta Libre</strong></label>
          <a href="/descargar/certificadoDeVentaLibre" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
      </div>

      <!-- Composición del Producto -->
      <div class="mb-4 text-start">
        <h4 class="sub-title"><strong>Composición del Producto</strong></h4>
        <div class="mb-3">
          <label for="estadoFisico" class="form-label"><strong class="label-bold">Estado Físico</strong></label>
          <label id="estadoFisico" class="form-control-plaintext label-value">{{ 'Bueno' }}</label>
        </div>
        <div class="mb-3">
          <label for="categoria" class="form-label"><strong class="label-bold">Categoría</strong></label>
          <label id="categoria" class="form-control-plaintext label-value">{{ 'Producto Lácteo' }}</label>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="subcategoria" class="form-label"><strong class="label-bold">Subcategoría</strong></label>
            <label id="subcategoria" class="form-control-plaintext label-value">{{ 'Productos Lácteos Fermentados' }}</label>
          </div>
          <div class="col">
            <label class="form-label"><strong class="label-bold">Riesgo</strong></label>
            <p class="text-danger label-value"><strong>Alto</strong></p>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">¿El producto solo tiene un (1) ingrediente?</strong></label>
          <div class="form-check">
            <input type="radio" id="si" name="ingrediente" class="form-check-input" checked disabled />
            <label for="si" class="form-check-label">Sí</label>
          </div>
          <div class="form-check">
            <input type="radio" id="no" name="ingrediente" class="form-check-input" disabled />
            <label for="no" class="form-check-label">No</label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Listado de Ingredientes</strong></label>
          <a href="/descargar/listadoDeIngredientes" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Descripción de Elaboración</strong></label>
          <a href="/descargar/descripcionDeElaboracion" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Arte de Etiqueta</strong></label>
          <a href="/descargar/arteDeEtiqueta" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
      </div>

      <!-- Información Empaque -->
      <div class="mb-4 text-start">
        <h4 class="sub-title"><strong>Información Empaque</strong></h4>
        <div class="mb-3">
          <label for="envase" class="form-label"><strong class="label-bold">Envase Principal</strong></label>
          <label id="envase" class="form-control-plaintext label-value">{{ 'Lata' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Especificaciones de Envase Primario</strong></label>
          <a href="/descargar/especificacionesDeEnvase" class="btn btn-primary btn-sm btn-download">Descargar</a>
        </div>
        <div class="mb-3">
          <label for="materialEmpaque" class="form-label"><strong class="label-bold">Material de Empaque Principal</strong></label>
          <label id="materialEmpaque" class="form-control-plaintext label-value">{{ 'Plástico' }}</label>
        </div>
        <div class="mb-3">
          <label class="form-label"><strong class="label-bold">Presentaciones</strong></label>
          <p class="label-value">Lata 355 ml</p>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/03fe2b14d1a20b5a7848e1247477fa6130e4dbabfcca7f69ec9d8de6daf02087?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519" class="img-fluid" alt="Presentación del producto" />
        </div>
      </div>

      <!-- Botones de Aprobar/Rechazar -->
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-success btn-approval"><strong>Aprobar</strong></button>
        <button class="btn btn-danger btn-approval"><strong>Rechazar</strong></button>
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
  data() {
    return {
      marca: 'Lays',
      nombreProducto: 'Platanitos'
    }
  }
}
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
