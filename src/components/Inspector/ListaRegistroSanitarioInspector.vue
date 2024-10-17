<template>
    <div class="app-container">
      <SidebarInspector />
      <div class="main-content">
        <HeaderInspector @toggle-sidebar="toggleSidebar" />
        <h2 class="mb-4">Registro Sanitario</h2>
        <div class="search-container mb-4">
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Buscar Producto" />
          <button @click="searchProducts" class="btn btn-primary">Buscar</button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Empresa</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Evaluar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evaluacion in filteredEvaluaciones" :key="evaluacion.id">
                <td>{{ evaluacion.producto }}</td>
                <td>{{ evaluacion.empresa }}</td>
                <td>{{ evaluacion.correo }}</td>
                <td>{{ evaluacion.fecha }}</td>
                <td>
                  <button class="btn btn-primary" @click="evaluar(evaluacion.id)">Evaluar</button>
                </td>
              </tr>
            </tbody>
          </table>
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
        searchQuery: '',
        evaluaciones: [
          { id: 1, producto: 'Soda', empresa: 'La Sirena', correo: 'erick0123@gmail.com', fecha: '20/2/2024' },
          { id: 2, producto: 'Vino', empresa: 'Grupo Ramos', correo: 'Juan0123@gmail.com', fecha: '28/5/2024' },
          { id: 3, producto: 'Cuaderno', empresa: 'Jumbo', correo: 'erick0123@gmail.com', fecha: '20/2/2024' },
          { id: 4, producto: 'Champo', empresa: 'Ole', correo: 'kevenchino@hotmail.com', fecha: '2/6/2024' },
          { id: 5, producto: 'Gente', empresa: 'PicaPollo', correo: 'erick0123@gmail.com', fecha: '20/2/2024' },
        ],
        sidebarVisible: true
      }
    },
    computed: {
      filteredEvaluaciones() {
        if (this.searchQuery) {
          return this.evaluaciones.filter(item => 
            item.producto.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
        return this.evaluaciones;
      }
    },
    methods: {
      evaluar(id) {
        console.log(`Evaluando producto con ID: ${id}`);
      },
      toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
      },
      searchProducts() {
        console.log('Realizando búsqueda:', this.searchQuery);
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
  
  .search-container {
    display: flex;
    gap: 10px;
  }
  
  .search-container input {
    flex-grow: 1;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
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
  