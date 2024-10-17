<template>
  <div>
    <div class="container">
      <h5 class="m-5 d-flex dashboard-title">Dashboard</h5>

      <!-- Sección de Usuario y Asignaciones -->
      <div class="row mb-4">
        <!-- Columna izquierda para información de Usuario -->
        <div class="col-md-6 border-end">
          <h6 class="mb-5 d-flex fw-bolder">Usuario</h6>
          <div class="row g-3">
            <!-- Tarjeta Activos -->
            <div class="col-6">
              <div class="card small-card text-bg-success">
                <div class="card-body h-100 d-flex align-items-center">
                  <img
                    :src="'/activo.svg'"
                    alt="Activo Logo"
                    class="me-5"
                    style="width: 50px; height: 50px"
                  />
                  <div>
                    <span class="status-number fs-2">{{ activosCount }}</span>
                    <span class="d-block">Activos</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Tarjeta Inactivo -->
            <div class="col-6">
              <div class="card small-card text-bg-danger">
                <div class="card-body h-100 d-flex align-items-center">
                  <img
                    :src="'/inactivo.svg'"
                    alt="Inactivo Logo"
                    class="me-5"
                    style="width: 50px; height: 50px"
                  />
                  <div>
                    <span class="status-number fs-2">{{ inactivosCount }}</span>
                    <span class="d-block">Inactivo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha para Asignaciones -->
        <div class="col-md-6">
          <h6 class="mb-3 d-flex fw-bold">Asignaciones</h6>
          <div class="row g-3">
            <!-- Tarjeta Evaluación -->
            <div class="col-6">
              <div class="mt-2 fs-6 d-flex">Evaluación</div>
              <div class="card small-card text-bg-secondary">
                <div class="card-body h-100 d-flex align-items-center">
                  <img
                    :src="'/espera.svg'"
                    alt="Espera Logo"
                    class="me-5"
                    style="width: 50px; height: 50px"
                  />
                  <div>
                    <span class="status-number fs-2">{{
                      evaluacionesPendientesCount
                    }}</span>
                    <span class="d-block">Pendiente</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Tarjeta Inspección -->
            <div class="col-6">
              <div class="mt-2 fs-6 d-flex">Inspección</div>
              <div class="card small-card text-bg-secondary">
                <div class="card-body h-100 d-flex align-items-center">
                  <img
                    :src="'/espera.svg'"
                    alt="Espera Logo"
                    class="me-5"
                    style="width: 50px; height: 50px"
                  />
                  <div>
                    <span class="status-number fs-2">{{
                      inspeccionesPendientesCount
                    }}</span>
                    <span class="d-block">Pendiente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of row mb-4 -->

      <!-- Línea de separación entre Usuario y Notificaciones -->
      <hr class="my-5" />
    </div>
  </div>

  <PanelPrincipal />
</template>

<script>
import PanelPrincipal from "./panel-principal.vue";
import { ref } from "vue";
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const GET_USUARIOS_ESTADO = gql`
  query GetUsuariosEstado {
    usuarios {
      items {
        estado
        fechaCreacion
        nombre
      }
    }
  }
`;

export default {
  components: {
    PanelPrincipal,
  },
  setup() {
    const activosCount = ref(0);
    const inactivosCount = ref(0);
    const evaluacionesPendientesCount = ref(0);
    const inspeccionesPendientesCount = ref(0);
    const notificaciones = ref([]);

    const { result, loading, error, refetch, onResult } =
      useQuery(GET_USUARIOS_ESTADO);

    const processUsuarios = (usuarios) => {
      if (!Array.isArray(usuarios)) return;
      activosCount.value = usuarios.filter((u) => u.estado === "true").length;
      inactivosCount.value = usuarios.filter(
        (u) => u.estado === "false"
      ).length;

      // Replace these counts with actual data when available
      evaluacionesPendientesCount.value = 1;
      inspeccionesPendientesCount.value = 1;
    };

    onResult((queryResult) => {
      if (
        queryResult.data &&
        queryResult.data.usuarios &&
        queryResult.data.usuarios.items
      ) {
        processUsuarios(queryResult.data.usuarios.items);
      }
    });

    const timeAgo = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) {
        return `hace ${diffInSeconds} segundos`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `hace ${hours} hora${hours !== 1 ? "s" : ""}`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `hace ${days} día${days !== 1 ? "s" : ""}`;
      }
    };

    return {
      activosCount,
      inactivosCount,
      evaluacionesPendientesCount,
      inspeccionesPendientesCount,
      notificaciones,
      timeAgo,
    };
  },
};
</script>

<style scoped>
.container {
  margin-left: 8%;
  margin-top: 10%;
}

.container-fluid {
  padding-right: 1px;
}

.dashboard-title {
  font-size: 1.75rem;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.status-number {
  font-size: 2rem;
  font-weight: bold;
}

.card-body {
  padding: 10px;
}

.small-card {
  height: 120px;
  width: 100%;
}

.list-unstyled li {
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
</style>
