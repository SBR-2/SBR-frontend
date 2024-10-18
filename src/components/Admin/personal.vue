<template>
  <div>
    <div class="container h4">Información Personal</div>
    <div class="row mb-3">
      <div class="col-md-6 form-group">
        <label for="correo" class="form-label d-flex">Correo*</label>
        <input
          type="email"
          class="form-control"
          id="correo"
          v-model="correo"
          :disabled="true"
        />
      </div>
    </div>
    <PanelPrincipal />
  </div>
</template>

<script>
import PanelPrincipal from "./panel-principal.vue";
import { ref, onMounted } from "vue";
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useToast } from "vue-toastification";

// Consultas y Mutaciones GraphQL
const GET_USUARIO = gql`
  query getUsuario($id: ID!) {
    usuario(id: $id) {
      usuarioId
      nombre
      correo
    }
  }
`;

export default {
  components: {
    PanelPrincipal,
  },
  setup() {
    // Inicialización de valores
    const toast = useToast();
    const correo = ref("");
    const usuarioId = ref("35"); // Aquí puedes colocar el ID del usuario actual o recuperarlo de algún lado

    // Consulta para obtener los datos del usuario actual
    const { result, loading, error } = useQuery(GET_USUARIO, {
      id: usuarioId.value,
    });

    // Enlazar los datos al campo de correo cuando los datos están disponibles
    onMounted(() => {
      if (result.value && result.value.usuario) {
        correo.value = result.value.usuario.correo;
      }
    });

    return {
      correo,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.form-container {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-container h3 {
  margin-bottom: 1.5rem;
}
.form-group {
  margin-left: 8%;
  margin-bottom: 1rem;
}
</style>
