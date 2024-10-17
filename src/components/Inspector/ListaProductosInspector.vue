<template>
    <div class="app-container">
      <SidebarInspector />
      <div class="main-content">
        <HeaderInspector @toggle-sidebar="toggleSidebar" />
        <div class="evaluaciones-container">
          <h2 class="mb-4">Evaluación de Producto</h2>
          <div class="search-container mb-4">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Buscar Producto" />
            <button @click="searchProducts" class="btn btn-primary">Buscar</button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Entidad</th>
                  <th>Correo</th>
                  <th>Fecha</th>
                  <th>Evaluar</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="loading">
                  <tr>
                    <td colspan="5" class="text-center py-4">
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr v-for="evaluacion in filteredEvaluaciones" :key="evaluacion.producto.nombre">
                    <td>{{ evaluacion.producto.nombre }}</td>
                    <td>{{ evaluacion.producto.usuario.entidad.nombre }}</td>
                    <td>{{ evaluacion.producto.usuario.correo }}</td>
                    <td>{{ evaluacion.fechaCreacion }}</td>
                    <td>
                      <button class="btn btn-primary" @click="evaluar(evaluacion.producto.nombre)">Evaluar</button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
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
    setup() {
      // Definir el query de GraphQL para obtener los datos
      const GET_EVALUACION_PRODUCTO = gql`
        query GET_EVALUACIONPRODUCTO {
          solicituds {
            items {
              producto {
                nombre
                usuario {
                  entidad {
                    nombre
                  }
                  correo
                }
              }
              fechaCreacion
            }
          }
        }
      `;
  
      // Usar el hook de Apollo para hacer la query
      const { result, loading, error } = useQuery(GET_EVALUACION_PRODUCTO);
  
      // Retornar los datos para su uso en el template
      return {
        evaluaciones: result,
        loading,
        error,
        searchQuery: ''
      };
    },
    computed: {
      filteredEvaluaciones() {
        if (this.searchQuery) {
          return this.evaluaciones?.solicituds?.items.filter(item =>
            item.producto.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return this.evaluaciones?.solicituds?.items || [];
      }
    },
    methods: {
      evaluar(nombre) {
        console.log(`Evaluando producto: ${nombre}`);
      },
      toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
      },
      searchProducts() {
        console.log('Realizando búsqueda:', this.searchQuery);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Manteniendo los estilos previos */
  .app-container {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
    margin-left: 80px;
    padding-top: 60px;
  }
  
  .evaluaciones-container {
    padding: 20px;
    font-size: 16px;
  }
  
  .search-container {
    display: flex;
    gap: 10px;
  }
  
  .search-container input {
    flex-grow: 1;
  }
  
  .table {
    margin-bottom: 0;
  }
  
  .table th {
    font-weight: bold;
    color: #292a2b;
    border-top: none;
    border-bottom: 1px solid #dee2e6;
    padding: 12px 8px;
  }
  
  .table td {
    padding: 12px 8px;
    border-top: none;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  @media (max-width: 992px) {
    .main-content {
      margin-left: 0;
    }
  }
  </style>
  