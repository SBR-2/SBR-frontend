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
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[0]?.entidad?.nombre || 'No disponible' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Correo</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[0]?.entidad?.correo || 'No disponible' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>Teléfono</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[0]?.entidad?.telefono || 'No disponible' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Dirección</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[0]?.entidad?.direccion || 'No disponible' }}</p>
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
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[1]?.entidad?.nombre || 'No disponible' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Correo</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[1]?.entidad?.correo || 'No disponible' }}</p>
            </div>
            <div class="flex-item">
              <h4 class="sub-title"><strong>Teléfono</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[1]?.entidad?.telefono || 'No disponible' }}</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="flex-item">
              <h4 class="sub-title"><strong>Dirección</strong></h4>
              <p class="label-value">{{ solicituds.items[0]?.producto?.productoEntidads[1]?.entidad?.direccion || 'No disponible' }}</p>
            </div>
          </div>
        </div>
  
        <!-- Botón de Siguiente -->
        <div class="mt-4 text-right">
          <button class="btn btn-primary btn-download" @click="irASiguiente">
            <strong>Siguiente</strong>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import gql from 'graphql-tag'
  import HeaderInspector from './HeaderInspector.vue';
  import SidebarInspector from './SideBarInspector.vue';


  const SOLI = gql`
    query soli {
      solicituds(where: { solicitudId: { eq: solicitudId } }) {
        items {
          producto {
            productoEntidads {
              relacion {
                relacionTipo
                relacionId
              }
              entidad {
                nombre
                correo
                telefono
                direccion
                cedula
                rnc
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
      const { result, loading, error } = useQuery(SOLI);
  
      const solicitanteData = computed(() => result.value?.solicituds.items[0]?.producto?.productoEntidads[0]?.entidad || {});
      const titularData = computed(() => result.value?.solicituds.items[0]?.producto?.productoEntidads[1]?.entidad || {});
  
      return {
        solicitanteData,
        titularData,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tus estilos aquí */
  </style>
  