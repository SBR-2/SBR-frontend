<template>
    <div class="evaluacion-producto-container">
      <h4>Evaluaciones de Productos</h4>
      <div v-if="loading">
        <p>Cargando datos...</p>
      </div>
      <div v-else-if="error">
        <p>Error al cargar los datos: {{ error.message }}</p>
      </div>
      <div v-else>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Entidad</th>
              <th>Correo</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evaluacion in evaluaciones" :key="evaluacion.fechaCreacion">
              <td>{{ evaluacion.producto.nombre }}</td>
              <td>{{ evaluacion.producto.usuario.entidad.nombre }}</td>
              <td>{{ evaluacion.producto.usuario.correo }}</td>
              <td>{{ formatDate(evaluacion.fechaCreacion) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import gql from 'graphql-tag';
  import { useQuery } from '@vue/apollo-composable';
  import { ref } from 'vue';
  
  export default {
    name: 'EvaluacionProducto',
    setup() {
      // Definir la consulta GraphQL
      const GET_EVALUACIONPRODUCTO = gql`
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
  
      // Ejecutar la consulta
      const { result, loading, error } = useQuery(GET_EVALUACIONPRODUCTO);
  
      // Ref para almacenar las evaluaciones
      const evaluaciones = ref([]);
  
      // Observa los cambios en el resultado para actualizar evaluaciones
      result.value && (evaluaciones.value = result.value.solicituds.items);
  
      // Función para formatear la fecha
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
      };
  
      return {
        evaluaciones,
        loading,
        error,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .evaluacion-producto-container {
    padding: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #0069d9;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>
  