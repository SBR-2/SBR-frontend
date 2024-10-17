<template>
    <header class="header bg-white shadow-sm">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center py-2">
          <button @click="toggleSidebar" class="btn btn-link text-dark d-lg-none">
            <i class="bi bi-list fs-4"></i>
          </button>
          <div class="d-flex align-items-center ms-auto">
            <div class="dropdown">
              <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/babf96fb-45be-4b20-88c2-3b4656b96e2f?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519"
          alt="Evaluator profile"
          class="rounded-circle me-4 evaluator-avatar"
        />
                <span class="me-2">Evaluador</span>
                
                <i class="bi bi-person-circle fs-5"></i>
                <button class="btn btn-link text-dark dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
  
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="#">Editar</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
              </ul>
            </div>
            <button class="btn btn-link text-dark ms-3">
              <i class="bi bi-bell fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    methods: {
      toggleSidebar() {
        // Emit an event to toggle the sidebar
        this.$emit('toggle-sidebar');
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  
  @media (min-width: 992px) {
    .header {
      left: 225px; /* Adjust this value to match your sidebar width */
    }
  }
  </style>